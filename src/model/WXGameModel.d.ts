declare namespace devil {
    /**
     * 小游戏通用数据
     * @author        devil
     * @version       V20200906
     * @create        2020-09-06
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class WXGameModel {
        userInfo: WXUserInfo;
        gameName: string;
        /**
         * 排行榜显示条数
         */
        showCount: number;
        /**
         * 后台总开关
         */
        masterCtrl: boolean;
        gameCtrl: any;
        code: string;
        openID: string;
        gameList: any[];
        /**
         * 世界排行榜数据
         */
        playerList: any[];
        get leftReceiveCount(): number;
        /**
         * 排行榜是否打开
         */
        private _rankShow;
        get rankShow(): boolean;
        set rankShow(value: boolean);
        constructor();
        /**
         * 获取游戏开关
         * @param key
         */
        getGameCtrl(key: string): boolean;
        /**
         * 免费复活次数
         */
        private _receiveFreeCount;
        get receiveFreeCount(): number;
        set receiveFreeCount(value: number);
        /**
         * 已免费复活次数
         */
        private _hasReceiveFreeCount;
        get hasReceiveFreeCount(): number;
        set hasReceiveFreeCount(value: number);
    }
}
