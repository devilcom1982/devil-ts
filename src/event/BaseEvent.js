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
     * 事件基类
     * @author devil
     * @version V20180702
     * @create 20180702
     * @place guangzhou
     */
    var BaseEvent = /** @class */ (function (_super_1) {
        __extends(BaseEvent, _super_1);
        function BaseEvent(type, params, bubbles, cancelable) {
            var _this = _super_1.call(this, type, bubbles, cancelable) || this;
            _this.params = params;
            return _this;
        }
        return BaseEvent;
    }(egret.Event));
    devil.BaseEvent = BaseEvent;
})(devil || (devil = {}));
