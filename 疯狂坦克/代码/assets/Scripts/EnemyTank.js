// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var player=require('PlayerTank')
cc.Class({
    extends: cc.Component,

    properties: {
        Bullet:{
            default:null,
            type:cc.Prefab,
        },
        firePosition:{
            default:null,
            type:cc.Node,
        },
        fireGap:1,
        bulletspeed:0,
        enemyHealth:400,
        rbody:{
            default:null,
            type:cc.RigidBody}
    },

    fire(){
        let bullet=cc.instantiate(this.Bullet);
        bullet.angle=this.node.angle+180;
        bullet.getComponent('bullet').speed=this.bulletspeed;

        //第二种实现
        bullet.setParent(cc.director.getScene());
        this.firePosition=this.node.getChildByName("firePosition");
        let pos =this.firePosition.convertToWorldSpaceAR(cc.v2(0,0))
        bullet.x = pos.x;
        bullet.y = pos.y;

    },

    onBeginContact(contact,selfCollider,otherCollider){
        if(otherCollider.tag==1){this.enemyHealth-=20}
    },

    move(){
        // let Tx = Math.ceil(this.x/80);
        // let Ty = 18-Math.ceil(this.y/80);


        // lID = this.layer.getTileGIDAt(Tx-1,Ty);
        // rID = this.layer.getTileGIDAt(Tx+1,Ty);
        // uID = this.layer.getTileGIDAt(Tx,Ty+1);
        // dID = this.layer.getTileGIDAt(Tx,Ty-1);

        rand = Math.floor(Math.random()*1000);

        if(rand <= 250){
            this.node.angle = 0;
            this.rbody.linearVelocity = cc.v2(0,-150)}
        else if(rand <= 500){
            this.node.angle = 180;
            this.rbody.linearVelocity = cc.v2(0,150)}
        else if(rand <= 750){
            this.node.angle = 270;
            this.rbody.linearVelocity = cc.v2(-150,0)}
        else if(rand <= 1000){
            this.node.angle = 90;
            this.rbody.linearVelocity = cc.v2(150,0)}

    },

    clearAll(){
        if(player.isGet==1){
            this.node.destroy();
        }
        },

    update(){
        if(this.enemyHealth<=0){this.node.destroy(),
            enemyNumber--}
        this.clearAll();
    },
    
    onLoad(){
        this.layer = cc.find('Canvas/Map').getComponent(cc.TiledMap).getLayer("Obstacles")
        this.rbody=this.getComponent(cc.RigidBody);
    },
    
    ini:function(){
        this.rbody.angularVelocity = 1080;
        return 0 
    },

    start () {
        this.scheduleOnce(this.ini,1)
        this.schedule(this.move,1, cc.macro.REPEAT_FOREVER,1);
        this.schedule(this.fire, this.fireGap, cc.macro.REPEAT_FOREVER,1);
    },

});