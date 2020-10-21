var devil;
(function (devil) {
    /**
     * 平台管理器
     * @author        devil
     * @version       V20191122
     * @create        2019-11-22
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var PlatManager = /** @class */ (function () {
        function PlatManager() {
        }
        /**
         * 是否微信小游戏
         */
        PlatManager.prototype.isWX = function () {
            // return egret.Capabilities.runtimeType === egret.RuntimeType.WXGAME;
            return this.runtimeType == egret.RuntimeType.WXGAME;
        };
        /**
         * 是否QQ小游戏
         */
        PlatManager.prototype.isQQ = function () {
            // return egret.Capabilities.runtimeType === egret.RuntimeType.QQGAME;
            return this.runtimeType == egret.RuntimeType.QQGAME;
        };
        /**
         * 是否移动端
         */
        PlatManager.prototype.isMobile = function () {
            return egret.Capabilities.isMobile;
        };
        /**
         * 是否电脑端（包含Windows、MAC）
         */
        PlatManager.prototype.isPC = function () {
            return !egret.Capabilities.isMobile;
        };
        PlatManager.prototype.isDY = function () {
            return this.runtimeType == "dygame";
        };
        return PlatManager;
    }());
    devil.PlatManager = PlatManager;
})(devil || (devil = {}));
