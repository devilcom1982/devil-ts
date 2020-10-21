var devil;
(function (devil) {
    /**
     * 微信用户信息
     * @author        devil
     * @version       V20200906
     * @create        2020-09-24
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var WXUserInfo = /** @class */ (function () {
        function WXUserInfo() {
            /**
             * 最高分数
             */
            this.maxScore = 0;
        }
        WXUserInfo.prototype.parse = function (data) {
            this.nickName = data.nickName;
            this.avatarUrl = data.avatarUrl;
            this.gender = data.gender;
            this.country = data.country;
            this.province = data.province;
            this.city = data.city;
        };
        return WXUserInfo;
    }());
    devil.WXUserInfo = WXUserInfo;
})(devil || (devil = {}));
