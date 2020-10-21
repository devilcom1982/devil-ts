declare namespace devil {
    /**
     * 层管理器,一级层只有三层，对应的是LayerIndex常量，常量值对应的是层级关系，可以随时自动扩展Element与UI一级层的二级层，但需要定义二级层常量LayerSubIndex
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    class LayerManager {
        private _elementLayers;
        private _uiLayers;
        private _elementSub3Layers;
        private _moveLayers;
        private _root;
        /**
         * 地图层,或者游戏层或者内容层
         */
        mapLayer: egret.DisplayObjectContainer;
        /**
         * 元素层，场景对象层
         */
        elementLayer: egret.DisplayObjectContainer;
        /**
         * UI层
         */
        uiLayer: egret.DisplayObjectContainer;
        constructor(root: egret.DisplayObjectContainer);
        private initLayer;
        /**
         * 初始化二级层
         * @param index
         * @param subIndex
         */
        private initSubLayer;
        private createLayer;
        /**
         * 移动层，对于ARPG游戏来说人物移动的时候，元素与地图层需要动态更新位置
         */
        moveLayers(x: number, y: number): void;
        /**
         * 填加视图到二级层级
         * @param index
         * @param subIndex
         * @param view
         */
        addSubView(index: LayerIndex, subIndex: number, view: egret.DisplayObject, index1?: number): void;
        /**
         * 填加视图到元素层二级视图中
         * @param subIndex
         * @param view
         * @param index1
         */
        addElement(subIndex: number, view: egret.DisplayObject, index1?: number): void;
        /**
         * 填加视图到UI层二级视图中
         * @param subIndex
         * @param view
         * @param index1   是否指定层级，如果不指定则自动填加
         */
        addUI(subIndex: number, view: egret.DisplayObject, index1?: number): void;
        /**
         * 填加视图到三级层级
         * @param index
         * @param subIndex
         * @param view
         */
        addSub3View(index: LayerIndex, subIndex: number, key: string, view: egret.DisplayObject): void;
        /**
         * 获取元素层的二级视图实例引用
         */
        getElement(subIndex: number): egret.DisplayObjectContainer;
        /**
         *  获取UI层的二级视图实例引用
         */
        getUI(subIndex: number): egret.DisplayObjectContainer;
        /**
         * 二级层视图重新填加回一级层内
         * @param subIndex
         * @param force		是否强制填加
         */
        addChildUI(subIndex: number, force?: boolean): void;
        /**
         * 删除指定的二级UI层
         */
        removeChildUI(subIndex: number): void;
        /**
         * 返回指定的二级层实例
         */
        getSubLayer(index: LayerIndex, subIndex: number): egret.DisplayObjectContainer;
        showTopLayer(index: LayerIndex): void;
    }
}
