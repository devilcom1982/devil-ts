var devil;
(function (devil) {
    /**
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ScrollBar = /** @class */ (function () {
        function ScrollBar() {
            this.start();
        }
        Object.defineProperty(ScrollBar.prototype, "list", {
            set: function (value) {
                this._list = value;
                this._list.container.layers[0].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___touchBegin, this, true);
                this._list.container.layers[0].addEventListener(egret.TouchEvent.TOUCH_END, this.___touchEnd, this, true);
                this._list.container.layers[0].addEventListener(egret.TouchEvent.TOUCH_TAP, this.___touchTap, this, true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollBar.prototype, "bounces", {
            /**
             * 是否启用回弹
             */
            set: function (value) {
                if (this._touchScrollV)
                    this._touchScrollV.bounces = value;
                if (this._touchScrollH)
                    this._touchScrollH.bounces = value;
            },
            enumerable: true,
            configurable: true
        });
        ScrollBar.prototype.start = function () {
            this._touchStartX = 0;
            this._touchStartY = 0;
            this._touchMoved = false;
            this._touchCancle = false;
            this._touchScrollH = new devil.TouchScroll(this.___update, null, this);
            this._touchScrollV = new devil.TouchScroll(this.___update, null, this);
        };
        ScrollBar.prototype.removeEvent = function () {
            this._list.layers[0].removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.___touchMove, this);
            devil.Manager.stage.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.___touchEnd, this, true);
            devil.Manager.stage.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.___touchMove, this);
        };
        /**
         * 停止滚动的动画
         */
        ScrollBar.prototype.stopAnimation = function () {
            this._touchScrollV.stop();
            this._touchScrollH.stop();
        };
        ScrollBar.prototype.checkScrollPolicy = function () {
            this._verticalCanScroll = this.checkVH(this._list.scrollPolicyV, this._list.container.contentHeight, this._list.height, this._list.container.getScrollV());
            this._horizontalCanScroll = this.checkVH(this._list.scrollPolicyH, this._list.container.contentWidth, this._list.width, this._list.container.getScrollH());
            return this._verticalCanScroll || this._horizontalCanScroll;
        };
        ScrollBar.prototype.checkVH = function (scrollPolicy, contentWH, wh, scrollValue) {
            var result = false;
            switch (scrollPolicy) {
                case devil.ScrollPolicy.AUTO:
                    result = contentWH > wh || scrollValue != 0;
                    break;
                case devil.ScrollPolicy.ON:
                    result = true;
                    break;
                case devil.ScrollPolicy.OFF:
                    result = false;
                    break;
            }
            return result;
        };
        ScrollBar.prototype.dispatchBubbleEvent = function (e) {
            var cancelEvent = egret.Event.create(egret.TouchEvent, event.type, event.bubbles, event.cancelable);
            cancelEvent.$initTo(e.stageX, e.stageY, e.touchPointID);
            var target = this._downTarget;
            cancelEvent.$setTarget(target);
            var list = this._list.layers[0].$getPropagationList(target);
            var length = list.length;
            var targetIndex = list.length * 0.5;
            var startIndex = -1;
            for (var i = 0; i < length; i++) {
                if (list[i] === this._list.container.layers[0]) {
                    startIndex = i;
                    break;
                }
            }
            list.splice(0, list.length - startIndex + 1);
            targetIndex = 0;
            this._list.layers[0].$dispatchPropagationEvent(cancelEvent, list, targetIndex);
            egret.Event.release(cancelEvent);
        };
        ScrollBar.prototype.pool = function () {
            devil.Manager.pool.push(this);
        };
        ScrollBar.prototype.reuse = function () {
            this.start();
        };
        ScrollBar.prototype.unuse = function () {
            this._list.container.layers[0].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___touchBegin, this, true);
            this._list.container.layers[0].removeEventListener(egret.TouchEvent.TOUCH_END, this.___touchEnd, this, true);
            this._list.container.layers[0].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.___touchTap, this, true);
            this.removeEvent();
            this.stopAnimation();
            this._touchScrollV.dispose();
            this._touchScrollV = null;
            this._touchScrollH.dispose();
            this._touchScrollH = null;
        };
        ScrollBar.prototype.dispose = function () {
            this._list.container.layers[0].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___touchBegin, this, true);
            this._list.container.layers[0].removeEventListener(egret.TouchEvent.TOUCH_END, this.___touchEnd, this, true);
            this._list.container.layers[0].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.___touchTap, this, true);
            this.removeEvent();
            this.stopAnimation();
            this._touchScrollV.dispose();
            this._touchScrollV = null;
            this._touchScrollH.dispose();
            this._touchScrollH = null;
        };
        ScrollBar.prototype.___touchBegin = function (e) {
            this._touchCancle = false;
            if (e.isDefaultPrevented())
                return;
            if (!this.checkScrollPolicy())
                return;
            this._downTarget = e.target;
            this.stopAnimation();
            this._touchStartX = e.stageX;
            this._touchStartY = e.stageY;
            if (this._horizontalCanScroll)
                this._touchScrollH.start(e.stageX);
            if (this._verticalCanScroll)
                this._touchScrollV.start(e.stageY);
            this._list.layers[0].addEventListener(egret.TouchEvent.TOUCH_MOVE, this.___touchMove, this);
            devil.Manager.stage.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.___touchEnd, this, true);
        };
        ScrollBar.prototype.___touchEnd = function (e) {
            if (e.currentTarget == this._list.container.layers[0]) {
                if (this._touchCancle) {
                    e.$bubbles = false;
                    this.dispatchBubbleEvent(e);
                    e.$bubbles = true;
                    e.stopPropagation();
                }
            }
            if (this._touchCancle || e.currentTarget == devil.Manager.stage.stage) {
                this._touchMoved = false;
                this.removeEvent();
                if (this._touchScrollH.isStarted())
                    this._touchScrollH.finish(this._list.container.getScrollH(), this._list.container.contentWidth - this._list.width);
                if (this._touchScrollV.isStarted())
                    this._touchScrollV.finish(this._list.container.getScrollV(), this._list.container.contentHeight - this._list.height);
            }
        };
        ScrollBar.prototype.___touchTap = function (e) {
            if (this._touchCancle) {
                e.$bubbles = false;
                this.dispatchBubbleEvent(e);
                e.$bubbles = true;
                e.stopPropagation();
            }
        };
        ScrollBar.prototype.___touchMove = function (e) {
            if (e.isDefaultPrevented())
                return;
            if (!this._touchMoved) {
                var outX = !(Math.abs(this._touchStartX - e.stageX) < ScrollBar.scrollThreshold);
                var outY = !(Math.abs(this._touchStartY - e.stageY) < ScrollBar.scrollThreshold);
                if (!outX && !outY)
                    return;
                if (!outY && outX && this._list.scrollPolicyH == devil.ScrollPolicy.OFF)
                    return;
                if (!outX && outY && this._list.scrollPolicyV == devil.ScrollPolicy.OFF)
                    return;
                this._touchCancle = true;
                this._touchMoved = true;
                devil.Manager.stage.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.___touchMove, this);
            }
            e.preventDefault();
            if (this._horizontalCanScroll)
                this._touchScrollH.update(e.stageX, this._list.container.contentWidth - this._list.width, this._list.container.getScrollH());
            if (this._verticalCanScroll)
                this._touchScrollV.update(e.stageY, this._list.container.contentHeight - this._list.height, this._list.container.getScrollV());
        };
        ScrollBar.prototype.___update = function (scrollPos, target) {
            if (this._touchScrollH == target)
                this._list.container.setScrollH(scrollPos, true);
            if (this._touchScrollV == target)
                this._list.container.setScrollV(scrollPos, true);
        };
        /**
         * 开始触发滚动的阈值（以像素为单位），当触摸点偏离初始触摸点的距离超过这个值时才会触发滚动。
         */
        ScrollBar.scrollThreshold = 5;
        return ScrollBar;
    }());
    devil.ScrollBar = ScrollBar;
})(devil || (devil = {}));
