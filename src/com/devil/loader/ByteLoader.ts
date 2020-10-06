namespace devil
{
    /**
     * 字节加载器
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    export class ByteLoader extends BaseLoader
    {
        public bytes:ArrayBuffer;

        public load():void
        {
            super.load();
            this.$load(egret.HttpResponseType.ARRAY_BUFFER,0);
        }

        protected reload(index:number):void
        {
            super.reload(index);
            this._path.reload(0);
            this.$load(egret.HttpResponseType.ARRAY_BUFFER,0);
        }

        protected parse(data:any):void
        {
            super.parse(data);
            this.bytes = data;
        }
        
        public unuse():void
        {
            this.bytes = null;
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
        //        if(AnimationLoader.abc)Manager.log.trace(devil.LogType.DEBUG,"资源未释放",this._path.urls[0],this._count);
        //     }
        //     return false;
        // }

    }
}