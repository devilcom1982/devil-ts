declare namespace devil {
    /**
     * 组件基类，所有的组件都需要继承此类
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class Component extends View {
        protected _type: number;
        protected _styles: any;
        protected _stylesOffset: any;
        /**
         * 组件类型，对应的常量ComponentType
         */
        get type(): number;
        constructor();
        /**
         * @private
         */
        protected start(): void;
        /**
         * 设置缺省样式
         */
        protected setDefaultStyle(): void;
        /**
         * 获取指定名字的样式皮肤字符串
         * @param name		StyleName常量或自定义的特殊样式名
         */
        getStyle(name: string): any;
        protected getImageData(styleName: string): ResourceItem;
        /**
         * 设置指定名字的样式皮肤字符串
         * @param name		StyleName常量或自定义的特殊样式名
         * @param value		皮肤字符串
         */
        setStyle(name: string, value: any): void;
        /**
         * 设置指定名字的样式便宜
         * @param name		StyleName常量或自定义的特殊样式名
         */
        setStyleOffset(name: string, xOffset: number, yOffset: number): void;
        /**
         * 设置指定名字的样式便宜
         * @param name		StyleName常量或自定义的特殊样式名
         */
        getStyleXoffset(name: string): number;
        /**
         * 设置指定名字的样式便宜
         * @param name		StyleName常量或自定义的特殊样式名
         */
        getStyleYoffset(name: string): number;
        unuse(): void;
        dispose(): void;
    }
}
