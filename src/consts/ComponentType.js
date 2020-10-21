var devil;
(function (devil) {
    /**
     * 组件类型常量
     * @author        devil
     * @version       V20190626
     * @create        2018-12-28
     * @update 	      devil 2018-10-06 整理
     * @update        devil 2019-06-26 同步ActionScript类库
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ComponentType = /** @class */ (function () {
        function ComponentType() {
        }
        /**
         * 画布
         */
        ComponentType.CANVAS = 1;
        /**
         * 容器
         */
        ComponentType.CONTAINER = 2;
        /**
         * 面板容器
         */
        ComponentType.PANEL_CONTAINER = 3;
        /**
         * 文本
         */
        ComponentType.TEXT = 4;
        /**
         * 图片
         */
        ComponentType.IMAGE = 5;
        /**
         * 图片按钮
         */
        ComponentType.BUTTON_IMAGE = 6;
        /**
         * 图标按钮
         */
        ComponentType.BUTTON_ICON = 7;
        /**
         * 文本按钮
         */
        ComponentType.BUTTON_TXT = 8;
        /**
         * 图片选择按钮
         */
        ComponentType.BUTTON_IMAGE_SELECTED = 9;
        /**
         * 图标选择按钮
         */
        ComponentType.BUTTON_ICON_SELECTED = 10;
        /**
         * 文本选择按钮
         */
        ComponentType.BUTTON_TEXT_SELECTED = 11;
        /**
         * 文本图标选择按钮
         */
        ComponentType.BUTTON_SELECTED = 12;
        /**
         * 复选框按钮
         */
        ComponentType.CHECK_BOX = 13;
        /**
         * 单选框按钮
         */
        ComponentType.RADIO_BUTTON = 14;
        /**
         * 滚动条
         */
        ComponentType.SCROLL_BAR = 15;
        /**
         * 下拉列表
         */
        ComponentType.COMBOBOX = 16;
        /**
         * 输入框
         */
        ComponentType.TEXT_INPUT = 17;
        /**
         * 文本框
         */
        ComponentType.TEXT_AREA = 18;
        /**
         * 远程加载图片
         */
        ComponentType.IMAGE_REMOTE = 19;
        /**
         * TAB组件
         */
        ComponentType.TAB = 20;
        /**
         * 列表
         */
        ComponentType.LIST = 21;
        /**
         * 面板
         */
        ComponentType.PANEL = 22;
        /**
         * 菜单栏
         */
        ComponentType.MENU_BAR = 23;
        /**
         * 菜单子项
         */
        ComponentType.MENU_ITEM = 24;
        /**
         *  菜单孙子项
         */
        ComponentType.MENU_SUB_ITEM = 25;
        /**
         * 菜单主按钮
         */
        ComponentType.MENU_ITEM_BUTTON_TEXT = 26;
        /**
         * 菜单栏孙项按钮组件
         */
        ComponentType.MENU_SUB_ITEM_BUTTON_TEXT = 27;
        /**
         * tree
         */
        ComponentType.TREE = 28;
        /**
         * TabButton
         */
        ComponentType.TAB_BUTTON = 29;
        ComponentType.SLIDER = 30;
        /**
         * 复选框按钮2
         */
        ComponentType.CHECK_BOX1 = 31;
        return ComponentType;
    }());
    devil.ComponentType = ComponentType;
})(devil || (devil = {}));
