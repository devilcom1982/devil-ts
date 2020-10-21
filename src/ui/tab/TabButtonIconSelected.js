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
     * Tab选中按钮图标
     * @author        devil
     * @version       V201190215
     * @create        2019-02-15
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var TabButtonIconSelected = /** @class */ (function (_super_1) {
        __extends(TabButtonIconSelected, _super_1);
        function TabButtonIconSelected() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        Object.defineProperty(TabButtonIconSelected.prototype, "index", {
            get: function () {
                return this._index;
            },
            set: function (value) {
                this._index = value;
            },
            enumerable: true,
            configurable: true
        });
        TabButtonIconSelected.prototype.initLayer = function () {
            _super_1.prototype.initLayer.call(this);
            this._commonLayer1 = this.createLayer();
        };
        TabButtonIconSelected.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._index = 0;
            this._downOffset = false;
        };
        TabButtonIconSelected.prototype.setDefaultStyle = function () {
            _super_1.prototype.setDefaultStyle.call(this);
            this._styles[TabButtonIconSelected.RED_SKIN] = null;
        };
        TabButtonIconSelected.prototype.setSelected = function (value) {
            if (this._common)
                this._common.selected = value;
        };
        TabButtonIconSelected.prototype.getSelected = function () {
            return this._common.selected;
        };
        TabButtonIconSelected.prototype.setSelector = function (value) {
            this._selector = value;
        };
        TabButtonIconSelected.prototype.switchRed = function (show) {
            if (show && this._red == null) {
                this._red = devil.View.create(devil.Image);
                this._red.source = this.getStyle(TabButtonIconSelected.RED_SKIN);
                this._red.move(this._width - 33, 4);
            }
            if (this._red) {
                if (show && this._red.parent == null)
                    this.addChild(this._red, this._commonLayer1);
                else if (!show && this._red.parent != null)
                    this.removeChild(this._red, false);
            }
        };
        TabButtonIconSelected.prototype.setData = function (value) {
            this.setSize(value.width, value.height);
            this.setStyle(TabButtonIconSelected.RED_SKIN, "common_red_png");
            this.setStyle(devil.StyleName.UP_BACK_SKIN, value.upBackSkin);
            this.setStyle(devil.StyleName.SELECT_BACK_SKIN, value.selectedBackSkin);
            this.setStyle(devil.StyleName.UP_ICON_SKIN, value.upIconSkin);
            this.setStyle(devil.StyleName.SELECT_ICON_SKIN, value.selectedfIconSkin);
            if (value.index == 0)
                this.setIconOffset(-18, 0);
            else
                this.setIconOffset(0, 0);
            this.switchRed(value.showRed);
            if (value.selected)
                this._selector.selectedView = this;
        };
        TabButtonIconSelected.prototype.clearData = function () {
        };
        TabButtonIconSelected.prototype.unuse = function () {
            this._commonLayer1 = null;
            this._selector = null;
            if (this._red != null && this._red.parent)
                this._red.pool();
            this._red = null;
            _super_1.prototype.unuse.call(this);
        };
        TabButtonIconSelected.prototype.dispose = function () {
            this._commonLayer1 = null;
            this._selector = null;
            if (this._red != null && this._red.parent)
                this._red.pool();
            this._red = null;
            _super_1.prototype.dispose.call(this);
        };
        TabButtonIconSelected.prototype.___handleEvent = function (e) {
            if (e.type == egret.TouchEvent.TOUCH_TAP) {
                if (this._common.selected)
                    return;
                this._selector.selectedView = this;
            }
            else {
                if (this._common.selected)
                    return;
            }
            this.___$handleEvent(e);
        };
        TabButtonIconSelected.RED_SKIN = "redSkin";
        return TabButtonIconSelected;
    }(devil.ButtonIconSelected));
    devil.TabButtonIconSelected = TabButtonIconSelected;
})(devil || (devil = {}));
