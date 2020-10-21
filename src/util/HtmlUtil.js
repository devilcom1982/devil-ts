var devil;
(function (devil) {
    /**
     * HTML字符串工具类
     * @author        devil
     * @version       V20190222
     * @create        2019-02-22
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var HtmlUtil = /** @class */ (function () {
        function HtmlUtil() {
        }
        /**
         * tf egret.TextField | eui.Label | TextField
         */
        HtmlUtil.setHtml = function (tf, htmlText) {
            tf.textFlow = new egret.HtmlTextParser().parse(htmlText);
        };
        HtmlUtil.addBTag = function (str) {
            return "<b>" + str + "</b>";
        };
        HtmlUtil.addUTag = function (str) {
            return "<u>" + str + "</u>";
        };
        HtmlUtil.addFontTag = function (str, font) {
            return "<font fontFamily='" + font + "'>" + str + "</font>";
        };
        HtmlUtil.addColorTag = function (str, color) {
            return "<font color='" + color + "'>" + str + "</font>";
        };
        HtmlUtil.addColorSizeTag = function (str, color, size) {
            if (size === void 0) { size = 0; }
            if (size == 0)
                size = egret.TextField.default_size;
            return "<font color='" + color + "' size='" + size + "'>" + str + "</font>";
        };
        HtmlUtil.addATag = function (str, event) {
            if (event === void 0) { event = ""; }
            return "<a href = 'event:" + event + "'>" + str + "</a>";
        };
        HtmlUtil.addColorUATag = function (str, color, event) {
            if (event === void 0) { event = ""; }
            return "<a href = 'event:" + event + "'><u><font color='" + color + "'>" + str + "</font></u></a>";
        };
        return HtmlUtil;
    }());
    devil.HtmlUtil = HtmlUtil;
})(devil || (devil = {}));
