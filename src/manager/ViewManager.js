var devil;
(function (devil) {
    /**
     * 视图管理器,只有注册了的视图才可以通过管理器打开
     * @author        devil
     * @version       V20190405
     * @create        2019-04-05
     * @update 	      devil        2019-05-13        新增加载时出现ViewLoading视图功能
     * @update 	      devil        2019-05-27        新增三级视图概念
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ViewManager = /** @class */ (function () {
        function ViewManager() {
            this._openningViews = {};
            this._modalViews = {};
            this._singleViews = {};
            this._multeViews = {};
            this._thirdViews = {};
            this._openningModalViews = new devil.Dictionary();
            this._textures = {};
            this._relativeViews = {};
            this._modal = devil.Manager.component.createImage(devil.LibConst.MODE_TEXTURE_NAME, 0, 0, devil.Manager.stage.width, devil.Manager.stage.height);
            this._modal.alpha = 0.8;
            this._modal.layers[0].addEventListener(egret.TouchEvent.TOUCH_TAP, this.___touchTap, this);
            this._modal.touchEnabled = true;
            devil.Manager.stage.add(this.___resize, this);
        }
        /**
         * 注册单开面板
         */
        ViewManager.prototype.registerSingleView = function (viewID, cls, textureName, modal) {
            if (textureName === void 0) { textureName = null; }
            if (modal === void 0) { modal = false; }
            this._modalViews[viewID] = modal;
            this._singleViews[viewID] = cls;
            this._textures[viewID] = textureName;
        };
        /**
         * 注册多开视图
         * @textureName  是否先加载贴图再打开
         */
        ViewManager.prototype.registerMulteView = function (viewID, cls, modal, textureName) {
            if (modal === void 0) { modal = false; }
            if (textureName === void 0) { textureName = null; }
            this._modalViews[viewID] = modal;
            this._multeViews[viewID] = cls;
            this._textures[viewID] = textureName;
        };
        /**
         * 三级视图
         * @textureName  是否先加载贴图再打开
         */
        ViewManager.prototype.registerThirdView = function (viewID, cls, modal, textureName) {
            if (modal === void 0) { modal = false; }
            if (textureName === void 0) { textureName = null; }
            this._modalViews[viewID] = modal;
            this._thirdViews[viewID] = cls;
            this._textures[viewID] = textureName;
        };
        /**
         * 添加关联界面,主要是当主界面关闭时会关闭关联界面
         * @param viewID
         */
        ViewManager.prototype.registerRelativeView = function (mainViewID, subViewID1, subViewID2) {
            var subViewIDs = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                subViewIDs[_i - 3] = arguments[_i];
            }
            var relativeViews = this._relativeViews[mainViewID];
            if (!relativeViews) {
                relativeViews = [];
                this._relativeViews[mainViewID] = relativeViews;
            }
            relativeViews.push(subViewID1);
            relativeViews.push(subViewID2);
            if (subViewIDs) {
                for (var _a = 0, subViewIDs_1 = subViewIDs; _a < subViewIDs_1.length; _a++) {
                    var viewID = subViewIDs_1[_a];
                    relativeViews.push(viewID);
                }
            }
        };
        /**
         * 获取指定ID的视图
         */
        ViewManager.prototype.getView = function (viewID) {
            return this._openningViews[viewID];
        };
        /**
         * 是否正在打开指定的ID的视图
         */
        ViewManager.prototype.isOpenning = function (viewID) {
            return !!this._openningViews[viewID];
        };
        /**
         * 是否有单开视图打开
         */
        ViewManager.prototype.isOpeningSingleView = function () {
            var keys = Object.keys(this._openningViews);
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                if (!!this._singleViews[keys[i]])
                    return true;
            }
            return false;
        };
        /**
         * 打开或关闭切换
         */
        ViewManager.prototype.switch = function (viewID, showLoading) {
            if (showLoading === void 0) { showLoading = false; }
            if (this.isOpenning(viewID)) {
                this.hide(viewID);
                return null;
            }
            else
                return this.show(viewID, showLoading);
        };
        ViewManager.prototype.show = function (viewID, showLoading) {
            if (showLoading === void 0) { showLoading = false; }
            var view;
            var that = this;
            function ___textureLoading(loader) {
                devil.ViewLoading.getInstance().hide();
                devil.Manager.loader.remove(loader.getPath(), ___textureLoading, this);
                if (that._openningViews[viewID] == view)
                    that.showView(viewID, view);
            }
            view = this._openningViews[viewID];
            if (view != null)
                return view;
            if (showLoading && this._textures[viewID] != null) {
                var path = devil.PathInfo.getPath(this._textures[viewID], devil.LoaderType.TEXTURE);
                if (!devil.Manager.loader.has(path)) {
                    devil.ViewLoading.getInstance().show();
                    view = this.createView(viewID);
                    devil.Manager.loader.load(path, ___textureLoading, this, devil.ResourceGCType.COMMON, devil.ResPriorityType.LOAD_LEVEL5);
                    return view;
                }
                else {
                    return this.open(viewID);
                }
            }
            else {
                return this.open(viewID);
            }
        };
        /**
         * 关闭界面
         * @param viewID
         * @param fromModal 当是模态窗口时，点击黑色背景时，则值为true，默认是自动关闭界面，传入此参数可以阻止此默认操作。
         */
        ViewManager.prototype.hide = function (viewID, fromModal) {
            if (fromModal === void 0) { fromModal = false; }
            var view = this._openningViews[viewID];
            if (view != null) {
                if (view.hide(fromModal)) {
                    this._openningViews[viewID] = null;
                    if (this._openningModalViews.containsKey(viewID)) {
                        this._openningModalViews.remove(viewID);
                        if (this._modal) {
                            var hasModal = this._openningModalViews.keys().length > 0;
                            if (!hasModal)
                                this._modal.removeFromParent();
                            else
                                devil.Manager.layer.addUI(devil.LayerSubIndex.UI_ALERT_MODE, this._modal.layers[0]); //恢复到2层界面
                        }
                    }
                }
            }
        };
        /**
         * 检测关闭界面
         * @param hideViewID 要关闭的界面ID
         * @param relativeViewID 当前关联显示的主界面ID
         */
        ViewManager.prototype.checkHide = function (hideViewID, relativeViewID, fromModal) {
            if (fromModal === void 0) { fromModal = false; }
            var relativeViews = this._relativeViews[hideViewID];
            if (relativeViews) {
                for (var _i = 0, relativeViews_1 = relativeViews; _i < relativeViews_1.length; _i++) {
                    var viewID = relativeViews_1[_i];
                    if (viewID == relativeViewID)
                        continue;
                    if (this.isOpenning(viewID))
                        return;
                }
            }
            this.hide(hideViewID, fromModal);
        };
        ViewManager.prototype.setModalAlpha = function (alpha) {
            if (alpha === void 0) { alpha = 0.8; }
            this._modal.alpha = alpha;
        };
        /**
         * 关闭所有已打开界面
         */
        ViewManager.prototype.hideAll = function () {
            var keys = Object.keys(this._openningViews);
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                this.hide(keys[i]);
            }
        };
        ViewManager.prototype.createView = function (viewID) {
            var view;
            var cls = this._singleViews[viewID];
            if (!!cls) {
                for (var key in this._openningViews) {
                    if (!!this._singleViews[key])
                        this.hide(key);
                }
            }
            else
                cls = this._multeViews[viewID];
            if (!cls)
                cls = this._thirdViews[viewID];
            if (!!cls) {
                view = new cls();
                this._openningViews[viewID] = view;
            }
            return view;
        };
        ViewManager.prototype.showView = function (viewID, view) {
            var modal = this._modalViews[viewID];
            if (modal) {
                if (this._multeViews[viewID] != null || this._singleViews[viewID] != null)
                    devil.Manager.layer.addUI(devil.LayerSubIndex.UI_ALERT_MODE, this._modal.layers[0]);
                else if (this._thirdViews[viewID] != null)
                    devil.Manager.layer.addUI(devil.LayerSubIndex.UI_ALERT_MODE2, this._modal.layers[0]);
                this._openningModalViews.add(viewID, true);
            }
            view.show();
        };
        ViewManager.prototype.open = function (viewID) {
            var view = this.createView(viewID);
            this.showView(viewID, view);
            return view;
        };
        ViewManager.prototype.___touchTap = function (e) {
            var viewIDs = this._openningModalViews.keys();
            var length = viewIDs.length;
            for (var i = length - 1; i >= 0; --i) {
                this.hide(viewIDs[i], true);
                break;
            }
        };
        ViewManager.prototype.___resize = function (width, height) {
            this._modal.width = width;
            this._modal.height = height;
        };
        return ViewManager;
    }());
    devil.ViewManager = ViewManager;
})(devil || (devil = {}));
