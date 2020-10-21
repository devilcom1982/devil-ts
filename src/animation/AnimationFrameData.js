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
    var AnimationFrameData = /** @class */ (function () {
        function AnimationFrameData() {
        }
        AnimationFrameData.prototype.pool = function () {
            devil.Manager.pool.push(this);
        };
        AnimationFrameData.prototype.reuse = function () {
        };
        AnimationFrameData.prototype.unuse = function () {
            this.offX = 0;
            this.offY = 0;
            devil.Manager.pool.pushTexture(this.texture);
            this.texture = null;
        };
        AnimationFrameData.prototype.dispose = function () {
            this.unuse();
        };
        AnimationFrameData.create = function (offX, offY, texture) {
            var result = devil.Manager.pool.create(AnimationFrameData);
            result.offX = offX;
            result.offY = offY;
            result.texture = texture;
            return result;
        };
        return AnimationFrameData;
    }());
    devil.AnimationFrameData = AnimationFrameData;
})(devil || (devil = {}));
