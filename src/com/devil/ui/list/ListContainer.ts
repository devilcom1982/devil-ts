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
    export class ListContainer extends Container implements IListContainer
    {
        public static DRAW_CONTENT_SIZE:number = 1;
        protected _col:number;
        protected _paddingV:number;
        protected _paddingH:number;
        private _itemWidth:number;
        private _itemHeight:number;
        private _selector:RadioSelector;
        protected _datas:IListItemData[];
        protected _startIndex:number;
        protected _endIndex:number;
        protected _contentWidth:number;
        protected _contentHeight:number;
        protected _scrollV:number;
        protected _scrollH:number;
        private _scrollRect:egret.Rectangle;
        private _indexInViewCalculated:boolean = false;//视图的第一个和最后一个元素的索引值已经计算好的标志
        private _itemRender:any;
        private _createItemRender:CallBackInfo;
        private _fromScrollBar:boolean;
        private _layer:egret.DisplayObjectContainer;
        private _subLayers:egret.DisplayObjectContainer[];
        private _sortFun:CallBackInfo;
        
        private _sliderH:ListSlider;
        private _sliderV:ListSlider;
        
        public holdBottom:boolean;

        public get showCount()
        {
            if (!this._datas)return 0;
            return this._datas.length;
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

        public get paddingV()
        {
            return this._paddingV;
        }
        public set paddingV(value:number)
        {
            this._paddingV = value;
        }
        public get paddingH()
        {
            return this._paddingH;
        }
        public set paddingH(value:number)
        {
            this._paddingH = value;
        }

        public getCurrent():IRadioSelected
        {
            return this._selector.currentSelected;
        }

        public get selectedIndex()
        {
            return this._selector.selectedIndex + this._startIndex;
        }
        public set selectedIndex(value:number)
        {
            this._selector.selectedIndex = value - this._startIndex;
        }

        public get contentWidth()
        {
            return this._contentWidth;
        }
        public get contentHeight()
        {
            return this._contentHeight;
        }

        public get scrollRect()
        {
            return this._scrollRect;
        }
        public set scrollRect(value:egret.Rectangle)
        {
            let count:number = this._layers.length;
            for(let i:number = 0 ; i < count ; i ++)
            {
                this._layers[i].scrollRect = value;
            }
        }

        public getScrollH():number
        {
            return this._scrollH;
        }

        public setScrollH(value:number,fromScrollBar:boolean):void
        {
            value = +value || 0;
            if(this._scrollH == value)return;
            this._fromScrollBar = fromScrollBar;
            this._scrollH = value;
            this.scrollRect = this._scrollRect.setTo(this._scrollH,this._scrollV,this._width,this._height);
            if (this._sliderH) this._sliderH.containerUpdPos(value);
            this.scrollPositionChanged();
        }

        public getScrollV():number
        {
            return this._scrollV;
        }

        public setScrollV(value:number,fromScrollBar:boolean):void
        {
            value = +value || 0;
            if(this._scrollV == value)return;
            this._fromScrollBar = fromScrollBar;
            this._scrollV = value;
            this.scrollRect = this._scrollRect.setTo(this._scrollH,this._scrollV,this._width,this._height);
            if (this._sliderV) this._sliderV.containerUpdPos(value);
            this.scrollPositionChanged();
        }

        public set sliderH(slider:ListSlider)
        {
            slider.container = this;
            slider.isVertical = false;
            this._sliderH = slider;
        }
        public get sliderH():ListSlider
        {
            return this._sliderH;
        }

        public set sliderV(slider:ListSlider)
        {
            slider.container = this;
            slider.isVertical = true;
            this._sliderV = slider;
        }
        public get sliderV():ListSlider
        {
            return this._sliderV;
        }

        public get datas()
        {
            return this._datas;
        }

        public set datas(value:IListItemData[])
        {
            this.clear();
            this._datas = value;
            this._fromScrollBar = false;
            this.setScrollV(0,false);
            this.setScrollH(0,false);
            this.invalidate(ListContainer.DRAW_CONTENT_SIZE);
            this.invalidate(InvalidationType.LAYOUT);
        }

        public set itemRenderer(value:any)
        {
            this._itemRender = value;
        }

        public get col()
        {
            return this._col;
        }
        public set col(value:number)
        {
            this._col = value;
        }
        /**
         * 创建子项时，需要的回调函数，可以做一些参数的设置或代码初始化等操作
         * @callBack 参数为当前创建的IListItem实例
         */
        public createItemRender(callBack:(child:IListItem,index:number)=>void,target:any):void
        {
            this._createItemRender = CallBackInfo.create(callBack,target);
        }

        public constructor()
        {
            super();
        }

        protected initLayer():void
        {
            this._layer = this.createLayer();
        }

        protected start():void
        {
            super.start();
            this._invalid = this._invalid | ListContainer.DRAW_CONTENT_SIZE;
            this._col = 1;
            this._selector = new RadioSelector();
            this._datas = [];
            this._paddingH = 0;
            this._paddingV = 0;
            this._startIndex = -1;
            this._endIndex = -1;
            this._contentWidth = 0 ;
            this._contentHeight = 0;
            this._scrollH = 0;
            this._scrollV = 0;
            this._itemWidth = 0;
            this._itemHeight = 0;
            this._scrollRect = new egret.Rectangle();
            this._indexInViewCalculated = false;
            this._fromScrollBar = false;
            this.holdBottom = false;
            this._subLayers = [];
        }

        protected draw():void
        {
            super.draw();
            if(this.isInvalid(ListContainer.DRAW_CONTENT_SIZE))this.drawContentSize();
            if(this.isInvalid(InvalidationType.DATA,InvalidationType.LAYOUT))this.drawLayout();
        }

        public setSize(width:number,height:number):void
        {
            if(this._width != width || this._height != height)
            {
                super.setSize(width,height);
                this.scrollRect = this._scrollRect.setTo(this._scrollH,this._scrollV,this._width,this._height);
            }
        }

        /**
         * 清空 
         */
        public clear():void
        {
            this.removeChildren();
            this._selector.clear();
        }

        /**
		 * 清空列表数据 
		 */	
        public clearData():void
        {
            let item:any;
            for(let i:number = 0 ; i < this._numChildren; i ++)
            {
                item = this._children[i];
                <IListItem>(item).clearData();
            }
        }

		private drawLayout():void
        {
            if(this._indexInViewCalculated)this._indexInViewCalculated = false;
            else this.getIndexInView();
            if(this._startIndex == -1 || this._endIndex == -1)return;
            let item:IListItem;
            for(let i:number = this._numChildren; i > 0; i --)
            {   
                item = <any>this._children[i - 1];
                if(!MathUtil.isBetween(this._startIndex,this._endIndex,item.index))
                {
                    this._selector.removeAt(i - 1);
                    this.removeChildAt(i - 1,true);
                }
            }
            if(this.holdBottom && !this._fromScrollBar)
            {
                if(this.getDirection() == List.VERTICAL)
                {
                    if(this._contentHeight > this._height)
                    {
                        this.setScrollV(this._contentHeight - this._height,false);
                    }
                }
                else
                {
                    if(this._contentWidth > this._width)
                    {
                        this.setScrollH(this._contentWidth - this._width,false);
                    }
                }
            }
            this._fromScrollBar = false;
            this.sortPosition();
            if(this._sortFun != null)this._sortFun.runCallBack();
        }

        protected sortPosition():void
        {
            let item:IListItem;
            let view:any;
            let w:number = this._itemWidth + this._paddingH;
            let h:number = this._itemHeight + this._paddingV;
            for(let i:number = this._startIndex; i <= this._endIndex; i ++)
            {
                item = this.createItem(i);
                view = item;
                view.width = this._itemWidth;
                view.height = this._itemHeight;
                if(this.getDirection() == List.VERTICAL)
                {
                    view.move((i%this._col) * w,((i / this._col) | 0) * h);
                }
                else
                {
                    view.move(((i / this._col)|0) * w,(i%this._col) * h);
                }
            }
        }

        public add(data:IListItemData):void
        {
            this.addAt(data,this._datas.length);
        }

        public addAt(data:IListItemData,index:number):void
        {
            if(MathUtil.isBetween(0,this._datas.length,index))
            {
                let i:number = this._datas.indexOf(data);
                if(i == -1)
                {
                    this._datas.splice(index,0,data);
                    this.datas = this._datas;
                }
            }
        }

        public getItemAt(index:number):IListItem
        {
            let result:any = this.getChildAt(index);
            return <IListItem>result;
        }

        public removeAt(index:number):void
        {
            if(MathUtil.isBetween(0,this._datas.length,index))
            {
                this._datas.splice(index,1);
                this.datas = this._datas;
            }
        }

        public remove(data:IListItemData):void
        {
            let index:number = this._datas.indexOf(data);
            this.removeAt(index);
        }

        protected getStartPosition(index:number):number
        {
            index = Math.ceil(index/this._col) | 0;
            if(this.getDirection() == List.VERTICAL)return (this._itemHeight + this._paddingV) * index;
            return (this._itemWidth + this._paddingH) * index;
        }

        /**
         * 折半查找法寻找指定位置的显示对象索引
         */
        protected findIndexAt(scroll:number, i0:number, i1:number):number 
        {
            let index = ((i0 + i1) * 0.5)|0; 
            let position = this.getStartPosition(index * this._col);
            let dis:number = this._itemWidth + this._paddingH;
            if(this.getDirection() == List.VERTICAL)dis = this._itemHeight + this._paddingV;
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
            if(this.getDirection() == List.VERTICAL)
            {
                itemWH = this._itemHeight;
                scroll = this._scrollV;
                wh = this._height;
            }
            else 
            {
                itemWH = this._itemWidth;
                scroll = this._scrollH;
                wh = this._width;
            }
            let contentWH:number = this.getStartPosition(count - 1) + itemWH;
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

        protected createItem(index:number):IListItem
        {
            let child:any;
            for(let i:number = 0 ; i < this._numChildren; i ++)
            {
                child = this._children[i];
                if(child.index == index)return <IListItem>child;
            }
            child = Manager.pool.create(this._itemRender);
            child.index = index;
            this.addChildAt(child,index);
            let len = (<Container>child).layers.length;
            for(let i:number = 0 ; i < len; i ++)
            {
                // this._layer.addChild(child.layers[i]);
                this.getSubLayer(i).addChild(child.layers[i]);
            }
            this._selector.addAt(child,index);
            // child.selector = this._selector;
            child.setSelector(this._selector);
            child.setData(this._datas[index]);
            if(this._createItemRender != null)this._createItemRender.runCallBack(<IListItem>child,index);
            return <IListItem>child;
        }
        public getSubLayer(index:number):egret.DisplayObjectContainer
        {
            let subLayer:egret.DisplayObjectContainer = this._subLayers[index];
            if (!subLayer)
            {
                subLayer = Manager.pool.createDisplayObjectContainer();
                this._subLayers[index] = subLayer;
                this._layer.addChild(subLayer);
                subLayer.touchChildren = true;
            }
            return subLayer;
        }

        protected drawContentSize():void
        {
            if(this.getDirection() == List.VERTICAL)
            {
                this._contentHeight = this.getStartPosition(this.showCount);    
                this._contentWidth = (this._itemWidth + this._paddingH) * this._col - this._paddingH;
            }
            else 
            {
                this._contentHeight = (this._itemHeight + this._paddingV) * this._col - this._paddingV;
                this._contentWidth = this.getStartPosition(this.showCount);    
            }
            if (this._sliderH) this._sliderH.updateContentSize();
            if (this._sliderV) this._sliderV.updateContentSize();
        }

        private scrollPositionChanged():void 
        {
            let changed = this.getIndexInView();
            if (changed) 
            {
                this._indexInViewCalculated = true;
                this.invalidate(InvalidationType.LAYOUT);
            }
        }

        protected getDirection():number
        {
            let list:List = <any>this.parent;
            return list.layout
        }

        public createSortFun(callBack:()=>void,target:any):void
        {
            this._sortFun = CallBackInfo.create(callBack,target);
        }

        public unuse():void
        {
            this._selector.dispose();
            this._selector = null;
            this._datas = null;
            this._scrollRect = null;
            this._itemRender = null;
            if(this._createItemRender)
            {
                this._createItemRender.pool();
                this._createItemRender = null;
            }
            this._layer = null;
            let len:number = this._subLayers.length;
			for(let i:number = 0 ; i < len; i ++)
			{
				Manager.pool.pushDisplayObjectContainer(this._subLayers[i]);
			}
            this._subLayers = null;
            this._sortFun = null;
            this._sliderH = null;
            this._sliderV = null;
            super.unuse();
        }

        public dispose():void
        {
            this._selector.dispose();
            this._selector = null;
            this._datas = null;
            this._scrollRect = null;
            this._itemRender = null;
            if(this._createItemRender)
            {
                this._createItemRender.pool();
                this._createItemRender = null;
            }
            this._layer = null;
            let len:number = this._subLayers.length;
			for(let i:number = 0 ; i < len; i ++)
			{
				Manager.pool.pushDisplayObjectContainer(this._subLayers[i]);
			}
            this._subLayers = null;
            this._sortFun = null;
            this._sliderH = null;
            this._sliderV = null;
            super.dispose();
        }

        public __change(callBack:(current:IRadioSelected)=>void,target:any):void
        {
            this._selector.__change(callBack,target);
        }
    }
}