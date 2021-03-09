const level = require('./level.json')
const quconfig = require('./quconfig.json')

module.exports = {
	getActions() {
		var qu = quconfig['config'][this.config.model]

		let actions = {}

		this.CHOICES_INPUT_CHANNEL = []
		for (let i = 0; i < qu['chCount']; i++) {
			this.CHOICES_INPUT_CHANNEL.push({ label: `CH ${i + 1}`, id: i })
		}

		this.CHOICES_STEREO_CHANNEL = []
		for (let i = 0; i < qu['chStereo']; i++) {
			this.CHOICES_STEREO_CHANNEL.push({ label: `ST ${i + 1}`, id: i })
		}

		this.CHOICES_FX_RETURN = []
		for (let i = 0; i < qu['fxrCount']; i++) {
			this.CHOICES_FX_RETURN.push({ label: `FX ${i + 1}`, id: i })
		}

		this.CHOICES_FX_SEND = []
		for (let i = 0; i < qu['fxsCount']; i++) {
			this.CHOICES_FX_SEND.push({ label: `FX ${i + 1}`, id: i })
		}

		this.CHOICES_FADER = []
		this.CHOICES_FADER.push({ label: `Step fader +1 dB`, id: 999 })
		this.CHOICES_FADER.push({ label: `Step fader -1 dB`, id: 998 })
		for (let i = 0; i < level.level.length; i++) {
			let dbStr = level.level[i][0]
			this.CHOICES_FADER.push({ label: `${dbStr} dB`, id: parseInt(level.level[i][1], 16) })
		}

		this.CHOICES_PAN = []
		for (let i = 0; i <= 74; i++) {
			let pos = i - 37 < 0 ? 'L' : i - 37 > 0 ? 'R' : 'C'
			let val = ((100 / 37) * Math.abs(i - 37)).toFixed(0)
			this.CHOICES_PAN.push({ label: `${val}% ${pos}`, id: i })
		}

		let ch = 1
		this.CHOICES_GROUP = []
		for (let i = 0; i < qu['grpCount']; i++) {
			this.CHOICES_GROUP.push({ label: `Group ${ch}/${ch + 1}`, id: i })
			ch = ch + 2
		}

		ch = 1
		this.CHOICES_MATRIX = []
		for (let i = 0; i < qu['mtxCount']; i++) {
			this.CHOICES_MATRIX.push({ label: `Matrix ${ch}/${ch + 1}`, id: i })
			ch = ch + 2
		}

		this.CHOICES_MIX = []
		for (let i = 0; i < qu['mixCount']; i++) {
			this.CHOICES_MIX.push({ label: `Mix ${i}`, id: i })
		}

		ch = 5
		for (let i = 4; i < qu['mixCount'] + qu['mixStereo']; i++) {
			this.CHOICES_MIX.push({ label: `Mix ${ch}/${ch + 1}`, id: i })
			ch = ch + 2
		}

		this.CHOICES_LR = []
		this.CHOICES_LR.push({ label: `LR`, id: 0 })

		this.CHOICES_MUTEGROUP = []
		for (let i = 0; i < qu['muteGroup']; i++) {
			this.CHOICES_MUTEGROUP.push({ label: `MuteGroup ${i}`, id: i })
		}

		this.CHOICES_DCA = []
		for (let i = 0; i < qu['dcaCount']; i++) {
			this.CHOICES_DCA.push({ label: `DCA ${i}`, id: i })
		}

		this.CHOICES_SCENES = []
		for (let i = 0; i < qu['sceneCount']; i++) {
			this.CHOICES_SCENES.push({ label: `SCENE ${i + 1}`, id: i })
		}

		this.muteOptions = (name, qty, ofs, st = 0) => {
			var i
			let ch = 1
			this.CHOICES = []
			for (i = 1; i <= qty; i++) {
				let ele = st < 99 ? i : `${ch}/${ch + 1}`
				this.CHOICES.push({ label: `${name} ${ele}`, id: i + ofs })
				ch = ch + 2
			}

			if (st > 0 && st < 99) {
				let ch = 5
				for (let j = i; j <= qty + st; j++) {
					this.CHOICES.push({ label: `${name} ${ch}/${ch + 1}`, id: j + ofs })
					ch = ch + 2
				}
			}

			return [
				{
					type: 'dropdown',
					label: name,
					id: 'channel',
					default: 1 + ofs,
					choices: this.CHOICES,
					minChoicesForSearch: 0,
				},
				{
					type: 'dropdown',
					label: 'Mute',
					id: 'mute',
					default: 0,
					choices: [
						{ label: 'Toggle', id: 0 },
						{ label: 'On', id: 1 },
						{ label: 'Off', id: 2 },
					],
				},
			]
		}

		this.paflOptions = (name, qty, ofs, st = 0) => {
			var i
			let ch = 1
			this.CHOICES = []
			for (i = 1; i <= qty; i++) {
				let ele = st < 99 ? i : `${ch}/${ch + 1}`
				this.CHOICES.push({ label: `${name} ${ele}`, id: i + ofs })
				ch = ch + 2
			}

			if (st > 0 && st < 99) {
				let ch = 5
				for (let j = i; j <= qty + st; j++) {
					this.CHOICES.push({ label: `${name} ${ch}/${ch + 1}`, id: j + ofs })
					ch = ch + 2
				}
			}

			return [
				{
					type: 'dropdown',
					label: name,
					id: 'channel',
					default: 1 + ofs,
					choices: this.CHOICES,
					minChoicesForSearch: 0,
				},
				{
					type: 'dropdown',
					label: 'PAFL',
					id: 'pafl',
					default: 0,
					choices: [
						{ label: 'Toggle', id: 0 },
						{ label: 'On', id: 1 },
						{ label: 'Off', id: 2 },
					],
				},
			]
		}

		this.faderOptions = (name, qty, ofs, st = 0) => {
			var i
			let ch
			this.CHOICES = []
			for (i = 1; i <= qty; i++) {
				let ele = st < 99 ? i : `${ch}/${ch + 1}`
				this.CHOICES.push({ label: `${name} ${ele}`, id: i + ofs })
				ch = ch + 2
			}

			if (st > 0 && st < 99) {
				let ch = 5
				for (let j = i; j <= qty + st; j++) {
					this.CHOICES.push({ label: `${name} ${ch}/${ch + 1}`, id: j + ofs })
					ch = ch + 2
				}
			}

			return [
				{
					type: 'dropdown',
					label: name,
					id: 'channel',
					default: 1 + ofs,
					choices: this.CHOICES,
					minChoicesForSearch: 0,
				},
				{
					type: 'dropdown',
					label: 'Level',
					id: 'level',
					default: 98,
					choices: this.CHOICES_FADER,
					minChoicesForSearch: 0,
				},
			]
		}

		this.panOptions = (name, qty, ofs, st = 0, chs, lev = false) => {
			var i
			let ch
			this.CHOICES = []
			for (i = 1; i <= qty; i++) {
				let ele = st < 99 ? i : `${ch}/${ch + 1}`
				this.CHOICES.push({ label: `${name} ${ele}`, id: i + ofs })
				ch = ch + 2
			}

			if (st > 0 && st < 99) {
				let ch = 5
				for (let j = i; j <= qty + st; j++) {
					this.CHOICES.push({ label: `${name} ${ch}/${ch + 1}`, id: j + ofs })
					ch = ch + 2
				}
			}

			return [
				{
					type: 'dropdown',
					label: chs[0],
					id: 'channel',
					default: 0,
					choices: chs[1],
					minChoicesForSearch: 0,
				},
				{
					type: 'dropdown',
					label: name,
					id: 'mix',
					default: 1 + ofs,
					choices: this.CHOICES,
					minChoicesForSearch: 0,
				},
				{
					type: 'dropdown',
					label: lev ? 'Level' : 'Pan',
					id: 'level',
					default: lev ? 98 : 37,
					choices: lev ? this.CHOICES_FADER : this.CHOICES_PAN,
					minChoicesForSearch: 0,
				},
			]
		}

		this.lrAssignOptions = (chs) => {
			return [
				{
					type: 'dropdown',
					label: chs[0],
					id: 'channel',
					default: 0,
					choices: chs[1],
					minChoicesForSearch: 0,
				},
				{
					type: 'checkbox',
					label: 'Assign',
					id: 'assign',
					default: true,
				},
			]
		}

		this.mixAssignOptions = (name, qty, ofs, st = 0, chs) => {
			var i
			let ch
			this.CHOICES = []
			for (i = 1; i <= qty; i++) {
				let ele = st < 99 ? i : `${ch}/${ch + 1}`
				this.CHOICES.push({ label: `${name} ${ele}`, id: i + ofs })
				ch = ch + 2
			}

			if (st > 0 && st < 99) {
				let ch = 5
				for (let j = i; j <= qty + st; j++) {
					this.CHOICES.push({ label: `${name} ${ch}/${ch + 1}`, id: j + ofs })
					ch = ch + 2
				}
			}

			return [
				{
					type: 'dropdown',
					label: chs[0],
					id: 'channel',
					default: 0,
					choices: chs[1],
					minChoicesForSearch: 0,
				},
				{
					type: 'dropdown',
					label: name,
					id: 'mix',
					default: 1 + ofs,
					choices: this.CHOICES,
					minChoicesForSearch: 0,
				},
				{
					type: 'checkbox',
					label: 'Assign',
					id: 'assign',
					default: true,
				},
			]
		}

		/* MUTE */
		actions['mute_input'] = {
			label: 'Mute Input',
			options: this.muteOptions('Input Channel', qu['chCount'], -1),
		}
		actions['mute_stereo'] = {
			label: 'Mute Stereo',
			options: this.muteOptions('Stereo Channel', qu['chStereo'], -1),
		}
		actions['mute_lr'] = {
			label: 'Mute LR',
			options: this.muteOptions('LR', 1, -1),
		}
		actions['mute_mix'] = {
			label: 'Mute Mix',
			options: this.muteOptions('Mix', qu['mixCount'], -1, qu['mixStereo']),
		}
		actions['mute_fx_send'] = {
			label: 'Mute FX Send',
			options: this.muteOptions('FX Send', qu['fxsCount'], -1),
		}
		actions['mute_fx_return'] = {
			label: 'Mute FX Return',
			options: this.muteOptions('FX Return', qu['fxrCount'], -1),
		}
		actions['mute_dca'] = {
			label: 'Mute DCA',
			options: this.muteOptions('DCA', qu['dcaCount'], -1),
		}
		actions['mute_mutegroup'] = {
			label: 'Mute MuteGroup',
			options: this.muteOptions('Mute MuteGroup', qu['muteGroup'], -1),
		}

		if (this.config.model != 'QU16') {
			actions['mute_group'] = {
				label: 'Mute Group',
				options: this.muteOptions('Group', qu['grpCount'], -1, 99),
			}
			actions['mute_matrix'] = {
				label: 'Mute Matrix',
				options: this.muteOptions('Matrix', qu['mtxCount'], -1, 99),
			}
		}
		/**/

		/* FADER LEVEL*/
		actions['level_input'] = {
			label: 'Input Fader Level',
			options: this.faderOptions('Input Channel', qu['chCount'], -1),
		}
		actions['level_stereo'] = {
			label: 'Stereo Fader Level',
			options: this.faderOptions('Stereo Channel', qu['chStereo'], -1),
		}
		actions['level_lr'] = {
			label: 'LR Fadel Level',
			options: this.faderOptions('LR', 1, -1),
		}
		actions['level_mix'] = {
			label: 'Mix Fader Level',
			options: this.faderOptions('Mix', qu['mixCount'], -1, qu['mixStereo']),
		}
		actions['level_fx_send'] = {
			label: 'FX Send Fader Level',
			options: this.faderOptions('FX Send', qu['fxsCount'], -1),
		}
		actions['level_fx_return'] = {
			label: 'FX Return Fader Level',
			options: this.faderOptions('FX Return', qu['fxrCount'], -1),
		}
		actions['level_dca'] = {
			label: 'DCA Fader Level',
			options: this.faderOptions('DCA', qu['dcaCount'], -1),
		}
		if (this.config.model != 'QU16') {
			actions['level_group'] = {
				label: 'Group Fader Level',
				options: this.faderOptions('Group', qu['grpCount'], -1, 99),
			}
			actions['level_matrix'] = {
				label: 'Matrix Fader Level',
				options: this.faderOptions('Matrix', qu['mtxCount'], -1, 99),
			}
		}
		/**/

		/* PAN */
		// Missing Grp2LR, Mtx2LR, Grp2Mtx
		actions['pan_input_mix'] = {
			label: 'Pan Input to Mix',
			options: this.panOptions('Mix', 0, 3, qu['mixStereo'], ['Input channel', this.CHOICES_INPUT_CHANNEL]),
		}
		actions['pan_input_lr'] = {
			label: 'Pan Input to LR',
			options: this.panOptions('LR', 1, 6, 0, ['Input channel', this.CHOICES_INPUT_CHANNEL]),
		}
		if (this.config.model != 'QU16') {
			actions['pan_input_group'] = {
				label: 'Pan Input to Group (Mix mode)',
				options: this.panOptions('Group', qu['grpCount'], 7, 99, ['Input channel', this.CHOICES_INPUT_CHANNEL]),
			}
		}
		actions['pan_stereo_mix'] = {
			label: 'Pan Stereo to Mix',
			options: this.panOptions('Mix', 0, 3, qu['mixStereo'], ['Stereo', this.CHOICES_STEREO_CHANNEL]),
		}
		actions['pan_stereo_lr'] = {
			label: 'Pan Stereo to LR',
			options: this.panOptions('LR', 1, 6, 0, ['Stereo', this.CHOICES_STEREO_CHANNEL]),
		}
		if (this.config.model != 'QU16') {
			actions['pan_stereo_group'] = {
				label: 'Pan Stereo to Group (Mix mode)',
				options: this.panOptions('Group', qu['grpCount'], 7, 99, ['Stereo', this.CHOICES_STEREO_CHANNEL]),
			}
		}
		actions['pan_fxr_mix'] = {
			label: 'Pan FX Return to Mix',
			options: this.panOptions('Mix', 0, 3, qu['mixStereo'], ['FX Return', this.CHOICES_FX_RETURN]),
		}
		actions['pan_fxr_lr'] = {
			label: 'Pan FX Return to LR',
			options: this.panOptions('LR', 1, 6, 0, ['FX Return', this.CHOICES_FX_RETURN]),
		}
		if (this.config.model != 'QU16') {
			actions['pan_fxr_group'] = {
				label: 'Pan FX Return to Group (Mix mode)',
				options: this.panOptions('Group', qu['grpCount'], 7, 99, ['FX Return', this.CHOICES_FX_RETURN]),
			}
		}
		/**/

		/* LR Assign */
		actions['lr_assign_input'] = {
			label: 'Assign Input to LR',
			options: this.lrAssignOptions(['Input channel', this.CHOICES_INPUT_CHANNEL]),
		}
		actions['lr_assign_stereo'] = {
			label: 'Assign Stereo to LR',
			options: this.lrAssignOptions(['Stereo', this.CHOICES_STEREO_CHANNEL]),
		}
		actions['lr_assign_fxr'] = {
			label: 'Assign FX Return to LR',
			options: this.lrAssignOptions(['FX Return', this.CHOICES_FX_RETURN]),
		}
		if (this.config.model != 'QU16') {
			actions['lr_assign_grp'] = {
				label: 'Assign Group to LR',
				options: this.panOptions(['Group', this.CHOICES_GROUP]),
			}
			actions['lr_assign_mtx'] = {
				label: 'Assign Matrix to LR',
				options: this.panOptions(['Matrix', this.CHOICES_MATRIX]),
			}
		}
		/**/

		/* MIX Assign */
		actions['mix_assign_input'] = {
			label: 'Assign Input to Mix',
			options: this.mixAssignOptions('Mix', qu['mixCount'], -1, qu['mixStereo'], [
				'Input channel',
				this.CHOICES_INPUT_CHANNEL,
			]),
		}
		actions['mix_assign_stereo'] = {
			label: 'Assign Stereo to Mix',
			options: this.mixAssignOptions('Mix', qu['mixCount'], -1, qu['mixStereo'], [
				'Stereo',
				this.CHOICES_STEREO_CHANNEL,
			]),
		}
		actions['mix_assign_fxr'] = {
			label: 'Assign FX Return to Mix',
			options: this.mixAssignOptions('Mix', qu['mixCount'], -1, qu['mixStereo'], ['FX Return', this.CHOICES_FX_RETURN]),
		}

		actions['fxs_assign_input'] = {
			label: 'Assign Input to FX Send',
			options: this.mixAssignOptions('FX Send', qu['fxsCount'], 15, 0, ['Input channel', this.CHOICES_INPUT_CHANNEL]),
		}
		actions['fxs_assign_stereo'] = {
			label: 'Assign Stereo to FX Send',
			options: this.mixAssignOptions('FX Send', qu['fxsCount'], 15, 0, ['Stereo', this.CHOICES_STEREO_CHANNEL]),
		}
		actions['fxs_assign_fxr'] = {
			label: 'Assign FX Return to FX Send',
			options: this.mixAssignOptions('FX Send', qu['fxsCount'], 15, 0, ['FX Return', this.CHOICES_FX_RETURN]),
		}

		if (this.config.model != 'QU16') {
			actions['fxs_assign_grp'] = {
				label: 'Assign Group to FX Send',
				options: this.mixAssignOptions('FX Send', qu['fxsCount'], 15, 0, ['Group', this.CHOICES_GROUP]),
			}
			actions['fxs_assign_mtx'] = {
				label: 'Assign Matrix to FX Send',
				options: this.mixAssignOptions('FX Send', qu['fxsCount'], 15, 0, ['Matrix', this.CHOICES_MATRIX]),
			}

			actions['grp_assign_input'] = {
				label: 'Assign Input to Group',
				options: this.mixAssignOptions('Group', qu['grpCount'], 7, 99, ['Input channel', this.CHOICES_INPUT_CHANNEL]),
			}
			actions['grp_assign_stereo'] = {
				label: 'Assign Stereo to Group',
				options: this.mixAssignOptions('Group', qu['grpCount'], 7, 99, ['Stereo', this.CHOICES_STEREO_CHANNEL]),
			}
			actions['grp_assign_fxr'] = {
				label: 'Assign FX Return to Group',
				options: this.mixAssignOptions('Group', qu['grpCount'], 7, 99, ['FX Return', this.CHOICES_FX_RETURN]),
			}
		}
		/**/

		/* MuteGroup Assign */
		actions['mutegrp_assign_input'] = {
			label: 'Assign Input to MuteGroup',
			options: this.mixAssignOptions('MuteGroup', qu['muteGroup'], -1, 0, [
				'Input Channel',
				this.CHOICES_INPUT_CHANNEL,
			]),
		}
		actions['mutegrp_assign_stereo'] = {
			label: 'Assign Stereo to MuteGroup',
			options: this.mixAssignOptions('MuteGroup', qu['muteGroup'], -1, 0, ['Stereo', this.CHOICES_STEREO_CHANNEL]),
		}
		actions['mutegrp_assign_fxs'] = {
			label: 'Assign FX Send to MuteGroup',
			options: this.mixAssignOptions('MuteGroup', qu['muteGroup'], -1, 0, ['FX Send', this.CHOICES_FX_SEND]),
		}
		actions['mutegrp_assign_fxr'] = {
			label: 'Assign FX Return to MuteGroup',
			options: this.mixAssignOptions('MuteGroup', qu['muteGroup'], -1, 0, ['FX Return', this.CHOICES_FX_RETURN]),
		}
		actions['mutegrp_assign_mix'] = {
			label: 'Assign Mix to MuteGroup',
			options: this.mixAssignOptions('MuteGroup', qu['muteGroup'], -1, 0, ['Mix', this.CHOICES_MIX]),
		}
		actions['mutegrp_assign_lr'] = {
			label: 'Assign LR to MuteGroup',
			options: this.mixAssignOptions('MuteGroup', qu['muteGroup'], -1, 0, ['LR', this.CHOICES_LR]),
		}
		if (this.config.model != 'QU16') {
			actions['mutegrp_assign_grp'] = {
				label: 'Assign Group to MuteGroup',
				options: this.mixAssignOptions('MuteGroup', qu['muteGroup'], -1, 0, ['Group', this.CHOICES_GROUP]),
			}
		}
		/**/

		/* DCA Group Assign */
		actions['dcagrp_assign_input'] = {
			label: 'Assign Input to DCA',
			options: this.mixAssignOptions('DCA', qu['dcaCount'], -1, 0, ['Input Channel', this.CHOICES_INPUT_CHANNEL]),
		}
		actions['dcagrp_assign_stereo'] = {
			label: 'Assign Stereo to DCA',
			options: this.mixAssignOptions('DCA', qu['dcaCount'], -1, 0, ['Stereo', this.CHOICES_STEREO_CHANNEL]),
		}
		actions['dcagrp_assign_fxs'] = {
			label: 'Assign FX Send to DCA',
			options: this.mixAssignOptions('DCA', qu['dcaCount'], -1, 0, ['FX Send', this.CHOICES_FX_SEND]),
		}
		actions['dcagrp_assign_fxr'] = {
			label: 'Assign FX Return to DCA',
			options: this.mixAssignOptions('DCA', qu['dcaCount'], -1, 0, ['FX Return', this.CHOICES_FX_RETURN]),
		}
		actions['dcagrp_assign_mix'] = {
			label: 'Assign Mix to DCA',
			options: this.mixAssignOptions('DCA', qu['dcaCount'], -1, 0, ['Mix', this.CHOICES_MIX]),
		}
		actions['dcagrp_assign_lr'] = {
			label: 'Assign LR to DCA',
			options: this.mixAssignOptions('DCA', qu['dcaCount'], -1, 0, ['LR', this.CHOICES_LR]),
		}
		if (this.config.model != 'QU16') {
			actions['dcagrp_assign_grp'] = {
				label: 'Assign Group to DCA',
				options: this.mixAssignOptions('DCA', qu['dcaCount'], -1, 0, ['Group', this.CHOICES_GROUP]),
			}
		}
		/**/

		/* Send Level */
		actions['sendlev_input_mix'] = {
			label: 'Level Input to Mix',
			options: this.panOptions(
				'Mix',
				qu['mixCount'],
				-1,
				qu['mixStereo'],
				['Input channel', this.CHOICES_INPUT_CHANNEL],
				true
			),
		}
		if (this.config.model != 'QU16') {
			actions['sendlev_input_group'] = {
				label: 'Level Input to Group (Mix mode)',
				options: this.panOptions('Group', qu['grpCount'], 7, 99, ['Input channel', this.CHOICES_INPUT_CHANNEL], true),
			}
		}
		actions['sendlev_stereo_mix'] = {
			label: 'Level Stereo to Mix',
			options: this.panOptions(
				'Mix',
				qu['mixCount'],
				-1,
				qu['mixStereo'],
				['Stereo', this.CHOICES_STEREO_CHANNEL],
				true
			),
		}
		if (this.config.model != 'QU16') {
			actions['sendlev_stereo_group'] = {
				label: 'Level Stereo to Group (Mix mode)',
				options: this.panOptions('Group', qu['grpCount'], 7, 99, ['Stereo', this.CHOICES_STEREO_CHANNEL], true),
			}
		}
		actions['sendlev_fx_return_mix'] = {
			label: 'Level FX Return to Mix',
			options: this.panOptions('Mix', qu['mixCount'], -1, qu['mixStereo'], ['FX Return', this.CHOICES_FX_RETURN], true),
		}
		if (this.config.model != 'QU16') {
			actions['sendlev_fx_return_group'] = {
				label: 'Level FX Return to Group (Mix mode)',
				options: this.panOptions('Group', qu['grpCount'], 7, 99, ['FX Return', this.CHOICES_FX_RETURN], true),
			}
		}
		actions['sendlev_fx_return_fxs'] = {
			label: 'Level FX Return to FX Send',
			options: this.panOptions('FX Send', qu['fxsCount'], 9, 0, ['FX Return', this.CHOICES_FX_RETURN], true),
		}
		/**/

		/* PAFL Select */
		actions['pafl_input'] = {
			label: 'PAFL Input',
			options: this.paflOptions('Input Channel', qu['chCount'], -1, 0),
		}
		actions['pafl_stereo'] = {
			label: 'PAFL Stereo',
			options: this.paflOptions('Stereo Channel', qu['chStereo'], -1, 0),
		}
		actions['pafl_lr'] = {
			label: 'PAFL LR',
			options: this.paflOptions('LR', 1, -1, 0),
		}
		actions['pafl_mix'] = {
			label: 'PAFL Mix',
			options: this.paflOptions('Mix', qu['mixCount'], -1, qu['mixStereo'], 0),
		}
		actions['pafl_fx_send'] = {
			label: 'PAFL FX Send',
			options: this.paflOptions('FX Send', qu['fxsCount'], -1, 0),
		}
		actions['pafl_fx_return'] = {
			label: 'PAFL FX Return',
			options: this.paflOptions('FX Return', qu['fxrCount'], -1, 0),
		}
		actions['pafl_dca'] = {
			label: 'PAFL DCA',
			options: this.paflOptions('DCA', qu['dcaCount'], -1, 0),
		}

		if (this.config.model != 'QU16') {
			actions['pafl_group'] = {
				label: 'PAFL Group',
				options: this.paflOptions('Group', qu['grpCount'], -1, 99),
			}
			actions['pafl_matrix'] = {
				label: 'PAFL Matrix',
				options: this.paflOptions('Matrix', qu['mtxCount'], -1, 99),
			}
		}
		/**/

		/* Scene Recall */
		actions['scene_recall'] = {
			label: 'Scene recall',
			options: [
				{
					type: 'dropdown',
					label: 'Scene Number',
					id: 'scene',
					default: '0',
					choices: this.CHOICES_SCENES,
					minChoicesForSearch: 0,
				},
			],
		}
		/**/

		actions['channel_name'] = {
			label: 'Channel name',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: '0',
					choices: this.CHOICES_INPUT_CHANNEL,
					minChoicesForSearch: 0,
				},
			],
		}
		/**/

		/* Local Preamp */
		actions['preloc_48_input'] = {
			label: 'Preamp Input 48V',
			options: [
				{
					type: 'dropdown',
					label: 'Input channel',
					id: 'channel',
					default: 0,
					choices: this.CHOICES_INPUT_CHANNEL,
					minChoicesForSearch: 0,
				},
				{
					type: 'checkbox',
					label: 'Activate',
					id: 'active',
					default: true,
				},
			],
		}
		/**/

		/* MMC */
		actions['mmc'] = {
			label: 'MMC Transport Control',
			options: [
				{
					type: 'dropdown',
					label: 'Action',
					id: 'action',
					width: 30,
					default: 1,
					choices: [
						{ label: `Stop`, id: 1 },
						{ label: `Play`, id: 2 },
						{ label: `Fast Forward`, id: 4 },
						{ label: `Rewind`, id: 5 },
						{ label: `Record Strobe`, id: 6 },
						{ label: `Pause`, id: 9 },
					],
					minChoicesForSearch: 0,
				},
			],
		}
		/**/

		return actions
	},
}
