var devil;
(function (devil) {
    var MathUtil = /** @class */ (function () {
        function MathUtil() {
        }
        /**
         * 返回介于[min,max]的值，其中max一定大于min
         */
        MathUtil.clamb = function (min, max, value) {
            if (value <= min)
                return min;
            if (value >= max)
                return max;
            return value;
        };
        /**
         *  [min,max]
         * @param min
         * @param max
         * @param value
         */
        MathUtil.isBetween = function (min, max, value) {
            if (min <= value && value <= max)
                return true;
            return false;
        };
        MathUtil.distance = function (x, y, x1, y1) {
            return Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        };
        MathUtil.angle = function (radian) {
            return radian * 180 / Math.PI;
        };
        MathUtil.radian = function (angle) {
            return angle * Math.PI / 180;
        };
        MathUtil.atan2 = function (y, x) {
            return Math.atan2(y, x) * 180 / Math.PI;
        };
        MathUtil.cos = function (angle) {
            return Math.cos(angle / 180 * Math.PI);
        };
        MathUtil.sin = function (angle) {
            return Math.sin(angle / 180 * Math.PI);
        };
        return MathUtil;
    }());
    devil.MathUtil = MathUtil;
})(devil || (devil = {}));
