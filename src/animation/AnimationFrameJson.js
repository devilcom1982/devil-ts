var devil;
(function (devil) {
    /**
     * 自定义动画数据
     * @author anydo
     * @version V20180811
     * @create 2018-03-01
     * @place guangzhou
     * @update devil 整理 2018-08-11
     */
    var AnimationFrameJson = /** @class */ (function () {
        function AnimationFrameJson() {
        }
        AnimationFrameJson.prototype.reuse = function () {
        };
        AnimationFrameJson.prototype.unuse = function () {
            this.offX = 0;
            this.offY = 0;
            this.frameName = "";
            this.rectObj = null;
        };
        AnimationFrameJson.prototype.pool = function () {
            return devil.Manager.pool.push(this);
        };
        AnimationFrameJson.prototype.dispose = function () {
            this.unuse();
        };
        AnimationFrameJson.create = function (frameName, offX, offY, rectObj) {
            var result = devil.Manager.pool.create(AnimationFrameJson);
            result.frameName = frameName;
            result.offX = offX;
            result.offY = offY;
            result.rectObj = rectObj;
            return result;
        };
        return AnimationFrameJson;
    }());
    devil.AnimationFrameJson = AnimationFrameJson;
})(devil || (devil = {}));
