var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var devil;
(function (devil) {
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
    var Container = /** @class */ (function (_super_1) {
        __extends(Container, _super_1);
        function Container() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.CONTAINER;
            return _this;
        }
        Object.defineProperty(Container.prototype, "numChildren", {
            /**
             * 容器孩子的数量
             */
            get: function () {
                return this._numChildren;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        Container.prototype.start = function () {
            this._children = [];
            _super_1.prototype.start.call(this);
            this._numChildren = 0;
            this._width = devil.ComponentDefault.CONTAINER_WIDTH;
            this._height = devil.ComponentDefault.CONTAINER_HEIGHT;
        };
        /**
         * 删除指定的子对象 ,同时会触发布局无效标识，如果需要在子类需写drawLayout方法
         * @param child	子对象
         * @param unuse 删除的同时是否回收子对象
         */
        Container.prototype.removeChild = function (child, unuse) {
            if (child != null && child.parent != null) {
                var index = this._children.indexOf(child);
                this.removeChildAt(index, unuse);
            }
        };
        /**
         * 删除指定索引值位置的元素,同时会触发布局无效标识，如果需要在子类需写drawLayout方法
         */
        Container.prototype.removeChildAt = function (index, unuse) {
            if (devil.MathUtil.isBetween(0, this._numChildren - 1, index)) {
                var child = this._children[index];
                if (child.parent == this) {
                    if (unuse)
                        child.pool();
                    else {
                        child.removeFromParent();
                    }
                    child.parent = null;
                    var index_1 = this._children.indexOf(child);
                    if (index_1 != -1) {
                        this._numChildren--;
                        this._children.splice(index_1, 1);
                        this.invalidate(devil.InvalidationType.LAYOUT);
                    }
                }
                else if (child.parent == null) {
                }
                else {
                    throw new Error("要删除的孩子不在当前容器中");
                }
            }
            else {
                throw new Error("要删除的孩子不在当前容器中");
            }
        };
        /**
         * 删除子对象并回收
         */
        Container.prototype.removeChildren = function () {
            while (this._numChildren > 0) {
                this.removeChildAt(0, true);
            }
        };
        /**
         * 填加子元素,同时会触发布局无效标识，如果需要在子类需写drawLayout方法
         * @param child
         * @待废弃
         */
        Container.prototype.addChild = function (child) {
            var layers = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                layers[_i - 1] = arguments[_i];
            }
            this.addChildAt.apply(this, __spreadArrays([child, this._numChildren + 1], layers));
        };
        /**
         * 填加视图到容器内指定的索引位置 ，同时会触发布局无效标识，如果需要在子类需写drawLayout方法
         * @param child
         * @param index
         * @param layers
         * @待废弃
         */
        Container.prototype.addChildAt = function (child, index) {
            var layers = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                layers[_i - 2] = arguments[_i];
            }
            var that = this;
            if (child.parent == that) {
                index = devil.MathUtil.clamb(0, that._numChildren <= 0 ? 0 : that._numChildren - 1, index);
                var tIndex = that._children.indexOf(child);
                if (tIndex != index) {
                    that._children.splice(tIndex, 1);
                    that._children.splice(index, 0, child);
                    var len = layers.length;
                    for (var i = 0; i < len; i++) {
                        if (child.layers[i])
                            layers[i].addChildAt(child.layers[i], index);
                    }
                    that.invalidate(devil.InvalidationType.LAYOUT);
                }
            }
            else if (child.parent != that) {
                index = devil.MathUtil.clamb(0, that._numChildren, index);
                if (child.parent != null)
                    child.parent.removeChild(child, false);
                child.parent = that;
                if (index == that._numChildren) {
                    that._children[index] = child;
                    var len = layers.length;
                    for (var i = 0; i < len; i++) {
                        if (child.layers[i])
                            layers[i].addChild(child.layers[i]);
                    }
                }
                else {
                    that._children.splice(index, 0, child);
                    var len = layers.length;
                    for (var i = 0; i < len; i++) {
                        if (child.layers[i])
                            layers[i].addChildAt(child.layers[i], index);
                    }
                }
                that._numChildren++;
                that.invalidate(devil.InvalidationType.LAYOUT);
            }
        };
        /**
         * 查找指定索引位置位的子元素
         * @param index
         */
        Container.prototype.getChildAt = function (index) {
            if (index < 0 || index > this._numChildren)
                return null;
            return this._children[index];
        };
        /**
         * 查找指定实例名的子元素，相同条件下效率低于getChildAt
         * @param name	实例名
         */
        Container.prototype.getChildByName = function (name) {
            var child = this.treeChildByName(name, this);
            return child;
        };
        Container.prototype.treeChildByName = function (name, container) {
            var child;
            for (var i = 0; i < this._numChildren; i++) {
                child = this.getChildAt(i);
                if (child.name == name)
                    return child;
                if (child instanceof Container)
                    return this.treeChildByName(name, child);
            }
            return null;
        };
        /**
         * 判断指定的元素是否存在于此容器中
         */
        Container.prototype.contains = function (view) {
            var v = view;
            while (v) {
                if (v == this)
                    return true;
                else
                    v = v.parent;
            }
            return false;
        };
        /**
         * 解析数据完成时触发，子类需重写
         */
        Container.prototype.readDataComplete = function () {
        };
        /**
         * 设置容器子类实例引用
         * @param name	实例名
         * @param view	实例
         */
        Container.prototype.setProperty = function (name, view) {
            this[name] = view;
        };
        /**
         * 填加视图到指定的层级
         * @param view
         * @param index
         * @待废弃
         */
        Container.prototype.addChildAtLayerIndex = function (view, index) {
            this.addChild(view, this._layers[index]);
        };
        /**
         * 填加子元素,同时会触发布局无效标识，如果需要在子类需写drawLayout方法
         * @param child
         */
        Container.prototype.addChild2 = function (child) {
            this.addChildAt2(child, this._numChildren + 1);
        };
        /**
         * 填加视图到容器内指定的索引位置 ，同时会触发布局无效标识，如果需要在子类需写drawLayout方法
         * @param child
         * @param index
         */
        Container.prototype.addChildAt2 = function (child, index) {
            var that = this;
            if (child.parent == that) {
                index = devil.MathUtil.clamb(0, that._numChildren <= 0 ? 0 : that._numChildren - 1, index);
                var tIndex = that._children.indexOf(child);
                if (tIndex != index) {
                    that._children.splice(tIndex, 1);
                    that._children.splice(index, 0, child);
                    this.$addChildAt(child, index);
                    that.invalidate(devil.InvalidationType.LAYOUT);
                }
            }
            else if (child.parent != that) {
                index = devil.MathUtil.clamb(0, that._numChildren, index);
                if (child.parent != null)
                    child.parent.removeChild(child, false);
                child.parent = that;
                if (index == that._numChildren) {
                    that._children[index] = child;
                    this.$addChildAt(child, index);
                }
                else {
                    that._children.splice(index, 0, child);
                    this.$addChildAt(child, index);
                }
                that._numChildren++;
                that.invalidate(devil.InvalidationType.LAYOUT);
            }
        };
        Container.prototype.$addChildAt = function (child, index) {
            if (this._layerID == devil.LayerID.EMPTY) {
                throw new Error(egret.getQualifiedClassName(this) + "未设置layerID值");
            }
            if (child.layerID == devil.LayerID.EMPTY) {
                throw new Error(child.name + "未设置layerID值");
            }
            var len = child.layers.length;
            if (len > this._layers.length) {
                throw new Error(egret.getQualifiedClassName(this) + "与" + child.name + "层不匹配");
            }
            // let layers:number[] = LayerID.getLayers();
            // let layerID:number;
            // for(let i:number = 0,m:number = 0,n:number = 0; i < layers.length; i ++)
            // {
            // 	layerID = layers[i];
            // 	if((this._layerID & layerID) == layerID)
            // 	{
            // 		if((child.layerID & layerID) == layerID)this._layers[m].addChildAt(child.layers[n++],index);
            // 		m++;
            // 	}
            // }
            this.treeLayerID(child, index, 0);
        };
        /**
         * 此处有个漏洞，this._layers[m].addChildAt(child.layers[n++],index)中的index可能不准
         * @param child
         * @param index
         * @param n
         */
        Container.prototype.treeLayerID = function (child, index, n) {
            var layers = devil.LayerID.getLayers();
            var layerID;
            for (var i = 0, m = 0; i < layers.length; i++) {
                layerID = layers[i];
                if ((this._layerID & layerID) == layerID) {
                    if ((child.layerID & layerID) == layerID)
                        this._layers[m].addChildAt(child.layers[n++], index);
                    m++;
                }
            }
            if (n < child.layers.length)
                this.treeLayerID(child, index, n);
        };
        /**
         * @inheritDoc
         */
        Container.prototype.unuse = function () {
            this.removeChildren();
            this._children.length = 0;
            _super_1.prototype.unuse.call(this);
        };
        /**
         * @inheritDoc
         */
        Container.prototype.dispose = function () {
            this.removeChildren();
            this._children.length = 0;
            this._children = null;
            _super_1.prototype.dispose.call(this);
        };
        return Container;
    }(devil.Component));
    devil.Container = Container;
})(devil || (devil = {}));
