var devil;
(function (devil) {
    /**
     * 颜色工具类
     * @author        devil
     * @version       V20190221
     * @create        2019-02-21
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ColorUtil = /** @class */ (function () {
        function ColorUtil() {
        }
        ColorUtil.getRandomColor = function () {
            return 0xffffff * Math.random();
        };
        ColorUtil.getColor = function (value) {
            return "0x" + value.toString(16);
        };
        ColorUtil.getHtmlColor = function (value) {
            return "#" + value.toString(16);
        };
        return ColorUtil;
    }());
    devil.ColorUtil = ColorUtil;
})(devil || (devil = {}));
