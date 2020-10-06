namespace devil
{
	/**
     * 平台管理器
	 * @author        devil
	 * @version       V20191122
	 * @create        2019-11-22
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class PlatManager
    {
        /**
         * 是否微信小游戏
         */
        public isWX():boolean
        {
            return egret.Capabilities.runtimeType === egret.RuntimeType.WXGAME;
        }

        /**
         * 是否QQ小游戏
         */
        public isQQ():boolean
        {
            return egret.Capabilities.runtimeType === egret.RuntimeType.QQGAME;
        }

        /**
         * 是否移动端
         */
        public isMobile():boolean
        {
            return egret.Capabilities.isMobile;
        }

        /**
         * 是否电脑端（包含Windows、MAC）
         */
        public isPC():boolean
        {
            return !egret.Capabilities.isMobile; 
        }
    }
}