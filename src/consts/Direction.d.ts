declare namespace devil {
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
    class Direction {
        static UP: number;
        static DOWM: number;
        static LEFT: number;
        static RIGHT: number;
        static LEFT_UP: number;
        static LEFT_DOWN: number;
        static RIGHT_UP: number;
        static RIGHT_DOWN: number;
        /**
         * params:分为0，1，2,默认值为0
         * 0返回(up,down,left,right)
         * 1返回(left_up,left_down,right_up,right_down)
         * 2返回八个方向
         */
        static getDirections(param?: number): number[];
        static getRotation(direction: number): number;
    }
}
