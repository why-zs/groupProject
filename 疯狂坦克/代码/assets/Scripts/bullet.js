// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: { 
        speed:50,
    },

    start () {
        let r =cc.misc.degreesToRadians(-this.node.angle);
        let v2 = cc.v2(0,1).rotate(-r);
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(v2.x*(this.speed),v2.y*(this.speed));
    },

    onBeginContact(){
        this.node.destroy();
    }
});
