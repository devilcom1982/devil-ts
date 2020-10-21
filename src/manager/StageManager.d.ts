declare namespace devil {
    /**
     * 场景管理器
     * @author        devil
     * @version       V20190131
     * @create        2019-01-31
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class StageManager {
        private _frameTime;
        private _callBacks;
        stage: egret.Stage;
        /**
         * 当前视图窗口的宽度，以实际像素为主
         */
        displayWidth: number;
        /**
         * 当前视图窗口的高度，以实际像素为主
         */
        displayHeight: number;
        get width(): number;
        get height(): number;
        get frameRate(): number;
        get frameTime(): number;
        constructor(stage: egret.Stage);
        add(callBack: (width: number, height: number) => void, target: any): void;
        remove(callBack: (width: number, height: number) => void, target: any): void;
        private ___resize;
    }
}
