var devil;
(function (devil) {
    /**
     * 加载状态
     * @author devil
     * @version V20180719
     * @create V20180719
     * @place guangzhou
     */
    var LoaderState = /** @class */ (function () {
        function LoaderState() {
        }
        /**
         * 等待状态
         */
        LoaderState.WAITING = 0;
        /**
         * 正在加载
         */
        LoaderState.LOADING = 1;
        /**
         * 加载成功
         */
        LoaderState.SUCESS = 2;
        /**
         * 加载失败
         */
        LoaderState.FAIL = 3;
        return LoaderState;
    }());
    devil.LoaderState = LoaderState;
})(devil || (devil = {}));
