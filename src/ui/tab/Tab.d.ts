declare namespace devil {
    /**
     * Tab
     * @author        devil
     * @version       V201190813
     * @create        2019-08-13
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class Tab extends Container {
        private _selector;
        private _selectedIndex;
        private _change;
        private _commLayer;
        private _uiLayer;
        private _redLayer;
        private _paddingH;
        get selectedIndex(): number;
        set selectedIndex(value: number);
        resetSelectedIndex(): void;
        set paddingH(value: number);
        get paddingH(): number;
        start(): void;
        private onSelected;
        switchRed(index: number, isRed: boolean): void;
        add(data: TabData): TabButtonIconSelected;
        addAt(data: TabData, index: number): TabButtonIconSelected;
        /**
         *
         * @param index 此处删除可能有问题，flag
         * @param unuse
         */
        removeAt(index: number, unuse: boolean): void;
        protected draw(): void;
        private drawLayout;
        unuse(): void;
        dispose(): void;
        __change(callBack: (oldIndex: number, target: Tab) => void, target: any): void;
    }
}
