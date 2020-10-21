declare namespace devil {
    /**
     * 通用标记无效常量
     * @author        devil
     * @version       V20181228
     * @create        2018-12-28
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class InvalidationType {
        /**
         * 标记为空
         */
        static EMPTY: number;
        /**
         * 内部布局标记
         */
        static LAYOUT: number;
        /**
         * 长宽标记
         */
        static SIZE: number;
        /**
         * 数据标记
         */
        static DATA: number;
        /**
         * 样式标记
         */
        static STYLE: number;
        /**
         * 是否可交互
         */
        static ENABLED: number;
        /**
         * 初始化
         */
        static INIT: number;
        /**
         * 初始化标记
         */
        static ALL: number;
    }
}
