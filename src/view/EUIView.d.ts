declare namespace devil {
    /**
     * EUI带有皮肤的基类
     * @author        devil
     * @version       V20190826
     * @create        2019-08-26
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class EUIView extends eui.Component implements eui.UIComponent {
        protected _invalid: number;
        protected _loadComplete: boolean;
        protected _isPool: boolean;
        constructor();
        protected start(): void;
        private ___addedToStage;
        private startCallLater;
        /**
         * 强制重绘
         */
        repaint(): void;
        private validate;
        /**
     * 在未另外指定的情况下，将属性标记为无效，并在下一帧上重绘组件。
     * @param property   要使其无效的属性
     */
        invalidate(property: number): void;
        /**
         * Included the first property as a proper param to enable *some* type checking, and also because it is a required param.
         * @param property
         * @param properties
         * @return
         */
        protected isInvalid(property: number, ...properties: any[]): boolean;
        move(x: number, y: number): void;
        protected draw(): void;
        private drawInit;
        protected configUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        addViewChild(child: View, ...layers: egret.DisplayObjectContainer[]): void;
        addViewChildAt(child: View, index: number): void;
        dispose(): void;
        private ___removedFromStage;
        private ___complete;
    }
}
