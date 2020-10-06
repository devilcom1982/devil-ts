namespace devil
{
	/**
	 * 通用标记无效常量
	 * @author        devil
	 * @version       V20181228
	 * @create        2018-12-28
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class InvalidationType
    {
		/**
		 * 标记为空 
		 */		
		public static EMPTY:number = 0;
		/**
		 * 内部布局标记 
		 */		
		public static LAYOUT:number = 256;
		// /**
		//  * 位置标记 
		//  */		
		// public static POSITION:number = 8;
		/**
		 * 长宽标记 
		 */		
		public static SIZE:number = 512;
		/**
		 * 数据标记 
		 */		
		public static DATA:number = 1024;
		/**
		 * 样式标记 
		 */		
		public static STYLE:number = 2048;
		/**
		 * 是否可交互 
		 */		
        public static ENABLED:number = 4096;
		/**
		 * 初始化 
		 */		
        public static INIT:number = 8192;
		/**
		 * 初始化标记 
		 */		
		// public static ALL:number =  InvalidationType.LAYOUT | InvalidationType.POSITION | InvalidationType.SIZE | InvalidationType.DATA | InvalidationType.STYLE | InvalidationType.ENABLED;
		public static ALL:number =  InvalidationType.LAYOUT | InvalidationType.SIZE | InvalidationType.DATA | InvalidationType.STYLE | InvalidationType.ENABLED;
    }
}