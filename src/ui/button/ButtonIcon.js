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
     * 图标按钮
     * @author        devil
     * @version       V20190211
     * @create        2019-02-11
     * @update 	      devil        2019-03-07        优化图标按钮布局自动根据长宽设置，不需要手动设置图标长宽
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ButtonIcon = /** @class */ (function (_super_1) {
        __extends(ButtonIcon, _super_1);
        function ButtonIcon() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.BUTTON_ICON;
            return _this;
        }
        ButtonIcon.prototype.initLayer = function () {
            _super_1.prototype.initLayer.call(this);
            this._iconLayer = this.createLayer();
        };
        /**
         * @private
         */
        ButtonIcon.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._iconOffsetX = 0;
            this._iconOffsetY = 0;
            this._iconWidth = -1;
            this._iconWidth = -1;
            this._icon = devil.View.create(devil.Image);
            this._icon.__complete(this.___complete, this);
            this.addChild(this._icon, this._iconLayer);
        };
        /**
         * @private
         */
        ButtonIcon.prototype.setDefaultStyle = function () {
            _super_1.prototype.setDefaultStyle.call(this);
            this._styles[devil.StyleName.UP_ICON_SKIN] = null;
            this._styles[devil.StyleName.DOWN_ICON_SKIN] = null;
            this._styles[devil.StyleName.DISENABLED_ICON_SKIN] = null;
        };
        /**
         * @private
         */
        ButtonIcon.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(devil.InvalidationType.LAYOUT))
                this.drawLayout();
        };
        /**
         * @private
         */
        ButtonIcon.prototype.drawState = function () {
            _super_1.prototype.drawState.call(this);
            var styleName;
            var iconX = this._iconX;
            var iconY = this._iconY;
            if (this._buttonState == devil.ButtonState.UP)
                styleName = devil.StyleName.UP_ICON_SKIN;
            else if (this._buttonState == devil.ButtonState.DOWN) {
                styleName = devil.StyleName.DOWN_ICON_SKIN;
                if (this._downOffset) {
                    iconX += 1;
                    iconY += 1;
                }
            }
            else if (this._buttonState == devil.ButtonState.DISANABLED)
                styleName = devil.StyleName.DISENABLED_ICON_SKIN;
            iconX += this.getStyleXoffset(styleName);
            iconY += this.getStyleYoffset(styleName);
            this._icon.move(iconX, iconY);
            this.drawIconSkin(styleName);
        };
        ButtonIcon.prototype.drawIconSkin = function (styleName) {
            var data = this.getStyle(styleName);
            this._iconStyleName = styleName;
            if (data == null)
                data = this.getStyle(devil.StyleName.UP_ICON_SKIN);
            this._icon.source = data;
        };
        /**
         * 设置图标的偏移量
         * @param x
         * @param y
         */
        ButtonIcon.prototype.setIconOffset = function (x, y) {
            if (this._iconOffsetX == x && this._iconOffsetY == y)
                return;
            this._iconOffsetX = x;
            this._iconOffsetY = y;
            this.invalidate(devil.InvalidationType.LAYOUT);
        };
        ButtonIcon.prototype.drawLayout = function () {
            this._iconX = ((this._width - this._iconWidth) >> 1) + this._iconOffsetX;
            this._iconY = ((this._height - this._iconHeight) >> 1) + this._iconOffsetY;
            var xOffset = this.getStyleXoffset(this._iconStyleName);
            var yOffset = this.getStyleYoffset(this._iconStyleName);
            this._icon.move(this._iconX + xOffset, this._iconY + yOffset);
        };
        /**
         * @private
         */
        ButtonIcon.prototype.unuse = function () {
            this._iconLayer = null;
            this._icon = null;
            _super_1.prototype.unuse.call(this);
        };
        /**
         * @private
         */
        ButtonIcon.prototype.dispose = function () {
            this._iconLayer = null;
            this._icon = null;
            _super_1.prototype.dispose.call(this);
        };
        ButtonIcon.prototype.___complete = function (loader, target) {
            if (this._iconWidth == target.width && this._iconHeight == target.height)
                return;
            this._iconWidth = target.width;
            this._iconHeight = target.height;
            this.invalidate(devil.InvalidationType.LAYOUT);
        };
        return ButtonIcon;
    }(devil.ButtonImage));
    devil.ButtonIcon = ButtonIcon;
})(devil || (devil = {}));
