namespace devil
{
    /**
     * 自定义SpriteSheet
     * @author devil
     * @version V20180722
     * @create V20180722
     * @place guangzhou
     */
    export class SpriteSheet extends egret.HashObject implements IPool
    {
        private _texture:egret.Texture;
        private _json:any;
        private _bitmapX:number = 0;//表示这个SpriteSheet的位图区域在bitmapData上的起始位置x
        private _bitmapY:number = 0;//表示这个SpriteSheet的位图区域在bitmapData上的起始位置y。
        /**
         * @private
         * 纹理缓存字典
         */
        private _textureMap = egret.createMap<egret.Texture>();

        public set bitmapData(value:egret.BitmapData)
        {
            this._texture = Manager.pool.createTexture();
            this._texture.bitmapData = value;
            this._bitmapX = this._texture.$bitmapX - this._texture.$offsetX;
            this._bitmapY = this._texture.$bitmapY - this._texture.$offsetY;
        }

        public set json(value:any)
        {
            this._json = value;
        }

        public constructor()
         {
            super();
        }

        /**
         * 根据指定纹理名称获取一个缓存的 Texture 对象
         * @param name {string} 缓存这个 Texture 对象所使用的名称
         * @returns {egret.Texture} Texture 对象
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public getTexture(name:string):egret.Texture 
        {
            if(this._textureMap[name] == null)
            {
                let data:any = this._json[name];
                this.createTexture(name,data.x,data.y,data.w,data.h,data.offX,data.offY,data.sourceW,data.sourceH,data.scale9grid);
            }
            return this._textureMap[name];
        }

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
        private createTexture(name:string, bitmapX:number, bitmapY:number, bitmapWidth:number, bitmapHeight:number, offsetX:number = 0, offsetY:number = 0, textureWidth?:number, textureHeight?:number,scale9Grid?:String):egret.Texture {
            if (textureWidth === void 0) {
                textureWidth = offsetX + bitmapWidth;
            }
            if (textureHeight === void 0) {
                textureHeight = offsetY + bitmapHeight;
            }
            let texture:egret.Texture = Manager.pool.createTexture();
            texture.disposeBitmapData = false;
            texture.$bitmapData = this._texture.$bitmapData;
            texture.$initData(this._bitmapX + bitmapX, this._bitmapY + bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight, this._texture.$sourceWidth, this._texture.$sourceHeight);
            if(!!scale9Grid)
            {
                let list:string[] = scale9Grid.split(",");
                texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]),parseInt(list[1]),parseInt(list[2]),parseInt(list[3]));
            }
            this._textureMap[name] = texture;
            return texture;
        }

        public reuse():void
        {

        }

        public unuse():void
        {
            this._json = null;
            for(let key in this._textureMap)
            {
                // this._textureMap[key].dispose();
                Manager.pool.pushTexture(this._textureMap[key]);
                this._textureMap[key] = null;
            }
            // this._texture.dispose();
            Manager.pool.pushTexture(this._texture);
            this._texture = null;
        }

        /**
         * 释放纹理
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public dispose():void
        {
            this.unuse();
        }

        public static create(bitmapData:egret.BitmapData,json:any):SpriteSheet
        {
            let result:SpriteSheet = Manager.pool.create(SpriteSheet);
            result.bitmapData = bitmapData;
            result.json = json;
            return result;
        }
    }
}