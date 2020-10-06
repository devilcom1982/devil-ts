namespace devil
{
	/**
     * 场景管理器
	 * @author        devil
	 * @version       V20190131
	 * @create        2019-01-31
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class StageManager
    {
        private _frameTime:number;
        private _callBacks:CallBackInfo[];

        public stage:egret.Stage;
        /**
         * 当前视图窗口的宽度，以实际像素为主
         */
        public displayWidth:number;
        /**
         * 当前视图窗口的高度，以实际像素为主
         */
        public displayHeight:number;

        public get width()
        {
            return this.stage.stageWidth;
        }

        public get height()
        {
            return this.stage.stageHeight;
        }

        public get frameRate()
        {
            return this.stage.frameRate;
        }

        public get frameTime()
        {
            return this._frameTime;
        }

        public constructor(stage:egret.Stage)
        {
            this.stage = stage;
            this._frameTime = 1000 / this.stage.frameRate;
            this._callBacks = [];
            this.stage.addEventListener(egret.Event.RESIZE,this.___resize,this);
        }

        public add(callBack:(width:number,height:number) => void,target:any):void
        {
            if(CallBackInfo.contains(this._callBacks,callBack,target) == -1)
            {
                this._callBacks.push(CallBackInfo.create(callBack,target));
            }
        }

        public remove(callBack:(width:number,height:number) => void,target:any):void
        {
            let index:number = CallBackInfo.contains(this._callBacks,callBack,target);
            if(index >= 0)this._callBacks.splice(index,1);
        }

        private ___resize(e:egret.Event):void
        {
            let len = this._callBacks.length;
            for(let i:number = len -1 ; i >= 0; i --)
            {
                this._callBacks[i].runCallBack(this.width,this.height);
            }
        }
    }
}