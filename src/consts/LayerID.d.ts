declare namespace devil {
    /**
     * UI的层ID，与编辑器对应
     * @author        devil
     * @version       V2019611
     * @create        2019-06-11
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class LayerID {
        /**
         * 空
         */
        static EMPTY: number;
        /**
         * 贴图层1，一般对应的common贴图
         */
        static COMMON_LAYER: number;
        /**
         * 贴图层2,一般对应的对应系统贴图
         */
        static UI_LAYER: number;
        /**
         * 文本、特效层
         */
        static EFFECT_LAYER: number;
        /**
         * 贴图层，超越文本特效的贴图层，例如红点图片等。一般对应的common贴图
         */
        static COMMON_TOP_LAYER: number;
        static getLayers(): number[];
    }
}
