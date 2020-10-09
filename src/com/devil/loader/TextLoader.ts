namespace devil
{
    /**
     * 文本加载器
     * @author devil
     * @version V20180811
     * @create 2018-08-11
     * @place guangzhou
     */
    export class TextLoader extends BaseLoader
    {
        public text:string;
        private _isPost:boolean;
        private _params:any;

        /**
         * 使用Post加载方式
         * @param params 
         */
        public post(params:any):void
        {
            this._isPost = true;
            this._params = params;
        }

        /**
         * 加载
         */
        public load():void
        {
            super.load();
            this.$load(egret.HttpResponseType.TEXT,0);
        }

        protected reload(index:number):void
        {
            super.reload(index);
            this._path.reload(0);
            this.$load(egret.HttpResponseType.TEXT,0);
        }

        protected $request(httpReq:egret.HttpRequest,index:number):void
        {
            if(!this._isPost)super.$request(httpReq,index);
            else 
            {
                httpReq.open(this._path.urls[index],egret.HttpMethod.POST);
                httpReq.send(this._params);
            }
        }

        
        protected parse(data:any):void
        {
            super.parse(data);
            this.text = data;
        }
        public unuse():void
        {
            this.text = null;
            this._isPost = false;
            this._params = null;
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