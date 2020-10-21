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
     * 滑动组件进度条
     */
    var ListSlider = /** @class */ (function (_super_1) {
        __extends(ListSlider, _super_1);
        function ListSlider() {
            return _super_1.call(this) || this;
        }
        ListSlider.prototype.setTrackAlpha = function (value) {
            this._trackImg.alpha = value;
        };
        ListSlider.prototype.setTrackSource = function (value) {
            this._trackImg.source = value;
        };
        ListSlider.prototype.setThumbSource = function (value) {
            this._thumbImg.source = value;
        };
        Object.defineProperty(ListSlider.prototype, "posOffset", {
            set: function (value) {
                this._posOffset = value;
                this.invalidate(devil.InvalidationType.LAYOUT);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListSlider.prototype, "sizeOffset", {
            set: function (value) {
                this._sizeOffset = value;
                this.invalidate(devil.InvalidationType.LAYOUT);
            },
            enumerable: true,
            configurable: true
        });
        ListSlider.prototype.initLayer = function () {
            this._layer = this.createLayer();
            this._layer.touchEnabled = true;
        };
        ListSlider.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this.addEvent();
            this._posOffset = 0;
            this._sizeOffset = 0;
            this._trackImg = devil.Manager.component.createImage("", 0, 0, this._width, this._height);
            this.addChild(this._trackImg, this._layer);
            this._thumbImg = devil.Manager.component.createImage("", 0, 0, this._width, this._height / 2);
            this.addChild(this._thumbImg, this._layer);
        };
        ListSlider.prototype.addEvent = function () {
            this._layer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.___handleEvent, this);
            this._layer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___handleEvent, this);
            this._layer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.___handleEvent, this);
            // this._layer.addEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            // this._layer.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            // this._layer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        };
        ListSlider.prototype.removeEvent = function () {
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.___handleEvent, this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___handleEvent, this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.___handleEvent, this);
            // this._layer.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            // this._layer.removeEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            // this._layer.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        };
        ListSlider.prototype.updateContentSize = function () {
            this.invalidate(devil.InvalidationType.DATA);
        };
        /** */
        ListSlider.prototype.containerUpdPos = function (scrollValue) {
            var posPer;
            var posVal;
            if (this.isVertical) {
                posPer = scrollValue / (this.container.contentHeight - this.listHeight);
                posVal = Math.ceil((this._height - this._thumbImg.height) * posPer);
            }
            else {
                posPer = scrollValue / (this.container.contentWidth - this.listWidth);
                posVal = Math.ceil((this._width - this._thumbImg.width) * posPer);
            }
            this.updateThumbPos(posVal, true, false);
        };
        /** 更新位置 */
        ListSlider.prototype.updateThumbPos = function (value, fromContainer, calOffset) {
            if (fromContainer === void 0) { fromContainer = false; }
            if (calOffset === void 0) { calOffset = true; }
            if (this.isVertical) {
                var tempValue = calOffset ? value - (this._thumbImg.height >> 1) : value;
                var thumbY = Math.min(Math.max(0, tempValue), this._height - this._thumbImg.height);
                this._thumbImg.y = thumbY;
                if (this.container && !fromContainer) {
                    var posPer = this._thumbImg.y / (this._height - this._thumbImg.height);
                    var scrollVal = Math.ceil(posPer * (this.container.contentHeight - this.listHeight));
                    this.container.setScrollV(scrollVal, false);
                }
            }
            else {
                var tempValue = calOffset ? value - (this._thumbImg.width >> 1) : value;
                var thumbX = Math.min(Math.max(0, tempValue), this._width - this._thumbImg.width);
                this._thumbImg.x = thumbX;
                if (this.container && !fromContainer) {
                    var posPer = this._thumbImg.x / (this._width - this._thumbImg.width);
                    var scrollVal = Math.ceil(posPer * (this.container.contentWidth - this.listWidth));
                    this.container.setScrollV(scrollVal, false);
                }
            }
        };
        ListSlider.prototype.___handleEvent = function (e) {
            switch (e.type) {
                case egret.TouchEvent.TOUCH_TAP:
                case egret.TouchEvent.TOUCH_BEGIN:
                    {
                        this.updateThumbPos(this.isVertical ? e.localY : e.localX);
                        break;
                    }
                case egret.TouchEvent.TOUCH_MOVE:
                    {
                        this.updateThumbPos(this.isVertical ? e.localY : e.localX);
                        break;
                    }
                // case egret.TouchEvent.TOUCH_CANCEL:
                // case egret.TouchEvent.TOUCH_END:
                // case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                // {
                //     break;
                // }
            }
        };
        ListSlider.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(devil.InvalidationType.SIZE))
                this.drawSize();
            if (this.isInvalid(devil.InvalidationType.DATA))
                this.drawData();
            if (this.isInvalid(devil.InvalidationType.LAYOUT))
                this.drawLayout();
        };
        ListSlider.prototype.drawLayout = function () {
            if (this.isVertical) {
                this._thumbImg.x = this._posOffset;
                this._thumbImg.width = this._width - this._sizeOffset;
            }
            else {
                this._thumbImg.y = this._posOffset;
                this._thumbImg.height = this._height - this._sizeOffset;
            }
        };
        ListSlider.prototype.drawData = function () {
            if (!this.container)
                return;
            if (this.isVertical) {
                if (this.container.contentHeight > this.listHeight) {
                    this._thumbImg.height = Math.max(50, Math.floor(this._height * this.listHeight / this.container.contentHeight));
                    this.updateThumbPos(this._thumbImg.y, false, false);
                }
                else {
                    this._thumbImg.height = this._height;
                    this.updateThumbPos(this._thumbImg.y, false, false);
                }
            }
            else {
                if (this.container.contentWidth > this.listWidth) {
                    this._thumbImg.width = Math.max(50, Math.floor(this._width * this.listWidth / this.container.contentWidth));
                    this.updateThumbPos(this._thumbImg.x, false, false);
                }
                else {
                    this._thumbImg.width = this._width;
                    this.updateThumbPos(this._thumbImg.x, false, false);
                }
            }
        };
        ListSlider.prototype.drawSize = function () {
            this._trackImg.width = this._width;
            this._trackImg.height = this._height;
            if (this.isVertical)
                this._thumbImg.width = this._width - this._sizeOffset;
            else
                this._thumbImg.height = this._height - this._sizeOffset;
        };
        ListSlider.prototype.unuse = function () {
            this.removeEvent();
            this._layer = null;
            this._trackImg = null;
            this._thumbImg = null;
            this.container = null;
            _super_1.prototype.unuse.call(this);
        };
        ListSlider.prototype.dispose = function () {
            this.removeEvent();
            this._layer = null;
            this._trackImg = null;
            this._thumbImg = null;
            this.container = null;
            _super_1.prototype.dispose.call(this);
        };
        return ListSlider;
    }(devil.Container));
    devil.ListSlider = ListSlider;
})(devil || (devil = {}));
