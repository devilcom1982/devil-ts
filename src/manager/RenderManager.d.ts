declare namespace devil {
    /**
     * 渲染管理器
     * @author        devil
     * @version       V20190122
     * @create        2019-01-12
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class RenderManager {
        private _callBacks;
        private _shape;
        private _interval;
        private _lastTime;
        private _addRenderCount;
        /**
         * 当前帧与上一帧的时间间隔，以毫秒为单位
         */
        getInterval(): number;
        constructor();
        /**
         * 是否包含指定的函数及对象，并且alive为true
         * @params render 回调函数
         * @params target 回调对象
         * @params return 大于-1则表示不包含，否则会返回当前的索引值
         */
        contains(render: Function, target: any): number;
        /**
        * 添加计时器render:Function, target:any, deley:number = 0, repeat:number = 0, end:Function = null, forceReset:boolean = false,...args:any[]
        * @params render 单次回调函数
        * @params target 包含函数的对象
        * @params deley 执行时间间隔，单位毫秒，0或小于0表示每帧都执行,默认为0
        * @params repeat 执行次数，0或小于0表示无限次
        * @params end 最后一次执行的回调函数
        * @params forceReset 强制重置设置，比如之前已add该render，则重置该render的值
        */
        add(render: Function, target: any, deley?: number, repeat?: number, end?: Function, forceReset?: boolean, ...args: any[]): void;
        /**
        * 移除计时器
        */
        remove(render: Function, target: any): void;
        private render;
        removeAll(target: any): void;
        private ___enterFrame;
    }
    class RenderTimerInfo implements IPool {
        alive: boolean;
        interval: number;
        delay: number;
        repeat: number;
        args: any[];
        render: CallBackInfo;
        end: CallBackInfo;
        constructor();
        reuse(): void;
        unuse(): void;
        dispose(): void;
        pool(): void;
        static create(render: Function, target: any, deley: number, repeat: number, end: Function, args: any[]): RenderTimerInfo;
    }
}
