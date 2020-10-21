var devil;
(function (devil) {
    /**
     * 按钮状态
     * @author        devil
     * @version       V20190211
     * @create        2019-02-11
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ButtonState;
    (function (ButtonState) {
        ButtonState[ButtonState["UP"] = 0] = "UP";
        ButtonState[ButtonState["DOWN"] = 1] = "DOWN";
        ButtonState[ButtonState["SELECTED"] = 2] = "SELECTED";
        ButtonState[ButtonState["DISANABLED"] = 3] = "DISANABLED";
    })(ButtonState = devil.ButtonState || (devil.ButtonState = {}));
})(devil || (devil = {}));
