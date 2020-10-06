namespace devil
{
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
    export class Direction
    {
        public static UP:number = 0;
        public static DOWM:number = 1;
        public static LEFT:number = 2;
        public static RIGHT:number = 3;
        public static LEFT_UP:number = 4;
        public static LEFT_DOWN:number = 5;
        public static RIGHT_UP:number = 6;
        public static RIGHT_DOWN:number = 7;

        /**
         * params:分为0，1，2,默认值为0
         * 0返回(up,down,left,right)
         * 1返回(left_up,left_down,right_up,right_down)
         * 2返回八个方向
         */
        public static getDirections(param:number = 0):number[]
        {
            if(param == 0)return [this.LEFT,this.RIGHT,this.UP,this.DOWM];
            else if(param == 1)return [this.LEFT_DOWN,this.LEFT_UP,this.RIGHT_DOWN,this.RIGHT_UP];
            else return [this.LEFT,this.RIGHT,this.UP,this.DOWM,this.LEFT_DOWN,this.LEFT_UP,this.RIGHT_DOWN,this.RIGHT_UP];
        }

        public static getRotation(direction:number):number
        {
            let rotation:number = 0;
            switch(direction)
            {
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
        }
    }
}