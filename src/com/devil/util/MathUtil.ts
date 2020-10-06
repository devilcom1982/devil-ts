namespace devil
{
    export class MathUtil
    {
        /**
         * 返回介于[min,max]的值，其中max一定大于min
         */
        public static clamb(min:number, max:number, value:number):number
        {
            if(value <= min)return min;
            if(value >= max)return max;
            return value;
        }

        /**
         *  [min,max]
         * @param min 
         * @param max 
         * @param value 
         */
		public static isBetween(min:number,max:number,value:number):boolean
		{
			if(min <= value && value <= max)return true;
			return false;
        }
        
        public static distance(x:number,y:number,x1:number,y1:number):number
        {
            return Math.sqrt(Math.pow(x - x1,2) + Math.pow(y - y1,2));
        }

        public static angle(radian:number):number
        {
            return radian * 180 / Math.PI;
        }

        public static radian(angle:number):number
        {
            return angle * Math.PI / 180;
        }

        public static atan2(y:number,x:number):number
        {
            return Math.atan2(y,x) * 180 / Math.PI;
        }

        public static cos(angle:number):number
        {
            return Math.cos(angle / 180 * Math.PI);
        }

        public static sin(angle:number):number
        {
            return Math.sin(angle / 180 * Math.PI);
        }
        
    }
}