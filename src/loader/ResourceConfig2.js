var devil;
(function (devil) {
    /**
     * 解析资源配置文件(自定义配置资源文件编辑器)
     * @author        devil
     * @version       V20190131
     * @create        2019-03-08
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ResourceConfig2 = /** @class */ (function () {
        function ResourceConfig2() {
            /**
             * 一级键名字典
             */
            this.keyMap = {};
        }
        ResourceConfig2.prototype.getURL = function (key) {
            var item = this.getResourceItem(key);
            if (!item)
                return key;
            return item.url;
        };
        ResourceConfig2.prototype.parseConfig = function (data, folder) {
            folder = folder == null ? this.folder : folder;
            var bytes = data;
            var version = bytes.readUTF();
            var textureCount = bytes.readByte();
            var textureName;
            var skinName;
            var skinCount;
            var item;
            for (var i = 0; i < textureCount; i++) {
                textureName = bytes.readUTF();
                skinCount = bytes.readShort();
                for (var j = 0; j < skinCount; j++) {
                    item = new devil.ResourceItem(bytes.readUTF(), folder + textureName + devil.Extension.JSON_);
                    if (bytes.readBoolean())
                        item.scale9Grid = new egret.Rectangle(bytes.readShort(), bytes.readShort(), bytes.readShort(), bytes.readShort());
                    this.keyMap[item.name] = item;
                }
            }
        };
        ResourceConfig2.prototype.getName = function (key) {
            var data = this.keyMap[key];
            return data ? data.name : "";
        };
        ResourceConfig2.prototype.contains = function (url, key) {
            var data = this.keyMap[key];
            return (data.url == url);
        };
        ResourceConfig2.prototype.getResourceItem = function (key) {
            return this.keyMap[key];
        };
        return ResourceConfig2;
    }());
    devil.ResourceConfig2 = ResourceConfig2;
})(devil || (devil = {}));
