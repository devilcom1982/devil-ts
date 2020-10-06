namespace devil
{
    /**
     * 龙骨动画加载器
     * @author  devil
     * @version V20190115
     * @create  2019-01-15
     * @place   guangzhou
     */
    export class DragonLoader extends BaseLoader implements IPool
    {
        public bytes:any;  //龙骨动画数据
        public texture:egret.Texture;
        public json:any;

        protected parse(data:any):void
        {
            if(data instanceof egret.BitmapData)
            {
                this.texture = Manager.pool.createTexture();
                this.texture.bitmapData = data;
            }
            else if(data instanceof ArrayBuffer)this.bytes = data;
            else this.json = JSON.parse(<string>data);
            if(this.json != null && this.texture != null && this.bytes != null)
            {
                super.parse(data);
            }
        }

        protected reload(index:number):void
        {
            super.reload(index);
            this._path.reload(index);
            if(index == 0)
            {
                this.$load(egret.HttpResponseType.ARRAY_BUFFER,0);
            }
            else if(index == 1)
            {
                this.$load(egret.HttpResponseType.TEXT,1);
            }
            else if(index == 2)
            {
                this.$loadImage(this._path.urls[2]);
            }
        }

        /**
         * 加载
         */
        public load():void
        {
            super.load();
            this.$load(egret.HttpResponseType.ARRAY_BUFFER,0);
            this.$load(egret.HttpResponseType.TEXT,1);
            this.$loadImage(this._path.urls[2]);
        }

        public unuse():void
        {
            this.bytes = null;
            if(this.texture != null)
            {
                Manager.pool.pushTexture(this.texture);
                this.texture = null;
            }
            this.json = null;
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