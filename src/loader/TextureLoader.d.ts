declare namespace devil {
    /**
     * 贴图加载器
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    class TextureLoader extends BaseLoader {
        private _sheet;
        private _bitmapData;
        private _json;
        getTexture(name: string): egret.Texture;
        protected parse(data: any): void;
        protected reload(index: number): void;
        /**
         * 加载
         */
        load(): void;
        unuse(): void;
        gc(): boolean;
    }
}
