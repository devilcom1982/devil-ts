declare namespace devil {
    /**
     * 滑动组件进度条
     */
    class ListSlider extends Container implements IDispose {
        private _layer;
        private _trackImg;
        private _thumbImg;
        container: IListContainer;
        isVertical: boolean;
        listHeight: number;
        listWidth: number;
        private _posOffset;
        private _sizeOffset;
        constructor();
        setTrackAlpha(value: number): void;
        setTrackSource(value: string): void;
        setThumbSource(value: string): void;
        set posOffset(value: number);
        set sizeOffset(value: number);
        protected initLayer(): void;
        protected start(): void;
        addEvent(): void;
        removeEvent(): void;
        updateContentSize(): void;
        /** */
        containerUpdPos(scrollValue: number): void;
        /** 更新位置 */
        protected updateThumbPos(value: number, fromContainer?: boolean, calOffset?: boolean): void;
        protected ___handleEvent(e: egret.TouchEvent): void;
        protected draw(): void;
        protected drawLayout(): void;
        protected drawData(): void;
        protected drawSize(): void;
        unuse(): void;
        dispose(): void;
    }
}
