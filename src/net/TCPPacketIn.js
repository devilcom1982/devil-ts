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
     * @version       V20190311
     * @create        2019-03-11
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var TCPPacketIn = /** @class */ (function (_super_1) {
        __extends(TCPPacketIn, _super_1);
        function TCPPacketIn() {
            return _super_1.call(this) || this;
        }
        Object.defineProperty(TCPPacketIn.prototype, "protocol", {
            get: function () {
                return this._protocol;
            },
            set: function (value) {
                this._protocol = value;
            },
            enumerable: true,
            configurable: true
        });
        return TCPPacketIn;
    }(devil.ByteArrayExtend));
    devil.TCPPacketIn = TCPPacketIn;
})(devil || (devil = {}));
