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
     * 小游戏专用事件
     * @author        devil
     * @version       V20200906
     * @create        2020-09-06
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var WXGameEvent = /** @class */ (function (_super_1) {
        __extends(WXGameEvent, _super_1);
        function WXGameEvent() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        /**
         * 更新复活次数
         */
        WXGameEvent.UPDATE_RECEIVE_COUNT = "updateReceiveCount";
        return WXGameEvent;
    }(devil.BaseEvent));
    devil.WXGameEvent = WXGameEvent;
})(devil || (devil = {}));
