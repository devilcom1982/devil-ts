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
     * List组件
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var List = /** @class */ (function (_super_1) {
        __extends(List, _super_1);
        function List() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.LIST;
            return _this;
        }
        Object.defineProperty(List.prototype, "scrollPolicyV", {
            get: function () {
                return this._scrollPolicyV;
            },
            set: function (value) {
                if (this._scrollPolicyV == value)
                    return;
                this._scrollPolicyV = value;
                // this._scroll.checkScrollPolicy();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "scrollPolicyH", {
            get: function () {
                return this._scrollPolicyH;
            },
            set: function (value) {
                if (this._scrollPolicyH == value)
                    return;
                this._scrollPolicyH = value;
                // this._scroll.checkScrollPolicy();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "container", {
            get: function () {
                return this._container;
            },
            set: function (value) {
                if (this._container == value)
                    return;
                this._container = value;
                this._container.setSize(this._width, this._height);
                var temp = this._container;
                this.addChild(temp, this._layer);
                this._scroll.list = this;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "layout", {
            get: function () {
                return this._layout;
            },
            set: function (value) {
                this._layout = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "bounces", {
            set: function (value) {
                this._scroll.bounces = value;
            },
            enumerable: true,
            configurable: true
        });
        List.prototype.initLayer = function () {
            this._layer = this.createLayer();
        };
        List.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._scroll = devil.Manager.pool.create(devil.ScrollBar);
            this._scrollPolicyH = devil.ScrollPolicy.OFF;
            this._scrollPolicyV = devil.ScrollPolicy.AUTO;
            this._layout = List.VERTICAL;
        };
        List.prototype.unuse = function () {
            this._scroll.pool();
            this._scroll = null;
            this._container = null;
            this._layer = null;
            _super_1.prototype.unuse.call(this);
        };
        List.prototype.dispose = function () {
            this._scroll.pool();
            this._scroll = null;
            this._container = null;
            this._layer = null;
            _super_1.prototype.dispose.call(this);
        };
        /**
         * 方向垂直
         */
        List.VERTICAL = 1;
        /**
         * 水平方向
         */
        List.HORIZONTAL = 2;
        return List;
    }(devil.Container));
    devil.List = List;
})(devil || (devil = {}));
