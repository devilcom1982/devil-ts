var devil;
(function (devil) {
    /**
     * 数组工具类
     * @author        devil
     * @version       V20190523
     * @create        2019-05-23
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ArrayUtil = /** @class */ (function () {
        function ArrayUtil() {
        }
        /**
         * 将某一格式的字符串转成数字类型数组,可带有{}格式
         * @param str
         * @param splitStr
         */
        ArrayUtil.parseStringToArray = function (str, splitStr) {
            if (splitStr === void 0) { splitStr = ","; }
            var reg = /{|}| /g;
            str = str.replace(reg, "");
            var arr = str.split(splitStr);
            var result = [];
            for (var i = 0; i < arr.length; i++) {
                result.push(parseInt(arr[i]));
            }
            return result;
        };
        /**
         * 数组中删除
         * @param array
         * @param value
         */
        ArrayUtil.deleteObject = function (array, value) {
            var index = array.indexOf(value);
            if (index != -1)
                array.splice(index, 1);
        };
        /**
         * 多属性排序,arrProperty与arrSort对应
         * @param arrProperty 属性列表
         * @param arrSort 排序方式(默认正序) 0正序 1倒序
         * @return 排序后的数组
         */
        ArrayUtil.sortOn = function (arr, arrProperty, arrSort) {
            if (arrSort === void 0) { arrSort = null; }
            if (arr == null || arr.length == 0)
                return arr;
            return arr.sort(function (obj1, obj2) {
                var len = arrProperty.length;
                var property = "";
                var sortLen = arrSort ? arrSort.length : 0;
                if (sortLen > len)
                    sortLen = len;
                var sortType = 0;
                var result = 0;
                for (var i = 0; i < len; i++) {
                    property = arrProperty[i];
                    sortType = 0;
                    if (i < sortLen)
                        sortType = arrSort[i];
                    result = Number(obj1[property]) - Number(obj2[property]);
                    if (result == 0)
                        continue;
                    if (sortType == 0)
                        return result;
                    return -result;
                }
                return 0;
            });
        };
        /**
         * 对数组随机排行
         * @param value
         */
        ArrayUtil.randomSort = function (value) {
            value.sort(function (obj1, obj2) {
                return Math.random() < 0.5 ? 1 : -1;
            });
        };
        /**
         * 获取数组随机值
         * @param arr
         */
        ArrayUtil.random = function (arr) {
            return arr[Math.floor(arr.length * Math.random())];
        };
        return ArrayUtil;
    }());
    devil.ArrayUtil = ArrayUtil;
})(devil || (devil = {}));
