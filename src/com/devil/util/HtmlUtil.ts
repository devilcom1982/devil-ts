namespace devil
{
	/**
     * HTML字符串工具类
	 * @author        devil
	 * @version       V20190222
	 * @create        2019-02-22
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class HtmlUtil
    {
        /**
         * tf egret.TextField | eui.Label | TextField
         */
        public static setHtml(tf:any,htmlText:string):void
        {
            tf.textFlow = new egret.HtmlTextParser().parse(htmlText);
        }

        public static addBTag(str:string):string
        {
            return "<b>" + str + "</b>";
        }

        public static addUTag(str:string):string
        {
            return "<u>" + str + "</u>";
        }

        public static addFontTag(str:string,font:string):string
        {
            return "<font fontFamily='" + font + "'>"+ str + "</font>";
        }

        public static addColorTag(str:string,color:string):string
        {
            return "<font color='" + color + "'>"+ str + "</font>";
        }

        public static addColorSizeTag(str:string,color:string,size:number = 0):string
        {
            if(size == 0) size = egret.TextField.default_size;
            return "<font color='" + color + "' size='" + size + "'>"+ str + "</font>";
        }

        public static addATag(str:string,event:string=""):string
        {
            return "<a href = 'event:" + event + "'>" + str + "</a>";
        }   

        public static addColorUATag(str:string, color:string, event:string=""):string
        {
            return "<a href = 'event:" + event + "'><u><font color='" + color + "'>" + str + "</font></u></a>";
        }
    }
}