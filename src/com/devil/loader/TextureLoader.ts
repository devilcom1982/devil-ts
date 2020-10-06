namespace devil
{
    /**
     * 贴图加载器
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    export class TextureLoader extends BaseLoader
    {
        private _sheet:SpriteSheet;
        private _bitmapData:egret.BitmapData;
        private _json:any;

        public getTexture(name:string):egret.Texture
        {
            if(this._sheet)return this._sheet.getTexture(name);
            return null;
        }

        protected parse(data:any):void
        {
            if(data instanceof egret.BitmapData)this._bitmapData = data;
            else 
            {
                let json:any = JSON.parse(<string>data);
                if(json.frames != null)this._json = json.frames;
                else this._json = json;
            }
            if(this._json != null && this._bitmapData != null)
            {
                super.parse(data);
                this._sheet = SpriteSheet.create(this._bitmapData,this._json);
                this._bitmapData = null;
                this._json = null;
            }
        }

        protected reload(index:number):void
        {
            super.reload(index);
            this._path.reload(index);
            if(index == 0)
            {
                this.$load(egret.HttpResponseType.TEXT,0);
            }
            else 
            {
                this.$loadImage(this._path.urls[1]);
            }
        }

        /**
         * 加载
         */
        public load():void
        {
            super.load();
            this.$load(egret.HttpResponseType.TEXT,0);
            this.$loadImage(this._path.urls[1]);
        }

        public unuse():void
        {
            super.unuse();
            if(this._sheet)
            {
                this._sheet.dispose();
                this._sheet = null;
            }
            this._bitmapData = null;
            this._json = null;
        }

      public gc():boolean
        {
            if(this._count <= 0)
            {
                if(egret.getTimer() - this._unUseTimer >= ResourceGCType.getGCTime(this._resourceGCType))
                {
                    Manager.log.trace(devil.LogType.DEBUG,"资源释放",this._path.urls[0],this._path.urls[1]);
                    this.pool();
                    return true;
                }
                return false;
            }
            else 
            {
               if(AnimationLoader.abc)Manager.log.trace(devil.LogType.DEBUG,"资源未释放",this._path.urls[0],this._path.urls[1],this._count);
            }
            return false;
        }
    }
}