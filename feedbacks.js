module.exports = {
    
	getFeedbacks : function() {
        
        let feedbacks = {};

        feedbacks['mute_input'] = {
            label: 'Mute Input',
            description: 'Change colour',
            options: [
                {
                    type: 'colorpicker',
                    label: 'Foreground color',
                    id: 'fg',
                    default: this.rgb(255, 255, 255)
                },{
                    type: 'colorpicker',
                    label: 'Background color',
                    id: 'bg',
                    default: this.rgb(153, 0, 51)
                }
            ],
            callback: (feedback, bank) => {
                return this.feedbackStatus(feedback, bank, 'mute_input', 0x20);
            }
        }
        
        feedbacks['mute_stereo'] = {
            label: 'Mute Stereo',
            description: 'Change colour',
            options: [
                {
                    type: 'colorpicker',
                    label: 'Foreground color',
                    id: 'fg',
                    default: this.rgb(255, 255, 255)
                },{
                    type: 'colorpicker',
                    label: 'Background color',
                    id: 'bg',
                    default: this.rgb(153, 0, 51)
                }
            ],
            callback: (feedback, bank) => {
                return this.feedbackStatus(feedback, bank, 'mute_stereo', 0x40);
            }
        }
        
        feedbacks['mute_lr'] = {
            label: 'Mute LR',
            description: 'Change colour',
            options: [
                {
                    type: 'colorpicker',
                    label: 'Foreground color',
                    id: 'fg',
                    default: this.rgb(255, 255, 255)
                },{
                    type: 'colorpicker',
                    label: 'Background color',
                    id: 'bg',
                    default: this.rgb(153, 0, 51)
                }
            ],
            callback: (feedback, bank) => {
                return this.feedbackStatus(feedback, bank, 'mute_lr', 0x67);
            }
        }
        
        feedbacks['mute_mix'] = {
            label: 'Mute Mix',
            description: 'Change colour',
            options: [
                {
                    type: 'colorpicker',
                    label: 'Foreground color',
                    id: 'fg',
                    default: this.rgb(255, 255, 255)
                },{
                    type: 'colorpicker',
                    label: 'Background color',
                    id: 'bg',
                    default: this.rgb(153, 0, 51)
                }
            ],
            callback: (feedback, bank) => {
                return this.feedbackStatus(feedback, bank, 'mute_mix', 0x60);
            }
        }
        
        if (this.config.model != 'QU16') {
            feedbacks['mute_group'] = {
                label: 'Mute Group',
                description: 'Change colour',
                options: [
                    {
                        type: 'colorpicker',
                        label: 'Foreground color',
                        id: 'fg',
                        default: this.rgb(255, 255, 255)
                    },{
                        type: 'colorpicker',
                        label: 'Background color',
                        id: 'bg',
                        default: this.rgb(153, 0, 51)
                    }
                ],
                callback: (feedback, bank) => {
                    return this.feedbackStatus(feedback, bank, 'mute_group', 0x68);
                }
            }
        }
        
        feedbacks['mute_fx_return'] = {
            label: 'Mute FX Return',
            description: 'Change colour',
            options: [
                {
                    type: 'colorpicker',
                    label: 'Foreground color',
                    id: 'fg',
                    default: this.rgb(255, 255, 255)
                },{
                    type: 'colorpicker',
                    label: 'Background color',
                    id: 'bg',
                    default: this.rgb(153, 0, 51)
                }
            ],
            callback: (feedback, bank) => {
                return this.feedbackStatus(feedback, bank, 'mute_fx_return', 0x08);
            }
        }
        
        feedbacks['mute_fx_send'] = {
            label: 'Mute FX Send',
            description: 'Change colour',
            options: [
                {
                    type: 'colorpicker',
                    label: 'Foreground color',
                    id: 'fg',
                    default: this.rgb(255, 255, 255)
                },{
                    type: 'colorpicker',
                    label: 'Background color',
                    id: 'bg',
                    default: this.rgb(153, 0, 51)
                }
            ],
            callback: (feedback, bank) => {
                return this.feedbackStatus(feedback, bank, 'mute_fx_send', 0x00);
            }
        }
        
        if (this.config.model != 'QU16') {
            feedbacks['mute_matrix'] = {
                label: 'Mute Matrix',
                description: 'Change colour',
                options: [
                    {
                        type: 'colorpicker',
                        label: 'Foreground color',
                        id: 'fg',
                        default: this.rgb(255, 255, 255)
                    },{
                        type: 'colorpicker',
                        label: 'Background color',
                        id: 'bg',
                        default: this.rgb(153, 0, 51)
                    }
                ],
                callback: (feedback, bank) => {
                    return this.feedbackStatus(feedback, bank, 'mute_matrix', 0x6C);
                }
            }
        }
        
        feedbacks['mute_dca'] = {
            label: 'Mute DCA',
            description: 'Change colour',
            options: [
                {
                    type: 'colorpicker',
                    label: 'Foreground color',
                    id: 'fg',
                    default: this.rgb(255, 255, 255)
                },{
                    type: 'colorpicker',
                    label: 'Background color',
                    id: 'bg',
                    default: this.rgb(153, 0, 51)
                }
            ],
            callback: (feedback, bank) => {
                return this.feedbackStatus(feedback, bank, 'mute_dca', 0x10);
            }
        }
        
        feedbacks['mute_mutegroup'] = {
            label: 'Mute MuteGroup',
            description: 'Change colour',
            options: [
                {
                    type: 'colorpicker',
                    label: 'Foreground color',
                    id: 'fg',
                    default: this.rgb(255, 255, 255)
                },{
                    type: 'colorpicker',
                    label: 'Background color',
                    id: 'bg',
                    default: this.rgb(153, 0, 51)
                }
            ],
            callback: (feedback, bank) => {
                return this.feedbackStatus(feedback, bank, 'mute_mutegroup', 0x50);
            }
        }
        
        return feedbacks;
	},
    
    feedbackStatus : function(feedback, bank, typ, ofs) {
        var ret = {};
        var pg, bk, ii, strip;
        
        system.emit('db_get', 'feedbacks', function(res) {
            for ( let pag in res ) {
                for ( let bnk in res[pag] ) {
                    if ( typeof res[pag][bnk] == 'object' && Object.keys(res[pag][bnk]).length !== 0 ) {
						for (let i in res[pag][bnk]) {
							if ( res[pag][bnk][i]['id'] == feedback.id ) {
								pg = pag;
								bk = bnk;
								ii = i;
							}
						}
                    }
                }
            }
        });
        
        system.emit('db_get', 'bank_actions', function(res) {
            strip = res[pg][bk][ii]['options']['channel'];
        });
        
        this.getVariable(typ + '_' + (ofs + parseInt(strip)), function(res) {
            if (res) {
                    ret = { color: feedback.options.fg, bgcolor: feedback.options.bg };
            } else {
                    ret = { color: bank.color, bgcolor: bank.bgcolor };
            }
        });
        
        
        return ret;
    }
	
}
