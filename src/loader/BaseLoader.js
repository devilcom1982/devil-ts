var devil;
(function (devil) {
    /**
     * 加载器基类
     * @author  devil
     * @version V20190115
     * @create  2019-01-15
     * @place   guangzhou
     */
    var BaseLoader = /** @class */ (function () {
        function BaseLoader() {
            this._httpReqs = [];
            this._callBacks = [];
            this._errorCallBacks = [];
            this.start();
        }
        /**
         * 加载优化级
         */
        BaseLoader.prototype.getPriority = function () {
            if (this._callBacks.length <= 1)
                return -1;
            return this._priority;
        };
        /**
         * 路径信息
         */
        BaseLoader.prototype.getPath = function () {
            return this._path;
        };
        BaseLoader.prototype.getUseTimer = function () {
            return this._useTimer;
        };
        /**
         * 加载状态，对应的LoaderState常量值
         */
        BaseLoader.prototype.getState = function () {
            return this._state;
        };
        BaseLoader.prototype.start = function () {
            this._state = devil.LoaderState.WAITING;
            this._count = 0;
            this._dispatchLoadErrorEvent = false;
            this._errorCount = 0;
        };
        /**
         * 填加加载成功回调函数
         * @param complete
         * @param target
         */
        BaseLoader.prototype.add = function (complete, target, error, errorTarget) {
            this._useTimer = egret.getTimer();
            if (devil.CallBackInfo.contains(this._callBacks, complete, target) == -1)
                this._callBacks.push(devil.CallBackInfo.create(complete, target));
            if (error != null && devil.CallBackInfo.contains(this._errorCallBacks, error, errorTarget) == -1)
                this._errorCallBacks.push(devil.CallBackInfo.create(error, errorTarget));
        };
        /**
         * 删除加载成功回调函数
         * @param complete
         * @param target
         */
        BaseLoader.prototype.remove = function (complete, target, error, errorTarget) {
            var index = devil.CallBackInfo.contains(this._callBacks, complete, target);
            if (index >= 0) {
                this._callBacks[index].pool();
                this._callBacks.splice(index, 1);
            }
            if (error != null) {
                index = devil.CallBackInfo.contains(this._errorCallBacks, error, errorTarget);
                if (index >= 0) {
                    this._errorCallBacks[index].pool();
                    this._errorCallBacks.splice(index, 1);
                }
            }
        };
        BaseLoader.prototype.unuseHttpReqs = function () {
            var len = this._httpReqs.length;
            for (var i = len - 1; i >= 0; i--) {
                this.unuseHttpReq(this._httpReqs[i]);
            }
            this._httpReqs.length = 0;
        };
        BaseLoader.prototype.unuseHttpReq = function (target) {
            target.removeEventListener(egret.Event.COMPLETE, this.___httpReqComplete, this);
            target.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.___httpReqErrorComplete, this);
            // target.abort();
            devil.Manager.pool.pushHttpRequest(target);
            var index = this._httpReqs.indexOf(target);
            if (index != -1)
                this._httpReqs.splice(index, 1);
        };
        BaseLoader.prototype.unuseImgLoader = function () {
            if (this._imgLoader) {
                this._imgLoader.removeEventListener(egret.Event.COMPLETE, this.___imageLoaderComplete, this);
                this._imgLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.___imageLoaderErrorComplete, this);
                devil.Manager.pool.pushImageLoader(this._imgLoader);
                this._imgLoader = null;
            }
        };
        BaseLoader.prototype.parse = function (data) {
            this._state = devil.LoaderState.SUCESS;
        };
        BaseLoader.prototype.callBack = function () {
            var len = this._callBacks.length;
            for (var i = 0; i < len; i++) {
                this._callBacks[i].runCallBack(this);
            }
            this._count += len;
            for (var i = 0; i < len; i++) {
                this._callBacks[i].pool();
            }
            this._callBacks.length = 0;
            for (var i = 0; i < this._errorCallBacks.length; i++) {
                this._errorCallBacks[i].pool();
            }
            this._errorCallBacks.length = 0;
        };
        BaseLoader.prototype.errorCallBack = function () {
            var len = this._errorCallBacks.length;
            for (var i = 0; i < len; i++) {
                this._errorCallBacks[i].runCallBack(this);
            }
            for (var i = 0; i < this._errorCallBacks.length; i++) {
                this._errorCallBacks[i].pool();
            }
            this._errorCallBacks.length = 0;
        };
        /**
         * 解析并缓存加载成功的数据
         */
        BaseLoader.prototype.$analyzeData = function (data) {
            if (!data) {
                this.error(0);
                return;
            }
            try {
                this.parse(data);
                if (this._state == devil.LoaderState.SUCESS)
                    this.callBack();
            }
            catch (e) {
                egret.$warn(1017, this._path.urls, data);
            }
        };
        BaseLoader.prototype.reload = function (index) {
            this._state = devil.LoaderState.LOADING;
        };
        BaseLoader.prototype.error = function (index) {
            if (this._dispatchLoadErrorEvent)
                return;
            if (this._errorCount < BaseLoader.MAX_ERROR) {
                this._errorCount++;
                this._state = devil.LoaderState.WAITING;
                this.reload(index);
            }
            else {
                if (!this._dispatchLoadErrorEvent) {
                    this.errorCallBack();
                    this._dispatchLoadErrorEvent = true;
                }
                for (var i = 0; i < this._callBacks.length; i++) {
                    this._callBacks[i].pool();
                }
                this._callBacks.length = 0;
                this.removeCount();
                this._state = devil.LoaderState.FAIL;
                // this._resourceGCType = ResourceGCType.NOW;
                this._resourceGCType = devil.ResourceGCType.ERROR;
                this._unUseTimer = egret.getTimer();
                devil.Manager.loader.addFail(this._path.key);
                if (DEBUG)
                    egret.error("【错误：】", "加载文件错误---" + this._path.urls);
            }
        };
        /**
         * 引用计数加1
         */
        BaseLoader.prototype.addCount = function () {
            this._count++;
        };
        /**
         * 引用计数减1，如果计数小于0，则会重置使用时间，等待垃圾回收
         */
        BaseLoader.prototype.removeCount = function () {
            this._count--;
            if (this._count <= 0)
                this._unUseTimer = egret.getTimer();
        };
        BaseLoader.prototype.$load = function (responseType, index) {
            var httpReq = devil.Manager.pool.createHttpRequest();
            httpReq.responseType = responseType;
            httpReq.addEventListener(egret.Event.COMPLETE, this.___httpReqComplete, this);
            httpReq.addEventListener(egret.IOErrorEvent.IO_ERROR, this.___httpReqErrorComplete, this);
            // httpReq.open(this._path.urls[index]);
            // httpReq.send();
            this.$request(httpReq, index);
            this._httpReqs.push(httpReq);
        };
        BaseLoader.prototype.$request = function (httpReq, index) {
            httpReq.open(this._path.urls[index]);
            httpReq.send();
        };
        BaseLoader.prototype.$loadImage = function (url) {
            this._imgLoader = devil.Manager.pool.createImageLoader();
            this._imgLoader.addEventListener(egret.Event.COMPLETE, this.___imageLoaderComplete, this);
            this._imgLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.___imageLoaderErrorComplete, this);
            this._imgLoader.load(url);
        };
        /**
         * 加载
         */
        BaseLoader.prototype.load = function () {
            this._state = devil.LoaderState.LOADING;
        };
        BaseLoader.prototype.pool = function () {
            devil.Manager.pool.push(this);
        };
        /**
         * 垃圾回收
         */
        BaseLoader.prototype.gc = function () {
            if (this._count <= 0) {
                if (egret.getTimer() - this._unUseTimer >= devil.ResourceGCType.getGCTime(this._resourceGCType)) {
                    // Manager.log.trace(LogType.DEBUG,"资源释放",this._path.url);
                    this.pool();
                    return true;
                }
                return false;
            }
            else {
                //   Manager.log.trace(LogType.DEBUG,"资源释放",this._path.url,this._count);
            }
            return false;
        };
        BaseLoader.prototype.reuse = function () {
            this.start();
        };
        BaseLoader.prototype.unuse = function () {
            var len = this._callBacks.length;
            for (var i = 0; i < len; i++) {
                this._callBacks[i].pool();
            }
            this._callBacks.length = 0;
            len = this._errorCallBacks.length;
            for (var i = 0; i < len; i++) {
                this._errorCallBacks[i].pool();
            }
            this._errorCallBacks.length = 0;
            this._path = null;
            this.unuseHttpReqs();
            this.unuseImgLoader();
        };
        /**
         * 释放内存
         */
        BaseLoader.prototype.dispose = function () {
            this.unuse();
            this._callBacks = null;
            this._errorCallBacks = null;
        };
        BaseLoader.prototype.___httpReqComplete = function (event) {
            this.$analyzeData(event.currentTarget.response);
            this.unuseHttpReq(event.currentTarget);
        };
        BaseLoader.prototype.___httpReqErrorComplete = function (e) {
            this.unuseHttpReq(e.currentTarget);
            this.error(0);
        };
        BaseLoader.prototype.___imageLoaderComplete = function (event) {
            this.$analyzeData(this._imgLoader.data);
            this.unuseImgLoader();
        };
        BaseLoader.prototype.___imageLoaderErrorComplete = function (e) {
            this.unuseImgLoader();
            this.error(1);
        };
        BaseLoader.create = function (cls, path, priority, resourceGCType) {
            var result = devil.Manager.pool.create(cls);
            result._path = path;
            result._priority = priority;
            result._resourceGCType = resourceGCType;
            return result;
        };
        BaseLoader.MAX_ERROR = 3;
        return BaseLoader;
    }());
    devil.BaseLoader = BaseLoader;
})(devil || (devil = {}));
