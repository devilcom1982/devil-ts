declare namespace devil {
    /**
     * 释放接口
     * @author        devil
     * @version       V20190111
     * @create        Jan 10, 2018
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    interface IDispose {
        /**
         * 内存释放，如果是视图类需要在此方法内实现从父级中删除
         */
        dispose(): void;
    }
}
