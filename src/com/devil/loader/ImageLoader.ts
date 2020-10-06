namespace devil
{
    /**
     * 图片加载器
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    export class ImageLoader extends BaseLoader
    {
        public texture:egret.Texture;

        protected parse(data:any):void
        {
            super.parse(data);
            let texture:egret.Texture = Manager.pool.createTexture();
            texture.bitmapData = data;
            this.texture = texture;
        }

        /**
         * 加载
         */
        public load():void
        {
            super.load();
            this.$loadImage(this._path.urls[0]);
        }

        protected reload(index:number):void
        {
            super.reload(index);
            this._path.reload(0);
            this.$loadImage(this._path.urls[0]);
        }

        public unuse():void
        {
            if(this.texture)
            {
                // this.texture.dispose();
                Manager.pool.pushTexture(this.texture);
                this.texture = null;
            }
            super.unuse();
        }

        // public gc():boolean
        // {
        //     if(this._count <= 0)
        //     {
        //         if(egret.getTimer() - this._unUseTimer >= ResourceGCType.getGCTime(this._resourceGCType))
        //         {
        //             Manager.log.trace(devil.LogType.DEBUG,"资源释放",this._path.urls[0]);
        //             this.pool();
        //             return true;
        //         }
        //         return false;
        //     }
        //     else 
        //     {
        //        if(AnimationLoader.abc)Manager.log.trace(devil.LogType.DEBUG,"资源未释放",this._path.urls,this._count);
        //     }
        //     return false;
        // }
    }
}





