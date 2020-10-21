declare namespace devil {
    /**
     * MC帧动画
     * @author  devil
     * @version V20190909
     * @create  2019-09-09
     * @place   guangzhou
     */
    class MovieClipAnimation extends View {
        private _layer;
        private _display;
        private _source;
        private _path;
        private _action;
        private _playComplete;
        private _data;
        private _playTimes;
        set path(value: PathInfo);
        constructor();
        protected initLayer(): void;
        protected start(): void;
        private loadData;
        private clear;
        protected addToStage(): void;
        protected removeFromStage(): void;
        /**
         * - 播放指定动画。
         * @param playTimes - 循环播放次数。默认值为0 [0: 无限循环播放, [1~N]: 循环播放 N 次]
        */
        play(playTimes?: number): void;
        /**
         * 停止动画播放
         * @see dragonBones.AnimationState
         * @version DragonBones 3.0
         * @language zh_CN
         */
        stop(): void;
        unuse(): void;
        dispose(): void;
        private ___complete;
        __playComplete(callBack: () => void, target: any): void;
        private ___playComplete;
    }
}
