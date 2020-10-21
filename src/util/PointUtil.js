var devil;
(function (devil) {
    /**
     * Point工具类
     * @author        devil
     * @version       V20190425
     * @create        2019-04-29
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var PointUtil = /** @class */ (function () {
        function PointUtil() {
        }
        PointUtil.getAngle = function (x1, y1, x2, y2) {
            return this.getRadian(x1, y1, x2, y2) / Math.PI * 180;
        };
        PointUtil.getRadian = function (x1, y1, x2, y2) {
            return Math.atan2(y2 - y1, x2 - x1);
        };
        /**
         * 以的指定的点为圆心，获取指定角度和长度的点
         * @param p
         * @param angle
         * @param disance
         */
        PointUtil.getNextPoint = function (p, angle, disance) {
            return new egret.Point(p.x + Math.cos(angle) * disance, p.y + Math.sin(angle) * disance);
        };
        /**
         * 判断p是否在p1和p2所组成的矩形中,p1、p2不分先后
         * @param p1
         * @param p2
         * @param p
         */
        PointUtil.inRect = function (p1, p2, p) {
            return this.inRect2(p1, p2, p.x, p.y);
        };
        /**
         * 判断p是否在p1和p2所组成的矩形中,p1、p2不分先后
         * @param p1
         * @param p2
         * @param x
         * @param y
         */
        PointUtil.inRect2 = function (p1, p2, x, y) {
            var disX = Math.abs(p1.x - p2.x);
            var disY = Math.abs(p1.y - p2.y);
            var disX1 = Math.abs(x - p1.x);
            var disX2 = Math.abs(x - p2.x);
            var disY1 = Math.abs(y - p1.y);
            var disY2 = Math.abs(y - p2.y);
            return (disX == disX1 + disX2) && (disY == disY1 + disY2);
        };
        /**
         * 字符串数组转成点坐标
         * @param src
         */
        PointUtil.getPoint = function (src) {
            return new egret.Point(parseInt(src[0]), parseInt(src[1]));
        };
        /**
         * 以指定分隔符分隔的字符串转成点坐标
         * @param src
         */
        PointUtil.getPoint2 = function (src, splitStr) {
            if (splitStr === void 0) { splitStr = ","; }
            var arr = src.split(splitStr);
            return new egret.Point(parseInt(arr[0]), parseInt(arr[1]));
        };
        /**
         * 以指定分隔符分隔的字符串转成点坐标数组
         * @param src
         */
        PointUtil.getPoints = function (src, splitStr1, splitStr2) {
            if (splitStr1 === void 0) { splitStr1 = "|"; }
            if (splitStr2 === void 0) { splitStr2 = ","; }
            var result = [];
            var arr = src.split(splitStr1);
            for (var i = 0; i < arr.length; i++) {
                result.push(this.getPoint2(arr[i]));
            }
            return result;
        };
        return PointUtil;
    }());
    devil.PointUtil = PointUtil;
})(devil || (devil = {}));
