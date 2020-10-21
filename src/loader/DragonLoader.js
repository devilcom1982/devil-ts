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
     * 龙骨动画加载器
     * @author  devil
     * @version V20190115
     * @create  2019-01-15
     * @place   guangzhou
     */
    var DragonLoader = /** @class */ (function (_super_1) {
        __extends(DragonLoader, _super_1);
        function DragonLoader() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        DragonLoader.prototype.parse = function (data) {
            if (data instanceof egret.BitmapData) {
                this.texture = devil.Manager.pool.createTexture();
                this.texture.bitmapData = data;
            }
            else if (data instanceof ArrayBuffer)
                this.bytes = data;
            else
                this.json = JSON.parse(data);
            if (this.json != null && this.texture != null && this.bytes != null) {
                _super_1.prototype.parse.call(this, data);
            }
        };
        DragonLoader.prototype.reload = function (index) {
            _super_1.prototype.reload.call(this, index);
            this._path.reload(index);
            if (index == 0) {
                this.$load(egret.HttpResponseType.ARRAY_BUFFER, 0);
            }
            else if (index == 1) {
                this.$load(egret.HttpResponseType.TEXT, 1);
            }
            else if (index == 2) {
                this.$loadImage(this._path.urls[2]);
            }
        };
        /**
         * 加载
         */
        DragonLoader.prototype.load = function () {
            _super_1.prototype.load.call(this);
            this.$load(egret.HttpResponseType.ARRAY_BUFFER, 0);
            this.$load(egret.HttpResponseType.TEXT, 1);
            this.$loadImage(this._path.urls[2]);
        };
        DragonLoader.prototype.unuse = function () {
            this.bytes = null;
            if (this.texture != null) {
                devil.Manager.pool.pushTexture(this.texture);
                this.texture = null;
            }
            this.json = null;
            _super_1.prototype.unuse.call(this);
        };
        return DragonLoader;
    }(devil.BaseLoader));
    devil.DragonLoader = DragonLoader;
})(devil || (devil = {}));
