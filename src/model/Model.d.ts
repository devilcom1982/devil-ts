declare namespace devil {
    /**
     * 数据
     * @author        devil
     * @version       V20190131
     * @create        2019-01-31
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class Model {
        /**
         * default.res.json配置文件的数据
         */
        static resConfig: IResourceConfig;
        static canvas: CanvasModel;
        static cvo: CVOModel;
        static wxGame: WXGameModel;
        static lifecyclePause: boolean;
        static setup(): void;
    }
}
