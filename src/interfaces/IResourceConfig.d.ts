/**
 * 资源配置的接口
 * @author        devil
 * @version       V20190131
 * @create        2019-03-08
 * @qq            346443480
 * @email         346443480 @ qq.com
 * @place         guangzhou
 */
declare namespace devil {
    interface IResourceConfig {
        getURL(key: string): string;
        /**
         * 解析一个配置文件
         * @param data
         * @param folder
         */
        parseConfig(data: any, folder: string): void;
        contains(url: string, name: string): boolean;
        getResourceItem(key: string): ResourceItem;
    }
}
