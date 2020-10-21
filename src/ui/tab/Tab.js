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
     * Tab
     * @author        devil
     * @version       V201190813
     * @create        2019-08-13
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var Tab = /** @class */ (function (_super_1) {
        __extends(Tab, _super_1);
        function Tab() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        Object.defineProperty(Tab.prototype, "selectedIndex", {
            get: function () {
                return this._selectedIndex;
            },
            set: function (value) {
                if (this._selectedIndex == value)
                    return;
                var oldIndex = this._selectedIndex;
                this._selectedIndex = value;
                if (this._selector.selectedIndex != value)
                    this._selector.selectedIndex = value;
                if (this._change != null)
                    this._change.runCallBack(oldIndex, this);
            },
            enumerable: true,
            configurable: true
        });
        Tab.prototype.resetSelectedIndex = function () {
            this._selectedIndex = -1;
        };
        Object.defineProperty(Tab.prototype, "paddingH", {
            get: function () {
                return this._paddingH;
            },
            set: function (value) {
                this._paddingH = value;
            },
            enumerable: true,
            configurable: true
        });
        Tab.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._commLayer = this.createLayer();
            this._commLayer.touchChildren = true;
            this._uiLayer = this.createLayer();
            // this._uiLayer.touchChildren = true;
            this._redLayer = this.createLayer();
            this._selectedIndex = -1;
            this._selector = new devil.RadioSelector();
            this._selector.__change(this.onSelected, this);
            this._paddingH = 5;
        };
        Tab.prototype.onSelected = function (button) {
            this.selectedIndex = this._selector.selectedIndex;
        };
        Tab.prototype.switchRed = function (index, isRed) {
            var button = this._selector.selecteds[index];
            if (button)
                button.switchRed(isRed);
        };
        Tab.prototype.add = function (data) {
            return this.addAt(data, this._selector.selecteds.length);
        };
        Tab.prototype.addAt = function (data, index) {
            var button = devil.View.create(devil.TabButtonIconSelected);
            button.setStyle(devil.TabButtonIconSelected.RED_SKIN, "common_red_png");
            button.setStyle(devil.StyleName.UP_BACK_SKIN, data.upBackSkin);
            button.setStyle(devil.StyleName.SELECT_BACK_SKIN, data.selectedBackSkin);
            button.setStyle(devil.StyleName.UP_ICON_SKIN, data.upIconSkin);
            button.setStyle(devil.StyleName.SELECT_ICON_SKIN, data.selectedfIconSkin);
            button.width = data.width;
            button.height = data.height;
            this.addChild(button, this._commLayer, this._uiLayer, this._redLayer);
            this._selector.addAt(button, index);
            button.setSelector(this._selector);
            if (data.selected)
                this.selectedIndex = index;
            if (data.showRed)
                button.switchRed(true);
            return button;
        };
        /**
         *
         * @param index 此处删除可能有问题，flag
         * @param unuse
         */
        Tab.prototype.removeAt = function (index, unuse) {
            this.removeChildAt(index, unuse);
            this._selector.removeAt(index);
        };
        Tab.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(devil.InvalidationType.LAYOUT))
                this.drawLayout();
        };
        Tab.prototype.drawLayout = function () {
            var len = this._children.length;
            for (var i = 1; i < len; i++) {
                this._children[i].x = this._children[i - 1].right + this._paddingH;
            }
        };
        Tab.prototype.unuse = function () {
            this._selector.dispose();
            this._selector = null;
            this._change = null;
            this._commLayer = null;
            this._uiLayer = null;
            this._redLayer = null;
            _super_1.prototype.unuse.call(this);
        };
        Tab.prototype.dispose = function () {
            this._selector.dispose();
            this._selector = null;
            this._change = null;
            this._commLayer = null;
            this._uiLayer = null;
            this._redLayer = null;
            _super_1.prototype.dispose.call(this);
        };
        Tab.prototype.__change = function (callBack, target) {
            this._change = devil.CallBackInfo.create(callBack, target);
        };
        return Tab;
    }(devil.Container));
    devil.Tab = Tab;
})(devil || (devil = {}));
