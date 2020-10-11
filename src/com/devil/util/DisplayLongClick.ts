namespace devil
{
    /**
     * 控制长按，
     * 有些特殊情况，长按超过三次触发会变快长按节奏
     * 当按住结束也会触发长按事件，通过第二个参数来区别
     * @author        xujinhong
     * @version       V20190918
     * @create        2019-09-18
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */	
    export class DisplayLongClick implements IPool, IDispose
    {
        private _display:egret.DisplayObject;
        private _isAddEvt:boolean;
        private _longClickFun:CallBackInfo;
        private _longClickObj:any;
        private _clickFun:CallBackInfo;
        private _clickObj:any;

        private _isDown:boolean;
        private _longClickCnt:number;

        public constructor()
        {
            this.start();
        }

        /** 设置长按对象 */
        public set display(value:egret.DisplayObject)
        {
            this.removeEvent();
            this._display = value;
            this.addEvent();
        }

		/**
		 * 长按事件 
		 */	
        public __longClick(callBack:(target:any,isEndLongClick:boolean)=>void,target:any, clickObj:any):void
        {
            this._longClickObj = clickObj;
            this._longClickFun = CallBackInfo.create(callBack,target);
        }
		/**
		 * 长按事件 
		 */	
        public __click(callBack:Function,target:any, clickObj:any):void
        {
            this._clickObj = clickObj;
            this._clickFun = CallBackInfo.create(callBack,target);
        }

        protected start():void
        {
            this._isDown = false;
            this._longClickCnt = 0;
            this._isAddEvt = false;
        }

        protected addEvent():void
        {
            if (this._isAddEvt || !this._display) return;
            this._isAddEvt = true;

            this._display.touchEnabled = true;
            this._display.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.___handleEvent,this);
            this._display.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            this._display.addEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            this._display.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        }

        protected removeEvent():void
        {
            if (!this._isAddEvt || !this._display) return;
            this._isAddEvt = false;

            this._display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.___handleEvent,this);
            this._display.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            this._display.removeEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            this._display.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        }
		/**
		 * @private 
		 */	
        protected ___handleEvent(e:egret.Event):void
        {
            switch(e.type)
            {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this._isDown = true;
                    this._longClickCnt = 0;
                    if (this._longClickFun) 
                    {
                        Manager.render.add(this.___checkLongClick, this, 300, 0);
                    }
                    break;
                case egret.TouchEvent.TOUCH_END:
                    if (this._longClickCnt == 0 && this._clickFun) this._clickFun.runCallBack(e, this._clickObj);
                    
                    this._isDown = false;
                    break;
                case egret.TouchEvent.TOUCH_CANCEL:
                case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                    this._isDown = false;
                    break;
            }
        }

        /** */
        private ___checkLongClick():void
        {
            if (!this._isDown)
            {
                if (this._longClickFun) this._longClickFun.runCallBack(this._longClickObj, true);
                Manager.render.remove(this.___checkLongClick, this);
                return;
            }
            ++this._longClickCnt;
            if(this._longClickFun != null)
            {
                this._longClickFun.runCallBack(this._longClickObj, false);
                if (this._longClickCnt >= 3)
                {
                    Manager.render.add(this.___checkLongClick, this, 30, 0, null, true);
                }
            }
        }
        
        public reuse():void
        {
            this.start();
        }

        public pool():void
        {
            Manager.pool.push(this);
        }

        public unuse():void
        {
            Manager.render.remove(this.___checkLongClick, this);
            this.removeEvent();

            if(this._longClickFun)
            {
                this._longClickFun.pool();
                this._longClickFun = null;
            }
            this._longClickObj = null;
            
            if(this._clickFun)
            {
                this._clickFun.pool();
                this._clickFun = null;
            }
            this._clickObj = null;

            this._display = null;
        }

        public dispose():void
        {
            Manager.render.remove(this.___checkLongClick, this);
            this.removeEvent();

            if(this._longClickFun)
            {
                this._longClickFun.pool();
                this._longClickFun = null;
            }
            this._longClickObj = null;
            
            if(this._clickFun)
            {
                this._clickFun.pool();
                this._clickFun = null;
            }
            this._clickObj = null;

            this._display = null;
        }

    }
}