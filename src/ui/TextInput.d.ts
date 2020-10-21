declare namespace devil {
    /**
     * @description
     * @author        devil
     * @version       V20190413
     * @create        2019-04-13
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class TextInput extends Container {
        private _editor;
        private _text;
        private _back;
        private _prompt;
        private _displayAsPassword;
        set editor(value: boolean);
        get editor(): boolean;
        get text(): string;
        set text(value: string);
        get color(): number;
        set color(value: number);
        get bold(): boolean;
        set bold(value: boolean);
        get size(): number;
        set size(value: number);
        get align(): string;
        set align(value: string);
        set enabled(value: boolean);
        get prompt(): string;
        set prompt(value: string);
        get maxChars(): number;
        set maxChars(value: number);
        set displayAsPassword(value: boolean);
        get displayAsPassword(): boolean;
        set restrict(value: string);
        get restrict(): string;
        constructor();
        protected start(): void;
        protected setDefaultStyle(): void;
        protected draw(): void;
        private drawStyle;
        private drawSize;
        setFocus(): void;
        unuse(): void;
        dispose(): void;
        private ___focusIn;
        private ___focusOut;
    }
}
