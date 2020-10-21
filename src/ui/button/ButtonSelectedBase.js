var devil;
(function (devil) {
    /**
     * @author        devil
     * @version       V201190215
     * @create        2019-02-15
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ButtonSelectedBase = /** @class */ (function () {
        function ButtonSelectedBase() {
        }
        Object.defineProperty(ButtonSelectedBase.prototype, "button", {
            set: function (value) {
                this._button = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ButtonSelectedBase.prototype, "selected", {
            get: function () {
                return this._button.buttonState == devil.ButtonState.SELECTED;
            },
            set: function (value) {
                if (this._button.buttonState != devil.ButtonState.DISANABLED) {
                    if (this._button.buttonState != devil.ButtonState.SELECTED && value)
                        this._button.buttonState = devil.ButtonState.SELECTED;
                    else if (this._button.buttonState == devil.ButtonState.SELECTED && !value)
                        this._button.buttonState = devil.ButtonState.UP;
                }
            },
            enumerable: true,
            configurable: true
        });
        ButtonSelectedBase.prototype.reuse = function () {
        };
        ButtonSelectedBase.prototype.unuse = function () {
            this._button = null;
        };
        ButtonSelectedBase.prototype.dispose = function () {
            this._button = null;
        };
        ButtonSelectedBase.prototype.pool = function () {
            devil.Manager.pool.push(this);
        };
        return ButtonSelectedBase;
    }());
    devil.ButtonSelectedBase = ButtonSelectedBase;
})(devil || (devil = {}));
