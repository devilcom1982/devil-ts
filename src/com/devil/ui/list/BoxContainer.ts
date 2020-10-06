namespace devil
{
	/**
     * 盒子容器
	 * @author        devil
	 * @version       V20190305
	 * @create        2019-03-05
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class BoxContainer extends Container implements IListContainer
    {
        datas: IListItemData[];
        contentHeight: number;
        contentWidth: number;
        private _showCount:number;
        private _itemWidth:number;
        private _itemHeight:number;
        private _selector:RadioSelector;
        private _row:number;
        private _col:number;
		private _paddingV:number;
        private _paddingH:number;
        
        public holdBottom:boolean;

        public getCount():number
        {
            return this._numChildren;
        }
        /**
         * 最多显示数量，要在add与addAt前使用
         */
        public get showCount()
        {
            return this._showCount;
        }
        public set showCount(value:number)
        {
            this._showCount = value;
        }

        public get itemWidth()
        {
            return this._itemWidth;
        }
        public set itemWidth(value:number)
        {
            this._itemWidth = value;
        }
        public get itemHeight()
        {
            return this._itemHeight;
        }
        public set itemHeight(value:number)
        {
            this._itemHeight = value;
        }

        public get selectedIndex()
        {
            return this._selector.selectedIndex;
        }
        public set selectedIndex(value:number)
        {
            this._selector.selectedIndex = value;
        }

        public getCurrent():IRadioSelected
        {
            return this._selector.currentSelected;
        }

        public getScrollH():number
        {
            return 0;
        }
        public getScrollV():number
        {
            return 0;
        }
        public setScrollH(value:number):void
        {

        }
        public setScrollV(value:number):void
        {
            
        }

        public constructor()
        {
            super();
        }

        protected start():void
        {
            super.start();
            this._selector = new RadioSelector();
            this.holdBottom = false;
        }

        protected draw():void
        {
            super.draw();
            if(this.isInvalid(InvalidationType.LAYOUT))this.drawLayOut();
        }

        private drawLayOut():void
        {
            let xIndex:number;
            let yIndex:number;
            for(let i:number = 0; i < this._numChildren; i ++)
            {
                xIndex = i % this._col;
                yIndex = Math.floor(i / this._col);
                this._children[i].move(xIndex * (this._itemWidth + this._paddingH),yIndex * (this._itemHeight + this._paddingV));
            }
        }

        public add(item:IListItem):void
        {
            this.addAt(item,this._numChildren);
        }

        public addAt(item:IListItem,index:number):void
        {
            let arr = [];
            arr[0] = item;
            arr[1] = index;
            arr = arr.concat(this._layers);
            this.addChildAt.apply(this,arr);
            this._selector.addAt(item,index);
            item.setSelector(this._selector);
            this.updateWH();
        }

        public getItemAt(index:number):IListItem
        {
            let result:any = this.getChildAt(index);
            return result as IListItem;
        }

        public remove(item:IListItem):void
        {
            if(item instanceof View)
            {
                let index:number = this._children.indexOf(item);
                this.removeAt(index);
            }
        }

        public removeAt(index:number):void
        {
            this.removeChildAt(index,true);
            let child:any = this._children[index];
            this._selector.remove(child as IRadioSelected);
            this.updateWH();
        }
		/**
		 * 清空 
		 */		
        public clear():void
        {
            this.removeChildren();
        }
		/**
		 * 清空列表数据 
		 */	
        public clearData():void
        {
            let child:any;
            for(let i:number = 0 ; i < this._numChildren; i ++)
            {
                child = this._children[i];
                (child as IListItem).clearData();
            }
        }

        private updateWH():void
        {
            if(this._numChildren >= this._col)this._width = this._col * (this._itemWidth + this._paddingH) - this._paddingH;
            else this._width = this._numChildren * (this._itemWidth + this._paddingH);
            let row = (this._numChildren >= this._col) ? Math.ceil(this._numChildren / this._col) : 1;
            this._height = row * (this._itemHeight + this._paddingH);
        }

		public unuse():void
		{
			this._selector.dispose();
			this._selector = null;
			super.unuse();
		}
		
		public dispose():void
		{
			this._selector.dispose();
			this._selector = null;
			super.dispose();
		}

        /**
         * 参数 IRadioSelected 
         */
        public __change(callBack:(selected:IRadioSelected) => void,target:any):void
        {
            this._selector.__change(callBack,target);
        }

        public static createSelf(row:number,col:number,paddingV:number = 0,paddingH:number = 0):BoxContainer
        {
            let result:BoxContainer = View.create(BoxContainer);
            result._row = row;
            result._col = col;
            result._paddingV = paddingV;
            result._paddingH = paddingH;
            return result;
        }
    }
}