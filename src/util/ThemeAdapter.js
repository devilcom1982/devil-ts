var devil;
(function (devil) {
    var ThemeAdapter = /** @class */ (function () {
        function ThemeAdapter() {
        }
        /**
         * 解析主题
         * @param url 待解析的主题url
         * @param compFunc 解析完成回调函数，示例：compFunc(e:egret.Event):void;
         * @param errorFunc 解析失败回调函数，示例：errorFunc():void;
         * @param thisObject 回调的this引用
         */
        ThemeAdapter.prototype.getTheme = function (url, compFunc, errorFunc, thisObject) {
            function onGetRes(loader) {
                devil.Manager.loader.remove(loader.getPath(), onGetRes, this, __loadError, this);
                compFunc.call(thisObject, loader.text);
            }
            function __loadError(loader) {
                if (loader.getPath().urls[0] == url) {
                    errorFunc.call(thisObject);
                }
            }
            devil.Manager.loader.load(devil.PathInfo.getPath(url, devil.LoaderType.TEXT, false), onGetRes, this, devil.ResourceGCType.COMMON, devil.ResPriorityType.LOAD_LEVEL6, __loadError, this);
        };
        return ThemeAdapter;
    }());
    devil.ThemeAdapter = ThemeAdapter;
})(devil || (devil = {}));
