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
     * 字节加载器
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    var ByteLoader = /** @class */ (function (_super_1) {
        __extends(ByteLoader, _super_1);
        function ByteLoader() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        ByteLoader.prototype.load = function () {
            _super_1.prototype.load.call(this);
            this.$load(egret.HttpResponseType.ARRAY_BUFFER, 0);
        };
        ByteLoader.prototype.reload = function (index) {
            _super_1.prototype.reload.call(this, index);
            this._path.reload(0);
            this.$load(egret.HttpResponseType.ARRAY_BUFFER, 0);
        };
        ByteLoader.prototype.parse = function (data) {
            _super_1.prototype.parse.call(this, data);
            this.bytes = data;
        };
        ByteLoader.prototype.unuse = function () {
            this.bytes = null;
            _super_1.prototype.unuse.call(this);
        };
        return ByteLoader;
    }(devil.BaseLoader));
    devil.ByteLoader = ByteLoader;
})(devil || (devil = {}));
