declare namespace devil {
    /**
     * 广告管理器
     * @author        devil
     * @version       V20200909
     * @create        2020-09-09
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class WXADManger {
        private _jili;
        private _banner;
        private _chaping;
        private _bannerShow;
        private _testAD;
        setup(bannerID: string, jiliID: string, chapingID: string): void;
        private createBanner;
        private createJiLi;
        private createChaPing;
        /**
         * 打开激励广告
         */
        openJiLi(callBack: (isEnd: boolean) => void, target: any): void;
        /**
         * 打开插屏广告
         */
        openChaPing(): void;
        /**
         * 打开或关闭Banner广告
         * @param show
         */
        switchBanner(show: boolean): void;
    }
}
