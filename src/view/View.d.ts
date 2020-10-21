declare namespace devil {
    /**
     * 视图基类
     * <p>
     * 	  关于视图的宽高改变，需要子类手动重写drawSize方法
     * </p>
     * @author        devil
     * @version       V20190913
     * @create        2018-12-25
     * @update        2019-03-14  devil  填加_isPool字段控制是否使用对象池回收机制，默认对象池回收
     * @update        2019-09-13  devil  填加localToGlobal方法
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class View implements IPool {
        private _x;
        private _y;
        private _anchorX;
        private _anchorY;
        private _parent;
        protected _layers: egret.DisplayObjectContainer[];
        protected _invalid: number;
        protected _width: number;
        protected _height: number;
        protected _name: string;
        protected _enabled: boolean;
        protected _layerID: number;
        protected _isPool: boolean;
        set touchChildren(value: boolean);
        get touchChildren(): boolean;
        set touchEnabled(value: boolean);
        get touchEnabled(): boolean;
        set scaleX(value: number);
        get scaleX(): number;
        set scaleY(value: number);
        get scaleY(): number;
        set rotation(value: number);
        get rotation(): number;
        set visible(value: boolean);
        get visible(): boolean;
        set alpha(value: number);
        get alpha(): number;
        set x(value: number);
        get x(): number;
        set y(value: number);
        get y(): number;
        get layers(): egret.DisplayObjectContainer[];
        set width(value: number);
        get width(): number;
        set height(value: number);
        get height(): number;
        /**
         * X方向锚点，默认值为0，宽度值
         */
        get anchorX(): number;
        set anchorX(value: number);
        /**
         * Y方向锚点，默认值为0，高度值
         */
        get anchorY(): number;
        set anchorY(value: number);
        /**
         * 设置父类
         */
        set parent(value: Container);
        get parent(): Container;
        /**
         * 实例名
         */
        set name(value: string);
        get name(): string;
        /**
         * 层ID，用于生成所在的贴图,一个id生成一个贴图
         */
        set layerID(value: number);
        get layerID(): number;
        /**
         * 可交互状态
         */
        setEnabled(value: boolean): void;
        getEnabled(): boolean;
        set filters(value: Array<egret.Filter | egret.CustomFilter>);
        get measuredHeight(): number;
        get measuredWidth(): number;
        get right(): number;
        get bottom(): number;
        set mask(value: egret.Rectangle | egret.DisplayObject);
        constructor();
        /**
         * 子类一定要重写
         */
        protected initLayer(): void;
        protected createLayer(): egret.DisplayObjectContainer;
        /**
         * 初始化变量
         */
        protected start(): void;
        private $addEvent;
        private $removeEvent;
        /**
         * 移动位置
         */
        move(x: number, y: number): void;
        /**
         * 设置锚点，介于0到1间
         * @param anchorX
         * @param anchorY
         */
        setAnchor(anchorX: number, anchorY: number): void;
        /**
         * 设置长宽，下一帧重会时更新长宽
         */
        setSize(width: number, height: number): void;
        /**
         * 在未另外指定的情况下，将属性标记为无效，并在下一帧上重绘组件。
         * @param property   要使其无效的属性
         */
        invalidate(property: number): void;
        /**
         * Included the first property as a proper param to enable *some* type checking, and also because it is a required param.
         * @param property
         * @param properties
         * @return
         */
        protected isInvalid(property: number, ...properties: any[]): boolean;
        private validate;
        /**
         * 强制重绘
         */
        repaint(): void;
        /**
         * 绘制方法,子类重写
         */
        protected draw(): void;
        /**
         * 更改位置
         */
        private updatePosition;
        private startCallLater;
        removeFromParent(): void;
        localToGlobal(localX: number, localY: number): egret.Point;
        unuse(): void;
        reuse(): void;
        /**
         * 回收
         */
        pool(): void;
        dispose(): void;
        protected addToStage(): void;
        protected removeFromStage(): void;
        /**
         * 自动生成层
         * @param count	数量
         */
        autoCreateLayer(count: number): void;
        private __addToStage;
        private __removedFromStage;
        /**
         * 对象池创建,并且只能使用此方法创建对象比较好
         * @param cls    View或继承View的子类
         * @param layer	  层
         */
        static create(cls: {
            new (): any;
        }): any;
    }
}
