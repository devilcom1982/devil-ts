namespace devil
{
	/**
	 * 图标按钮
	 * @author        devil
	 * @version       V20190211
	 * @create        2019-02-11
	 * @update 	      devil        2019-03-07        优化图标按钮布局自动根据长宽设置，不需要手动设置图标长宽
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class ButtonIcon extends ButtonImage
    {
        private _iconOffsetX:number;
        private _iconOffsetY:number;
        private _iconLayer:egret.DisplayObjectContainer;
        protected _iconX:number;
        protected _iconY:number;
        
        protected _icon:Image;
        protected _iconStyleName:string;
        protected _iconWidth:number;
        protected _iconHeight:number;

        public constructor()
        {
            super();
            this._type = ComponentType.BUTTON_ICON;
        }

        protected initLayer():void
        {
            super.initLayer();
            this._iconLayer = this.createLayer();
        }
		/**
		 * @private 
		 */
        protected start():void
        {
            super.start();
            this._iconOffsetX = 0;
            this._iconOffsetY = 0;
            this._iconWidth = -1;
            this._iconWidth = -1;
            this._icon = View.create(Image);
            this._icon.__complete(this.___complete,this);
            this.addChild(this._icon,this._iconLayer);
        }

		/**
		 * @private 
		 */	
		protected setDefaultStyle():void
		{
			super.setDefaultStyle();
			this._styles[StyleName.UP_ICON_SKIN] = null;
			this._styles[StyleName.DOWN_ICON_SKIN] = null;
			this._styles[StyleName.DISENABLED_ICON_SKIN] = null;
        }
		/**
		 * @private 
		 */	
        protected draw():void
        {
            super.draw();
            if(this.isInvalid(InvalidationType.LAYOUT))this.drawLayout();
        }
        /**
		 * @private 
		 */	
        protected drawState():void
        {
            super.drawState();
            let styleName:string;
            let iconX:number = this._iconX;
			let iconY:number = this._iconY;
            if(this._buttonState == ButtonState.UP)styleName = StyleName.UP_ICON_SKIN;
            else if(this._buttonState == ButtonState.DOWN)
            {
                styleName = StyleName.DOWN_ICON_SKIN;
                if(this._downOffset)
				{
					iconX += 1;
					iconY += 1;
				}
            }
            else if(this._buttonState == ButtonState.DISANABLED)styleName = StyleName.DISENABLED_ICON_SKIN;
            iconX += this.getStyleXoffset(styleName);
            iconY += this.getStyleYoffset(styleName);
            this._icon.move(iconX,iconY);
			this.drawIconSkin(styleName);
        }

        protected drawIconSkin(styleName:string):void
        {
            let data:string | egret.Texture = this.getStyle(styleName);
            this._iconStyleName = styleName;
            if(data == null)data = this.getStyle(StyleName.UP_ICON_SKIN);
            this._icon.source = data;
        }
		/**
		 * 设置图标的偏移量 
		 * @param x
		 * @param y
		 */		
        public setIconOffset(x:number,y:number):void
        {
            if(this._iconOffsetX == x && this._iconOffsetY == y)return;
			this._iconOffsetX = x;
			this._iconOffsetY = y;
			this.invalidate(InvalidationType.LAYOUT);
        }

        private drawLayout():void
        {
			this._iconX = ((this._width - this._iconWidth) >> 1) + this._iconOffsetX;
			this._iconY = ((this._height - this._iconHeight) >> 1) + this._iconOffsetY;
            let xOffset:number = this.getStyleXoffset(this._iconStyleName);
            let yOffset:number = this.getStyleYoffset(this._iconStyleName);
			this._icon.move(this._iconX + xOffset,this._iconY + yOffset);
        }
		/**
		 * @private 
		 */	
        public unuse():void
        {
            this._iconLayer = null;
            this._icon = null;
            super.unuse();
        }
        /**
		 * @private 
		 */	
        public dispose():void
        {
            this._iconLayer = null;
            this._icon = null;
            super.dispose();
        }

        private ___complete(loader:TextureLoader,target:Image):void
        {
            if(this._iconWidth == target.width && this._iconHeight == target.height)return;
            this._iconWidth = target.width;
            this._iconHeight = target.height;
            this.invalidate(InvalidationType.LAYOUT);
        }
    }
}