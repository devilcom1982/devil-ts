namespace devil
{
	/**
     * 列表组件容器
	 * @author        devil
	 * @version       V20181225
	 * @create        2018-12-25
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class ListContainer2 extends ListContainer
    {
        /**
         * 特殊处理 玩动2游戏的面板Tab
         */
        public contentWidthOffset:number = 0;

        public constructor()
        {
            super();
        }

        protected start():void
        {
            super.start();
            this.contentWidthOffset = 0;
        }

        protected sortPosition():void
        {
            let item:IListItem;
            let view:any;
            let start:number = this.getStartPosition(this._startIndex > 0 ? this._startIndex: 0);
            for(let i:number = this._startIndex; i <= this._endIndex; i ++)
            {
                item = this.createItem(i);
                view = item;
                if(this.getDirection() == List.VERTICAL)
                {
                    view.y = start;
                    start += view.height + this._paddingV;
                }
                else
                {
                    view.x = start;
                    start += view.width + this._paddingH;
                }
            }
        }

        protected getStartPosition(index:number):number
        {
            let result:number = 0;
            let data:IListItemData2;
            for(let i:number = 0 ; i < this.showCount; i ++)
            {
                data = <IListItemData2>this._datas[i];
                if(index === i)break;
                if(this.getDirection() == List.VERTICAL)result += data.height + this._paddingV;
                else result += data.width + this._paddingH;
            }
            return result;
        }

        /**
         * 折半查找法寻找指定位置的显示对象索引
         */
        protected findIndexAt(scroll:number, i0:number, i1:number):number 
        {
            let index = ((i0 + i1) * 0.5)|0; 
            let data:IListItemData2 = <IListItemData2>this._datas[index + 1];
            let position = this.getStartPosition(index * this._col);
            let dis:number = data != null ? data.width + this._paddingH : 0
            if(this.getDirection() == List.VERTICAL)dis = data != null ? data.height + this._paddingV : 0;
            if ((scroll >= position) && (scroll < position + dis))return index;
            else if (i0 == i1)return -1;
            else if (scroll < position)return this.findIndexAt(scroll, i0, Math.max(i0, index - 1));
            return this.findIndexAt(scroll, Math.min(index + 1, i1), i1);
        }

        protected getIndexInView():boolean 
        {
            let count:number = this.showCount;
            if(count == 0 || this._width == 0 || this._height == 0)
            {
                this._startIndex = -1;
                this._endIndex = -1;
                return false;
            }
            let itemWH:number;
            let scroll:number;
            let wh:number;
            let data:IListItemData2 = <IListItemData2>this._datas[count - 1];
            if(this.getDirection() == List.VERTICAL)
            {
                itemWH = data.height;
                scroll = this._scrollV;
                wh = this._height;
            }
            else 
            {
                itemWH = data.width;
                scroll = this._scrollH;
                wh = this._width;
            }
            let contentWH:number = this.getStartPosition(count) + itemWH;
            if (scroll > contentWH) 
            {
                this._startIndex = -1;
                this._endIndex = -1;
                return false;
            }
            let maxScroll = scroll + wh;
            if (maxScroll < 0) 
            {
                this._startIndex = -1;
                this._endIndex = -1;
                return false;
            }
            let oldStartIndex = this._startIndex;
            let oldEndIndex = this._endIndex;
            this._startIndex = this.findIndexAt(scroll, 0, Math.ceil((count - 1) / this._col));
            if (this._startIndex == -1)this._startIndex = 0;
            else this._startIndex = this._startIndex * this._col>= count ? count - 1 :this._startIndex * this._col;
            this._endIndex = this.findIndexAt(maxScroll, 0, Math.ceil((count - 1) / this._col));
            if(this._endIndex == -1)this._endIndex = count - 1;
            else this._endIndex = (this._endIndex + 1) * this._col - 1 >= count ? count - 1 : (this._endIndex + 1) * this._col - 1;
            return oldStartIndex != this._startIndex || oldEndIndex != this._endIndex;
        }

        protected drawContentSize():void
        {
            let data:IListItemData2 = <IListItemData2>this._datas[0];
            if(this.getDirection() == List.VERTICAL)
            {
                this._contentHeight = this.getStartPosition(this.showCount + 1);    
                this._contentWidth = this.showCount > 0 ? data.width : 0;
            }
            else 
            {
                this._contentHeight = this.showCount > 0 ? data.height : 0;
                this._contentWidth = this.getStartPosition(this.showCount + 1) + this.contentWidthOffset;    
            }
        }
    }
}