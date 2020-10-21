var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var devil;
(function (devil) {
    /**
     * 语言包管理器
     * @author        devil
     * @version       V20190221
     * @create        2019-02-21
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var LangManager = /** @class */ (function () {
        function LangManager() {
            this._dic = {};
        }
        /**
         * 解析语言包
         */
        LangManager.prototype.parse = function (bytes) {
            var tableCount = bytes.readByte();
            var tableName;
            var count;
            for (var i = 0; i < tableCount; i++) {
                tableName = bytes.readUTF();
                count = bytes.readShort();
                for (var j = 0; j < count; j++) {
                    this._dic[tableName + bytes.readShort()] = bytes.readUTF();
                }
            }
        };
        /**
        * 语言ID，系统与ID组成的字符串，例如:bag1
        */
        LangManager.prototype.getContent = function (id) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var content = this._dic[id];
            if (content == null)
                return "{-" + id + "-}";
            if (args.length == 0)
                return content;
            return devil.StringUtil.substitute.apply(devil.StringUtil, __spreadArrays([content], args));
        };
        return LangManager;
    }());
    devil.LangManager = LangManager;
})(devil || (devil = {}));
