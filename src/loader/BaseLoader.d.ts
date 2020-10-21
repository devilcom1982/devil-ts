declare namespace devil {
    /**
     * 加载器基类
     * @author  devil
     * @version V20190115
     * @create  2019-01-15
     * @place   guangzhou
     */
    class BaseLoader implements ILoader {
        private _priority;
        private _callBacks;
        private _errorCallBacks;
        private _imgLoader;
        private _httpReqs;
        private _dispatchLoadErrorEvent;
        private _errorCount;
        private _useTimer;
        private _state;
        protected _unUseTimer: number;
        protected _resourceGCType: number;
        protected _count: number;
        protected _path: PathInfo;
        private static MAX_ERROR;
        /**
         * 加载优化级
         */
        getPriority(): number;
        /**
         * 路径信息
         */
        getPath(): PathInfo;
        getUseTimer(): number;
        /**
         * 加载状态，对应的LoaderState常量值
         */
        getState(): number;
        constructor();
        private start;
        /**
         * 填加加载成功回调函数
         * @param complete
         * @param target
         */
        add(complete: Function, target: any, error?: Function, errorTarget?: any): void;
        /**
         * 删除加载成功回调函数
         * @param complete
         * @param target
         */
        remove(complete: Function, target: any, error?: Function, errorTarget?: any): void;
        private unuseHttpReqs;
        private unuseHttpReq;
        private unuseImgLoader;
        protected parse(data: any): void;
        private callBack;
        private errorCallBack;
        /**
         * 解析并缓存加载成功的数据
         */
        private $analyzeData;
        protected reload(index: number): void;
        private error;
        /**
         * 引用计数加1
         */
        addCount(): void;
        /**
         * 引用计数减1，如果计数小于0，则会重置使用时间，等待垃圾回收
         */
        removeCount(): void;
        protected $load(responseType: string, index: number): void;
        protected $request(httpReq: egret.HttpRequest, index: number): void;
        protected $loadImage(url: string): void;
        /**
         * 加载
         */
        load(): void;
        pool(): void;
        /**
         * 垃圾回收
         */
        gc(): boolean;
        reuse(): void;
        unuse(): void;
        /**
         * 释放内存
         */
        dispose(): void;
        private ___httpReqComplete;
        private ___httpReqErrorComplete;
        private ___imageLoaderComplete;
        private ___imageLoaderErrorComplete;
        static create(cls: {
            new (): ILoader;
        }, path: PathInfo, priority: number, resourceGCType: number): ILoader;
    }
}
