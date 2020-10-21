declare namespace devil {
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
    class DisplayLongClick implements IPool, IDispose {
        private _display;
        private _isAddEvt;
        private _longClickFun;
        private _longClickObj;
        private _clickFun;
        private _clickObj;
        private _isDown;
        private _longClickCnt;
        constructor();
        /** 设置长按对象 */
        set display(value: egret.DisplayObject);
        /**
         * 长按事件
         */
        __longClick(callBack: (target: any, isEndLongClick: boolean) => void, target: any, clickObj: any): void;
        /**
         * 长按事件
         */
        __click(callBack: Function, target: any, clickObj: any): void;
        protected start(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        /**
         * @private
         */
        protected ___handleEvent(e: egret.Event): void;
        /** */
        private ___checkLongClick;
        reuse(): void;
        pool(): void;
        unuse(): void;
        dispose(): void;
    }
}
