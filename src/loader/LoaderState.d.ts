declare namespace devil {
    /**
     * 加载状态
     * @author devil
     * @version V20180719
     * @create V20180719
     * @place guangzhou
     */
    class LoaderState {
        /**
         * 等待状态
         */
        static WAITING: number;
        /**
         * 正在加载
         */
        static LOADING: number;
        /**
         * 加载成功
         */
        static SUCESS: number;
        /**
         * 加载失败
         */
        static FAIL: number;
    }
}
