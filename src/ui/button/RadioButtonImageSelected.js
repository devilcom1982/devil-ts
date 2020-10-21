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
     * 单选图片选择按钮
     * @author        devil
     * @version       V20190227
     * @create        2019-02-27
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var RadioButtonImageSelected = /** @class */ (function (_super_1) {
        __extends(RadioButtonImageSelected, _super_1);
        function RadioButtonImageSelected() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        RadioButtonImageSelected.prototype.setSelected = function (value) {
            this._common.selected = value;
        };
        RadioButtonImageSelected.prototype.getSelected = function () {
            return this._common.selected;
        };
        RadioButtonImageSelected.prototype.setSelector = function (value) {
            this._selector = value;
        };
        RadioButtonImageSelected.prototype.unuse = function () {
            this._selector = null;
            _super_1.prototype.unuse.call(this);
        };
        RadioButtonImageSelected.prototype.dispose = function () {
            this._selector = null;
            _super_1.prototype.dispose.call(this);
        };
        RadioButtonImageSelected.prototype.___handleEvent = function (e) {
            if (e.type == egret.TouchEvent.TOUCH_TAP) {
                if (this._common.selected)
                    return;
                this._selector.selectedView = this;
            }
            _super_1.prototype.___handleEvent.call(this, e);
        };
        return RadioButtonImageSelected;
    }(devil.ButtonImageSelected));
    devil.RadioButtonImageSelected = RadioButtonImageSelected;
})(devil || (devil = {}));
