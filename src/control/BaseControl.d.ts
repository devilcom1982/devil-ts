declare namespace devil {
    /**
     * 控制器基类
     * @author        devil
     * @version       V20190419
     * @create        2019-04-19
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class BaseControl {
        constructor();
        protected initCMD(): void;
        protected addCMD(protocol: number, cls: any): void;
        protected send(protocol: number): void;
        protected getCMD<T>(protocol: number): T;
    }
}
