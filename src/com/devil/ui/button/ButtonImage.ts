
namespace devil
{
	/**
	 * 图片按钮，背景只有一张图片，可有几种不同的状态
	 * @author        devil
	 * @version       V20190211
	 * @create        2019-02-11
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class ButtonImage extends Container
    {
        private static DRAW_STATE:number = 1;

        private _mouseDownFun:CallBackInfo;
        private _clickFun:CallBackInfo;
        private _longClickFun:CallBackInfo;
        
        private _longClickCnt:number;
        protected _layer:egret.DisplayObjectContainer;
        protected _buttonState:ButtonState;
        protected _currentBack:Image;
        protected _downOffset:Boolean;

        public get buttonState()
        {
            return this._buttonState;
        }

        public set buttonState(value:ButtonState)
        {
            if(this._buttonState == value)return;
            this._buttonState = value;
            this.invalidate(ButtonImage.DRAW_STATE);
        }

        public setEnabled(value:boolean)
        {
            if(this._enabled != value)
            {
                super.setEnabled(value);
                if(this._enabled)
                {
                    this._layers[0].touchEnabled = true;
                    this.buttonState = ButtonState.UP;
                }
                else
                {
                    this.buttonState = ButtonState.DISANABLED;
                }
            }
        }

        /**
		 * 按下按钮时是否偏移1像素 
		 * @param value
		 */		
		public set downOffset(value:Boolean)
		{
			this._downOffset = value;
		}

        public constructor()
        {
            super();
            this.addEvent();
            this._type = ComponentType.BUTTON_IMAGE;
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
            this._layer.touchEnabled = true;
            this._downOffset = true;
            this._width = ComponentDefault.BUTTON_WIDTH;
            this._height = ComponentDefault.BUTTON_HEIGHT;
            this._invalid = this._invalid | ButtonImage.DRAW_STATE;
            this._buttonState = ButtonState.UP;
            this._currentBack = View.create(Image);
            this.addChild(this._currentBack,this._layer);
        }

        /**
		 * @private 
		 */	
        protected addEvent():void
        {
            this._layer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.___handleEvent,this);
            this._layer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.___handleEvent, this);
            this._layer.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            this._layer.addEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            this._layer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        }

        /**
		 * @private 
		 */	
        protected removeEvent():void
        {
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.___handleEvent,this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.___handleEvent,this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        }

        /**   
		 * @private 
		 */	
        protected setDefaultStyle():void
        {
			this._styles[StyleName.UP_BACK_SKIN] = null;
			this._styles[StyleName.DOWN_BACK_SKIN] = null;
			this._styles[StyleName.DISENABLED_BACK_SKIN] = null;
			// this._styles[StyleName.UP_BACK_RECT] = null;
			// this._styles[StyleName.DOWN_BACK_RECT] = null;
			// this._styles[StyleName.DISENABLED_BACK_RECT] = null;
        }

		/**
		 * @private 
		 */	
        protected draw():void
        {
            super.draw();
            if(this.isInvalid(ButtonImage.DRAW_STATE,InvalidationType.STYLE))this.drawState();
            if(this.isInvalid(InvalidationType.STYLE,ButtonImage.DRAW_STATE,InvalidationType.STYLE))this.drawSize();
        }

		/**
		 * @private 
		 */	
        protected drawState():void
        {
            let styleName:string;
            // let scale9GridStyleName:string;
            let backX:number = 0;
			let backY:number = 0;
            if(this._buttonState == ButtonState.UP)
            {
                styleName = StyleName.UP_BACK_SKIN;
                // scale9GridStyleName = StyleName.UP_BACK_RECT;
            }
            else if(this._buttonState == ButtonState.DOWN)
            {
                styleName = StyleName.DOWN_BACK_SKIN;
                // scale9GridStyleName = StyleName.DOWN_BACK_RECT;
                if(this._downOffset)
				{
					backX = 1;
					backY = 1;
				}
            }
            else if(this._buttonState == ButtonState.DISANABLED)
            {
                styleName = StyleName.DISENABLED_BACK_SKIN;
                // scale9GridStyleName = StyleName.DISENABLED_BACK_RECT;
            }
            backX += this.getStyleXoffset(styleName);
            backY += this.getStyleYoffset(styleName);
            this._currentBack.move(backX,backY);
            // this.drawSkin(styleName,scale9GridStyleName);
            this.drawSkin(styleName);
        }

        // protected drawSkin(styleName:string,scale9GridStyleName:string):void
        // {
        //     let data:string|egret.Texture = this.getStyle(styleName);
        //     let rect:egret.Rectangle = this.getStyle(scale9GridStyleName);
        //     if(data == null)
        //     {
        //         data = this.getStyle(StyleName.UP_BACK_SKIN);
        //         rect = this.getStyle(StyleName.UP_BACK_RECT);
        //     }
        //     this._currentBack.source = data;
        //     this._currentBack.scale9Grid = rect;
        // }


        protected drawSkin(styleName:string):void
        {
            let data:ResourceItem = this.getImageData(styleName);
            if(data == null)data = this.getImageData(StyleName.UP_BACK_SKIN);
            this._currentBack.source = data.name;
            this._currentBack.scale9Grid = data.scale9Grid;
        }

        protected drawSize():void
        {
            this._currentBack.width = this._width;
            this._currentBack.height = this._height;
        }

        /**
		 * @private 
		 */	
        public reuse():void
        {
            super.reuse();
            this.addEvent();
        }
		/**
		 * @private 
		 */	
        public unuse():void
        {
            this.removeEvent();
            this._layer = null;
            if(this._clickFun)
            {
                this._clickFun.pool();
                this._clickFun = null;
            }
            if(this._mouseDownFun)
            {
                this._mouseDownFun.pool();
                this._mouseDownFun = null;
            }
            if(this._longClickFun)
            {
                this._longClickFun.pool();
                this._longClickFun = null;
            }
            this._currentBack = null;
            super.unuse();
        }

		/**
		 * @private 
		 */	
        public dispose():void
        {
            Manager.render.remove(this.___checkLongClick, this);
            this.removeEvent();
            this._layer = null;
            if(this._clickFun)
            {
                this._clickFun.pool();
                this._clickFun = null;
            }
            if(this._mouseDownFun)
            {
                this._mouseDownFun.pool();
                this._mouseDownFun = null;
            }
            if(this._longClickFun)
            {
                this._longClickFun.pool();
                this._longClickFun = null;
            }
            this._currentBack = null;
        }
		/**
		 * 点击事件 
		 */		
        public __click(callBack:Function,target:any):void
        {
            this._clickFun = CallBackInfo.create(callBack,target);
        }
		/**
		 * 鼠标按下事件 
		 */	
        public __mouseDown(callBack:Function,target:any):void
        {
            this._mouseDownFun = CallBackInfo.create(callBack,target);
        }
		/**
		 * 长按事件 
		 */	
        public __longClick(callBack:Function,target:any):void
        {
            this._longClickFun = CallBackInfo.create(callBack,target);
        }
		/**
		 * @private 
		 */	
        protected ___handleEvent(e:egret.Event):void
        {
            this.___$handleEvent(e);
        }

        protected ___$handleEvent(e:egret.Event):void
        {
            switch(e.type)
            {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.buttonState = ButtonState.DOWN;
                    if(this._mouseDownFun != null)this._mouseDownFun.runCallBack(e,this);
                    if (this._longClickFun) 
                    {
                        this._longClickCnt = 0;
                        Manager.render.add(this.___checkLongClick, this, 300, 0);
                    }
                    break;
                case egret.TouchEvent.TOUCH_CANCEL:
                case egret.TouchEvent.TOUCH_END:
                case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                    this.buttonState = ButtonState.UP;
                    break;
                case egret.TouchEvent.TOUCH_TAP:
                    if(this._clickFun != null)this._clickFun.runCallBack(e,this);
                    break;
            }
        }

        /** */
        private ___checkLongClick():void
        {
            if (this.buttonState != ButtonState.DOWN || !this._longClickFun) 
            {
                if (this._longClickFun) this._longClickFun.runCallBack(this, true);
                Manager.render.remove(this.___checkLongClick, this);
                return;
            }
            if(this._longClickFun != null)
            {
                this._longClickFun.runCallBack(this, false);
                ++this._longClickCnt;
                if (this._longClickCnt >= 3)
                {
                    Manager.render.add(this.___checkLongClick, this, 30, 0, null, true);
                }
            }
        }
    }
}