declare namespace devil {
    /**
     * 微信开放域管理器
     * @author        devil
     * @version       V20201015
     * @create        2020-10-15
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class WXOpenDataContextManager {
        private _shareCanvas;
        private _closeRects;
        private _nextRects;
        private _preRects;
        private _rankRects;
        constructor();
        addCloseRect(value: egret.Rectangle): void;
        addRankRect(value: egret.Rectangle): void;
        addNextRect(value: egret.Rectangle): void;
        addPreRect(value: egret.Rectangle): void;
        initFriend(nickName: string, score: number, avatarUrl: string): void;
        /**
         * 保存最高分数
         * @param type
         */
        saveScore(score: number): void;
        /**
          * 打开排行榜
          * id  1为好友排行榜 2为世界排行榜 0为未授权
          */
        showRank(id: number): void;
        hideRank(): void;
        private ___drawRank;
        private ___drawRank2;
        private drawRank;
        private clearCanvas;
        /**
         * 获取世界排行数据
         * @param gameID
         */
        loadWorldRank(gameID: number): void;
        updatePage(next: boolean): void;
        private ___list;
        private ___touchBegan;
        switchBest(show: boolean, x?: number, y?: number, score?: number): void;
        private ___drawBest;
        private drawBest;
        private __drawBest;
    }
}
