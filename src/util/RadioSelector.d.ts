declare namespace devil {
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
    class RadioSelector implements IDispose {
        private _selecteds;
        private _currentSelected;
        private _changFun;
        get selecteds(): IRadioSelected[];
        get currentSelected(): IRadioSelected;
        get selectedIndex(): number;
        set selectedIndex(value: number);
        set selectedView(value: IRadioSelected);
        constructor();
        add(selected: IRadioSelected): void;
        addAt(selected: IRadioSelected, index: number): void;
        remove(selected: IRadioSelected): void;
        cancel(): void;
        removeAt(index: number): void;
        clear(): void;
        pool(): void;
        dispose(): void;
        __change(callBack: (selected: IRadioSelected) => void, target: any): void;
    }
}
