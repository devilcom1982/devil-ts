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
     * 选中图标与背景图是分开的
     * @author        devil
     * @version       V20190418
     * @create        V2019-04-18
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var CheckBox1 = /** @class */ (function (_super_1) {
        __extends(CheckBox1, _super_1);
        function CheckBox1() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.CHECK_BOX1;
            return _this;
        }
        CheckBox1.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._width = devil.ComponentDefault.CHECK_BOX_WIDTH;
            this._height = devil.ComponentDefault.CHECK_BOX_HEIGHT;
            this.setLabelOffset(5, 0);
            this._label.align = egret.HorizontalAlign.LEFT;
            this._icon = devil.View.create(devil.Image);
            this._txtLayer.touchEnabled = true;
        };
        /**
          * @private
          */
        CheckBox1.prototype.addEvent = function () {
            _super_1.prototype.addEvent.call(this);
            this._txtLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___handleEvent, this);
            this._txtLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.___handleEvent, this);
            this._txtLayer.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            this._txtLayer.addEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            this._txtLayer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        };
        /**
         * @private
         */
        CheckBox1.prototype.removeEvent = function () {
            _super_1.prototype.removeEvent.call(this);
            this._txtLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___handleEvent, this);
            this._txtLayer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.___handleEvent, this);
            this._txtLayer.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            this._txtLayer.removeEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            this._txtLayer.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        };
        CheckBox1.prototype.setDefaultStyle = function () {
            _super_1.prototype.setDefaultStyle.call(this);
            this._styles[devil.StyleName.SELECT_ICON_SKIN] = null;
            // this._styles[StyleName.SELECT_ICON_RECT] = null;
        };
        CheckBox1.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(devil.InvalidationType.STYLE))
                this.drawStyle();
        };
        CheckBox1.prototype.drawSize = function () {
            this._currentBack.width = this._width;
            this._currentBack.height = this._height;
        };
        CheckBox1.prototype.drawStyle = function () {
            this._icon.source = this.getStyle(devil.StyleName.SELECT_ICON_SKIN);
            this._icon.__complete(this.___complete, this);
        };
        CheckBox1.prototype.drawLayout = function () {
            this._labelX = this._width + this._labelOffsetX;
            this._labelY = ((this._height - this._label.height) >> 1) + this._labelOffsetY;
            this._label.move(this._labelX, this._labelY);
        };
        // protected drawSkin(styleName:string,scale9GridStyleName:string):void
        // {
        //     super.drawSkin(styleName,scale9GridStyleName);
        //     if(this._buttonState == ButtonState.SELECTED)
        //     {
        //         if(this._icon.parent == null)this.addChild(this._icon,this._layer);
        //     }
        //     else 
        //     {
        //         if(this._icon.parent)this.removeChild(this._icon,false);
        //     } 
        // }
        CheckBox1.prototype.drawSkin = function (styleName) {
            _super_1.prototype.drawSkin.call(this, styleName);
            if (this._buttonState == devil.ButtonState.SELECTED) {
                if (this._icon.parent == null)
                    this.addChild(this._icon, this._layer);
            }
            else {
                if (this._icon.parent)
                    this.removeChild(this._icon, false);
            }
        };
        CheckBox1.prototype.unuse = function () {
            if (this._icon.parent == null)
                this.removeChild(this._icon, true);
            this._icon = null;
            _super_1.prototype.unuse.call(this);
        };
        CheckBox1.prototype.dispose = function () {
            if (this._icon.parent == null)
                this.removeChild(this._icon, true);
            this._icon = null;
            _super_1.prototype.dispose.call(this);
        };
        CheckBox1.prototype.___complete = function (loader, target) {
            this._icon.x = (this._width - this._icon.width) >> 1;
            this._icon.y = (this._height - this._icon.height) >> 1;
        };
        return CheckBox1;
    }(devil.ButtonTextSelected));
    devil.CheckBox1 = CheckBox1;
})(devil || (devil = {}));
