var devil;
(function (devil) {
    /**
     * 层管理器,一级层只有三层，对应的是LayerIndex常量，常量值对应的是层级关系，可以随时自动扩展Element与UI一级层的二级层，但需要定义二级层常量LayerSubIndex
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    var LayerManager = /** @class */ (function () {
        function LayerManager(root) {
            this._root = root;
            this._elementLayers = [];
            this._uiLayers = [];
            this._moveLayers = [];
            this._elementSub3Layers = [];
            this.mapLayer = this.createLayer(root, 0 /* MAP */, true, false, true);
            this.mapLayer.name = "mapLayer";
            this.elementLayer = this.createLayer(root, 1 /* ELEMENT */, false, true, true);
            this.elementLayer.name = "elementLayer";
            this.uiLayer = this.createLayer(root, 2 /* UI */, false, true, false);
            this.uiLayer.name = "uiLayer";
            this.initLayer();
        }
        LayerManager.prototype.initLayer = function () {
            this.initSubLayer(1 /* ELEMENT */, devil.LayerSubIndex.ELEMENT_EFFECT_BOTTOM, false, false, "ELEMENT_EFFECT_BOTTOM");
            this.initSubLayer(1 /* ELEMENT */, devil.LayerSubIndex.ELEMENT_SHADOW, false, false, "ELEMENT_SHADOW");
            this.initSubLayer(1 /* ELEMENT */, devil.LayerSubIndex.ELEMENT1, false, true, "ELEMENT1");
            this.initSubLayer(1 /* ELEMENT */, devil.LayerSubIndex.ELEMENT2, false, true, "ELEMENT2");
            this.initSubLayer(1 /* ELEMENT */, devil.LayerSubIndex.ELEMENT_HEAD_VIP, false, false, "ELEMENT_HEAD_VIP");
            this.initSubLayer(1 /* ELEMENT */, devil.LayerSubIndex.ELEMENT_HEAD_TXT, false, false, "ELEMENT_HEAD_TXT");
            this.initSubLayer(1 /* ELEMENT */, devil.LayerSubIndex.ELEMENT_HEAD_TITLE, false, false, "ELEMENT_HEAD_TITLE");
            this.initSubLayer(1 /* ELEMENT */, devil.LayerSubIndex.ELEMENT_HEAD_BLOOD, false, false, "ELEMENT_HEAD_BLOOD");
            this.initSubLayer(1 /* ELEMENT */, devil.LayerSubIndex.ELEMENT_EFFECT_TOP, false, false, "ELEMENT_EFFECT_TOP");
            this.initSubLayer(1 /* ELEMENT */, devil.LayerSubIndex.ELEMENT_SCT, false, false, "ELEMENT_SCT");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_HOME_IMAGE, false, true, "UI_HOME_IMAGE");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_HOME, false, true, "UI_HOME");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_HOME_EFFECT, false, true, "UI_HOME_EFFECT");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_PANEL_DARK, false, true, "UI_PANEL_DARK");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_COMMON, false, true, "UI_COMMON");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_IMAGE, false, true, "UI_IMAGE");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_NUM, false, false, "UI_NUM");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_EFFECT, false, true, "UI_EFFECT");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_COMMON1, false, true, "UI_COMMON1");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_ALERT_MODE, false, true, "UI_ALERT_MODE");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_ALERT, false, true, "UI_ALERT");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_ALERT_MODE2, false, true, "UI_ALERT_MODE2");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_ALERT2, false, true, "UI_ALERT2");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_TIP_MODE, false, true, "UI_TIP_MODE");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_TIP, false, true, "UI_TIP");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_LOADING, false, true, "UI_LOADING");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_MASSAGE, false, true, "UI_MASSAGE");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_GM, false, true, "UI_GM");
        };
        /**
         * 初始化二级层
         * @param index
         * @param subIndex
         */
        LayerManager.prototype.initSubLayer = function (index, subIndex, touchEnabled, touchChildren, name) {
            if (touchEnabled === void 0) { touchEnabled = false; }
            if (touchChildren === void 0) { touchChildren = false; }
            if (name === void 0) { name = ""; }
            var container;
            var parent;
            var layers;
            if (index == 1 /* ELEMENT */ && this._elementLayers[subIndex] == null) {
                parent = this.elementLayer;
                layers = this._elementLayers;
            }
            else if (index == 2 /* UI */ && this._uiLayers[subIndex] == null) {
                parent = this.uiLayer;
                layers = this._uiLayers;
            }
            if (parent != null) {
                container = devil.Manager.pool.createDisplayObjectContainer();
                container.name = name;
                parent.addChildAt(container, subIndex);
                container.touchChildren = touchChildren;
                container.touchEnabled = touchEnabled;
                layers[subIndex] = container;
            }
        };
        LayerManager.prototype.createLayer = function (root, index, touchEnabled, touchChildren, canMove) {
            if (touchEnabled === void 0) { touchEnabled = false; }
            if (touchChildren === void 0) { touchChildren = false; }
            if (canMove === void 0) { canMove = false; }
            var result = devil.Manager.pool.createDisplayObjectContainer();
            result.touchEnabled = touchEnabled;
            result.touchChildren = touchChildren;
            root.addChildAt(result, index);
            if (canMove)
                this._moveLayers.push(result);
            return result;
        };
        /**
         * 移动层，对于ARPG游戏来说人物移动的时候，元素与地图层需要动态更新位置
         */
        LayerManager.prototype.moveLayers = function (x, y) {
            var that = this;
            var len = that._moveLayers.length;
            for (var i = 0; i < len; i++) {
                that._moveLayers[i].x = x;
                that._moveLayers[i].y = y;
            }
        };
        /**
         * 填加视图到二级层级
         * @param index
         * @param subIndex
         * @param view
         */
        LayerManager.prototype.addSubView = function (index, subIndex, view, index1) {
            var container;
            if (index == 1 /* ELEMENT */)
                container = this._elementLayers[subIndex];
            else if (index == 2 /* UI */)
                container = this._uiLayers[subIndex];
            if (!!index1)
                container.addChildAt(view, index1);
            else
                container.addChild(view);
        };
        /**
         * 填加视图到元素层二级视图中
         * @param subIndex
         * @param view
         * @param index1
         */
        LayerManager.prototype.addElement = function (subIndex, view, index1) {
            this.addSubView(1 /* ELEMENT */, subIndex, view, index1);
        };
        /**
         * 填加视图到UI层二级视图中
         * @param subIndex
         * @param view
         * @param index1   是否指定层级，如果不指定则自动填加
         */
        LayerManager.prototype.addUI = function (subIndex, view, index1) {
            this.addSubView(2 /* UI */, subIndex, view, index1);
        };
        /**
         * 填加视图到三级层级
         * @param index
         * @param subIndex
         * @param view
         */
        LayerManager.prototype.addSub3View = function (index, subIndex, key, view) {
            var sub;
            var sub3;
            var views;
            if (this._elementSub3Layers[index] == null)
                this._elementSub3Layers[index] = [];
            if (index == 1 /* ELEMENT */) {
                sub = this._elementLayers[subIndex];
                views = this._elementSub3Layers[index][subIndex];
                if (views == null) {
                    views = {};
                    this._elementSub3Layers[index][subIndex] = views;
                }
                sub3 = views[key];
                if (sub3 == null) {
                    sub3 = devil.Manager.pool.createDisplayObjectContainer();
                    views[key] = sub3;
                    sub.addChild(sub3);
                }
                sub3.addChild(view);
            }
        };
        /**
         * 获取元素层的二级视图实例引用
         */
        LayerManager.prototype.getElement = function (subIndex) {
            return this.getSubLayer(1 /* ELEMENT */, subIndex);
        };
        /**
         *  获取UI层的二级视图实例引用
         */
        LayerManager.prototype.getUI = function (subIndex) {
            return this.getSubLayer(2 /* UI */, subIndex);
        };
        /**
         * 二级层视图重新填加回一级层内
         * @param subIndex
         * @param force		是否强制填加
         */
        LayerManager.prototype.addChildUI = function (subIndex, force) {
            var container = this._uiLayers[subIndex];
            if (container.parent == null || !!force)
                this.uiLayer.addChildAt(container, subIndex);
        };
        /**
         * 删除指定的二级UI层
         */
        LayerManager.prototype.removeChildUI = function (subIndex) {
            var container = this._uiLayers[subIndex];
            if (container.parent != null)
                this.uiLayer.removeChild(container);
        };
        /**
         * 返回指定的二级层实例
         */
        LayerManager.prototype.getSubLayer = function (index, subIndex) {
            var container;
            if (index == 1 /* ELEMENT */)
                container = this._elementLayers[subIndex];
            else if (index == 2 /* UI */)
                container = this._uiLayers[subIndex];
            return container;
        };
        LayerManager.prototype.showTopLayer = function (index) {
            if (index == 0 /* MAP */)
                this._root.addChildAt(this.mapLayer, 0 /* MAP */);
            else if (index == 1 /* ELEMENT */)
                this._root.addChildAt(this.elementLayer, 1 /* ELEMENT */);
            else if (index == 2 /* UI */)
                this._root.addChildAt(this.elementLayer, 2 /* UI */);
        };
        return LayerManager;
    }());
    devil.LayerManager = LayerManager;
})(devil || (devil = {}));
