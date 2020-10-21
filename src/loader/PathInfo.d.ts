declare namespace devil {
    /**
     * 路径信息类，相关的参数key是相对路径，并且不带版本号
     * @author devil
     * @version V20180807
     * @create V20180717
     * @place guangzhou
     * @description 整理
     */
    class PathInfo {
        private static _dic;
        private _version;
        /**
         * 相对路径，此值作为集合的关键值
         */
        key: string;
        /**
         * 带有版本号的URL地址(绝对路径)
         * 特别说明
         *      加载贴图文件,     参数格式[json_url,texture_url]
         *      加载地图路径配置, 参数格式[path_url,smallMap_url]
         *      加载龙骨动画配置, 参数格式[name_ske.dbbin name_tex.json name_tex.png]
         */
        urls: string[];
        /**
         * 文件大小
         */
        size: number;
        /**
         * 内存大小
         */
        memory: number;
        /**
         * 加载类型,对应LoaderType常量
         */
        loaderType: number;
        /**
        * @param key			相对路径地址
        * @param version        版本号
        * @param size           文件大小
        * @param memory         文件内存
        * @param absolute       绝对路径
        */
        constructor(key: string, version: string, size: number, memory: number, absolute?: boolean);
        /**
         * 设置加载类型
         * @param loaderType
         */
        private setURL;
        /**
         * 如果加载失败，则尝试使用随机数做版本加载
         * @param index urls索引值
         */
        reload(index: number): void;
        /**
        * @param key        相对路径并且不带版本号的地址
        * @param loaderType 加载类型,对应LoaderType常量
        * @param absolute   绝对路径,默认为true,表示使用绝对路径
        */
        static getPath(key: string, loaderType: number, absolute?: boolean, version?: string): PathInfo;
    }
}
