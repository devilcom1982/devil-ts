declare namespace devil {
    /**
     * Tip管理器
     * @author devil
     * @version V20190425
     * @create 20190425
     * @place guangzhou
     */
    class TipManager {
        private _currentTip;
        private _modal;
        /**
         *
         * @param cls
         * @param modal   default false
         */
        show<T extends ITip>(cls: {
            new (): T;
        }, modal?: boolean): T;
        hide<T extends ITip>(cls?: {
            new (): T;
        }): void;
        /** 是否打开了 */
        isOpenning<T extends ITip>(cls: {
            new (): T;
        }): boolean;
        setModalAlpha(alpha?: number): void;
        private ___touchTap;
        private ___resize;
    }
}
