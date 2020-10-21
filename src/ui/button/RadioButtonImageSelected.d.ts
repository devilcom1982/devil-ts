declare namespace devil {
    /**
     * 单选图片选择按钮
     * @author        devil
     * @version       V20190227
     * @create        2019-02-27
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class RadioButtonImageSelected extends ButtonImageSelected implements IRadioSelected {
        private _selector;
        setSelected(value: boolean): void;
        getSelected(): boolean;
        setSelector(value: RadioSelector): void;
        unuse(): void;
        dispose(): void;
        protected ___handleEvent(e: egret.TouchEvent): void;
    }
}
