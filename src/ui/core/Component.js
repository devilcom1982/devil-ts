var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var devil;
(function (devil) {
    /**
     * 组件基类，所有的组件都需要继承此类
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var Component = /** @class */ (function (_super_1) {
        __extends(Component, _super_1);
        function Component() {
            return _super_1.call(this) || this;
        }
        Object.defineProperty(Component.prototype, "type", {
            /**
             * 组件类型，对应的常量ComponentType
             */
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        Component.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._styles = {};
            this._stylesOffset = {};
            this._layerID = 0;
            this.setDefaultStyle();
        };
        /**
         * 设置缺省样式
         */
        Component.prototype.setDefaultStyle = function () {
        };
        /**
         * 获取指定名字的样式皮肤字符串
         * @param name		StyleName常量或自定义的特殊样式名
         */
        Component.prototype.getStyle = function (name) {
            return this._styles[name];
        };
        Component.prototype.getImageData = function (styleName) {
            return devil.Model.resConfig.getResourceItem(this.getStyle(styleName));
        };
        /**
         * 设置指定名字的样式皮肤字符串
         * @param name		StyleName常量或自定义的特殊样式名
         * @param value		皮肤字符串
         */
        Component.prototype.setStyle = function (name, value) {
            if (this._styles[name] == value)
                return;
            this._styles[name] = value;
            this.invalidate(devil.InvalidationType.STYLE);
        };
        /**
         * 设置指定名字的样式便宜
         * @param name		StyleName常量或自定义的特殊样式名
         */
        Component.prototype.setStyleOffset = function (name, xOffset, yOffset) {
            this._stylesOffset[name] = [xOffset, yOffset];
            this.invalidate(devil.InvalidationType.STYLE);
        };
        /**
         * 设置指定名字的样式便宜
         * @param name		StyleName常量或自定义的特殊样式名
         */
        Component.prototype.getStyleXoffset = function (name) {
            var offset = this._stylesOffset[name];
            return offset ? offset[0] : 0;
        };
        /**
         * 设置指定名字的样式便宜
         * @param name		StyleName常量或自定义的特殊样式名
         */
        Component.prototype.getStyleYoffset = function (name) {
            var offset = this._stylesOffset[name];
            return offset ? offset[1] : 0;
        };
        Component.prototype.unuse = function () {
            for (var key in this._styles) {
                this._styles[key] = null;
            }
            this._styles = null;
            this._stylesOffset = null;
            _super_1.prototype.unuse.call(this);
        };
        Component.prototype.dispose = function () {
            for (var key in this._styles) {
                this._styles[key] = null;
            }
            this._styles = null;
            this._stylesOffset = null;
            _super_1.prototype.dispose.call(this);
        };
        return Component;
    }(devil.View));
    devil.Component = Component;
})(devil || (devil = {}));
