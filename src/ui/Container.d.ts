declare namespace devil {
    /**
     * 容器
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @update        devil 2019-03-15  创建层时会重新设置层的坐标
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class Container extends Component {
        protected _numChildren: number;
        protected _children: View[];
        /**
         * 容器孩子的数量
         */
        get numChildren(): number;
        constructor();
        /**
         * @private
         */
        protected start(): void;
        /**
         * 删除指定的子对象 ,同时会触发布局无效标识，如果需要在子类需写drawLayout方法
         * @param child	子对象
         * @param unuse 删除的同时是否回收子对象
         */
        removeChild(child: View, unuse: Boolean): void;
        /**
         * 删除指定索引值位置的元素,同时会触发布局无效标识，如果需要在子类需写drawLayout方法
         */
        removeChildAt(index: number, unuse: Boolean): void;
        /**
         * 删除子对象并回收
         */
        removeChildren(): void;
        /**
         * 填加子元素,同时会触发布局无效标识，如果需要在子类需写drawLayout方法
         * @param child
         * @待废弃
         */
        addChild(child: View, ...layers: egret.DisplayObjectContainer[]): void;
        /**
         * 填加视图到容器内指定的索引位置 ，同时会触发布局无效标识，如果需要在子类需写drawLayout方法
         * @param child
         * @param index
         * @param layers
         * @待废弃
         */
        addChildAt(child: View, index: number, ...layers: egret.DisplayObjectContainer[]): void;
        /**
         * 查找指定索引位置位的子元素
         * @param index
         */
        getChildAt(index: number): View;
        /**
         * 查找指定实例名的子元素，相同条件下效率低于getChildAt
         * @param name	实例名
         */
        getChildByName(name: string): View;
        private treeChildByName;
        /**
         * 判断指定的元素是否存在于此容器中
         */
        contains(view: View): Boolean;
        /**
         * 解析数据完成时触发，子类需重写
         */
        readDataComplete(): void;
        /**
         * 设置容器子类实例引用
         * @param name	实例名
         * @param view	实例
         */
        setProperty(name: string, view: View): void;
        /**
         * 填加视图到指定的层级
         * @param view
         * @param index
         * @待废弃
         */
        addChildAtLayerIndex(view: View, index: number): void;
        /**
         * 填加子元素,同时会触发布局无效标识，如果需要在子类需写drawLayout方法
         * @param child
         */
        addChild2(child: View): void;
        /**
         * 填加视图到容器内指定的索引位置 ，同时会触发布局无效标识，如果需要在子类需写drawLayout方法
         * @param child
         * @param index
         */
        addChildAt2(child: View, index: number): void;
        private $addChildAt;
        /**
         * 此处有个漏洞，this._layers[m].addChildAt(child.layers[n++],index)中的index可能不准
         * @param child
         * @param index
         * @param n
         */
        private treeLayerID;
        /**
         * @inheritDoc
         */
        unuse(): void;
        /**
         * @inheritDoc
         */
        dispose(): void;
    }
}
