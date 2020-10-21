declare namespace devil {
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
    class PlatManager {
        runtimeType: string;
        /**
         * 是否微信小游戏
         */
        isWX(): boolean;
        /**
         * 是否QQ小游戏
         */
        isQQ(): boolean;
        /**
         * 是否移动端
         */
        isMobile(): boolean;
        /**
         * 是否电脑端（包含Windows、MAC）
         */
        isPC(): boolean;
        isDY(): boolean;
    }
}
