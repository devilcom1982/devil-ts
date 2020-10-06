namespace devil
{
	/**
     * 选中图标与背景图片合为一张背景图
	 * @author        devil
	 * @version       V20190418
	 * @create        V2019-04-18
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class CheckBox extends ButtonTextSelected
    {
        public constructor()
        {
            super();
            this._type = ComponentType.CHECK_BOX;
        }

        protected start():void
        {
            super.start();
            this._width = ComponentDefault.CHECK_BOX_WIDTH;
            this._height = ComponentDefault.CHECK_BOX_HEIGHT;
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
    }
}