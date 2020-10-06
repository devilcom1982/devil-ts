namespace devil
{
    /**
     * 加载类型
     * @author devil
     * @version V20190909
     * @create 2018-07-19
     * @update devil 2019-09-09  填加NovieClip动画数据加载
     * @place guangzhou
     */
    export class LoaderType
    {
        /**
         * 先加载path.txt（二进制解析加载，然后删除源数据），再加载smallMap.jpg
         */
        public static MAP_DATA:number = 0;
        /**
         * 先加载json再加载贴图
         */
        public static ANI:number = 1;
        /**
         * 加载文本
         */
        public static TEXT:number = 2;

        /**
         * 二进制解析加载，不删除源数据
         */
        public static BIN:number = 3;
        /**
         * 加载声音
         */
        public static SOUND:number = 4;
        /**
         * 加载图片
         */
        public static IMAGE:number = 5;
        /**
         * 帖图加载
         */
        public static TEXTURE:number = 6;
        /**
         * 龙骨动画数据加载
         */
        public static DRAGON:number = 7;
        /**
         * MovieClip动画数据加载
         */
        public static MOVIE_CLIP:number = 8;
    }
}