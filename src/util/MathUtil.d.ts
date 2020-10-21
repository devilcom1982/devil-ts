declare namespace devil {
    class MathUtil {
        /**
         * 返回介于[min,max]的值，其中max一定大于min
         */
        static clamb(min: number, max: number, value: number): number;
        /**
         *  [min,max]
         * @param min
         * @param max
         * @param value
         */
        static isBetween(min: number, max: number, value: number): boolean;
        static distance(x: number, y: number, x1: number, y1: number): number;
        static angle(radian: number): number;
        static radian(angle: number): number;
        static atan2(y: number, x: number): number;
        static cos(angle: number): number;
        static sin(angle: number): number;
    }
}
