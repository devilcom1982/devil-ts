declare namespace devil {
    /**
     * 延时机制的非视图基类
     * @author        devil
     * @version       V20190826
     * @create        2019-08-26
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class BaseRender implements IPool {
        protected _invalid: number;
        protected _isPool: boolean;
        constructor();
        protected start(): void;
        protected startCallLater(): void;
        /**
         * 强制重绘
         */
        repaint(): void;
        private validate;
        /**
         * Included the first property as a proper param to enable *some* type checking, and also because it is a required param.
         * @param property
         * @param properties
         * @return
         */
        protected isInvalid(property: number, ...properties: any[]): boolean;
        /**
         * 绘制方法,子类重写
         */
        protected draw(): void;
        /**
         * 在未另外指定的情况下，将属性标记为无效，并在下一帧上重绘组件。
         * @param property   要使其无效的属性
         */
        invalidate(property: number): void;
        unuse(): void;
        reuse(): void;
        /**
         * 回收
         */
        pool(): void;
        dispose(): void;
    }
}
