namespace devil
{
    /**
     * tip接口
     * @author        devil
     * @version       V20190425
     * @create        2019-04-25
     * @update 	      author:更新者        time:更新日期        description:更新描述    
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    export interface ITip extends IDispose
    {
        setData(...args):void;
        /**
         * 显示
         */
        show():void;
    }
}
