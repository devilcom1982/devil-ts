var devil;
(function (devil) {
    /**
     * 协议处理基类
     * @author devil
     * @version V20180728
     * @create V20180728
     * @place guangzhou
     * @QQ    101644277
     */
    var BaseCMD = /** @class */ (function () {
        function BaseCMD() {
        }
        Object.defineProperty(BaseCMD.prototype, "protocol", {
            get: function () {
                return this._protocol;
            },
            enumerable: true,
            configurable: true
        });
        BaseCMD.prototype.receive = function (pkg) { };
        BaseCMD.prototype.processOut = function (pkg) { };
        Object.defineProperty(BaseCMD.prototype, "canSend", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        BaseCMD.prototype.send = function () {
            if (this.canSend) {
                var out = devil.TCPPacketOut.create(this._protocol);
                this.processOut(out);
                devil.Manager.socket.send(out);
            }
        };
        return BaseCMD;
    }());
    devil.BaseCMD = BaseCMD;
})(devil || (devil = {}));
