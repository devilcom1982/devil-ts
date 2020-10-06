namespace devil
{
	/**
	 * 单选图片选择按钮
	 * @author        devil
	 * @version       V20190227
	 * @create        2019-02-27
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class RadioButtonImageSelected extends ButtonImageSelected implements IRadioSelected
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
				this._selector.selectedView = this;
			}
            super.___handleEvent(e);
        }
    }
}