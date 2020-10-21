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
     * 字节数组扩展，为了使用某些版本的ie可以连上
     * ArrayBuffer转成ByteArrayExtend 使用setArrayBuffer不要使用构造函数
     * @author        devil
     * @version       V20190311
     * @create        20180726
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ByteArrayExtend = /** @class */ (function (_super_1) {
        __extends(ByteArrayExtend, _super_1);
        function ByteArrayExtend() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        Object.defineProperty(ByteArrayExtend.prototype, "buffer", {
            get: function () {
                return this.data.buffer;
            },
            /**
             * @private
             */
            set: function (value) {
                var wpos = value.byteLength;
                var uint8 = new Uint8Array(value);
                var bufferExtSize = this.bufferExtSize;
                var bytes;
                if (bufferExtSize == 0) {
                    bytes = new Uint8Array(wpos);
                }
                else {
                    var multi = (wpos / bufferExtSize | 0) + 1;
                    bytes = new Uint8Array(multi * bufferExtSize);
                }
                bytes.set(uint8);
                this.write_position = wpos;
                this._bytes = bytes;
                this.data = new DataView(bytes.buffer);
            },
            enumerable: true,
            configurable: true
        });
        ByteArrayExtend.prototype.setArrayBuffer = function (buffer) {
            this._position = 0;
            this.write_position = buffer.byteLength;
            this.buffer = buffer;
            this._position = 0;
        };
        ByteArrayExtend.prototype.readInt64 = function () {
            return this.readInt() * Math.pow(2, 32) + this.readUnsignedInt();
        };
        ByteArrayExtend.prototype.writeInt64 = function (value) {
            this.writeInt(value / 0xffffffff);
            this.writeUnsignedInt(value);
        };
        ByteArrayExtend.prototype.writeUTF = function (value) {
            if (value != null)
                _super_1.prototype.writeUTF.call(this, value);
            else
                _super_1.prototype.writeUTF.call(this, "");
        };
        ByteArrayExtend.prototype.pool = function () {
            this.endian = egret.Endian.BIG_ENDIAN;
            devil.Manager.pool.push(this);
        };
        ByteArrayExtend.prototype.unuse = function () {
            this.clear();
        };
        ByteArrayExtend.prototype.reuse = function () {
        };
        ByteArrayExtend.prototype.dispose = function () {
            this.clear();
        };
        return ByteArrayExtend;
    }(egret.ByteArray));
    devil.ByteArrayExtend = ByteArrayExtend;
})(devil || (devil = {}));
