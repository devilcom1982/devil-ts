namespace devil
{
    /**
     * 发送协议包头
     * @author        devil
     * @version       V20190311
     * @create        20180726
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */	
    export class TCPPacketOut extends ByteArrayExtend
    {
        private static LENGTH_LEN:number = 2;//协议长度占用字节数
        private static PROTOCOL_LEN:number = 2;//协议号占用字节数
        private static VERIFY_LEN:number = 1;//验证字段占用字节数
        private static COMMON_TOTAL_LEN:number = 5;//需要忽略的公共协议头(2字节长度+2字节协议号+1字节服务器验证)长度

        public protocol:number;
        
        public constructor()
        {
            super();
        }

        public writePacketLenAndVerify(): void
        {
            this.position = 0;
            this.writeShort(this.length - TCPPacketOut.COMMON_TOTAL_LEN);
            this.position = TCPPacketOut.LENGTH_LEN + TCPPacketOut.PROTOCOL_LEN;
            this.writeByte(Manager.socket.verify);
            Manager.socket.addVerify();
            this.position = 0;
        }
    
        public static create(protocol:number):TCPPacketOut
        {
            let result:TCPPacketOut = Manager.pool.create(TCPPacketOut);
            result.position = TCPPacketOut.LENGTH_LEN;
            result.protocol = protocol;
            result.writeShort(protocol);
            result.position = TCPPacketOut.LENGTH_LEN + TCPPacketOut.PROTOCOL_LEN + TCPPacketOut.VERIFY_LEN;
            return result;
        }
    }
}
