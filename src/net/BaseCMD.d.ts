declare namespace devil {
    /**
     * 协议处理基类
     * @author devil
     * @version V20180728
     * @create V20180728
     * @place guangzhou
     * @QQ    101644277
     */
    class BaseCMD {
        protected _protocol: number;
        get protocol(): number;
        receive(pkg: TCPPacketIn): void;
        protected processOut(pkg: TCPPacketOut): void;
        protected get canSend(): boolean;
        send(): void;
    }
}
