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
     * 盒子容器
     * @author        devil
     * @version       V20190305
     * @create        2019-03-05
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var BoxContainer = /** @class */ (function (_super_1) {
        __extends(BoxContainer, _super_1);
        function BoxContainer() {
            return _super_1.call(this) || this;
        }
        BoxContainer.prototype.getCount = function () {
            return this._numChildren;
        };
        Object.defineProperty(BoxContainer.prototype, "showCount", {
            /**
             * 最多显示数量，要在add与addAt前使用
             */
            get: function () {
                return this._showCount;
            },
            set: function (value) {
                this._showCount = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxContainer.prototype, "itemWidth", {
            get: function () {
                return this._itemWidth;
            },
            set: function (value) {
                this._itemWidth = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxContainer.prototype, "itemHeight", {
            get: function () {
                return this._itemHeight;
            },
            set: function (value) {
                this._itemHeight = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxContainer.prototype, "selectedIndex", {
            get: function () {
                return this._selector.selectedIndex;
            },
            set: function (value) {
                this._selector.selectedIndex = value;
            },
            enumerable: true,
            configurable: true
        });
        BoxContainer.prototype.getCurrent = function () {
            return this._selector.currentSelected;
        };
        BoxContainer.prototype.getScrollH = function () {
            return 0;
        };
        BoxContainer.prototype.getScrollV = function () {
            return 0;
        };
        BoxContainer.prototype.setScrollH = function (value) {
        };
        BoxContainer.prototype.setScrollV = function (value) {
        };
        BoxContainer.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._selector = new devil.RadioSelector();
            this.holdBottom = false;
        };
        BoxContainer.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(devil.InvalidationType.LAYOUT))
                this.drawLayOut();
        };
        BoxContainer.prototype.drawLayOut = function () {
            var xIndex;
            var yIndex;
            for (var i = 0; i < this._numChildren; i++) {
                xIndex = i % this._col;
                yIndex = Math.floor(i / this._col);
                this._children[i].move(xIndex * (this._itemWidth + this._paddingH), yIndex * (this._itemHeight + this._paddingV));
            }
        };
        BoxContainer.prototype.add = function (item) {
            this.addAt(item, this._numChildren);
        };
        BoxContainer.prototype.addAt = function (item, index) {
            var arr = [];
            arr[0] = item;
            arr[1] = index;
            arr = arr.concat(this._layers);
            this.addChildAt.apply(this, arr);
            this._selector.addAt(item, index);
            item.setSelector(this._selector);
            this.updateWH();
        };
        BoxContainer.prototype.getItemAt = function (index) {
            var result = this.getChildAt(index);
            return result;
        };
        BoxContainer.prototype.remove = function (item) {
            if (item instanceof devil.View) {
                var index = this._children.indexOf(item);
                this.removeAt(index);
            }
        };
        BoxContainer.prototype.removeAt = function (index) {
            this.removeChildAt(index, true);
            var child = this._children[index];
            this._selector.remove(child);
            this.updateWH();
        };
        /**
         * 清空
         */
        BoxContainer.prototype.clear = function () {
            this.removeChildren();
        };
        /**
         * 清空列表数据
         */
        BoxContainer.prototype.clearData = function () {
            var child;
            for (var i = 0; i < this._numChildren; i++) {
                child = this._children[i];
                child.clearData();
            }
        };
        BoxContainer.prototype.updateWH = function () {
            if (this._numChildren >= this._col)
                this._width = this._col * (this._itemWidth + this._paddingH) - this._paddingH;
            else
                this._width = this._numChildren * (this._itemWidth + this._paddingH);
            var row = (this._numChildren >= this._col) ? Math.ceil(this._numChildren / this._col) : 1;
            this._height = row * (this._itemHeight + this._paddingH);
        };
        BoxContainer.prototype.unuse = function () {
            this._selector.dispose();
            this._selector = null;
            _super_1.prototype.unuse.call(this);
        };
        BoxContainer.prototype.dispose = function () {
            this._selector.dispose();
            this._selector = null;
            _super_1.prototype.dispose.call(this);
        };
        /**
         * 参数 IRadioSelected
         */
        BoxContainer.prototype.__change = function (callBack, target) {
            this._selector.__change(callBack, target);
        };
        BoxContainer.createSelf = function (row, col, paddingV, paddingH) {
            if (paddingV === void 0) { paddingV = 0; }
            if (paddingH === void 0) { paddingH = 0; }
            var result = devil.View.create(BoxContainer);
            result._row = row;
            result._col = col;
            result._paddingV = paddingV;
            result._paddingH = paddingH;
            return result;
        };
        return BoxContainer;
    }(devil.Container));
    devil.BoxContainer = BoxContainer;
})(devil || (devil = {}));
