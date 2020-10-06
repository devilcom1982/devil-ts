namespace devil
{
    /**
	 * 日期工具类
     * @author        devil
     * @version       V20190425
     * @create        2019-04-29
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    export class DateUtil
    {
		public static YYYY_MM_DD_HH_MM_SS:string = "YYYY_MM_DD_HH_MM_SS";
		public static MM_DD_HH_MM:string = "MM_DD_HH_MM_SS";
		public static HH_MM:string = "HH_MM";
		public static MM_SS:string = "MM_SS";
		public static LEFT_DD_HH_MM:string = "LEFT_DD_HH_MM";
		public static LEFT_MM_SS:string = "LEFT_MM_SS";
		public static LEFT_HH_MM_SS:string = "LEFT_HH_MM_SS";
		public static LEFT_M_SS:string = "LEFT_M_SS";

		public static LEFT_DAY_OR_HH_MM_SS:string = "LEFT_DAY_OR_HH_MM_SS";

		/**
		 * 格式化日期为指定的格式的字符串
		 * @param seconds 
		 * @param format 
		 * @param isLeft 
		 */
        public static formatStr(seconds:number, format:string, isLeft:boolean = false):string
        {
		    let date = new Date(seconds * 1000);
			let year; 
			let month; 
			let day; 
			let hour; 
			let minute; 
			let second; 
			
			if(isLeft)
			{
				if(seconds > 0)
				{
					day = Math.floor(seconds / (3600 * 24));
					let temp = Math.floor(seconds % (3600 * 24));
					hour = Math.floor(temp / 3600);
					minute = Math.floor(temp / 60) % 60;
					second = temp % 60;
				}
				else
				{
					day = 0;
					hour = 0;
					minute = 0;
					second = 0;
				}
			}
			else
			{
				year = date.getFullYear();
				month = date.getMonth() + 1;
				day = date.getDate();
				hour = date.getHours();
				minute = date.getMinutes();
				second = date.getSeconds();
			}
			
			let monthStr = month < 10 ? "0" + month : month + "";
			let dayStr = day < 10 ? "0" + day : day + "";
			let hourStr = hour < 10 ? "0" + hour : hour + "";
			let minuteStr = minute < 10 ? "0" + minute : minute + "";
			let secondStr = second < 10 ? "0" + second : second + "";
			
			if(format == this.YYYY_MM_DD_HH_MM_SS) return year + "/" + monthStr + "/" + dayStr + " " + hourStr + ":" + minuteStr + ":" + secondStr;
			else if(format == this.MM_DD_HH_MM) return monthStr + "/" + dayStr + " " + hourStr + ":" + minuteStr;
			else if(format == this.HH_MM) return hourStr + ":" + minuteStr;
			else if(format == this.MM_SS) return minuteStr + ":" + secondStr;
			else if(format == this.LEFT_DD_HH_MM) return dayStr + "天" + hourStr + "小时" + minuteStr + "分";
			else if(format == this.LEFT_MM_SS) return minuteStr + ":" + secondStr;
			else if(format == this.LEFT_HH_MM_SS) return hourStr + ":" + minuteStr + ":" + secondStr;
			else if(format == this.LEFT_M_SS) return minute + ":" + secondStr;
			else if(format == this.LEFT_DAY_OR_HH_MM_SS) 
			{
				if(day > 0) return day + "天";
				return hourStr + ":" + minuteStr + ":" + secondStr;
			}
			else return "";
		}
		
		public static getDateBySecs(secs:number):Date
		{
			let result = new Date();
			result.setTime(secs * 1000);
			return result;
		}
		
		/**
		 * 获取日期之间相距的天数  
		 * @param date1 
		 * @param date2 
		 */
		public static disDay(date1:Date,date2:Date):number
		{
			let dt = date2.getTime() - date1.getTime();
			return dt / 1000 / 60 / 60 / 24;
		}
		
		/** 
		 *获取经过的总天数。距离 1970 年 1 月 1 日  
		 * @param date 
		 * @return  
		 *  
		 */       
		public static getTotalDays(date:Date):number  
		{  
			return Number(( date.getTime() - date.getTimezoneOffset() * 60 * 1000 ) / (24 * 60 * 60 * 1000));  
		}  
		
		/** 
		 *返回当年当月有多少天 
		 * @param year 
		 * @param month 
		 * @return  
		 *  
		 */
		public static getDates(year:number, month:number):number
		{
			let date1 = new Date(year, month, 1);
			let date2 = new Date(year, month + 1, 1);
			return Number(this.disDay(date1, date2));
		}
    }
}