var devil;
(function (devil) {
    /**
     * @author        devil
     * @version       V20190315
     * @create        2019-03-15
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var MAX_VELOCITY_COUNT = 4; //需要记录的历史速度的最大次数。
    var CURRENT_VELOCITY_WEIGHT = 2.33; //当前速度所占的权重。
    var VELOCITY_WEIGHTS = [1, 1.33, 1.66, 2]; //记录的历史速度的权重列表。
    var MINIMUM_VELOCITY = 0.02; //最小的改变速度，解决浮点数精度问题
    var FRICTION = 0.998; //当容器自动滚动时要应用的摩擦系数
    var EXTRA_FRICTION = 0.95; //当容器自动滚动时并且滚动位置超出容器范围时要额外应用的摩擦系数
    var FRICTION_LOG = Math.log(FRICTION); //摩擦系数的自然对数
    var TouchScroll = /** @class */ (function () {
        function TouchScroll(updateFunction, endFunction, target) {
            this._bounces = true;
            this._isStarted = true;
            this._isPlaying = false;
            this._currentPosition = 0;
            this._maxScrollPos = 0;
            this._offsetPoint = 0; //触摸按下时的偏移量
            this._currentScrollPos = 0;
            this._velocity = 0;
            this._previousVelocity = [];
            this._previousPosition = 0;
            this._duration = 500; //动画持续时间,单位毫秒，默认值500
            this._from = 0; //起始值
            this._to = 0; //终点值。
            this._currentValue = 0; //动画到当前时间对应的值。
            this._scrollFactor = 1.0;
            this._updateFun = devil.CallBackInfo.create(updateFunction, target);
            this._endFun = endFunction != null ? devil.CallBackInfo.create(endFunction, target) : null;
        }
        Object.defineProperty(TouchScroll.prototype, "isPlaying", {
            /**
             * 是否正在播放动画，不包括延迟等待和暂停的阶段
             */
            get: function () {
                return this._isPlaying;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TouchScroll.prototype, "bounces", {
            set: function (value) {
                this._bounces = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * true表示已经调用过start方法。
         */
        TouchScroll.prototype.isStarted = function () {
            return this.isStarted;
        };
        Object.defineProperty(TouchScroll.prototype, "scrollFactor", {
            /**
             * 当前容器滚动外界可调节的系列
             */
            get: function () {
                return this._scrollFactor;
            },
            set: function (value) {
                this._scrollFactor = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * 开始记录位移变化。注意：当使用完毕后，必须调用 finish() 方法结束记录，否则该对象将无法被回收。
         * @param touchPoint 起始触摸位置，以像素为单位，通常是stageX或stageY。
         */
        TouchScroll.prototype.start = function (touchPoint) {
            this._isStarted = true;
            this._velocity = 0;
            this._previousVelocity.length = 0;
            this._previousPosition = this._currentPosition = touchPoint;
            this._offsetPoint = touchPoint;
            this._startTime = egret.getTimer();
            // Manager.render.add(this.___render,this);           
            egret.startTick(this.___render, this);
        };
        /**
         * 如果正在执行缓动滚屏，停止缓动。
         */
        TouchScroll.prototype.stop = function () {
            this._isPlaying = false;
            // Manager.render.remove(this.___render,this);
            egret.stopTick(this.___render, this);
            this._isStarted = false;
        };
        /**
         * 更新当前移动到的位置
         * @param touchPoint 当前触摸位置，以像素为单位，通常是stageX或stageY。
         */
        TouchScroll.prototype.update = function (touchPoint, maxScrollValue, scrollValue) {
            maxScrollValue = Math.max(maxScrollValue, 0);
            this._currentPosition = touchPoint;
            this._maxScrollPos = maxScrollValue;
            var disMove = this._offsetPoint - touchPoint;
            var scrollPos = disMove + scrollValue;
            this._offsetPoint = touchPoint;
            if (scrollPos < 0) {
                if (!this._bounces)
                    scrollPos = 0;
                else
                    scrollPos -= disMove * 0.5;
            }
            if (scrollPos > maxScrollValue) {
                if (!this._bounces)
                    scrollPos = maxScrollValue;
                else
                    scrollPos -= disMove * 0.5;
            }
            this._currentScrollPos = scrollPos;
            this._updateFun.runCallBack(scrollPos, this);
        };
        /**
         * 缓动到水平滚动位置
         */
        TouchScroll.prototype.tweenTo = function (position, duration) {
            if (duration === void 0) { duration = 500; }
            // duration = duration >> 1;
            if (this._currentScrollPos == position) {
                if (this._endFun)
                    this._endFun.runCallBack();
            }
            else {
                this._duration = duration;
                this._from = this._currentScrollPos;
                this._to = position;
                this._isPlaying = true;
                // this._runningTime = 0;
                this._playStartTime = egret.getTimer();
                this._currentValue = 0;
            }
        };
        TouchScroll.prototype.finishScrolling = function () {
            var hsp = this._currentScrollPos;
            var maxHsp = this._maxScrollPos;
            var hspTo = hsp;
            if (hsp < 0)
                hspTo = 0;
            if (hsp > maxHsp)
                hspTo = maxHsp;
            this.tweenTo(hspTo, 300);
        };
        /**
         * 停止记录位移变化，并计算出目标值和继续缓动的时间。
         * @param currentScrollPos 容器当前的滚动值。
         * @param maxScrollPos 容器可以滚动的最大值。当目标值不在 0~maxValue之间时，将会应用更大的摩擦力，从而影响缓动时间的长度。
         */
        TouchScroll.prototype.finish = function (currentScrollPos, maxScrollPos) {
            this._isStarted = false;
            var sum = this._velocity * CURRENT_VELOCITY_WEIGHT;
            var previousVelocityX = this._previousVelocity;
            var length = previousVelocityX.length;
            var totalWeight = CURRENT_VELOCITY_WEIGHT;
            for (var i = 0; i < length; i++) {
                var weight = VELOCITY_WEIGHTS[i];
                sum += previousVelocityX[0] * weight;
                totalWeight += weight;
            }
            var pixelsPerMS = sum / totalWeight;
            var absPixelsPerMS = Math.abs(pixelsPerMS);
            var duration = 0;
            var posTo = 0;
            if (absPixelsPerMS > MINIMUM_VELOCITY) {
                posTo = currentScrollPos + (pixelsPerMS - MINIMUM_VELOCITY) / FRICTION_LOG * 2 * this._scrollFactor;
                if (posTo < 0 || posTo > maxScrollPos) {
                    posTo = currentScrollPos;
                    while (Math.abs(pixelsPerMS) > MINIMUM_VELOCITY) {
                        posTo -= pixelsPerMS;
                        if (posTo < 0 || posTo > maxScrollPos) {
                            pixelsPerMS *= FRICTION * EXTRA_FRICTION;
                        }
                        else {
                            pixelsPerMS *= FRICTION;
                        }
                        duration++;
                    }
                }
                else {
                    duration = Math.log(MINIMUM_VELOCITY / absPixelsPerMS) / FRICTION_LOG;
                }
            }
            else {
                posTo = currentScrollPos;
            }
            if (duration > 0) {
                //如果取消了回弹,保证动画之后不会超出边界
                if (!this._bounces) {
                    if (posTo < 0) {
                        posTo = 0;
                    }
                    else if (posTo > maxScrollPos) {
                        posTo = maxScrollPos;
                    }
                }
                this.tweenTo(posTo, duration);
            }
            else {
                this.finishScrolling();
            }
        };
        TouchScroll.prototype.easeOut = function (ratio) {
            var invRatio = ratio - 1.0;
            return invRatio * invRatio * invRatio + 1;
        };
        TouchScroll.prototype.dispose = function () {
            // Manager.render.remove(this.___render,this);
            egret.stopTick(this.___render, this);
            if (this._updateFun) {
                this._updateFun.pool();
                this._updateFun = null;
            }
            if (this._endFun) {
                this._endFun.pool();
                this._endFun = null;
            }
        };
        TouchScroll.prototype.___render = function (internal) {
            if (this._isStarted) {
                internal = internal - this._startTime;
                if (internal > 10) {
                    if (this._previousVelocity.length >= MAX_VELOCITY_COUNT)
                        this._previousVelocity.shift();
                    this._velocity = (this._currentPosition - this._previousPosition) / internal;
                    this._previousVelocity.push(this._velocity);
                    this._previousPosition = this._currentPosition;
                }
            }
            if (this._isPlaying) {
                // this._runningTime += internal;
                internal = internal - this._playStartTime;
                // let fraction =this._duration == 0 ? 1 : Math.min(this._runningTime, this._duration) / this._duration;
                var fraction = this._duration == 0 ? 1 : Math.min(internal, this._duration) / this._duration;
                fraction = this.easeOut(fraction);
                this._currentValue = this._from + (this._to - this._from) * fraction;
                this._currentScrollPos = this._currentValue;
                this._updateFun.runCallBack(this._currentValue, this);
                // let isEnded = this._runningTime >= this._duration;
                var isEnded = internal >= this._duration;
                if (isEnded) {
                    this._isPlaying = false;
                    this.finishScrolling();
                }
            }
            return true;
        };
        return TouchScroll;
    }());
    devil.TouchScroll = TouchScroll;
})(devil || (devil = {}));
