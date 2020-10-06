namespace devil
{
	/**
     * 选中图标与背景图是分开的
	 * @author        devil
	 * @version       V20190418
	 * @create        V2019-04-18
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class CheckBox1 extends ButtonTextSelected
    {
        private _icon:Image;

        public constructor()
        {
            super();
            this._type = ComponentType.CHECK_BOX1;
        }

        protected start():void
        {
            super.start();
            this._width = ComponentDefault.CHECK_BOX_WIDTH;
            this._height = ComponentDefault.CHECK_BOX_HEIGHT;
            this.setLabelOffset(5,0);
            this._label.align = egret.HorizontalAlign.LEFT;
            this._icon = View.create(Image);
            this._txtLayer.touchEnabled = true;
        }

       /**
		 * @private 
		 */	
        protected addEvent():void
        {
            super.addEvent();
            this._txtLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.___handleEvent,this);
            this._txtLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.___handleEvent, this);
            this._txtLayer.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            this._txtLayer.addEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            this._txtLayer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        }

        /**
		 * @private 
		 */	
        protected removeEvent():void
        {
            super.removeEvent();
            this._txtLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.___handleEvent,this);
            this._txtLayer.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.___handleEvent,this);
            this._txtLayer.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            this._txtLayer.removeEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            this._txtLayer.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        }

        protected setDefaultStyle():void
        {
            super.setDefaultStyle();
            this._styles[StyleName.SELECT_ICON_SKIN] = null;
            // this._styles[StyleName.SELECT_ICON_RECT] = null;
        }

        protected draw():void
        {
            super.draw();
            if(this.isInvalid(InvalidationType.STYLE))this.drawStyle();
        }

        protected drawSize():void
        {
            this._currentBack.width = this._width;
            this._currentBack.height = this._height;
        }

        private drawStyle():void
        {
            this._icon.source = this.getStyle(StyleName.SELECT_ICON_SKIN);
            this._icon.__complete(this.___complete,this);
        }

        protected drawLayout():void
        {
            this._labelX = this._width + this._labelOffsetX;
            this._labelY = ((this._height - this._label.height) >> 1) + this._labelOffsetY;
            this._label.move(this._labelX,this._labelY);
        }

        // protected drawSkin(styleName:string,scale9GridStyleName:string):void
        // {
        //     super.drawSkin(styleName,scale9GridStyleName);
        //     if(this._buttonState == ButtonState.SELECTED)
        //     {
        //         if(this._icon.parent == null)this.addChild(this._icon,this._layer);
        //     }
        //     else 
        //     {
        //         if(this._icon.parent)this.removeChild(this._icon,false);
        //     } 
        // }

        protected drawSkin(styleName:string):void
        {
            super.drawSkin(styleName);
            if(this._buttonState == ButtonState.SELECTED)
            {
                if(this._icon.parent == null)this.addChild(this._icon,this._layer);
            }
            else 
            {
                if(this._icon.parent)this.removeChild(this._icon,false);
            } 
        }

        public unuse():void
        {
            if(this._icon.parent == null)this.removeChild(this._icon,true);
            this._icon = null;
            super.unuse();
        }

        public dispose():void
        {
            if(this._icon.parent == null)this.removeChild(this._icon,true);
            this._icon = null;
            super.dispose();
        }

        private ___complete(loader:TextureLoader,target:Image):void
        {
            this._icon.x = (this._width - this._icon.width) >> 1;
            this._icon.y = (this._height - this._icon.height) >> 1;
        }
    }
}