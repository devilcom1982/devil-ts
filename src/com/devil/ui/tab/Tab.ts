namespace devil
{
	/**
	 * Tab
	 * @author        devil
	 * @version       V201190813
	 * @create        2019-08-13
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
     */
    export class Tab extends Container
    {
        private _selector:RadioSelector;
        private _selectedIndex:number;
        private _change:CallBackInfo;
        private _commLayer:egret.DisplayObjectContainer;
        private _uiLayer:egret.DisplayObjectContainer;
        private _redLayer:egret.DisplayObjectContainer;
        private _paddingH:number;

        public get selectedIndex()
        {
            return this._selectedIndex;
        }
        public set selectedIndex(value:number)
        {
            if(this._selectedIndex == value)return;
            let oldIndex = this._selectedIndex;
            this._selectedIndex = value;
            if (this._selector.selectedIndex != value) this._selector.selectedIndex = value;
            if(this._change != null)this._change.runCallBack(oldIndex,this);
        }
        public resetSelectedIndex():void
        {
            this._selectedIndex = -1;
        }

        public set paddingH(value:number)
        {
            this._paddingH = value;
        }
        public get paddingH():number
        {
            return this._paddingH;
        }

        public start():void
        {
            super.start();
            this._commLayer = this.createLayer();
            this._commLayer.touchChildren = true;
            this._uiLayer = this.createLayer();
            // this._uiLayer.touchChildren = true;
            this._redLayer = this.createLayer();
            this._selectedIndex = -1;
            this._selector = new RadioSelector();
            this._selector.__change(this.onSelected, this);
            this._paddingH = 5;
        }

        private onSelected(button:TabButtonIconSelected):void
        {
            this.selectedIndex = this._selector.selectedIndex;
        }

        public switchRed(index:number, isRed:boolean):void
        {
            let button:TabButtonIconSelected = this._selector.selecteds[index] as TabButtonIconSelected;
            if (button) button.switchRed(isRed);
        }

        public add(data:TabData):TabButtonIconSelected
        {
            return this.addAt(data,this._selector.selecteds.length);
        }

        public addAt(data:TabData,index:number):TabButtonIconSelected
        {
            let button:TabButtonIconSelected = View.create(TabButtonIconSelected);
            button.setStyle(TabButtonIconSelected.RED_SKIN,"common_red_png");
            button.setStyle(StyleName.UP_BACK_SKIN,data.upBackSkin);
            button.setStyle(StyleName.SELECT_BACK_SKIN,data.selectedBackSkin);
            button.setStyle(StyleName.UP_ICON_SKIN,data.upIconSkin);
            button.setStyle(StyleName.SELECT_ICON_SKIN,data.selectedfIconSkin);
            button.width = data.width;
            button.height = data.height;
            this.addChild(button,this._commLayer,this._uiLayer, this._redLayer);
            this._selector.addAt(button,index);
            button.setSelector(this._selector);
            if (data.selected) this.selectedIndex = index;
            if (data.showRed) button.switchRed(true);
            return button;
        }

        /**
         * 
         * @param index 此处删除可能有问题，flag
         * @param unuse 
         */
        public removeAt(index:number,unuse:boolean):void
        {
            this.removeChildAt(index,unuse);
            this._selector.removeAt(index);
        }

        protected draw():void
        {
            super.draw();
            if(this.isInvalid(InvalidationType.LAYOUT))this.drawLayout();
        }

        private drawLayout():void
        {
            let len = this._children.length;
            for(let i:number = 1 ; i < len; i ++)
            {
                this._children[i].x = this._children[i - 1].right + this._paddingH;
            }
        }
        public unuse():void
        {
            this._selector.dispose();
            this._selector = null;
            this._change = null;
            this._commLayer = null;
            this._uiLayer = null;
            this._redLayer = null;
            super.unuse();
        }

        public dispose():void
        {
            this._selector.dispose();
            this._selector = null;
            this._change = null;
            this._commLayer = null;
            this._uiLayer = null;
            this._redLayer = null;
            super.dispose();
        }


        public __change(callBack:(oldIndex:number,target:Tab)=>void,target:any):void
        {
            this._change = CallBackInfo.create(callBack,target);
        }
    }
}