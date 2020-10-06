namespace devil
{
	/**
	 * 颜色工具类
	 * @author        devil
	 * @version       V20190221
	 * @create        2019-02-21
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class ColorUtil
    {
        public static getRandomColor():number
        {
            return 0xffffff * Math.random();
        }

        public static getColor(value:number):string
        {
            return "0x" + value.toString(16);
        }

        public static getHtmlColor(value:number):string
        {
            return "#" + value.toString(16);
        }
    }
}