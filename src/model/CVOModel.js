var devil;
(function (devil) {
    /**
     * 数据表
     * @author        devil
     * @version       V20190222
     * @create        2019-02-22
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var CVOModel = /** @class */ (function () {
        function CVOModel() {
            this._dic = {};
        }
        CVOModel.prototype.parse = function (source) {
            // let data:egret.ByteArray = source instanceof ArrayBuffer ?  new egret.ByteArray(source, source.byteLength) : source;
            var data;
            if (source instanceof ArrayBuffer) {
                data = devil.Manager.pool.createByteArray();
                data.buffer = source;
            }
            else {
                data = source;
            }
            var name;
            var len;
            var bytes;
            var current = 0;
            var count = data.readByte();
            while (current < count) {
                current++;
                name = data.readUTF();
                len = data.readInt();
                // bytes = new egret.ByteArray();
                bytes = devil.Manager.pool.createByteArray();
                bytes.writeBytes(data, data.position, len);
                data.position += len;
                bytes.position = 0;
                this._dic[name] = bytes;
            }
            // data.clear();
            devil.Manager.pool.pushByteArray(data);
        };
        CVOModel.prototype.getCVOData = function (name) {
            return this._dic[name];
        };
        CVOModel.prototype.clearCVOData = function (name) {
            devil.Manager.pool.pushByteArray(this._dic[name]);
            delete this._dic[name];
        };
        return CVOModel;
    }());
    devil.CVOModel = CVOModel;
})(devil || (devil = {}));
