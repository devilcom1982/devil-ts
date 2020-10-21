declare namespace devil {
    /**
     * 选中图标与背景图片合为一张背景图
     * @author        devil
     * @version       V20200118
     * @create        V2020-01-18
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class RadioButton extends ButtonTextSelected implements IRadioSelected {
        private _selector;
        setSelected(value: boolean): void;
        getSelected(): boolean;
        setSelector(value: RadioSelector): void;
        constructor();
        protected start(): void;
        protected drawSize(): void;
        protected drawLayout(): void;
        unuse(): void;
        dispose(): void;
        protected ___handleEvent(e: egret.TouchEvent): void;
    }
}
