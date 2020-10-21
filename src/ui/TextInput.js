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
     * @description
     * @author        devil
     * @version       V20190413
     * @create        2019-04-13
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var TextInput = /** @class */ (function (_super_1) {
        __extends(TextInput, _super_1);
        function TextInput() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.TEXT_INPUT;
            return _this;
        }
        Object.defineProperty(TextInput.prototype, "editor", {
            get: function () {
                return this._editor;
            },
            set: function (value) {
                if (this._editor == value)
                    return;
                this._editor = value;
                this._text.editor = this._editor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "text", {
            get: function () {
                if (this._text.text == this._prompt)
                    return "";
                return this._text.text;
            },
            set: function (value) {
                this._text.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "color", {
            get: function () {
                return this._text.color;
            },
            set: function (value) {
                this._text.color = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "bold", {
            get: function () {
                return this._text.bold;
            },
            set: function (value) {
                this._text.bold = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "size", {
            get: function () {
                return this._text.size;
            },
            set: function (value) {
                this._text.size = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "align", {
            get: function () {
                return this._text.align;
            },
            set: function (value) {
                this._text.align = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "enabled", {
            set: function (value) {
                if (this._enabled != value) {
                    this._enabled = value;
                    this.touchEnabled = this._enabled;
                    this.touchChildren = this._enabled;
                    this.invalidate(devil.InvalidationType.ENABLED);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "prompt", {
            get: function () {
                return this._prompt;
            },
            set: function (value) {
                this._prompt = value;
                if (!devil.StringUtil.isEmpty(this._prompt)) {
                    this._text.text = this._prompt;
                    this._text.displayAsPassword = false;
                    this._text.__focusIn(this.___focusIn, this);
                    this._text.__focusOut(this.___focusOut, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "maxChars", {
            get: function () {
                return this._text.maxChars;
            },
            set: function (value) {
                this._text.maxChars = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "displayAsPassword", {
            get: function () {
                return this._text.displayAsPassword;
            },
            set: function (value) {
                this._displayAsPassword = value;
                this._text.displayAsPassword = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "restrict", {
            get: function () {
                return this._text.restrict;
            },
            set: function (value) {
                this._text.restrict = value;
            },
            enumerable: true,
            configurable: true
        });
        TextInput.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this.autoCreateLayer(2);
            this.touchEnabled = true;
            this.touchChildren = true;
            this._editor = true;
            this._width = devil.ComponentDefault.TEXT_WIDTH;
            this._height = devil.ComponentDefault.TEXT_HEIGHT;
            this._back = devil.View.create(devil.Image);
            this.addChild(this._back, this._layers[0]);
            this._text = devil.View.create(devil.Text);
            this._text.x = 5;
            this.addChild(this._text, this.layers[1]);
            this._text.editor = true;
            this._layers[1].touchChildren = true;
            this._prompt = "";
            this._displayAsPassword = false;
        };
        TextInput.prototype.setDefaultStyle = function () {
            this._styles[devil.StyleName.UP_BACK_SKIN] = null;
            this._styles[devil.StyleName.DISENABLED_BACK_SKIN] = null;
        };
        TextInput.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(devil.InvalidationType.STYLE) || this.isInvalid(devil.InvalidationType.ENABLED))
                this.drawStyle();
            if (this.isInvalid(devil.InvalidationType.SIZE))
                this.drawSize();
        };
        // private drawStyle():void
        // {
        //     let data:string;
        //     let rect:egret.Rectangle;
        //     if(!this._enabled)
        //     {
        //         data = this.getStyle(StyleName.DISENABLED_BACK_SKIN);
        //         rect = this.getStyle(StyleName.DISENABLED_ICON_RECT);
        //     }
        //     if(data == null)
        //     {
        //         data = this.getStyle(StyleName.UP_BACK_SKIN);
        //         rect = this.getStyle(StyleName.UP_BACK_RECT);
        //     }
        //     this._back.source = data;
        //     this._back.scale9Grid = rect;
        // }
        TextInput.prototype.drawStyle = function () {
            var data;
            if (!this._enabled)
                data = this.getImageData(devil.StyleName.DISENABLED_BACK_SKIN);
            if (data == null)
                data = this.getImageData(devil.StyleName.UP_BACK_SKIN);
            this._back.source = data.name;
            this._back.scale9Grid = data.scale9Grid;
        };
        TextInput.prototype.drawSize = function () {
            this._back.setSize(this._width, this._height);
            this._text.setSize(this._width, this._height);
            this._back.repaint();
            this._text.repaint();
        };
        TextInput.prototype.setFocus = function () {
            this._text.setFocus();
        };
        TextInput.prototype.unuse = function () {
            this._text = null;
            this._back = null;
            _super_1.prototype.unuse.call(this);
        };
        TextInput.prototype.dispose = function () {
            this._text = null;
            this._back = null;
            _super_1.prototype.dispose.call(this);
        };
        TextInput.prototype.___focusIn = function (e, target) {
            if (this._text.text == this._prompt) {
                this._text.text = "";
                this._text.displayAsPassword = this._displayAsPassword;
            }
        };
        TextInput.prototype.___focusOut = function (e, target) {
            if (devil.StringUtil.isEmpty(this._text.text)) {
                this._text.displayAsPassword = false;
                this._text.text = this._prompt;
            }
        };
        return TextInput;
    }(devil.Container));
    devil.TextInput = TextInput;
})(devil || (devil = {}));
