var devil;
(function (devil) {
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
    var SoundManager = /** @class */ (function () {
        function SoundManager() {
            this._ismute = false;
            this._sounds = {};
            this._backVolume = 1;
            this._effectVolume = 1;
            devil.Manager.stage.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.___touchTab, this);
        }
        Object.defineProperty(SoundManager.prototype, "ismute", {
            /**
             * 静音，静音打开时是暂停播放、静音关闭时是继续播放
             */
            get: function () {
                return this._ismute;
            },
            set: function (value) {
                if (this._ismute == value)
                    return;
                this._ismute = value;
                if (this._backSound) {
                    if (this._ismute)
                        this._backSound.pause();
                    else {
                        this.playBackSound(null);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundManager.prototype, "backVolume", {
            /**
             * 0-1
             */
            get: function () {
                return this._backVolume;
            },
            set: function (value) {
                if (this._backVolume == value)
                    return;
                this._backVolume = value;
                if (this._backSound)
                    this._backSound.volume = this._backVolume;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundManager.prototype, "effectVolume", {
            /**
             * 0-1
             */
            get: function () {
                return this._effectVolume;
            },
            set: function (value) {
                this._effectVolume = value;
            },
            enumerable: true,
            configurable: true
        });
        SoundManager.prototype.playBackSound = function (path) {
            if (this._backPath == path)
                return;
            this._backPath = path ? path : this._backPath;
            this.play();
        };
        SoundManager.prototype.play = function () {
            if (devil.Model.lifecyclePause || this._ismute)
                return; //进入后台或静音不播放
            if (this._backSound) {
                if (this._backSound.path == this._backPath) {
                    if (this._backSound.playFlag == SoundObject.READY)
                        this._backSound.play();
                }
                else {
                    this._backSound.stop();
                    this._backSound = null;
                }
            }
            if (!this._backSound) {
                this._backSound = this._sounds[this._backPath.key];
                if (!this._backSound) {
                    this._backSound = new SoundObject(egret.Sound.MUSIC, this._backPath);
                    this._backSound.load();
                    this._sounds[this._backPath.key] = this._backSound;
                }
                this._backSound.play();
            }
        };
        SoundManager.prototype.playEffectSound = function (path) {
            if (this._ismute || devil.Model.lifecyclePause)
                return;
            var sound = this._sounds[path.key];
            if (!sound) {
                sound = new SoundObject(egret.Sound.EFFECT, path);
                sound.load();
                this._sounds[path.key] = sound;
            }
            sound.play(1);
        };
        SoundManager.prototype.stopBackSound = function () {
            if (this._backSound)
                this._backSound.stop();
        };
        SoundManager.prototype.___touchTab = function (e) {
            if (this._backSound)
                this._backSound.plugs();
        };
        return SoundManager;
    }());
    devil.SoundManager = SoundManager;
    var SoundObject = /** @class */ (function () {
        function SoundObject(type, path) {
            this._type = type;
            this._path = path;
            this._loops = 1;
            this._playFlag = SoundObject.READY;
            this._loadComplete = false;
            this._startTime = 0;
        }
        Object.defineProperty(SoundObject.prototype, "path", {
            get: function () {
                return this._path;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundObject.prototype, "playFlag", {
            get: function () {
                return this._playFlag;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundObject.prototype, "volume", {
            set: function (value) {
                if (this._soundChannel)
                    this._soundChannel.volume = value;
            },
            enumerable: true,
            configurable: true
        });
        SoundObject.prototype.load = function () {
            if (this._sound == null) {
                try {
                    this._sound = new egret.Sound();
                    this._sound.type = this._type;
                    this._sound.addEventListener(egret.Event.COMPLETE, this.___complete, this);
                    this._sound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.___ioError, this);
                    this._sound.load(this._path.urls[0]);
                }
                catch (e) {
                    devil.Manager.log.trace(devil.LogType.ERROR, "Sound Error:声音音频问题！");
                }
            }
        };
        SoundObject.prototype.startPlay = function () {
            if (this._soundChannel == null) {
                try {
                    this._soundChannel = this._sound.play(this._startTime, this._loops);
                    this._soundChannel.volume = this._type == egret.Sound.MUSIC ? devil.Manager.sound.backVolume : devil.Manager.sound.effectVolume;
                    this._soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.___playComplete, this);
                }
                catch (e) {
                    this.stop();
                }
            }
        };
        SoundObject.prototype.stopChannel = function () {
            if (this._soundChannel != null) {
                this._soundChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.___playComplete, this);
                try {
                    this._soundChannel.stop();
                }
                catch (e) {
                    devil.Manager.log.trace(devil.LogType.ERROR, "声音停止报错：", e);
                }
                this._soundChannel = null;
            }
        };
        SoundObject.prototype.play = function (loops) {
            if (loops === void 0) { loops = 0; }
            if (this._playFlag == SoundObject.PLAYYING)
                return;
            this._playFlag = SoundObject.PLAYYING;
            this._loops = loops;
            if (this._loadComplete)
                this.startPlay();
        };
        SoundObject.prototype.stop = function () {
            this.stopChannel();
            this._playFlag = SoundObject.READY;
            this._startTime = 0;
        };
        SoundObject.prototype.pause = function () {
            this._playFlag = SoundObject.READY;
            this._startTime = (this._soundChannel != null) ? this._soundChannel.position : 0;
            if (this._loadComplete && (this._sound.length - this._startTime) < 10)
                this._startTime = 0;
            this.stopChannel();
        };
        SoundObject.prototype.plugs = function () {
            if (!this._loadComplete)
                return;
            if (this._soundChannel == null)
                return;
            var pos = this._soundChannel.position;
            if (pos == 0) {
                //解决三星G5700不自动播放声音的问题
                this.stop();
                this.startPlay();
            }
        };
        SoundObject.prototype.___complete = function (e) {
            this._loadComplete = true;
            if (this._playFlag == SoundObject.PLAYYING)
                this.startPlay();
        };
        SoundObject.prototype.___ioError = function (e) {
            devil.Manager.log.trace(devil.LogType.ERROR, "Sound Error:", this._path.key);
            this._loadComplete = false;
        };
        SoundObject.prototype.___playComplete = function (e) {
            this.stopChannel();
            this._playFlag = SoundObject.READY;
            this._startTime = 0;
        };
        SoundObject.READY = 0;
        SoundObject.PLAYYING = 1;
        return SoundObject;
    }());
    devil.SoundObject = SoundObject;
})(devil || (devil = {}));
