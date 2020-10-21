declare namespace devil {
    /**
     * 资源回收类型
     * @author devil
     * @version V20180807
     * @create V20180717
     * @place guangzhou
     * @description 整理
     */
    class ResourceGCType {
        /**
         * 一直存在于游戏内存中
         */
        static NEVER: number;
        /**
         * 加载完后立即从内存中释放
         */
        static NOW: number;
        /**
         * 通用类型
         */
        static COMMON: number;
        /**
         * 地图块资源类型
         */
        static MAP: number;
        /**
         * 动画资源
         */
        static ANIMATION: number;
        /**
         * 声音资源
         */
        static SOUND: number;
        /**
         * 加载错误的释放,开发版3秒回收内存，发布版立即回收内存
         */
        static ERROR: number;
        /**
         * 资源存在于内存的时间，以MS为单位
         * @params type ResourceGCType类型
         */
        static getGCTime(type: number): number;
    }
}
