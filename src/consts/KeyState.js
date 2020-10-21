var devil;
(function (devil) {
    /**
     * 键盘按下或抬起状态枚举
     * @author        devil
     * @version       V20200219
     * @create        2020-02-19
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var KeyState;
    (function (KeyState) {
        KeyState[KeyState["KEY_DOWN"] = 0] = "KEY_DOWN";
        KeyState[KeyState["KEY_UP"] = 1] = "KEY_UP";
    })(KeyState = devil.KeyState || (devil.KeyState = {}));
})(devil || (devil = {}));
