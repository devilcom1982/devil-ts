declare namespace devil {
    /**
     * 文本框
     * @author        devil
     * @version       V20190213
     * @create        2019-02-13
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class Text extends Component {
        private _textField;
        private _layer;
        private _clickFun;
        private _linkFun;
        private _focusInFun;
        private _focusOutFun;
        /**
         * 颜色
         */
        get color(): number;
        set color(value: number);
        /**
         * 是否加粗
         */
        get bold(): boolean;
        set bold(value: boolean);
        /**
         * 字体大小
         */
        get size(): number;
        set size(value: number);
        /**
         * 文本内容
         */
        get text(): string;
        set text(value: string);
        /**
         * 设置文本布局
         * @param value   egret.HorizontalAlign常量
         */
        get align(): string;
        set align(value: string);
        /**
         * 是否可编辑
         */
        set editor(value: boolean);
        get textWidth(): number;
        get textHeight(): number;
        get wordWrap(): boolean;
        set wordWrap(value: boolean);
        get multiline(): boolean;
        set multiline(value: boolean);
        set verticalAlign(value: string);
        set htmlText(value: string);
        set stroke(value: number);
        set strokeColor(value: number);
        set lineSpacing(value: number);
        set border(value: boolean);
        set textType(value: string);
        set background(value: boolean);
        set backgroundColor(value: number);
        get maxChars(): number;
        set maxChars(value: number);
        set displayAsPassword(value: boolean);
        get displayAsPassword(): boolean;
        set restrict(value: string);
        get restrict(): string;
        constructor();
        protected initLayer(): void;
        protected start(): void;
        private removeEvent;
        /**
         * @private
         */
        protected draw(): void;
        private drawSize;
        appendText(text: string): void;
        setFocus(): void;
        /**
         * @private
         */
        unuse(): void;
        /**
         * @private
         */
        dispose(): void;
        __click(callBack: Function, target: any): void;
        private ___click;
        __link(callBack: Function, target: any): void;
        private ___link;
        __focusIn(callBack: Function, target: any): void;
        private ___focusIn;
        __focusOut(callBack: Function, target: any): void;
        private ___focusOut;
    }
}
