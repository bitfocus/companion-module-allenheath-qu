const quconfig   = require('./quconfig.json');

module.exports = {

    getVariables() {
        
        var qu = quconfig['config'][this.config.model];
        var variables = [];
        
		for (let i = 0; i < qu['chCount']; i++) {
			variables.push({
               label: `CH ${i + 1} Level`,
               name:  `level_input_${32 + i}`
            });
            
            variables.push({
               label: `CH ${i + 1} Name`,
               name:  `ch_name_${32 + i}`
            });
            
            this.setVariable(`ch_name_${32 + i}`, `CH ${i + 1}`);
		}
        
        for (let i = 0; i < qu['chStereo']; i++) {
			variables.push({
               label: `Stereo ${i + 1} Level`,
               name:  `level_stereo_${64 + i}`
            });
            
            variables.push({
               label: `Stereo ${i + 1} Name`,
               name:  `ch_name_${64 + i}`
            });
            
            this.setVariable(`ch_name_${64 + i}`, `ST ${i + 1}`);
		}
		
		for (let i = 0; i < qu['mixCount']; i++) {
			variables.push({
               label: `Mix ${i + 1} Level`,
               name:  `level_mix_${96 + i}`
            });
            
            variables.push({
               label: `Mix ${i + 1} Name`,
               name:  `ch_name_${96 + i}`
            });
            
            this.setVariable(`ch_name_${96 + i}`, `Mix ${i + 1}`);
		}
		
		for (let i = qu['mixCount']; i < qu['mixStereo'] + qu['mixCount']; i++) {
		    let ca = 5;
			variables.push({
               label: `Mix ${ca}/${ca + 1} Level`,
               name:  `level_mix_${96 + i}`
            });
            
            variables.push({
               label: `Mix ${ca}/${ca + 1} Name`,
               name:  `ch_name_${96 + i}`
            });
            
            this.setVariable(`ch_name_${96 + i}`, `Mix ${ca}/${ca + 1}`);
            ca = ca + 2;
		}
		
		if (this.config.model != 'QU16') {
		    for (let i = 0; i < qu['grpCount']; i++) {
    		    let ca = 1;
    			variables.push({
                   label: `Group ${ca}/${ca + 1} Level`,
                   name:  `level_mix_${104 + i}`
                });
                
                variables.push({
                   label: `Group ${ca}/${ca + 1} Name`,
                   name:  `ch_name_${104 + i}`
                });
                
                this.setVariable(`ch_name_${104 + i}`, `Group ${ca}/${ca + 1}`);
                ca = ca + 2;
    		}
    		
    		for (let i = 0; i < qu['mtxCount']; i++) {
    		    let ca = 1;
    			variables.push({
                   label: `Matrix ${ca}/${ca + 1} Level`,
                   name:  `level_mix_${108 + i}`
                });
                
                variables.push({
                   label: `Matrix ${ca}/${ca + 1} Name`,
                   name:  `ch_name_${108 + i}`
                });
                
                this.setVariable(`ch_name_${108 + i}`, `Matrix ${ca}/${ca + 1}`);
                ca = ca + 2;
    		}
		}
		
		for (let i = 0; i < qu['fxsCount']; i++) {
			variables.push({
               label: `FX Send ${i + 1} Level`,
               name:  `level_mix_${0 + i}`
            });
            
            variables.push({
               label: `FX Send ${i + 1} Name`,
               name:  `ch_name_${0 + i}`
            });
            
            this.setVariable(`ch_name_${0 + i}`, `FX Snd ${i + 1}`);
		}
		
		for (let i = 0; i < qu['fxrCount']; i++) {
			variables.push({
               label: `FX Return ${i + 1} Level`,
               name:  `level_mix_${8 + i}`
            });
            
            variables.push({
               label: `FX Return ${i + 1} Name`,
               name:  `ch_name_${8 + i}`
            });
            
            this.setVariable(`ch_name_${8 + i}`, `FX Rtn ${i + 1}`);
		}
		
		for (let i = 0; i < qu['dcaCount']; i++) {
			variables.push({
               label: `DCA ${i + 1} Level`,
               name:  `level_mix_${16 + i}`
            });
            
            variables.push({
               label: `DCA ${i + 1} Name`,
               name:  `ch_name_${16 + i}`
            });
            
            this.setVariable(`ch_name_${16 + i}`, `DCA ${i + 1}`);
		}
		
        return variables;
    }
}
