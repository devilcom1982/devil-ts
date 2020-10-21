declare namespace devil {
    /**
     * 图片按钮，背景只有一张图片，可有几种不同的状态
     * @author        devil
     * @version       V20190211
     * @create        2019-02-11
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ButtonImage extends Container {
        private static DRAW_STATE;
        private _mouseDownFun;
        private _clickFun;
        private _longClickFun;
        private _longClickCnt;
        protected _layer: egret.DisplayObjectContainer;
        protected _buttonState: ButtonState;
        protected _currentBack: Image;
        protected _downOffset: Boolean;
        get buttonState(): ButtonState;
        set buttonState(value: ButtonState);
        setEnabled(value: boolean): void;
        /**
         * 按下按钮时是否偏移1像素
         * @param value
         */
        set downOffset(value: Boolean);
        constructor();
        protected initLayer(): void;
        /**
         * @private
         */
        protected start(): void;
        /**
         * @private
         */
        protected addEvent(): void;
        /**
         * @private
         */
        protected removeEvent(): void;
        /**
         * @private
         */
        protected setDefaultStyle(): void;
        /**
         * @private
         */
        protected draw(): void;
        /**
         * @private
         */
        protected drawState(): void;
        protected drawSkin(styleName: string): void;
        protected drawSize(): void;
        /**
         * @private
         */
        reuse(): void;
        /**
         * @private
         */
        unuse(): void;
        /**
         * @private
         */
        dispose(): void;
        /**
         * 点击事件
         */
        __click(callBack: Function, target: any): void;
        /**
         * 鼠标按下事件
         */
        __mouseDown(callBack: Function, target: any): void;
        /**
         * 长按事件
         */
        __longClick(callBack: Function, target: any): void;
        /**
         * @private
         */
        protected ___handleEvent(e: egret.Event): void;
        protected ___$handleEvent(e: egret.Event): void;
        /** */
        private ___checkLongClick;
    }
}
