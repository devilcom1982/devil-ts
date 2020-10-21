var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var devil;
(function (devil) {
    /**
     * 列表组件容器
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ListContainer = /** @class */ (function (_super_1) {
        __extends(ListContainer, _super_1);
        function ListContainer() {
            var _this = _super_1.call(this) || this;
            _this._indexInViewCalculated = false; //视图的第一个和最后一个元素的索引值已经计算好的标志
            return _this;
        }
        Object.defineProperty(ListContainer.prototype, "showCount", {
            get: function () {
                if (!this._datas)
                    return 0;
                return this._datas.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "itemWidth", {
            get: function () {
                return this._itemWidth;
            },
            set: function (value) {
                this._itemWidth = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "itemHeight", {
            get: function () {
                return this._itemHeight;
            },
            set: function (value) {
                this._itemHeight = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "paddingV", {
            get: function () {
                return this._paddingV;
            },
            set: function (value) {
                this._paddingV = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "paddingH", {
            get: function () {
                return this._paddingH;
            },
            set: function (value) {
                this._paddingH = value;
            },
            enumerable: true,
            configurable: true
        });
        ListContainer.prototype.getCurrent = function () {
            return this._selector.currentSelected;
        };
        Object.defineProperty(ListContainer.prototype, "selectedIndex", {
            get: function () {
                return this._selector.selectedIndex + this._startIndex;
            },
            set: function (value) {
                this._selector.selectedIndex = value - this._startIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "contentWidth", {
            get: function () {
                return this._contentWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "contentHeight", {
            get: function () {
                return this._contentHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "scrollRect", {
            get: function () {
                return this._scrollRect;
            },
            set: function (value) {
                var count = this._layers.length;
                for (var i = 0; i < count; i++) {
                    this._layers[i].scrollRect = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        ListContainer.prototype.getScrollH = function () {
            return this._scrollH;
        };
        ListContainer.prototype.setScrollH = function (value, fromScrollBar) {
            value = +value || 0;
            if (this._scrollH == value)
                return;
            this._fromScrollBar = fromScrollBar;
            this._scrollH = value;
            this.scrollRect = this._scrollRect.setTo(this._scrollH, this._scrollV, this._width, this._height);
            if (this._sliderH)
                this._sliderH.containerUpdPos(value);
            this.scrollPositionChanged();
        };
        ListContainer.prototype.getScrollV = function () {
            return this._scrollV;
        };
        ListContainer.prototype.setScrollV = function (value, fromScrollBar) {
            value = +value || 0;
            if (this._scrollV == value)
                return;
            this._fromScrollBar = fromScrollBar;
            this._scrollV = value;
            this.scrollRect = this._scrollRect.setTo(this._scrollH, this._scrollV, this._width, this._height);
            if (this._sliderV)
                this._sliderV.containerUpdPos(value);
            this.scrollPositionChanged();
        };
        Object.defineProperty(ListContainer.prototype, "sliderH", {
            get: function () {
                return this._sliderH;
            },
            set: function (slider) {
                slider.container = this;
                slider.isVertical = false;
                this._sliderH = slider;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "sliderV", {
            get: function () {
                return this._sliderV;
            },
            set: function (slider) {
                slider.container = this;
                slider.isVertical = true;
                this._sliderV = slider;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "datas", {
            get: function () {
                return this._datas;
            },
            set: function (value) {
                this.clear();
                this._datas = value;
                this._fromScrollBar = false;
                this.setScrollV(0, false);
                this.setScrollH(0, false);
                this.invalidate(ListContainer.DRAW_CONTENT_SIZE);
                this.invalidate(devil.InvalidationType.LAYOUT);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "itemRenderer", {
            set: function (value) {
                this._itemRender = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "col", {
            get: function () {
                return this._col;
            },
            set: function (value) {
                this._col = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 创建子项时，需要的回调函数，可以做一些参数的设置或代码初始化等操作
         * @callBack 参数为当前创建的IListItem实例
         */
        ListContainer.prototype.createItemRender = function (callBack, target) {
            this._createItemRender = devil.CallBackInfo.create(callBack, target);
        };
        ListContainer.prototype.initLayer = function () {
            this._layer = this.createLayer();
        };
        ListContainer.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._invalid = this._invalid | ListContainer.DRAW_CONTENT_SIZE;
            this._col = 1;
            this._selector = new devil.RadioSelector();
            this._datas = [];
            this._paddingH = 0;
            this._paddingV = 0;
            this._startIndex = -1;
            this._endIndex = -1;
            this._contentWidth = 0;
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
        };
        ListContainer.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(ListContainer.DRAW_CONTENT_SIZE))
                this.drawContentSize();
            if (this.isInvalid(devil.InvalidationType.DATA, devil.InvalidationType.LAYOUT))
                this.drawLayout();
        };
        ListContainer.prototype.setSize = function (width, height) {
            if (this._width != width || this._height != height) {
                _super_1.prototype.setSize.call(this, width, height);
                this.scrollRect = this._scrollRect.setTo(this._scrollH, this._scrollV, this._width, this._height);
            }
        };
        /**
         * 清空
         */
        ListContainer.prototype.clear = function () {
            this.removeChildren();
            this._selector.clear();
        };
        /**
         * 清空列表数据
         */
        ListContainer.prototype.clearData = function () {
            var item;
            for (var i = 0; i < this._numChildren; i++) {
                item = this._children[i];
                (item).clearData();
            }
        };
        ListContainer.prototype.drawLayout = function () {
            if (this._indexInViewCalculated)
                this._indexInViewCalculated = false;
            else
                this.getIndexInView();
            if (this._startIndex == -1 || this._endIndex == -1)
                return;
            var item;
            for (var i = this._numChildren; i > 0; i--) {
                item = this._children[i - 1];
                if (!devil.MathUtil.isBetween(this._startIndex, this._endIndex, item.index)) {
                    this._selector.removeAt(i - 1);
                    this.removeChildAt(i - 1, true);
                }
            }
            if (this.holdBottom && !this._fromScrollBar) {
                if (this.getDirection() == devil.List.VERTICAL) {
                    if (this._contentHeight > this._height) {
                        this.setScrollV(this._contentHeight - this._height, false);
                    }
                }
                else {
                    if (this._contentWidth > this._width) {
                        this.setScrollH(this._contentWidth - this._width, false);
                    }
                }
            }
            this._fromScrollBar = false;
            this.sortPosition();
            if (this._sortFun != null)
                this._sortFun.runCallBack();
        };
        ListContainer.prototype.sortPosition = function () {
            var item;
            var view;
            var w = this._itemWidth + this._paddingH;
            var h = this._itemHeight + this._paddingV;
            for (var i = this._startIndex; i <= this._endIndex; i++) {
                item = this.createItem(i);
                view = item;
                view.width = this._itemWidth;
                view.height = this._itemHeight;
                if (this.getDirection() == devil.List.VERTICAL) {
                    view.move((i % this._col) * w, ((i / this._col) | 0) * h);
                }
                else {
                    view.move(((i / this._col) | 0) * w, (i % this._col) * h);
                }
            }
        };
        ListContainer.prototype.add = function (data) {
            this.addAt(data, this._datas.length);
        };
        ListContainer.prototype.addAt = function (data, index) {
            if (devil.MathUtil.isBetween(0, this._datas.length, index)) {
                var i = this._datas.indexOf(data);
                if (i == -1) {
                    this._datas.splice(index, 0, data);
                    this.datas = this._datas;
                }
            }
        };
        ListContainer.prototype.getItemAt = function (index) {
            var result = this.getChildAt(index);
            return result;
        };
        ListContainer.prototype.removeAt = function (index) {
            if (devil.MathUtil.isBetween(0, this._datas.length, index)) {
                this._datas.splice(index, 1);
                this.datas = this._datas;
            }
        };
        ListContainer.prototype.remove = function (data) {
            var index = this._datas.indexOf(data);
            this.removeAt(index);
        };
        ListContainer.prototype.getStartPosition = function (index) {
            index = Math.ceil(index / this._col) | 0;
            if (this.getDirection() == devil.List.VERTICAL)
                return (this._itemHeight + this._paddingV) * index;
            return (this._itemWidth + this._paddingH) * index;
        };
        /**
         * 折半查找法寻找指定位置的显示对象索引
         */
        ListContainer.prototype.findIndexAt = function (scroll, i0, i1) {
            var index = ((i0 + i1) * 0.5) | 0;
            var position = this.getStartPosition(index * this._col);
            var dis = this._itemWidth + this._paddingH;
            if (this.getDirection() == devil.List.VERTICAL)
                dis = this._itemHeight + this._paddingV;
            if ((scroll >= position) && (scroll < position + dis))
                return index;
            else if (i0 == i1)
                return -1;
            else if (scroll < position)
                return this.findIndexAt(scroll, i0, Math.max(i0, index - 1));
            return this.findIndexAt(scroll, Math.min(index + 1, i1), i1);
        };
        ListContainer.prototype.getIndexInView = function () {
            var count = this.showCount;
            if (count == 0 || this._width == 0 || this._height == 0) {
                this._startIndex = -1;
                this._endIndex = -1;
                return false;
            }
            var itemWH;
            var scroll;
            var wh;
            if (this.getDirection() == devil.List.VERTICAL) {
                itemWH = this._itemHeight;
                scroll = this._scrollV;
                wh = this._height;
            }
            else {
                itemWH = this._itemWidth;
                scroll = this._scrollH;
                wh = this._width;
            }
            var contentWH = this.getStartPosition(count - 1) + itemWH;
            if (scroll > contentWH) {
                this._startIndex = -1;
                this._endIndex = -1;
                return false;
            }
            var maxScroll = scroll + wh;
            if (maxScroll < 0) {
                this._startIndex = -1;
                this._endIndex = -1;
                return false;
            }
            var oldStartIndex = this._startIndex;
            var oldEndIndex = this._endIndex;
            this._startIndex = this.findIndexAt(scroll, 0, Math.ceil((count - 1) / this._col));
            if (this._startIndex == -1)
                this._startIndex = 0;
            else
                this._startIndex = this._startIndex * this._col >= count ? count - 1 : this._startIndex * this._col;
            this._endIndex = this.findIndexAt(maxScroll, 0, Math.ceil((count - 1) / this._col));
            if (this._endIndex == -1)
                this._endIndex = count - 1;
            else
                this._endIndex = (this._endIndex + 1) * this._col - 1 >= count ? count - 1 : (this._endIndex + 1) * this._col - 1;
            return oldStartIndex != this._startIndex || oldEndIndex != this._endIndex;
        };
        ListContainer.prototype.createItem = function (index) {
            var child;
            for (var i = 0; i < this._numChildren; i++) {
                child = this._children[i];
                if (child.index == index)
                    return child;
            }
            child = devil.Manager.pool.create(this._itemRender);
            child.index = index;
            this.addChildAt(child, index);
            var len = child.layers.length;
            for (var i = 0; i < len; i++) {
                // this._layer.addChild(child.layers[i]);
                this.getSubLayer(i).addChild(child.layers[i]);
            }
            this._selector.addAt(child, index);
            // child.selector = this._selector;
            child.setSelector(this._selector);
            child.setData(this._datas[index]);
            if (this._createItemRender != null)
                this._createItemRender.runCallBack(child, index);
            return child;
        };
        ListContainer.prototype.getSubLayer = function (index) {
            var subLayer = this._subLayers[index];
            if (!subLayer) {
                subLayer = devil.Manager.pool.createDisplayObjectContainer();
                this._subLayers[index] = subLayer;
                this._layer.addChild(subLayer);
                subLayer.touchChildren = true;
            }
            return subLayer;
        };
        ListContainer.prototype.drawContentSize = function () {
            if (this.getDirection() == devil.List.VERTICAL) {
                this._contentHeight = this.getStartPosition(this.showCount);
                this._contentWidth = (this._itemWidth + this._paddingH) * this._col - this._paddingH;
            }
            else {
                this._contentHeight = (this._itemHeight + this._paddingV) * this._col - this._paddingV;
                this._contentWidth = this.getStartPosition(this.showCount);
            }
            if (this._sliderH)
                this._sliderH.updateContentSize();
            if (this._sliderV)
                this._sliderV.updateContentSize();
        };
        ListContainer.prototype.scrollPositionChanged = function () {
            var changed = this.getIndexInView();
            if (changed) {
                this._indexInViewCalculated = true;
                this.invalidate(devil.InvalidationType.LAYOUT);
            }
        };
        ListContainer.prototype.getDirection = function () {
            var list = this.parent;
            return list.layout;
        };
        ListContainer.prototype.createSortFun = function (callBack, target) {
            this._sortFun = devil.CallBackInfo.create(callBack, target);
        };
        ListContainer.prototype.unuse = function () {
            this._selector.dispose();
            this._selector = null;
            this._datas = null;
            this._scrollRect = null;
            this._itemRender = null;
            if (this._createItemRender) {
                this._createItemRender.pool();
                this._createItemRender = null;
            }
            this._layer = null;
            var len = this._subLayers.length;
            for (var i = 0; i < len; i++) {
                devil.Manager.pool.pushDisplayObjectContainer(this._subLayers[i]);
            }
            this._subLayers = null;
            this._sortFun = null;
            this._sliderH = null;
            this._sliderV = null;
            _super_1.prototype.unuse.call(this);
        };
        ListContainer.prototype.dispose = function () {
            this._selector.dispose();
            this._selector = null;
            this._datas = null;
            this._scrollRect = null;
            this._itemRender = null;
            if (this._createItemRender) {
                this._createItemRender.pool();
                this._createItemRender = null;
            }
            this._layer = null;
            var len = this._subLayers.length;
            for (var i = 0; i < len; i++) {
                devil.Manager.pool.pushDisplayObjectContainer(this._subLayers[i]);
            }
            this._subLayers = null;
            this._sortFun = null;
            this._sliderH = null;
            this._sliderV = null;
            _super_1.prototype.dispose.call(this);
        };
        ListContainer.prototype.__change = function (callBack, target) {
            this._selector.__change(callBack, target);
        };
        ListContainer.DRAW_CONTENT_SIZE = 1;
        return ListContainer;
    }(devil.Container));
    devil.ListContainer = ListContainer;
})(devil || (devil = {}));
