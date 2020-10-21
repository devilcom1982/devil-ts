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
var devil;
(function (devil) {
    /**
     * MC帧动画
     * @author  devil
     * @version V20190909
     * @create  2019-09-09
     * @place   guangzhou
     */
    var MovieClipAnimation = /** @class */ (function (_super_1) {
        __extends(MovieClipAnimation, _super_1);
        function MovieClipAnimation() {
            return _super_1.call(this) || this;
        }
        Object.defineProperty(MovieClipAnimation.prototype, "path", {
            set: function (value) {
                if (this._path == value)
                    return;
                this.clear();
                this._path = value;
                if (this._path != null) {
                    var index = value.key.lastIndexOf("/");
                    this._source = value.key.slice(index + 1, value.key.length - 8);
                    // let factory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(this.data, this.texture);
                    // if(factory.getTextureAtlasData(this._source) && factory.getDragonBonesData(this._source)) this.createDisplay();//已有数据，则直接创建
                    // else this.loadData();//还没有数据，先加载数据
                    this.loadData();
                }
            },
            enumerable: true,
            configurable: true
        });
        MovieClipAnimation.prototype.initLayer = function () {
            this._layer = this.createLayer();
        };
        MovieClipAnimation.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._playTimes = 0;
            this._isPool = false;
        };
        MovieClipAnimation.prototype.loadData = function () {
            devil.Manager.loader.load(this._path, this.___complete, this, devil.ResourceGCType.NEVER);
        };
        MovieClipAnimation.prototype.clear = function () {
            if (!devil.StringUtil.isEmpty(this._source)) {
                devil.Manager.loader.remove(this._path, this.___complete, this);
            }
            if (this._display) {
                this._display.removeEventListener(dragonBones.EventObject.COMPLETE, this.___playComplete, this);
                this._display.parent.removeChild(this._display);
                this._display = null;
            }
        };
        MovieClipAnimation.prototype.addToStage = function () {
            this.play(this._playTimes);
        };
        MovieClipAnimation.prototype.removeFromStage = function () {
            this.stop();
        };
        /**
         * - 播放指定动画。
         * @param playTimes - 循环播放次数。默认值为0 [0: 无限循环播放, [1~N]: 循环播放 N 次]
        */
        MovieClipAnimation.prototype.play = function (playTimes) {
            if (this._display != null)
                this._display.play(playTimes);
        };
        /**
         * 停止动画播放
         * @see dragonBones.AnimationState
         * @version DragonBones 3.0
         * @language zh_CN
         */
        MovieClipAnimation.prototype.stop = function () {
            if (this._display != null)
                this._display.stop();
        };
        MovieClipAnimation.prototype.unuse = function () {
            this.clear();
            this._layer = null;
            this._path = null;
            this._action = undefined;
            if (this._playComplete)
                this._playComplete.pool();
            this._playComplete = null;
            _super_1.prototype.unuse.call(this);
        };
        MovieClipAnimation.prototype.dispose = function () {
            this.clear();
            this._layer = null;
            this._path = null;
            if (this._playComplete)
                this._playComplete.pool();
            this._playComplete = null;
            _super_1.prototype.dispose.call(this);
        };
        MovieClipAnimation.prototype.___complete = function (loader) {
            //添加保存数据
            //创建动画
            this._data = loader.data;
            this._display = new egret.MovieClip(this._data.generateMovieClipData(this._source));
            this._display.addEventListener(egret.Event.COMPLETE, this.___playComplete, this);
            this._layer.addChild(this._display);
            if (this._layer.stage)
                this.play(this._playTimes);
        };
        MovieClipAnimation.prototype.__playComplete = function (callBack, target) {
            this._playComplete = devil.CallBackInfo.create(callBack, target);
        };
        MovieClipAnimation.prototype.___playComplete = function (e) {
            if (this._playComplete != null)
                this._playComplete.runCallBack();
        };
        return MovieClipAnimation;
    }(devil.View));
    devil.MovieClipAnimation = MovieClipAnimation;
})(devil || (devil = {}));
