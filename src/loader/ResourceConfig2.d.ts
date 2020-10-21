declare namespace devil {
    /**
     * 解析资源配置文件(自定义配置资源文件编辑器)
     * @author        devil
     * @version       V20190131
     * @create        2019-03-08
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ResourceConfig2 implements IResourceConfig {
        folder: string;
        /**
         * 一级键名字典
         */
        private keyMap;
        getURL(key: string): string;
        parseConfig(data: any, folder: string): void;
        getName(key: string): string;
        contains(url: string, key: string): boolean;
        getResourceItem(key: string): ResourceItem;
    }
}
