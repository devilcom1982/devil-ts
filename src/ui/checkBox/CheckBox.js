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
     * @version       V20190418
     * @create        V2019-04-18
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var CheckBox = /** @class */ (function (_super_1) {
        __extends(CheckBox, _super_1);
        function CheckBox() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.CHECK_BOX;
            return _this;
        }
        CheckBox.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._width = devil.ComponentDefault.CHECK_BOX_WIDTH;
            this._height = devil.ComponentDefault.CHECK_BOX_HEIGHT;
            this.setLabelOffset(this._width + 5, 0);
            this._label.align = egret.HorizontalAlign.LEFT;
        };
        CheckBox.prototype.drawSize = function () {
            this._currentBack.width = this._width;
            this._currentBack.height = this._height;
        };
        CheckBox.prototype.drawLayout = function () {
            this._labelX = this._width + this._labelOffsetX;
            this._labelY = ((this._height - this._label.height) >> 1) + this._labelOffsetY;
            this._label.move(this._labelX, this._labelY);
        };
        return CheckBox;
    }(devil.ButtonTextSelected));
    devil.CheckBox = CheckBox;
})(devil || (devil = {}));
