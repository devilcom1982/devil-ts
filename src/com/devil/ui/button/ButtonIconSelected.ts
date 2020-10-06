namespace devil
{
	/**
	 * 选中按钮图标
	 * @author        devil
	 * @version       V201190215
	 * @create        2019-02-15
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
     */
    export class ButtonIconSelected extends ButtonIcon
    {
        protected _common:ButtonSelectedBase;

        public get common()
        {
            return this._common;
        }

        public constructor()
        {
            super();
            this._type = ComponentType.BUTTON_ICON_SELECTED;
        }

        protected start():void
        {
            super.start();
            this._common = Manager.pool.create(ButtonSelectedBase);
            this._common.button = this;
        }
		
		/**
		 * @private 
		 */	
        protected setDefaultStyle():void
        {
            super.setDefaultStyle();
            this._styles[StyleName.SELECT_BACK_SKIN] = null;
			// this._styles[StyleName.SELECT_BACK_RECT] = null;
			this._styles[StyleName.SELECT_ICON_SKIN] = null;
        }

        protected drawState():void
        {
            if(this._buttonState == ButtonState.SELECTED)
            {
                // this.drawSkin(StyleName.SELECT_BACK_SKIN,StyleName.SELECT_BACK_RECT);
                this.drawSkin(StyleName.SELECT_BACK_SKIN);
                let backX:number = this.getStyleXoffset(StyleName.SELECT_BACK_SKIN);
                let backY:number = this.getStyleYoffset(StyleName.SELECT_BACK_SKIN);
                this._currentBack.move(backX,backY);
                
                this.drawIconSkin(StyleName.SELECT_ICON_SKIN);
                let iconX:number = this._iconX + this.getStyleXoffset(StyleName.SELECT_ICON_SKIN);
                let iconY:number = this._iconY + this.getStyleYoffset(StyleName.SELECT_ICON_SKIN);
                this._icon.move(iconX,iconY);
            }
            else super.drawState();
        }

        public setEnabled(value:boolean)
        {
            if(this._enabled != value)
            {
                this._enabled = value;
                this.touchEnabled = this._enabled;
            }
        }

        protected ___handleEvent(e:egret.Event):void
        {
            if(e.type == egret.TouchEvent.TOUCH_TAP)
            {
                this._common.selected = !this._common.selected;
            }
            else 
            {
                if(this._common.selected)return;
            }
            super.___handleEvent(e);
        }

        public unuse():void
        {
            this._common.pool();
            this._common = null;
            super.unuse();
        }

        public dispose():void
        {
            this._common.pool();
            this._common = null;
            super.dispose();
        }
    }
}