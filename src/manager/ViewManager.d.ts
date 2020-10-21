declare namespace devil {
    /**
     * 视图管理器,只有注册了的视图才可以通过管理器打开
     * @author        devil
     * @version       V20190405
     * @create        2019-04-05
     * @update 	      devil        2019-05-13        新增加载时出现ViewLoading视图功能
     * @update 	      devil        2019-05-27        新增三级视图概念
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ViewManager {
        private _openningViews;
        private _modalViews;
        private _singleViews;
        private _multeViews;
        private _thirdViews;
        private _openningModalViews;
        private _modal;
        private _textures;
        private _relativeViews;
        constructor();
        /**
         * 注册单开面板
         */
        registerSingleView(viewID: any, cls: any, textureName?: string, modal?: boolean): void;
        /**
         * 注册多开视图
         * @textureName  是否先加载贴图再打开
         */
        registerMulteView(viewID: any, cls: any, modal?: boolean, textureName?: string): void;
        /**
         * 三级视图
         * @textureName  是否先加载贴图再打开
         */
        registerThirdView(viewID: any, cls: any, modal?: boolean, textureName?: string): void;
        /**
         * 添加关联界面,主要是当主界面关闭时会关闭关联界面
         * @param viewID
         */
        registerRelativeView(mainViewID: any, subViewID1: any, subViewID2: any, ...subViewIDs: any[]): void;
        /**
         * 获取指定ID的视图
         */
        getView<T>(viewID: any): T;
        /**
         * 是否正在打开指定的ID的视图
         */
        isOpenning(viewID: any): boolean;
        /**
         * 是否有单开视图打开
         */
        isOpeningSingleView(): boolean;
        /**
         * 打开或关闭切换
         */
        switch<T extends IView>(viewID: any, showLoading?: boolean): T;
        show<T extends IView>(viewID: number, showLoading?: boolean): T;
        /**
         * 关闭界面
         * @param viewID
         * @param fromModal 当是模态窗口时，点击黑色背景时，则值为true，默认是自动关闭界面，传入此参数可以阻止此默认操作。
         */
        hide(viewID: any, fromModal?: boolean): void;
        /**
         * 检测关闭界面
         * @param hideViewID 要关闭的界面ID
         * @param relativeViewID 当前关联显示的主界面ID
         */
        checkHide(hideViewID: any, relativeViewID: any, fromModal?: boolean): void;
        setModalAlpha(alpha?: number): void;
        /**
         * 关闭所有已打开界面
         */
        hideAll(): void;
        private createView;
        private showView;
        private open;
        private ___touchTap;
        private ___resize;
    }
}
