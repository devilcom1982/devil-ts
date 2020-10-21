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
     * 加载外部图片视图组件
     * @author        devil
     * @version       V20190222
     * @create        2019-02-22
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ImageRemote = /** @class */ (function (_super_1) {
        __extends(ImageRemote, _super_1);
        function ImageRemote() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.IMAGE_REMOTE;
            return _this;
        }
        Object.defineProperty(ImageRemote.prototype, "url", {
            get: function () {
                return this._source;
            },
            set: function (value) {
                if (!(value instanceof devil.PathInfo))
                    this.source = value;
                else if (this._path != value) {
                    this.source = value != null ? value.key : null;
                    this._path = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageRemote.prototype, "source", {
            set: function (value) {
                if (this._source == value)
                    return;
                if (this._path) {
                    // this._bitmap.texture = null; // 加载过程还是不要清空了，闪一下效果不好看
                    devil.Manager.loader.remove(this._path, this.___complete, this);
                    this._path = null;
                }
                else {
                    this._bitmap.texture = null;
                }
                this._source = value;
                if (this._source != null && this._source != "")
                    this.invalidate(devil.InvalidationType.DATA);
            },
            enumerable: true,
            configurable: true
        });
        ImageRemote.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._width = -1;
            this._height = -1;
        };
        ImageRemote.prototype.drawData = function () {
            if (this._path == null && this._source != null && this._source != "") {
                this._path = devil.PathInfo.getPath(this._source, devil.LoaderType.IMAGE, false);
            }
            if (this._path != null)
                devil.Manager.loader.load(this._path, this.___complete, this, devil.ResourceGCType.COMMON, devil.ResPriorityType.LOAD_LEVEL5);
        };
        ImageRemote.prototype.___complete = function (loader) {
            var texture = loader.texture;
            if (texture != null) {
                this._bitmap.texture = texture;
                this._width = this._width < 0 ? texture.textureWidth : this._width;
                this._height = this._height < 0 ? texture.textureHeight : this._height;
                this._bitmap.width = this._width;
                this._bitmap.height = this._height;
                this._invalid = this._invalid ^ devil.InvalidationType.SIZE;
                if (this._completeFun != null)
                    this._completeFun.runCallBack(loader, this);
            }
        };
        return ImageRemote;
    }(devil.Image));
    devil.ImageRemote = ImageRemote;
})(devil || (devil = {}));
