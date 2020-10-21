var devil;
(function (devil) {
    /**
     * 解析资源配置文件(白鹭默认资源编辑器工具的配置文件default.res.json数据)
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    var ResourceConfig = /** @class */ (function () {
        function ResourceConfig() {
            /**
             * 一级键名字典
             */
            this.keyMap = {};
        }
        /**
         * 解析一个配置文件
         * @method RES.ResourceConfig#parseConfig
         * @param data {any} 配置文件数据,Json格式
         * @param folder {string} 加载项的路径前缀。
         */
        ResourceConfig.prototype.parseConfig = function (data, folder) {
            if (!data)
                return;
            var resources = data["resources"];
            if (resources) {
                var length_1 = resources.length;
                for (var i = 0; i < length_1; i++) {
                    var item = resources[i];
                    var url = item.url;
                    if (url && url.indexOf("://") == -1)
                        item.url = folder + url;
                    this.addItemToKeyMap(item);
                }
            }
        };
        /**
         * 添加一个加载项数据到列表
         */
        ResourceConfig.prototype.addItemToKeyMap = function (item) {
            if (!this.keyMap[item.name])
                this.keyMap[item.name] = item;
            if (item.hasOwnProperty("subkeys")) {
                var subkeys = (item.subkeys).split(",");
                item.subkeys = subkeys;
                var length_2 = subkeys.length;
                for (var i = 0; i < length_2; i++) {
                    var key = subkeys[i];
                    if (this.keyMap[key] != null)
                        continue;
                    this.keyMap[key] = item;
                }
            }
        };
        /**
         * 添加一个二级键名到配置列表。
         * @method RES.ResourceConfig#addSubkey
         * @param subkey {string} 要添加的二级键名
         * @param name {string} 二级键名所属的资源name属性
         */
        ResourceConfig.prototype.addSubkey = function (subkey, name) {
            var item = this.keyMap[name];
            if (item && !this.keyMap[subkey]) {
                this.keyMap[subkey] = item;
            }
        };
        /**
         * 获取加载项的name属性
         * @method RES.ResourceConfig#getType
         * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
         * @returns {string}
         */
        ResourceConfig.prototype.getName = function (key) {
            var data = this.keyMap[key];
            return data ? data.name : "";
        };
        ResourceConfig.prototype.contains = function (url, key) {
            var data = this.keyMap[key];
            return (data.url == url);
        };
        /**
         * 获取加载项类型。
         * @method RES.ResourceConfig#getType
         * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
         * @returns {string}
         */
        ResourceConfig.prototype.getType = function (key) {
            var data = this.keyMap[key];
            return data ? data.type : "";
        };
        ResourceConfig.prototype.getRawResourceItem = function (key) {
            return this.keyMap[key];
        };
        /**
         * 获取加载项信息对象
         * @method RES.ResourceConfig#getResourceItem
         * @param key {string} 对应配置文件里的key属性或sbuKeys属性的一项。
         * @returns {egret.ResourceItem}
         */
        ResourceConfig.prototype.getResourceItem = function (key) {
            var data = this.keyMap[key];
            if (data)
                return this.parseResourceItem(data);
            return null;
        };
        ResourceConfig.prototype.getURL = function (key) {
            var item = this.getResourceItem(key);
            if (!item)
                return key;
            return this.getResourceItem(key).url;
        };
        /**
         * 转换Object数据为ResourceItem对象
         */
        ResourceConfig.prototype.parseResourceItem = function (data) {
            // let resItem:ResourceItem = new ResourceItem(data.name, data.url, data.type);
            var resItem = new devil.ResourceItem(data.name, data.url);
            return resItem;
        };
        return ResourceConfig;
    }());
    devil.ResourceConfig = ResourceConfig;
    // export class ResourceItem
    // {
    //     public name:string;
    //     public type:string;
    //     public url:string;
    //     public constructor(name:string,url:string,type:string)
    //     {
    //         this.name = name;
    //         this.url = url;
    //         this.type = type;
    //     }
    // }
})(devil || (devil = {}));
