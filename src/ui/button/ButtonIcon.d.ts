declare namespace devil {
    /**
     * 图标按钮
     * @author        devil
     * @version       V20190211
     * @create        2019-02-11
     * @update 	      devil        2019-03-07        优化图标按钮布局自动根据长宽设置，不需要手动设置图标长宽
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ButtonIcon extends ButtonImage {
        private _iconOffsetX;
        private _iconOffsetY;
        private _iconLayer;
        protected _iconX: number;
        protected _iconY: number;
        protected _icon: Image;
        protected _iconStyleName: string;
        protected _iconWidth: number;
        protected _iconHeight: number;
        constructor();
        protected initLayer(): void;
        /**
         * @private
         */
        protected start(): void;
        /**
         * @private
         */
        protected setDefaultStyle(): void;
        /**
         * @private
         */
        protected draw(): void;
        /**
         * @private
         */
        protected drawState(): void;
        protected drawIconSkin(styleName: string): void;
        /**
         * 设置图标的偏移量
         * @param x
         * @param y
         */
        setIconOffset(x: number, y: number): void;
        private drawLayout;
        /**
         * @private
         */
        unuse(): void;
        /**
         * @private
         */
        dispose(): void;
        private ___complete;
    }
}
