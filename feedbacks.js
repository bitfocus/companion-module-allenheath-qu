const quconfig   = require('./quconfig.json');

module.exports = {
    
	getFeedbacks : function() {
        
        var qu = quconfig['config'][this.config.model];
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
                },{
    				type:    'dropdown',
    				label:   'Input channel',
    				id:      'channel',
    				default: 0,
    				choices: this.CHOICES_INPUT_CHANNEL,
    				minChoicesForSearch: 0
    			}
            ],
            callback: (feedback, bank) => {
                return this.feedbackStatus(feedback, bank, 'mute_input_' + (parseInt(feedback.options.channel) + 0x20));
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
                },{
    				type:    'dropdown',
    				label:   'Stereo channel',
    				id:      'channel',
    				default: 0,
    				choices: this.CHOICES_STEREO_CHANNEL,
    				minChoicesForSearch: 0
    			}
            ],
            callback: (feedback, bank) => {
                return this.feedbackStatus(feedback, bank, 'mute_stereo_' + (parseInt(feedback.options.channel) + 0x40));
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
                },{
    				type:    'dropdown',
    				label:   'LR',
    				id:      'channel',
    				default: 0,
    				choices: this.CHOICES_LR,
    				minChoicesForSearch: 99
    			}
            ],
            callback: (feedback, bank) => {
                return this.feedbackStatus(feedback, bank, 'mute_lr_' + (parseInt(feedback.options.channel) + 0x67));
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
                },{
    				type:    'dropdown',
    				label:   'Mix',
    				id:      'channel',
    				default: 0,
    				choices: this.CHOICES_MIX,
    				minChoicesForSearch: 0
    			}
            ],
            callback: (feedback, bank) => {
                return this.feedbackStatus(feedback, bank, 'mute_mix_' + (parseInt(feedback.options.channel) + 0x60));
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
                    },{
        				type:    'dropdown',
        				label:   'Group',
        				id:      'channel',
        				default: 0,
        				choices: this.CHOICES_GROUP,
        				minChoicesForSearch: 0
        			}
                ],
                callback: (feedback, bank) => {
                    return this.feedbackStatus(feedback, bank, 'mute_group_' + (parseInt(feedback.options.channel) + 0x68));
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
                },{
    				type:    'dropdown',
    				label:   'FX Return',
    				id:      'channel',
    				default: 0,
    				choices: this.CHOICES_FX_RETURN,
    				minChoicesForSearch: 0
    			}
            ],
            callback: (feedback, bank) => {
                return this.feedbackStatus(feedback, bank, 'mute_fx_return_' + (parseInt(feedback.options.channel) + 0x08));
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
                },{
    				type:    'dropdown',
    				label:   'FX Send',
    				id:      'channel',
    				default: 0,
    				choices: this.CHOICES_FX_SEND,
    				minChoicesForSearch: 0
    			}
            ],
            callback: (feedback, bank) => {
                return this.feedbackStatus(feedback, bank, 'mute_fx_send_' + (parseInt(feedback.options.channel) + 0x00));
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
                    },{
        				type:    'dropdown',
        				label:   'Matrix',
        				id:      'channel',
        				default: 0,
        				choices: this.CHOICES_MATRIX,
        				minChoicesForSearch: 0
        			}
                ],
                callback: (feedback, bank) => {
                    return this.feedbackStatus(feedback, bank, 'mute_matrix_' + (parseInt(feedback.options.channel) + 0x6C));
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
                },{
    				type:    'dropdown',
    				label:   'DCA',
    				id:      'channel',
    				default: 0,
    				choices: this.CHOICES_DCA,
    				minChoicesForSearch: 0
    			}
            ],
            callback: (feedback, bank) => {
                return this.feedbackStatus(feedback, bank, 'mute_dcs_' + (parseInt(feedback.options.channel) + 0x10));
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
                },{
    				type:    'dropdown',
    				label:   'MuteGroup',
    				id:      'channel',
    				default: 0,
    				choices: this.CHOICES_MUTEGROUP,
    				minChoicesForSearch: 0
    			}
            ],
            callback: (feedback, bank) => {
                return this.feedbackStatus(feedback, bank, 'mute_mutegroup_' + (parseInt(feedback.options.channel) + 0x50));
            }
        }
        
        return feedbacks;
	},
    
    feedbackStatus : function(feedback, bank, val) {
        var ret = {};
        
        this.getVariable(val, function(res) {
            if (res) {
                    ret = { color: feedback.options.fg, bgcolor: feedback.options.bg };
            } else {
                    ret = { color: bank.color, bgcolor: bank.bgcolor };
            }
        });
        
        return ret;
    }
	
}
