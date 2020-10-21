declare namespace devil {
    /**
     * 选中图标与背景图片合为一张背景图
     * @author        devil
     * @version       V20190418
     * @create        V2019-04-18
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class CheckBox extends ButtonTextSelected {
        constructor();
        protected start(): void;
        protected drawSize(): void;
        protected drawLayout(): void;
    }
}
