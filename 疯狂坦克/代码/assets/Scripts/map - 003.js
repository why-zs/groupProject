// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
window.enemyNumber= null,
cc.Class({
    extends: cc.Component,
    

    properties: {
        secondPlayer:{
            default:null,
            type:cc.Prefab,
        },
        tMap:{
            default:null,
            type:cc.TiledMap,
        },
        enemyTank:{
            default:null,
            type:cc.Prefab,
        },
        enemyNum:0,
        toolGap:30,
        toolPrefab: {
            default: null,
            type: cc.Prefab
        },
        toolPrefab2: {
            default: null,
            type: cc.Prefab
        }, 
        toolPrefab3: {
            default: null,
            type: cc.Prefab
        },        
        toolPrefab4: {
            default: null,
            type: cc.Prefab
        },
    },

    creatTool(){//加健康值
        let tmp = [];
        for (let i = 0; i < 1; ++i){
            len = this.avaPosition.length;
            ran = (Math.floor(Math.random()*len));
            t=this.avaPosition[ran];
            this.avaPosition[ran]=this.avaPosition[(this.avaPosition.length-=1)];
            this.avaPosition[(this.avaPosition.length-=1)]=t;
            tmp[i]=t;
        }

        for (let i = 0; i < 1; ++i) {
            let toolTmp=cc.instantiate(this.toolPrefab); // 创建节点
            // var tmp=Math.floor(Math.random()*this.avaPosition.length);
            let pos =tmp[i].node.convertToWorldSpaceAR(cc.v2(0,0));
            toolTmp.x=pos.x+40;
            toolTmp.y=pos.y+40;
            toolTmp.setParent(cc.director.getScene());
        }
    },
    creatTool2(){//子弹加速
        let tmp = [];
        for (let i = 0; i < 1; ++i){
            len = this.avaPosition.length;
            ran = (Math.floor(Math.random()*len));
            t=this.avaPosition[ran];
            this.avaPosition[ran]=this.avaPosition[(this.avaPosition.length-=1)];
            this.avaPosition[(this.avaPosition.length-=1)]=t;
            tmp[i]=t;
        }

        for (let i = 0; i < 1; ++i) {
            let toolTmp=cc.instantiate(this.toolPrefab2); // 创建节点
            // var tmp=Math.floor(Math.random()*this.avaPosition.length);
            let pos =tmp[i].node.convertToWorldSpaceAR(cc.v2(0,0));
            toolTmp.x=pos.x+40;
            toolTmp.y=pos.y+40;
            toolTmp.setParent(cc.director.getScene());
        }
    },

    //我添加的
    creatTool3(){//playerTank加速
        let tmp = [];
        for (let i = 0; i < 1; ++i){
            len = this.avaPosition.length;
            ran = (Math.floor(Math.random()*len));
            t=this.avaPosition[ran];
            this.avaPosition[ran]=this.avaPosition[(this.avaPosition.length-=1)];
            this.avaPosition[(this.avaPosition.length-=1)]=t;
            tmp[i]=t;
        }

        for (let i = 0; i < 1; ++i) {
            let toolTmp=cc.instantiate(this.toolPrefab3); // 创建节点
            // var tmp=Math.floor(Math.random()*this.avaPosition.length);
            let pos =tmp[i].node.convertToWorldSpaceAR(cc.v2(0,0));
            toolTmp.x=pos.x+40;
            toolTmp.y=pos.y+40;
            toolTmp.setParent(cc.director.getScene());
        }
    },
    creatTool4(){//让自己更小更灵活
        let tmp = [];
        for (let i = 0; i < 1; ++i){
            len = this.avaPosition.length;
            ran = (Math.floor(Math.random()*len));
            t=this.avaPosition[ran];
            this.avaPosition[ran]=this.avaPosition[(this.avaPosition.length-=1)];
            this.avaPosition[(this.avaPosition.length-=1)]=t;
            tmp[i]=t;
        }

        for (let i = 0; i < 1; ++i) {
            let toolTmp=cc.instantiate(this.toolPrefab4); // 创建节点
            // var tmp=Math.floor(Math.random()*this.avaPosition.length);
            let pos =tmp[i].node.convertToWorldSpaceAR(cc.v2(0,0));
            toolTmp.x=pos.x+40;
            toolTmp.y=pos.y+40;
            toolTmp.setParent(cc.director.getScene());
        }
    },

    ranCreatTool(){
        let index=Math.random();
        if(index>=0&&index<0.3){
            this.creatTool();
        }else if(index>=0.3&&index<0.6){
            this.creatTool2();
        }else if(index>=0.6&&index<0.9){
            this.creatTool3();
        }else if(index>=0.9&&index<1){
            this.creatTool4();
        }
    },
    creatEnemy(){
        let tmp = [];
        for (let i = 0; i < this.enemyNum; i++){
            len = this.avaPosition.length;
            ran = Math.floor(Math.random()*len);
            t=this.avaPosition[ran];
            this.avaPosition[ran]=this.avaPosition[(len-1)];
            this.avaPosition[(len-1)]=t;
            len--;
            tmp[i]=t;
        }

        for (let i = 0; i < this.enemyNum; i++) {
            let enemyTmp=cc.instantiate(this.enemyTank); // 创建节点
            let pos =tmp[i].node.convertToWorldSpaceAR(cc.v2(0,0));
            enemyTmp.x=pos.x+40;
            enemyTmp.y=pos.y+40;
            enemyTmp.setParent(cc.find('Canvas/Map'));
            enemyNumber++;
        }
    },
    
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags = 0;
        cc.director.getCollisionManager().enabled = true;
        this.tMap = this.getComponent(cc.TiledMap);
        let tiledSize = this.tMap.getTileSize();
        let layer = this.tMap.getLayer("Obstacles");
        let layerSize = layer.getLayerSize();
        this.avaPosition=[];

        var k=0;

        for(let i = 0;i < layerSize.width;i++){
            for (let j = 0; j < layerSize.height; j++) {
                let tiled = layer.getTiledTileAt(i,j,true)
                if((tiled.gid == 1)||(tiled.gid == 2)){
                    tiled.node.group = "Obstacles";
                    let body = tiled.node.addComponent(cc.RigidBody);
                    body.type = cc.RigidBodyType.Static;
                    body.enabled=true;

                    let collider = tiled.node.addComponent(cc.PhysicsBoxCollider);
                    collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2);
                    collider.size = tiledSize;
                    collider.apply();}

                else if(tiled.gid == 4){
                    tiled.node.group = "Water";
                    let body = tiled.node.addComponent(cc.RigidBody);
                    body.type = cc.RigidBodyType.Static;
                    body.enabled=true;

                    let collider = tiled.node.addComponent(cc.PhysicsBoxCollider);
                    collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2);
                    collider.size = tiledSize;
                    collider.apply();
                    }
                else if(tiled.gid == 0){this.avaPosition[k]=tiled;k++;}
            }
        }
    },

    update(){
        console.log(enemyNumber)
        if(enemyNumber==0){cc.director.loadScene('Four')}
    },
    start(){
        this.creatEnemy();
        this.schedule(this.ranCreatTool,this.toolGap, 100,5);
        if(isTwo){
            let secondplayer=cc.instantiate(this.secondPlayer);
            secondplayer.setParent(cc.director.getScene());
        }
    }

});
