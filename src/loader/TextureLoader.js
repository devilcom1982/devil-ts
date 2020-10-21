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
     * 贴图加载器
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    var TextureLoader = /** @class */ (function (_super_1) {
        __extends(TextureLoader, _super_1);
        function TextureLoader() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        TextureLoader.prototype.getTexture = function (name) {
            if (this._sheet)
                return this._sheet.getTexture(name);
            return null;
        };
        TextureLoader.prototype.parse = function (data) {
            if (data instanceof egret.BitmapData)
                this._bitmapData = data;
            else {
                var json = JSON.parse(data);
                if (json.frames != null)
                    this._json = json.frames;
                else
                    this._json = json;
            }
            if (this._json != null && this._bitmapData != null) {
                _super_1.prototype.parse.call(this, data);
                this._sheet = devil.SpriteSheet.create(this._bitmapData, this._json);
                this._bitmapData = null;
                this._json = null;
            }
        };
        TextureLoader.prototype.reload = function (index) {
            _super_1.prototype.reload.call(this, index);
            this._path.reload(index);
            if (index == 0) {
                this.$load(egret.HttpResponseType.TEXT, 0);
            }
            else {
                this.$loadImage(this._path.urls[1]);
            }
        };
        /**
         * 加载
         */
        TextureLoader.prototype.load = function () {
            _super_1.prototype.load.call(this);
            this.$load(egret.HttpResponseType.TEXT, 0);
            this.$loadImage(this._path.urls[1]);
        };
        TextureLoader.prototype.unuse = function () {
            _super_1.prototype.unuse.call(this);
            if (this._sheet) {
                this._sheet.dispose();
                this._sheet = null;
            }
            this._bitmapData = null;
            this._json = null;
        };
        TextureLoader.prototype.gc = function () {
            if (this._count <= 0) {
                if (egret.getTimer() - this._unUseTimer >= devil.ResourceGCType.getGCTime(this._resourceGCType)) {
                    devil.Manager.log.trace(devil.LogType.DEBUG, "资源释放", this._path.urls[0], this._path.urls[1]);
                    this.pool();
                    return true;
                }
                return false;
            }
            else {
                if (devil.AnimationLoader.abc)
                    devil.Manager.log.trace(devil.LogType.DEBUG, "资源未释放", this._path.urls[0], this._path.urls[1], this._count);
            }
            return false;
        };
        return TextureLoader;
    }(devil.BaseLoader));
    devil.TextureLoader = TextureLoader;
})(devil || (devil = {}));
