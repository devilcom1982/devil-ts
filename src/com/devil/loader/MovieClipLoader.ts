namespace devil
{
    /**
     * MC帧动画数据加载器
     * @author  devil
     * @version V20190909
     * @create  2019-09-09
     * @place   guangzhou
     */
    export class MovieClipLoader extends BaseLoader implements IPool
    {
        // public bytes:any;  //龙骨动画数据
        public texture:egret.Texture;
        public json:any;
        public data:egret.MovieClipDataFactory;

        protected parse(data:any):void
        {
            if(data instanceof egret.BitmapData)
            {
                this.texture = Manager.pool.createTexture();
                this.texture.bitmapData = data;
            }
            // else if(data instanceof ArrayBuffer)this.bytes = data;
            else this.json = JSON.parse(<string>data);
            if(this.json != null && this.texture != null)// && this.bytes != null)
            {
                this.data = new egret.MovieClipDataFactory(this.json,this.texture);
                super.parse(data);
            }
        }

        protected reload(index:number):void
        {
            super.reload(index);
            this._path.reload(index);
            if(index == 0)
            {
                // this.$load(egret.HttpResponseType.ARRAY_BUFFER,0);
                this.$load(egret.HttpResponseType.TEXT,1);
            }
            else if(index == 1)
            {
                this.$loadImage(this._path.urls[1]);
            }
            // else if(index == 2)
            // {
            // }
        }

        /**
         * 加载
         */
        public load():void
        {
            super.load();
            // this.$load(egret.HttpResponseType.ARRAY_BUFFER,0);
            this.$load(egret.HttpResponseType.TEXT,0);
            this.$loadImage(this._path.urls[1]);
        }

        public unuse():void
        {
            // this.bytes = null;
            if(this.texture != null)
            {
                Manager.pool.pushTexture(this.texture);
                this.texture = null;
            }
            this.json = null;
            this.data.clearCache();
            this.data = null;
            super.unuse();
        }

        // public gc():boolean
        // {
        //     if(this._count <= 0)
        //     {
        //         if(egret.getTimer() - this._unUseTimer >= ResourceGCType.getGCTime(this._resourceGCType))
        //         {
        //             Manager.log.trace(devil.LogType.DEBUG,"资源释放",this._path.urls[0],this._path.urls[1]);
        //             this.pool();
        //             return true;
        //         }
        //         return false;
        //     }
        //     else 
        //     {
        //        if(AnimationLoader.abc)Manager.log.trace(devil.LogType.DEBUG,"资源未释放",this._path.urls[0],this._path.urls[1],this._count);
        //     }
        //     return false;
        // }
    }
}