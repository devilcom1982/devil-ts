namespace devil
{
	/**
	 * @author        devil
	 * @version       V20181225
	 * @create        2018-12-25
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class ScrollBar implements IPool
    {
        /**
         * 开始触发滚动的阈值（以像素为单位），当触摸点偏离初始触摸点的距离超过这个值时才会触发滚动。
         */
        public static scrollThreshold:number = 5;

        private _touchScrollH:TouchScroll;
        private _touchScrollV:TouchScroll;
        private _list:List;
        private _touchStartX:number;
        private _touchStartY:number;
        private _touchMoved:boolean;
        private _touchCancle:boolean;
        private _downTarget:egret.DisplayObject;//记录按下的对象，touchCancle时使用
		private _horizontalCanScroll:boolean;
		private _verticalCanScroll:boolean;

        public set list(value:List)
        {
            this._list = value;
            this._list.container.layers[0].addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.___touchBegin,this,true);
            this._list.container.layers[0].addEventListener(egret.TouchEvent.TOUCH_END,this.___touchEnd,this,true);
            this._list.container.layers[0].addEventListener(egret.TouchEvent.TOUCH_TAP,this.___touchTap,this,true);
        }

        /**
         * 是否启用回弹
         */
        public set bounces(value:boolean) 
        {
            if(this._touchScrollV)this._touchScrollV.bounces = value;
            if(this._touchScrollH)this._touchScrollH.bounces = value;
        }

        public constructor()
        {
            this.start();
        }

        private start():void
        {
            this._touchStartX = 0;
            this._touchStartY = 0;
            this._touchMoved = false;
            this._touchCancle = false;
            this._touchScrollH = new TouchScroll(this.___update, null, this);
            this._touchScrollV = new TouchScroll(this.___update, null, this);
        }

        private removeEvent():void
        {
            this._list.layers[0].removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.___touchMove, this);
            Manager.stage.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.___touchEnd, this, true);
            Manager.stage.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.___touchMove, this);
        }

        /**
         * 停止滚动的动画
         */
        private stopAnimation():void 
        {
            this._touchScrollV.stop();
            this._touchScrollH.stop();
        }

        public checkScrollPolicy():boolean
        {
            this._verticalCanScroll = this.checkVH(this._list.scrollPolicyV,this._list.container.contentHeight,this._list.height,this._list.container.getScrollV());
            this._horizontalCanScroll = this.checkVH(this._list.scrollPolicyH,this._list.container.contentWidth,this._list.width,this._list.container.getScrollH());
            return this._verticalCanScroll || this._horizontalCanScroll;
        }

        private checkVH(scrollPolicy:ScrollPolicy,contentWH:number,wh:number,scrollValue:number):boolean
        {
            let result:boolean = false;
            switch(scrollPolicy)
            {
                case ScrollPolicy.AUTO:
                    result = contentWH > wh || scrollValue != 0;
                    break;
                case ScrollPolicy.ON:
                    result = true;
                    break;
                case ScrollPolicy.OFF:
                    result = false;
                    break;
            }
            return result;
        }

        private dispatchBubbleEvent(e:egret.TouchEvent):void
        {
            let cancelEvent = egret.Event.create(egret.TouchEvent, event.type, event.bubbles, event.cancelable);
            cancelEvent.$initTo(e.stageX,e.stageY,e.touchPointID);
            let target:egret.DisplayObject = this._downTarget;
            cancelEvent.$setTarget(target);
            let list = this._list.layers[0].$getPropagationList(target);
            let length = list.length;
            let targetIndex = list.length * 0.5;
            let startIndex = -1;

            for (let i = 0; i < length; i++) {
                if (list[i] === this._list.container.layers[0]) {
                    startIndex = i;
                    break;
                }
            }
            list.splice(0, list.length - startIndex + 1);
            targetIndex = 0;

            this._list.layers[0].$dispatchPropagationEvent(cancelEvent, list, targetIndex);
            egret.Event.release(cancelEvent);
        }

        public pool():void
        {
            Manager.pool.push(this);
        }

        public reuse():void
        {
            this.start();
        }

        public unuse():void
        {
            this._list.container.layers[0].removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.___touchBegin,this,true);
            this._list.container.layers[0].removeEventListener(egret.TouchEvent.TOUCH_END,this.___touchEnd,this,true);
            this._list.container.layers[0].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.___touchTap,this,true);
            this.removeEvent();
            this.stopAnimation();
            this._touchScrollV.dispose();
            this._touchScrollV = null;
            this._touchScrollH.dispose();
            this._touchScrollH = null;
        }

        public dispose():void
        {
            this._list.container.layers[0].removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.___touchBegin,this,true);
            this._list.container.layers[0].removeEventListener(egret.TouchEvent.TOUCH_END,this.___touchEnd,this,true);
            this._list.container.layers[0].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.___touchTap,this,true);
            this.removeEvent();
            this.stopAnimation();
            this._touchScrollV.dispose();
            this._touchScrollV = null;
            this._touchScrollH.dispose();
            this._touchScrollH = null;
        }

        private ___touchBegin(e:egret.TouchEvent):void
        {
            this._touchCancle = false;
            if(e.isDefaultPrevented())return;
            if(!this.checkScrollPolicy())return;
            this._downTarget = e.target;
            this.stopAnimation();
            this._touchStartX = e.stageX;
            this._touchStartY = e.stageY;
            if(this._horizontalCanScroll)this._touchScrollH.start(e.stageX);
            if(this._verticalCanScroll)this._touchScrollV.start(e.stageY);
            this._list.layers[0].addEventListener(egret.TouchEvent.TOUCH_MOVE,this.___touchMove,this);
            Manager.stage.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.___touchEnd,this,true);
        }

        private ___touchEnd(e:egret.TouchEvent):void
        {
            if(e.currentTarget == this._list.container.layers[0])
            {
                if(this._touchCancle)
                {
                    e.$bubbles = false;
                    this.dispatchBubbleEvent(e);
                    e.$bubbles = true;
                    e.stopPropagation();
                }
            }
            if(this._touchCancle || e.currentTarget == Manager.stage.stage)
            {
                this._touchMoved = false;
                this.removeEvent();
                if(this._touchScrollH.isStarted())this._touchScrollH.finish(this._list.container.getScrollH(),this._list.container.contentWidth - this._list.width);
                if(this._touchScrollV.isStarted())this._touchScrollV.finish(this._list.container.getScrollV(),this._list.container.contentHeight - this._list.height);
            }
        }

        private ___touchTap(e:egret.TouchEvent):void
        {
            if(this._touchCancle)
            {
                e.$bubbles = false;
                this.dispatchBubbleEvent(e);
                e.$bubbles = true;
                e.stopPropagation();
            }
        }

        private ___touchMove(e:egret.TouchEvent):void
        {
            if(e.isDefaultPrevented())return;
            if(!this._touchMoved)
            {
                let outX:boolean = !(Math.abs(this._touchStartX - e.stageX) < ScrollBar.scrollThreshold);
                let outY:boolean = !(Math.abs(this._touchStartY - e.stageY) < ScrollBar.scrollThreshold);
                if(!outX && !outY)return;
                if(!outY && outX && this._list.scrollPolicyH == ScrollPolicy.OFF)return;
                if(!outX && outY && this._list.scrollPolicyV == ScrollPolicy.OFF)return;
                this._touchCancle = true;
                this._touchMoved = true;
                Manager.stage.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.___touchMove,this);
            }
            e.preventDefault();
            if(this._horizontalCanScroll)this._touchScrollH.update(e.stageX,this._list.container.contentWidth - this._list.width,this._list.container.getScrollH());
            if(this._verticalCanScroll)this._touchScrollV.update(e.stageY,this._list.container.contentHeight - this._list.height,this._list.container.getScrollV());
        }

        private ___update(scrollPos:number,target:TouchScroll):void
        {
            if(this._touchScrollH == target)this._list.container.setScrollH(scrollPos,true);
            if(this._touchScrollV == target)this._list.container.setScrollV(scrollPos,true);
        }
    }
}