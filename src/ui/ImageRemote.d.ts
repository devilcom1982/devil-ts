declare namespace devil {
    /**
     * 加载外部图片视图组件
     * @author        devil
     * @version       V20190222
     * @create        2019-02-22
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ImageRemote extends Image {
        get url(): string | PathInfo;
        set url(value: string | PathInfo);
        set source(value: egret.Texture | string);
        constructor();
        protected start(): void;
        protected drawData(): void;
        protected ___complete(loader: BaseLoader): void;
    }
}
