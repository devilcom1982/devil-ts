var devil;
(function (devil) {
    /**
     * 选择器
     * @author        devil
     * @version       V201190215
     * @create        2019-02-15
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var RadioSelector = /** @class */ (function () {
        function RadioSelector() {
            this._selecteds = [];
        }
        Object.defineProperty(RadioSelector.prototype, "selecteds", {
            get: function () {
                return this._selecteds;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioSelector.prototype, "currentSelected", {
            get: function () {
                return this._currentSelected;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioSelector.prototype, "selectedIndex", {
            get: function () {
                return this._selecteds.indexOf(this._currentSelected);
            },
            set: function (value) {
                value = devil.MathUtil.clamb(0, this._selecteds.length < 0 ? 0 : this._selecteds.length - 1, value);
                if (this._currentSelected != this._selecteds[value]) {
                    if (this._currentSelected != null)
                        this._currentSelected.setSelected(false);
                    this._currentSelected = this.selecteds[value];
                    this._currentSelected.setSelected(true);
                    if (this._changFun != null)
                        this._changFun.runCallBack(this._currentSelected);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioSelector.prototype, "selectedView", {
            set: function (value) {
                var index = this._selecteds.indexOf(value);
                if (index != -1)
                    this.selectedIndex = index;
            },
            enumerable: true,
            configurable: true
        });
        RadioSelector.prototype.add = function (selected) {
            this.addAt(selected, this._selecteds.length);
        };
        RadioSelector.prototype.addAt = function (selected, index) {
            if (this._selecteds.indexOf(selected) == -1)
                this._selecteds.splice(index, 0, selected);
        };
        RadioSelector.prototype.remove = function (selected) {
            var index = this._selecteds.indexOf(selected);
            if (index != -1)
                this.removeAt(index);
        };
        RadioSelector.prototype.cancel = function () {
            if (this._currentSelected != null)
                this._currentSelected.setSelected(false);
            this._currentSelected = null;
        };
        RadioSelector.prototype.removeAt = function (index) {
            if (this._selecteds[index] == this._currentSelected) {
                this.cancel();
            }
            this._selecteds.splice(index, 1);
        };
        RadioSelector.prototype.clear = function () {
            this.cancel();
            this._selecteds.length = 0;
        };
        RadioSelector.prototype.pool = function () {
            this.dispose();
        };
        RadioSelector.prototype.dispose = function () {
            this._selecteds = null;
            if (this._changFun != null) {
                this._changFun.pool();
                this._changFun = null;
            }
            this._currentSelected = null;
        };
        // public __change(callBack:Function,target:any):void
        RadioSelector.prototype.__change = function (callBack, target) {
            this._changFun = devil.CallBackInfo.create(callBack, target);
        };
        return RadioSelector;
    }());
    devil.RadioSelector = RadioSelector;
})(devil || (devil = {}));
