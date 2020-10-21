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
     * 文本框
     * @author        devil
     * @version       V20190213
     * @create        2019-02-13
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var Text = /** @class */ (function (_super_1) {
        __extends(Text, _super_1);
        function Text() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.TEXT;
            return _this;
        }
        Object.defineProperty(Text.prototype, "color", {
            /**
             * 颜色
             */
            get: function () {
                return this._textField.textColor;
            },
            set: function (value) {
                this._textField.textColor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "bold", {
            /**
             * 是否加粗
             */
            get: function () {
                return this._textField.bold;
            },
            set: function (value) {
                this._textField.bold = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "size", {
            /**
             * 字体大小
             */
            get: function () {
                return this._textField.size;
            },
            set: function (value) {
                this._textField.size = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "text", {
            /**
             * 文本内容
             */
            get: function () {
                return this._textField.text;
            },
            set: function (value) {
                this._textField.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "align", {
            /**
             * 设置文本布局
             * @param value   egret.HorizontalAlign常量
             */
            get: function () {
                return this._textField.textAlign;
            },
            set: function (value) {
                this._textField.textAlign = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "editor", {
            /**
             * 是否可编辑
             */
            set: function (value) {
                if (value)
                    this._textField.type = egret.TextFieldType.INPUT;
                else
                    this._textField.type = egret.TextFieldType.DYNAMIC;
                this._textField.touchEnabled = value;
                this.touchChildren = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "textWidth", {
            get: function () {
                return this._textField.textWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "textHeight", {
            get: function () {
                return this._textField.textHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "wordWrap", {
            get: function () {
                return this._textField.wordWrap;
            },
            set: function (value) {
                this._textField.wordWrap = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "multiline", {
            get: function () {
                return this._textField.multiline;
            },
            set: function (value) {
                this._textField.multiline = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "verticalAlign", {
            set: function (value) {
                this._textField.verticalAlign = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "htmlText", {
            set: function (value) {
                this._textField.textFlow = (new egret.HtmlTextParser).parser(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "stroke", {
            set: function (value) {
                this._textField.stroke = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "strokeColor", {
            set: function (value) {
                this._textField.strokeColor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "lineSpacing", {
            set: function (value) {
                this._textField.lineSpacing = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "border", {
            set: function (value) {
                this._textField.border = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "textType", {
            set: function (value) {
                this._textField.type = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "background", {
            set: function (value) {
                this._textField.background = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "backgroundColor", {
            set: function (value) {
                this._textField.backgroundColor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "maxChars", {
            get: function () {
                return this._textField.maxChars;
            },
            set: function (value) {
                this._textField.maxChars = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "displayAsPassword", {
            get: function () {
                return this._textField.displayAsPassword;
            },
            set: function (value) {
                this._textField.displayAsPassword = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "restrict", {
            get: function () {
                return this._textField.restrict;
            },
            set: function (value) {
                this._textField.restrict = value;
            },
            enumerable: true,
            configurable: true
        });
        Text.prototype.initLayer = function () {
            this._layer = this.createLayer();
        };
        Text.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._width = devil.ComponentDefault.TEXT_WIDTH;
            this._height = devil.ComponentDefault.TEXT_HEIGHT;
            this._textField = devil.Manager.pool.createTextField();
            this._textField.verticalAlign = egret.VerticalAlign.MIDDLE;
            this._layer.addChild(this._textField);
        };
        Text.prototype.removeEvent = function () {
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.___click, this);
            this._textField.removeEventListener(egret.TextEvent.LINK, this.___link, this);
            this._textField.removeEventListener(egret.FocusEvent.FOCUS_IN, this.___focusIn, this);
            this._textField.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.___focusOut, this);
        };
        /**
         * @private
         */
        Text.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(devil.InvalidationType.SIZE))
                this.drawSize();
            ;
        };
        Text.prototype.drawSize = function () {
            this._textField.width = this._width;
            this._textField.height = this._height;
        };
        Text.prototype.appendText = function (text) {
            this._textField.appendText(text);
        };
        Text.prototype.setFocus = function () {
            this._textField.setFocus();
        };
        /**
         * @private
         */
        Text.prototype.unuse = function () {
            this.removeEvent();
            devil.Manager.pool.pushTextField(this._textField);
            this._textField = null;
            this._layer = null;
            if (this._clickFun)
                this._clickFun.pool();
            this._clickFun = null;
            if (this._linkFun)
                this._linkFun.pool();
            this._linkFun = null;
            if (this._focusInFun)
                this._focusInFun.pool();
            this._focusInFun = null;
            if (this._focusOutFun)
                this._focusOutFun.pool();
            this._focusOutFun = null;
            _super_1.prototype.unuse.call(this);
        };
        /**
         * @private
         */
        Text.prototype.dispose = function () {
            this.removeEvent();
            devil.Manager.pool.pushTextField(this._textField);
            this._textField = null;
            this._layer = null;
            if (this._clickFun)
                this._clickFun.pool();
            this._clickFun = null;
            if (this._linkFun)
                this._linkFun.pool();
            this._linkFun = null;
            if (this._focusInFun)
                this._focusInFun.pool();
            this._focusInFun = null;
            if (this._focusOutFun)
                this._focusOutFun.pool();
            this._focusOutFun = null;
            _super_1.prototype.dispose.call(this);
        };
        Text.prototype.__click = function (callBack, target) {
            this._layer.touchEnabled = true;
            if (!this._layer.hasEventListener(egret.TouchEvent.TOUCH_TAP))
                this._layer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.___click, this);
            this._clickFun = devil.CallBackInfo.create(callBack, target);
        };
        Text.prototype.___click = function (e) {
            if (this._clickFun != null)
                this._clickFun.runCallBack(e, this);
        };
        Text.prototype.__link = function (callBack, target) {
            this._textField.touchEnabled = true;
            if (!this._textField.hasEventListener(egret.TextEvent.LINK)) {
                this._textField.addEventListener(egret.TextEvent.LINK, this.___link, this);
            }
            this._linkFun = devil.CallBackInfo.create(callBack, target);
        };
        Text.prototype.___link = function (e) {
            if (this._linkFun != null)
                this._linkFun.runCallBack(e, this);
        };
        Text.prototype.__focusIn = function (callBack, target) {
            this._textField.touchEnabled = true;
            this._focusInFun = devil.CallBackInfo.create(callBack, target);
            if (!this._textField.hasEventListener(egret.FocusEvent.FOCUS_IN)) {
                this._textField.addEventListener(egret.FocusEvent.FOCUS_IN, this.___focusIn, this);
            }
        };
        Text.prototype.___focusIn = function (e) {
            if (this._focusInFun != null)
                this._focusInFun.runCallBack(e, this);
        };
        Text.prototype.__focusOut = function (callBack, target) {
            this._focusOutFun = devil.CallBackInfo.create(callBack, target);
            if (!this._textField.hasEventListener(egret.FocusEvent.FOCUS_OUT)) {
                this._textField.addEventListener(egret.FocusEvent.FOCUS_OUT, this.___focusOut, this);
            }
        };
        Text.prototype.___focusOut = function (e) {
            if (this._focusOutFun != null)
                this._focusOutFun.runCallBack(e, this);
        };
        return Text;
    }(devil.Component));
    devil.Text = Text;
})(devil || (devil = {}));
