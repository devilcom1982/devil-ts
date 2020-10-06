namespace devil
{
    /**
     * 事件基类
     * @author devil
     * @version V20180702
     * @create 20180702
     * @place guangzhou
     */
    export class BaseEvent extends egret.Event
    {
        public params:any;
        public constructor(type:string, params?:any, bubbles?: boolean, cancelable?: boolean)
        {
            super(type, bubbles, cancelable);
            this.params = params;
        }
    }
}