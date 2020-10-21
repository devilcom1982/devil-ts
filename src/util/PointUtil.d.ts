declare namespace devil {
    /**
     * Point工具类
     * @author        devil
     * @version       V20190425
     * @create        2019-04-29
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class PointUtil {
        static getAngle(x1: number, y1: number, x2: number, y2: number): number;
        static getRadian(x1: number, y1: number, x2: number, y2: number): number;
        /**
         * 以的指定的点为圆心，获取指定角度和长度的点
         * @param p
         * @param angle
         * @param disance
         */
        static getNextPoint(p: egret.Point, angle: number, disance: number): egret.Point;
        /**
         * 判断p是否在p1和p2所组成的矩形中,p1、p2不分先后
         * @param p1
         * @param p2
         * @param p
         */
        static inRect(p1: egret.Point, p2: egret.Point, p: egret.Point): boolean;
        /**
         * 判断p是否在p1和p2所组成的矩形中,p1、p2不分先后
         * @param p1
         * @param p2
         * @param x
         * @param y
         */
        static inRect2(p1: egret.Point, p2: egret.Point, x: number, y: number): boolean;
        /**
         * 字符串数组转成点坐标
         * @param src
         */
        static getPoint(src: string[]): egret.Point;
        /**
         * 以指定分隔符分隔的字符串转成点坐标
         * @param src
         */
        static getPoint2(src: string, splitStr?: string): egret.Point;
        /**
         * 以指定分隔符分隔的字符串转成点坐标数组
         * @param src
         */
        static getPoints(src: string, splitStr1?: string, splitStr2?: string): egret.Point[];
    }
}
