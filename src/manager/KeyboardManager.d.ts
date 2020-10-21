declare namespace devil {
    /**
     * 键盘管理器
     * @author        devil
     * @version       V20191104
     * @create        2019-11-04
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class KeyboardManager {
        private _functions;
        private _keyDowns;
        private _pushKeys;
        private _firstDelay;
        /**
         * 当第一次按下键盘时，会有些延时，默认为500MS
         */
        set firstDelay(value: number);
        constructor();
        /**
     * 判断指定的键是否被按下
     * @param keyCode
     * @return
     */
        hasKey(keyCode: number): boolean;
        /**
         * 填加侦听函数
         * @param key
         * @param callBack 参数keyCode如果是组合键，类似51|52；
         *                state是KeyState常量，标记是抬起还是按下；
         * @param target
         */
        add(key: number, callBack: (keyCode: string, state: KeyState) => void, target: any): void;
        remove(key: number, callBack: Function, target: any): void;
        adds(keys: number[], callBack: (keyCode: string, state: KeyState) => void, target: any): void;
        removes(keys: number[], callBack: Function, target: any): void;
        private callBack;
        private sort;
        private ___render;
        private ___pushRender;
    }
}
