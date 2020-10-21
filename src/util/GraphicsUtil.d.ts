declare namespace devil {
    /**
     * 绘图工具类
     * @author        devil
     * @version       V20190131
     * @create        2019-01-31
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class GraphicsUtil {
        static createRectSprite(x: number, y: number, width: number, height: number, color?: number, alpha?: number): egret.Sprite;
        static createRectShape(x: number, y: number, width: number, height: number, color?: number, alpha?: number): egret.Shape;
        static drawRect(graphics: egret.Graphics, x: number, y: number, width: number, height: number, color?: number, alpha?: number): void;
        static createCircleSprite(x: number, y: number, radius: number, color?: number, alpha?: number): egret.Sprite;
        static createCircleShape(x: number, y: number, radius: number, color?: number, alpha?: number): egret.Shape;
        static drawCircle(graphics: egret.Graphics, x: number, y: number, radius: number, color?: number, alpha?: number): void;
        static createRectBoderShape(x: number, y: number, width: number, height: number, color: number, alpha: number): egret.Shape;
        /**
         * 绘制弧形
         * @param graphics
         * @param x
         * @param y
         * @param r
         * @param color
         * @param angle			角度，以度为单位
         * @param startFrom
         */
        static drawSector(graphics: egret.Graphics, x: number, y: number, r: number, color: number, angle: number, startFrom: number): void;
        /**
         * 画虚线
         * @param graphics
         * @param x
         * @param y
         * @param dashedWidth		虚线线段的长度
         * @param space				虎线线段间距
         * @param width				整个虚线的宽度
         * @param color
         * @param alpha
         */
        static drawDashed(graphics: egret.Graphics, x: number, y: number, dashedWidth: number, space: number, width: number, color?: number, alpha?: number): void;
    }
}
