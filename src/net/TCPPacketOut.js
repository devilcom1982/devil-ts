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
     * 发送协议包头
     * @author        devil
     * @version       V20190311
     * @create        20180726
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var TCPPacketOut = /** @class */ (function (_super_1) {
        __extends(TCPPacketOut, _super_1);
        function TCPPacketOut() {
            return _super_1.call(this) || this;
        }
        TCPPacketOut.prototype.writePacketLenAndVerify = function () {
            this.position = 0;
            this.writeShort(this.length - TCPPacketOut.COMMON_TOTAL_LEN);
            this.position = TCPPacketOut.LENGTH_LEN + TCPPacketOut.PROTOCOL_LEN;
            this.writeByte(devil.Manager.socket.verify);
            devil.Manager.socket.addVerify();
            this.position = 0;
        };
        TCPPacketOut.create = function (protocol) {
            var result = devil.Manager.pool.create(TCPPacketOut);
            result.position = TCPPacketOut.LENGTH_LEN;
            result.protocol = protocol;
            result.writeShort(protocol);
            result.position = TCPPacketOut.LENGTH_LEN + TCPPacketOut.PROTOCOL_LEN + TCPPacketOut.VERIFY_LEN;
            return result;
        };
        TCPPacketOut.LENGTH_LEN = 2; //协议长度占用字节数
        TCPPacketOut.PROTOCOL_LEN = 2; //协议号占用字节数
        TCPPacketOut.VERIFY_LEN = 1; //验证字段占用字节数
        TCPPacketOut.COMMON_TOTAL_LEN = 5; //需要忽略的公共协议头(2字节长度+2字节协议号+1字节服务器验证)长度
        return TCPPacketOut;
    }(devil.ByteArrayExtend));
    devil.TCPPacketOut = TCPPacketOut;
})(devil || (devil = {}));
