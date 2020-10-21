declare namespace devil {
    /**
     * List组件
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class List extends Container {
        /**
         * 方向垂直
         */
        static VERTICAL: number;
        /**
         * 水平方向
         */
        static HORIZONTAL: number;
        private _scrollPolicyV;
        private _scrollPolicyH;
        private _container;
        private _scroll;
        private _layout;
        private _layer;
        get scrollPolicyV(): ScrollPolicy;
        set scrollPolicyV(value: ScrollPolicy);
        get scrollPolicyH(): ScrollPolicy;
        set scrollPolicyH(value: ScrollPolicy);
        get container(): IListContainer;
        set container(value: IListContainer);
        get layout(): number;
        set layout(value: number);
        set bounces(value: boolean);
        constructor();
        protected initLayer(): void;
        protected start(): void;
        unuse(): void;
        dispose(): void;
    }
}
