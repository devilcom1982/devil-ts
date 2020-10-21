declare namespace devil {
    /**
     * 声音管理器
     * @author        devil
     * @version       V20190405
     * @create        2019-004-05
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class SoundManager {
        private _ismute;
        private _sounds;
        private _backSound;
        private _backPath;
        private _backVolume;
        private _effectVolume;
        /**
         * 静音，静音打开时是暂停播放、静音关闭时是继续播放
         */
        get ismute(): boolean;
        set ismute(value: boolean);
        /**
         * 0-1
         */
        get backVolume(): number;
        set backVolume(value: number);
        /**
         * 0-1
         */
        get effectVolume(): number;
        set effectVolume(value: number);
        constructor();
        playBackSound(path?: PathInfo): void;
        private play;
        playEffectSound(path: PathInfo): void;
        stopBackSound(): void;
        private ___touchTab;
    }
    class SoundObject {
        static READY: number;
        static PLAYYING: number;
        private _loops;
        private _playFlag;
        private _path;
        private _loadComplete;
        private _type;
        private _sound;
        private _soundChannel;
        private _startTime;
        get path(): PathInfo;
        get playFlag(): number;
        set volume(value: number);
        constructor(type: string, path: PathInfo);
        load(): void;
        private startPlay;
        private stopChannel;
        play(loops?: number): void;
        stop(): void;
        pause(): void;
        plugs(): void;
        private ___complete;
        private ___ioError;
        private ___playComplete;
    }
}
