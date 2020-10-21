var devil;
(function (devil) {
    /**
     * 游戏中的二级分层常量
     * @author        devil
     * @version       V20190425
     * @create        2019-04-25
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var LayerSubIndex = /** @class */ (function () {
        function LayerSubIndex() {
        }
        LayerSubIndex.ELEMENT_EFFECT_BOTTOM = 0; //场景底部对象层
        LayerSubIndex.ELEMENT_SHADOW = 1; //场景对象阴影层
        LayerSubIndex.ELEMENT1 = 2; //场景对象层，不需要排序，放在elementLayer2下层
        LayerSubIndex.ELEMENT2 = 3; //场景对象层，需要排序，放在elementLayer1上层
        LayerSubIndex.ELEMENT_HEAD_VIP = 4;
        LayerSubIndex.ELEMENT_HEAD_TXT = 5;
        LayerSubIndex.ELEMENT_HEAD_TITLE = 6;
        LayerSubIndex.ELEMENT_HEAD_BLOOD = 7;
        LayerSubIndex.ELEMENT_EFFECT_TOP = 8; //顶部技能特效层
        LayerSubIndex.ELEMENT_SCT = 9; //sct对象层
        LayerSubIndex.UI_HOME_IMAGE = 0;
        LayerSubIndex.UI_HOME = 1;
        LayerSubIndex.UI_HOME_EFFECT = 2;
        LayerSubIndex.UI_PANEL_DARK = 3;
        LayerSubIndex.UI_COMMON = 4;
        LayerSubIndex.UI_IMAGE = 5;
        LayerSubIndex.UI_NUM = 6;
        LayerSubIndex.UI_EFFECT = 7; //特效或文本层
        LayerSubIndex.UI_COMMON1 = 8;
        LayerSubIndex.UI_ALERT_MODE = 9;
        LayerSubIndex.UI_ALERT = 10;
        LayerSubIndex.UI_ALERT_MODE2 = 11;
        LayerSubIndex.UI_ALERT2 = 12;
        LayerSubIndex.UI_TIP_MODE = 13;
        LayerSubIndex.UI_TIP = 14;
        LayerSubIndex.UI_LOADING = 15;
        LayerSubIndex.UI_MASSAGE = 16;
        LayerSubIndex.UI_GM = 17;
        return LayerSubIndex;
    }());
    devil.LayerSubIndex = LayerSubIndex;
})(devil || (devil = {}));
