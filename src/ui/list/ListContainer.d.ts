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
    class ListContainer extends Container implements IListContainer {
        static DRAW_CONTENT_SIZE: number;
        protected _col: number;
        protected _paddingV: number;
        protected _paddingH: number;
        private _itemWidth;
        private _itemHeight;
        private _selector;
        protected _datas: IListItemData[];
        protected _startIndex: number;
        protected _endIndex: number;
        protected _contentWidth: number;
        protected _contentHeight: number;
        protected _scrollV: number;
        protected _scrollH: number;
        private _scrollRect;
        private _indexInViewCalculated;
        private _itemRender;
        private _createItemRender;
        private _fromScrollBar;
        private _layer;
        private _subLayers;
        private _sortFun;
        private _sliderH;
        private _sliderV;
        holdBottom: boolean;
        get showCount(): number;
        get itemWidth(): number;
        set itemWidth(value: number);
        get itemHeight(): number;
        set itemHeight(value: number);
        get paddingV(): number;
        set paddingV(value: number);
        get paddingH(): number;
        set paddingH(value: number);
        getCurrent(): IRadioSelected;
        get selectedIndex(): number;
        set selectedIndex(value: number);
        get contentWidth(): number;
        get contentHeight(): number;
        get scrollRect(): egret.Rectangle;
        set scrollRect(value: egret.Rectangle);
        getScrollH(): number;
        setScrollH(value: number, fromScrollBar: boolean): void;
        getScrollV(): number;
        setScrollV(value: number, fromScrollBar: boolean): void;
        set sliderH(slider: ListSlider);
        get sliderH(): ListSlider;
        set sliderV(slider: ListSlider);
        get sliderV(): ListSlider;
        get datas(): IListItemData[];
        set datas(value: IListItemData[]);
        set itemRenderer(value: any);
        get col(): number;
        set col(value: number);
        /**
         * 创建子项时，需要的回调函数，可以做一些参数的设置或代码初始化等操作
         * @callBack 参数为当前创建的IListItem实例
         */
        createItemRender(callBack: (child: IListItem, index: number) => void, target: any): void;
        constructor();
        protected initLayer(): void;
        protected start(): void;
        protected draw(): void;
        setSize(width: number, height: number): void;
        /**
         * 清空
         */
        clear(): void;
        /**
         * 清空列表数据
         */
        clearData(): void;
        private drawLayout;
        protected sortPosition(): void;
        add(data: IListItemData): void;
        addAt(data: IListItemData, index: number): void;
        getItemAt(index: number): IListItem;
        removeAt(index: number): void;
        remove(data: IListItemData): void;
        protected getStartPosition(index: number): number;
        /**
         * 折半查找法寻找指定位置的显示对象索引
         */
        protected findIndexAt(scroll: number, i0: number, i1: number): number;
        protected getIndexInView(): boolean;
        protected createItem(index: number): IListItem;
        getSubLayer(index: number): egret.DisplayObjectContainer;
        protected drawContentSize(): void;
        private scrollPositionChanged;
        protected getDirection(): number;
        createSortFun(callBack: () => void, target: any): void;
        unuse(): void;
        dispose(): void;
        __change(callBack: (current: IRadioSelected) => void, target: any): void;
    }
}
