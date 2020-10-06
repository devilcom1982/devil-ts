namespace devil
{
    /**
     * 层管理器,一级层只有三层，对应的是LayerIndex常量，常量值对应的是层级关系，可以随时自动扩展Element与UI一级层的二级层，但需要定义二级层常量LayerSubIndex
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    export class LayerManager
    {
        private _elementLayers:egret.DisplayObjectContainer[];
        private _uiLayers:egret.DisplayObjectContainer[];
        private _elementSub3Layers:any;
        private _moveLayers:egret.DisplayObjectContainer[];//移动层集合
        private _root:egret.DisplayObjectContainer;
        /**
         * 地图层,或者游戏层或者内容层
         */
        public mapLayer:egret.DisplayObjectContainer;
        /**
         * 元素层，场景对象层
         */
        public elementLayer:egret.DisplayObjectContainer;
        /**
         * UI层
         */
        public uiLayer:egret.DisplayObjectContainer;
    
        public constructor(root:egret.DisplayObjectContainer)
        {
            this._root = root;
            this._elementLayers = [];
            this._uiLayers = [];
            this._moveLayers = [];
            this._elementSub3Layers = [];
            this.mapLayer = this.createLayer(root,LayerIndex.MAP,true,false,true);
            this.mapLayer.name = "mapLayer";
            this.elementLayer = this.createLayer(root,LayerIndex.ELEMENT,false,true,true);
            this.elementLayer.name = "elementLayer";
            this.uiLayer = this.createLayer(root,LayerIndex.UI,false,true,false);
            this.uiLayer.name = "uiLayer";
            this.initLayer();
        }

        private initLayer():void
        {
            this.initSubLayer(LayerIndex.ELEMENT,LayerSubIndex.ELEMENT_EFFECT_BOTTOM,false,false,"ELEMENT_EFFECT_BOTTOM");
            this.initSubLayer(LayerIndex.ELEMENT,LayerSubIndex.ELEMENT_SHADOW,false,false,"ELEMENT_SHADOW");
            this.initSubLayer(LayerIndex.ELEMENT,LayerSubIndex.ELEMENT1,false,true,"ELEMENT1");
            this.initSubLayer(LayerIndex.ELEMENT,LayerSubIndex.ELEMENT2,false,true,"ELEMENT2");
            this.initSubLayer(LayerIndex.ELEMENT,LayerSubIndex.ELEMENT_HEAD_VIP,false,false,"ELEMENT_HEAD_VIP");
            this.initSubLayer(LayerIndex.ELEMENT,LayerSubIndex.ELEMENT_HEAD_TXT,false,false,"ELEMENT_HEAD_TXT");
            this.initSubLayer(LayerIndex.ELEMENT,LayerSubIndex.ELEMENT_HEAD_TITLE,false,false,"ELEMENT_HEAD_TITLE");
            this.initSubLayer(LayerIndex.ELEMENT,LayerSubIndex.ELEMENT_HEAD_BLOOD,false,false,"ELEMENT_HEAD_BLOOD");
            this.initSubLayer(LayerIndex.ELEMENT,LayerSubIndex.ELEMENT_EFFECT_TOP,false,false,"ELEMENT_EFFECT_TOP");
            this.initSubLayer(LayerIndex.ELEMENT,LayerSubIndex.ELEMENT_SCT,false,false,"ELEMENT_SCT");
            this.initSubLayer(LayerIndex.UI,LayerSubIndex.UI_HOME_IMAGE,false,true,"UI_HOME_IMAGE");
            this.initSubLayer(LayerIndex.UI,LayerSubIndex.UI_HOME,false,true,"UI_HOME");
            this.initSubLayer(LayerIndex.UI,LayerSubIndex.UI_HOME_EFFECT,false,true,"UI_HOME_EFFECT");
            this.initSubLayer(LayerIndex.UI,LayerSubIndex.UI_PANEL_DARK,false,true,"UI_PANEL_DARK");
            this.initSubLayer(LayerIndex.UI,LayerSubIndex.UI_COMMON,false,true,"UI_COMMON");
            this.initSubLayer(LayerIndex.UI,LayerSubIndex.UI_IMAGE,false,true,"UI_IMAGE");
            this.initSubLayer(LayerIndex.UI,LayerSubIndex.UI_NUM,false,false,"UI_NUM");
            this.initSubLayer(LayerIndex.UI,LayerSubIndex.UI_EFFECT,false,true,"UI_EFFECT");
            this.initSubLayer(LayerIndex.UI,LayerSubIndex.UI_COMMON1,false,true,"UI_COMMON1");
            this.initSubLayer(LayerIndex.UI,LayerSubIndex.UI_ALERT_MODE,false,true,"UI_ALERT_MODE");
            this.initSubLayer(LayerIndex.UI,LayerSubIndex.UI_ALERT,false,true,"UI_ALERT");
            this.initSubLayer(LayerIndex.UI,LayerSubIndex.UI_ALERT_MODE2,false,true,"UI_ALERT_MODE2");
            this.initSubLayer(LayerIndex.UI,LayerSubIndex.UI_ALERT2,false,true,"UI_ALERT2");
            this.initSubLayer(LayerIndex.UI,LayerSubIndex.UI_TIP_MODE,false,true,"UI_TIP_MODE");
            this.initSubLayer(LayerIndex.UI,LayerSubIndex.UI_TIP,false,true,"UI_TIP");
            this.initSubLayer(LayerIndex.UI,LayerSubIndex.UI_LOADING,false,true,"UI_LOADING");
            this.initSubLayer(LayerIndex.UI,LayerSubIndex.UI_MASSAGE,false,true,"UI_MASSAGE");
            this.initSubLayer(LayerIndex.UI,LayerSubIndex.UI_GM,false,true,"UI_GM")
        }

        /**
         * 初始化二级层
         * @param index 
         * @param subIndex 
         */
        private initSubLayer(index:LayerIndex,subIndex:number,touchEnabled:boolean = false,touchChildren:boolean = false,name:string = ""):void
        {
            let container:egret.DisplayObjectContainer;
            let parent:egret.DisplayObjectContainer;
            let layers:egret.DisplayObjectContainer[];
            if(index == LayerIndex.ELEMENT && this._elementLayers[subIndex] == null)
            {
                parent = this.elementLayer;
                layers = this._elementLayers;
            }
            else if(index == LayerIndex.UI && this._uiLayers[subIndex] == null)
            {
                parent = this.uiLayer;
                layers = this._uiLayers;
            }
            if(parent != null)
            {
                container = Manager.pool.createDisplayObjectContainer();
                container.name = name;
                parent.addChildAt(container,subIndex);
                container.touchChildren = touchChildren;
                container.touchEnabled = touchEnabled;
                layers[subIndex] = container;
            }
        }

        private createLayer(root:egret.DisplayObjectContainer,index:LayerIndex, touchEnabled:boolean = false, touchChildren:boolean = false, canMove:boolean = false):egret.DisplayObjectContainer
        {
            let result:egret.DisplayObjectContainer = Manager.pool.createDisplayObjectContainer();
            result.touchEnabled = touchEnabled;
            result.touchChildren = touchChildren;
            root.addChildAt(result, index);
            if(canMove) this._moveLayers.push(result);
            return result;
        }

        /**
		 * 移动层，对于ARPG游戏来说人物移动的时候，元素与地图层需要动态更新位置 
		 */		
        public moveLayers(x:number, y:number):void
        {
            let that = this;
            let len:number = that._moveLayers.length;
            for(let i:number = 0; i < len; i++)
            {
                that._moveLayers[i].x = x;
                that._moveLayers[i].y = y;
            }
        }

        /**
         * 填加视图到二级层级
         * @param index 
         * @param subIndex 
         * @param view 
         */
        public addSubView(index:LayerIndex,subIndex:number,view:egret.DisplayObject,index1?:number):void
        {
            let container:egret.DisplayObjectContainer;
            if(index == LayerIndex.ELEMENT)container = this._elementLayers[subIndex];
            else if(index == LayerIndex.UI)container = this._uiLayers[subIndex];
            if(!!index1)container.addChildAt(view,index1);
            else container.addChild(view);
        }

        /**
		 * 填加视图到元素层二级视图中 
		 * @param subIndex
		 * @param view
		 * @param index1
		 */	
        public addElement(subIndex:number,view:egret.DisplayObject,index1?:number):void
        {
            this.addSubView(LayerIndex.ELEMENT,subIndex,view,index1);
        }

		/**
		 * 填加视图到UI层二级视图中
		 * @param subIndex
		 * @param view
		 * @param index1   是否指定层级，如果不指定则自动填加
		 */		
        public addUI(subIndex:number,view:egret.DisplayObject,index1?:number):void
        {
            this.addSubView(LayerIndex.UI,subIndex,view,index1);
        }

        /**
         * 填加视图到三级层级
         * @param index 
         * @param subIndex 
         * @param view 
         */
        public addSub3View(index:LayerIndex,subIndex:number,key:string,view:egret.DisplayObject):void
        {
            let sub:egret.DisplayObjectContainer;
            let sub3:egret.DisplayObjectContainer;
            let views:any;
            if(this._elementSub3Layers[index] == null)this._elementSub3Layers[index] = [];
            if(index == LayerIndex.ELEMENT)
            {
                sub = this._elementLayers[subIndex];
                views = this._elementSub3Layers[index][subIndex];
                if(views == null)
                {
                    views = {};
                    this._elementSub3Layers[index][subIndex] = views;
                }
                sub3 = views[key];
                if(sub3 == null)
                {
                    sub3 = Manager.pool.createDisplayObjectContainer();
                    views[key] = sub3;
                    sub.addChild(sub3);
                }
                sub3.addChild(view);
            }
        }

		/**
		 * 获取元素层的二级视图实例引用 
		 */		
        public getElement(subIndex:number):egret.DisplayObjectContainer
        {
            return this.getSubLayer(LayerIndex.ELEMENT,subIndex);
        }

		/**
		 *  获取UI层的二级视图实例引用 
		 */		
        public getUI(subIndex:number):egret.DisplayObjectContainer
        {
            return this.getSubLayer(LayerIndex.UI,subIndex);
        }

		/**
		 * 二级层视图重新填加回一级层内
		 * @param subIndex
		 * @param force		是否强制填加
		 */		
        public addChildUI(subIndex:number,force?:boolean):void
        {
            let container:egret.DisplayObjectContainer = this._uiLayers[subIndex];
            if(container.parent == null || !!force)this.uiLayer.addChildAt(container,subIndex);
        }

		/**
		 * 删除指定的二级UI层 
		 */		
        public removeChildUI(subIndex:number):void
        {
            let container:egret.DisplayObjectContainer = this._uiLayers[subIndex];
            if(container.parent != null)this.uiLayer.removeChild(container);
        }

		/**
		 * 返回指定的二级层实例 
		 */	
        public getSubLayer(index:LayerIndex,subIndex:number):egret.DisplayObjectContainer
        {
            let container:egret.DisplayObjectContainer;
            if(index == LayerIndex.ELEMENT)container = this._elementLayers[subIndex];
            else if(index == LayerIndex.UI)container = this._uiLayers[subIndex];
            return container;
        }

        public showTopLayer(index:LayerIndex):void
        {
            if(index == LayerIndex.MAP)this._root.addChildAt(this.mapLayer,LayerIndex.MAP);
            else if(index == LayerIndex.ELEMENT)this._root.addChildAt(this.elementLayer,LayerIndex.ELEMENT);
            else if(index == LayerIndex.UI)this._root.addChildAt(this.elementLayer,LayerIndex.UI);
        }
    }
}