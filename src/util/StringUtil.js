var devil;
(function (devil) {
    /**
     * 字符串工具类
     * @author        devil
     * @version       V20190213
     * @create        2019-02-13
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var StringUtil = /** @class */ (function () {
        function StringUtil() {
        }
        StringUtil.prototype.startsWith = function (source, str, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = false; }
            if (!source)
                return false;
            else if (source.length < str.length)
                return false;
            else {
                source = source.substring(0, str.length);
                if (!ignoreCase)
                    return source == str;
                else
                    return source.toLowerCase() == str.toLowerCase();
            }
        };
        StringUtil.parseBoolean = function (value) {
            return !(value.toUpperCase() == "FALSE");
        };
        StringUtil.formatString = function (str) {
            return str < 10 ? "0" + str : str + "";
        };
        /**
         * 字符串为空或null
         * @param str
         * @return
         */
        StringUtil.isEmpty = function (str) {
            return str == null || str == "";
        };
        StringUtil.toString = function (obj) {
            if (obj instanceof egret.Rectangle) {
                return obj.x + "," + obj.y + "," + obj.width + "," + obj.height;
            }
            return obj.toString();
        };
        StringUtil.parseRectangle = function (str) {
            if (str == "" || str == null)
                return null;
            var arr = str.split(",");
            return new egret.Rectangle(arr[0], arr[1], arr[2], arr[3]);
        };
        StringUtil.substitute = function (str) {
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
            if (str == null)
                return "";
            // Replace all of the parameters in the msg string.
            var len = rest.length;
            var args;
            if (len == 1 && rest[0] instanceof Array) {
                args = rest[0];
                len = args.length;
            }
            else {
                args = rest;
            }
            for (var i = 0; i < len; i++) {
                str = str.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
            }
            return str;
        };
        StringUtil.format = function (str, args) {
            var len = args.length;
            var reg;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    reg = new RegExp("({[" + i + "]})", "g"); //这个在索引大于9时会有问题，谢谢何以笙箫的指出
                    str = str.replace(reg, args[i]);
                }
            }
            return str;
        };
        StringUtil.getStrlen = function (value) {
            var len = value.length;
            var blen = 0;
            for (var i = 0; i < len; i++) {
                if ((value.charCodeAt(i) & 0xff00) != 0)
                    blen++;
                blen++;
            }
            return blen;
        };
        /**
        * 获取字符串长度：汉字=2  字母数字=1
        */
        StringUtil.getStrlen2 = function (str) {
            var result = 0;
            var length = str.length;
            for (var i = 0; i < length; i++) {
                var temp = str.charCodeAt(i);
                if (temp > 127 || temp == 94) {
                    result += 2;
                }
                else {
                    result++;
                }
            }
            return result;
        };
        return StringUtil;
    }());
    devil.StringUtil = StringUtil;
})(devil || (devil = {}));
