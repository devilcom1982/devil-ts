namespace devil
{
        /**
         * EUI带有皮肤的基类
         * @author        devil
         * @version       V20190826
         * @create        2019-08-26
         * @qq            346443480
         * @email         346443480 @ qq.com
         * @place         guangzhou
         */	
    export class EUIView extends eui.Component implements eui.UIComponent
    {
        protected _invalid:number;
        protected _loadComplete:boolean;
        protected _isPool:boolean;//是否使用对象池回收，默认为true，表示使用对象池回收

        public constructor()
        {
            super();
            this.start();
            // this.addEvent();
        }

        protected start():void
        {
            this._isPool = false;
            this._invalid = InvalidationType.INIT;
            this._loadComplete = false;
            this.touchEnabled = false;
            this.touchChildren = false;
            this.addEventListener(eui.UIEvent.COMPLETE, this.___complete, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.___addedToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.___removedFromStage, this);
        }


        private ___addedToStage(e:egret.Event):void
        {
            this.startCallLater();
        }

        private startCallLater():void
		{
            if(this.stage == null || !this._loadComplete) return;
		    Manager.render.add(this.repaint,this);
        }
        
        /**
		 * 强制重绘
		 */
		public repaint():void
		{
			this.draw();
			this.validate();
			Manager.render.remove(this.repaint,this);
		}

		private validate():void 
		{
			this._invalid = InvalidationType.EMPTY;
        }
        
    		/**
		 * 在未另外指定的情况下，将属性标记为无效，并在下一帧上重绘组件。
		 * @param property   要使其无效的属性
		 */
		public invalidate(property:number):void 
		{
			this._invalid = this._invalid | property;
			this.startCallLater();
        }
        
		/**
		 * Included the first property as a proper param to enable *some* type checking, and also because it is a required param. 
		 * @param property
		 * @param properties
		 * @return 
		 */		
		protected isInvalid(property:number,...properties:any[]):boolean 
		{
			if ((this._invalid & property) == property) 
			{
				return true; 
			}
			while (properties.length > 0) 
			{
				property = properties.pop();
				if ((this._invalid & property) == property)  
				{
					return true; 
				}
			}
			return false
        }

        public move(x:number, y:number):void
        {
            this.x = x;
            this.y = y;
        }

        protected draw():void
        {
            if(this.isInvalid(InvalidationType.INIT))this.drawInit();
        }

        private drawInit():void
        {
            // this.start();
            this.configUI();
            this.addEvent();
        }

        protected configUI():void
        {
            
        }

        protected addEvent():void
        {

        }

        protected removeEvent():void
        {

        }

        public addViewChild(child:View, ...layers:egret.DisplayObjectContainer[]):void
        {
            let layer:egret.DisplayObjectContainer;
            let layerLen:number = layers ? layers.length : 0;
            for (let i:number=0; i<child.layers.length; ++i)
            {
                layer = layerLen > i ? layers[i] : this;
                layer.addChild(child.layers[i]);
            }
        }
        public addViewChildAt(child:View, index:number):void
        {
            for (let i:number=0; i<child.layers.length; ++i)
            {
                this.addChildAt(child.layers[i], index + i);
            }
        }

        // public reuse():void
        // {
        //     this.start();
        //     this.addEvent();
        // }

        // public unuse():void
        // {
        //     this.x = 0;
        //     this.y = 0;
        //     this.alpha = 1;
        //     this.scaleX = 1;
        //     this.scaleY = 1;
        //     this.rotation = 0;
        //     this.visible = true;
        //     this.anchorOffsetX = 0;
        //     this.anchorOffsetY = 0;
        //     this.touchEnabled = false;
        //     this.touchChildren = false;
        //     this.cacheAsBitmap = false;
        //     Manager.render.remove(this.repaint,this);
        //     this.removeEvent();
        //     this.removeEventListener(eui.UIEvent.COMPLETE, this.___complete, this);
        //     this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.___addedToStage, this);
        //     this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.___removedFromStage, this);
        //     if(this.parent)this.parent.removeChild(this);
        // }

        public dispose():void
        {
            Manager.render.remove(this.repaint,this);
            this.removeEvent();
            this.removeEventListener(eui.UIEvent.COMPLETE, this.___complete, this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.___addedToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.___removedFromStage, this);
            if(this.parent)this.parent.removeChild(this);
        }
        
        private ___removedFromStage(e:egret.Event):void
        {
			Manager.render.remove(this.repaint,this);
        }

        private ___complete(e:eui.UIEvent):void
        {
            this._loadComplete = true;
            this.invalidate(InvalidationType.INIT);
            this.startCallLater();
        }
    }

}