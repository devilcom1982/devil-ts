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
     * 动画加载器
     * @author devil
     * @version V20180811
     * @create V20180811
     * @place guangzhou
     */
    var AnimationLoader = /** @class */ (function (_super_1) {
        __extends(AnimationLoader, _super_1);
        function AnimationLoader() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        AnimationLoader.prototype.parse = function (data) {
            if (data instanceof egret.BitmapData)
                this._bitmapData = data;
            else
                this._json = JSON.parse(data);
            if (this._json != null && this._bitmapData != null) {
                _super_1.prototype.parse.call(this, data);
                this.sheet = devil.AnimationData.create(this._bitmapData, this._json);
                this._bitmapData = null;
                this._json = null;
            }
        };
        AnimationLoader.prototype.unuse = function () {
            _super_1.prototype.unuse.call(this);
            if (this.sheet) {
                this.sheet.pool();
                this.sheet = null;
            }
            this._bitmapData = null;
            this._json = null;
        };
        /**
         * 加载
         */
        AnimationLoader.prototype.load = function () {
            _super_1.prototype.load.call(this);
            // Manager.log.trace(devil.LogType.DEBUG,"加载路径",this._path.urls)
            this.$load(egret.HttpResponseType.TEXT, 0);
            this.$loadImage(this._path.urls[1]);
        };
        AnimationLoader.prototype.reload = function (index) {
            _super_1.prototype.reload.call(this, index);
            this._path.reload(index);
            if (index == 0) {
                this.$load(egret.HttpResponseType.TEXT, 0);
            }
            else {
                this.$loadImage(this._path.urls[1]);
            }
        };
        AnimationLoader.abc = false;
        return AnimationLoader;
    }(devil.BaseLoader));
    devil.AnimationLoader = AnimationLoader;
})(devil || (devil = {}));
