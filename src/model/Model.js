var devil;
(function (devil) {
    /**
     * 数据
     * @author        devil
     * @version       V20190131
     * @create        2019-01-31
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var Model = /** @class */ (function () {
        function Model() {
        }
        Model.setup = function () {
            this.canvas = new devil.CanvasModel();
            this.cvo = new devil.CVOModel();
            this.lifecyclePause = false;
            this.wxGame = new devil.WXGameModel();
            this.resConfig = new devil.ResourceConfig2();
        };
        return Model;
    }());
    devil.Model = Model;
})(devil || (devil = {}));
