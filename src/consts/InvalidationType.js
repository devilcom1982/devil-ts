var devil;
(function (devil) {
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
    var InvalidationType = /** @class */ (function () {
        function InvalidationType() {
        }
        /**
         * 标记为空
         */
        InvalidationType.EMPTY = 0;
        /**
         * 内部布局标记
         */
        InvalidationType.LAYOUT = 256;
        // /**
        //  * 位置标记 
        //  */		
        // public static POSITION:number = 8;
        /**
         * 长宽标记
         */
        InvalidationType.SIZE = 512;
        /**
         * 数据标记
         */
        InvalidationType.DATA = 1024;
        /**
         * 样式标记
         */
        InvalidationType.STYLE = 2048;
        /**
         * 是否可交互
         */
        InvalidationType.ENABLED = 4096;
        /**
         * 初始化
         */
        InvalidationType.INIT = 8192;
        /**
         * 初始化标记
         */
        // public static ALL:number =  InvalidationType.LAYOUT | InvalidationType.POSITION | InvalidationType.SIZE | InvalidationType.DATA | InvalidationType.STYLE | InvalidationType.ENABLED;
        InvalidationType.ALL = InvalidationType.LAYOUT | InvalidationType.SIZE | InvalidationType.DATA | InvalidationType.STYLE | InvalidationType.ENABLED;
        return InvalidationType;
    }());
    devil.InvalidationType = InvalidationType;
})(devil || (devil = {}));
