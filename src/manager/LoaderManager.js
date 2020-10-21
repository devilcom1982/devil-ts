var devil;
(function (devil) {
    /**
     * 加载管理器
     * @author devil
     * @version V20201008
     * @create V20180717
     * @place guangzhou
     * @update V20201008 guangzhou 加入Text请求Post方式
     */
    var LoaderManager = /** @class */ (function () {
        function LoaderManager() {
            this._loadersCanGC = {}; //非常驻内存
            this._loadersCannotGC = {}; //长驻内存
            this._loadersFail = {}; //加载失败
            /**
             * 微信小游戏不需要版本号，默认值为true
             */
            this.needVersion = true;
            /**
             * 资源的根路径
             */
            this.resourceUrl = "";
            this._queues = [];
            this._needSort = false;
            this._loadingThread = 0;
            this._maxThread = 4;
            egret.ImageLoader.crossOrigin = "anonymous";
            devil.Manager.render.add(this.render, this, 100);
        }
        LoaderManager.prototype.setup = function (resourceUrl, needVersion) {
            if (resourceUrl === void 0) { resourceUrl = ""; }
            if (needVersion === void 0) { needVersion = true; }
            this.resourceUrl = resourceUrl;
            this.needVersion = needVersion;
        };
        /**
         * 对相对路径进行root+计算,也就是将相对路径转换成绝对路径.
         */
        LoaderManager.prototype.rootToURL = function (url) {
            if (url.indexOf(this.resourceUrl) > -1)
                return url;
            return this.resourceUrl + url;
        };
        /**
          * 加载
          * @param path              路径
          * @param complete          加载完成回调函数
          * @param target            回调函数的主体
          * @param resourceGCType    资源回收类型，对应ResourceGCType常量，默认值为ResourceGCType.NOW
          * @param priority          加载顺序等级，越大越高,对应ResPriorityType常量,默认值为ResPriorityType.LOAD_LEVEL1
          */
        LoaderManager.prototype.load = function (path, complete, target, resourceGCType, priority, error, errorTarget) {
            if (this._loadersFail[path.key])
                return null;
            // console.log("LoaderManager.load",path.key);
            if (resourceGCType == null)
                resourceGCType = devil.ResourceGCType.NOW;
            if (priority == null)
                priority = devil.ResPriorityType.LOAD_LEVEL1;
            var loader = this._loadersCannotGC[path.key];
            if (loader == null)
                loader = this._loadersCanGC[path.key];
            if (loader == null) //开始加载
             {
                loader = this.getLoader(path, priority, resourceGCType);
                loader.add(this.complete, this, this.error2, this);
                if (resourceGCType != devil.ResourceGCType.NEVER)
                    this._loadersCanGC[path.key] = loader;
                else
                    this._loadersCannotGC[path.key] = loader;
                this._queues.push(loader);
                this._needSort = true;
            }
            if (loader.getState() == devil.LoaderState.SUCESS) {
                loader.addCount(); //引用加1;
                if (complete != null)
                    complete.call(target, loader);
            }
            else if (loader.getState() == devil.LoaderState.FAIL) {
            }
            else {
                if (complete != null)
                    loader.add(complete, target, error, errorTarget);
            }
            return loader;
        };
        /**
         * 是否正在加载或加载完成
         * @param path
         */
        LoaderManager.prototype.has = function (path) {
            return (!!this._loadersCanGC[path.key] || !!this._loadersCannotGC[path.key]);
        };
        LoaderManager.prototype.getLoader = function (path, priority, resourceGCType) {
            var cls;
            switch (path.loaderType) {
                case devil.LoaderType.TEXT:
                    cls = devil.TextLoader;
                    break;
                case devil.LoaderType.TEXTURE:
                    cls = devil.TextureLoader;
                    break;
                case devil.LoaderType.BIN:
                    cls = devil.ByteLoader;
                    break;
                case devil.LoaderType.IMAGE:
                    cls = devil.ImageLoader;
                    break;
                case devil.LoaderType.MAP_DATA:
                    cls = devil.MapLoader;
                    break;
                case devil.LoaderType.ANI:
                    cls = devil.AnimationLoader;
                    break;
                case devil.LoaderType.DRAGON:
                    cls = devil.DragonLoader;
                    break;
                case devil.LoaderType.MOVIE_CLIP:
                    cls = devil.MovieClipLoader;
                    break;
            }
            if (cls != null)
                return devil.BaseLoader.create(cls, path, priority, resourceGCType);
            return null;
        };
        LoaderManager.prototype.complete = function (loader) {
            loader.removeCount();
            this._loadingThread--;
            if (this._loadingThread < 0)
                this._loadingThread = 0;
        };
        LoaderManager.prototype.render = function (interval) {
            var that = this;
            if (that._queues.length > 0)
                that.next();
            // console.log("*****************************************************************************");
            for (var key in that._loadersCanGC) {
                var loader = that._loadersCanGC[key];
                if (((loader.getState() == devil.LoaderState.SUCESS) || (loader.getState() == devil.LoaderState.FAIL)) && loader.gc()) {
                    delete that._loadersCanGC[key];
                }
            }
        };
        LoaderManager.prototype.next = function () {
            if (this._needSort) {
                this._needSort = false;
                this._queues.sort(this.sortQueues);
            }
            while (this._loadingThread < this._maxThread) {
                if (this._queues.length > 0) {
                    var loader = this._queues.shift();
                    loader.load();
                    this._loadingThread++;
                }
                else
                    break;
            }
        };
        LoaderManager.prototype.error2 = function (loader) {
            this._loadingThread--;
            if (this._loadingThread < 0)
                this._loadingThread = 0;
        };
        LoaderManager.prototype.sortQueues = function (value1, value2) {
            if (value1.getPriority() > value2.getPriority()) {
                return -1;
            }
            else if (value1.getPriority() < value2.getPriority()) {
                return 1;
            }
            else {
                if (value1.getUseTimer() > value2.getUseTimer())
                    return -1;
                else if (value1.getUseTimer() < value2.getUseTimer())
                    return 1;
            }
            return 0;
        };
        /**
         * 取消加载的回调
         * @param path              路径
         * @param complete          加载完成回调函数
         * @param target            回调函数的主体
         */
        LoaderManager.prototype.remove = function (path, complete, target, error, errorTarget) {
            var loader = this._loadersCanGC[path.key];
            if (loader == null)
                loader = this._loadersCannotGC[path.key];
            if (loader != null) {
                if (loader.getState() == devil.LoaderState.SUCESS)
                    loader.removeCount();
                else if (loader.getState() == devil.LoaderState.FAIL) { }
                else {
                    loader.remove(complete, target, error, errorTarget);
                }
            }
        };
        /**
         * 批处理加载
         * @param paths
         * @param resourceGCType
         * @param priority
         * @param complete
         * @param target
         */
        LoaderManager.prototype.loadBatch = function (paths, resourceGCType, priority, complete, target, oneComplete, oneTarget, oneError, errorTarget) {
            devil.BatchLoader.create(paths, resourceGCType, priority, complete, target, oneComplete, oneTarget, oneError, errorTarget);
        };
        /**添加到加载失败列表 */
        LoaderManager.prototype.addFail = function (key) {
            // if(this._loadersFail[key]) return;
            this._loadersFail[key] = true;
        };
        return LoaderManager;
    }());
    devil.LoaderManager = LoaderManager;
})(devil || (devil = {}));
