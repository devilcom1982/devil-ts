namespace devil
{
    /**
     * 资源回收类型
     * @author devil
     * @version V20180807
     * @create V20180717
     * @place guangzhou
     * @description 整理
     */
    export class ResourceGCType
    {
        /**
         * 一直存在于游戏内存中
         */
        public static NEVER:number = 1;
        /**
         * 加载完后立即从内存中释放
         */
        public static NOW:number = 2;
        /**
         * 通用类型
         */
        public static COMMON:number = 3;
        /**
         * 地图块资源类型
         */
        public static MAP:number = 4;
        /**
         * 动画资源
         */
        public static ANIMATION:number = 5;
        /**
         * 声音资源
         */
        public static SOUND:number = 6;

        /**
         * 加载错误的释放,开发版3秒回收内存，发布版立即回收内存
         */
        public static ERROR:number = 7;

        /**
         * 资源存在于内存的时间，以MS为单位
         * @params type ResourceGCType类型
         */
        public static getGCTime(type:number):number
        {
            if(type == ResourceGCType.NOW)return 0;
            else if(type == ResourceGCType.SOUND)return 0;
            else if(type == ResourceGCType.MAP) return 60000;
            else if(type == ResourceGCType.COMMON) return 60000;
            else if(type == ResourceGCType.ANIMATION) return 60000*2;
            else if(type == ResourceGCType.ERROR)
            {
                if(DEBUG)return 3000;
                return 0;
            }
            return 60000;
        }
    }
}