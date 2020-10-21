declare namespace devil {
    /**
     * 图片组件
     * @author        devil
     * @version       V20190131
     * @create        2019-01-31
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class Image extends Component {
        private _layer;
        private _clickFun;
        private _downFun;
        protected _bitmap: egret.Bitmap;
        protected _source: egret.Texture | string;
        protected _path: PathInfo;
        protected _completeFun: CallBackInfo;
        get bitmap(): egret.Bitmap;
        /**
         * 九宫格
         */
        set scale9Grid(value: egret.Rectangle);
        get scale9Grid(): egret.Rectangle;
        /**
         * 图片源数据
         */
        get source(): egret.Texture | string;
        set source(value: egret.Texture | string);
        constructor();
        protected initLayer(): void;
        /**
         * @private
         */
        protected start(): void;
        protected draw(): void;
        private drawSize;
        protected drawData(): void;
        unuse(): void;
        dispose(): void;
        /**
         * 加载完成的回调函数，参数为[TextureLoader,Image]
         * @param callBack
         * @param target
         */
        __complete(callBack: (loader: TextureLoader, target: Image) => void, target: any): void;
        protected ___complete(loader: BaseLoader): void;
        __click(callBack: (e: egret.TouchEvent, target: Image | ImageRemote) => void, target: any): void;
        __down(callBack: Function, target: any): void;
        private ___touchTap;
        private ___touchBegin;
    }
}
