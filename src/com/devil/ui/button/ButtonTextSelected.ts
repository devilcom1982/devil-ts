namespace devil
{
	/**
	 * @author        devil
	 * @version       V20190418
	 * @create        V2019-04-18
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class ButtonTextSelected extends ButtonText
    {
        protected _common:ButtonSelectedBase;

        public get common()
        {
            return this._common;
        }

        public constructor()
        {
            super();
            this._type = ComponentType.BUTTON_TEXT_SELECTED;
        }
        protected start()
        {
            super.start();
            this._common = Manager.pool.create(ButtonSelectedBase);
            this._common.button = this;
        }

        protected setDefaultStyle():void
        {
            super.setDefaultStyle();
            this._styles[StyleName.SELECT_BACK_SKIN] = null;
            // this._styles[StyleName.SELECT_BACK_RECT] = null;
        }

        protected drawState():void
        {
            // if(this._buttonState == ButtonState.SELECTED)this.drawSkin(StyleName.SELECT_BACK_SKIN,StyleName.SELECT_BACK_RECT);
            if(this._buttonState == ButtonState.SELECTED)this.drawSkin(StyleName.SELECT_BACK_SKIN);
            else super.drawState();
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

        protected ___handleEvent(e:egret.TouchEvent):void
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
    }
}