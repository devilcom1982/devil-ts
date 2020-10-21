declare namespace devil {
    /**
     * 选中按钮图标
     * @author        devil
     * @version       V201190215
     * @create        2019-02-15
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ButtonIconSelected extends ButtonIcon {
        protected _common: ButtonSelectedBase;
        get common(): ButtonSelectedBase;
        constructor();
        protected start(): void;
        /**
         * @private
         */
        protected setDefaultStyle(): void;
        protected drawState(): void;
        setEnabled(value: boolean): void;
        protected ___handleEvent(e: egret.Event): void;
        unuse(): void;
        dispose(): void;
    }
}
