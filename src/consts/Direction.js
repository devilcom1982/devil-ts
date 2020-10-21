var devil;
(function (devil) {
    /**
     * 方向常量值
     * @author        devil
     * @version       V20200218
     * @create        2020-02-18
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var Direction = /** @class */ (function () {
        function Direction() {
        }
        /**
         * params:分为0，1，2,默认值为0
         * 0返回(up,down,left,right)
         * 1返回(left_up,left_down,right_up,right_down)
         * 2返回八个方向
         */
        Direction.getDirections = function (param) {
            if (param === void 0) { param = 0; }
            if (param == 0)
                return [this.LEFT, this.RIGHT, this.UP, this.DOWM];
            else if (param == 1)
                return [this.LEFT_DOWN, this.LEFT_UP, this.RIGHT_DOWN, this.RIGHT_UP];
            else
                return [this.LEFT, this.RIGHT, this.UP, this.DOWM, this.LEFT_DOWN, this.LEFT_UP, this.RIGHT_DOWN, this.RIGHT_UP];
        };
        Direction.getRotation = function (direction) {
            var rotation = 0;
            switch (direction) {
                case Direction.UP:
                    rotation = -90;
                    break;
                case Direction.DOWM:
                    rotation = 90;
                    break;
                case Direction.LEFT:
                    rotation = 180;
                    break;
                case Direction.RIGHT:
                    rotation = 0;
                    break;
                case Direction.LEFT_UP:
                    rotation = -135;
                    break;
                case Direction.LEFT_DOWN:
                    rotation = 135;
                    break;
                case Direction.RIGHT_UP:
                    rotation = -45;
                    break;
                case Direction.RIGHT_DOWN:
                    rotation = 45;
                    break;
            }
            return rotation;
        };
        Direction.UP = 0;
        Direction.DOWM = 1;
        Direction.LEFT = 2;
        Direction.RIGHT = 3;
        Direction.LEFT_UP = 4;
        Direction.LEFT_DOWN = 5;
        Direction.RIGHT_UP = 6;
        Direction.RIGHT_DOWN = 7;
        return Direction;
    }());
    devil.Direction = Direction;
})(devil || (devil = {}));
