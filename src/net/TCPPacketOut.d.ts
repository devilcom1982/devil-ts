declare namespace devil {
    /**
     * 发送协议包头
     * @author        devil
     * @version       V20190311
     * @create        20180726
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class TCPPacketOut extends ByteArrayExtend {
        private static LENGTH_LEN;
        private static PROTOCOL_LEN;
        private static VERIFY_LEN;
        private static COMMON_TOTAL_LEN;
        protocol: number;
        constructor();
        writePacketLenAndVerify(): void;
        static create(protocol: number): TCPPacketOut;
    }
}
