var devil;
(function (devil) {
    /**
     * 加载类型
     * @author devil
     * @version V20190909
     * @create 2018-07-19
     * @update devil 2019-09-09  填加NovieClip动画数据加载
     * @place guangzhou
     */
    var LoaderType = /** @class */ (function () {
        function LoaderType() {
        }
        /**
         * 先加载path.txt（二进制解析加载，然后删除源数据），再加载smallMap.jpg
         */
        LoaderType.MAP_DATA = 0;
        /**
         * 先加载json再加载贴图
         */
        LoaderType.ANI = 1;
        /**
         * 加载文本
         */
        LoaderType.TEXT = 2;
        /**
         * 二进制解析加载，不删除源数据
         */
        LoaderType.BIN = 3;
        /**
         * 加载声音
         */
        LoaderType.SOUND = 4;
        /**
         * 加载图片
         */
        LoaderType.IMAGE = 5;
        /**
         * 帖图加载
         */
        LoaderType.TEXTURE = 6;
        /**
         * 龙骨动画数据加载
         */
        LoaderType.DRAGON = 7;
        /**
         * MovieClip动画数据加载
         */
        LoaderType.MOVIE_CLIP = 8;
        return LoaderType;
    }());
    devil.LoaderType = LoaderType;
})(devil || (devil = {}));
