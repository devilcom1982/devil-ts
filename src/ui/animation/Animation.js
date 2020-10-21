var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var devil;
(function (devil) {
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
    var Animation = /** @class */ (function (_super_1) {
        __extends(Animation, _super_1);
        function Animation() {
            var _this = _super_1.call(this) || this;
            _this._loadCompletes = [];
            return _this;
        }
        Object.defineProperty(Animation.prototype, "currentFrame", {
            get: function () {
                return this._currentFrame;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "totalFrame", {
            get: function () {
                return this._cvo.totalFrame;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "url", {
            get: function () {
                return (this._path ? this._path.urls[0] : "");
            },
            enumerable: true,
            configurable: true
        });
        Animation.prototype.initLayer = function () {
            this._layer = this.createLayer();
        };
        Animation.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this.init();
            this._image = devil.View.create(devil.Image);
            this.addChild(this._image, this._layer);
        };
        Animation.prototype.addToStage = function () {
            if (this._autoPlay)
                this.play();
        };
        Animation.prototype.removeFromStage = function () {
            this.stop();
        };
        Animation.prototype.load = function () {
            devil.Manager.loader.load(this._path, this.___complete, this, this._resourceGCType, this._resPriorityType, this.___fail, this);
        };
        Animation.prototype.goto = function (frame) {
            var that = this;
            frame = devil.MathUtil.clamb(1, that._cvo.totalFrame, frame);
            that._currentFrame = frame;
            var index = that._cvo.frames.indexOf(that._currentFrame);
            if (index != -1) {
                that._nextFrame = ((index + 1) >= that._cvo.frames.length) ? 10000 : that._cvo.frames[index + 1];
                var frameData = that.ids ? that._data.getKeyFrameData(this.ids[index]) : that._data.getKeyFrameData(index + 1);
                that._image.move(-that._cvo.offsetX + frameData.offX, -that._cvo.offsetY + frameData.offY);
                this._image.setSize(-1, -1);
                that._image.source = frameData.texture;
            }
        };
        Animation.prototype.gotoAndStop = function (frame) {
            if (this._data == null) {
                this._loadCompletes.push(devil.CallBackInfo.create(this.gotoAndStop, this, frame));
            }
            else {
                this.stop();
                this._currentTime = frame * devil.Manager.stage.frameTime;
                this.goto(frame);
            }
        };
        Animation.prototype.gotoAndPlay = function (frame) {
            if (this._data == null) {
                this._loadCompletes.push(devil.CallBackInfo.create(this.gotoAndPlay, this, frame));
            }
            else {
                this.play();
                this._currentTime = frame * devil.Manager.stage.frameTime;
                this.goto(frame);
            }
        };
        Animation.prototype.playComplete = function () {
            if (this._playCompleteFun)
                this._playCompleteFun.runCallBack();
            if (this._playCompleteDispose)
                this.pool();
            else {
                this.stop();
                this._repeate = (this._cvo.wrapMode <= 0) ? -1 : this._cvo.wrapMode;
            }
        };
        Animation.prototype.play = function () {
            if (this._data && this._layer.stage) {
                if (this._cvo.totalFrame > 1)
                    devil.Manager.render.add(this.___render, this);
                else if (this._cvo.totalFrame == 1)
                    this.gotoAndStop(1);
            }
        };
        Animation.prototype.stop = function () {
            devil.Manager.render.remove(this.___render, this);
        };
        Animation.prototype.init = function () {
            this._currentCount = 1;
            this._currentFrame = 1;
            this._nextFrame = 10000;
            this._currentTime = 0;
        };
        /**
         * resourceGCType  default ResourceGCType.ANIMATION
         */
        Animation.prototype.update = function (path, cvo, resPriorityType, resourceGCType, autoPlay, playCompleteDispose) {
            if (resourceGCType === void 0) { resourceGCType = 3; }
            if (autoPlay === void 0) { autoPlay = true; }
            if (playCompleteDispose === void 0) { playCompleteDispose = true; }
            if (this._path == path)
                return;
            this.stop();
            this.init();
            this._layer.touchEnabled = this._layer.touchChildren = false;
            this._image.source = null;
            this._data = null;
            if (this._playCompleteFun)
                this._playCompleteFun.pool();
            this._playCompleteFun = null;
            if (this._failFun)
                this._failFun.pool();
            this._failFun = null;
            for (var i = 0; i < this._loadCompletes.length; i++) {
                this._loadCompletes[i].pool();
            }
            this._loadCompletes.length = 0;
            if (this._path != null)
                devil.Manager.loader.remove(this._path, this.___complete, this, this.___fail, this);
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
        };
        Animation.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(devil.InvalidationType.SIZE))
                this.drawSize();
        };
        Animation.prototype.drawSize = function () {
            this._layer.width = this._width;
            this._layer.height = this._height;
        };
        Animation.prototype.unuse = function () {
            this.stop();
            this.ids = null;
            this._image = null;
            this._cvo = null;
            devil.Manager.loader.remove(this._path, this.___complete, this, this.___fail, this);
            this._path = null;
            this._data = null;
            if (this._playCompleteFun)
                this._playCompleteFun.pool();
            this._playCompleteFun = null;
            if (this._failFun)
                this._failFun.pool();
            this._failFun = null;
            this._layer = null;
            for (var i = 0; i < this._loadCompletes.length; i++) {
                this._loadCompletes[i].pool();
            }
            this._loadCompletes.length = 0;
            _super_1.prototype.unuse.call(this);
        };
        Animation.prototype.dispose = function () {
            this.stop();
            this.ids = null;
            this._image = null;
            this._cvo = null;
            devil.Manager.loader.remove(this._path, this.___complete, this, this.___fail, this);
            this._path = null;
            this._data = null;
            if (this._playCompleteFun)
                this._playCompleteFun.pool();
            this._playCompleteFun = null;
            if (this._failFun)
                this._failFun.pool();
            this._failFun = null;
            this._layer = null;
            for (var i = 0; i < this._loadCompletes.length; i++) {
                this._loadCompletes[i].pool();
            }
            this._loadCompletes = null;
            _super_1.prototype.dispose.call(this);
        };
        /**
         * 播放完成
         */
        Animation.prototype.__playComplete = function (callBack, target) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this._playCompleteFun = devil.CallBackInfo.create.apply(devil.CallBackInfo, __spreadArrays([callBack, target], args));
        };
        Animation.prototype.__fail = function (callBack, target) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this._failFun = devil.CallBackInfo.create.apply(devil.CallBackInfo, __spreadArrays([callBack, target], args));
        };
        Animation.prototype.___complete = function (loader) {
            this._data = loader.sheet;
            var len = this._loadCompletes.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    this._loadCompletes[i].runCallBack();
                    this._loadCompletes[i].pool();
                }
                this._loadCompletes.length = 0;
            }
            else {
                if (this._autoPlay)
                    this.play();
            }
        };
        Animation.prototype.___render = function (interval) {
            var that = this;
            that.goto(that._currentFrame);
            that._currentTime += Math.max(interval, devil.Manager.stage.frameTime);
            that._currentFrame = Math.ceil(that._currentTime / Animation.ANIMATION_INTERVAL);
            if (that._currentFrame > that._nextFrame)
                that._currentFrame = that._nextFrame;
            if (that._currentFrame > that._cvo.totalFrame) {
                that._currentTime = devil.Manager.stage.frameTime;
                that._currentFrame = 1;
                if (that._repeate > 0) {
                    that._currentCount++;
                    that._repeate--;
                    if (that._repeate <= 0)
                        that.playComplete();
                }
            }
        };
        Animation.prototype.___fail = function (loader) {
            if (loader.getPath() != this._path)
                return;
            if (this._failFun)
                this._failFun.runCallBack();
        };
        /**
         * 帧动画的时间间隔
         */
        Animation.ANIMATION_INTERVAL = 33;
        return Animation;
    }(devil.Container));
    devil.Animation = Animation;
})(devil || (devil = {}));
