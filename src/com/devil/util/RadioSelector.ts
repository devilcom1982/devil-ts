namespace devil
{
    /**
	 * 选择器
	 * @author        devil
	 * @version       V201190215
	 * @create        2019-02-15
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
     */
    export class RadioSelector implements IDispose
    {
        private _selecteds:IRadioSelected[];
        private _currentSelected:IRadioSelected;
        private _changFun:CallBackInfo;

        public get selecteds()
        {
            return this._selecteds;
        }

        public get currentSelected()
        {
            return this._currentSelected;
        }

        public get selectedIndex()
        {
            return this._selecteds.indexOf(this._currentSelected);
        }

        public set selectedIndex(value:number)
        {
            value = MathUtil.clamb(0,this._selecteds.length < 0 ? 0 : this._selecteds.length - 1,value);
            if(this._currentSelected != this._selecteds[value])
            {
                if(this._currentSelected != null)this._currentSelected.setSelected(false);
                this._currentSelected = this.selecteds[value];
                this._currentSelected.setSelected(true);
                if(this._changFun != null)this._changFun.runCallBack(this._currentSelected);
            }
        }

        public set selectedView(value:IRadioSelected)
        {
            let index:number =  this._selecteds.indexOf(value);
            if(index != -1)this.selectedIndex = index;
        }

        public constructor()
        {
            this._selecteds = [];
        }

        public add(selected:IRadioSelected):void
        {
            this.addAt(selected,this._selecteds.length);
        }

        public addAt(selected:IRadioSelected,index:number):void
        {
            if(this._selecteds.indexOf(selected) == -1)this._selecteds.splice(index,0,selected);
        }

        public remove(selected:IRadioSelected):void
        {
            let index:number = this._selecteds.indexOf(selected);
            if(index != -1)this.removeAt(index);
        }

        public cancel():void
        {
            if(this._currentSelected != null)this._currentSelected.setSelected(false);
            this._currentSelected = null;
        }

        public removeAt(index:number):void
        {
            if(this._selecteds[index] == this._currentSelected)
            {
                this.cancel();
            }
            this._selecteds.splice(index,1);
        }

        public clear():void
        {
            this.cancel();
            this._selecteds.length = 0;
        }

        public pool():void
        {
            this.dispose();
        }

        public dispose():void
        {
            this._selecteds = null;
            if(this._changFun != null)
            {
                this._changFun.pool();
                this._changFun = null;
            }
            this._currentSelected = null;
        }

        // public __change(callBack:Function,target:any):void
        public __change(callBack:(selected:IRadioSelected) => void,target:any):void
        {
            this._changFun = CallBackInfo.create(callBack,target);
        }
    }
}