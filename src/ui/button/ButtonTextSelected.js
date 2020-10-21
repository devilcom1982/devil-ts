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
     * @author        devil
     * @version       V20190418
     * @create        V2019-04-18
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ButtonTextSelected = /** @class */ (function (_super_1) {
        __extends(ButtonTextSelected, _super_1);
        function ButtonTextSelected() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.BUTTON_TEXT_SELECTED;
            return _this;
        }
        Object.defineProperty(ButtonTextSelected.prototype, "common", {
            get: function () {
                return this._common;
            },
            enumerable: true,
            configurable: true
        });
        ButtonTextSelected.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._common = devil.Manager.pool.create(devil.ButtonSelectedBase);
            this._common.button = this;
        };
        ButtonTextSelected.prototype.setDefaultStyle = function () {
            _super_1.prototype.setDefaultStyle.call(this);
            this._styles[devil.StyleName.SELECT_BACK_SKIN] = null;
            // this._styles[StyleName.SELECT_BACK_RECT] = null;
        };
        ButtonTextSelected.prototype.drawState = function () {
            // if(this._buttonState == ButtonState.SELECTED)this.drawSkin(StyleName.SELECT_BACK_SKIN,StyleName.SELECT_BACK_RECT);
            if (this._buttonState == devil.ButtonState.SELECTED)
                this.drawSkin(devil.StyleName.SELECT_BACK_SKIN);
            else
                _super_1.prototype.drawState.call(this);
        };
        ButtonTextSelected.prototype.unuse = function () {
            this._common.pool();
            this._common = null;
            _super_1.prototype.unuse.call(this);
        };
        ButtonTextSelected.prototype.dispose = function () {
            this._common.pool();
            this._common = null;
            _super_1.prototype.dispose.call(this);
        };
        ButtonTextSelected.prototype.___handleEvent = function (e) {
            if (e.type == egret.TouchEvent.TOUCH_TAP) {
                this._common.selected = !this._common.selected;
            }
            else {
                if (this._common.selected)
                    return;
            }
            _super_1.prototype.___handleEvent.call(this, e);
        };
        return ButtonTextSelected;
    }(devil.ButtonText));
    devil.ButtonTextSelected = ButtonTextSelected;
})(devil || (devil = {}));
