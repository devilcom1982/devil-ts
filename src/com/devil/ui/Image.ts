namespace devil
{
	/**
	 * 图片组件
	 * @author        devil
	 * @version       V20190131
	 * @create        2019-01-31
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class Image extends Component
    {
        private _layer:egret.DisplayObjectContainer;
        private _clickFun:CallBackInfo;
        private _downFun:CallBackInfo;

        protected _bitmap:egret.Bitmap;
        protected _source:egret.Texture|string;
        protected _path:PathInfo;
        protected _completeFun:CallBackInfo;
        


        public get bitmap():egret.Bitmap
        {
            return this._bitmap;
        }
        /**
		 * 九宫格 
		 */	
        public set scale9Grid(value:egret.Rectangle)
        {
            this._bitmap.scale9Grid = value;
        }
        public get scale9Grid()
        {
            return this._bitmap.scale9Grid;
        }

		/**
		 * 图片源数据 
		 */		
        public get source()
        {
            return this._source;
        }
        public set source(value:egret.Texture|string)
        {
            if(this._source == value)return;
            this._bitmap.texture = null;
            if(this._path)
            {
                Manager.loader.remove(this._path,this.___complete,this);
                this._path = null;
            }
            this._source = value;
            if(this._source != null && this._source != "")
            {
                if(this._source instanceof egret.Texture)
                {
                    if(this._width == -1)this._width = this._source.textureWidth;
                    if(this._height == -1)this._height = this._source.textureHeight;
                    this.invalidate(InvalidationType.SIZE);
                }
                this.invalidate(InvalidationType.DATA);
            }
        }

        public constructor()
        {
            super();
            this._type = ComponentType.IMAGE;
        }


        protected initLayer():void
        {
            this._layer = this.createLayer();
        }

		/**
		 * @private 
		 */		
        protected start():void
        {
            super.start();
            this._width = -1;
            this._height = -1;
            this._bitmap = Manager.pool.createBitmap();
            this._layer.addChild(this._bitmap);
        }

        protected draw():void
        {
            super.draw();
            if(this.isInvalid(InvalidationType.DATA))this.drawData();
            if(this.isInvalid(InvalidationType.SIZE))this.drawSize();
        }

        private drawSize():void
        {
            if(this._bitmap.texture != null)
            {
                this._bitmap.width = this._width;
                this._bitmap.height = this._height;
            }
        }

        protected drawData():void
        {
            if(this._source instanceof egret.Texture)
            {
                this._bitmap.texture = this._source;
            }
            else
            {
                if(this._source != null && this._source != "")
                {   
                    this._path = PathInfo.getPath(Model.resConfig.getURL(this._source as string),LoaderType.TEXTURE);
                    Manager.loader.load(this._path,this.___complete,this,ResourceGCType.COMMON,ResPriorityType.LOAD_LEVEL5);
                }
            }
        }

        public unuse():void
        {
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.___touchTap,this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.___touchBegin,this);
            this._source = null;
            Manager.pool.pushBitmap(this._bitmap);
            this._bitmap = null;
            this._layer = null;
            if(this._completeFun != null)
            {
                this._completeFun.pool();
                this._completeFun = null;
            }
            if(this._path)
            {
                Manager.loader.remove(this._path,this.___complete,this);
                this._path = null;
            }
            if(this._clickFun != null)
            {
                this._clickFun.pool();
                this._clickFun = null;
            }
            if(!!this._downFun)
            {
                this._downFun.pool();
                this._downFun = null;
            }
            super.unuse();
        }

        public dispose():void
        {
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.___touchTap,this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.___touchBegin,this);
            this._source = null;
            Manager.pool.pushBitmap(this._bitmap);
            this._bitmap = null;
            this._layer = null;
            if(this._completeFun != null)
            {
                this._completeFun.pool();
                this._completeFun = null;
            }
            if(this._path)
            {
                Manager.loader.remove(this._path,this.___complete,this);
                this._path = null;
            }
            if(this._clickFun != null)
            {
                this._clickFun.pool();
                this._clickFun = null;
            }
            if(!!this._downFun)
            {
                this._downFun.pool();
                this._downFun = null;
            }
            super.dispose();
        }
        /**
         * 加载完成的回调函数，参数为[TextureLoader,Image]
         * @param callBack 
         * @param target 
         */
        public __complete(callBack:(loader:TextureLoader,target:Image)=>void,target:any):void
        {
            if(callBack != null && target != null)this._completeFun = CallBackInfo.create(callBack,target);
        }

        protected ___complete(loader:BaseLoader):void
        {
            let texture:egret.Texture = (loader as TextureLoader).getTexture(this._source as string);
            if(texture != null)
            {
                this._bitmap.texture = texture;
                this._width = this._width < 0 ? texture.textureWidth : this._width;
                this._height = this._height < 0 ? texture.textureHeight : this._height;
                this._bitmap.width = this._width;
                this._bitmap.height = this._height;
                this._invalid = this._invalid ^ InvalidationType.SIZE;
                if(this._completeFun != null)this._completeFun.runCallBack(loader,this);
            }
        }

        public __click(callBack:(e:egret.TouchEvent,target:Image|ImageRemote) => void,target:any):void
        {
            this.touchEnabled = true;
            this._clickFun = CallBackInfo.create(callBack,target);
            if(!this._layer.hasEventListener(egret.TouchEvent.TOUCH_TAP))this._layer.addEventListener(egret.TouchEvent.TOUCH_TAP,this.___touchTap,this);
        }

        public __down(callBack:Function,target:any):void
        {
            this.touchEnabled = true;
            this._downFun = CallBackInfo.create(callBack,target);
            if(!this._layer.hasEventListener(egret.TouchEvent.TOUCH_BEGIN))this._layer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.___touchBegin,this);
        }

        private ___touchTap(e:TouchEvent):void
        {
            if(this._clickFun)this._clickFun.runCallBack(e,this);
        }

        private ___touchBegin(e:TouchEvent):void
        {
            if(!!this._downFun)this._downFun.runCallBack(e,this);
        }
    }
}