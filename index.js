/**
 *
 * Companion instance class for the Allen & Heath QU.
 * Version 1.0.7
 * Author Max Kiusso <max@kiusso.net>
 *
 * 2021-03-01	Version 1.0.0
 *
 * 2021-03-04	Version 1.0.1
 *			- Fix level
 *			- New variables
 *			- Presets
 *
 * 2021-03-05	Version 1.0.3
 *			- Fix feedbacks
 * 			- Remove all system.emit
 *			- Add PAFL feedbacks
 *			- Add PAFL presets
 *
 * 2021-03-11	Version 1.0.4
 *			- Add scene step
 *			- Add currentScene variable
 *
 * 2021-03-15	Version 1.0.5
 *			- Fix issue #6
 *
 * 2021-03-21	Version 1.0.6
 *			- Fix issue #9
 *
 * 2021-06-19	Version 1.0.7
 *			- Add QU-Pac & QU-SB config
 *			- Add shutdown action
 */

let tcp = require('../../tcp')
let instance_skel = require('../../instance_skel')
let actions = require('./actions')
let feedbacks = require('./feedbacks')
let variables = require('./variables')
let presets = require('./presets')

const level = require('./level.json')
const quconfig = require('./quconfig.json')
const MIDI = 51325
const SysexHeader = [0xf0, 0x00, 0x00, 0x1a, 0x50, 0x11, 0x01, 0x00, 0x00]

class instance extends instance_skel {
	constructor(system, id, config) {
		super(system, id, config)

		Object.assign(this, {
			...variables,
			...actions,
			...feedbacks,
			...presets,
		})

		this.fdbState = {}
	}

	actions(system) {
		this.setActions(this.getActions())
	}

	feedbacks(system) {
		this.setFeedbackDefinitions(this.getFeedbacks())
	}

	variables(system) {
		this.setVariableDefinitions(this.getVariables())
	}

	presets(system) {
		this.setPresetDefinitions(this.getPresets())
	}

	action(action) {
		var opt = action.options
		let channel = parseInt(opt.channel)
		let CH
		let cmd = { port: MIDI, buffers: [] }
		let sceneNumber
		var self = this

		switch (action.action) {
			case 'mute_input':
			case 'level_input':
			case 'pan_input_mix':
			case 'pan_input_lr':
			case 'pan_input_group':
			case 'lr_assign_input':
			case 'mix_assign_input':
			case 'fxs_assign_input':
			case 'grp_assign_input':
			case 'mutegrp_assign_input':
			case 'dcagrp_assign_input':
			case 'pafl_input':
			case 'sendlev_input_mix':
			case 'sendlev_input_group':
			case 'preloc_48_input':
				CH = 0x20
				break

			case 'mute_stereo':
			case 'level_stereo':
			case 'pan_stereo_mix':
			case 'pan_stereo_lr':
			case 'pan_stereo_group':
			case 'lr_assign_stereo':
			case 'mix_assign_stereo':
			case 'fxs_assign_stereo':
			case 'grp_assign_stereo':
			case 'mutegrp_assign_stereo':
			case 'dcagrp_assign_stereo':
			case 'pafl_stereo':
			case 'sendlev_stereo_mix':
			case 'sendlev_stereo_group':
				CH = 0x40
				break

			case 'mute_lr':
			case 'level_lr':
			case 'mutegrp_assign_lr':
			case 'dcagrp_assign_lr':
			case 'pafl_lr':
				CH = 0x67
				break

			case 'mute_mix':
			case 'level_mix':
			case 'mutegrp_assign_mix':
			case 'dcagrp_assign_mix':
			case 'pafl_mix':
				CH = 0x60
				break

			case 'mute_group':
			case 'level_group':
			case 'lr_assign_grp':
			case 'fxs_assign_grp':
			case 'mutegrp_assign_grp':
			case 'dcagrp_assign_grp':
			case 'pafl_group':
				CH = 0x68
				break

			case 'mute_matrix':
			case 'level_matrix':
			case 'lr_assign_mtx':
			case 'fxs_assign_mtx':
			case 'pafl_matrix':
				CH = 0x6c
				break

			case 'mute_fx_send':
			case 'level_fx_send':
			case 'mutegrp_assign_fxs':
			case 'dcagrp_assign_fxs':
			case 'pafl_fx_send':
				CH = 0x00
				break

			case 'mute_fx_return':
			case 'level_fx_return':
			case 'pan_fxr_mix':
			case 'pan_fxr_lr':
			case 'pan_fxr_group':
			case 'lr_assign_fxr':
			case 'mix_assign_fxr':
			case 'fxs_assign_fxr':
			case 'grp_assign_fxr':
			case 'mutegrp_assign_fxr':
			case 'dcagrp_assign_fxr':
			case 'pafl_fx_return':
			case 'sendlev_fx_return_mix':
			case 'sendlev_fx_return_group':
			case 'sendlev_fx_return_fxs':
				CH = 0x08
				break

			case 'mute_dca':
			case 'level_dca':
			case 'pafl_dca':
				CH = 0x10
				break

			case 'mute_mutegroup':
				CH = 0x50
				break

			case 'scene_recall':
				cmd.buffers = [Buffer.from([0xb0, 0x00, 0x00, 0xc0, parseInt(opt.scene)])]
				self.setVariable('currentScene', parseInt(opt.scene) + 1)
				break

			case 'scene_step':
				sceneNumber = this.setScene(opt.scene)
				self.setVariable('currentScene', parseInt(sceneNumber) + 1)
				cmd.buffers = [Buffer.from([0xb0, 0x00, 0x00, 0xc0, parseInt(sceneNumber)])]
				break

			case 'mmc':
				cmd.buffers = [Buffer.from([0xf0, 0x7f, 0x7f, 0x06, parseInt(opt.action), 0xf7])]
				break

			case 'shutdown':
				cmd.buffers = [Buffer.from([0xb0, 0x63, 0x00, 0xb0, 0x62, 0x5f, 0xb0, 0x06, 0x00, 0xb0, 0x26, 0x00])]
				break
		}

		if (cmd.buffers.length == 0) {
			if (action.action.slice(0, 4) == 'mute') {
				if (parseInt(opt.mute) > 0) {
					this.fdbState['mute_' + (CH + channel)] = parseInt(opt.mute) == 1 ? true : false
				} else {
					this.fdbState['mute_' + (CH + channel)] = this.fdbState['mute_' + (CH + channel)] == true ? false : true
				}

				this.checkFeedbacks(action.action)
				cmd.buffers = [
					Buffer.from([
						0x90,
						CH + channel,
						this.fdbState['mute_' + (CH + channel)] ? 0x7f : 0x3f,
						0x80,
						CH + channel,
						0x00,
					]),
				]
			}

			if (action.action.slice(0, 5) == 'level') {
				let lev = parseInt(opt.level)
				if (lev >= 998) {
					lev = self.getStepLevel(action.action, CH + channel, lev)
				} else {
					self.setVariable(`${action.action}_${CH + channel}`, self.getLevel(lev))
				}
				cmd.buffers = [Buffer.from([0xb0, 0x63, CH + channel, 0xb0, 0x62, 0x17, 0xb0, 0x06, lev, 0xb0, 0x26, 0x07])]
			}

			if (action.action.slice(0, 3) == 'pan') {
				cmd.buffers = [
					Buffer.from([
						0xb0,
						0x63,
						CH + channel,
						0xb0,
						0x62,
						0x16,
						0xb0,
						0x06,
						parseInt(opt.level),
						0xb0,
						0x26,
						parseInt(opt.mix),
					]),
				]
			}

			if (action.action.slice(0, 9) == 'lr_assign') {
				cmd.buffers = [
					Buffer.from([0xb0, 0x63, CH + channel, 0xb0, 0x62, 0x18, 0xb0, 0x06, opt.assign ? 1 : 0, 0xb0, 0x26, 0x07]),
				]
			}

			if (action.action.slice(3, 7) == '_assign') {
				cmd.buffers = [
					Buffer.from([
						0xb0,
						0x63,
						CH + channel,
						0xb0,
						0x62,
						0x55,
						0xb0,
						0x06,
						opt.assign ? 1 : 0,
						0xb0,
						0x26,
						parseInt(opt.mix),
					]),
				]
			}

			if (action.action.slice(0, 11) == 'mutegrp_ass') {
				cmd.buffers = [
					Buffer.from([
						0xb0,
						0x63,
						CH + channel,
						0xb0,
						0x62,
						0x5c,
						0xb0,
						0x06,
						(opt.assign ? 0x40 : 0x00) + parseInt(opt.mix),
						0xb0,
						0x26,
						0x07,
					]),
				]
			}

			if (action.action.slice(0, 10) == 'dcagrp_ass') {
				cmd.buffers = [
					Buffer.from([
						0xb0,
						0x63,
						CH + channel,
						0xb0,
						0x62,
						0x40,
						0xb0,
						0x06,
						(opt.assign ? 0x40 : 0x00) + parseInt(opt.mix),
						0xb0,
						0x26,
						0x07,
					]),
				]
			}

			if (action.action.slice(0, 4) == 'pafl') {
				if (parseInt(opt.pafl) > 0) {
					this.fdbState['pafl_' + (CH + channel)] = parseInt(opt.pafl) == 1 ? true : false
				} else {
					this.fdbState['pafl_' + (CH + channel)] = this.fdbState['pafl_' + (CH + channel)] == true ? false : true
				}

				this.checkFeedbacks(action.action)

				cmd.buffers = [
					Buffer.from([
						0xb0,
						0x63,
						CH + channel,
						0xb0,
						0x62,
						0x51,
						0xb0,
						0x06,
						this.fdbState['pafl_' + (CH + channel)] ? 1 : 0,
						0xb0,
						0x26,
						0x07,
					]),
				]
			}

			if (action.action.slice(0, 7) == 'sendlev') {
				let lev = parseInt(opt.level)
				if (lev >= 998) lev = self.getStepLevel(action.action, CH + channel, lev, parseInt(opt.mix))
				cmd.buffers = [
					Buffer.from([0xb0, 0x63, CH + channel, 0xb0, 0x62, 0x20, 0xb0, 0x06, lev, 0xb0, 0x26, parseInt(opt.mix)]),
				]
			}

			if (action.action.slice(0, 9) == 'preloc_48') {
				cmd.buffers = [
					Buffer.from([0xb0, 0x63, CH + channel, 0xb0, 0x62, 0x69, 0xb0, 0x06, opt.active ? 1 : 0, 0xb0, 0x26, 0x07]),
				]
			}
		}

		for (let i = 0; i < cmd.buffers.length; i++) {
			if (cmd.port === MIDI && this.midiSocket !== undefined) {
				//console.log(cmd.buffers[i]);
				this.midiSocket.write(cmd.buffers[i])
			}
		}
	}

	setScene(val) {
		var self = this
		var qu = quconfig['config'][self.config.model]
		var scn

		self.getVariable('currentScene', function(res) {
			scn = parseInt(res) - 1 + val
			if (scn < 0) scn = 0
			if (scn > qu['sceneCount']) scn = qu['sceneCount'] - 1
		})

		return scn
	}

	getStepLevel(act, ch, step, mix = 999) {
		var self = this
		var db
		var dc = '999'

		self.getVariable(`${act}_${ch}` + (mix != 999 ? `_${mix}` : ''), function (res) {
			if (res !== undefined) {
				if (res == '-inf') res = -56
				res = parseFloat(res.toString().replace(/^[\+]?/g, '')) + (step == 998 ? -1 : 1)

				if (res > -45 && res < -40) res = step == 998 ? -45 : -40
				if (res > -50 && res < -45) res = step == 998 ? -50 : -45
				if (res > -55 && res < -50) res = step == 998 ? -55 : -50
				if (res < -55) res = step == 998 ? '-inf' : -55

				if (res != '-inf') {
					let lv = level.level
					for (let i = 0; i < lv.length; i++) {
						let j = i + 1 < lv.length ? i + 1 : 0
						let v1 = parseFloat(lv[i][0].replace(/^[\+]?/g, ''))
						let v2 = parseInt(lv[i][1], 16)

						if ((j == 0 && res < v1) || (j == 1 && res > v1) || res == v1) {
							dc = v1
							db = v2
							break
						} else if (j > 0) {
							let zx = parseFloat(lv[j][0].replace(/^[\+]?/g, ''))

							if (v1 > res && res > zx) {
								if (v1 - res <= res - zx) {
									dc = v1
									db = v2
								} else {
									dc = zx
									db = parseInt(lv[j][1], 16)
								}
								break
							}
						}
					}
				} else {
					dc = res
					db = 0
				}
			}
		})

		if (dc != 999) self.setVariable(`${act}_${ch}` + (mix != 999 ? `_${mix}` : ''), dc)
		return db
	}

	getChannel(ch) {
		let val, chr
		ch = parseInt(ch)

		switch (true) {
			case ch <= 0x03:
				val = 'fx_send'
				chr = ch - 0
				break
			case ch <= 0x0b:
				val = 'fx_return'
				chr = ch - 8
				break
			case ch <= 0x13:
				val = 'dca'
				chr = ch - 16
				break
			case ch <= 0x3f:
				val = 'input'
				chr = ch - 32
				break
			case ch <= 0x42:
				val = 'stereo'
				chr = ch - 64
				break
			case ch <= 0x53:
				val = 'mutegroup'
				chr = ch - 80
				break
			case ch <= 0x66:
				val = 'mix'
				chr = ch - 96
				break
			case ch <= 0x67:
				val = 'lr'
				chr = ch - 103
				break
			case ch <= 0x6b:
				val = 'group'
				chr = ch - 104
				break
			case ch <= 0x6d:
				val = 'matrix'
				chr = ch - 108
				break
		}

		return [val, chr]
	}

	getSend(ch) {
		let val, chr
		ch = parseInt(ch)

		switch (true) {
			case ch <= 0x06:
				val = 'mix'
				chr = ch - 0
				break
			case ch <= 0x0b:
				val = 'group'
				chr = ch - 8
				break
			case ch <= 0x0d:
				val = 'matrix'
				chr = ch - 12
				break
			case ch <= 0x13:
				val = 'fxs'
				chr = ch - 16
				break
		}

		return [val, chr]
	}

	getLevel(rc) {
		let lv = level.level
		let rt, zx

		for (let i = 0; i < lv.length; i++) {
			let j = i + 1 < lv.length ? i + 1 : 0
			let db = lv[i][0]
			let vl = parseInt(lv[i][1], 16)

			if ((j == 0 && rc < vl) || (j == 1 && rc > vl) || rc == vl) {
				rt = db
				break
			} else if (j > 0) {
				zx = parseInt(lv[j][1], 16)

				if (vl > rc && rc > zx) {
					if (vl - rc <= rc - zx) {
						rt = db
					} else {
						rt = lv[j][0]
					}

					break
				}
			}
		}

		return rt
	}

	getNames() {
		let cmd = []
		for (let i = 0; i <= 3; i++) {
			cmd.push(Buffer.from(SysexHeader.concat([0x01, i, 0xf7])))
		}
		for (let i = 8; i <= 11; i++) {
			cmd.push(Buffer.from(SysexHeader.concat([0x01, i, 0xf7])))
		}
		for (let i = 16; i <= 19; i++) {
			cmd.push(Buffer.from(SysexHeader.concat([0x01, i, 0xf7])))
		}
		for (let i = 32; i <= 63; i++) {
			cmd.push(Buffer.from(SysexHeader.concat([0x01, i, 0xf7])))
		}
		for (let i = 64; i <= 66; i++) {
			cmd.push(Buffer.from(SysexHeader.concat([0x01, i, 0xf7])))
		}
		for (let i = 80; i <= 83; i++) {
			cmd.push(Buffer.from(SysexHeader.concat([0x01, i, 0xf7])))
		}
		for (let i = 96; i <= 102; i++) {
			cmd.push(Buffer.from(SysexHeader.concat([0x01, i, 0xf7])))
		}
		for (let i = 103; i <= 103; i++) {
			cmd.push(Buffer.from(SysexHeader.concat([0x01, i, 0xf7])))
		}
		for (let i = 104; i <= 107; i++) {
			cmd.push(Buffer.from(SysexHeader.concat([0x01, i, 0xf7])))
		}
		for (let i = 108; i <= 109; i++) {
			cmd.push(Buffer.from(SysexHeader.concat([0x01, i, 0xf7])))
		}

		for (let i = 0; i < cmd.length; i++) {
			if (this.midiSocket !== undefined) {
				this.midiSocket.write(cmd[i])
			}
		}
	}

	getRemoteValue(data) {
		var self = this

		if (typeof data == 'object') {
			var dt, j

			for (let b = 0; b < data.length; b++) {
				// SysEx Header f0 00 00 1a 50 11 01 00 00 | 02 | 20
				// Verfy if is a SysEx response
				if (data[b] == 240 && JSON.stringify(data.slice(b, b + 9)) == JSON.stringify(SysexHeader)) {
					/* Channel Name*/
					for (j = b; j < data.length; j++) {
						if (data[j] == 247) break
					}

					let vl = data.slice(b, j)

					if (vl[9] == 2) {
						let str = ''
						for (let i = 11; i < vl.length - 1; i++) {
							str += String.fromCharCode(vl[i])
						}

						if (str.charCodeAt(0) != 0) {
							//console.log(`${str} - ${vl[10]}`);
							self.setVariable('ch_name_' + vl[10], str)
						}
					}
				} else if (data[b] == 144) {
					/* Mute */
					dt = data.slice(b, b + 6)

					if (dt[2] > 0) {
						this.fdbState['mute_' + dt[1]] = dt[2] >= 64 ? true : false
						self.checkFeedbacks('mute_' + this.getChannel(dt[1])[0])
					}
				} else if (data[b] == 176) {
					dt = data.slice(b, b + 12)

					/* Fader Level */
					if (dt[1] == 99 && dt[5] == 23) {
						let rt = self.getChannel(dt[2])
						self.setVariable(`level_${rt[0]}_${dt[2]}`, self.getLevel(dt[8]))
					}

					/* Send Level */
					if (dt[1] == 99 && dt[5] == 32) {
						let rt = self.getChannel(dt[2])
						let vx = self.getSend(dt[11])
						//console.log(`sendlev_${rt[0]}_${dt[2]}_${vx[0]}_${dt[11]} -> ${vl}`);
						self.setVariable(`sendlev_${rt[0]}_${vx[0]}_${dt[2]}_${dt[11]}`, self.getLevel(dt[8]))
					}

					/* PAFL */
					if (dt[1] == 99 && dt[5] == 81) {
						this.fdbState['pafl_' + dt[2]] = dt[8] == 1 ? true : false
						self.checkFeedbacks('pafl_' + this.getChannel(dt[2])[0])
					}

					/* Scene */
					if (dt[1] == 0 && dt[2] == 0 && dt[4] == 32 && dt[5] == 0) {
						self.setVariable('currentScene', parseInt(dt[7]) + 1)
					}
				} else if (data[b] == 192 && 0 <= data[b+1] && data[b+1] <= 99) {
					/* Scene */
					self.setVariable('currentScene', parseInt(data[b+1]) + 1)
				}
			}
		}
	}

	config_fields() {
		return [
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module is for the Allen & Heath QU',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 6,
				default: '192.168.0.6',
				regex: this.REGEX_IP,
			},
			{
				type: 'dropdown',
				id: 'model',
				label: 'Console Type',
				width: 6,
				default: 'QU16',
				choices: [
					{ id: 'QU16', label: 'QU 16' },
					{ id: 'QU24', label: 'QU 24' },
					{ id: 'QU32', label: 'QU 32' },
					{ id: 'QUSB', label: 'QU SB' },
					{ id: 'QUPAC', label: 'QU Pac' },
				],
			},
		]
	}

	destroy() {
		clearInterval(this.connItv);

		if (this.tcpSocket !== undefined) {
			this.tcpSocket.destroy()
		}

		if (this.midiSocket !== undefined) {
			this.midiSocket.destroy()
		}

		this.log('debug', `destroyed ${this.id}`)
	}

	init() {
		this.updateConfig(this.config)
		this.setVariable('currentScene', 0)
	}

	init_tcp() {
		var self = this
		this.chk = false

		if (this.midiSocket !== undefined) {
			this.midiSocket.destroy()
			delete this.midiSocket
		}

		if (this.config.host) {
			this.midiSocket = new tcp(this.config.host, MIDI)

			this.midiSocket.on('status_change', (status, message) => {
				this.status(status, message)
			})

			this.midiSocket.on('error', (err) => {
				this.log('error', 'MIDI error: ' + err.message)
				this.chk = false
			})

			this.midiSocket.on('connect', () => {
				this.log('debug', `MIDI Connected to ${this.config.host}`)

				this.midiSocket.write(Buffer.from(SysexHeader.concat([0x10, 1, 0xf7])))
				this.getNames()

				this.connItv = setInterval(function () {
					self.midiSocket.write(Buffer.from([0xfe]))
				}, 1000)
			})

			var adat = []
			this.midiSocket.on('data', (data) => {
				let dt = JSON.parse(JSON.stringify(data))['data']
				if (dt.length > 1) {
					adat = adat.concat(dt)
					//console.log(adat);
					if ([247, 254, 0, 7].includes(adat[adat.length - 1])) {
						this.getRemoteValue(adat)
						//console.log(adat);
						adat = []
					}
				}
			})
		}
	}

	updateConfig(config) {
		this.config = config

		this.variables()
		this.actions()
		this.feedbacks()
		this.presets()
		this.init_tcp()
	}
}

exports = module.exports = instance
