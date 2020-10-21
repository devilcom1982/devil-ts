declare namespace devil {
    /**
     * 动画与特效
     * @author        devil
     * @version       V20190225
     * @create        2019-02-25
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class Animation extends Container {
        /**
         * 帧动画的时间间隔
         */
        static ANIMATION_INTERVAL: number;
        private _image;
        private _cvo;
        private _currentFrame;
        private _currentCount;
        private _path;
        private _autoPlay;
        private _playCompleteDispose;
        private _repeate;
        private _loadCompletes;
        private _data;
        private _nextFrame;
        private _currentTime;
        private _resPriorityType;
        private _playCompleteFun;
        private _failFun;
        private _resourceGCType;
        private _layer;
        ids: number[];
        get currentFrame(): number;
        get totalFrame(): number;
        get url(): string;
        constructor();
        protected initLayer(): void;
        protected start(): void;
        protected addToStage(): void;
        protected removeFromStage(): void;
        private load;
        private goto;
        gotoAndStop(frame: number): void;
        gotoAndPlay(frame: number): void;
        private playComplete;
        play(): void;
        stop(): void;
        private init;
        /**
         * resourceGCType  default ResourceGCType.ANIMATION
         */
        update(path: PathInfo, cvo: IAnimationCVO, resPriorityType: number, resourceGCType?: number, autoPlay?: boolean, playCompleteDispose?: boolean): void;
        protected draw(): void;
        private drawSize;
        unuse(): void;
        dispose(): void;
        /**
         * 播放完成
         */
        __playComplete(callBack: () => void, target: any, ...args: any[]): void;
        __fail(callBack: Function, target: any, ...args: any[]): void;
        private ___complete;
        private ___render;
        private ___fail;
    }
}
