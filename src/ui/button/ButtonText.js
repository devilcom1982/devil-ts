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
     * 文本按钮
     * @author        devil
     * @version       V20190418
     * @create        V2019-04-18
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ButtonText = /** @class */ (function (_super_1) {
        __extends(ButtonText, _super_1);
        function ButtonText() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.BUTTON_TXT;
            return _this;
        }
        Object.defineProperty(ButtonText.prototype, "label", {
            /**
             * 文本实例
             */
            get: function () {
                return this._label;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ButtonText.prototype, "text", {
            get: function () {
                return this._label.text;
            },
            /**
             * 设置按钮的文本显示内容
             */
            set: function (value) {
                this._label.text = value;
            },
            enumerable: true,
            configurable: true
        });
        ButtonText.prototype.initLayer = function () {
            _super_1.prototype.initLayer.call(this);
            this._txtLayer = this.createLayer();
        };
        ButtonText.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._labelOffsetX = 0;
            this._labelOffsetY = 0;
            this._label = devil.View.create(devil.Text);
            this.addChild(this._label, this._txtLayer);
        };
        ButtonText.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(devil.InvalidationType.LAYOUT, devil.InvalidationType.SIZE))
                this.drawLayout();
        };
        ButtonText.prototype.drawSize = function () {
            _super_1.prototype.drawSize.call(this);
            this._label.setSize(this._width, this._label.textHeight + 5);
        };
        ButtonText.prototype.drawState = function () {
            _super_1.prototype.drawState.call(this);
            if (this._downOffset && this._buttonState == devil.ButtonState.DOWN) {
                this._label.move(this._labelX + 1, this._labelY + 1);
            }
            else {
                this._label.move(this._labelX, this._labelY);
            }
        };
        /**
         * 设置文本的偏移量
         * @param x
         * @param y
         */
        ButtonText.prototype.setLabelOffset = function (x, y) {
            if (this._labelOffsetX == x && this._labelOffsetY == y)
                return;
            this._labelOffsetX = x;
            this._labelOffsetY = y;
            this.invalidate(devil.InvalidationType.LAYOUT);
        };
        ButtonText.prototype.drawLayout = function () {
            this._labelX = ((this._width - this._label.width) >> 1) + this._labelOffsetX;
            this._labelY = ((this._height - this._label.height) >> 1) + this._labelOffsetY;
            this._label.move(this._labelX, this._labelY);
        };
        ButtonText.prototype.unuse = function () {
            this._label = null;
            _super_1.prototype.unuse.call(this);
            this._txtLayer = null;
        };
        ButtonText.prototype.dispose = function () {
            this._label = null;
            _super_1.prototype.dispose.call(this);
            this._txtLayer = null;
        };
        return ButtonText;
    }(devil.ButtonImage));
    devil.ButtonText = ButtonText;
})(devil || (devil = {}));
