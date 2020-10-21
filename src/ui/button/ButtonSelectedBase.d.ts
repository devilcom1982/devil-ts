declare namespace devil {
    /**
     * @author        devil
     * @version       V201190215
     * @create        2019-02-15
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ButtonSelectedBase implements IPool {
        private _button;
        set button(value: ButtonImage);
        set selected(value: boolean);
        get selected(): boolean;
        reuse(): void;
        unuse(): void;
        dispose(): void;
        pool(): void;
    }
}
