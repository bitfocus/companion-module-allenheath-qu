const quconfig = require('./quconfig.json')

module.exports = {
	getPresets: function () {
		var qu = quconfig['config'][this.config.model]
		var presets = []

		if (!qu) return presets

		/* MUTE */
		const createtMute = (cat, lab, typ, cnt, ofs) => {
			var tmp = []

			for (var i = 0; i < cnt; i++) {
				let pst = {
					category: cat,
					label: lab,
					bank: {
						style: 'text',
						text: `\$(QU:ch_name_${ofs + i})\\nMute`,
						size: 'auto',
						color: this.rgb(255, 255, 255),
						bgcolor: this.rgb(0, 0, 0),
						latch: false,
					},
					actions: [
						{
							action: typ,
							options: {
								channel: i,
								mute: 0,
							},
						},
					],
					feedbacks: [
						{
							type: typ,
							options: {
								channel: i,
							},
						},
					],
				}

				presets.push(pst)
			}
		}

		createtMute('Mute Input', 'Input channel', 'mute_input', qu['chCount'], 32)
		createtMute('Mute Stereo', 'Stereo channel', 'mute_stereo', qu['chStereo'], 64)
		createtMute('Mute LR', 'LR', 'mute_lr', 1, 103)
		createtMute('Mute Mix', 'Mix', 'mute_mix', qu['mixCount'], 96)
		createtMute('Mute Stereo Mix', 'Mix', 'mute_mix', qu['mixStereo'], 100)

		if (this.config.model != 'QU16') {
			createtMute('Mute Group', 'Group', 'mute_group', qu['grpCount'], 104)
			createtMute('Mute Matrix', 'Matrix', 'mute_matrix', qu['mtxCount'], 108)
		}

		createtMute('Mute FX Send', 'FX ', 'mute_fx_send', qu['fxsCount'], 0)
		createtMute('Mute FX Return', 'FX ', 'mute_fx_return', qu['fxrCount'], 8)
		createtMute('Mute DCA', 'DCA ', 'mute_dca', qu['dcaCount'], 16)
		createtMute('Mute MuteGroup', 'MuteGroup ', 'mute_mutegroup', qu['muteGroup'], 80)

		/* PAFL */
		const createtPAFL = (cat, lab, typ, cnt, ofs) => {
			var tmp = []

			for (var i = 0; i < cnt; i++) {
				let pst = {
					category: cat,
					label: lab,
					bank: {
						style: 'text',
						text: `\$(QU:ch_name_${ofs + i})\\nPAFL`,
						size: 'auto',
						color: this.rgb(255, 255, 255),
						bgcolor: this.rgb(0, 0, 0),
						latch: false,
					},
					actions: [
						{
							action: typ,
							options: {
								channel: i,
								pafl: 0,
							},
						},
					],
					feedbacks: [
						{
							type: typ,
							options: {
								channel: i,
							},
						},
					],
				}

				presets.push(pst)
			}
		}

		createtPAFL('PAFL Input', 'Input channel', 'pafl_input', qu['chCount'], 32)
		createtPAFL('PAFL Stereo', 'Stereo channel', 'pafl_stereo', qu['chStereo'], 64)
		createtPAFL('PAFL LR', 'LR', 'pafl_lr', 1, 103)
		createtPAFL('PAFL Mix', 'Mix', 'pafl_mix', qu['mixCount'], 96)
		createtPAFL('PAFL Stereo Mix', 'Mix', 'pafl_mix', qu['mixStereo'], 100)

		if (this.config.model != 'QU16') {
			createtPAFL('PAFL Group', 'Group', 'pafl_group', qu['grpCount'], 104)
			createtPAFL('PAFL Matrix', 'Matrix', 'pafl_matrix', qu['mtxCount'], 108)
		}

		createtPAFL('PAFL FX Send', 'FX ', 'pafl_fx_send', qu['fxsCount'], 0)
		createtPAFL('PAFL FX Return', 'FX ', 'pafl_fx_return', qu['fxrCount'], 8)
		createtPAFL('PAFL DCA', 'DCA ', 'pafl_dca', qu['dcaCount'], 16)

		return presets
	},
}
