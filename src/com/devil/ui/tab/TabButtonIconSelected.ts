namespace devil
{
	/**
	 * Tab选中按钮图标
	 * @author        devil
	 * @version       V201190215
	 * @create        2019-02-15
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
     */
    export class TabButtonIconSelected extends ButtonIconSelected implements IListItem
    {
        public static RED_SKIN:string = "redSkin";

        private _selector:RadioSelector;
        private _red:Image;
        private _commonLayer1:egret.DisplayObjectContainer;
        private _index:number;
        public get index():number
        {
            return this._index;
        }
        public set index(value:number)
        {
            this._index = value;
        }

        protected initLayer():void
        {
            super.initLayer();
            this._commonLayer1 = this.createLayer();
        }

        protected start():void
        {
            super.start();
            this._index = 0;
            this._downOffset = false;
        }

        protected setDefaultStyle():void
        {
            super.setDefaultStyle();
            this._styles[TabButtonIconSelected.RED_SKIN] = null;
        }

        public setSelected(value:boolean):void
        {
            if(this._common) this._common.selected = value;
        }

        public getSelected():boolean
        {
            return this._common.selected;
        }

        public setSelector(value:RadioSelector):void
        {
            this._selector = value;
        }

        public switchRed(show:boolean):void
        {
            if(show && this._red == null)
            {
                this._red = View.create(Image);
                this._red.source = this.getStyle(TabButtonIconSelected.RED_SKIN);
                this._red.move(this._width - 33,4);

            }
            if(this._red)
            {
                if(show && this._red.parent == null)this.addChild(this._red,this._commonLayer1);
                else if(!show && this._red.parent != null)this.removeChild(this._red,false);
            }
        }

        public setData(value:TabData):void
        {
            this.setSize(value.width,value.height);
            this.setStyle(TabButtonIconSelected.RED_SKIN,"common_red_png");
            this.setStyle(StyleName.UP_BACK_SKIN,value.upBackSkin);
            this.setStyle(StyleName.SELECT_BACK_SKIN,value.selectedBackSkin);
            this.setStyle(StyleName.UP_ICON_SKIN,value.upIconSkin);
            this.setStyle(StyleName.SELECT_ICON_SKIN,value.selectedfIconSkin);
            if(value.index == 0)this.setIconOffset(-18,0);
            else this.setIconOffset(0,0);
            this.switchRed(value.showRed);
            if(value.selected)this._selector.selectedView = this;
        }

        public clearData():void
        {

        }

        public unuse():void
        {
            this._commonLayer1 = null;
            this._selector = null;
            if(this._red != null && this._red.parent)this._red.pool();
            this._red = null;
            super.unuse();
        }

        public dispose():void
        {
            this._commonLayer1 = null;
            this._selector = null;
            if(this._red != null && this._red.parent)this._red.pool();
            this._red = null;
            super.dispose();
        }

        protected ___handleEvent(e:egret.TouchEvent):void
        {
            if(e.type == egret.TouchEvent.TOUCH_TAP)
			{
				if(this._common.selected)return;
				this._selector.selectedView = this;
            }
            else 
            {
                if(this._common.selected)return;
            }
            this.___$handleEvent(e);
        }
    }
}