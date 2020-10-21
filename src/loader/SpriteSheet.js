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
     * 自定义SpriteSheet
     * @author devil
     * @version V20180722
     * @create V20180722
     * @place guangzhou
     */
    var SpriteSheet = /** @class */ (function (_super_1) {
        __extends(SpriteSheet, _super_1);
        function SpriteSheet() {
            var _this = _super_1.call(this) || this;
            _this._bitmapX = 0; //表示这个SpriteSheet的位图区域在bitmapData上的起始位置x
            _this._bitmapY = 0; //表示这个SpriteSheet的位图区域在bitmapData上的起始位置y。
            /**
             * @private
             * 纹理缓存字典
             */
            _this._textureMap = egret.createMap();
            return _this;
        }
        Object.defineProperty(SpriteSheet.prototype, "bitmapData", {
            set: function (value) {
                this._texture = devil.Manager.pool.createTexture();
                this._texture.bitmapData = value;
                this._bitmapX = this._texture.$bitmapX - this._texture.$offsetX;
                this._bitmapY = this._texture.$bitmapY - this._texture.$offsetY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriteSheet.prototype, "json", {
            set: function (value) {
                this._json = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 根据指定纹理名称获取一个缓存的 Texture 对象
         * @param name {string} 缓存这个 Texture 对象所使用的名称
         * @returns {egret.Texture} Texture 对象
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        SpriteSheet.prototype.getTexture = function (name) {
            if (this._textureMap[name] == null) {
                var data = this._json[name];
                this.createTexture(name, data.x, data.y, data.w, data.h, data.offX, data.offY, data.sourceW, data.sourceH, data.scale9grid);
            }
            return this._textureMap[name];
        };
        /**
         * 为 SpriteSheet 上的指定区域创建一个新的 Texture 对象并缓存它
         * @param name {string} 缓存这个 Texture 对象所使用的名称，如果名称已存在，将会覆盖之前的 Texture 对象
         * @param bitmapX {number} 纹理区域在 bitmapData 上的起始坐标x
         * @param bitmapY {number} 纹理区域在 bitmapData 上的起始坐标y
         * @param bitmapWidth {number} 纹理区域在 bitmapData 上的宽度
         * @param bitmapHeight {number} 纹理区域在 bitmapData 上的高度
         * @param offsetX {number} 原始位图的非透明区域 x 起始点
         * @param offsetY {number} 原始位图的非透明区域 y 起始点
         * @param textureWidth {number} 原始位图的高度，若不传入，则使用 bitmapWidth 的值。
         * @param textureHeight {number} 原始位图的宽度，若不传入，则使用 bitmapHeight 的值。
         * @returns {egret.Texture} 创建的 Texture 对象
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        SpriteSheet.prototype.createTexture = function (name, bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight, scale9Grid) {
            if (offsetX === void 0) { offsetX = 0; }
            if (offsetY === void 0) { offsetY = 0; }
            if (textureWidth === void 0) {
                textureWidth = offsetX + bitmapWidth;
            }
            if (textureHeight === void 0) {
                textureHeight = offsetY + bitmapHeight;
            }
            var texture = devil.Manager.pool.createTexture();
            texture.disposeBitmapData = false;
            texture.$bitmapData = this._texture.$bitmapData;
            texture.$initData(this._bitmapX + bitmapX, this._bitmapY + bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight, this._texture.$sourceWidth, this._texture.$sourceHeight);
            if (!!scale9Grid) {
                var list = scale9Grid.split(",");
                texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
            }
            this._textureMap[name] = texture;
            return texture;
        };
        SpriteSheet.prototype.reuse = function () {
        };
        SpriteSheet.prototype.unuse = function () {
            this._json = null;
            for (var key in this._textureMap) {
                // this._textureMap[key].dispose();
                devil.Manager.pool.pushTexture(this._textureMap[key]);
                this._textureMap[key] = null;
            }
            // this._texture.dispose();
            devil.Manager.pool.pushTexture(this._texture);
            this._texture = null;
        };
        /**
         * 释放纹理
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        SpriteSheet.prototype.dispose = function () {
            this.unuse();
        };
        SpriteSheet.create = function (bitmapData, json) {
            var result = devil.Manager.pool.create(SpriteSheet);
            result.bitmapData = bitmapData;
            result.json = json;
            return result;
        };
        return SpriteSheet;
    }(egret.HashObject));
    devil.SpriteSheet = SpriteSheet;
})(devil || (devil = {}));
