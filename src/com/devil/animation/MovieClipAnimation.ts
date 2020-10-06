namespace devil
{
    /**
     * MC帧动画
     * @author  devil
     * @version V20190909
     * @create  2019-09-09
     * @place   guangzhou
     */
    export class MovieClipAnimation extends View
    {
        private _layer:egret.DisplayObjectContainer;
        private _display:egret.MovieClip;
        private _source:string;
        private _path:PathInfo;
        private _action:string;
        private _playComplete:CallBackInfo;
        private _data:egret.MovieClipDataFactory;
        private _playTimes:number;

        public set path(value:PathInfo)
        {
            if(this._path == value)return;
            this.clear();
            this._path = value;
            if(this._path != null)
            {
                let index = value.key.lastIndexOf("/");
                this._source = value.key.slice(index + 1,value.key.length - 8);
                // let factory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(this.data, this.texture);
                // if(factory.getTextureAtlasData(this._source) && factory.getDragonBonesData(this._source)) this.createDisplay();//已有数据，则直接创建
                // else this.loadData();//还没有数据，先加载数据
                this.loadData();
            }
        }

        public constructor()
        {
            super();
        }

        protected initLayer():void
        {
            this._layer = this.createLayer();
        }

        protected start():void
        {
            super.start();
            this._playTimes = 0;
            this._isPool = false;
        }

    	private loadData():void
        {
            Manager.loader.load(this._path,this.___complete,this,ResourceGCType.NEVER);
        }

        private clear():void
        {
            if(!StringUtil.isEmpty(this._source))
            {
                Manager.loader.remove(this._path,this.___complete,this);
            }
            if(this._display)
            {
                this._display.removeEventListener(dragonBones.EventObject.COMPLETE, this.___playComplete,this);
                this._display.parent.removeChild(this._display);
                this._display = null;
            }
        }

        protected addToStage():void
        {
            this.play(this._playTimes);
        }

        protected removeFromStage():void
        {
            this.stop();
        }

        /**
         * - 播放指定动画。
         * @param playTimes - 循环播放次数。默认值为0 [0: 无限循环播放, [1~N]: 循环播放 N 次]
        */
        public play(playTimes?:number):void
        {
            if(this._display != null)this._display.play(playTimes);
        }

    
        /**
         * 停止动画播放
         * @see dragonBones.AnimationState
         * @version DragonBones 3.0
         * @language zh_CN
         */
        public stop():void
        {
            if(this._display != null)this._display.stop();
        }

        public unuse():void
        {
            this.clear();
            this._layer = null;
            this._path = null;
            this._action = undefined;
            if(this._playComplete)this._playComplete.pool();
            this._playComplete = null;
            super.unuse();
        }
    
        public dispose():void
        {
            this.clear();
            this._layer = null;
            this._path = null;
            if(this._playComplete)this._playComplete.pool();
            this._playComplete = null;
            super.dispose();
        }

        private ___complete(loader:MovieClipLoader):void
        {
            //添加保存数据
            //创建动画
            this._data = loader.data;
            this._display = new egret.MovieClip(this._data.generateMovieClipData(this._source));
            this._display.addEventListener(egret.Event.COMPLETE,this.___playComplete,this);
            this._layer.addChild(this._display);
            if(this._layer.stage) this.play(this._playTimes);
        }

        public __playComplete(callBack:()=>void,target:any):void
        {
            this._playComplete = CallBackInfo.create(callBack,target);
        }

        private ___playComplete(e?:dragonBones.AnimationEvent):void
        {
            if(this._playComplete != null)this._playComplete.runCallBack();
        }
    }
}