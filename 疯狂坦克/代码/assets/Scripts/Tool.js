/**
 * 道具
 */
//道具类型
var ToolType = cc.Enum({
    supplyHealth:0,
    clearAll:1,
    litBulletSpeed:2,
    litPlayerSpeed:3,
});


    /**
     * 销毁
     * 在onload用scheduleOnce(this.node.destroy(),this.existTime)
     * 
     */

   

    //初始化函数，可供外界调用，理论上；
    /* init:function(tankGame, spriteFrame, toolType) {
        this.tankGame = tankGame;
        this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        this.toolType = toolType;
    }, */
/*     init:function(toolType){
        this.Type=toolType;
        this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    },
 */

/*     //让道具消失
    hide: function() {
        this.isAviable = false;
        //this.Game.recoveryTool(this.node);
        this.node.destory();
    },


    onBeginContact(contact,selfCollider,otherCollider){
        if(otherCollider.tag==2){
           // this.enemyHealth-=20
           this.node.destory();
        }
    },

    //设置可用的位置，先随机生成一个位置
        setAvailablePos:function () {
        var tiles = this.map.colliLayer.getTiles();

        //cc.random0To1():产生一个0-1的随机数
        //math.floor()向下取整
        var curIndex = Math.floor(cc.random0To1() * (mapSize.width - 2) * (mapSize.height - 2));
        var x = curIndex % mapSize.height;
        var y = Math.floor(curIndex / mapSize.width);

        //再判断是否可用，避开Obstacles\enemy\player\已生成的tool
        



        this.node.setPosition(cc.v2(x,y));
    },


    show:function(){
        this.setAvailablePos();
        this.isAviable = true;
        this.node.parent = this.tankGame.node;
    },
 */

cc.Class({
    extends: cc.Component,

    properties: { 
        existTime:15,
        rbody:{
            default:null,
            type:cc.RigidBody
        },
        // isAavailable:false,
        // toolType:ToolType.supplyHealth,
    },


    hide:function(){
        this.node.destroy();
    },

    onBeginContact(contact,selfCollider,otherCollider){
        if(otherCollider.tag==0){
            this.hide();
        }
    },


    onLoad () {
        this.rbody=this.getComponent(cc.RigidBody);
        this.scheduleOnce(this.hide,this.existTime)
        //let toolTmp=cc.instantiate(this.Tool),
    },
    start(){

    }
});
