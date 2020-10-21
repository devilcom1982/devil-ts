declare namespace devil {
    /**
     * @description
     * @author        devil
     * @version       V20190305
     * @create        2019-03-05
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    interface IListItem extends IRadioSelected {
        setData(value: any): void;
        /**
         * 清空数据
         */
        clearData(): void;
        index: number;
    }
}
