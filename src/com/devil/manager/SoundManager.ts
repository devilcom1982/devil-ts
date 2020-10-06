namespace devil
{
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
    export class SoundManager
    {
        private _ismute:boolean;
        private _sounds:any;
        private _backSound:SoundObject;
        private _backPath:PathInfo;
        private _backVolume:number;
        private _effectVolume:number;

        /**
         * 静音，静音打开时是暂停播放、静音关闭时是继续播放
         */
        public get ismute()
        {
            return this._ismute;
        }
        public set ismute(value:boolean)
        {
            if(this._ismute == value)return;
            this._ismute = value;
            if(this._backSound)
            {
                if(this._ismute)this._backSound.pause();
                else 
                {
                    this.playBackSound(null);
                }
            }
        }

        /**
         * 0-1
         */
        public get backVolume()
        {
            return this._backVolume;
        }

        public set backVolume(value:number)
        {
            if(this._backVolume == value)return;
            this._backVolume = value;
            if(this._backSound)this._backSound.volume = this._backVolume;
        }
        /**
         * 0-1
         */
        public get effectVolume()
        {
            return this._effectVolume;
        }

        public set effectVolume(value:number)
        {
            this._effectVolume = value;
        }

        public constructor()
        {
            this._ismute = false;
            this._sounds = {};
            this._backVolume = 1;
            this._effectVolume = 1;
            Manager.stage.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.___touchTab,this);
        }

        public playBackSound(path?:PathInfo):void
        {
            if(this._backPath == path)return;
            this._backPath = path ? path : this._backPath;
            this.play();
        }

        private play():void
        {
            if(Model.lifecyclePause || this._ismute)return;//进入后台或静音不播放
            if(this._backSound)
            {
                if(this._backSound.path == this._backPath)
                {
                    if(this._backSound.playFlag == SoundObject.READY)this._backSound.play();
                }
                else 
                {
                    this._backSound.stop();
                    this._backSound = null;
                }
            }
            if(!this._backSound)
            {
                this._backSound = this._sounds[this._backPath.key];
                if(!this._backSound)
                {
                    this._backSound = new SoundObject(egret.Sound.MUSIC,this._backPath);
                    this._backSound.load();
                    this._sounds[this._backPath.key] = this._backSound;
                }
                this._backSound.play();
            }
        }

        public playEffectSound(path:PathInfo):void
        {
            if(this._ismute || Model.lifecyclePause)return;
            let sound:SoundObject = this._sounds[path.key];
            if(!sound)
            {
                sound = new SoundObject(egret.Sound.EFFECT,path);
                sound.load();
                this._sounds[path.key] = sound;
            }
            sound.play(1);
        }

        public stopBackSound():void
        {
            if(this._backSound)this._backSound.stop();
        }

        private ___touchTab(e:egret.TouchEvent):void
        {
            if(this._backSound) this._backSound.plugs();
        }
    }
    export class SoundObject
    {
        public static READY:number = 0;
        public static PLAYYING:number = 1;
        private _loops:number;
        private _playFlag:number;
        private _path:PathInfo;
        private _loadComplete:boolean;
        private _type:string;
        private _sound:egret.Sound;
        private _soundChannel:egret.SoundChannel;
        private _startTime:number;
        public get path()
        {
            return this._path;
        }

        public get playFlag()
        {
            return this._playFlag;
        }
        
        public set volume(value:number)
        {
            if(this._soundChannel)this._soundChannel.volume = value;
        }

        public constructor(type:string,path:PathInfo)
        {
            this._type = type;
            this._path = path;
            this._loops = 1;
            this._playFlag = SoundObject.READY;
            this._loadComplete = false;
            this._startTime = 0;
        }

        public load():void
        {
            if (this._sound == null)
            {
                try
                {
                    this._sound = new egret.Sound();
                    this._sound.type = this._type;
                    this._sound.addEventListener(egret.Event.COMPLETE, this.___complete, this);
                    this._sound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.___ioError, this);
                    this._sound.load(this._path.urls[0]);
                }
                catch (e)
                {
                    Manager.log.trace(LogType.ERROR,"Sound Error:声音音频问题！");
                }
            }
        }

        private startPlay():void
        {
            if (this._soundChannel == null)
            {
                try
                {
                    this._soundChannel = this._sound.play(this._startTime, this._loops);
                    this._soundChannel.volume = this._type == egret.Sound.MUSIC ? Manager.sound.backVolume : Manager.sound.effectVolume;
                    this._soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.___playComplete, this);
                }
                catch(e)
                {
                    this.stop();
                }
            }
        }

        private stopChannel():void
        {
            if (this._soundChannel != null)
            {
                this._soundChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.___playComplete, this);
                try
                {
                    this._soundChannel.stop();
                }
                catch (e)
                {
                    Manager.log.trace(LogType.ERROR,"声音停止报错：", e);
                }
                this._soundChannel = null;
            }
        }


        public play(loops:number=0):void
        {
            if(this._playFlag == SoundObject.PLAYYING)return;
            this._playFlag = SoundObject.PLAYYING;
            this._loops = loops;
            if(this._loadComplete)this.startPlay();
        }

        public stop():void
        {
            this.stopChannel();
            this._playFlag = SoundObject.READY;
            this._startTime = 0;
        }

        public pause():void
        {
            this._playFlag = SoundObject.READY;
            this._startTime = (this._soundChannel != null) ? this._soundChannel.position : 0;
            if (this._loadComplete && (this._sound.length - this._startTime) < 10)this._startTime = 0;
            this.stopChannel();
        }

        public plugs():void
        {
            if (!this._loadComplete) return;
            if (this._soundChannel == null) return;
            let pos:number = this._soundChannel.position;
            if(pos == 0)
            {
                //解决三星G5700不自动播放声音的问题
                this.stop();
                this.startPlay();
            }
        }

        private ___complete(e:egret.Event):void
        {
            this._loadComplete = true;
            if (this._playFlag == SoundObject.PLAYYING)this.startPlay();
        }

        private ___ioError(e:egret.IOErrorEvent):void
        {
            Manager.log.trace(LogType.ERROR,"Sound Error:", this._path.key);
            this._loadComplete = false;
        }

        private ___playComplete(e:egret.Event):void
        {
            this.stopChannel();
            this._playFlag = SoundObject.READY;
            this._startTime = 0;
        }
    }
}