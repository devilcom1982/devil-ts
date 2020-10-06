namespace devil
{
    /**
     * 协议处理基类
     * @author devil
     * @version V20180728
     * @create V20180728
     * @place guangzhou
     * @QQ    101644277
     */
    export class BaseCMD
    {
        protected _protocol:number;

        public get protocol():number
        {
            return this._protocol;
        }
        
        public receive(pkg:TCPPacketIn):void{}
    
        protected processOut(pkg:TCPPacketOut):void{}
    
        protected get canSend()
        {
            return true;
        }
    
        public send():void
        {
            if(this.canSend)
            {
                let out:TCPPacketOut = TCPPacketOut.create(this._protocol);
                this.processOut(out);
                Manager.socket.send(out);
            }
        }
    }
}