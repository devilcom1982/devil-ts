/**
 * 日志类型
 * @author devil
 * @version V20180925
 * @create 2018-09-25
 * @place guangzhou
 */
var devil;
(function (devil) {
    var LogType = /** @class */ (function () {
        function LogType() {
        }
        LogType.WARNING = 1;
        LogType.ERROR = 2;
        LogType.DEBUG = 4;
        return LogType;
    }());
    devil.LogType = LogType;
})(devil || (devil = {}));
