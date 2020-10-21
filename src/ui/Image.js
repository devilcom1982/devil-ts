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
     * 图片组件
     * @author        devil
     * @version       V20190131
     * @create        2019-01-31
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var Image = /** @class */ (function (_super_1) {
        __extends(Image, _super_1);
        function Image() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.IMAGE;
            return _this;
        }
        Object.defineProperty(Image.prototype, "bitmap", {
            get: function () {
                return this._bitmap;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "scale9Grid", {
            get: function () {
                return this._bitmap.scale9Grid;
            },
            /**
             * 九宫格
             */
            set: function (value) {
                this._bitmap.scale9Grid = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "source", {
            /**
             * 图片源数据
             */
            get: function () {
                return this._source;
            },
            set: function (value) {
                if (this._source == value)
                    return;
                this._bitmap.texture = null;
                if (this._path) {
                    devil.Manager.loader.remove(this._path, this.___complete, this);
                    this._path = null;
                }
                this._source = value;
                if (this._source != null && this._source != "") {
                    if (this._source instanceof egret.Texture) {
                        if (this._width == -1)
                            this._width = this._source.textureWidth;
                        if (this._height == -1)
                            this._height = this._source.textureHeight;
                        this.invalidate(devil.InvalidationType.SIZE);
                    }
                    this.invalidate(devil.InvalidationType.DATA);
                }
            },
            enumerable: true,
            configurable: true
        });
        Image.prototype.initLayer = function () {
            this._layer = this.createLayer();
        };
        /**
         * @private
         */
        Image.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._width = -1;
            this._height = -1;
            this._bitmap = devil.Manager.pool.createBitmap();
            this._layer.addChild(this._bitmap);
        };
        Image.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(devil.InvalidationType.DATA))
                this.drawData();
            if (this.isInvalid(devil.InvalidationType.SIZE))
                this.drawSize();
        };
        Image.prototype.drawSize = function () {
            if (this._bitmap.texture != null) {
                this._bitmap.width = this._width;
                this._bitmap.height = this._height;
            }
        };
        Image.prototype.drawData = function () {
            if (this._source instanceof egret.Texture) {
                this._bitmap.texture = this._source;
            }
            else {
                if (this._source != null && this._source != "") {
                    this._path = devil.PathInfo.getPath(devil.Model.resConfig.getURL(this._source), devil.LoaderType.TEXTURE);
                    devil.Manager.loader.load(this._path, this.___complete, this, devil.ResourceGCType.COMMON, devil.ResPriorityType.LOAD_LEVEL5);
                }
            }
        };
        Image.prototype.unuse = function () {
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.___touchTap, this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___touchBegin, this);
            this._source = null;
            devil.Manager.pool.pushBitmap(this._bitmap);
            this._bitmap = null;
            this._layer = null;
            if (this._completeFun != null) {
                this._completeFun.pool();
                this._completeFun = null;
            }
            if (this._path) {
                devil.Manager.loader.remove(this._path, this.___complete, this);
                this._path = null;
            }
            if (this._clickFun != null) {
                this._clickFun.pool();
                this._clickFun = null;
            }
            if (!!this._downFun) {
                this._downFun.pool();
                this._downFun = null;
            }
            _super_1.prototype.unuse.call(this);
        };
        Image.prototype.dispose = function () {
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.___touchTap, this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___touchBegin, this);
            this._source = null;
            devil.Manager.pool.pushBitmap(this._bitmap);
            this._bitmap = null;
            this._layer = null;
            if (this._completeFun != null) {
                this._completeFun.pool();
                this._completeFun = null;
            }
            if (this._path) {
                devil.Manager.loader.remove(this._path, this.___complete, this);
                this._path = null;
            }
            if (this._clickFun != null) {
                this._clickFun.pool();
                this._clickFun = null;
            }
            if (!!this._downFun) {
                this._downFun.pool();
                this._downFun = null;
            }
            _super_1.prototype.dispose.call(this);
        };
        /**
         * 加载完成的回调函数，参数为[TextureLoader,Image]
         * @param callBack
         * @param target
         */
        Image.prototype.__complete = function (callBack, target) {
            if (callBack != null && target != null)
                this._completeFun = devil.CallBackInfo.create(callBack, target);
        };
        Image.prototype.___complete = function (loader) {
            var texture = loader.getTexture(this._source);
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
        Image.prototype.__click = function (callBack, target) {
            this.touchEnabled = true;
            this._clickFun = devil.CallBackInfo.create(callBack, target);
            if (!this._layer.hasEventListener(egret.TouchEvent.TOUCH_TAP))
                this._layer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.___touchTap, this);
        };
        Image.prototype.__down = function (callBack, target) {
            this.touchEnabled = true;
            this._downFun = devil.CallBackInfo.create(callBack, target);
            if (!this._layer.hasEventListener(egret.TouchEvent.TOUCH_BEGIN))
                this._layer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___touchBegin, this);
        };
        Image.prototype.___touchTap = function (e) {
            if (this._clickFun)
                this._clickFun.runCallBack(e, this);
        };
        Image.prototype.___touchBegin = function (e) {
            if (!!this._downFun)
                this._downFun.runCallBack(e, this);
        };
        return Image;
    }(devil.Component));
    devil.Image = Image;
})(devil || (devil = {}));
