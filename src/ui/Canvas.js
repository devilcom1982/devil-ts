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
     * 画布、界面、面板
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var Canvas = /** @class */ (function (_super_1) {
        __extends(Canvas, _super_1);
        function Canvas() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.CANVAS;
            return _this;
        }
        /**
         * 解析数据
         */
        Canvas.prototype.read = function (bytes, version) {
            bytes.position = 0;
            this.setSize(bytes.readShort(), bytes.readShort());
            this.readChildren(bytes, version);
        };
        /**
         * 编辑器子类重写
         * @param bytes
         * @param version
         */
        Canvas.prototype.readChildren = function (bytes, version) {
            var numChildren = bytes.readByte();
            // console.log("Canvas",numChildren);
            for (var i = 0; i < numChildren; i++) {
                devil.Manager.uiRead.read(this, bytes, version, this.setProperty, this);
            }
            this.readDataComplete();
        };
        return Canvas;
    }(devil.Container));
    devil.Canvas = Canvas;
})(devil || (devil = {}));
