const quconfig   = require('./quconfig.json');

module.exports = {
    
	getFeedbacks : function() {
        
        var qu = quconfig['config'][this.config.model];
        var feedbacks = {};
        
        const createtFdb = (nam, typ, lab, col, chs, ofs) => {
            let fg = this.rgb(col['fg'][0], col['fg'][1], col['fg'][2]);
            let bg = this.rgb(col['bg'][0], col['bg'][1], col['bg'][2]);
            
            feedbacks[nam] = {
                label: `${typ} ${lab}`,
                description: 'Change colour',
                options: [
                    {
                        type: 'colorpicker',
                        label: 'Foreground color',
                        id: 'fg',
                        default: fg
                    },{
                        type: 'colorpicker',
                        label: 'Background color',
                        id: 'bg',
                        default: bg
                    },{
        				type:    'dropdown',
        				label:   lab,
        				id:      'channel',
        				default: 0,
        				choices: chs,
        				minChoicesForSearch: 0
        			}
                ],
                callback: (feedback, bank) => {
                    return this.feedbackStatus(feedback, bank, `${typ.toLowerCase()}_` + (parseInt(feedback.options.channel) + ofs));
                }
            }
        }
        
        /* Mute */
        createtFdb('mute_input', 'Mute', 'Input', {'fg':[255, 255, 255], 'bg':[153, 0, 51]}, this.CHOICES_INPUT_CHANNEL, 0x20);
        createtFdb('mute_stereo', 'Mute', 'Stereo', {'fg':[255, 255, 255], 'bg':[153, 0, 51]}, this.CHOICES_STEREO_CHANNEL, 0x40);
        createtFdb('mute_lr', 'Mute', 'LR', {'fg':[255, 255, 255], 'bg':[153, 0, 51]}, this.CHOICES_LR, 0x67);
        createtFdb('mute_mix', 'Mute', 'Mix', {'fg':[255, 255, 255], 'bg':[153, 0, 51]}, this.CHOICES_MIX, 0x60);
        createtFdb('mute_fx_return', 'Mute', 'FX Return', {'fg':[255, 255, 255], 'bg':[153, 0, 51]}, this.CHOICES_FX_RETURN, 0x08);
        createtFdb('mute_fx_send', 'Mute', 'FX Send', {'fg':[255, 255, 255], 'bg':[153, 0, 51]}, this.CHOICES_FX_SEND, 0x00);
        if ( this.config.model != 'QU16' ) {
            createtFdb('mute_group', 'Mute', 'Group', {'fg':[255, 255, 255], 'bg':[153, 0, 51]}, this.CHOICES_GROUP, 0x68);
            createtFdb('mute_matrix', 'Mute', 'Matrix', {'fg':[255, 255, 255], 'bg':[153, 0, 51]}, this.CHOICES_MATRIX, 0x6C);
        }
        createtFdb('mute_dca', 'Mute', 'DCA', {'fg':[255, 255, 255], 'bg':[153, 0, 51]}, this.CHOICES_DCA, 0x10);
        createtFdb('mute_mutegroup', 'Mute', 'MuteGroup', {'fg':[255, 255, 255], 'bg':[153, 0, 51]}, this.CHOICES_MUTEGROUP, 0x50);
        
        /* PAFL */
        createtFdb('pafl_input', 'PAFL', 'Input', {'fg':[0,0,0], 'bg':[255, 153, 51]}, this.CHOICES_INPUT_CHANNEL, 0x20);
        createtFdb('pafl_stereo', 'PAFL', 'Stereo', {'fg':[0,0,0], 'bg':[255, 153, 51]}, this.CHOICES_STEREO_CHANNEL, 0x40);
        createtFdb('pafl_lr', 'PAFL', 'LR', {'fg':[0,0,0], 'bg':[255, 153, 51]}, this.CHOICES_LR, 0x67);
        createtFdb('pafl_mix', 'PAFL', 'Mix', {'fg':[0,0,0], 'bg':[255, 153, 51]}, this.CHOICES_MIX, 0x60);
        createtFdb('pafl_fx_return', 'PAFL', 'FX Return', {'fg':[0,0,0], 'bg':[255, 153, 51]}, this.CHOICES_FX_RETURN, 0x08);
        createtFdb('pafl_fx_send', 'PAFL', 'FX Send', {'fg':[0,0,0], 'bg':[255, 153, 51]}, this.CHOICES_FX_SEND, 0x00);
        if ( this.config.model != 'QU16' ) {
            createtFdb('pafl_group', 'PAFL', 'Group', {'fg':[0,0,0], 'bg':[255, 153, 51]}, this.CHOICES_GROUP, 0x68);
            createtFdb('pafl_matrix', 'PAFL', 'Matrix', {'fg':[0,0,0], 'bg':[255, 153, 51]}, this.CHOICES_MATRIX, 0x6C);
        }
        createtFdb('pafl_dca', 'PAFL', 'DCA', {'fg':[0,0,0], 'bg':[255, 153, 51]}, this.CHOICES_DCA, 0x10);
        
        return feedbacks;
	},
    
    feedbackStatus : function(feedback, bank, val) {
        var ret = {};
        
        if ( this.fdbState[val] ) {
            ret = { color: feedback.options.fg, bgcolor: feedback.options.bg };
        } else {
            ret = { color: bank.color, bgcolor: bank.bgcolor };
        }
        
        return ret;
    }
	
}
