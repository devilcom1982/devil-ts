declare namespace devil {
    /**
     * 回调函数信息类
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    class CallBackInfo implements IPool {
        private _callBack;
        private _target;
        private _args;
        get target(): any;
        get callBack(): Function;
        /**
         * 执行回调函数
         */
        runCallBack(...args: any[]): void;
        equals(callBack: Function, target: any): boolean;
        pool(): void;
        reuse(): void;
        unuse(): void;
        dispose(): void;
        static create(callBack: Function, target: any, ...args: any[]): CallBackInfo;
        /**
         * 指定的回调函数数组中是否有指定的回调函数，如果存在，则返回对应的索引值，否则返回-1
         * @param callBacks 回调函数数组
         * @param callBack  回调函数
         * @param target    回调函数对象
         */
        static contains(callBacks: CallBackInfo[], callBack: Function, target: any): number;
    }
}
