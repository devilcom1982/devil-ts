var devil;
(function (devil) {
    /**
     * 回调函数信息类
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    var CallBackInfo = /** @class */ (function () {
        function CallBackInfo() {
        }
        Object.defineProperty(CallBackInfo.prototype, "target", {
            get: function () {
                return this._target;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CallBackInfo.prototype, "callBack", {
            get: function () {
                return this._callBack;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 执行回调函数
         */
        CallBackInfo.prototype.runCallBack = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (args.length > 0)
                this._args = args;
            if (this._args == null || this._args.length == 0)
                this._callBack.call(this._target);
            else {
                this._callBack.apply(this._target, this._args);
            }
        };
        CallBackInfo.prototype.equals = function (callBack, target) {
            return this._callBack == callBack && this._target == target;
        };
        CallBackInfo.prototype.pool = function () {
            devil.Manager.pool.push(this);
        };
        CallBackInfo.prototype.reuse = function () {
        };
        CallBackInfo.prototype.unuse = function () {
            this._callBack = null;
            this._target = null;
            this._args = null;
        };
        CallBackInfo.prototype.dispose = function () {
            this.unuse();
        };
        CallBackInfo.create = function (callBack, target) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var result = devil.Manager.pool.create(CallBackInfo);
            result._callBack = callBack;
            result._target = target;
            result._args = args;
            return result;
        };
        /**
         * 指定的回调函数数组中是否有指定的回调函数，如果存在，则返回对应的索引值，否则返回-1
         * @param callBacks 回调函数数组
         * @param callBack  回调函数
         * @param target    回调函数对象
         */
        CallBackInfo.contains = function (callBacks, callBack, target) {
            var len = callBacks.length;
            for (var i = 0; i < len; i++) {
                if (callBacks[i]._callBack == callBack && callBacks[i]._target == target)
                    return i;
            }
            return -1;
        };
        return CallBackInfo;
    }());
    devil.CallBackInfo = CallBackInfo;
})(devil || (devil = {}));
