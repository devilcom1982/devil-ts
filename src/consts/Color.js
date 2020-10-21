var devil;
(function (devil) {
    /**
     * 颜色常量值
     * @author        devil
     * @version       V20190221
     * @create        2019-02-21
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var Color = /** @class */ (function () {
        function Color() {
        }
        /**
         * 黑色
         */
        Color.BLACK = 0x000000;
        /**
         * 白色
         */
        Color.WHITE = 0xffffff;
        /**
         * 红色
         */
        Color.RED = 0xff0000;
        /**
         * 绿色
         */
        Color.GREEN = 0x00ff00;
        /**
         * 蓝色
         */
        Color.BLUE = 0x0000ff;
        return Color;
    }());
    devil.Color = Color;
})(devil || (devil = {}));
