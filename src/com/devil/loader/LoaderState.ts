namespace devil
{
    /**
     * 加载状态
     * @author devil
     * @version V20180719
     * @create V20180719
     * @place guangzhou
     */
    export class LoaderState
    {
        /**
         * 等待状态
         */
        public static WAITING:number = 0;
        /**
         * 正在加载
         */
        public static LOADING:number = 1;
        /**
         * 加载成功
         */
        public static SUCESS:number = 2;

        /**
         * 加载失败
         */
        public static FAIL:number = 3;
    }
}