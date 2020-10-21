var devil;
(function (devil) {
    /**
     * 渲染管理器
     * @author        devil
     * @version       V20190122
     * @create        2019-01-12
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var RenderManager = /** @class */ (function () {
        function RenderManager() {
            this._callBacks = [];
            this._interval = 0;
            this._lastTime = 0;
            this._shape = new egret.DisplayObject();
            this._shape.addEventListener(egret.Event.ENTER_FRAME, this.___enterFrame, this);
        }
        /**
         * 当前帧与上一帧的时间间隔，以毫秒为单位
         */
        RenderManager.prototype.getInterval = function () {
            return this._interval;
        };
        /**
         * 是否包含指定的函数及对象，并且alive为true
         * @params render 回调函数
         * @params target 回调对象
         * @params return 大于-1则表示不包含，否则会返回当前的索引值
         */
        RenderManager.prototype.contains = function (render, target) {
            var length = this._callBacks.length;
            for (var i = 0; i < length; i++) {
                if (this._callBacks[i].render.equals(render, target) && this._callBacks[i].alive)
                    return i;
            }
            return -1;
        };
        /**
        * 添加计时器render:Function, target:any, deley:number = 0, repeat:number = 0, end:Function = null, forceReset:boolean = false,...args:any[]
        * @params render 单次回调函数
        * @params target 包含函数的对象
        * @params deley 执行时间间隔，单位毫秒，0或小于0表示每帧都执行,默认为0
        * @params repeat 执行次数，0或小于0表示无限次
        * @params end 最后一次执行的回调函数
        * @params forceReset 强制重置设置，比如之前已add该render，则重置该render的值
        */
        RenderManager.prototype.add = function (render, target, deley, repeat, end, forceReset) {
            if (deley === void 0) { deley = 0; }
            if (repeat === void 0) { repeat = 0; }
            if (end === void 0) { end = null; }
            if (forceReset === void 0) { forceReset = false; }
            var args = [];
            for (var _i = 6; _i < arguments.length; _i++) {
                args[_i - 6] = arguments[_i];
            }
            var index = this.contains(render, target);
            if (index == -1) {
                this._callBacks.unshift(RenderTimerInfo.create(render, target, deley, repeat, end, args));
                this._addRenderCount++;
            }
            else {
                if (forceReset) {
                    this._callBacks[index].pool();
                    this._callBacks[index] = RenderTimerInfo.create(render, target, deley, repeat, end, args);
                }
            }
        };
        /**
        * 移除计时器
        */
        RenderManager.prototype.remove = function (render, target) {
            var index = this.contains(render, target);
            if (index >= 0)
                this._callBacks[index].alive = false;
        };
        RenderManager.prototype.render = function (info, interval) {
            if (info.args == null || info.args.length == 0)
                info.render.runCallBack(interval);
            else {
                if (info.args.length == 1)
                    info.render.runCallBack(interval, info.args[0]);
                else if (info.args.length == 2)
                    info.render.runCallBack(interval, info.args[0], info.args[1]);
                else if (info.args.length == 3)
                    info.render.runCallBack(interval, info.args[0], info.args[1], info.args[2]);
                else if (info.args.length == 4)
                    info.render.runCallBack(interval, info.args[0], info.args[1], info.args[2], info.args[3]);
                else if (info.args.length == 5)
                    info.render.runCallBack(interval, info.args[0], info.args[1], info.args[2], info.args[3], info.args[4]);
            }
        };
        RenderManager.prototype.removeAll = function (target) {
            var length = this._callBacks.length;
            for (var i = 0; i < length; i++) {
                if (this._callBacks[i].render.target == target && this._callBacks[i].alive)
                    this.remove(this._callBacks[i].render.callBack, this._callBacks[i].render.target);
            }
        };
        RenderManager.prototype.___enterFrame = function (e) {
            var that = this;
            var nowTime = egret.getTimer();
            that._interval = nowTime - that._lastTime;
            that._lastTime = nowTime;
            var len = that._callBacks.length - 1;
            var updateFlag;
            var info;
            for (var i = len; i >= 0; i--) {
                updateFlag = false;
                info = that._callBacks[i];
                if (!info.alive) {
                    info.pool();
                    that._callBacks.splice(i, 1);
                    continue;
                }
                if (info.delay > 0) {
                    info.interval += that._interval;
                    if (info.interval >= info.delay) {
                        updateFlag = true;
                    }
                }
                else {
                    updateFlag = true;
                }
                if (updateFlag) {
                    this._addRenderCount = 0;
                    updateFlag = false;
                    if (info.delay > 0) {
                        if (info.render != null)
                            this.render(info, info.interval);
                        info.interval = 0;
                    }
                    else {
                        if (info.render != null)
                            this.render(info, that._interval);
                    }
                    if (info.repeat > 0) {
                        info.repeat--;
                        if (info.repeat <= 0) {
                            if (info.end != null)
                                info.end.runCallBack();
                            info.alive = false;
                        }
                    }
                    i += this._addRenderCount;
                }
            }
        };
        return RenderManager;
    }());
    devil.RenderManager = RenderManager;
    var RenderTimerInfo = /** @class */ (function () {
        function RenderTimerInfo() {
            this.alive = true;
            this.interval = 0;
        }
        RenderTimerInfo.prototype.reuse = function () {
            this.alive = true;
            this.interval = 0;
        };
        RenderTimerInfo.prototype.unuse = function () {
            if (this.render != null) {
                this.render.pool();
                this.render = null;
            }
            if (this.end != null) {
                this.end.pool();
                this.end = null;
            }
            this.alive = false;
            this.delay = 0;
            this.repeat = 0;
            this.args.length = 0;
            this.args = null;
        };
        RenderTimerInfo.prototype.dispose = function () {
            if (this.render != null) {
                this.render.pool();
                this.render = null;
            }
            if (this.end != null) {
                this.end.pool();
                this.end = null;
            }
            this.args.length = 0;
            this.args = null;
        };
        RenderTimerInfo.prototype.pool = function () {
            devil.Manager.pool.push(this);
        };
        RenderTimerInfo.create = function (render, target, deley, repeat, end, args) {
            var result = devil.Manager.pool.create(RenderTimerInfo);
            if (render != null)
                result.render = devil.CallBackInfo.create(render, target);
            if (end != null)
                result.end = devil.CallBackInfo.create(end, target);
            result.delay = deley;
            result.repeat = repeat;
            result.args = args;
            return result;
        };
        return RenderTimerInfo;
    }());
    devil.RenderTimerInfo = RenderTimerInfo;
})(devil || (devil = {}));
