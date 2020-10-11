module devil
{
    /**
     * 开放域的常用
     * @author        devil
     * @version       V20200921
     * @create        2020-09-21
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    export class OpenDataMessageType
    {
        /**
         * 初始化好友排行榜
         */
        public static INIT_FRIEND_RANK:string = "initFriendRank";
        /**
         * 切换排行榜
         */
        public static SWITCH_RANK:string = "showRank";
        /**
         * 翻页
         */
        public static UPDATE_PAGE:string = "updatePage";
        /**
         * 初始化
         */
        public static INIT:string = "init";
        /**
         * 超越下一个好友
         */
        public static NEXT_FRIEND:string = "nextFriend";
        /**
         * 保存数据
         */
        public static SAVE_DATA:string = "saveData";
    }
}