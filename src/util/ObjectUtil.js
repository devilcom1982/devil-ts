var devil;
(function (devil) {
    /**
     * 对象工具管理器
     * @author        devil
     * @version       Nov 25, 2018
     * @create        Nov 25, 2018
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ObjectUtil = /** @class */ (function () {
        function ObjectUtil() {
        }
        /**
         * 将指定的显示对象从(指定的)父级中删除，但不释放内存
         * @param child         指定的显示对象
         * @param container     指定的容器。一旦指定了此参数，则指定的显示对象一定要在此容器中才会删除。
         */
        ObjectUtil.removeFromParent = function (child, parent) {
            if (parent === void 0) { parent = null; }
            if (child == null)
                return;
            if (child.parent != null && (parent == child.parent || parent == null))
                child.parent.removeChild(child);
        };
        /**
         * 批量将显示对象从自身的父级中删除，但不释放内存
         * @param childs
         */
        ObjectUtil.removes = function () {
            var childs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                childs[_i] = arguments[_i];
            }
            var i = childs.length - 1;
            while (i >= 0) {
                this.removeFromParent(childs[i]);
                i--;
            }
        };
        ObjectUtil.dispose = function (child) {
            if (!!child)
                child.dispose();
        };
        return ObjectUtil;
    }());
    devil.ObjectUtil = ObjectUtil;
})(devil || (devil = {}));
