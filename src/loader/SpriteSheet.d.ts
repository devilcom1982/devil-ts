declare namespace devil {
    /**
     * 自定义SpriteSheet
     * @author devil
     * @version V20180722
     * @create V20180722
     * @place guangzhou
     */
    class SpriteSheet extends egret.HashObject implements IPool {
        private _texture;
        private _json;
        private _bitmapX;
        private _bitmapY;
        /**
         * @private
         * 纹理缓存字典
         */
        private _textureMap;
        set bitmapData(value: egret.BitmapData);
        set json(value: any);
        constructor();
        /**
         * 根据指定纹理名称获取一个缓存的 Texture 对象
         * @param name {string} 缓存这个 Texture 对象所使用的名称
         * @returns {egret.Texture} Texture 对象
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        getTexture(name: string): egret.Texture;
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
        private createTexture;
        reuse(): void;
        unuse(): void;
        /**
         * 释放纹理
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        dispose(): void;
        static create(bitmapData: egret.BitmapData, json: any): SpriteSheet;
    }
}
