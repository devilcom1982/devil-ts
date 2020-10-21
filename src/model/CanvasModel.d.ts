declare namespace devil {
    /**
     * 面板数据
     * @author        devil
     * @version       V20190223
     * @create        2019-02-23
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class CanvasModel {
        private _versions;
        private _canvases;
        get canvases(): any;
        constructor();
        getBytes(name: string): ByteArrayExtend;
        getVersion(name: string): string;
        addCanvas(bytes: ByteArrayExtend, name: string, version: string): void;
        /**
         * 清空数据
         */
        clear(): void;
    }
}
