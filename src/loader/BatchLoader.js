var devil;
(function (devil) {
    /**
     * 批处理加载器
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    var BatchLoader = /** @class */ (function () {
        function BatchLoader() {
            this._current = 0;
        }
        BatchLoader.prototype.reuse = function () {
            this._current = 0;
        };
        BatchLoader.prototype.oneComplete = function (loader) {
            if (this._total <= this._current) {
                if (this._callBack)
                    this._callBack.runCallBack();
                devil.Manager.pool.push(this);
            }
        };
        BatchLoader.prototype.unuse = function () {
            var len = this._paths.length;
            for (var i = 0; i < len; i++) {
                devil.Manager.loader.remove(this._paths[i], this.__oneComplete, this, this.__error, this);
            }
            this._paths = null;
            if (this._callBack)
                this._callBack.pool();
            this._callBack = null;
            this._oneComplete = null;
            this._oneTarget = null;
            this._oneError = null;
            this._errorTarget = null;
        };
        /**
         * 释放内存
         */
        BatchLoader.prototype.dispose = function () {
            this.unuse();
        };
        BatchLoader.prototype.__error = function (loader) {
            this._current++;
            if (this._oneError)
                this._oneError.apply(this._errorTarget, null);
            this.oneComplete(loader);
        };
        BatchLoader.prototype.__oneComplete = function (loader) {
            this._current++;
            if (this._oneComplete)
                this._oneComplete.apply(this._oneTarget, null);
            this.oneComplete(loader);
        };
        BatchLoader.create = function (paths, resourceGCType, priority, complete, target, oneComplete, oneTarget, oneError, errorTarget) {
            var loader = devil.Manager.pool.create(BatchLoader);
            loader._paths = paths;
            if (complete != null)
                loader._callBack = devil.CallBackInfo.create(complete, target);
            loader._oneComplete = oneComplete;
            loader._oneTarget = oneTarget;
            loader._oneError = oneError;
            loader._errorTarget = errorTarget;
            loader._total = paths.length;
            var len = paths.length;
            for (var i = 0; i < len; i++) {
                devil.Manager.loader.load(paths[i], loader.__oneComplete, loader, resourceGCType, priority, loader.__error, loader);
            }
            return loader;
        };
        return BatchLoader;
    }());
    devil.BatchLoader = BatchLoader;
})(devil || (devil = {}));
