declare namespace devil {
    /**
     * @author        devil
     * @version       V20190311
     * @create        2019-03-11
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class TCPPacketIn extends ByteArrayExtend {
        private _protocol;
        get protocol(): number;
        set protocol(value: number);
        constructor();
    }
}
