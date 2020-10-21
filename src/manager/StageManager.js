var devil;
(function (devil) {
    /**
     * 场景管理器
     * @author        devil
     * @version       V20190131
     * @create        2019-01-31
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var StageManager = /** @class */ (function () {
        function StageManager(stage) {
            this.stage = stage;
            this._frameTime = 1000 / this.stage.frameRate;
            this._callBacks = [];
            this.stage.addEventListener(egret.Event.RESIZE, this.___resize, this);
        }
        Object.defineProperty(StageManager.prototype, "width", {
            get: function () {
                return this.stage.stageWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageManager.prototype, "height", {
            get: function () {
                return this.stage.stageHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageManager.prototype, "frameRate", {
            get: function () {
                return this.stage.frameRate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageManager.prototype, "frameTime", {
            get: function () {
                return this._frameTime;
            },
            enumerable: true,
            configurable: true
        });
        StageManager.prototype.add = function (callBack, target) {
            if (devil.CallBackInfo.contains(this._callBacks, callBack, target) == -1) {
                this._callBacks.push(devil.CallBackInfo.create(callBack, target));
            }
        };
        StageManager.prototype.remove = function (callBack, target) {
            var index = devil.CallBackInfo.contains(this._callBacks, callBack, target);
            if (index >= 0)
                this._callBacks.splice(index, 1);
        };
        StageManager.prototype.___resize = function (e) {
            var len = this._callBacks.length;
            for (var i = len - 1; i >= 0; i--) {
                this._callBacks[i].runCallBack(this.width, this.height);
            }
        };
        return StageManager;
    }());
    devil.StageManager = StageManager;
})(devil || (devil = {}));
