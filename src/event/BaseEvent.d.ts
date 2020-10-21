declare namespace devil {
    /**
     * 事件基类
     * @author devil
     * @version V20180702
     * @create 20180702
     * @place guangzhou
     */
    class BaseEvent extends egret.Event {
        params: any;
        constructor(type: string, params?: any, bubbles?: boolean, cancelable?: boolean);
    }
}
