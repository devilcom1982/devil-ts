namespace devil 
{
    /**
     * 字符串工具类
     * @author        devil
     * @version       V20190213
     * @create        2019-02-13
     * @update 	      author:更新者        time:更新日期        description:更新描述    
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */	
    export class StringUtil
    {
        public startsWith(source:string,str:string,ignoreCase:boolean = false):boolean
        {
            if(!source)return false;
            else if(source.length<str.length)return false;
            else 
            {
                source = source.substring(0, str.length);
                if(!ignoreCase)return source==str;
                else return source.toLowerCase()==str.toLowerCase();
            }
        }

        public static parseBoolean(value:string):boolean
        {
            return !(value.toUpperCase() == "FALSE");
        }

        public static formatString(str:number):string
        {
            return str < 10 ? "0" + str : str + "";
        }

        /**
         * 字符串为空或null 
         * @param str
         * @return 
         */		
        public static isEmpty(str:string):boolean
        {
            return str == null || str == "";
        }

        public static toString(obj:Object):string
        {
            if(obj instanceof egret.Rectangle)
            {
                return obj.x + "," + obj.y + "," + obj.width + "," + obj.height; 
            }
            return obj.toString();
        }

        public static parseRectangle(str:string):egret.Rectangle
        {
            if(str == "" || str == null)return null;
            let arr:any[] = str.split(",");
            return new egret.Rectangle(arr[0],arr[1],arr[2],arr[3]);
        }

        public static substitute(str:string,...rest:any[]):string
        {
            if(str == null)return "";
            // Replace all of the parameters in the msg string.
            let len:number = rest.length;
            let args:any[];
            if(len == 1 && rest[0] instanceof Array)
            {
                args = rest[0];
                len = args.length;
            }
            else
            {
                args = rest;
            }
            for(let i:number = 0 ; i < len; i ++)
            {
                str = str.replace(new RegExp("\\{"+i+"\\}", "g"),args[i]);
            }
            return str;
        }

        public static format(str:string,args:any[]):string
        {
            let len:number = args.length;
            let reg:RegExp;
            if(len > 0)
            {
                for(let i:number = 0; i < len; i ++)
                {
                    reg = new RegExp(`({[${i}]})`, "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
                    str = str.replace(reg,args[i]);
                }
            }
            return str;
        }

        public static getStrlen(value:string):number
        {
            let len:number = value.length;
            let blen = 0;
            for(let i:number = 0; i < len; i++)
            {
                if ((value.charCodeAt(i) & 0xff00) != 0)
                    blen ++;
                blen ++;
            }
            return blen;
        }

        /**
		* 获取字符串长度：汉字=2  字母数字=1
		*/
		public static getStrlen2(str:string):number
		{
			let result = 0;
			let length = str.length;
			for(let i = 0; i < length; i++)
			{
				let temp = str.charCodeAt(i);
				if(temp > 127 || temp == 94)
				{
					result += 2;
				}
				else
				{
					result ++;              
				}
			}
			return result;
		}
    }
}