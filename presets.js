const quconfig = require('./quconfig.json');

module.exports = {

	getPresets: function() {
		var qu = quconfig['config'][this.config.model];
		var presets = [];
		
		/* MUTE */
		const createtMute = (cat, lab, typ, cnt, ofs) => {
			var tmp = [];
			
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
						latch: true
					},
					actions: [
						{
							action: typ,
							options: {
								strip: i,
								mute: true
							}
						}
					],
					release_actions: [
						{
							action: typ,
							options: {
								strip: i,
								mute: false
							}
						}
					],
					feedbacks: [
						{
							type: typ
						}
					]
				};
				
				presets.push(pst);
			}
		}

		createtMute('Mute Input', 'Input channel', 'mute_input', qu['chCount'], 32);
		createtMute('Mute Stereo', 'Stereo channel', 'mute_stereo', qu['chStereo'], 64);
		createtMute('Mute LR', 'LR', 'mute_lr', 1, 103);
		createtMute('Mute Mix', 'Mix', 'mute_mix', qu['mixCount'], 96);
		createtMute('Mute Stereo Mix', 'Mix', 'mute_mix', qu['mixStereo'], 100);
		
		if (this.config.model != 'QU16') {
			createtMute('Mute Group', 'Group', 'mute_group', qu['grpCount'], 104);
			createtMute('Mute Matrix', 'Matrix', 'mute_matrix', qu['mtxCount'], 108);
		}
		
		createtMute('Mute FX Send', 'FX ', 'mute_fx_send', qu['fxsCount'], 0);
		createtMute('Mute FX Return', 'FX ', 'mute_fx_return', qu['fxrCount'], 8);
		createtMute('Mute DCA', 'DCA ', 'mute_dca', qu['dcaCount'], 16);
		createtMute('Mute MuteGroup', 'MuteGroup ', 'mute_mutegroup', qu['muteGroup'], 80);
		
		return(presets);
	}
}