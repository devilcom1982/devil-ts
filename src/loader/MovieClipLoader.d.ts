declare namespace devil {
    /**
     * MC帧动画数据加载器
     * @author  devil
     * @version V20190909
     * @create  2019-09-09
     * @place   guangzhou
     */
    class MovieClipLoader extends BaseLoader implements IPool {
        texture: egret.Texture;
        json: any;
        data: egret.MovieClipDataFactory;
        protected parse(data: any): void;
        protected reload(index: number): void;
        /**
         * 加载
         */
        load(): void;
        unuse(): void;
    }
}
