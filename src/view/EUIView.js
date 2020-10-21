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
     * EUI带有皮肤的基类
     * @author        devil
     * @version       V20190826
     * @create        2019-08-26
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var EUIView = /** @class */ (function (_super_1) {
        __extends(EUIView, _super_1);
        function EUIView() {
            var _this = _super_1.call(this) || this;
            _this.start();
            return _this;
            // this.addEvent();
        }
        EUIView.prototype.start = function () {
            this._isPool = false;
            this._invalid = devil.InvalidationType.INIT;
            this._loadComplete = false;
            this.touchEnabled = false;
            this.touchChildren = false;
            this.addEventListener(eui.UIEvent.COMPLETE, this.___complete, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.___addedToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.___removedFromStage, this);
        };
        EUIView.prototype.___addedToStage = function (e) {
            this.startCallLater();
        };
        EUIView.prototype.startCallLater = function () {
            if (this.stage == null || !this._loadComplete)
                return;
            devil.Manager.render.add(this.repaint, this);
        };
        /**
         * 强制重绘
         */
        EUIView.prototype.repaint = function () {
            this.draw();
            this.validate();
            devil.Manager.render.remove(this.repaint, this);
        };
        EUIView.prototype.validate = function () {
            this._invalid = devil.InvalidationType.EMPTY;
        };
        /**
     * 在未另外指定的情况下，将属性标记为无效，并在下一帧上重绘组件。
     * @param property   要使其无效的属性
     */
        EUIView.prototype.invalidate = function (property) {
            this._invalid = this._invalid | property;
            this.startCallLater();
        };
        /**
         * Included the first property as a proper param to enable *some* type checking, and also because it is a required param.
         * @param property
         * @param properties
         * @return
         */
        EUIView.prototype.isInvalid = function (property) {
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
        EUIView.prototype.move = function (x, y) {
            this.x = x;
            this.y = y;
        };
        EUIView.prototype.draw = function () {
            if (this.isInvalid(devil.InvalidationType.INIT))
                this.drawInit();
        };
        EUIView.prototype.drawInit = function () {
            // this.start();
            this.configUI();
            this.addEvent();
        };
        EUIView.prototype.configUI = function () {
        };
        EUIView.prototype.addEvent = function () {
        };
        EUIView.prototype.removeEvent = function () {
        };
        EUIView.prototype.addViewChild = function (child) {
            var layers = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                layers[_i - 1] = arguments[_i];
            }
            var layer;
            var layerLen = layers ? layers.length : 0;
            for (var i = 0; i < child.layers.length; ++i) {
                layer = layerLen > i ? layers[i] : this;
                layer.addChild(child.layers[i]);
            }
        };
        EUIView.prototype.addViewChildAt = function (child, index) {
            for (var i = 0; i < child.layers.length; ++i) {
                this.addChildAt(child.layers[i], index + i);
            }
        };
        // public reuse():void
        // {
        //     this.start();
        //     this.addEvent();
        // }
        // public unuse():void
        // {
        //     this.x = 0;
        //     this.y = 0;
        //     this.alpha = 1;
        //     this.scaleX = 1;
        //     this.scaleY = 1;
        //     this.rotation = 0;
        //     this.visible = true;
        //     this.anchorOffsetX = 0;
        //     this.anchorOffsetY = 0;
        //     this.touchEnabled = false;
        //     this.touchChildren = false;
        //     this.cacheAsBitmap = false;
        //     Manager.render.remove(this.repaint,this);
        //     this.removeEvent();
        //     this.removeEventListener(eui.UIEvent.COMPLETE, this.___complete, this);
        //     this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.___addedToStage, this);
        //     this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.___removedFromStage, this);
        //     if(this.parent)this.parent.removeChild(this);
        // }
        EUIView.prototype.dispose = function () {
            devil.Manager.render.remove(this.repaint, this);
            this.removeEvent();
            this.removeEventListener(eui.UIEvent.COMPLETE, this.___complete, this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.___addedToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.___removedFromStage, this);
            if (this.parent)
                this.parent.removeChild(this);
        };
        EUIView.prototype.___removedFromStage = function (e) {
            devil.Manager.render.remove(this.repaint, this);
        };
        EUIView.prototype.___complete = function (e) {
            this._loadComplete = true;
            this.invalidate(devil.InvalidationType.INIT);
            this.startCallLater();
        };
        return EUIView;
    }(eui.Component));
    devil.EUIView = EUIView;
})(devil || (devil = {}));
