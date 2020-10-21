declare namespace devil {
    /**
     * 组件管理器
     * @author        devil
     * @version       V20190213
     * @create        2019-02-13
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ComponentManager {
        createImage(source?: egret.Texture | string, x?: number, y?: number, width?: number, height?: number): Image;
        createButtonImage(upBackSkin: string, width: number, height: number, x?: number, y?: number): ButtonImage;
        /**
         *
         * @param y
         * @param width
         * @param height
         * @param color
         * @param size  default 24
         * @param align default center egret.HorizontalAlign常量
         */
        createText(x: number, y: number, width: number, height: number, color: number, size?: number, align?: string): Text;
        createButtonIcon(upBackSkin: string, upIconSkin: string, x: number, y: number, width: number, height: number): ButtonIcon;
        createImageRemote(x?: number, y?: number, width?: number, height?: number): ImageRemote;
        createContainer(count?: number): Container;
        createListContainer(cls: any, itemWidth: number, itemHeight: number, datas?: IListItemData[]): ListContainer;
        createListContainer2(cls: any, datas?: IListItemData2[]): ListContainer2;
        /**
         *
         * @param width
         * @param height
         * @param scrollPolicyV     default ScrollPolicy.AUTO
         * @param scrollPolicyH     default ScrollPolicy.OFF
         * @param layout            default List.VERTICAL
         */
        createList(width: number, height: number, scrollPolicyV?: ScrollPolicy, scrollPolicyH?: ScrollPolicy, layout?: number): List;
        /** */
        createListSlider(width: number, height: number, listWidth: number, listHeight: number): ListSlider;
        /**
         *
         * @param x
         * @param y
         * @param width
         * @param height
         * @param align default center egret.HorizontalAlign常量
         */
        createTextInput(x: number, y: number, width: number, height: number, color: number, size: number, upBackSkin: string, align?: string): TextInput;
        createCheckBox1(upBackSkin: string, selectIconSkin: string, color?: number, size?: number): CheckBox1;
        createBoxContainer(row: number, col: number, paddingV?: number, paddingH?: number): BoxContainer;
        createTab(): Tab;
        createAnimation(): Animation;
    }
}
