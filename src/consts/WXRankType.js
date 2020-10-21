var devil;
(function (devil) {
    /**
     * 微信排行榜类型
     * @author        devil
     * @version       V20200909
     * @create        2020-09-09
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var WXRankTyp = /** @class */ (function () {
        function WXRankTyp() {
        }
        /**
         * 授权按钮
         */
        WXRankTyp.AUTHORIZE = 0;
        /**
         * 好友排行榜
         */
        WXRankTyp.FRIEND = 1;
        /**
         * 世界排行榜
         */
        WXRankTyp.WROLD = 2;
        return WXRankTyp;
    }());
    devil.WXRankTyp = WXRankTyp;
})(devil || (devil = {}));
