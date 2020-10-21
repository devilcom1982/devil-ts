declare namespace devil {
    /**
     * UI解析数据管理器
     * @author        devil
     * @version       V20190223
     * @create        2019-02-23
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class UIReadManager {
        createComponent(componentType: number): Component;
        read(parent: Container, bytes: ByteArrayExtend, version: string, __setProperty: Function, target: any): Component;
        private parse;
        private readButtonImage;
        private readContainer;
        private readImage;
        private readText;
        private readButtonText;
        private readButtonImageSelected;
        private readButtonIcon;
        private readButtonIconSelected;
        private readImageRemote;
        private readTextInput;
        private readCheckBox;
        private readRadioButton;
        private readStyles;
        private readCommon;
        readUIData(build: ArrayBuffer, model: CanvasModel): void;
        private readTxtData;
    }
}
