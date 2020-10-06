namespace devil
{
	/**
     * 选中图标与背景图片合为一张背景图
	 * @author        devil
	 * @version       V20200118
	 * @create        V2020-01-18
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class RadioButton extends ButtonTextSelected implements IRadioSelected
    {
        private _selector:RadioSelector;

        public setSelected(value:boolean):void
        {
            this._common.selected = value;
        }
        public getSelected():boolean
        {
            return this._common.selected;
        }

        public setSelector(value:RadioSelector):void
        {
            this._selector = value;
        }

        public constructor()
        {
            super();
            this._type = ComponentType.RADIO_BUTTON;
        }

        protected start():void
        {
            super.start();
            this._width = ComponentDefault.RADIO_BUTTON_WIDTH;
            this._height = ComponentDefault.RADIO_BUTTON_HEIGHT;
            this.setLabelOffset(this._width + 5,0);
            this._label.align = egret.HorizontalAlign.LEFT;
        }

        protected drawSize():void
        {
            this._currentBack.width = this._width;
            this._currentBack.height = this._height;
        }

        protected drawLayout():void
        {
            this._labelX = this._width + this._labelOffsetX;
            this._labelY = ((this._height - this._label.height) >> 1) + this._labelOffsetY;
            this._label.move(this._labelX,this._labelY);
        }

        public unuse():void
        {
            this._selector = null;
            super.unuse();
        }

        public dispose():void
        {
            this._selector = null;
            super.dispose();
        }

        protected ___handleEvent(e:egret.TouchEvent):void
        {
            if(e.type == egret.TouchEvent.TOUCH_TAP)
			{
				if(this._common.selected)return;
			}
            super.___handleEvent(e);
            if(this._common.selected)this._selector.selectedView = this;
            
        }
    }
}