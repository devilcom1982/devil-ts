var devil;
(function (devil) {
    /**
     * Tip管理器
     * @author devil
     * @version V20190425
     * @create 20190425
     * @place guangzhou
     */
    var TipManager = /** @class */ (function () {
        function TipManager() {
        }
        /**
         *
         * @param cls
         * @param modal   default false
         */
        TipManager.prototype.show = function (cls, modal) {
            if (modal === void 0) { modal = true; }
            if (this._currentTip) {
                if (this._currentTip instanceof cls)
                    return this._currentTip;
                if (this._currentTip != null)
                    this._currentTip.dispose();
            }
            this._currentTip = new cls();
            this._currentTip.show();
            if (modal) {
                if (this._modal == null) {
                    this._modal = devil.Manager.component.createImage(devil.LibConst.MODE_TEXTURE_NAME, 0, 0, devil.Manager.stage.width, devil.Manager.stage.height);
                    this._modal.alpha = 0.8;
                    this._modal.layers[0].addEventListener(egret.TouchEvent.TOUCH_TAP, this.___touchTap, this);
                    this._modal.touchEnabled = true;
                }
                if (this._modal.layers[0].parent == null)
                    devil.Manager.layer.addUI(devil.LayerSubIndex.UI_TIP_MODE, this._modal.layers[0]);
                devil.Manager.stage.add(this.___resize, this);
                this.___resize(devil.Manager.stage.width, devil.Manager.stage.height);
            }
            return this._currentTip;
        };
        TipManager.prototype.hide = function (cls) {
            if (cls === void 0) { cls = null; }
            if (!!cls && !(this._currentTip instanceof cls))
                return;
            if (this._currentTip != null)
                this._currentTip.dispose();
            this._currentTip = null;
            devil.Manager.render.remove(this.___resize, this);
            if (this._modal && this._modal.layers[0].parent != null)
                this._modal.removeFromParent();
        };
        /** 是否打开了 */
        TipManager.prototype.isOpenning = function (cls) {
            return this._currentTip instanceof cls;
        };
        TipManager.prototype.setModalAlpha = function (alpha) {
            if (alpha === void 0) { alpha = 0.8; }
            if (this._modal)
                this._modal.alpha = alpha;
        };
        TipManager.prototype.___touchTap = function (e) {
            this.hide();
        };
        TipManager.prototype.___resize = function (width, height) {
            this._modal.width = width;
            this._modal.height = height;
        };
        return TipManager;
    }());
    devil.TipManager = TipManager;
})(devil || (devil = {}));
