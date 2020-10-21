declare namespace devil {
    /**
     * 批处理加载器
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    class BatchLoader implements IPool {
        private _callBack;
        private _oneComplete;
        private _oneTarget;
        private _oneError;
        private _errorTarget;
        private _current;
        private _total;
        private _paths;
        constructor();
        reuse(): void;
        private oneComplete;
        unuse(): void;
        /**
         * 释放内存
         */
        dispose(): void;
        private __error;
        private __oneComplete;
        static create(paths: PathInfo[], resourceGCType?: number, priority?: number, complete?: Function, target?: any, oneComplete?: Function, oneTarget?: any, oneError?: Function, errorTarget?: any): BatchLoader;
    }
}
