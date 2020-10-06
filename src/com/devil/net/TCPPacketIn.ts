namespace devil
{
    /**
     * @author        devil
     * @version       V20190311
     * @create        2019-03-11
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */	
    export class TCPPacketIn extends ByteArrayExtend
    {
        private _protocol:number;

        public get protocol()
        {
            return this._protocol;
        }

        public set protocol(value:number)
        {
            this._protocol = value;
        }

        public constructor()
        {
            super();
        }
    }
}