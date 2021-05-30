// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


window.isTwo=false;
cc.Class({
    extends: cc.Component,

    properties: {     
    },
    start () {
        cc.director.preloadScene('One');
        cc.director.preloadScene('Two');
        cc.director.preloadScene('Three');
        cc.director.preloadScene('Four');
        cc.director.preloadScene('Five');
        cc.director.preloadScene('Six');
        //获取全局播放器
        this.AudioPlayer = cc.find("Audio").getComponent("bgm");
        //停止再开启背景音乐
        this.AudioPlayer.stopBgMusic();
        this.AudioPlayer.playBgMusic();


        
    },

    // update (dt) {},
});
