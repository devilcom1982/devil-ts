var devil;
(function (devil) {
    /**
     * 开放域的常用
     * @author        devil
     * @version       V20200921
     * @create        2020-09-21
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var OpenDataMessageType = /** @class */ (function () {
        function OpenDataMessageType() {
        }
        /**
         * 初始化好友排行榜
         */
        OpenDataMessageType.INIT_FRIEND_RANK = "initFriendRank";
        /**
         * 切换排行榜
         */
        OpenDataMessageType.SWITCH_RANK = "showRank";
        /**
         * 翻页
         */
        OpenDataMessageType.UPDATE_PAGE = "updatePage";
        /**
         * 初始化
         */
        // public static INIT:string = "init";
        /**
         * 超越下一个好友
         */
        OpenDataMessageType.NEXT_FRIEND = "nextFriend";
        /**
         * 保存数据
         */
        OpenDataMessageType.SAVE_DATA = "saveData";
        return OpenDataMessageType;
    }());
    devil.OpenDataMessageType = OpenDataMessageType;
})(devil || (devil = {}));
