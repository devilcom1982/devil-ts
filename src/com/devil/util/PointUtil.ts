namespace devil
{
    /**
     * Point工具类
     * @author        devil
     * @version       V20190425
     * @create        2019-04-29
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    export class PointUtil
    {
        public static getAngle(x1:number,y1:number,x2:number,y2:number):number
        {
            return this.getRadian(x1,y1,x2,y2) / Math.PI * 180;
        }
    
        public static getRadian(x1:number,y1:number,x2:number,y2:number):number
        {
            return Math.atan2(y2 - y1, x2 - x1);
        }
        /**
         * 以的指定的点为圆心，获取指定角度和长度的点
         * @param p
         * @param angle 
         * @param disance 
         */
        public static getNextPoint(p:egret.Point, angle:number, disance:number):egret.Point
        {
            return new egret.Point(p.x + Math.cos(angle) * disance, p.y + Math.sin(angle) * disance);
        }
        
        /**
         * 判断p是否在p1和p2所组成的矩形中,p1、p2不分先后
         * @param p1 
         * @param p2 
         * @param p 
         */
        public static inRect(p1:egret.Point,p2:egret.Point,p:egret.Point):boolean
        {
            return this.inRect2(p1,p2,p.x,p.y);
        }
        
        /**
         * 判断p是否在p1和p2所组成的矩形中,p1、p2不分先后
         * @param p1 
         * @param p2 
         * @param x 
         * @param y 
         */
        public static inRect2(p1:egret.Point,p2:egret.Point,x:number,y:number):boolean
        {
            let disX:number = Math.abs(p1.x - p2.x);
            let disY:number = Math.abs(p1.y - p2.y);
            let disX1:number = Math.abs(x - p1.x);
            let disX2:number = Math.abs(x - p2.x);
            let disY1:number = Math.abs(y - p1.y);
            let disY2:number = Math.abs(y - p2.y);
            return (disX == disX1 + disX2) && (disY == disY1 + disY2);
        }
    
        /**
         * 字符串数组转成点坐标
         * @param src 
         */
        public static getPoint(src:string[]):egret.Point
        {
            return new egret.Point(parseInt(src[0]), parseInt(src[1]));
        }
        
        /**
         * 以指定分隔符分隔的字符串转成点坐标
         * @param src 
         */
        public static getPoint2(src:string,splitStr:string=","):egret.Point
        {
            let arr:string[] = src.split(splitStr);
            return new egret.Point(parseInt(arr[0]), parseInt(arr[1]));
        }
        
        /**
         * 以指定分隔符分隔的字符串转成点坐标数组
         * @param src 
         */
        public static getPoints(src:string,splitStr1:string="|",splitStr2:string=","):egret.Point[]
        {
            let result:egret.Point[] = [];
            let arr:string[] = src.split(splitStr1);
            for(let i:number = 0; i < arr.length; i++)
            {
                result.push(this.getPoint2(arr[i]));
            }
            return result;
        }
    }
}