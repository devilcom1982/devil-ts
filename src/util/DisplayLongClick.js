var devil;
(function (devil) {
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
    var DisplayLongClick = /** @class */ (function () {
        function DisplayLongClick() {
            this.start();
        }
        Object.defineProperty(DisplayLongClick.prototype, "display", {
            /** 设置长按对象 */
            set: function (value) {
                this.removeEvent();
                this._display = value;
                this.addEvent();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 长按事件
         */
        DisplayLongClick.prototype.__longClick = function (callBack, target, clickObj) {
            this._longClickObj = clickObj;
            this._longClickFun = devil.CallBackInfo.create(callBack, target);
        };
        /**
         * 长按事件
         */
        DisplayLongClick.prototype.__click = function (callBack, target, clickObj) {
            this._clickObj = clickObj;
            this._clickFun = devil.CallBackInfo.create(callBack, target);
        };
        DisplayLongClick.prototype.start = function () {
            this._isDown = false;
            this._longClickCnt = 0;
            this._isAddEvt = false;
        };
        DisplayLongClick.prototype.addEvent = function () {
            if (this._isAddEvt || !this._display)
                return;
            this._isAddEvt = true;
            this._display.touchEnabled = true;
            this._display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___handleEvent, this);
            this._display.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            this._display.addEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            this._display.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        };
        DisplayLongClick.prototype.removeEvent = function () {
            if (!this._isAddEvt || !this._display)
                return;
            this._isAddEvt = false;
            this._display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___handleEvent, this);
            this._display.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            this._display.removeEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            this._display.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        };
        /**
         * @private
         */
        DisplayLongClick.prototype.___handleEvent = function (e) {
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this._isDown = true;
                    this._longClickCnt = 0;
                    if (this._longClickFun) {
                        devil.Manager.render.add(this.___checkLongClick, this, 300, 0);
                    }
                    break;
                case egret.TouchEvent.TOUCH_END:
                    if (this._longClickCnt == 0 && this._clickFun)
                        this._clickFun.runCallBack(e, this._clickObj);
                    this._isDown = false;
                    break;
                case egret.TouchEvent.TOUCH_CANCEL:
                case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                    this._isDown = false;
                    break;
            }
        };
        /** */
        DisplayLongClick.prototype.___checkLongClick = function () {
            if (!this._isDown) {
                if (this._longClickFun)
                    this._longClickFun.runCallBack(this._longClickObj, true);
                devil.Manager.render.remove(this.___checkLongClick, this);
                return;
            }
            ++this._longClickCnt;
            if (this._longClickFun != null) {
                this._longClickFun.runCallBack(this._longClickObj, false);
                if (this._longClickCnt >= 3) {
                    devil.Manager.render.add(this.___checkLongClick, this, 30, 0, null, true);
                }
            }
        };
        DisplayLongClick.prototype.reuse = function () {
            this.start();
        };
        DisplayLongClick.prototype.pool = function () {
            devil.Manager.pool.push(this);
        };
        DisplayLongClick.prototype.unuse = function () {
            devil.Manager.render.remove(this.___checkLongClick, this);
            this.removeEvent();
            if (this._longClickFun) {
                this._longClickFun.pool();
                this._longClickFun = null;
            }
            this._longClickObj = null;
            if (this._clickFun) {
                this._clickFun.pool();
                this._clickFun = null;
            }
            this._clickObj = null;
            this._display = null;
        };
        DisplayLongClick.prototype.dispose = function () {
            devil.Manager.render.remove(this.___checkLongClick, this);
            this.removeEvent();
            if (this._longClickFun) {
                this._longClickFun.pool();
                this._longClickFun = null;
            }
            this._longClickObj = null;
            if (this._clickFun) {
                this._clickFun.pool();
                this._clickFun = null;
            }
            this._clickObj = null;
            this._display = null;
        };
        return DisplayLongClick;
    }());
    devil.DisplayLongClick = DisplayLongClick;
})(devil || (devil = {}));
