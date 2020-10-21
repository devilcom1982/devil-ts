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
     * 选中图标与背景图片合为一张背景图
     * @author        devil
     * @version       V20200118
     * @create        V2020-01-18
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var RadioButton = /** @class */ (function (_super_1) {
        __extends(RadioButton, _super_1);
        function RadioButton() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.RADIO_BUTTON;
            return _this;
        }
        RadioButton.prototype.setSelected = function (value) {
            this._common.selected = value;
        };
        RadioButton.prototype.getSelected = function () {
            return this._common.selected;
        };
        RadioButton.prototype.setSelector = function (value) {
            this._selector = value;
        };
        RadioButton.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._width = devil.ComponentDefault.RADIO_BUTTON_WIDTH;
            this._height = devil.ComponentDefault.RADIO_BUTTON_HEIGHT;
            this.setLabelOffset(this._width + 5, 0);
            this._label.align = egret.HorizontalAlign.LEFT;
        };
        RadioButton.prototype.drawSize = function () {
            this._currentBack.width = this._width;
            this._currentBack.height = this._height;
        };
        RadioButton.prototype.drawLayout = function () {
            this._labelX = this._width + this._labelOffsetX;
            this._labelY = ((this._height - this._label.height) >> 1) + this._labelOffsetY;
            this._label.move(this._labelX, this._labelY);
        };
        RadioButton.prototype.unuse = function () {
            this._selector = null;
            _super_1.prototype.unuse.call(this);
        };
        RadioButton.prototype.dispose = function () {
            this._selector = null;
            _super_1.prototype.dispose.call(this);
        };
        RadioButton.prototype.___handleEvent = function (e) {
            if (e.type == egret.TouchEvent.TOUCH_TAP) {
                if (this._common.selected)
                    return;
            }
            _super_1.prototype.___handleEvent.call(this, e);
            if (this._common.selected)
                this._selector.selectedView = this;
        };
        return RadioButton;
    }(devil.ButtonTextSelected));
    devil.RadioButton = RadioButton;
})(devil || (devil = {}));
