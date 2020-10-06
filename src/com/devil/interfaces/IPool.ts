namespace devil
{
    /**
     * 对象池回收接口，在应用程序运行的过程中频繁创建的对象，建议使用对象池。使用此接口的对象的构建函数不要传入参数，都统一使用unuse方法来初始化数据。
     * @author        devil
     * @version       V20190107
     * @create        2018-12-25
     * @update 	      devil        2019-01-07        reuse更新不带参数
     * @place         guangzhou
     */
    export interface IPool extends IDispose
    {
        /**
         * 对象重新使用或创建时会初始话一些数据，此方法自动调用，无需手动调用。
         */
        reuse():void;
        /**
         * 对象放入对象池中，重置一些必要的数据。此方法自动调用，无需手动调用。
         */
        unuse():void;
    }
}