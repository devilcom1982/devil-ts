declare namespace devil {
    /**
     * 解析资源配置文件(白鹭默认资源编辑器工具的配置文件default.res.json数据)
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    class ResourceConfig implements IResourceConfig {
        /**
         * 一级键名字典
         */
        private keyMap;
        /**
         * 解析一个配置文件
         * @method RES.ResourceConfig#parseConfig
         * @param data {any} 配置文件数据,Json格式
         * @param folder {string} 加载项的路径前缀。
         */
        parseConfig(data: any, folder: string): void;
        /**
         * 添加一个加载项数据到列表
         */
        private addItemToKeyMap;
        /**
         * 添加一个二级键名到配置列表。
         * @method RES.ResourceConfig#addSubkey
         * @param subkey {string} 要添加的二级键名
         * @param name {string} 二级键名所属的资源name属性
         */
        addSubkey(subkey: string, name: string): void;
        /**
         * 获取加载项的name属性
         * @method RES.ResourceConfig#getType
         * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
         * @returns {string}
         */
        getName(key: string): string;
        contains(url: string, key: string): boolean;
        /**
         * 获取加载项类型。
         * @method RES.ResourceConfig#getType
         * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
         * @returns {string}
         */
        getType(key: string): string;
        getRawResourceItem(key: string): any;
        /**
         * 获取加载项信息对象
         * @method RES.ResourceConfig#getResourceItem
         * @param key {string} 对应配置文件里的key属性或sbuKeys属性的一项。
         * @returns {egret.ResourceItem}
         */
        getResourceItem(key: string): ResourceItem;
        getURL(key: string): string;
        /**
         * 转换Object数据为ResourceItem对象
         */
        private parseResourceItem;
    }
}
