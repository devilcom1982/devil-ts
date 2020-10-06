namespace devil
{
    /**
     * 加载器接口
     * @author devil
     * @version V20180813
     * @create V20180813
     * @place guangzhou
     */
    export interface ILoader extends IPool
    {
        /**
         * 加载优化级
         */
        getPriority():number;
        /**
         * 路径信息
         */
        getPath():PathInfo;
        /**
         * 使用时间
         */
        getUseTimer():number;
        /**
         * 加载状态，对应的LoaderState常量值
         */
        getState():number;
        /**
         * 填加加载成功回调函数
         * @param complete
         * @param target 
         */
        add(complete:Function,target:any,error?:Function,errorTarget?:any):void;
        /**
         * 删除加载成功回调函数
         * @param complete 
         * @param target 
         */
        remove(complete:Function,target:any,error?:Function,errorTarget?:any):void;
        /**
         * 加载
         */
        load():void;
        /**
         * 引用计数加1
         */
        addCount():void;
        /**
         * 引用计数减1，如果计数小于0，则会重置使用时间，等待垃圾回收
         */
        removeCount():void;
        /**
         * 回收内存
         */
        gc():boolean;
    }
}