namespace devil
{
    /**
     * 控制器基类
     * @author        devil
     * @version       V20190419
     * @create        2019-04-19
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */	
    export class BaseControl
    {
        public constructor()
        {
            this.initCMD();
        }

        protected initCMD():void
        {

        }

        protected addCMD(protocol:number,cls:any):void
        {
            Manager.socket.addCMD(protocol,cls);
        }

        protected send(protocol:number):void
        {
            Manager.socket.getCMD<BaseCMD>(protocol).send();
        }

        protected getCMD<T>(protocol:number):T
        {
            return Manager.socket.getCMD<T>(protocol);
        }
    }
}