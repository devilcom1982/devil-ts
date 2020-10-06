namespace devil
{
    /**
     * 批处理加载器
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    export class BatchLoader implements IPool
    {
        private _callBack:CallBackInfo;
        private _oneComplete:Function;
        private _oneTarget:any;
        private _oneError:Function;
        private _errorTarget:any;
        private _current:number;
        private _total:number;
        private _paths:PathInfo[];
        
        public constructor()
        {
            this._current = 0;
        }

        public reuse():void
        {
            this._current = 0;
        }

        private oneComplete(loader:ILoader):void
        {
            if(this._total <= this._current)
            {
                if(this._callBack)this._callBack.runCallBack();
                Manager.pool.push(this);
            }
        }

        public unuse():void
        {
            let len:number = this._paths.length;
            for(let i:number = 0 ; i < len; i ++)
            {
                Manager.loader.remove(this._paths[i],this.__oneComplete,this,this.__error,this);
            }
            this._paths = null;
            if(this._callBack)this._callBack.pool();
            this._callBack = null;
            this._oneComplete = null;
            this._oneTarget = null;
            this._oneError = null;
            this._errorTarget = null;
        }

        /**
         * 释放内存
         */
        public dispose():void
        {
            this.unuse();
        }

        private __error(loader:ILoader):void
        {
            this._current ++;
            if(this._oneError)this._oneError.apply(this._errorTarget,null);
            this.oneComplete(loader);
        }

        private __oneComplete(loader:ILoader):void
        {
            this._current ++;
            if(this._oneComplete)this._oneComplete.apply(this._oneTarget,null);
            this.oneComplete(loader);
        }

        public static create(paths:PathInfo[],resourceGCType?:number,priority?:number,complete?:Function,target?:any,oneComplete?:Function,oneTarget?:any,oneError?:Function,errorTarget?:any):BatchLoader
        {
            let loader:BatchLoader = Manager.pool.create(BatchLoader);
            loader._paths = paths;
            if(complete != null)loader._callBack = CallBackInfo.create(complete,target);
            loader._oneComplete = oneComplete;
            loader._oneTarget = oneTarget;
            loader._oneError = oneError;
            loader._errorTarget = errorTarget;
            loader._total = paths.length;
            let len:number = paths.length;
            for(let i:number = 0; i < len; i ++)
            {
                Manager.loader.load(paths[i],loader.__oneComplete,loader,resourceGCType,priority,loader.__error,loader);
            }
            return loader;
        }
    }
}