var devil;
(function (devil) {
    /**
     * 小游戏通用数据
     * @author        devil
     * @version       V20200906
     * @create        2020-09-06
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var WXGameModel = /** @class */ (function () {
        function WXGameModel() {
            this.gameName = "game";
            // public page:number = 1;
            // public totalPage:number;
            /**
             * 排行榜显示条数
             */
            this.showCount = 10;
            /**
             * 后台总开关
             */
            this.masterCtrl = false;
            /**
             * 排行榜是否打开
             */
            this._rankShow = false;
            this.gameList = [];
            this.playerList = [];
            this._receiveFreeCount = 0;
            this._hasReceiveFreeCount = 0;
        }
        Object.defineProperty(WXGameModel.prototype, "leftReceiveCount", {
            get: function () {
                var result = (this._receiveFreeCount - this._hasReceiveFreeCount);
                return result < 0 ? 0 : result;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WXGameModel.prototype, "rankShow", {
            get: function () {
                return this._rankShow;
            },
            set: function (value) {
                this._rankShow = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取游戏开关
         * @param key
         */
        WXGameModel.prototype.getGameCtrl = function (key) {
            return this.gameCtrl ? this.gameCtrl[key] == "1" : false;
        };
        Object.defineProperty(WXGameModel.prototype, "receiveFreeCount", {
            get: function () {
                return this._receiveFreeCount;
            },
            set: function (value) {
                if (this._receiveFreeCount == value)
                    return;
                this._receiveFreeCount = value;
                devil.Manager.wx.writeReceiveFreeCount();
                devil.Manager.event.dispatchEvent(new devil.WXGameEvent(devil.WXGameEvent.UPDATE_RECEIVE_COUNT));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WXGameModel.prototype, "hasReceiveFreeCount", {
            get: function () {
                return this._hasReceiveFreeCount;
            },
            set: function (value) {
                value = devil.MathUtil.clamb(0, this._receiveFreeCount, value);
                if (this._hasReceiveFreeCount == value)
                    return;
                this._hasReceiveFreeCount = value;
                devil.Manager.wx.writeHasReceiveFreeCount();
                devil.Manager.event.dispatchEvent(new devil.WXGameEvent(devil.WXGameEvent.UPDATE_RECEIVE_COUNT));
            },
            enumerable: true,
            configurable: true
        });
        return WXGameModel;
    }());
    devil.WXGameModel = WXGameModel;
})(devil || (devil = {}));
