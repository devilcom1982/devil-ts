var devil;
(function (devil) {
    /**
     * 延时机制的非视图基类
     * @author        devil
     * @version       V20190826
     * @create        2019-08-26
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var BaseRender = /** @class */ (function () {
        function BaseRender() {
            this.start();
        }
        /*
            * 初始化变量
            */
        BaseRender.prototype.start = function () {
            this._isPool = true;
            this._invalid = devil.InvalidationType.ALL;
        };
        BaseRender.prototype.startCallLater = function () {
            devil.Manager.render.add(this.repaint, this);
        };
        /**
         * 强制重绘
         */
        BaseRender.prototype.repaint = function () {
            this.draw();
            this.validate();
            devil.Manager.render.remove(this.repaint, this);
        };
        BaseRender.prototype.validate = function () {
            this._invalid = devil.InvalidationType.EMPTY;
        };
        /**
         * Included the first property as a proper param to enable *some* type checking, and also because it is a required param.
         * @param property
         * @param properties
         * @return
         */
        BaseRender.prototype.isInvalid = function (property) {
            var properties = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                properties[_i - 1] = arguments[_i];
            }
            if ((this._invalid & property) == property) {
                return true;
            }
            while (properties.length > 0) {
                property = properties.pop();
                if ((this._invalid & property) == property) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 绘制方法,子类重写
         */
        BaseRender.prototype.draw = function () {
        };
        /**
         * 在未另外指定的情况下，将属性标记为无效，并在下一帧上重绘组件。
         * @param property   要使其无效的属性
         */
        BaseRender.prototype.invalidate = function (property) {
            this._invalid = this._invalid | property;
            this.startCallLater();
        };
        BaseRender.prototype.unuse = function () {
            devil.Manager.render.remove(this.repaint, this);
        };
        BaseRender.prototype.reuse = function () {
            this.start();
        };
        /**
         * 回收
         */
        BaseRender.prototype.pool = function () {
            if (this._isPool)
                devil.Manager.pool.push(this);
            else
                this.dispose();
        };
        BaseRender.prototype.dispose = function () {
            devil.Manager.render.remove(this.repaint, this);
        };
        return BaseRender;
    }());
    devil.BaseRender = BaseRender;
})(devil || (devil = {}));
