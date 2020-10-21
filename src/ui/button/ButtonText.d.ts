declare namespace devil {
    /**
     * 文本按钮
     * @author        devil
     * @version       V20190418
     * @create        V2019-04-18
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ButtonText extends ButtonImage {
        protected _txtLayer: egret.DisplayObjectContainer;
        protected _label: Text;
        protected _labelOffsetX: number;
        protected _labelOffsetY: number;
        protected _labelX: number;
        protected _labelY: number;
        /**
         * 文本实例
         */
        get label(): Text;
        /**
         * 设置按钮的文本显示内容
         */
        set text(value: string);
        get text(): string;
        constructor();
        protected initLayer(): void;
        protected start(): void;
        protected draw(): void;
        protected drawSize(): void;
        protected drawState(): void;
        /**
         * 设置文本的偏移量
         * @param x
         * @param y
         */
        setLabelOffset(x: number, y: number): void;
        protected drawLayout(): void;
        unuse(): void;
        dispose(): void;
    }
}
