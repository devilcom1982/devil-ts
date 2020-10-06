namespace devil
{
    /**
     * 动画加载器
     * @author devil
     * @version V20180811
     * @create V20180811
     * @place guangzhou
     */
    export class AnimationLoader extends BaseLoader
    {
        public sheet:AnimationData;
        private _bitmapData:egret.BitmapData;
        private _json:any;

        protected parse(data:any):void
        {
            if(data instanceof egret.BitmapData)this._bitmapData = data;
            else this._json = JSON.parse(<string>data);
            if(this._json != null && this._bitmapData != null)
            {
                super.parse(data);
                this.sheet = AnimationData.create(this._bitmapData,this._json);
                this._bitmapData = null;
                this._json = null;
            }
        }

        public unuse():void
        {
            super.unuse();
            if(this.sheet)
            {
                this.sheet.pool();
                this.sheet = null;
            }
            this._bitmapData = null;
            this._json = null;
        }

        /**
         * 加载
         */
        public load():void
        {
            super.load();
            // Manager.log.trace(devil.LogType.DEBUG,"加载路径",this._path.urls)
            this.$load(egret.HttpResponseType.TEXT,0);
            this.$loadImage(this._path.urls[1]);
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

        public static abc:boolean = false;    

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