// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        bgm:{
            default:null,
            type:cc.AudioClip,
        },
    },


        onLoad() {
            cc.game.addPersistRootNode(this.node);
        },
    
        
        playBgMusic() {
           this.bgMusicChannel = cc.audioEngine.play(this.bgm,true,0.5)
        },
    
        stopBgMusic: function () {        
            if (this.bgMusicChannel !== undefined) {
                cc.audioEngine.stop(this.bgMusicChannel);            
                this.bgMusicChannel = undefined;
            }
        },
    
    });