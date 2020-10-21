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
     * 事件管理器
     * @author        devil
     * @version       V20190910
     * @create        2019-09-10
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var EventManager = /** @class */ (function (_super_1) {
        __extends(EventManager, _super_1);
        function EventManager() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        return EventManager;
    }(egret.EventDispatcher));
    devil.EventManager = EventManager;
})(devil || (devil = {}));
