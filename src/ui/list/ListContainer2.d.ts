declare namespace devil {
    /**
     * 列表组件容器
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ListContainer2 extends ListContainer {
        /**
         * 特殊处理 玩动2游戏的面板Tab
         */
        contentWidthOffset: number;
        constructor();
        protected start(): void;
        protected sortPosition(): void;
        protected getStartPosition(index: number): number;
        /**
         * 折半查找法寻找指定位置的显示对象索引
         */
        protected findIndexAt(scroll: number, i0: number, i1: number): number;
        protected getIndexInView(): boolean;
        protected drawContentSize(): void;
    }
}
