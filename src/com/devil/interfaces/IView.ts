namespace devil
{
    /**
     * 需要视图管理器打开的统一接口
     * @author        devil
     * @version       V20190405
     * @create        2019-04-05
     * @update 	      author:更新者        time:更新日期        description:更新描述    
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    export interface IView
    {
        show():void;
        /**
         * 
         * @param fromModal 是否点击modal背景关掉
         * @default false
         */
        hide(fromModal?:boolean):boolean;

        // show2():void;
    }
}