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
     * 选中按钮图标
     * @author        devil
     * @version       V201190215
     * @create        2019-02-15
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ButtonIconSelected = /** @class */ (function (_super_1) {
        __extends(ButtonIconSelected, _super_1);
        function ButtonIconSelected() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.BUTTON_ICON_SELECTED;
            return _this;
        }
        Object.defineProperty(ButtonIconSelected.prototype, "common", {
            get: function () {
                return this._common;
            },
            enumerable: true,
            configurable: true
        });
        ButtonIconSelected.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._common = devil.Manager.pool.create(devil.ButtonSelectedBase);
            this._common.button = this;
        };
        /**
         * @private
         */
        ButtonIconSelected.prototype.setDefaultStyle = function () {
            _super_1.prototype.setDefaultStyle.call(this);
            this._styles[devil.StyleName.SELECT_BACK_SKIN] = null;
            // this._styles[StyleName.SELECT_BACK_RECT] = null;
            this._styles[devil.StyleName.SELECT_ICON_SKIN] = null;
        };
        ButtonIconSelected.prototype.drawState = function () {
            if (this._buttonState == devil.ButtonState.SELECTED) {
                // this.drawSkin(StyleName.SELECT_BACK_SKIN,StyleName.SELECT_BACK_RECT);
                this.drawSkin(devil.StyleName.SELECT_BACK_SKIN);
                var backX = this.getStyleXoffset(devil.StyleName.SELECT_BACK_SKIN);
                var backY = this.getStyleYoffset(devil.StyleName.SELECT_BACK_SKIN);
                this._currentBack.move(backX, backY);
                this.drawIconSkin(devil.StyleName.SELECT_ICON_SKIN);
                var iconX = this._iconX + this.getStyleXoffset(devil.StyleName.SELECT_ICON_SKIN);
                var iconY = this._iconY + this.getStyleYoffset(devil.StyleName.SELECT_ICON_SKIN);
                this._icon.move(iconX, iconY);
            }
            else
                _super_1.prototype.drawState.call(this);
        };
        ButtonIconSelected.prototype.setEnabled = function (value) {
            if (this._enabled != value) {
                this._enabled = value;
                this.touchEnabled = this._enabled;
            }
        };
        ButtonIconSelected.prototype.___handleEvent = function (e) {
            if (e.type == egret.TouchEvent.TOUCH_TAP) {
                this._common.selected = !this._common.selected;
            }
            else {
                if (this._common.selected)
                    return;
            }
            _super_1.prototype.___handleEvent.call(this, e);
        };
        ButtonIconSelected.prototype.unuse = function () {
            this._common.pool();
            this._common = null;
            _super_1.prototype.unuse.call(this);
        };
        ButtonIconSelected.prototype.dispose = function () {
            this._common.pool();
            this._common = null;
            _super_1.prototype.dispose.call(this);
        };
        return ButtonIconSelected;
    }(devil.ButtonIcon));
    devil.ButtonIconSelected = ButtonIconSelected;
})(devil || (devil = {}));
