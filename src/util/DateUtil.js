var devil;
(function (devil) {
    /**
     * 日期工具类
     * @author        devil
     * @version       V20190425
     * @create        2019-04-29
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var DateUtil = /** @class */ (function () {
        function DateUtil() {
        }
        /**
         * 格式化日期为指定的格式的字符串
         * @param seconds
         * @param format
         * @param isLeft
         */
        DateUtil.formatStr = function (seconds, format, isLeft) {
            if (isLeft === void 0) { isLeft = false; }
            var date = new Date(seconds * 1000);
            var year;
            var month;
            var day;
            var hour;
            var minute;
            var second;
            if (isLeft) {
                if (seconds > 0) {
                    day = Math.floor(seconds / (3600 * 24));
                    var temp = Math.floor(seconds % (3600 * 24));
                    hour = Math.floor(temp / 3600);
                    minute = Math.floor(temp / 60) % 60;
                    second = temp % 60;
                }
                else {
                    day = 0;
                    hour = 0;
                    minute = 0;
                    second = 0;
                }
            }
            else {
                year = date.getFullYear();
                month = date.getMonth() + 1;
                day = date.getDate();
                hour = date.getHours();
                minute = date.getMinutes();
                second = date.getSeconds();
            }
            var monthStr = month < 10 ? "0" + month : month + "";
            var dayStr = day < 10 ? "0" + day : day + "";
            var hourStr = hour < 10 ? "0" + hour : hour + "";
            var minuteStr = minute < 10 ? "0" + minute : minute + "";
            var secondStr = second < 10 ? "0" + second : second + "";
            if (format == this.YYYY_MM_DD_HH_MM_SS)
                return year + "/" + monthStr + "/" + dayStr + " " + hourStr + ":" + minuteStr + ":" + secondStr;
            else if (format == this.MM_DD_HH_MM)
                return monthStr + "/" + dayStr + " " + hourStr + ":" + minuteStr;
            else if (format == this.HH_MM)
                return hourStr + ":" + minuteStr;
            else if (format == this.MM_SS)
                return minuteStr + ":" + secondStr;
            else if (format == this.LEFT_DD_HH_MM)
                return dayStr + "天" + hourStr + "小时" + minuteStr + "分";
            else if (format == this.LEFT_MM_SS)
                return minuteStr + ":" + secondStr;
            else if (format == this.LEFT_HH_MM_SS)
                return hourStr + ":" + minuteStr + ":" + secondStr;
            else if (format == this.LEFT_M_SS)
                return minute + ":" + secondStr;
            else if (format == this.LEFT_DAY_OR_HH_MM_SS) {
                if (day > 0)
                    return day + "天";
                return hourStr + ":" + minuteStr + ":" + secondStr;
            }
            else
                return "";
        };
        DateUtil.getDateBySecs = function (secs) {
            var result = new Date();
            result.setTime(secs * 1000);
            return result;
        };
        /**
         * 获取日期之间相距的天数
         * @param date1
         * @param date2
         */
        DateUtil.disDay = function (date1, date2) {
            var dt = date2.getTime() - date1.getTime();
            return dt / 1000 / 60 / 60 / 24;
        };
        /**
         *获取经过的总天数。距离 1970 年 1 月 1 日
         * @param date
         * @return
         *
         */
        DateUtil.getTotalDays = function (date) {
            return Number((date.getTime() - date.getTimezoneOffset() * 60 * 1000) / (24 * 60 * 60 * 1000));
        };
        /**
         *返回当年当月有多少天
         * @param year
         * @param month
         * @return
         *
         */
        DateUtil.getDates = function (year, month) {
            var date1 = new Date(year, month, 1);
            var date2 = new Date(year, month + 1, 1);
            return Number(this.disDay(date1, date2));
        };
        DateUtil.YYYY_MM_DD_HH_MM_SS = "YYYY_MM_DD_HH_MM_SS";
        DateUtil.MM_DD_HH_MM = "MM_DD_HH_MM_SS";
        DateUtil.HH_MM = "HH_MM";
        DateUtil.MM_SS = "MM_SS";
        DateUtil.LEFT_DD_HH_MM = "LEFT_DD_HH_MM";
        DateUtil.LEFT_MM_SS = "LEFT_MM_SS";
        DateUtil.LEFT_HH_MM_SS = "LEFT_HH_MM_SS";
        DateUtil.LEFT_M_SS = "LEFT_M_SS";
        DateUtil.LEFT_DAY_OR_HH_MM_SS = "LEFT_DAY_OR_HH_MM_SS";
        return DateUtil;
    }());
    devil.DateUtil = DateUtil;
})(devil || (devil = {}));
