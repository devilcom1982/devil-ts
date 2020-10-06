namespace devil
{
	/**
     * 对象池管理器,类似cc.pool的方法，需要使用对象池管理的对象，需要实现reuse与unuse两个函数，reuse函数是从池中获得对象时使用，而unuse是对象放入池中时调用。
	 * @author        devil
	 * @version       V20181227
	 * @create        2018-12-27
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class ObjectPoolManager
    {
        private _objects = {};
        /**对象池单个类型数组最大数 */
        private MAX_NUM:number = 99999;
       /**
         * 通过对象池创建对象
         * @param cls   对象类型
         */
        public create(cls:{new():IPool}):any
        {
            let name:string = egret.getQualifiedClassName(cls);
            let pools:IPool[] = this._objects[name];
            if(pools == null)
            {
                pools = [];
                this._objects[name] = pools;
            }
            let instance:IPool;
            if(pools.length > 0)
            {
                instance = pools.shift();
                instance.reuse();
            }
            else instance = new cls();
            return instance;
        }


        /**
		 * 创建不可以交互的sprite实例 
		 */		
        public createSprite():egret.Sprite
        {
            let name:string = egret.getQualifiedClassName(egret.Sprite);
            let pools:egret.Sprite[] = this._objects[name];
            if(pools == null)
            {
                pools = [];
                this._objects[name] = pools;
            }
            let instance:egret.Sprite;
            if(pools.length > 0)instance = pools.shift();
            else 
            {
                instance = new egret.Sprite();
                instance.touchChildren = false;
                instance.touchEnabled = false;
            }
            return instance;
        }

		/**
		 * 回收Sprite实例进对象池 
		 * @param instance
		 */	
        public pushSprite(instance:egret.Sprite):void
        {
            if(instance == null)return;
            if(instance.parent)instance.parent.removeChild(instance);
            let name:string = egret.getQualifiedClassName(egret.Sprite);
            if(egret.getQualifiedClassName(instance) != name)Manager.log.trace(devil.LogType.ERROR,"回收对象与实际方法不符",egret.getQualifiedClassName(instance));
            let pools:egret.Sprite[] = this._objects[name];
            if(pools != null && pools.length < this.MAX_NUM)
            {
                instance.removeChildren();
                instance.graphics.clear();
                instance.touchChildren = false;
                this.pushDisplayObject(instance);
                if(pools.indexOf(instance) == -1)pools.push(instance);
            }
            else instance = null;
            //console.log(name,this._objects[name].length);
        }

        public createShape():egret.Shape
        {
            let name:string = egret.getQualifiedClassName(egret.Shape);
            let pools:egret.Shape[] = this._objects[name];
            if(pools == null)
            {
                pools = [];
                this._objects[name] = pools;
            }
            let instance:egret.Shape;
            if(pools.length > 0)instance = pools.shift();
            else 
            {
                instance = new egret.Shape();
                instance.touchEnabled = false;
            }
            return instance;
        }

        public pushShape(instance:egret.Shape):void
        {
            if(instance == null)return;
            if(instance.parent)instance.parent.removeChild(instance);
            let name:string = egret.getQualifiedClassName(egret.Shape);
            if(egret.getQualifiedClassName(instance) != name)Manager.log.trace(devil.LogType.ERROR,"回收对象与实际方法不符",egret.getQualifiedClassName(instance));
            let pools:egret.Shape[] = this._objects[name];
            if(pools != null && pools.length < this.MAX_NUM)
            {
                instance.graphics.clear();
                this.pushDisplayObject(instance);
                if(pools.indexOf(instance) == -1)pools.push(instance);
            }
            else instance = null;
            //console.log(name,this._objects[name].length);
        }

        public createDisplayObjectContainer():egret.DisplayObjectContainer
        {
            let name:string = egret.getQualifiedClassName(egret.DisplayObjectContainer);
            let pools:egret.DisplayObjectContainer[] = this._objects[name];
            if(pools == null)
            {
                pools = [];
                this._objects[name] = pools;
            }
            let instance:egret.DisplayObjectContainer;
            if(pools.length > 0)instance = pools.shift();
            else 
            {
                instance = new egret.DisplayObjectContainer();
                instance.touchChildren = false;
                instance.touchEnabled = false;
            }
            return instance;
        }

        public pushDisplayObjectContainer(instance:egret.DisplayObjectContainer):void
        {
            if(instance == null)return;
            if(instance.parent)instance.parent.removeChild(instance);
            let name:string = egret.getQualifiedClassName(egret.DisplayObjectContainer);
            if(egret.getQualifiedClassName(instance) != name)Manager.log.trace(devil.LogType.ERROR,"回收对象与实际方法不符",egret.getQualifiedClassName(instance));
            let pools:egret.DisplayObjectContainer[] = this._objects[name];
            if(pools != null && pools.length < this.MAX_NUM)
            {
                if(instance.numChildren > 0)
                {
                    // console.log("ObjectPoolManager.pushDisplayObjectContainer",instance.numChildren)
                    instance.removeChildren();
                }
                if(instance instanceof egret.Sprite)(instance as egret.Sprite).graphics.clear();
                instance.touchChildren = false;
                this.pushDisplayObject(instance);
                if(pools.indexOf(instance) == -1)pools.push(instance);
            }
            else instance = null;
            //console.log(name,this._objects[name].length);
        }

        private pushDisplayObject(instance:egret.DisplayObject):void
        {
            instance.cacheAsBitmap = false;
            instance.touchEnabled = false;
            instance.x = 0;
            instance.y = 0;
            instance.scaleX = 1;
            instance.scaleY = 1;
            instance.rotation = 0;
            instance.visible = true;
            instance.alpha = 1;
            instance.mask = null;
            instance.blendMode = egret.BlendMode.NORMAL;
            instance.anchorOffsetX = 0;
            instance.anchorOffsetY = 0;
            instance.filters = null;
            instance.scrollRect = null;
            instance.width = NaN;
            instance.height = NaN;
        }

		/**
		 * 回收对象 
		 * @param cls			对应的类
		 * @param instance		回收的类实例
		 */	
        public push(instance:IPool):void
        {
            if(instance == null)return;
            let name:string = egret.getQualifiedClassName(instance);
            let pools:IPool[] = this._objects[name];
            if(pools != null && pools.length < this.MAX_NUM)
            {
                instance.unuse();
                if(pools.indexOf(instance) == -1)pools.push(instance);
            }
            else
            {
                instance.dispose();
                instance = null;
            }
            //console.log(name,this._objects[name].length);
        }

        /**
         * 计算管理器内部的对象实例数，测试用 
         */
        public testCount():void
        {
            for(let name in this._objects)
            {
                if(this._objects[name].length > 0)Manager.log.trace(devil.LogType.DEBUG,name,this._objects[name].length);
            }
        }

		/**
		 * 创建位图
		 */		
        public createBitmap():egret.Bitmap
        {
            let name:string = egret.getQualifiedClassName(egret.Bitmap);
            let pools:egret.Bitmap[] = this._objects[name];
            if(pools == null)
            {
                pools = [];
                this._objects[name] = pools;
            }
            let instance:egret.Bitmap;
            if(pools.length > 0)instance = pools.shift();
            else 
            {
                instance = new egret.Bitmap();
                instance.touchEnabled = false;
            }
            return instance;
        }

        public pushBitmap(instance:egret.Bitmap):void
        {
            if(instance == null)return;
            if(instance.parent)instance.parent.removeChild(instance);
            instance.texture = null;
            let name:string = egret.getQualifiedClassName(egret.Bitmap);
            if(egret.getQualifiedClassName(instance) != name)Manager.log.trace(devil.LogType.ERROR,"回收对象与实际方法不符",egret.getQualifiedClassName(instance));
            let pools:egret.Bitmap[] = this._objects[name];
            if(pools != null && pools.length < this.MAX_NUM)
            {
                instance.scale9Grid = null;
                instance.smoothing = true;
                instance.fillMode = egret.BitmapFillMode.SCALE;
                instance.pixelHitTest = false;
                this.pushDisplayObject(instance);
                if(pools.indexOf(instance) == -1)pools.push(instance);
            }
            else instance = null;
            //console.log(name,this._objects[name].length);
        }

		/**
		 * 创建文本
		 */		
		public createTextField():egret.TextField
		{
            let name:string = egret.getQualifiedClassName(egret.TextField);
            let pools:egret.TextField[] = this._objects[name];
            if(pools == null)
            {
                pools = [];
                this._objects[name] = pools;
            }
            let instance:egret.TextField;
            if(pools.length > 0)instance = pools.shift();
            else
            {
                instance = new egret.TextField();
                instance.touchEnabled = false;
            }
            return instance;
        }
        

        /**
		 * 回收TextField实例进对象池 
		 * @param instance
		 */		
        public pushTextField(instance:egret.TextField):void
        {
            if(instance == null)return;
            if(instance.parent != null)instance.parent.removeChild(instance);
            let name:string = egret.getQualifiedClassName(egret.TextField);
            if(egret.getQualifiedClassName(instance) != name)Manager.log.trace(devil.LogType.ERROR,"回收对象与实际方法不符",egret.getQualifiedClassName(instance));
            let pools:egret.TextField[] = this._objects[name];
            if(pools != null && pools.length < this.MAX_NUM)
            {
                instance.text = "";
                this.pushDisplayObject(instance);
                instance.$TextField = {
                    0: egret.TextField.default_size,             //fontSize
                    1: 0,              //lineSpacing
                    2: egret.TextField.default_textColor,       //textColor
                    3: NaN,           //textFieldWidth
                    4: NaN,           //textFieldHeight
                    5: 0,              //textWidth
                    6: 0,              //textHeight
                    7: 0,              //textDrawWidth
                    8: egret.TextField.default_fontFamily,   //fontFamily
                    9: "left",         //textAlign
                    10: "top",         //verticalAlign
                    11: "#ffffff",     //textColorString
                    12: "",            //fontString
                    13: "",            //text
                    14: [],            //measuredWidths
                    15: false,         //bold,
                    16: false,         //italic,
                    17: true,          //fontStringChanged,
                    18: false,         //textLinesChanged,
                    19: false,          //wordWrap
                    20: false,         //displayAsPassword
                    21: 0,              //maxChars
                    22: 0, //selectionActivePosition,
                    23: 0, //selectionAnchorPosition,
                    24: egret.TextFieldType.DYNAMIC,              //type
                    25: 0x000000,              //strokeColor
                    26: "#000000",              //strokeColorString
                    27: 0,              //stroke
                    28: -1,              //scrollV
                    29: 0,              //numLines
                    30: false,              //multiline
                    31: false,              //border
                    32: 0x000000,              //borderColor
                    33: false,              //background
                    34: 0xffffff,              //backgroundColor
                    35: null,           //restrictAnd
                    36: null,           //restrictNot
                    37: egret.TextFieldInputType.TEXT,            //inputType
                    38: false            //textLinesChangedForNativeRender
                };
                if(pools.indexOf(instance) == -1)pools.push(instance);
            }
            else instance = null;
            //console.log(name,this._objects[name].length);
        }
		/**
		 * 创建贴图
		 */		
		public createTexture():egret.Texture
		{
            let name:string = egret.getQualifiedClassName(egret.Texture);
            let pools:egret.Texture[] = this._objects[name];
            if(pools == null)
            {
                pools = [];
                this._objects[name] = pools;
            }
            let instance:egret.Texture;
            if(pools.length > 0)instance = pools.shift();
            else instance = new egret.Texture();
            return instance;
        }

		/**
		 * 回收贴图
		 */	
        public pushTexture(instance:egret.Texture):void
        {
            if(instance == null)return;
            instance.dispose();
            instance["scale9Grid"] = null;
            instance.disposeBitmapData = true;
            let name:string = egret.getQualifiedClassName(egret.Texture);
            if(egret.getQualifiedClassName(instance) != name)Manager.log.trace(devil.LogType.ERROR,"回收对象与实际方法不符",egret.getQualifiedClassName(instance));
            let pools:egret.Texture[] = this._objects[name];
            if(pools != null && pools.length < this.MAX_NUM)
            {
                if(pools.indexOf(instance) == -1)pools.push(instance);
            }
            else instance = null;
            //console.log(name,this._objects[name].length);
        }

		public createHttpRequest():egret.HttpRequest
		{
            let name:string = egret.getQualifiedClassName(egret.HttpRequest);
            let pools:egret.HttpRequest[] = this._objects[name];
            if(pools == null)
            {
                pools = [];
                this._objects[name] = pools;
            }
            let instance:egret.HttpRequest;
            if(pools.length > 0)instance = pools.shift();
            else instance = new egret.HttpRequest();
            return instance;
        }

        public pushHttpRequest(instance:egret.HttpRequest):void
        {
            if(instance == null)return;
            let name:string = egret.getQualifiedClassName(egret.HttpRequest);
            let pools:egret.HttpRequest[] = this._objects[name];
            if(pools != null && pools.length < this.MAX_NUM)
            {
                if(pools.indexOf(instance) == -1)pools.push(instance);
            }
            else instance = null;
            //console.log(name,this._objects[name].length);
        }

		public createImageLoader():egret.ImageLoader
		{
            let name:string = egret.getQualifiedClassName(egret.ImageLoader);
            let pools:egret.ImageLoader[] = this._objects[name];
            if(pools == null)
            {
                pools = [];
                this._objects[name] = pools;
            }
            let instance:egret.ImageLoader;
            if(pools.length > 0)instance = pools.shift();
            else instance = new egret.ImageLoader();
            return instance;
        }

        public pushImageLoader(instance:egret.ImageLoader):void
        {
            if(instance == null)return;
            let name:string = egret.getQualifiedClassName(egret.ImageLoader);
            let pools:egret.ImageLoader[] = this._objects[name];
            if(pools != null && pools.length < this.MAX_NUM)
            {
                if(pools.indexOf(instance) == -1)pools.push(instance);
            }
            else instance = null;
            //console.log(name,this._objects[name].length);
        }

		public createByteArray():egret.ByteArray
		{
            let name:string = egret.getQualifiedClassName(egret.ByteArray);
            let pools:egret.ByteArray[] = this._objects[name];
            if(pools == null)
            {
                pools = [];
                this._objects[name] = pools;
            }
            let instance:egret.ByteArray;
            if(pools.length > 0)instance = pools.shift();
            else instance = new egret.ByteArray();
            return instance;
        }

        public pushByteArray(instance:egret.ByteArray):void
        {
            if(instance == null)return;
            let name:string = egret.getQualifiedClassName(egret.ByteArray);
            let pools:egret.ByteArray[] = this._objects[name];
            instance.endian = egret.Endian.BIG_ENDIAN;
            instance.clear();
            if(pools != null && pools.length < this.MAX_NUM)
            {
                if(pools.indexOf(instance) == -1)pools.push(instance);
            }
            else instance = null;
            //console.log(name,this._objects[name].length);
        }
    }
}