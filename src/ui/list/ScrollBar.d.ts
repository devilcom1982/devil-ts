declare namespace devil {
    /**
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ScrollBar implements IPool {
        /**
         * 开始触发滚动的阈值（以像素为单位），当触摸点偏离初始触摸点的距离超过这个值时才会触发滚动。
         */
        static scrollThreshold: number;
        private _touchScrollH;
        private _touchScrollV;
        private _list;
        private _touchStartX;
        private _touchStartY;
        private _touchMoved;
        private _touchCancle;
        private _downTarget;
        private _horizontalCanScroll;
        private _verticalCanScroll;
        set list(value: List);
        /**
         * 是否启用回弹
         */
        set bounces(value: boolean);
        constructor();
        private start;
        private removeEvent;
        /**
         * 停止滚动的动画
         */
        private stopAnimation;
        checkScrollPolicy(): boolean;
        private checkVH;
        private dispatchBubbleEvent;
        pool(): void;
        reuse(): void;
        unuse(): void;
        dispose(): void;
        private ___touchBegin;
        private ___touchEnd;
        private ___touchTap;
        private ___touchMove;
        private ___update;
    }
}
