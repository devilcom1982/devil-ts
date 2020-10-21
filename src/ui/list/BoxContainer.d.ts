declare namespace devil {
    /**
     * 盒子容器
     * @author        devil
     * @version       V20190305
     * @create        2019-03-05
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class BoxContainer extends Container implements IListContainer {
        datas: IListItemData[];
        contentHeight: number;
        contentWidth: number;
        private _showCount;
        private _itemWidth;
        private _itemHeight;
        private _selector;
        private _row;
        private _col;
        private _paddingV;
        private _paddingH;
        holdBottom: boolean;
        getCount(): number;
        /**
         * 最多显示数量，要在add与addAt前使用
         */
        get showCount(): number;
        set showCount(value: number);
        get itemWidth(): number;
        set itemWidth(value: number);
        get itemHeight(): number;
        set itemHeight(value: number);
        get selectedIndex(): number;
        set selectedIndex(value: number);
        getCurrent(): IRadioSelected;
        getScrollH(): number;
        getScrollV(): number;
        setScrollH(value: number): void;
        setScrollV(value: number): void;
        constructor();
        protected start(): void;
        protected draw(): void;
        private drawLayOut;
        add(item: IListItem): void;
        addAt(item: IListItem, index: number): void;
        getItemAt(index: number): IListItem;
        remove(item: IListItem): void;
        removeAt(index: number): void;
        /**
         * 清空
         */
        clear(): void;
        /**
         * 清空列表数据
         */
        clearData(): void;
        private updateWH;
        unuse(): void;
        dispose(): void;
        /**
         * 参数 IRadioSelected
         */
        __change(callBack: (selected: IRadioSelected) => void, target: any): void;
        static createSelf(row: number, col: number, paddingV?: number, paddingH?: number): BoxContainer;
    }
}
