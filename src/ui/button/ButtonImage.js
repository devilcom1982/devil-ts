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
     * 图片按钮，背景只有一张图片，可有几种不同的状态
     * @author        devil
     * @version       V20190211
     * @create        2019-02-11
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ButtonImage = /** @class */ (function (_super_1) {
        __extends(ButtonImage, _super_1);
        function ButtonImage() {
            var _this = _super_1.call(this) || this;
            _this.addEvent();
            _this._type = devil.ComponentType.BUTTON_IMAGE;
            return _this;
        }
        Object.defineProperty(ButtonImage.prototype, "buttonState", {
            get: function () {
                return this._buttonState;
            },
            set: function (value) {
                if (this._buttonState == value)
                    return;
                this._buttonState = value;
                this.invalidate(ButtonImage.DRAW_STATE);
            },
            enumerable: true,
            configurable: true
        });
        ButtonImage.prototype.setEnabled = function (value) {
            if (this._enabled != value) {
                _super_1.prototype.setEnabled.call(this, value);
                if (this._enabled) {
                    this._layers[0].touchEnabled = true;
                    this.buttonState = devil.ButtonState.UP;
                }
                else {
                    this.buttonState = devil.ButtonState.DISANABLED;
                }
            }
        };
        Object.defineProperty(ButtonImage.prototype, "downOffset", {
            /**
             * 按下按钮时是否偏移1像素
             * @param value
             */
            set: function (value) {
                this._downOffset = value;
            },
            enumerable: true,
            configurable: true
        });
        ButtonImage.prototype.initLayer = function () {
            this._layer = this.createLayer();
        };
        /**
         * @private
         */
        ButtonImage.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._layer.touchEnabled = true;
            this._downOffset = true;
            this._width = devil.ComponentDefault.BUTTON_WIDTH;
            this._height = devil.ComponentDefault.BUTTON_HEIGHT;
            this._invalid = this._invalid | ButtonImage.DRAW_STATE;
            this._buttonState = devil.ButtonState.UP;
            this._currentBack = devil.View.create(devil.Image);
            this.addChild(this._currentBack, this._layer);
        };
        /**
         * @private
         */
        ButtonImage.prototype.addEvent = function () {
            this._layer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___handleEvent, this);
            this._layer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.___handleEvent, this);
            this._layer.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            this._layer.addEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            this._layer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        };
        /**
         * @private
         */
        ButtonImage.prototype.removeEvent = function () {
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___handleEvent, this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.___handleEvent, this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        };
        /**
         * @private
         */
        ButtonImage.prototype.setDefaultStyle = function () {
            this._styles[devil.StyleName.UP_BACK_SKIN] = null;
            this._styles[devil.StyleName.DOWN_BACK_SKIN] = null;
            this._styles[devil.StyleName.DISENABLED_BACK_SKIN] = null;
            // this._styles[StyleName.UP_BACK_RECT] = null;
            // this._styles[StyleName.DOWN_BACK_RECT] = null;
            // this._styles[StyleName.DISENABLED_BACK_RECT] = null;
        };
        /**
         * @private
         */
        ButtonImage.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(ButtonImage.DRAW_STATE, devil.InvalidationType.STYLE))
                this.drawState();
            if (this.isInvalid(devil.InvalidationType.STYLE, ButtonImage.DRAW_STATE, devil.InvalidationType.STYLE))
                this.drawSize();
        };
        /**
         * @private
         */
        ButtonImage.prototype.drawState = function () {
            var styleName;
            // let scale9GridStyleName:string;
            var backX = 0;
            var backY = 0;
            if (this._buttonState == devil.ButtonState.UP) {
                styleName = devil.StyleName.UP_BACK_SKIN;
                // scale9GridStyleName = StyleName.UP_BACK_RECT;
            }
            else if (this._buttonState == devil.ButtonState.DOWN) {
                styleName = devil.StyleName.DOWN_BACK_SKIN;
                // scale9GridStyleName = StyleName.DOWN_BACK_RECT;
                if (this._downOffset) {
                    backX = 1;
                    backY = 1;
                }
            }
            else if (this._buttonState == devil.ButtonState.DISANABLED) {
                styleName = devil.StyleName.DISENABLED_BACK_SKIN;
                // scale9GridStyleName = StyleName.DISENABLED_BACK_RECT;
            }
            backX += this.getStyleXoffset(styleName);
            backY += this.getStyleYoffset(styleName);
            this._currentBack.move(backX, backY);
            // this.drawSkin(styleName,scale9GridStyleName);
            this.drawSkin(styleName);
        };
        // protected drawSkin(styleName:string,scale9GridStyleName:string):void
        // {
        //     let data:string|egret.Texture = this.getStyle(styleName);
        //     let rect:egret.Rectangle = this.getStyle(scale9GridStyleName);
        //     if(data == null)
        //     {
        //         data = this.getStyle(StyleName.UP_BACK_SKIN);
        //         rect = this.getStyle(StyleName.UP_BACK_RECT);
        //     }
        //     this._currentBack.source = data;
        //     this._currentBack.scale9Grid = rect;
        // }
        ButtonImage.prototype.drawSkin = function (styleName) {
            var data = this.getImageData(styleName);
            if (data == null)
                data = this.getImageData(devil.StyleName.UP_BACK_SKIN);
            this._currentBack.source = data.name;
            this._currentBack.scale9Grid = data.scale9Grid;
        };
        ButtonImage.prototype.drawSize = function () {
            this._currentBack.width = this._width;
            this._currentBack.height = this._height;
        };
        /**
         * @private
         */
        ButtonImage.prototype.reuse = function () {
            _super_1.prototype.reuse.call(this);
            this.addEvent();
        };
        /**
         * @private
         */
        ButtonImage.prototype.unuse = function () {
            this.removeEvent();
            this._layer = null;
            if (this._clickFun) {
                this._clickFun.pool();
                this._clickFun = null;
            }
            if (this._mouseDownFun) {
                this._mouseDownFun.pool();
                this._mouseDownFun = null;
            }
            if (this._longClickFun) {
                this._longClickFun.pool();
                this._longClickFun = null;
            }
            this._currentBack = null;
            _super_1.prototype.unuse.call(this);
        };
        /**
         * @private
         */
        ButtonImage.prototype.dispose = function () {
            devil.Manager.render.remove(this.___checkLongClick, this);
            this.removeEvent();
            this._layer = null;
            if (this._clickFun) {
                this._clickFun.pool();
                this._clickFun = null;
            }
            if (this._mouseDownFun) {
                this._mouseDownFun.pool();
                this._mouseDownFun = null;
            }
            if (this._longClickFun) {
                this._longClickFun.pool();
                this._longClickFun = null;
            }
            this._currentBack = null;
        };
        /**
         * 点击事件
         */
        ButtonImage.prototype.__click = function (callBack, target) {
            this._clickFun = devil.CallBackInfo.create(callBack, target);
        };
        /**
         * 鼠标按下事件
         */
        ButtonImage.prototype.__mouseDown = function (callBack, target) {
            this._mouseDownFun = devil.CallBackInfo.create(callBack, target);
        };
        /**
         * 长按事件
         */
        ButtonImage.prototype.__longClick = function (callBack, target) {
            this._longClickFun = devil.CallBackInfo.create(callBack, target);
        };
        /**
         * @private
         */
        ButtonImage.prototype.___handleEvent = function (e) {
            this.___$handleEvent(e);
        };
        ButtonImage.prototype.___$handleEvent = function (e) {
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.buttonState = devil.ButtonState.DOWN;
                    if (this._mouseDownFun != null)
                        this._mouseDownFun.runCallBack(e, this);
                    if (this._longClickFun) {
                        this._longClickCnt = 0;
                        devil.Manager.render.add(this.___checkLongClick, this, 300, 0);
                    }
                    break;
                case egret.TouchEvent.TOUCH_CANCEL:
                case egret.TouchEvent.TOUCH_END:
                case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                    this.buttonState = devil.ButtonState.UP;
                    break;
                case egret.TouchEvent.TOUCH_TAP:
                    if (this._clickFun != null)
                        this._clickFun.runCallBack(e, this);
                    break;
            }
        };
        /** */
        ButtonImage.prototype.___checkLongClick = function () {
            if (this.buttonState != devil.ButtonState.DOWN || !this._longClickFun) {
                if (this._longClickFun)
                    this._longClickFun.runCallBack(this, true);
                devil.Manager.render.remove(this.___checkLongClick, this);
                return;
            }
            if (this._longClickFun != null) {
                this._longClickFun.runCallBack(this, false);
                ++this._longClickCnt;
                if (this._longClickCnt >= 3) {
                    devil.Manager.render.add(this.___checkLongClick, this, 30, 0, null, true);
                }
            }
        };
        ButtonImage.DRAW_STATE = 1;
        return ButtonImage;
    }(devil.Container));
    devil.ButtonImage = ButtonImage;
})(devil || (devil = {}));
