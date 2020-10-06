namespace devil
{
    /**
     * 加载管理器
     * @author devil
     * @version V20180807
     * @create V20180717
     * @place guangzhou
     * @description 整理
     */
    export class LoaderManager
    {
        private _queues:Array<ILoader>;//队列池
        private _needSort:boolean;//是否需要排队
        private _loadingThread:number;//正在加载的线程
        private _maxThread:number;//加载最大线程
        private _loadersCanGC = {};//非常驻内存
        private _loadersCannotGC={};//长驻内存
        private _loadersFail = {};//加载失败
        /**
         * 微信小游戏不需要版本号，默认值为true
         */
        public needVersion:boolean = true;

        /**
         * 资源的根路径
         */
        public resourceUrl:string = "";

        public constructor()
        {
            this._queues = [];
            this._needSort = false;
            this._loadingThread = 0;
            this._maxThread = 4;
            egret.ImageLoader.crossOrigin = "anonymous";
            Manager.render.add(this.render,this,100);
        }

        public setup(resourceUrl:string = "",needVersion:boolean = true):void
        {
            this.resourceUrl = resourceUrl;
            this.needVersion = needVersion;
        }
        
        /**
         * 对相对路径进行root+计算,也就是将相对路径转换成绝对路径. 
         */		
        public rootToURL(url:string):string
        {
            if (url.indexOf(this.resourceUrl) > -1)return url;
            return this.resourceUrl + url;
        }

       /**
         * 加载
         * @param path              路径
         * @param complete          加载完成回调函数
         * @param target            回调函数的主体
         * @param resourceGCType    资源回收类型，对应ResourceGCType常量，默认值为ResourceGCType.NOW
         * @param priority          加载顺序等级，越大越高,对应ResPriorityType常量,默认值为ResPriorityType.LOAD_LEVEL1
         */
        public load(path:PathInfo,complete:Function,target:any,resourceGCType?:number,priority?:number,error?:Function,errorTarget?:any):void
        {
            if(this._loadersFail[path.key]) return;
            // console.log("LoaderManager.load",path.key);
            if(resourceGCType == null)resourceGCType = ResourceGCType.NOW;
            if(priority == null)priority = ResPriorityType.LOAD_LEVEL1;
            let loader:ILoader = this._loadersCannotGC[path.key];
            if(loader == null)loader = this._loadersCanGC[path.key];
            if(loader == null)//开始加载
            {
                loader = this.getLoader(path,priority,resourceGCType);
                loader.add(this.complete,this,this.error2,this);
                if(resourceGCType != ResourceGCType.NEVER)this._loadersCanGC[path.key] = loader;
                else this._loadersCannotGC[path.key] = loader;
                this._queues.push(loader);
                this._needSort = true;
            }
            if(loader.getState() == LoaderState.SUCESS)
            {
                loader.addCount();//引用加1;
                if(complete != null)complete.call(target,loader);
            }
            else if(loader.getState() == LoaderState.FAIL)
            {

            }
            else
            {
                if(complete != null)loader.add(complete,target,error,errorTarget);
            }
        }

        /**
         * 是否正在加载或加载完成
         * @param path 
         */
        public has(path:PathInfo):boolean
        {
            return (!!this._loadersCanGC[path.key] || !!this._loadersCannotGC[path.key]);
        }

        private getLoader(path:PathInfo,priority:number,resourceGCType:number):ILoader
        {
            let cls:any;
            switch(path.loaderType)
            {
                case LoaderType.TEXT:
                    cls = TextLoader;
                    break;
                case LoaderType.TEXTURE:
                    cls = TextureLoader;
                    break;
                case LoaderType.BIN:
                    cls = ByteLoader;
                    break;
                case LoaderType.IMAGE:
                    cls = ImageLoader;
                    break;
                case LoaderType.MAP_DATA:
                    cls = MapLoader;
                    break;
                case LoaderType.ANI:
                    cls = AnimationLoader;
                    break;
                case LoaderType.DRAGON:
                    cls = DragonLoader;
                    break;
                case LoaderType.MOVIE_CLIP:
                    cls = MovieClipLoader;
                    break;
            }
            if(cls != null)return BaseLoader.create(cls,path,priority,resourceGCType);
            return null;
        }

        private complete(loader:ILoader):void
        {
            loader.removeCount();
            this._loadingThread --;
            if(this._loadingThread < 0) this._loadingThread = 0;
        }

        private render(interval:number):void
        {
            let that = this;
            if(that._queues.length > 0) that.next();
            // console.log("*****************************************************************************");
            for(let key in that._loadersCanGC)
            {
                let loader:ILoader = that._loadersCanGC[key];
                if(((loader.getState() == LoaderState.SUCESS)||(loader.getState() == LoaderState.FAIL)) &&loader.gc())
                {
                    delete that._loadersCanGC[key];
                }
            }
        }

        private next():void
        {
            if(this._needSort)
            {
                this._needSort = false;
                this._queues.sort(this.sortQueues);
            }
            while(this._loadingThread < this._maxThread)
            {
                if(this._queues.length > 0)
                {
                    let loader = this._queues.shift();
                    loader.load();
                    this._loadingThread ++;
                }
                else break;
            }
        }

        private error2(loader:ILoader):void
        {
            this._loadingThread --;
            if(this._loadingThread < 0) this._loadingThread = 0;
        }

        private sortQueues(value1:ILoader, value2:ILoader):number
        {
            if(value1.getPriority() > value2.getPriority()) 
            {
                return -1;
            }
            else if(value1.getPriority() < value2.getPriority()) 
            {
                return 1;
            }
            else 
            {
                if(value1.getUseTimer() > value2.getUseTimer())return -1;
                else if(value1.getUseTimer() < value2.getUseTimer())return 1;
            }
            return 0;
        }

        /**
         * 取消加载的回调 
         * @param path              路径
         * @param complete          加载完成回调函数
         * @param target            回调函数的主体
         */
        public remove(path:PathInfo,complete:Function,target:any,error?:Function,errorTarget?:any):void
        {
            let loader:ILoader = this._loadersCanGC[path.key];
            if(loader == null)loader = this._loadersCannotGC[path.key];
            if(loader != null)
            {
                if(loader.getState() == LoaderState.SUCESS)loader.removeCount();
                else if(loader.getState() == LoaderState.FAIL){}
                else 
                {
                    loader.remove(complete,target,error,errorTarget);
                }
            }
        }

        /**
         * 批处理加载
         * @param paths 
         * @param resourceGCType 
         * @param priority 
         * @param complete 
         * @param target 
         */
        public loadBatch(paths:PathInfo[],resourceGCType?:number,priority?:number,complete?:Function,target?:any,oneComplete?:Function,oneTarget?:any,oneError?:Function,errorTarget?:any):void
        {
            BatchLoader.create(paths,resourceGCType,priority,complete,target,oneComplete,oneTarget,oneError,errorTarget);
        }

        /**添加到加载失败列表 */
        public addFail(key:string):void
        {
            // if(this._loadersFail[key]) return;
            this._loadersFail[key] = true;
        }
    }
}