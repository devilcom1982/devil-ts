var devil;
(function (devil) {
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
    var View = /** @class */ (function () {
        function View() {
            this._x = 0;
            this._y = 0;
            this._layers = [];
            this.initLayer();
            this.start();
            this.$addEvent();
        }
        Object.defineProperty(View.prototype, "touchChildren", {
            get: function () {
                return this._layers[0].touchChildren;
            },
            set: function (value) {
                this._layers[0].touchChildren = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "touchEnabled", {
            get: function () {
                return this._layers[0].touchEnabled;
            },
            set: function (value) {
                this._layers[0].touchEnabled = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "scaleX", {
            get: function () {
                return this._layers[0].scaleX;
            },
            set: function (value) {
                var len = this._layers.length;
                for (var i = 0; i < len; i++) {
                    this._layers[i].scaleX = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "scaleY", {
            get: function () {
                return this._layers[0].scaleY;
            },
            set: function (value) {
                var len = this._layers.length;
                for (var i = 0; i < len; i++) {
                    this._layers[i].scaleY = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "rotation", {
            get: function () {
                return this._layers[0].rotation;
            },
            set: function (value) {
                var len = this._layers.length;
                for (var i = 0; i < len; i++) {
                    this._layers[i].rotation = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "visible", {
            get: function () {
                return this._layers[0].visible;
            },
            set: function (value) {
                var len = this._layers.length;
                for (var i = 0; i < len; i++) {
                    this._layers[i].visible = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "alpha", {
            get: function () {
                return this._layers[0].alpha;
            },
            set: function (value) {
                var len = this._layers.length;
                for (var i = 0; i < len; i++) {
                    this._layers[i].alpha = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this.move(value, this._y);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this.move(this._x, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "layers", {
            get: function () {
                return this._layers;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this.setSize(value, this._height);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this.setSize(this._width, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "anchorX", {
            /**
             * X方向锚点，默认值为0，宽度值
             */
            get: function () {
                return this._anchorX;
            },
            set: function (value) {
                this.setAnchor(value, this._anchorY);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "anchorY", {
            /**
             * Y方向锚点，默认值为0，高度值
             */
            get: function () {
                return this._anchorY;
            },
            set: function (value) {
                this.setAnchor(this._anchorX, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            /**
             * 设置父类
             */
            set: function (value) {
                this._parent = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "name", {
            get: function () {
                return this._name;
            },
            /**
             * 实例名
             */
            set: function (value) {
                this._name = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "layerID", {
            get: function () {
                return this._layerID;
            },
            /**
             * 层ID，用于生成所在的贴图,一个id生成一个贴图
             */
            set: function (value) {
                this._layerID = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 可交互状态
         */
        View.prototype.setEnabled = function (value) {
            if (this._enabled != value) {
                this._enabled = value;
                if (!this._enabled) {
                    this.touchChildren = false;
                    this.touchEnabled = false;
                }
            }
        };
        View.prototype.getEnabled = function () {
            return this._enabled;
        };
        Object.defineProperty(View.prototype, "filters", {
            set: function (value) {
                var len = this._layers.length;
                for (var i = 0; i < len; i++) {
                    this._layers[i].filters = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "measuredHeight", {
            get: function () {
                var result = 0;
                for (var i = 0; i < this._layers.length; i++) {
                    result = Math.max(result, this._layers[i].measuredHeight);
                }
                return result;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "measuredWidth", {
            get: function () {
                var result = 0;
                for (var i = 0; i < this._layers.length; i++) {
                    result = Math.max(result, this._layers[i].measuredWidth);
                }
                return result;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "right", {
            get: function () {
                return this._x + this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "bottom", {
            get: function () {
                return this._y + this._height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "mask", {
            set: function (value) {
                for (var i = 0; i < this._layers.length; i++) {
                    this._layers[i].mask = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 子类一定要重写
         */
        View.prototype.initLayer = function () {
        };
        View.prototype.createLayer = function () {
            var result = devil.Manager.pool.createDisplayObjectContainer();
            result.x = !!this._x ? this._x : 0;
            result.y = !!this._y ? this._y : 0;
            this._layers.push(result);
            return result;
        };
        /**
         * 初始化变量
         */
        View.prototype.start = function () {
            this._anchorX = 0;
            this._anchorY = 0;
            this._x = 0;
            this._y = 0;
            this._enabled = true;
            this._name = "";
            this._isPool = true;
            this._invalid = devil.InvalidationType.ALL;
        };
        View.prototype.$addEvent = function () {
            if (this._layers.length <= 0)
                return;
            this._layers[0].addEventListener(egret.Event.ADDED_TO_STAGE, this.__addToStage, this);
            this._layers[0].addEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removedFromStage, this);
            if (this._layers[0].stage)
                this.__addToStage(null);
        };
        View.prototype.$removeEvent = function () {
            this._layers[0].removeEventListener(egret.Event.ADDED_TO_STAGE, this.__addToStage, this);
            this._layers[0].removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removedFromStage, this);
        };
        /**
         * 移动位置
         */
        View.prototype.move = function (x, y) {
            if (this._x == x && this._y == y)
                return;
            this._x = x;
            this._y = y;
            this.updatePosition();
        };
        /**
         * 设置锚点，介于0到1间
         * @param anchorX
         * @param anchorY
         */
        View.prototype.setAnchor = function (anchorX, anchorY) {
            anchorX = devil.MathUtil.clamb(0, 1, anchorX);
            anchorY = devil.MathUtil.clamb(0, 1, anchorY);
            if (this._anchorX == anchorX && this._anchorY == anchorY)
                return;
            this._anchorX = anchorX;
            this._anchorY = anchorY;
            this.updatePosition();
        };
        /**
         * 设置长宽，下一帧重会时更新长宽
         */
        View.prototype.setSize = function (width, height) {
            if (this._width == width && this._height == height)
                return;
            this._width = width;
            this._height = height;
            this.updatePosition();
            this.invalidate(devil.InvalidationType.SIZE);
        };
        /**
         * 在未另外指定的情况下，将属性标记为无效，并在下一帧上重绘组件。
         * @param property   要使其无效的属性
         */
        View.prototype.invalidate = function (property) {
            this._invalid = this._invalid | property;
            this.startCallLater();
        };
        /**
         * Included the first property as a proper param to enable *some* type checking, and also because it is a required param.
         * @param property
         * @param properties
         * @return
         */
        View.prototype.isInvalid = function (property) {
            var properties = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                properties[_i - 1] = arguments[_i];
            }
            if ((this._invalid & property) == property) {
                return true;
            }
            while (properties.length > 0) {
                property = properties.pop();
                if ((this._invalid & property) == property) {
                    return true;
                }
            }
            return false;
        };
        View.prototype.validate = function () {
            this._invalid = devil.InvalidationType.EMPTY;
        };
        /**
         * 强制重绘
         */
        View.prototype.repaint = function () {
            this.draw();
            this.validate();
            devil.Manager.render.remove(this.repaint, this);
        };
        /**
         * 绘制方法,子类重写
         */
        View.prototype.draw = function () {
        };
        /**
         * 更改位置
         */
        View.prototype.updatePosition = function () {
            var len = this._layers.length;
            var x = this._x - this._width * this._anchorX;
            var y = this._y - this._height * this._anchorY;
            for (var i = 0; i < len; i++) {
                this._layers[i].x = x;
                this._layers[i].y = y;
            }
        };
        View.prototype.startCallLater = function () {
            if (this._layers[0] && this._layers[0].stage)
                devil.Manager.render.add(this.repaint, this);
        };
        View.prototype.removeFromParent = function () {
            var len = this._layers.length;
            for (var i = 0; i < len; i++) {
                devil.ObjectUtil.removeFromParent(this._layers[i]);
            }
            this.parent = null;
        };
        View.prototype.localToGlobal = function (localX, localY) {
            return this._layers[0].localToGlobal(localX, localY);
        };
        View.prototype.unuse = function () {
            this._x = 0;
            this._y = 0;
            this.$removeEvent();
            devil.Manager.render.remove(this.repaint, this);
            if (this._parent != null) {
                this._parent.removeChild(this, false);
                this._parent = null;
            }
            var len = this._layers.length;
            for (var i = 0; i < len; i++) {
                devil.Manager.pool.pushDisplayObjectContainer(this._layers[i]);
            }
            this._layers.length = 0;
        };
        View.prototype.reuse = function () {
            this.initLayer();
            this.start();
            this.$addEvent();
        };
        /**
         * 回收
         */
        View.prototype.pool = function () {
            if (this._isPool)
                devil.Manager.pool.push(this);
            else
                this.dispose();
        };
        View.prototype.dispose = function () {
            this.$removeEvent();
            devil.Manager.render.remove(this.repaint, this);
            if (this._parent != null) {
                this._parent.removeChild(this, false);
                this._parent = null;
            }
            var len = this._layers.length;
            for (var i = 0; i < len; i++) {
                devil.Manager.pool.pushDisplayObjectContainer(this._layers[i]);
            }
            this._layers.length = 0;
            this._layers = null;
        };
        View.prototype.addToStage = function () {
        };
        View.prototype.removeFromStage = function () {
        };
        /**
         * 自动生成层
         * @param count	数量
         */
        View.prototype.autoCreateLayer = function (count) {
            for (var i = 0; i < count; i++) {
                this.createLayer();
            }
            this.$addEvent();
        };
        View.prototype.__addToStage = function (e) {
            this.startCallLater();
            this.addToStage();
        };
        View.prototype.__removedFromStage = function (e) {
            devil.Manager.render.remove(this.repaint, this);
            this.removeFromStage();
        };
        /**
         * 对象池创建,并且只能使用此方法创建对象比较好
         * @param cls    View或继承View的子类
         * @param layer	  层
         */
        View.create = function (cls) {
            return devil.Manager.pool.create(cls);
        };
        return View;
    }());
    devil.View = View;
})(devil || (devil = {}));
