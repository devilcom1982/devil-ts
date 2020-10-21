var devil;
(function (devil) {
    /**
     * 组件管理器
     * @author        devil
     * @version       V20190213
     * @create        2019-02-13
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ComponentManager = /** @class */ (function () {
        function ComponentManager() {
        }
        ComponentManager.prototype.createImage = function (source, x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = -1; }
            if (height === void 0) { height = -1; }
            var component = devil.View.create(devil.Image);
            component.setSize(width, height);
            component.move(x, y);
            component.source = source;
            return component;
        };
        ComponentManager.prototype.createButtonImage = function (upBackSkin, width, height, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var component = devil.View.create(devil.ButtonImage);
            component.setStyle(devil.StyleName.UP_BACK_SKIN, upBackSkin);
            component.setSize(width, height);
            component.move(x, y);
            return component;
        };
        /**
         *
         * @param y
         * @param width
         * @param height
         * @param color
         * @param size  default 24
         * @param align default center egret.HorizontalAlign常量
         */
        ComponentManager.prototype.createText = function (x, y, width, height, color, size, align) {
            if (size === void 0) { size = 24; }
            if (align === void 0) { align = "center"; }
            var component = devil.View.create(devil.Text);
            component.color = color;
            component.size = size;
            component.align = align;
            component.verticalAlign = egret.VerticalAlign.MIDDLE;
            component.setSize(width, height);
            component.move(x, y);
            component.repaint();
            return component;
        };
        ComponentManager.prototype.createButtonIcon = function (upBackSkin, upIconSkin, x, y, width, height) {
            var component = devil.View.create(devil.ButtonIcon);
            component.setStyle(devil.StyleName.UP_BACK_SKIN, upBackSkin);
            component.setStyle(devil.StyleName.UP_ICON_SKIN, upIconSkin);
            component.setSize(width, height);
            component.move(x, y);
            return component;
        };
        ComponentManager.prototype.createImageRemote = function (x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = -1; }
            if (height === void 0) { height = -1; }
            var component = devil.View.create(devil.ImageRemote);
            component.move(x, y);
            component.setSize(width, height);
            return component;
        };
        ComponentManager.prototype.createContainer = function (count) {
            if (count === void 0) { count = 1; }
            var component = devil.View.create(devil.Container);
            component.autoCreateLayer(count);
            return component;
        };
        ComponentManager.prototype.createListContainer = function (cls, itemWidth, itemHeight, datas) {
            if (datas === void 0) { datas = []; }
            var component = devil.View.create(devil.ListContainer);
            component.touchChildren = true;
            component.itemRenderer = cls;
            component.itemWidth = itemWidth;
            component.itemHeight = itemHeight;
            component.datas = datas;
            return component;
        };
        ComponentManager.prototype.createListContainer2 = function (cls, datas) {
            if (datas === void 0) { datas = []; }
            var component = devil.View.create(devil.ListContainer2);
            component.touchChildren = true;
            component.itemRenderer = cls;
            component.datas = datas;
            return component;
        };
        /**
         *
         * @param width
         * @param height
         * @param scrollPolicyV     default ScrollPolicy.AUTO
         * @param scrollPolicyH     default ScrollPolicy.OFF
         * @param layout            default List.VERTICAL
         */
        ComponentManager.prototype.createList = function (width, height, scrollPolicyV, scrollPolicyH, layout) {
            if (scrollPolicyV === void 0) { scrollPolicyV = devil.ScrollPolicy.AUTO; }
            if (scrollPolicyH === void 0) { scrollPolicyH = devil.ScrollPolicy.OFF; }
            if (layout === void 0) { layout = devil.List.VERTICAL; }
            var component = devil.View.create(devil.List);
            component.width = width;
            component.height = height;
            component.touchChildren = true;
            component.scrollPolicyH = scrollPolicyH;
            component.scrollPolicyV = scrollPolicyV;
            component.layout = layout;
            return component;
        };
        /** */
        ComponentManager.prototype.createListSlider = function (width, height, listWidth, listHeight) {
            var component = devil.View.create(devil.ListSlider);
            component.setSize(width, height);
            component.touchChildren = true;
            component.listWidth = listWidth;
            component.listHeight = listHeight;
            return component;
        };
        /**
         *
         * @param x
         * @param y
         * @param width
         * @param height
         * @param align default center egret.HorizontalAlign常量
         */
        ComponentManager.prototype.createTextInput = function (x, y, width, height, color, size, upBackSkin, align) {
            if (size === void 0) { size = 24; }
            if (align === void 0) { align = "center"; }
            var component = devil.View.create(devil.TextInput);
            component.move(x, y);
            component.setSize(width, height);
            component.setStyle(devil.StyleName.UP_BACK_SKIN, upBackSkin);
            component.color = color;
            component.size = size;
            component.align = align;
            return component;
        };
        ComponentManager.prototype.createCheckBox1 = function (upBackSkin, selectIconSkin, color, size) {
            if (color === void 0) { color = devil.Color.WHITE; }
            if (size === void 0) { size = 18; }
            var component = devil.View.create(devil.CheckBox1);
            component.label.color = color;
            component.label.size = size;
            component.setStyle(devil.StyleName.UP_BACK_SKIN, upBackSkin);
            component.setStyle(devil.StyleName.SELECT_ICON_SKIN, selectIconSkin);
            return component;
        };
        ComponentManager.prototype.createBoxContainer = function (row, col, paddingV, paddingH) {
            if (paddingV === void 0) { paddingV = 0; }
            if (paddingH === void 0) { paddingH = 0; }
            var component = devil.BoxContainer.createSelf(row, col, paddingV, paddingH);
            return component;
        };
        ComponentManager.prototype.createTab = function () {
            var component = devil.View.create(devil.Tab);
            return component;
        };
        ComponentManager.prototype.createAnimation = function () {
            var component = devil.Manager.pool.create(devil.Animation);
            return component;
        };
        return ComponentManager;
    }());
    devil.ComponentManager = ComponentManager;
})(devil || (devil = {}));
