var devil;
(function (devil) {
    /**
     * 面板数据
     * @author        devil
     * @version       V20190223
     * @create        2019-02-23
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var CanvasModel = /** @class */ (function () {
        function CanvasModel() {
            this._canvases = {};
            this._versions = {};
        }
        Object.defineProperty(CanvasModel.prototype, "canvases", {
            get: function () {
                return this._canvases;
            },
            enumerable: true,
            configurable: true
        });
        CanvasModel.prototype.getBytes = function (name) {
            return this._canvases[name];
        };
        CanvasModel.prototype.getVersion = function (name) {
            return this._versions[name];
        };
        CanvasModel.prototype.addCanvas = function (bytes, name, version) {
            this._canvases[name] = bytes;
            this._versions[name] = version;
        };
        /**
         * 清空数据
         */
        CanvasModel.prototype.clear = function () {
            for (var i in this._canvases) {
                this._canvases[i] = null;
            }
            this._canvases = {};
            for (var j in this._versions) {
                this._versions[j] = null;
            }
            this._versions = {};
        };
        return CanvasModel;
    }());
    devil.CanvasModel = CanvasModel;
})(devil || (devil = {}));
