declare namespace devil {
    /**
     * 选中图标与背景图是分开的
     * @author        devil
     * @version       V20190418
     * @create        V2019-04-18
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class CheckBox1 extends ButtonTextSelected {
        private _icon;
        constructor();
        protected start(): void;
        /**
          * @private
          */
        protected addEvent(): void;
        /**
         * @private
         */
        protected removeEvent(): void;
        protected setDefaultStyle(): void;
        protected draw(): void;
        protected drawSize(): void;
        private drawStyle;
        protected drawLayout(): void;
        protected drawSkin(styleName: string): void;
        unuse(): void;
        dispose(): void;
        private ___complete;
    }
}
