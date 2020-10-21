declare namespace devil {
    /**
     * Tab选中按钮图标
     * @author        devil
     * @version       V201190215
     * @create        2019-02-15
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class TabButtonIconSelected extends ButtonIconSelected implements IListItem {
        static RED_SKIN: string;
        private _selector;
        private _red;
        private _commonLayer1;
        private _index;
        get index(): number;
        set index(value: number);
        protected initLayer(): void;
        protected start(): void;
        protected setDefaultStyle(): void;
        setSelected(value: boolean): void;
        getSelected(): boolean;
        setSelector(value: RadioSelector): void;
        switchRed(show: boolean): void;
        setData(value: TabData): void;
        clearData(): void;
        unuse(): void;
        dispose(): void;
        protected ___handleEvent(e: egret.TouchEvent): void;
    }
}
