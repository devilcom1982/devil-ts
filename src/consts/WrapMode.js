var devil;
(function (devil) {
    /**
     * 角色常用动作循环常量
     * @author        devil
     * @version       V20200817
     * @create        2020-08-17
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var WrapMode = /** @class */ (function () {
        function WrapMode() {
        }
        WrapMode.LOOP = 1;
        WrapMode.ONCE = 2;
        return WrapMode;
    }());
    devil.WrapMode = WrapMode;
})(devil || (devil = {}));
