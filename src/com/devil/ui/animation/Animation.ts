namespace devil
{
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
    export class Animation extends Container
    {
        /**
         * 帧动画的时间间隔
         */
        public static ANIMATION_INTERVAL:number = 33;

        private _image:Image;
        private _cvo:IAnimationCVO;
        private _currentFrame:number;
        private _currentCount:number;//标记正在播放的是第几遍
        private _path:PathInfo;
        private _autoPlay:boolean;
        private _playCompleteDispose:boolean;
        private _repeate:number;
        private _loadCompletes:CallBackInfo[];
        private _data:AnimationData;
        private _nextFrame:number;
        private _currentTime:number;
        private _resPriorityType:number;
        private _playCompleteFun:CallBackInfo;
        private _failFun:CallBackInfo;
        private _resourceGCType:number;
        private _layer:egret.DisplayObjectContainer;

        public ids:number[];

        public get currentFrame()
        {
            return this._currentFrame;
        }

        public get totalFrame()
        {
            return this._cvo.totalFrame
        }

        public get url()
        {
            return (this._path ? this._path.urls[0] : "");
        }

        public constructor()
        {
            super();
            this._loadCompletes = [];
        }

        protected initLayer():void
        {
            this._layer = this.createLayer();
        }

        protected start():void
        {
            super.start();
            this.init();
            this._image = View.create(Image);
            this.addChild(this._image,this._layer);
        }

        protected addToStage():void
        {
            if(this._autoPlay)this.play();
        }

        protected removeFromStage():void
        {
            this.stop();
        }

        private load():void
        {
            Manager.loader.load(this._path,this.___complete,this,this._resourceGCType,this._resPriorityType,this.___fail,this);
        }

        private goto(frame:number):void
        {
            let that = this;
            frame = MathUtil.clamb(1,that._cvo.totalFrame,frame);
            that._currentFrame = frame;
            let index:number = that._cvo.frames.indexOf(that._currentFrame);
            if(index != -1)
            {
                that._nextFrame = ((index + 1) >= that._cvo.frames.length) ? 10000 : that._cvo.frames[index + 1];
                let frameData:AnimationFrameData = that.ids ? that._data.getKeyFrameData(this.ids[index]):that._data.getKeyFrameData(index+1);
                that._image.move(-that._cvo.offsetX + frameData.offX,-that._cvo.offsetY + frameData.offY);
                this._image.setSize(-1,-1);
                that._image.source = frameData.texture;
            }
        }

        public gotoAndStop(frame:number):void
        {
            if(this._data == null)
            {
                this._loadCompletes.push(CallBackInfo.create(this.gotoAndStop,this,frame));
            }
            else
            {
                this.stop();
                this._currentTime = frame * Manager.stage.frameTime;
                this.goto(frame);
            }
        }

        public gotoAndPlay(frame:number):void
        {
            if(this._data == null)
            {
                this._loadCompletes.push(CallBackInfo.create(this.gotoAndPlay,this,frame));
            }
            else
            {
                this.play();
                this._currentTime = frame * Manager.stage.frameTime;
                this.goto(frame);
            }
        }

        private playComplete():void
        {
            if(this._playCompleteFun)this._playCompleteFun.runCallBack(); 
            if(this._playCompleteDispose)this.pool();
            else 
            {
                this.stop();
                this._repeate = (this._cvo.wrapMode <= 0) ? -1 : this._cvo.wrapMode;
            }
        }

        public play():void
        {
            if(this._data && this._layer.stage)
            {
                if(this._cvo.totalFrame > 1)Manager.render.add(this.___render,this);
                else if(this._cvo.totalFrame == 1)this.gotoAndStop(1);
            }
        }
        
        public stop():void
        {
            Manager.render.remove(this.___render,this);
        }

        private init():void
        {
            this._currentCount = 1;
            this._currentFrame = 1;
            this._nextFrame = 10000;
            this._currentTime = 0; 
        }

        /**
         * resourceGCType  default ResourceGCType.ANIMATION
         */
        public update(path:PathInfo,cvo:IAnimationCVO,resPriorityType:number,resourceGCType:number = 3,autoPlay:boolean = true,playCompleteDispose:boolean = true):void
        {
            if(this._path == path)return;
            this.stop();
            this.init();
            this._layer.touchEnabled = this._layer.touchChildren = false;
            this._image.source = null;
            this._data = null;
            if(this._playCompleteFun)this._playCompleteFun.pool();
            this._playCompleteFun = null;
            if(this._failFun)this._failFun.pool();
            this._failFun = null;
            for(let i:number = 0 ; i < this._loadCompletes.length; i ++)
            {
                this._loadCompletes[i].pool();
            }
            this._loadCompletes.length = 0;
            if(this._path != null)Manager.loader.remove(this._path,this.___complete,this,this.___fail,this);
            this._path = path;
            this._cvo = cvo;
            this._resourceGCType = resourceGCType;
            this._resPriorityType = resPriorityType;
            this._autoPlay = autoPlay;
            this._playCompleteDispose = playCompleteDispose;
            this._repeate = cvo.wrapMode <= 0 ? -1 : cvo.wrapMode;
            this.scaleX = cvo.scale;
            this.scaleY = cvo.scale;
            this.load();
        }

        protected draw():void
        {
            super.draw();
            if(this.isInvalid(InvalidationType.SIZE))this.drawSize();
        }

        private drawSize():void
        {
            this._layer.width = this._width;
            this._layer.height = this._height;
        }

        public unuse():void
        {
            this.stop();
            this.ids = null;
            this._image = null;
            this._cvo = null;
            Manager.loader.remove(this._path,this.___complete,this,this.___fail,this);
            this._path = null;
            this._data = null;
            if(this._playCompleteFun)this._playCompleteFun.pool();
            this._playCompleteFun = null;
            if(this._failFun)this._failFun.pool();
            this._failFun = null;
            this._layer = null;
            for(let i:number = 0 ; i < this._loadCompletes.length; i ++)
            {
                this._loadCompletes[i].pool();
            }
            this._loadCompletes.length = 0;
            super.unuse();
        }

        public dispose():void
        {
            this.stop();
            this.ids = null;
            this._image = null;
            this._cvo = null;
            Manager.loader.remove(this._path,this.___complete,this,this.___fail,this);
            this._path = null;
            this._data = null;
            if(this._playCompleteFun)this._playCompleteFun.pool();
            this._playCompleteFun = null;
            if(this._failFun)this._failFun.pool();
            this._failFun = null;
            this._layer = null;
            for(let i:number = 0 ; i < this._loadCompletes.length; i ++)
            {
                this._loadCompletes[i].pool();
            }
            this._loadCompletes = null;
            super.dispose();
        }
        
        /**
         * 播放完成
         */
        public __playComplete(callBack:()=>void,target:any,...args):void
        {
            this._playCompleteFun = CallBackInfo.create(callBack,target,...args);
        }

        public __fail(callBack:Function,target:any,...args):void
        {
            this._failFun = CallBackInfo.create(callBack,target,...args);
        }

        private ___complete(loader:AnimationLoader):void
        {
            this._data = loader.sheet;
            let len:number = this._loadCompletes.length;
            if(len > 0)
            {
                for(let i:number = 0 ; i < len; i ++)
                {
                    this._loadCompletes[i].runCallBack();
                    this._loadCompletes[i].pool();
                }
                this._loadCompletes.length = 0;
            }
            else
            {
                if(this._autoPlay)this.play();
            }
        }

        private ___render(interval:number):void
        {
            let that = this;
            that.goto(that._currentFrame);
            that._currentTime += Math.max(interval,Manager.stage.frameTime);
            that._currentFrame = Math.ceil(that._currentTime / Animation.ANIMATION_INTERVAL);
            if(that._currentFrame > that._nextFrame)that._currentFrame = that._nextFrame;
            if(that._currentFrame > that._cvo.totalFrame)
            {
                that._currentTime = Manager.stage.frameTime;
                that._currentFrame = 1;
                if(that._repeate > 0)
                {
                    that._currentCount ++;
                    that._repeate --;
                    if(that._repeate <= 0)that.playComplete();
                }
            }
        }

        private ___fail(loader:AnimationLoader):void
        {
            if(loader.getPath() != this._path)return;
            if(this._failFun)this._failFun.runCallBack();
        }
    }
}