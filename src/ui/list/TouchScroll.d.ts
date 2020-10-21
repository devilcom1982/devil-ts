declare namespace devil {
    class TouchScroll implements IDispose {
        private _updateFun;
        private _endFun;
        private _bounces;
        private _isStarted;
        private _isPlaying;
        private _currentPosition;
        private _maxScrollPos;
        private _offsetPoint;
        private _currentScrollPos;
        private _velocity;
        private _previousVelocity;
        private _previousPosition;
        private _duration;
        private _from;
        private _to;
        private _currentValue;
        private _scrollFactor;
        private _playStartTime;
        private _startTime;
        /**
         * 是否正在播放动画，不包括延迟等待和暂停的阶段
         */
        get isPlaying(): boolean;
        set bounces(value: boolean);
        /**
         * true表示已经调用过start方法。
         */
        isStarted(): () => any;
        /**
         * 当前容器滚动外界可调节的系列
         */
        get scrollFactor(): number;
        set scrollFactor(value: number);
        constructor(updateFunction: (scrollPos: number, target: TouchScroll) => void, endFunction: (target: TouchScroll) => void, target: any);
        /**
         * @private
         * 开始记录位移变化。注意：当使用完毕后，必须调用 finish() 方法结束记录，否则该对象将无法被回收。
         * @param touchPoint 起始触摸位置，以像素为单位，通常是stageX或stageY。
         */
        start(touchPoint: number): void;
        /**
         * 如果正在执行缓动滚屏，停止缓动。
         */
        stop(): void;
        /**
         * 更新当前移动到的位置
         * @param touchPoint 当前触摸位置，以像素为单位，通常是stageX或stageY。
         */
        update(touchPoint: number, maxScrollValue: number, scrollValue: number): void;
        /**
         * 缓动到水平滚动位置
         */
        private tweenTo;
        private finishScrolling;
        /**
         * 停止记录位移变化，并计算出目标值和继续缓动的时间。
         * @param currentScrollPos 容器当前的滚动值。
         * @param maxScrollPos 容器可以滚动的最大值。当目标值不在 0~maxValue之间时，将会应用更大的摩擦力，从而影响缓动时间的长度。
         */
        finish(currentScrollPos: number, maxScrollPos: number): void;
        private easeOut;
        dispose(): void;
        private ___render;
    }
}
