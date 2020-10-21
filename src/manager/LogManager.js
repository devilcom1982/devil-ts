var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/**
 * 日志管理器
 * @author devil
 * @version V20180925
 * @create 2018-09-25
 * @place guangzhou
 */
var devil;
(function (devil) {
    var LogManager = /** @class */ (function () {
        function LogManager() {
            /**
             * 过滤日志类型，默认任何一种日志类型都会输出
             */
            this.logType = 1 | 2 | 4;
        }
        LogManager.prototype.trace = function (logType) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            var len = params.length;
            if (DEBUG || true) {
                if (logType == devil.LogType.WARNING && ((this.logType & devil.LogType.WARNING) == devil.LogType.WARNING)) {
                    egret.warn.apply(egret, __spreadArrays(["【警告：】"], params));
                }
                else if (logType == devil.LogType.DEBUG && ((this.logType & devil.LogType.DEBUG) == devil.LogType.DEBUG)) {
                    egret.log.apply(egret, __spreadArrays(["【信息：】"], params));
                }
            }
            if (logType == devil.LogType.ERROR && ((this.logType & devil.LogType.ERROR) == devil.LogType.ERROR)) {
                egret.log.apply(egret, __spreadArrays(["【错误：】"], params));
            }
        };
        return LogManager;
    }());
    devil.LogManager = LogManager;
})(devil || (devil = {}));
