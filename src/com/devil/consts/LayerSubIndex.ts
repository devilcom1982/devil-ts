namespace devil
{
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
    export class LayerSubIndex
    {
        public static  ELEMENT_EFFECT_BOTTOM = 0;//场景底部对象层
        public static  ELEMENT_SHADOW = 1;//场景对象阴影层
        public static  ELEMENT1 = 2;//场景对象层，不需要排序，放在elementLayer2下层
        public static  ELEMENT2 = 3;//场景对象层，需要排序，放在elementLayer1上层
        public static  ELEMENT_HEAD_VIP = 4;
        public static  ELEMENT_HEAD_TXT = 5;
        public static  ELEMENT_HEAD_TITLE = 6;
        public static  ELEMENT_HEAD_BLOOD = 7;
        public static  ELEMENT_EFFECT_TOP = 8;//顶部技能特效层
        public static  ELEMENT_SCT = 9//sct对象层

        public static  UI_HOME_IMAGE = 0;
        public static  UI_HOME = 1;
        public static  UI_HOME_EFFECT = 2;
        public static  UI_PANEL_DARK = 3;
        public static  UI_COMMON = 4;
        public static  UI_IMAGE = 5;
        public static  UI_NUM:number = 6;
        public static  UI_EFFECT = 7;//特效或文本层
        public static  UI_COMMON1 = 8;
        public static  UI_ALERT_MODE = 9;
        public static  UI_ALERT:number = 10;
        public static  UI_ALERT_MODE2 = 11;
        public static  UI_ALERT2:number = 12;
        public static  UI_TIP_MODE:number = 13;
        public static  UI_TIP:number = 14;
        public static  UI_LOADING:number = 15;
        public static  UI_MASSAGE:number = 16;
        public static  UI_GM = 17;
    }
}