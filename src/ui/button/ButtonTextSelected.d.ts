declare namespace devil {
    /**
     * @author        devil
     * @version       V20190418
     * @create        V2019-04-18
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ButtonTextSelected extends ButtonText {
        protected _common: ButtonSelectedBase;
        get common(): ButtonSelectedBase;
        constructor();
        protected start(): void;
        protected setDefaultStyle(): void;
        protected drawState(): void;
        unuse(): void;
        dispose(): void;
        protected ___handleEvent(e: egret.TouchEvent): void;
    }
}
