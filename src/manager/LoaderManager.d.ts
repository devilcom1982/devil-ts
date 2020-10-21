declare namespace devil {
    /**
     * 加载管理器
     * @author devil
     * @version V20201008
     * @create V20180717
     * @place guangzhou
     * @update V20201008 guangzhou 加入Text请求Post方式
     */
    class LoaderManager {
        private _queues;
        private _needSort;
        private _loadingThread;
        private _maxThread;
        private _loadersCanGC;
        private _loadersCannotGC;
        private _loadersFail;
        /**
         * 微信小游戏不需要版本号，默认值为true
         */
        needVersion: boolean;
        /**
         * 资源的根路径
         */
        resourceUrl: string;
        constructor();
        setup(resourceUrl?: string, needVersion?: boolean): void;
        /**
         * 对相对路径进行root+计算,也就是将相对路径转换成绝对路径.
         */
        rootToURL(url: string): string;
        /**
          * 加载
          * @param path              路径
          * @param complete          加载完成回调函数
          * @param target            回调函数的主体
          * @param resourceGCType    资源回收类型，对应ResourceGCType常量，默认值为ResourceGCType.NOW
          * @param priority          加载顺序等级，越大越高,对应ResPriorityType常量,默认值为ResPriorityType.LOAD_LEVEL1
          */
        load(path: PathInfo, complete: Function, target: any, resourceGCType?: number, priority?: number, error?: Function, errorTarget?: any): ILoader;
        /**
         * 是否正在加载或加载完成
         * @param path
         */
        has(path: PathInfo): boolean;
        private getLoader;
        private complete;
        private render;
        private next;
        private error2;
        private sortQueues;
        /**
         * 取消加载的回调
         * @param path              路径
         * @param complete          加载完成回调函数
         * @param target            回调函数的主体
         */
        remove(path: PathInfo, complete: Function, target: any, error?: Function, errorTarget?: any): void;
        /**
         * 批处理加载
         * @param paths
         * @param resourceGCType
         * @param priority
         * @param complete
         * @param target
         */
        loadBatch(paths: PathInfo[], resourceGCType?: number, priority?: number, complete?: Function, target?: any, oneComplete?: Function, oneTarget?: any, oneError?: Function, errorTarget?: any): void;
        /**添加到加载失败列表 */
        addFail(key: string): void;
    }
}
