declare let wx: any;
declare namespace devil {
    /**
     * 微信管理器
     * @author        devil
     * @version       V20200906
     * @create        2020-09-06
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class WXManager {
        /**
         * 发送朋友设置
         * @param titles    分享时设置的标题
         * @param imageURL  分享图片设置，默认值为resource/assets/share/share.png(330*237)
         */
        private _login;
        private _rank;
        private _image;
        private _x;
        private _y;
        private _width;
        private _height;
        private _game_id;
        private _success;
        private _target;
        onShareAppMessage(titles: string[], imageURL?: string): void;
        /**
         * 初始化本地缓存数据
         * @param nickName 玩家昵称
         * @param gameName 游戏名字
         * @param maxReceiveCount 默认赠送的免费复活次数，默认为0
         */
        readLocation(maxReceiveCount?: number): void;
        writeLocation(): void;
        writeReceiveFreeCount(): void;
        writeHasReceiveFreeCount(): void;
        /**
         * 打开其它的小游戏
         * @param appID
         */
        navigateToMiniProgram(appID: string): void;
        loginRank(image: string, x: number, y: number, width: number, height: number, game_id: number, sucess?: (code: any) => void, target?: any): void;
        hideLogin(): void;
        hideRank(): void;
        showLogin(): void;
        /**
         * 创建开始按钮
         * @param x 设计尺寸上的水平坐标
         * @param y 设计尺寸上的垂直坐标
         * @param width 设计尺寸的宽度
         * @param height 设计尺寸的高度
         */
        login(image: string, x: number, y: number, width: number, height: number, game_id: number, sucess?: (code: any) => void, target?: any): void;
        private ____login;
        /**
         * 游戏列表
         */
        gameList(callBack: () => void, target: any, appid: string): void;
        /**
         * 会员列表
         */
        playerList(gameID: number, page: number, limit: number, callBack: () => void, target: any): void;
        /**
         *
         * 初始化开关
         * @param callBack
         * @param target
         * @param id 1.魔法之触
         */
        initCtrl(callBack: () => void, target: any, id: number): void;
        /**
         * 登录后台接口
         */
        private $login;
        saveScore(member_id: string, score: number, game_id: number): void;
        private ___$saveRender;
    }
}
