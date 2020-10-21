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
     * 图片加载器
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    var ImageLoader = /** @class */ (function (_super_1) {
        __extends(ImageLoader, _super_1);
        function ImageLoader() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        ImageLoader.prototype.parse = function (data) {
            _super_1.prototype.parse.call(this, data);
            var texture = devil.Manager.pool.createTexture();
            texture.bitmapData = data;
            this.texture = texture;
        };
        /**
         * 加载
         */
        ImageLoader.prototype.load = function () {
            _super_1.prototype.load.call(this);
            this.$loadImage(this._path.urls[0]);
        };
        ImageLoader.prototype.reload = function (index) {
            _super_1.prototype.reload.call(this, index);
            this._path.reload(0);
            this.$loadImage(this._path.urls[0]);
        };
        ImageLoader.prototype.unuse = function () {
            if (this.texture) {
                // this.texture.dispose();
                devil.Manager.pool.pushTexture(this.texture);
                this.texture = null;
            }
            _super_1.prototype.unuse.call(this);
        };
        return ImageLoader;
    }(devil.BaseLoader));
    devil.ImageLoader = ImageLoader;
})(devil || (devil = {}));
