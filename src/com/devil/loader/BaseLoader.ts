namespace devil 
{
    /**
     * 加载器基类
     * @author  devil
     * @version V20190115
     * @create  2019-01-15
     * @place   guangzhou
     */
    export class BaseLoader implements ILoader
    {
        private _priority:number;
        private _callBacks:CallBackInfo[];
        private _errorCallBacks:CallBackInfo[];
        private _imgLoader:egret.ImageLoader;
        private _httpReqs:egret.HttpRequest[];
        private _dispatchLoadErrorEvent:boolean;//是否已发送过加载错误事件
        private _errorCount:number;//加载错误次数
        private _useTimer:number;//使用时间
        private _state:number;
        
        protected _unUseTimer:number;//不曾使用的时间，记录引用计数为0的时间
        protected _resourceGCType:number;
        protected _count:number;//引用数量
        
        protected _path:PathInfo;
        
        private static MAX_ERROR:number = 3;

        /**
         * 加载优化级
         */
        public getPriority():number
        {
            if(this._callBacks.length <= 1)return -1;
            return this._priority;
        }

        /**
         * 路径信息
         */
        public getPath():PathInfo
        {
            return this._path;
        }
        public getUseTimer():number
        {
            return this._useTimer;
        }
        /**
         * 加载状态，对应的LoaderState常量值
         */
        public getState():number
        {
            return this._state;
        }

        public constructor()
        {
            this._httpReqs = [];
            this._callBacks = [];
            this._errorCallBacks = [];
            this.start();
        }

        private start():void
        {
            this._state = LoaderState.WAITING;
            this._count = 0;
            this._dispatchLoadErrorEvent = false;
            this._errorCount = 0;
        }

        /**
         * 填加加载成功回调函数
         * @param complete
         * @param target 
         */
        public add(complete:Function,target:any,error?:Function,errorTarget?:any):void
        {
            this._useTimer = egret.getTimer();
            if(CallBackInfo.contains(this._callBacks,complete,target) == -1)this._callBacks.push(CallBackInfo.create(complete,target));
            if(error != null && CallBackInfo.contains(this._errorCallBacks,error,errorTarget) == -1)this._errorCallBacks.push(CallBackInfo.create(error,errorTarget));
        }

        /**
         * 删除加载成功回调函数
         * @param complete 
         * @param target 
         */
        public remove(complete:Function,target:any,error?:Function,errorTarget?:any):void
        {
            let index = CallBackInfo.contains(this._callBacks,complete,target);
            if(index >= 0)
            {
                this._callBacks[index].pool();
                this._callBacks.splice(index,1)
            }
            if(error != null)
            {
                index = CallBackInfo.contains(this._errorCallBacks,error,errorTarget);
                if(index >= 0)
                {
                    this._errorCallBacks[index].pool();
                    this._errorCallBacks.splice(index,1)
                }
            }
        }

        private unuseHttpReqs():void
        {
            let len:number = this._httpReqs.length;
            for(let i:number = len - 1 ; i >= 0; i --)
            {
                this.unuseHttpReq(this._httpReqs[i]);
            }
            this._httpReqs.length = 0;
        }

        private unuseHttpReq(target:egret.HttpRequest):void
        {
            target.removeEventListener(egret.Event.COMPLETE, this.___httpReqComplete, this);
            target.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.___httpReqErrorComplete, this);
            // target.abort();
            Manager.pool.pushHttpRequest(target);
            let index:number = this._httpReqs.indexOf(target);
            if(index != -1)this._httpReqs.splice(index,1);
        }

        private unuseImgLoader():void
        {
            if(this._imgLoader)
            {
                this._imgLoader.removeEventListener(egret.Event.COMPLETE, this.___imageLoaderComplete, this);
                this._imgLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.___imageLoaderErrorComplete, this);
                Manager.pool.pushImageLoader(this._imgLoader);
                this._imgLoader = null;
            }
        }

        protected parse(data:any):void
        {
            this._state = LoaderState.SUCESS;
        }

        private callBack():void
        {
            let len = this._callBacks.length;
            for(let i = 0 ; i < len; i ++)
            {
                this._callBacks[i].runCallBack(this);
            }
            this._count += len;
            for(let i = 0 ; i < len; i ++)
            {
                this._callBacks[i].pool();
            }
            this._callBacks.length = 0;

            for(let i = 0 ; i < this._errorCallBacks.length; i ++)
            {
                this._errorCallBacks[i].pool();
            }
            this._errorCallBacks.length = 0;
        }

        private errorCallBack():void
        {
            let len = this._errorCallBacks.length;
            for(let i = 0 ; i < len; i ++)
            {
                this._errorCallBacks[i].runCallBack(this);
            }
            for(let i = 0 ; i < this._errorCallBacks.length; i ++)
            {
                this._errorCallBacks[i].pool();
            }
            this._errorCallBacks.length = 0;
        }

        /**
         * 解析并缓存加载成功的数据
         */
        private $analyzeData(data:any):void 
        {
            if (!data)
            {
                this.error(0);
                return;
            }
            try
            {
                this.parse(data);
                if(this._state == LoaderState.SUCESS)this.callBack();
            }
            catch (e) 
            {
                egret.$warn(1017,this._path.urls, data);
            }
        }

        protected reload(index:number):void
        {
            this._state = LoaderState.LOADING;
        }

        private error(index:number):void
        {
            if(this._dispatchLoadErrorEvent)return;
            if(this._errorCount < BaseLoader.MAX_ERROR)
            {
                this._errorCount ++;
                this._state = LoaderState.WAITING;
                this.reload(index);
            }
            else
            {
                if(!this._dispatchLoadErrorEvent)
                {
                    this.errorCallBack();
                    this._dispatchLoadErrorEvent = true;
                }
                for(let i = 0 ; i < this._callBacks.length; i ++)
                {
                    this._callBacks[i].pool();
                }
                this._callBacks.length = 0;
                this.removeCount();
                this._state = LoaderState.FAIL;
                // this._resourceGCType = ResourceGCType.NOW;
                this._resourceGCType = ResourceGCType.ERROR;
                this._unUseTimer = egret.getTimer();
                Manager.loader.addFail(this._path.key);
                if(DEBUG)egret.error("【错误：】", "加载文件错误---" + this._path.urls);
            }
        }

        /**
         * 引用计数加1
         */
        public addCount():void
        {   
            this._count ++;
        }
        /**
         * 引用计数减1，如果计数小于0，则会重置使用时间，等待垃圾回收
         */
        public removeCount():void
        {
            this._count --;
            if(this._count <= 0)this._unUseTimer = egret.getTimer();
        }

        protected $load(responseType:string,index:number):void 
        {
            let httpReq = Manager.pool.createHttpRequest();
            httpReq.responseType = responseType;
            httpReq.addEventListener(egret.Event.COMPLETE, this.___httpReqComplete, this);
            httpReq.addEventListener(egret.IOErrorEvent.IO_ERROR, this.___httpReqErrorComplete, this);
            httpReq.open(this._path.urls[index]);
            httpReq.send();
            this._httpReqs.push(httpReq);
        }
        
        protected $loadImage(url:string):void
        {
            this._imgLoader = Manager.pool.createImageLoader();
            this._imgLoader.addEventListener(egret.Event.COMPLETE, this.___imageLoaderComplete, this);
            this._imgLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.___imageLoaderErrorComplete, this);
            this._imgLoader.load(url);
        }

        /**
         * 加载
         */
        public load():void
        {
            this._state = LoaderState.LOADING;
        }

        public pool():void
        {
            Manager.pool.push(this);
        }

        /**
         * 垃圾回收
         */
        public gc():boolean
        {
            if(this._count <= 0)
            {
                if(egret.getTimer() - this._unUseTimer >= ResourceGCType.getGCTime(this._resourceGCType))
                {
                // Manager.log.trace(LogType.DEBUG,"资源释放",this._path.url);
                    this.pool();
                    return true;
                }
                return false;
            }
            else 
            {
            //   Manager.log.trace(LogType.DEBUG,"资源释放",this._path.url,this._count);
            }
            return false;
        }

        public reuse():void
        {
            this.start();
        }

        public unuse():void
        {
            let len:number = this._callBacks.length;
            for(let i = 0 ; i < len; i ++)
            {
                this._callBacks[i].pool();
            }
            this._callBacks.length = 0;
            len = this._errorCallBacks.length;
            for(let i = 0 ; i < len; i ++)
            {
                this._errorCallBacks[i].pool();
            }
            this._errorCallBacks.length = 0;
            this._path = null;
            this.unuseHttpReqs();
            this.unuseImgLoader();
        }

        /**
         * 释放内存
         */
        public dispose():void
        {
            this.unuse();
            this._callBacks = null;
            this._errorCallBacks = null;
        }

        private ___httpReqComplete(event:egret.Event):void 
        {
            this.$analyzeData(event.currentTarget.response);
            this.unuseHttpReq(event.currentTarget);
        }

        private ___httpReqErrorComplete(e:egret.IOErrorEvent):void
        {
            this.unuseHttpReq(e.currentTarget);
            this.error(0);
        }

        private ___imageLoaderComplete(event:egret.Event):void 
        {
            this.$analyzeData(this._imgLoader.data);
            this.unuseImgLoader();
        }

        private ___imageLoaderErrorComplete(e:egret.IOErrorEvent):void
        {
            this.unuseImgLoader();
            this.error(1);
        }

        public static create(cls:{new():ILoader},path:PathInfo,priority:number,resourceGCType:number):ILoader
        {
            let result:BaseLoader = Manager.pool.create(cls) as BaseLoader;
            result._path = path;
            result._priority = priority;
            result._resourceGCType = resourceGCType;
            return result;
        }
    }
}