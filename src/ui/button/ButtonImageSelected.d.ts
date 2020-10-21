declare namespace devil {
    /**
     * 图片选择按钮
     * @author        devil
     * @version       V20190227
     * @create        2019-02-27
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ButtonImageSelected extends ButtonImage {
        protected _common: ButtonSelectedBase;
        get common(): ButtonSelectedBase;
        constructor();
        protected start(): void;
        protected setDefaultStyle(): void;
        protected drawState(): void;
        unuse(): void;
        dispose(): void;
        protected ___handleEvent(e: egret.Event): void;
    }
}
