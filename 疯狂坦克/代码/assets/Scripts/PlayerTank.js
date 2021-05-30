// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        toolTime:10,
        isGet:false,
        iniHealth:100,
        playerHealth:100,
        playerSpeed:150,
        bulletspeed:350,
        rbody:{
            default:null,
            type:cc.RigidBody},
        Bullet:{
            default:null,
            type:cc.Prefab,
        },
        firePosition:{
            default:null,
            type:cc.Node,
        },
        MoveClip:{
            default:null,
            type:cc.AudioClip,
        },
        FireClip:{
            default:null,
            type:cc.AudioClip,
        },
        toolClip:{
            default:null,
            type:cc.AudioClip,
        },
        lifeClip:{
            default:null,
            type:cc.AudioClip,
        }

        
    },

    onKeyDown(event){
            switch(event.keyCode) {
                case cc.macro.KEY.w:
                    this.moveUp = true;
                    break;
                case cc.macro.KEY.s:
                    this.moveDown = true;
                    break;
                case cc.macro.KEY.a:
                    this.moveLeft = true;
                    break;
                case cc.macro.KEY.d:
                    this.moveRight = true;
                    break;
                case cc.macro.KEY.space:
                    this.schedule(this.fire,0.5,cc.macro.REPEAT_FOREVER,0.001)
                        // cc.audioEngine.playMusic(this.FireClip,false);
                    break;
            }},
    onKeyUp(event){
            switch(event.keyCode) {
                case cc.macro.KEY.w:
                    this.moveUp = false;
                    break;
                case cc.macro.KEY.s:
                    this.moveDown = false;
                    break;
                case cc.macro.KEY.a:
                    this.moveLeft = false;
                    break;
                case cc.macro.KEY.d:
                    this.moveRight = false;
                    break;
                case cc.macro.KEY.space:
                    this.unschedule(this.fire,0.5,cc.macro.REPEAT_FOREVER,0.001)
                    break;
            }

        },
    onLoad: function () {

        this.moveUp = false;
        this.moveDown = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.openFire = false;
        cc.director.getPhysicsManager().enabled=true;
        cc.director.getCollisionManager().enabled = true;
        this.firePosition=this.node.getChildByName("firePosition");
        this.rbody=this.getComponent(cc.RigidBody);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.bar = this.node.getChildByName('HealthBar').getComponent(cc.Sprite)
    },

    fire(){
        
        let bullet=cc.instantiate(this.Bullet);
        bullet.angle=this.node.angle;
        bullet.getComponent('bullet').speed=this.bulletspeed+this.playerSpeed;
        bullet.setParent(cc.director.getScene());
        
        let pos =this.firePosition.convertToWorldSpaceAR(cc.v2(0,0))
        bullet.x = pos.x;
        bullet.y = pos.y;
        cc.audioEngine.playMusic(this.FireClip,false);
    },

    update: function (dt) {
        if(this.moveUp){
        this.node.angle=0;
        this.rbody.linearVelocity=cc.v2(0,this.playerSpeed);
        if(cc.audioEngine.isMusicPlaying()==false)
        {cc.audioEngine.playMusic(this.MoveClip,false)}
        }
        else if(this.moveDown){
        this.node.angle=-180;
        this.rbody.linearVelocity=cc.v2(0,-this.playerSpeed);
        if(cc.audioEngine.isMusicPlaying()==false)
        {cc.audioEngine.playMusic(this.MoveClip,false)}
        }
        else if(this.moveLeft){
        this.node.angle=90;
        this.rbody.linearVelocity=cc.v2(-this.playerSpeed,0);
        if(cc.audioEngine.isMusicPlaying()==false)
        {cc.audioEngine.playMusic(this.MoveClip,false)}
        }
        else if(this.moveRight){
        this.node.angle=-90;
        this.rbody.linearVelocity=cc.v2(this.playerSpeed,0);
        if(cc.audioEngine.isMusicPlaying()==false)
        {cc.audioEngine.playMusic(this.MoveClip,false)}
        }else{this.rbody.linearVelocity=cc.v2(0,0)}

        if(this.playerHealth<=0){
            this.node.destroy()
        }
        this.bar.fillRange = (this.playerHealth / this.iniHealth); 
    },

    //道具功能
    supplyHealth(){
        if(this.playerHealth<iniHealth&&playerHealth!=0)
        this.playerHealth=this.iniHealth
    },
    litPlayerSpeed(){
        this.playerSpeed*=2
    },
    recoverPlayerSpeed(){
        this.playerSpeed*=0.5
    },
    litBulletSpeed(){
        this.bulletspeed*=2
    },
    recoverBulletSpeed(){
        this.bulletspeed*=0.5
    },

    //道具功能

    onBeginContact(contact,selfCollider,otherCollider){
        if(otherCollider.tag==1){this.playerHealth-=20}
        else if(otherCollider.tag==2){
            this.playerHealth=this.iniHealth;
            //cc.audioEngine.playMusic(this.toolClip,false);
            cc.audioEngine.playMusic(this.lifeClip,false)
        }
        else if(otherCollider.tag==4){
            this.playerSpeed*=2;
            cc.audioEngine.playMusic(this.toolClip,false)
        }
        else if(otherCollider.tag==3){
            this.bulletspeed*=2;
            cc.audioEngine.playMusic(this.toolClip,false)
        }
        else if(otherCollider.tag==5){
            this.node.scale=0.75;
            cc.audioEngine.playMusic(this.toolClip,false)
        }
    },

    jump:function(){this.node.setPosition(1400,40);return 0},

    start(){
        this.scheduleOnce(this.jump,1)
    }
});
