declare namespace devil {
    /**
     * 龙骨动画加载器
     * @author  devil
     * @version V20190115
     * @create  2019-01-15
     * @place   guangzhou
     */
    class DragonLoader extends BaseLoader implements IPool {
        bytes: any;
        texture: egret.Texture;
        json: any;
        protected parse(data: any): void;
        protected reload(index: number): void;
        /**
         * 加载
         */
        load(): void;
        unuse(): void;
    }
}
