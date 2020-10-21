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
    var ListContainer2 = /** @class */ (function (_super_1) {
        __extends(ListContainer2, _super_1);
        function ListContainer2() {
            var _this = _super_1.call(this) || this;
            /**
             * 特殊处理 玩动2游戏的面板Tab
             */
            _this.contentWidthOffset = 0;
            return _this;
        }
        ListContainer2.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this.contentWidthOffset = 0;
        };
        ListContainer2.prototype.sortPosition = function () {
            var item;
            var view;
            var start = this.getStartPosition(this._startIndex > 0 ? this._startIndex : 0);
            for (var i = this._startIndex; i <= this._endIndex; i++) {
                item = this.createItem(i);
                view = item;
                if (this.getDirection() == devil.List.VERTICAL) {
                    view.y = start;
                    start += view.height + this._paddingV;
                }
                else {
                    view.x = start;
                    start += view.width + this._paddingH;
                }
            }
        };
        ListContainer2.prototype.getStartPosition = function (index) {
            var result = 0;
            var data;
            for (var i = 0; i < this.showCount; i++) {
                data = this._datas[i];
                if (index === i)
                    break;
                if (this.getDirection() == devil.List.VERTICAL)
                    result += data.height + this._paddingV;
                else
                    result += data.width + this._paddingH;
            }
            return result;
        };
        /**
         * 折半查找法寻找指定位置的显示对象索引
         */
        ListContainer2.prototype.findIndexAt = function (scroll, i0, i1) {
            var index = ((i0 + i1) * 0.5) | 0;
            var data = this._datas[index + 1];
            var position = this.getStartPosition(index * this._col);
            var dis = data != null ? data.width + this._paddingH : 0;
            if (this.getDirection() == devil.List.VERTICAL)
                dis = data != null ? data.height + this._paddingV : 0;
            if ((scroll >= position) && (scroll < position + dis))
                return index;
            else if (i0 == i1)
                return -1;
            else if (scroll < position)
                return this.findIndexAt(scroll, i0, Math.max(i0, index - 1));
            return this.findIndexAt(scroll, Math.min(index + 1, i1), i1);
        };
        ListContainer2.prototype.getIndexInView = function () {
            var count = this.showCount;
            if (count == 0 || this._width == 0 || this._height == 0) {
                this._startIndex = -1;
                this._endIndex = -1;
                return false;
            }
            var itemWH;
            var scroll;
            var wh;
            var data = this._datas[count - 1];
            if (this.getDirection() == devil.List.VERTICAL) {
                itemWH = data.height;
                scroll = this._scrollV;
                wh = this._height;
            }
            else {
                itemWH = data.width;
                scroll = this._scrollH;
                wh = this._width;
            }
            var contentWH = this.getStartPosition(count) + itemWH;
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
        ListContainer2.prototype.drawContentSize = function () {
            var data = this._datas[0];
            if (this.getDirection() == devil.List.VERTICAL) {
                this._contentHeight = this.getStartPosition(this.showCount + 1);
                this._contentWidth = this.showCount > 0 ? data.width : 0;
            }
            else {
                this._contentHeight = this.showCount > 0 ? data.height : 0;
                this._contentWidth = this.getStartPosition(this.showCount + 1) + this.contentWidthOffset;
            }
        };
        return ListContainer2;
    }(devil.ListContainer));
    devil.ListContainer2 = ListContainer2;
})(devil || (devil = {}));
