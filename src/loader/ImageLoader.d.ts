declare namespace devil {
    /**
     * 图片加载器
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    class ImageLoader extends BaseLoader {
        texture: egret.Texture;
        protected parse(data: any): void;
        /**
         * 加载
         */
        load(): void;
        protected reload(index: number): void;
        unuse(): void;
    }
}
