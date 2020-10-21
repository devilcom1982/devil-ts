var devil;
(function (devil) {
    /**
     * 对象池管理器,类似cc.pool的方法，需要使用对象池管理的对象，需要实现reuse与unuse两个函数，reuse函数是从池中获得对象时使用，而unuse是对象放入池中时调用。
     * @author        devil
     * @version       V20181227
     * @create        2018-12-27
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ObjectPoolManager = /** @class */ (function () {
        function ObjectPoolManager() {
            this._objects = {};
            /**对象池单个类型数组最大数 */
            this.MAX_NUM = 99999;
        }
        /**
          * 通过对象池创建对象
          * @param cls   对象类型
          */
        ObjectPoolManager.prototype.create = function (cls) {
            var name = egret.getQualifiedClassName(cls);
            var pools = this._objects[name];
            if (pools == null) {
                pools = [];
                this._objects[name] = pools;
            }
            var instance;
            if (pools.length > 0) {
                instance = pools.shift();
                instance.reuse();
            }
            else
                instance = new cls();
            return instance;
        };
        /**
         * 创建不可以交互的sprite实例
         */
        ObjectPoolManager.prototype.createSprite = function () {
            var name = egret.getQualifiedClassName(egret.Sprite);
            var pools = this._objects[name];
            if (pools == null) {
                pools = [];
                this._objects[name] = pools;
            }
            var instance;
            if (pools.length > 0)
                instance = pools.shift();
            else {
                instance = new egret.Sprite();
                instance.touchChildren = false;
                instance.touchEnabled = false;
            }
            return instance;
        };
        /**
         * 回收Sprite实例进对象池
         * @param instance
         */
        ObjectPoolManager.prototype.pushSprite = function (instance) {
            if (instance == null)
                return;
            if (instance.parent)
                instance.parent.removeChild(instance);
            var name = egret.getQualifiedClassName(egret.Sprite);
            if (egret.getQualifiedClassName(instance) != name)
                devil.Manager.log.trace(devil.LogType.ERROR, "回收对象与实际方法不符", egret.getQualifiedClassName(instance));
            var pools = this._objects[name];
            if (pools != null && pools.length < this.MAX_NUM) {
                instance.removeChildren();
                instance.graphics.clear();
                instance.touchChildren = false;
                this.pushDisplayObject(instance);
                if (pools.indexOf(instance) == -1)
                    pools.push(instance);
            }
            else
                instance = null;
            //console.log(name,this._objects[name].length);
        };
        ObjectPoolManager.prototype.createShape = function () {
            var name = egret.getQualifiedClassName(egret.Shape);
            var pools = this._objects[name];
            if (pools == null) {
                pools = [];
                this._objects[name] = pools;
            }
            var instance;
            if (pools.length > 0)
                instance = pools.shift();
            else {
                instance = new egret.Shape();
                instance.touchEnabled = false;
            }
            return instance;
        };
        ObjectPoolManager.prototype.pushShape = function (instance) {
            if (instance == null)
                return;
            if (instance.parent)
                instance.parent.removeChild(instance);
            var name = egret.getQualifiedClassName(egret.Shape);
            if (egret.getQualifiedClassName(instance) != name)
                devil.Manager.log.trace(devil.LogType.ERROR, "回收对象与实际方法不符", egret.getQualifiedClassName(instance));
            var pools = this._objects[name];
            if (pools != null && pools.length < this.MAX_NUM) {
                instance.graphics.clear();
                this.pushDisplayObject(instance);
                if (pools.indexOf(instance) == -1)
                    pools.push(instance);
            }
            else
                instance = null;
            //console.log(name,this._objects[name].length);
        };
        ObjectPoolManager.prototype.createDisplayObjectContainer = function () {
            var name = egret.getQualifiedClassName(egret.DisplayObjectContainer);
            var pools = this._objects[name];
            if (pools == null) {
                pools = [];
                this._objects[name] = pools;
            }
            var instance;
            if (pools.length > 0)
                instance = pools.shift();
            else {
                instance = new egret.DisplayObjectContainer();
                instance.touchChildren = false;
                instance.touchEnabled = false;
            }
            return instance;
        };
        ObjectPoolManager.prototype.pushDisplayObjectContainer = function (instance) {
            if (instance == null)
                return;
            if (instance.parent)
                instance.parent.removeChild(instance);
            var name = egret.getQualifiedClassName(egret.DisplayObjectContainer);
            if (egret.getQualifiedClassName(instance) != name)
                devil.Manager.log.trace(devil.LogType.ERROR, "回收对象与实际方法不符", egret.getQualifiedClassName(instance));
            var pools = this._objects[name];
            if (pools != null && pools.length < this.MAX_NUM) {
                if (instance.numChildren > 0) {
                    // console.log("ObjectPoolManager.pushDisplayObjectContainer",instance.numChildren)
                    instance.removeChildren();
                }
                if (instance instanceof egret.Sprite)
                    instance.graphics.clear();
                instance.touchChildren = false;
                this.pushDisplayObject(instance);
                if (pools.indexOf(instance) == -1)
                    pools.push(instance);
            }
            else
                instance = null;
            //console.log(name,this._objects[name].length);
        };
        ObjectPoolManager.prototype.pushDisplayObject = function (instance) {
            instance.cacheAsBitmap = false;
            instance.touchEnabled = false;
            instance.x = 0;
            instance.y = 0;
            instance.scaleX = 1;
            instance.scaleY = 1;
            instance.rotation = 0;
            instance.visible = true;
            instance.alpha = 1;
            instance.mask = null;
            instance.blendMode = egret.BlendMode.NORMAL;
            instance.anchorOffsetX = 0;
            instance.anchorOffsetY = 0;
            instance.filters = null;
            instance.scrollRect = null;
            instance.width = NaN;
            instance.height = NaN;
        };
        /**
         * 回收对象
         * @param cls			对应的类
         * @param instance		回收的类实例
         */
        ObjectPoolManager.prototype.push = function (instance) {
            if (instance == null)
                return;
            var name = egret.getQualifiedClassName(instance);
            var pools = this._objects[name];
            if (pools != null && pools.length < this.MAX_NUM) {
                instance.unuse();
                if (pools.indexOf(instance) == -1)
                    pools.push(instance);
            }
            else {
                instance.dispose();
                instance = null;
            }
            //console.log(name,this._objects[name].length);
        };
        /**
         * 计算管理器内部的对象实例数，测试用
         */
        ObjectPoolManager.prototype.testCount = function () {
            for (var name_1 in this._objects) {
                if (this._objects[name_1].length > 0)
                    devil.Manager.log.trace(devil.LogType.DEBUG, name_1, this._objects[name_1].length);
            }
        };
        /**
         * 创建位图
         */
        ObjectPoolManager.prototype.createBitmap = function () {
            var name = egret.getQualifiedClassName(egret.Bitmap);
            var pools = this._objects[name];
            if (pools == null) {
                pools = [];
                this._objects[name] = pools;
            }
            var instance;
            if (pools.length > 0)
                instance = pools.shift();
            else {
                instance = new egret.Bitmap();
                instance.touchEnabled = false;
            }
            return instance;
        };
        ObjectPoolManager.prototype.pushBitmap = function (instance) {
            if (instance == null)
                return;
            if (instance.parent)
                instance.parent.removeChild(instance);
            instance.texture = null;
            var name = egret.getQualifiedClassName(egret.Bitmap);
            if (egret.getQualifiedClassName(instance) != name)
                devil.Manager.log.trace(devil.LogType.ERROR, "回收对象与实际方法不符", egret.getQualifiedClassName(instance));
            var pools = this._objects[name];
            if (pools != null && pools.length < this.MAX_NUM) {
                instance.scale9Grid = null;
                instance.smoothing = true;
                instance.fillMode = egret.BitmapFillMode.SCALE;
                instance.pixelHitTest = false;
                this.pushDisplayObject(instance);
                if (pools.indexOf(instance) == -1)
                    pools.push(instance);
            }
            else
                instance = null;
            //console.log(name,this._objects[name].length);
        };
        /**
         * 创建文本
         */
        ObjectPoolManager.prototype.createTextField = function () {
            var name = egret.getQualifiedClassName(egret.TextField);
            var pools = this._objects[name];
            if (pools == null) {
                pools = [];
                this._objects[name] = pools;
            }
            var instance;
            if (pools.length > 0)
                instance = pools.shift();
            else {
                instance = new egret.TextField();
                instance.touchEnabled = false;
            }
            return instance;
        };
        /**
         * 回收TextField实例进对象池
         * @param instance
         */
        ObjectPoolManager.prototype.pushTextField = function (instance) {
            if (instance == null)
                return;
            if (instance.parent != null)
                instance.parent.removeChild(instance);
            var name = egret.getQualifiedClassName(egret.TextField);
            if (egret.getQualifiedClassName(instance) != name)
                devil.Manager.log.trace(devil.LogType.ERROR, "回收对象与实际方法不符", egret.getQualifiedClassName(instance));
            var pools = this._objects[name];
            if (pools != null && pools.length < this.MAX_NUM) {
                instance.text = "";
                this.pushDisplayObject(instance);
                instance.$TextField = {
                    0: egret.TextField.default_size,
                    1: 0,
                    2: egret.TextField.default_textColor,
                    3: NaN,
                    4: NaN,
                    5: 0,
                    6: 0,
                    7: 0,
                    8: egret.TextField.default_fontFamily,
                    9: "left",
                    10: "top",
                    11: "#ffffff",
                    12: "",
                    13: "",
                    14: [],
                    15: false,
                    16: false,
                    17: true,
                    18: false,
                    19: false,
                    20: false,
                    21: 0,
                    22: 0,
                    23: 0,
                    24: egret.TextFieldType.DYNAMIC,
                    25: 0x000000,
                    26: "#000000",
                    27: 0,
                    28: -1,
                    29: 0,
                    30: false,
                    31: false,
                    32: 0x000000,
                    33: false,
                    34: 0xffffff,
                    35: null,
                    36: null,
                    37: egret.TextFieldInputType.TEXT,
                    38: false //textLinesChangedForNativeRender
                };
                if (pools.indexOf(instance) == -1)
                    pools.push(instance);
            }
            else
                instance = null;
            //console.log(name,this._objects[name].length);
        };
        /**
         * 创建贴图
         */
        ObjectPoolManager.prototype.createTexture = function () {
            var name = egret.getQualifiedClassName(egret.Texture);
            var pools = this._objects[name];
            if (pools == null) {
                pools = [];
                this._objects[name] = pools;
            }
            var instance;
            if (pools.length > 0)
                instance = pools.shift();
            else
                instance = new egret.Texture();
            return instance;
        };
        /**
         * 回收贴图
         */
        ObjectPoolManager.prototype.pushTexture = function (instance) {
            if (instance == null)
                return;
            instance.dispose();
            instance["scale9Grid"] = null;
            instance.disposeBitmapData = true;
            var name = egret.getQualifiedClassName(egret.Texture);
            if (egret.getQualifiedClassName(instance) != name)
                devil.Manager.log.trace(devil.LogType.ERROR, "回收对象与实际方法不符", egret.getQualifiedClassName(instance));
            var pools = this._objects[name];
            if (pools != null && pools.length < this.MAX_NUM) {
                if (pools.indexOf(instance) == -1)
                    pools.push(instance);
            }
            else
                instance = null;
            //console.log(name,this._objects[name].length);
        };
        ObjectPoolManager.prototype.createHttpRequest = function () {
            var name = egret.getQualifiedClassName(egret.HttpRequest);
            var pools = this._objects[name];
            if (pools == null) {
                pools = [];
                this._objects[name] = pools;
            }
            var instance;
            if (pools.length > 0)
                instance = pools.shift();
            else
                instance = new egret.HttpRequest();
            return instance;
        };
        ObjectPoolManager.prototype.pushHttpRequest = function (instance) {
            if (instance == null)
                return;
            var name = egret.getQualifiedClassName(egret.HttpRequest);
            var pools = this._objects[name];
            if (pools != null && pools.length < this.MAX_NUM) {
                if (pools.indexOf(instance) == -1)
                    pools.push(instance);
            }
            else
                instance = null;
            //console.log(name,this._objects[name].length);
        };
        ObjectPoolManager.prototype.createImageLoader = function () {
            var name = egret.getQualifiedClassName(egret.ImageLoader);
            var pools = this._objects[name];
            if (pools == null) {
                pools = [];
                this._objects[name] = pools;
            }
            var instance;
            if (pools.length > 0)
                instance = pools.shift();
            else
                instance = new egret.ImageLoader();
            return instance;
        };
        ObjectPoolManager.prototype.pushImageLoader = function (instance) {
            if (instance == null)
                return;
            var name = egret.getQualifiedClassName(egret.ImageLoader);
            var pools = this._objects[name];
            if (pools != null && pools.length < this.MAX_NUM) {
                if (pools.indexOf(instance) == -1)
                    pools.push(instance);
            }
            else
                instance = null;
            //console.log(name,this._objects[name].length);
        };
        ObjectPoolManager.prototype.createByteArray = function () {
            var name = egret.getQualifiedClassName(egret.ByteArray);
            var pools = this._objects[name];
            if (pools == null) {
                pools = [];
                this._objects[name] = pools;
            }
            var instance;
            if (pools.length > 0)
                instance = pools.shift();
            else
                instance = new egret.ByteArray();
            return instance;
        };
        ObjectPoolManager.prototype.pushByteArray = function (instance) {
            if (instance == null)
                return;
            var name = egret.getQualifiedClassName(egret.ByteArray);
            var pools = this._objects[name];
            instance.endian = egret.Endian.BIG_ENDIAN;
            instance.clear();
            if (pools != null && pools.length < this.MAX_NUM) {
                if (pools.indexOf(instance) == -1)
                    pools.push(instance);
            }
            else
                instance = null;
            //console.log(name,this._objects[name].length);
        };
        return ObjectPoolManager;
    }());
    devil.ObjectPoolManager = ObjectPoolManager;
})(devil || (devil = {}));
