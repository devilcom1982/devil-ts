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
    var AnimationData = /** @class */ (function () {
        function AnimationData() {
            this.start();
        }
        AnimationData.prototype.start = function () {
            this._frameJsons = [];
            this._frames = {};
        };
        AnimationData.prototype.parseJson = function (json) {
            if (json == null)
                return;
            var key;
            for (key in json.mc)
                break;
            var offsetArr = json.mc[key].frames;
            this.totalFrames = offsetArr.length;
            var frameName;
            var offX;
            var offY;
            var rectObj;
            var oneJson;
            for (var i = 0; i < this.totalFrames; i++) {
                frameName = offsetArr[i].res;
                offX = offsetArr[i].x;
                offY = offsetArr[i].y;
                rectObj = json.res[frameName];
                oneJson = devil.AnimationFrameJson.create(frameName, offX, offY, rectObj);
                this._frameJsons.push(oneJson);
            }
        };
        AnimationData.prototype.getKeyFrameData = function (frame) {
            if (this._frames[frame] == null) {
                this.createFrameData(frame);
            }
            return this._frames[frame];
        };
        AnimationData.prototype.createFrameData = function (frame) {
            var frameJson = this._frameJsons[frame - 1];
            var rectObj = frameJson ? frameJson.rectObj : { x: 0, y: 0, w: 1, h: 1 };
            var texture = devil.Manager.pool.createTexture();
            texture.bitmapData = this._texture.bitmapData;
            texture.disposeBitmapData = false;
            texture.$initData(rectObj.x, rectObj.y, rectObj.w, rectObj.h, 0, 0, rectObj.w, rectObj.h, this._texture.bitmapData.width, this._texture.bitmapData.height);
            this._frames[frame] = devil.AnimationFrameData.create(frameJson ? frameJson.offX : 0, frameJson ? frameJson.offY : 0, texture);
        };
        AnimationData.prototype.reuse = function () {
            this.start();
        };
        AnimationData.prototype.unuse = function () {
            var len = this._frameJsons.length;
            for (var i = 0; i < len; i++) {
                this._frameJsons[i].pool();
            }
            this._frameJsons = null;
            for (var frame in this._frames) {
                this._frames[frame].pool();
                delete this._frames[frame];
            }
            this._frames = null;
            this.totalFrames = 0;
            if (this._texture) {
                // this._texture.dispose();
                devil.Manager.pool.pushTexture(this._texture);
                this._texture = null;
            }
        };
        AnimationData.prototype.pool = function () {
            devil.Manager.pool.push(this);
        };
        AnimationData.prototype.dispose = function () {
            this.unuse();
        };
        AnimationData.create = function (bitmapData, json) {
            var texture = devil.Manager.pool.createTexture();
            texture.bitmapData = bitmapData;
            var result = devil.Manager.pool.create(AnimationData);
            result._texture = texture;
            result.parseJson(json);
            return result;
        };
        return AnimationData;
    }());
    devil.AnimationData = AnimationData;
})(devil || (devil = {}));
