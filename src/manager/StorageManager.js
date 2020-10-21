var devil;
(function (devil) {
    /**
     * 基础管理器集，针对基本的管理器
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    var StorageManager = /** @class */ (function () {
        function StorageManager() {
        }
        StorageManager.prototype.getItem = function (key) {
            return egret.localStorage.getItem(key);
        };
        StorageManager.prototype.clear = function () {
            egret.localStorage.clear();
        };
        StorageManager.prototype.setItem = function (key, value) {
            egret.localStorage.setItem(key, value);
        };
        StorageManager.prototype.removeItem = function (key) {
            egret.localStorage.removeItem(key);
        };
        StorageManager.prototype.setBoolean = function (key, value) {
            egret.localStorage.setItem(key, value ? "1" : "0");
        };
        StorageManager.prototype.getBoolean = function (key) {
            return egret.localStorage.getItem(key) == "1";
        };
        StorageManager.prototype.setInt = function (key, value) {
            egret.localStorage.setItem(key, value.toString());
        };
        StorageManager.prototype.getInt = function (key) {
            return Number(egret.localStorage.getItem(key));
        };
        return StorageManager;
    }());
    devil.StorageManager = StorageManager;
})(devil || (devil = {}));
