var devil;
(function (devil) {
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
    var LayerID = /** @class */ (function () {
        function LayerID() {
        }
        LayerID.getLayers = function () {
            return [this.COMMON_LAYER, this.UI_LAYER, this.EFFECT_LAYER, this.COMMON_TOP_LAYER];
        };
        /**
         * 空
         */
        LayerID.EMPTY = 0;
        /**
         * 贴图层1，一般对应的common贴图
         */
        LayerID.COMMON_LAYER = 1;
        /**
         * 贴图层2,一般对应的对应系统贴图
         */
        LayerID.UI_LAYER = 2;
        /**
         * 文本、特效层
         */
        LayerID.EFFECT_LAYER = 4;
        /**
         * 贴图层，超越文本特效的贴图层，例如红点图片等。一般对应的common贴图
         */
        LayerID.COMMON_TOP_LAYER = 8;
        return LayerID;
    }());
    devil.LayerID = LayerID;
})(devil || (devil = {}));
