var devil;
(function (devil) {
    /**
     * 字典工具类
     * @author        devil
     * @version       V20190425
     * @create        2019-04-29
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var Dictionary = /** @class */ (function () {
        function Dictionary() {
            this._keys = [];
            this._values = [];
            this._map = {};
        }
        Dictionary.prototype.get = function (key) {
            return this._map[key];
        };
        Dictionary.prototype.add = function (key, value) {
            if (value == undefined || value == null)
                return;
            this.remove(key);
            this._map[key] = value;
            this._keys.push(key);
            this._values.push(value);
        };
        Dictionary.prototype.remove = function (key) {
            var value = this._map[key];
            if (value == undefined)
                return;
            var index = this._keys.indexOf(key, 0);
            if (index > -1) {
                this._keys.splice(index, 1);
                this._values.splice(index, 1);
            }
            delete this._map[key];
            return value;
        };
        Dictionary.prototype.removeAll = function () {
            this._keys = [];
            this._values = [];
            this._map = {};
        };
        Dictionary.prototype.keys = function () {
            return this._keys;
        };
        Dictionary.prototype.values = function () {
            return this._values;
        };
        Dictionary.prototype.containsKey = function (key) {
            return this._map[key] != undefined;
        };
        return Dictionary;
    }());
    devil.Dictionary = Dictionary;
})(devil || (devil = {}));
