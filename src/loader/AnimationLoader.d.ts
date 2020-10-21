declare namespace devil {
    /**
     * 动画加载器
     * @author devil
     * @version V20180811
     * @create V20180811
     * @place guangzhou
     */
    class AnimationLoader extends BaseLoader {
        sheet: AnimationData;
        private _bitmapData;
        private _json;
        protected parse(data: any): void;
        unuse(): void;
        /**
         * 加载
         */
        load(): void;
        protected reload(index: number): void;
        static abc: boolean;
    }
}
