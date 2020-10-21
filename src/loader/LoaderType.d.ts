declare namespace devil {
    /**
     * 加载类型
     * @author devil
     * @version V20190909
     * @create 2018-07-19
     * @update devil 2019-09-09  填加NovieClip动画数据加载
     * @place guangzhou
     */
    class LoaderType {
        /**
         * 先加载path.txt（二进制解析加载，然后删除源数据），再加载smallMap.jpg
         */
        static MAP_DATA: number;
        /**
         * 先加载json再加载贴图
         */
        static ANI: number;
        /**
         * 加载文本
         */
        static TEXT: number;
        /**
         * 二进制解析加载，不删除源数据
         */
        static BIN: number;
        /**
         * 加载声音
         */
        static SOUND: number;
        /**
         * 加载图片
         */
        static IMAGE: number;
        /**
         * 帖图加载
         */
        static TEXTURE: number;
        /**
         * 龙骨动画数据加载
         */
        static DRAGON: number;
        /**
         * MovieClip动画数据加载
         */
        static MOVIE_CLIP: number;
    }
}
