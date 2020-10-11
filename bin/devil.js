var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
     * 自定义动画数据
     * @author anydo
     * @version V20180811
     * @create 2018-03-01
     * @place guangzhou
     * @update devil 整理 2018-08-11
     */
    var AnimationData = /** @class */ (function () {
        function AnimationData() {
            this.start();
        }
        AnimationData.prototype.start = function () {
            this._frameJsons = [];
            this._frames = {};
        };
        AnimationData.prototype.parseJson = function (json) {
            if (json == null)
                return;
            var key;
            for (key in json.mc)
                break;
            var offsetArr = json.mc[key].frames;
            this.totalFrames = offsetArr.length;
            var frameName;
            var offX;
            var offY;
            var rectObj;
            var oneJson;
            for (var i = 0; i < this.totalFrames; i++) {
                frameName = offsetArr[i].res;
                offX = offsetArr[i].x;
                offY = offsetArr[i].y;
                rectObj = json.res[frameName];
                oneJson = devil.AnimationFrameJson.create(frameName, offX, offY, rectObj);
                this._frameJsons.push(oneJson);
            }
        };
        AnimationData.prototype.getKeyFrameData = function (frame) {
            if (this._frames[frame] == null) {
                this.createFrameData(frame);
            }
            return this._frames[frame];
        };
        AnimationData.prototype.createFrameData = function (frame) {
            var frameJson = this._frameJsons[frame - 1];
            var rectObj = frameJson ? frameJson.rectObj : { x: 0, y: 0, w: 1, h: 1 };
            var texture = devil.Manager.pool.createTexture();
            texture.bitmapData = this._texture.bitmapData;
            texture.disposeBitmapData = false;
            texture.$initData(rectObj.x, rectObj.y, rectObj.w, rectObj.h, 0, 0, rectObj.w, rectObj.h, this._texture.bitmapData.width, this._texture.bitmapData.height);
            this._frames[frame] = devil.AnimationFrameData.create(frameJson ? frameJson.offX : 0, frameJson ? frameJson.offY : 0, texture);
        };
        AnimationData.prototype.reuse = function () {
            this.start();
        };
        AnimationData.prototype.unuse = function () {
            var len = this._frameJsons.length;
            for (var i = 0; i < len; i++) {
                this._frameJsons[i].pool();
            }
            this._frameJsons = null;
            for (var frame in this._frames) {
                this._frames[frame].pool();
                delete this._frames[frame];
            }
            this._frames = null;
            this.totalFrames = 0;
            if (this._texture) {
                // this._texture.dispose();
                devil.Manager.pool.pushTexture(this._texture);
                this._texture = null;
            }
        };
        AnimationData.prototype.pool = function () {
            devil.Manager.pool.push(this);
        };
        AnimationData.prototype.dispose = function () {
            this.unuse();
        };
        AnimationData.create = function (bitmapData, json) {
            var texture = devil.Manager.pool.createTexture();
            texture.bitmapData = bitmapData;
            var result = devil.Manager.pool.create(AnimationData);
            result._texture = texture;
            result.parseJson(json);
            return result;
        };
        return AnimationData;
    }());
    devil.AnimationData = AnimationData;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 自定义动画数据
     * @author anydo
     * @version V20180811
     * @create 2018-03-01
     * @place guangzhou
     * @update devil 整理 2018-08-11
     */
    var AnimationFrameData = /** @class */ (function () {
        function AnimationFrameData() {
        }
        AnimationFrameData.prototype.pool = function () {
            devil.Manager.pool.push(this);
        };
        AnimationFrameData.prototype.reuse = function () {
        };
        AnimationFrameData.prototype.unuse = function () {
            this.offX = 0;
            this.offY = 0;
            devil.Manager.pool.pushTexture(this.texture);
            this.texture = null;
        };
        AnimationFrameData.prototype.dispose = function () {
            this.unuse();
        };
        AnimationFrameData.create = function (offX, offY, texture) {
            var result = devil.Manager.pool.create(AnimationFrameData);
            result.offX = offX;
            result.offY = offY;
            result.texture = texture;
            return result;
        };
        return AnimationFrameData;
    }());
    devil.AnimationFrameData = AnimationFrameData;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 自定义动画数据
     * @author anydo
     * @version V20180811
     * @create 2018-03-01
     * @place guangzhou
     * @update devil 整理 2018-08-11
     */
    var AnimationFrameJson = /** @class */ (function () {
        function AnimationFrameJson() {
        }
        AnimationFrameJson.prototype.reuse = function () {
        };
        AnimationFrameJson.prototype.unuse = function () {
            this.offX = 0;
            this.offY = 0;
            this.frameName = "";
            this.rectObj = null;
        };
        AnimationFrameJson.prototype.pool = function () {
            return devil.Manager.pool.push(this);
        };
        AnimationFrameJson.prototype.dispose = function () {
            this.unuse();
        };
        AnimationFrameJson.create = function (frameName, offX, offY, rectObj) {
            var result = devil.Manager.pool.create(AnimationFrameJson);
            result.frameName = frameName;
            result.offX = offX;
            result.offY = offY;
            result.rectObj = rectObj;
            return result;
        };
        return AnimationFrameJson;
    }());
    devil.AnimationFrameJson = AnimationFrameJson;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * MC帧动画
     * @author  devil
     * @version V20190909
     * @create  2019-09-09
     * @place   guangzhou
     */
    var MovieClipAnimation = /** @class */ (function (_super_1) {
        __extends(MovieClipAnimation, _super_1);
        function MovieClipAnimation() {
            return _super_1.call(this) || this;
        }
        Object.defineProperty(MovieClipAnimation.prototype, "path", {
            set: function (value) {
                if (this._path == value)
                    return;
                this.clear();
                this._path = value;
                if (this._path != null) {
                    var index = value.key.lastIndexOf("/");
                    this._source = value.key.slice(index + 1, value.key.length - 8);
                    // let factory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(this.data, this.texture);
                    // if(factory.getTextureAtlasData(this._source) && factory.getDragonBonesData(this._source)) this.createDisplay();//已有数据，则直接创建
                    // else this.loadData();//还没有数据，先加载数据
                    this.loadData();
                }
            },
            enumerable: false,
            configurable: true
        });
        MovieClipAnimation.prototype.initLayer = function () {
            this._layer = this.createLayer();
        };
        MovieClipAnimation.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._playTimes = 0;
            this._isPool = false;
        };
        MovieClipAnimation.prototype.loadData = function () {
            devil.Manager.loader.load(this._path, this.___complete, this, devil.ResourceGCType.NEVER);
        };
        MovieClipAnimation.prototype.clear = function () {
            if (!devil.StringUtil.isEmpty(this._source)) {
                devil.Manager.loader.remove(this._path, this.___complete, this);
            }
            if (this._display) {
                this._display.removeEventListener(dragonBones.EventObject.COMPLETE, this.___playComplete, this);
                this._display.parent.removeChild(this._display);
                this._display = null;
            }
        };
        MovieClipAnimation.prototype.addToStage = function () {
            this.play(this._playTimes);
        };
        MovieClipAnimation.prototype.removeFromStage = function () {
            this.stop();
        };
        /**
         * - 播放指定动画。
         * @param playTimes - 循环播放次数。默认值为0 [0: 无限循环播放, [1~N]: 循环播放 N 次]
        */
        MovieClipAnimation.prototype.play = function (playTimes) {
            if (this._display != null)
                this._display.play(playTimes);
        };
        /**
         * 停止动画播放
         * @see dragonBones.AnimationState
         * @version DragonBones 3.0
         * @language zh_CN
         */
        MovieClipAnimation.prototype.stop = function () {
            if (this._display != null)
                this._display.stop();
        };
        MovieClipAnimation.prototype.unuse = function () {
            this.clear();
            this._layer = null;
            this._path = null;
            this._action = undefined;
            if (this._playComplete)
                this._playComplete.pool();
            this._playComplete = null;
            _super_1.prototype.unuse.call(this);
        };
        MovieClipAnimation.prototype.dispose = function () {
            this.clear();
            this._layer = null;
            this._path = null;
            if (this._playComplete)
                this._playComplete.pool();
            this._playComplete = null;
            _super_1.prototype.dispose.call(this);
        };
        MovieClipAnimation.prototype.___complete = function (loader) {
            //添加保存数据
            //创建动画
            this._data = loader.data;
            this._display = new egret.MovieClip(this._data.generateMovieClipData(this._source));
            this._display.addEventListener(egret.Event.COMPLETE, this.___playComplete, this);
            this._layer.addChild(this._display);
            if (this._layer.stage)
                this.play(this._playTimes);
        };
        MovieClipAnimation.prototype.__playComplete = function (callBack, target) {
            this._playComplete = devil.CallBackInfo.create(callBack, target);
        };
        MovieClipAnimation.prototype.___playComplete = function (e) {
            if (this._playComplete != null)
                this._playComplete.runCallBack();
        };
        return MovieClipAnimation;
    }(devil.View));
    devil.MovieClipAnimation = MovieClipAnimation;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 按钮状态
     * @author        devil
     * @version       V20190211
     * @create        2019-02-11
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ButtonState;
    (function (ButtonState) {
        ButtonState[ButtonState["UP"] = 0] = "UP";
        ButtonState[ButtonState["DOWN"] = 1] = "DOWN";
        ButtonState[ButtonState["SELECTED"] = 2] = "SELECTED";
        ButtonState[ButtonState["DISANABLED"] = 3] = "DISANABLED";
    })(ButtonState = devil.ButtonState || (devil.ButtonState = {}));
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 颜色常量值
     * @author        devil
     * @version       V20190221
     * @create        2019-02-21
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var Color = /** @class */ (function () {
        function Color() {
        }
        /**
         * 黑色
         */
        Color.BLACK = 0x000000;
        /**
         * 白色
         */
        Color.WHITE = 0xffffff;
        /**
         * 红色
         */
        Color.RED = 0xff0000;
        /**
         * 绿色
         */
        Color.GREEN = 0x00ff00;
        /**
         * 蓝色
         */
        Color.BLUE = 0x0000ff;
        return Color;
    }());
    devil.Color = Color;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 组件默认长宽
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ComponentDefault = /** @class */ (function () {
        function ComponentDefault() {
        }
        /**
         * 容器的默认宽度
         */
        ComponentDefault.CONTAINER_WIDTH = 100;
        /**
         * 容器的默认高度
         */
        ComponentDefault.CONTAINER_HEIGHT = 100;
        /**
         * 画布的默认宽度
         */
        ComponentDefault.CANVAS_WIDTH = 720;
        /**
         * 画布的默认高度
         */
        ComponentDefault.CANVAS_HEIGHT = 1280;
        /**
         * 文本的默认宽度
         */
        ComponentDefault.TEXT_WIDTH = 100;
        /**
         * 文本的默认高度
         */
        ComponentDefault.TEXT_HEIGHT = 20;
        /**
         * 按钮的默认宽度
         */
        ComponentDefault.BUTTON_WIDTH = 100;
        /**
         * 按钮的默认高度
         */
        ComponentDefault.BUTTON_HEIGHT = 20;
        /**
         * 菜单栏默认宽度
         */
        ComponentDefault.MENU_WIDTH = 100;
        /**
         * 菜单栏默认高度
         */
        ComponentDefault.MENU_HEIGHT = 25;
        /**
         * 复选框按钮默认宽度
         */
        ComponentDefault.CHECK_BOX_WIDTH = 13;
        /**
         * 复选框按钮默认高度
         */
        ComponentDefault.CHECK_BOX_HEIGHT = 13;
        /**
         * 单选框按钮默认宽度
         */
        ComponentDefault.RADIO_BUTTON_WIDTH = 17;
        /**
         * 单选框按钮默认高度
         */
        ComponentDefault.RADIO_BUTTON_HEIGHT = 17;
        /**
         * 远程图片默认宽度
         */
        ComponentDefault.IMAGE_REMOTE_WIDTH = 100;
        /**
         * 远程图片默认高度
         */
        ComponentDefault.IMAGE_REMOTE_HEIGHT = 100;
        /**
         * 滚动条宽度
         */
        ComponentDefault.SCROLL_BAR_WIDTH = 11;
        /**
         * 滚动条高度
         */
        ComponentDefault.SCROLL_BAR_HEIGHT = 100;
        return ComponentDefault;
    }());
    devil.ComponentDefault = ComponentDefault;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 组件类型常量
     * @author        devil
     * @version       V20190626
     * @create        2018-12-28
     * @update 	      devil 2018-10-06 整理
     * @update        devil 2019-06-26 同步ActionScript类库
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ComponentType = /** @class */ (function () {
        function ComponentType() {
        }
        /**
         * 画布
         */
        ComponentType.CANVAS = 1;
        /**
         * 容器
         */
        ComponentType.CONTAINER = 2;
        /**
         * 面板容器
         */
        ComponentType.PANEL_CONTAINER = 3;
        /**
         * 文本
         */
        ComponentType.TEXT = 4;
        /**
         * 图片
         */
        ComponentType.IMAGE = 5;
        /**
         * 图片按钮
         */
        ComponentType.BUTTON_IMAGE = 6;
        /**
         * 图标按钮
         */
        ComponentType.BUTTON_ICON = 7;
        /**
         * 文本按钮
         */
        ComponentType.BUTTON_TXT = 8;
        /**
         * 图片选择按钮
         */
        ComponentType.BUTTON_IMAGE_SELECTED = 9;
        /**
         * 图标选择按钮
         */
        ComponentType.BUTTON_ICON_SELECTED = 10;
        /**
         * 文本选择按钮
         */
        ComponentType.BUTTON_TEXT_SELECTED = 11;
        /**
         * 文本图标选择按钮
         */
        ComponentType.BUTTON_SELECTED = 12;
        /**
         * 复选框按钮
         */
        ComponentType.CHECK_BOX = 13;
        /**
         * 单选框按钮
         */
        ComponentType.RADIO_BUTTON = 14;
        /**
         * 滚动条
         */
        ComponentType.SCROLL_BAR = 15;
        /**
         * 下拉列表
         */
        ComponentType.COMBOBOX = 16;
        /**
         * 输入框
         */
        ComponentType.TEXT_INPUT = 17;
        /**
         * 文本框
         */
        ComponentType.TEXT_AREA = 18;
        /**
         * 远程加载图片
         */
        ComponentType.IMAGE_REMOTE = 19;
        /**
         * TAB组件
         */
        ComponentType.TAB = 20;
        /**
         * 列表
         */
        ComponentType.LIST = 21;
        /**
         * 面板
         */
        ComponentType.PANEL = 22;
        /**
         * 菜单栏
         */
        ComponentType.MENU_BAR = 23;
        /**
         * 菜单子项
         */
        ComponentType.MENU_ITEM = 24;
        /**
         *  菜单孙子项
         */
        ComponentType.MENU_SUB_ITEM = 25;
        /**
         * 菜单主按钮
         */
        ComponentType.MENU_ITEM_BUTTON_TEXT = 26;
        /**
         * 菜单栏孙项按钮组件
         */
        ComponentType.MENU_SUB_ITEM_BUTTON_TEXT = 27;
        /**
         * tree
         */
        ComponentType.TREE = 28;
        /**
         * TabButton
         */
        ComponentType.TAB_BUTTON = 29;
        ComponentType.SLIDER = 30;
        /**
         * 复选框按钮2
         */
        ComponentType.CHECK_BOX1 = 31;
        return ComponentType;
    }());
    devil.ComponentType = ComponentType;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 方向常量值
     * @author        devil
     * @version       V20200218
     * @create        2020-02-18
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var Direction = /** @class */ (function () {
        function Direction() {
        }
        /**
         * params:分为0，1，2,默认值为0
         * 0返回(up,down,left,right)
         * 1返回(left_up,left_down,right_up,right_down)
         * 2返回八个方向
         */
        Direction.getDirections = function (param) {
            if (param === void 0) { param = 0; }
            if (param == 0)
                return [this.LEFT, this.RIGHT, this.UP, this.DOWM];
            else if (param == 1)
                return [this.LEFT_DOWN, this.LEFT_UP, this.RIGHT_DOWN, this.RIGHT_UP];
            else
                return [this.LEFT, this.RIGHT, this.UP, this.DOWM, this.LEFT_DOWN, this.LEFT_UP, this.RIGHT_DOWN, this.RIGHT_UP];
        };
        Direction.getRotation = function (direction) {
            var rotation = 0;
            switch (direction) {
                case Direction.UP:
                    rotation = -90;
                    break;
                case Direction.DOWM:
                    rotation = 90;
                    break;
                case Direction.LEFT:
                    rotation = 180;
                    break;
                case Direction.RIGHT:
                    rotation = 0;
                    break;
                case Direction.LEFT_UP:
                    rotation = -135;
                    break;
                case Direction.LEFT_DOWN:
                    rotation = 135;
                    break;
                case Direction.RIGHT_UP:
                    rotation = -45;
                    break;
                case Direction.RIGHT_DOWN:
                    rotation = 45;
                    break;
            }
            return rotation;
        };
        Direction.UP = 0;
        Direction.DOWM = 1;
        Direction.LEFT = 2;
        Direction.RIGHT = 3;
        Direction.LEFT_UP = 4;
        Direction.LEFT_DOWN = 5;
        Direction.RIGHT_UP = 6;
        Direction.RIGHT_DOWN = 7;
        return Direction;
    }());
    devil.Direction = Direction;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 文件后缀名常量,带有下划线的带有后缀“.”。例如MP3_表示.mp3
     * @author devil
     * @version V20180807
     * @create 20180807
     * @place guangzhou
     */
    var Extension = /** @class */ (function () {
        function Extension() {
        }
        Extension.PNG = "png";
        Extension.JPG = "jpg";
        Extension.MP3 = "mp3";
        Extension.TXT = "txt";
        Extension.JSON = "json";
        Extension.PNG_ = ".png";
        Extension.JPG_ = ".jpg";
        Extension.MP3_ = ".mp3";
        Extension.TXT_ = ".txt";
        Extension.JSON_ = ".json";
        return Extension;
    }());
    devil.Extension = Extension;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 角色常用动作常量
     * @author        devil
     * @version       V20200817
     * @create        2020-08-17
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var FigureAction = /** @class */ (function () {
        function FigureAction() {
        }
        FigureAction.getWrapMode = function (name) {
            switch (name) {
                case FigureAction.STAND:
                case FigureAction.WALK:
                case FigureAction.SIT:
                    return devil.WrapMode.LOOP;
                case FigureAction.ATTACK1:
                case FigureAction.ATTACK2:
                case FigureAction.ATTACK3:
                case FigureAction.DEAD:
                case FigureAction.JUMP:
                case FigureAction.HITED:
                    return devil.WrapMode.ONCE;
            }
            return devil.WrapMode.ONCE;
        };
        FigureAction.isAttackAction = function (name) {
            return name.indexOf("attack") != -1;
        };
        FigureAction.STAND = "stand";
        FigureAction.WALK = "walk";
        FigureAction.JUMP = "jump";
        FigureAction.DEAD = "dead";
        FigureAction.HITED = "hited";
        FigureAction.ATTACK1 = "attack1";
        FigureAction.ATTACK2 = "attack2";
        FigureAction.ATTACK3 = "attack3";
        FigureAction.SIT = "sit";
        return FigureAction;
    }());
    devil.FigureAction = FigureAction;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 字体名常量
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    var FontName = /** @class */ (function () {
        function FontName() {
        }
        /**
         * 微软雅黑
         */
        FontName.MICROSOFT_YA_HEI = "Microsoft YaHei";
        return FontName;
    }());
    devil.FontName = FontName;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 游戏开关
     * @author        devil
     * @version       V20201008
     * @create        2020-10-08
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var GameCtrl = /** @class */ (function () {
        function GameCtrl() {
        }
        GameCtrl.NEI_LIAN = "neilian";
        return GameCtrl;
    }());
    devil.GameCtrl = GameCtrl;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 游戏ID
     * @author        devil
     * @version       V20201008
     * @create        2020-10-08
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var GameID = /** @class */ (function () {
        function GameID() {
        }
        //魔法之触
        GameID.MAGIC_TOUCH = 1;
        //指尖冲刺
        GameID.JUMP = 2;
        //星际摩托
        GameID.MOTO = 3;
        //迷路的小球
        GameID.PUZZLE = 4;
        //色感大测试
        GameID.COLOR = 6;
        return GameID;
    }());
    devil.GameID = GameID;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 通用标记无效常量
     * @author        devil
     * @version       V20181228
     * @create        2018-12-28
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var InvalidationType = /** @class */ (function () {
        function InvalidationType() {
        }
        /**
         * 标记为空
         */
        InvalidationType.EMPTY = 0;
        /**
         * 内部布局标记
         */
        InvalidationType.LAYOUT = 256;
        // /**
        //  * 位置标记 
        //  */		
        // public static POSITION:number = 8;
        /**
         * 长宽标记
         */
        InvalidationType.SIZE = 512;
        /**
         * 数据标记
         */
        InvalidationType.DATA = 1024;
        /**
         * 样式标记
         */
        InvalidationType.STYLE = 2048;
        /**
         * 是否可交互
         */
        InvalidationType.ENABLED = 4096;
        /**
         * 初始化
         */
        InvalidationType.INIT = 8192;
        /**
         * 初始化标记
         */
        // public static ALL:number =  InvalidationType.LAYOUT | InvalidationType.POSITION | InvalidationType.SIZE | InvalidationType.DATA | InvalidationType.STYLE | InvalidationType.ENABLED;
        InvalidationType.ALL = InvalidationType.LAYOUT | InvalidationType.SIZE | InvalidationType.DATA | InvalidationType.STYLE | InvalidationType.ENABLED;
        return InvalidationType;
    }());
    devil.InvalidationType = InvalidationType;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 键盘按下或抬起状态枚举
     * @author        devil
     * @version       V20200219
     * @create        2020-02-19
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var KeyState;
    (function (KeyState) {
        KeyState[KeyState["KEY_DOWN"] = 0] = "KEY_DOWN";
        KeyState[KeyState["KEY_UP"] = 1] = "KEY_UP";
    })(KeyState = devil.KeyState || (devil.KeyState = {}));
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 键盘KeyCode常量
     * @author        devil
     * @version       V20191113
     * @create        2019-11-13
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var Keyboard = /** @class */ (function () {
        function Keyboard() {
        }
        Keyboard.A = 65;
        Keyboard.B = 66;
        Keyboard.C = 67;
        Keyboard.D = 68;
        Keyboard.E = 69;
        Keyboard.F = 70;
        Keyboard.G = 71;
        Keyboard.H = 72;
        Keyboard.I = 73;
        Keyboard.J = 74;
        Keyboard.K = 75;
        Keyboard.L = 76;
        Keyboard.M = 77;
        Keyboard.N = 78;
        Keyboard.O = 79;
        Keyboard.P = 80;
        Keyboard.Q = 81;
        Keyboard.R = 82;
        Keyboard.S = 83;
        Keyboard.T = 84;
        Keyboard.U = 85;
        Keyboard.V = 86;
        Keyboard.W = 87;
        Keyboard.X = 88;
        Keyboard.Y = 89;
        Keyboard.Z = 90;
        Keyboard.NUM_0 = 48;
        Keyboard.NUM_1 = 49;
        Keyboard.NUM_2 = 50;
        Keyboard.NUM_3 = 51;
        Keyboard.NUM_4 = 52;
        Keyboard.NUM_5 = 53;
        Keyboard.NUM_6 = 54;
        Keyboard.NUM_7 = 55;
        Keyboard.NUM_8 = 56;
        Keyboard.NUM_9 = 57;
        Keyboard.ESC = 27;
        Keyboard.ADD = 187;
        Keyboard.SUB = 189;
        Keyboard.SPACE = 32;
        Keyboard.ENTER = 13;
        return Keyboard;
    }());
    devil.Keyboard = Keyboard;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * UI的层ID，与编辑器对应
     * @author        devil
     * @version       V2019611
     * @create        2019-06-11
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var LayerID = /** @class */ (function () {
        function LayerID() {
        }
        LayerID.getLayers = function () {
            return [this.COMMON_LAYER, this.UI_LAYER, this.EFFECT_LAYER, this.COMMON_TOP_LAYER];
        };
        /**
         * 空
         */
        LayerID.EMPTY = 0;
        /**
         * 贴图层1，一般对应的common贴图
         */
        LayerID.COMMON_LAYER = 1;
        /**
         * 贴图层2,一般对应的对应系统贴图
         */
        LayerID.UI_LAYER = 2;
        /**
         * 文本、特效层
         */
        LayerID.EFFECT_LAYER = 4;
        /**
         * 贴图层，超越文本特效的贴图层，例如红点图片等。一般对应的common贴图
         */
        LayerID.COMMON_TOP_LAYER = 8;
        return LayerID;
    }());
    devil.LayerID = LayerID;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 游戏中的二级分层常量
     * @author        devil
     * @version       V20190425
     * @create        2019-04-25
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var LayerSubIndex = /** @class */ (function () {
        function LayerSubIndex() {
        }
        LayerSubIndex.ELEMENT_EFFECT_BOTTOM = 0; //场景底部对象层
        LayerSubIndex.ELEMENT_SHADOW = 1; //场景对象阴影层
        LayerSubIndex.ELEMENT1 = 2; //场景对象层，不需要排序，放在elementLayer2下层
        LayerSubIndex.ELEMENT2 = 3; //场景对象层，需要排序，放在elementLayer1上层
        LayerSubIndex.ELEMENT_HEAD_VIP = 4;
        LayerSubIndex.ELEMENT_HEAD_TXT = 5;
        LayerSubIndex.ELEMENT_HEAD_TITLE = 6;
        LayerSubIndex.ELEMENT_HEAD_BLOOD = 7;
        LayerSubIndex.ELEMENT_EFFECT_TOP = 8; //顶部技能特效层
        LayerSubIndex.ELEMENT_SCT = 9; //sct对象层
        LayerSubIndex.UI_HOME_IMAGE = 0;
        LayerSubIndex.UI_HOME = 1;
        LayerSubIndex.UI_HOME_EFFECT = 2;
        LayerSubIndex.UI_PANEL_DARK = 3;
        LayerSubIndex.UI_COMMON = 4;
        LayerSubIndex.UI_IMAGE = 5;
        LayerSubIndex.UI_NUM = 6;
        LayerSubIndex.UI_EFFECT = 7; //特效或文本层
        LayerSubIndex.UI_COMMON1 = 8;
        LayerSubIndex.UI_ALERT_MODE = 9;
        LayerSubIndex.UI_ALERT = 10;
        LayerSubIndex.UI_ALERT_MODE2 = 11;
        LayerSubIndex.UI_ALERT2 = 12;
        LayerSubIndex.UI_TIP_MODE = 13;
        LayerSubIndex.UI_TIP = 14;
        LayerSubIndex.UI_LOADING = 15;
        LayerSubIndex.UI_MASSAGE = 16;
        LayerSubIndex.UI_GM = 17;
        return LayerSubIndex;
    }());
    devil.LayerSubIndex = LayerSubIndex;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 库中使用的值，需要在实际项目中赋值
     * @author        devil
     * @version       V20190425
     * @create        2019-04-25
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var LibConst = /** @class */ (function () {
        function LibConst() {
        }
        /**
         * 层的模态贴图
         */
        LibConst.MODE_TEXTURE_NAME = "common_modal";
        return LibConst;
    }());
    devil.LibConst = LibConst;
})(devil || (devil = {}));
/**
 * 日志类型
 * @author devil
 * @version V20180925
 * @create 2018-09-25
 * @place guangzhou
 */
var devil;
(function (devil) {
    var LogType = /** @class */ (function () {
        function LogType() {
        }
        LogType.WARNING = 1;
        LogType.ERROR = 2;
        LogType.DEBUG = 4;
        return LogType;
    }());
    devil.LogType = LogType;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 开放域的常用
     * @author        devil
     * @version       V20200921
     * @create        2020-09-21
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var OpenDataMessageType = /** @class */ (function () {
        function OpenDataMessageType() {
        }
        /**
         * 初始化好友排行榜
         */
        OpenDataMessageType.INIT_FRIEND_RANK = "initFriendRank";
        /**
         * 切换排行榜
         */
        OpenDataMessageType.SWITCH_RANK = "showRank";
        /**
         * 翻页
         */
        OpenDataMessageType.UPDATE_PAGE = "updatePage";
        /**
         * 初始化
         */
        OpenDataMessageType.INIT = "init";
        /**
         * 超越下一个好友
         */
        OpenDataMessageType.NEXT_FRIEND = "nextFriend";
        /**
         * 保存数据
         */
        OpenDataMessageType.SAVE_DATA = "saveData";
        return OpenDataMessageType;
    }());
    devil.OpenDataMessageType = OpenDataMessageType;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ScrollPolicy;
    (function (ScrollPolicy) {
        ScrollPolicy[ScrollPolicy["ON"] = 0] = "ON";
        ScrollPolicy[ScrollPolicy["AUTO"] = 1] = "AUTO";
        ScrollPolicy[ScrollPolicy["OFF"] = 2] = "OFF";
    })(ScrollPolicy = devil.ScrollPolicy || (devil.ScrollPolicy = {}));
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 样式名
     * @author        devil
     * @version       V20190211
     * @create        2019-02-11
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var StyleName = /** @class */ (function () {
        function StyleName() {
        }
        StyleName.UP_BACK_SKIN = "upBackSkin";
        StyleName.OVER_BACK_SKIN = "overBackSkin";
        StyleName.DOWN_BACK_SKIN = "downBackSkin";
        StyleName.SELECT_BACK_SKIN = "selectBackSkin";
        StyleName.DISENABLED_BACK_SKIN = "disenabledBackSkin";
        StyleName.UP_ICON_SKIN = "upIconSkin";
        StyleName.OVER_ICON_SKIN = "overIconSkin";
        StyleName.DOWN_ICON_SKIN = "downIconSkin";
        StyleName.SELECT_ICON_SKIN = "selectIconSkin";
        StyleName.DISENABLED_ICON_SKIN = "disenabledIconSkin";
        StyleName.UP_SCROLL_ARROW_SKIN = "upScrollArrowSkin";
        StyleName.OVER_SCROLL_ARROW_SKIN = "overScrollArrowSkin";
        StyleName.DOWN_SCROLL_ARROW_SKIN = "downScrollArrowSkin";
        return StyleName;
    }());
    devil.StyleName = StyleName;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * UI的版本号
     * @author        devil
     * @version       Oct 14, 2018
     * @create        Oct 14, 2018
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var UIVersion = /** @class */ (function () {
        function UIVersion() {
        }
        UIVersion.VERSION = "2020-07-20";
        return UIVersion;
    }());
    devil.UIVersion = UIVersion;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 微信APPID
     * @author        devil
     * @version       V20201008
     * @create        2020-10-08
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var WXAPPID = /** @class */ (function () {
        function WXAPPID() {
        }
        //魔法之触
        WXAPPID.MAGIC_TOUCH = "wxb7cfa7f3b4286c84";
        //指尖冲刺
        WXAPPID.JUMP = "wxb59122e4e78319bc";
        //星际摩托
        WXAPPID.MOTO = "wxd4d31d60e449232e";
        //迷路的小球
        WXAPPID.PUZZLE = "wx6101893a5ea931f7";
        //色感大测试
        WXAPPID.COLOR = "";
        return WXAPPID;
    }());
    devil.WXAPPID = WXAPPID;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 角色常用动作循环常量
     * @author        devil
     * @version       V20200817
     * @create        2020-08-17
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var WrapMode = /** @class */ (function () {
        function WrapMode() {
        }
        WrapMode.LOOP = 1;
        WrapMode.ONCE = 2;
        return WrapMode;
    }());
    devil.WrapMode = WrapMode;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 控制器基类
     * @author        devil
     * @version       V20190419
     * @create        2019-04-19
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var BaseControl = /** @class */ (function () {
        function BaseControl() {
            this.initCMD();
        }
        BaseControl.prototype.initCMD = function () {
        };
        BaseControl.prototype.addCMD = function (protocol, cls) {
            devil.Manager.socket.addCMD(protocol, cls);
        };
        BaseControl.prototype.send = function (protocol) {
            devil.Manager.socket.getCMD(protocol).send();
        };
        BaseControl.prototype.getCMD = function (protocol) {
            return devil.Manager.socket.getCMD(protocol);
        };
        return BaseControl;
    }());
    devil.BaseControl = BaseControl;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 事件基类
     * @author devil
     * @version V20180702
     * @create 20180702
     * @place guangzhou
     */
    var BaseEvent = /** @class */ (function (_super_1) {
        __extends(BaseEvent, _super_1);
        function BaseEvent(type, params, bubbles, cancelable) {
            var _this = _super_1.call(this, type, bubbles, cancelable) || this;
            _this.params = params;
            return _this;
        }
        return BaseEvent;
    }(egret.Event));
    devil.BaseEvent = BaseEvent;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 小游戏专用事件
     * @author        devil
     * @version       V20200906
     * @create        2020-09-06
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var WXGameEvent = /** @class */ (function (_super_1) {
        __extends(WXGameEvent, _super_1);
        function WXGameEvent() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        /**
         * 更新复活次数
         */
        WXGameEvent.UPDATE_RECEIVE_COUNT = "updateReceiveCount";
        return WXGameEvent;
    }(devil.BaseEvent));
    devil.WXGameEvent = WXGameEvent;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 动画加载器
     * @author devil
     * @version V20180811
     * @create V20180811
     * @place guangzhou
     */
    var AnimationLoader = /** @class */ (function (_super_1) {
        __extends(AnimationLoader, _super_1);
        function AnimationLoader() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        AnimationLoader.prototype.parse = function (data) {
            if (data instanceof egret.BitmapData)
                this._bitmapData = data;
            else
                this._json = JSON.parse(data);
            if (this._json != null && this._bitmapData != null) {
                _super_1.prototype.parse.call(this, data);
                this.sheet = devil.AnimationData.create(this._bitmapData, this._json);
                this._bitmapData = null;
                this._json = null;
            }
        };
        AnimationLoader.prototype.unuse = function () {
            _super_1.prototype.unuse.call(this);
            if (this.sheet) {
                this.sheet.pool();
                this.sheet = null;
            }
            this._bitmapData = null;
            this._json = null;
        };
        /**
         * 加载
         */
        AnimationLoader.prototype.load = function () {
            _super_1.prototype.load.call(this);
            // Manager.log.trace(devil.LogType.DEBUG,"加载路径",this._path.urls)
            this.$load(egret.HttpResponseType.TEXT, 0);
            this.$loadImage(this._path.urls[1]);
        };
        AnimationLoader.prototype.reload = function (index) {
            _super_1.prototype.reload.call(this, index);
            this._path.reload(index);
            if (index == 0) {
                this.$load(egret.HttpResponseType.TEXT, 0);
            }
            else {
                this.$loadImage(this._path.urls[1]);
            }
        };
        AnimationLoader.abc = false;
        return AnimationLoader;
    }(devil.BaseLoader));
    devil.AnimationLoader = AnimationLoader;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 加载器基类
     * @author  devil
     * @version V20190115
     * @create  2019-01-15
     * @place   guangzhou
     */
    var BaseLoader = /** @class */ (function () {
        function BaseLoader() {
            this._httpReqs = [];
            this._callBacks = [];
            this._errorCallBacks = [];
            this.start();
        }
        /**
         * 加载优化级
         */
        BaseLoader.prototype.getPriority = function () {
            if (this._callBacks.length <= 1)
                return -1;
            return this._priority;
        };
        /**
         * 路径信息
         */
        BaseLoader.prototype.getPath = function () {
            return this._path;
        };
        BaseLoader.prototype.getUseTimer = function () {
            return this._useTimer;
        };
        /**
         * 加载状态，对应的LoaderState常量值
         */
        BaseLoader.prototype.getState = function () {
            return this._state;
        };
        BaseLoader.prototype.start = function () {
            this._state = devil.LoaderState.WAITING;
            this._count = 0;
            this._dispatchLoadErrorEvent = false;
            this._errorCount = 0;
        };
        /**
         * 填加加载成功回调函数
         * @param complete
         * @param target
         */
        BaseLoader.prototype.add = function (complete, target, error, errorTarget) {
            this._useTimer = egret.getTimer();
            if (devil.CallBackInfo.contains(this._callBacks, complete, target) == -1)
                this._callBacks.push(devil.CallBackInfo.create(complete, target));
            if (error != null && devil.CallBackInfo.contains(this._errorCallBacks, error, errorTarget) == -1)
                this._errorCallBacks.push(devil.CallBackInfo.create(error, errorTarget));
        };
        /**
         * 删除加载成功回调函数
         * @param complete
         * @param target
         */
        BaseLoader.prototype.remove = function (complete, target, error, errorTarget) {
            var index = devil.CallBackInfo.contains(this._callBacks, complete, target);
            if (index >= 0) {
                this._callBacks[index].pool();
                this._callBacks.splice(index, 1);
            }
            if (error != null) {
                index = devil.CallBackInfo.contains(this._errorCallBacks, error, errorTarget);
                if (index >= 0) {
                    this._errorCallBacks[index].pool();
                    this._errorCallBacks.splice(index, 1);
                }
            }
        };
        BaseLoader.prototype.unuseHttpReqs = function () {
            var len = this._httpReqs.length;
            for (var i = len - 1; i >= 0; i--) {
                this.unuseHttpReq(this._httpReqs[i]);
            }
            this._httpReqs.length = 0;
        };
        BaseLoader.prototype.unuseHttpReq = function (target) {
            target.removeEventListener(egret.Event.COMPLETE, this.___httpReqComplete, this);
            target.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.___httpReqErrorComplete, this);
            // target.abort();
            devil.Manager.pool.pushHttpRequest(target);
            var index = this._httpReqs.indexOf(target);
            if (index != -1)
                this._httpReqs.splice(index, 1);
        };
        BaseLoader.prototype.unuseImgLoader = function () {
            if (this._imgLoader) {
                this._imgLoader.removeEventListener(egret.Event.COMPLETE, this.___imageLoaderComplete, this);
                this._imgLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.___imageLoaderErrorComplete, this);
                devil.Manager.pool.pushImageLoader(this._imgLoader);
                this._imgLoader = null;
            }
        };
        BaseLoader.prototype.parse = function (data) {
            this._state = devil.LoaderState.SUCESS;
        };
        BaseLoader.prototype.callBack = function () {
            var len = this._callBacks.length;
            for (var i = 0; i < len; i++) {
                this._callBacks[i].runCallBack(this);
            }
            this._count += len;
            for (var i = 0; i < len; i++) {
                this._callBacks[i].pool();
            }
            this._callBacks.length = 0;
            for (var i = 0; i < this._errorCallBacks.length; i++) {
                this._errorCallBacks[i].pool();
            }
            this._errorCallBacks.length = 0;
        };
        BaseLoader.prototype.errorCallBack = function () {
            var len = this._errorCallBacks.length;
            for (var i = 0; i < len; i++) {
                this._errorCallBacks[i].runCallBack(this);
            }
            for (var i = 0; i < this._errorCallBacks.length; i++) {
                this._errorCallBacks[i].pool();
            }
            this._errorCallBacks.length = 0;
        };
        /**
         * 解析并缓存加载成功的数据
         */
        BaseLoader.prototype.$analyzeData = function (data) {
            if (!data) {
                this.error(0);
                return;
            }
            try {
                this.parse(data);
                if (this._state == devil.LoaderState.SUCESS)
                    this.callBack();
            }
            catch (e) {
                egret.$warn(1017, this._path.urls, data);
            }
        };
        BaseLoader.prototype.reload = function (index) {
            this._state = devil.LoaderState.LOADING;
        };
        BaseLoader.prototype.error = function (index) {
            if (this._dispatchLoadErrorEvent)
                return;
            if (this._errorCount < BaseLoader.MAX_ERROR) {
                this._errorCount++;
                this._state = devil.LoaderState.WAITING;
                this.reload(index);
            }
            else {
                if (!this._dispatchLoadErrorEvent) {
                    this.errorCallBack();
                    this._dispatchLoadErrorEvent = true;
                }
                for (var i = 0; i < this._callBacks.length; i++) {
                    this._callBacks[i].pool();
                }
                this._callBacks.length = 0;
                this.removeCount();
                this._state = devil.LoaderState.FAIL;
                // this._resourceGCType = ResourceGCType.NOW;
                this._resourceGCType = devil.ResourceGCType.ERROR;
                this._unUseTimer = egret.getTimer();
                devil.Manager.loader.addFail(this._path.key);
                if (DEBUG)
                    egret.error("【错误：】", "加载文件错误---" + this._path.urls);
            }
        };
        /**
         * 引用计数加1
         */
        BaseLoader.prototype.addCount = function () {
            this._count++;
        };
        /**
         * 引用计数减1，如果计数小于0，则会重置使用时间，等待垃圾回收
         */
        BaseLoader.prototype.removeCount = function () {
            this._count--;
            if (this._count <= 0)
                this._unUseTimer = egret.getTimer();
        };
        BaseLoader.prototype.$load = function (responseType, index) {
            var httpReq = devil.Manager.pool.createHttpRequest();
            httpReq.responseType = responseType;
            httpReq.addEventListener(egret.Event.COMPLETE, this.___httpReqComplete, this);
            httpReq.addEventListener(egret.IOErrorEvent.IO_ERROR, this.___httpReqErrorComplete, this);
            // httpReq.open(this._path.urls[index]);
            // httpReq.send();
            this.$request(httpReq, index);
            this._httpReqs.push(httpReq);
        };
        BaseLoader.prototype.$request = function (httpReq, index) {
            httpReq.open(this._path.urls[index]);
            httpReq.send();
        };
        BaseLoader.prototype.$loadImage = function (url) {
            this._imgLoader = devil.Manager.pool.createImageLoader();
            this._imgLoader.addEventListener(egret.Event.COMPLETE, this.___imageLoaderComplete, this);
            this._imgLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.___imageLoaderErrorComplete, this);
            this._imgLoader.load(url);
        };
        /**
         * 加载
         */
        BaseLoader.prototype.load = function () {
            this._state = devil.LoaderState.LOADING;
        };
        BaseLoader.prototype.pool = function () {
            devil.Manager.pool.push(this);
        };
        /**
         * 垃圾回收
         */
        BaseLoader.prototype.gc = function () {
            if (this._count <= 0) {
                if (egret.getTimer() - this._unUseTimer >= devil.ResourceGCType.getGCTime(this._resourceGCType)) {
                    // Manager.log.trace(LogType.DEBUG,"资源释放",this._path.url);
                    this.pool();
                    return true;
                }
                return false;
            }
            else {
                //   Manager.log.trace(LogType.DEBUG,"资源释放",this._path.url,this._count);
            }
            return false;
        };
        BaseLoader.prototype.reuse = function () {
            this.start();
        };
        BaseLoader.prototype.unuse = function () {
            var len = this._callBacks.length;
            for (var i = 0; i < len; i++) {
                this._callBacks[i].pool();
            }
            this._callBacks.length = 0;
            len = this._errorCallBacks.length;
            for (var i = 0; i < len; i++) {
                this._errorCallBacks[i].pool();
            }
            this._errorCallBacks.length = 0;
            this._path = null;
            this.unuseHttpReqs();
            this.unuseImgLoader();
        };
        /**
         * 释放内存
         */
        BaseLoader.prototype.dispose = function () {
            this.unuse();
            this._callBacks = null;
            this._errorCallBacks = null;
        };
        BaseLoader.prototype.___httpReqComplete = function (event) {
            this.$analyzeData(event.currentTarget.response);
            this.unuseHttpReq(event.currentTarget);
        };
        BaseLoader.prototype.___httpReqErrorComplete = function (e) {
            this.unuseHttpReq(e.currentTarget);
            this.error(0);
        };
        BaseLoader.prototype.___imageLoaderComplete = function (event) {
            this.$analyzeData(this._imgLoader.data);
            this.unuseImgLoader();
        };
        BaseLoader.prototype.___imageLoaderErrorComplete = function (e) {
            this.unuseImgLoader();
            this.error(1);
        };
        BaseLoader.create = function (cls, path, priority, resourceGCType) {
            var result = devil.Manager.pool.create(cls);
            result._path = path;
            result._priority = priority;
            result._resourceGCType = resourceGCType;
            return result;
        };
        BaseLoader.MAX_ERROR = 3;
        return BaseLoader;
    }());
    devil.BaseLoader = BaseLoader;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 批处理加载器
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    var BatchLoader = /** @class */ (function () {
        function BatchLoader() {
            this._current = 0;
        }
        BatchLoader.prototype.reuse = function () {
            this._current = 0;
        };
        BatchLoader.prototype.oneComplete = function (loader) {
            if (this._total <= this._current) {
                if (this._callBack)
                    this._callBack.runCallBack();
                devil.Manager.pool.push(this);
            }
        };
        BatchLoader.prototype.unuse = function () {
            var len = this._paths.length;
            for (var i = 0; i < len; i++) {
                devil.Manager.loader.remove(this._paths[i], this.__oneComplete, this, this.__error, this);
            }
            this._paths = null;
            if (this._callBack)
                this._callBack.pool();
            this._callBack = null;
            this._oneComplete = null;
            this._oneTarget = null;
            this._oneError = null;
            this._errorTarget = null;
        };
        /**
         * 释放内存
         */
        BatchLoader.prototype.dispose = function () {
            this.unuse();
        };
        BatchLoader.prototype.__error = function (loader) {
            this._current++;
            if (this._oneError)
                this._oneError.apply(this._errorTarget, null);
            this.oneComplete(loader);
        };
        BatchLoader.prototype.__oneComplete = function (loader) {
            this._current++;
            if (this._oneComplete)
                this._oneComplete.apply(this._oneTarget, null);
            this.oneComplete(loader);
        };
        BatchLoader.create = function (paths, resourceGCType, priority, complete, target, oneComplete, oneTarget, oneError, errorTarget) {
            var loader = devil.Manager.pool.create(BatchLoader);
            loader._paths = paths;
            if (complete != null)
                loader._callBack = devil.CallBackInfo.create(complete, target);
            loader._oneComplete = oneComplete;
            loader._oneTarget = oneTarget;
            loader._oneError = oneError;
            loader._errorTarget = errorTarget;
            loader._total = paths.length;
            var len = paths.length;
            for (var i = 0; i < len; i++) {
                devil.Manager.loader.load(paths[i], loader.__oneComplete, loader, resourceGCType, priority, loader.__error, loader);
            }
            return loader;
        };
        return BatchLoader;
    }());
    devil.BatchLoader = BatchLoader;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 字节加载器
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    var ByteLoader = /** @class */ (function (_super_1) {
        __extends(ByteLoader, _super_1);
        function ByteLoader() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        ByteLoader.prototype.load = function () {
            _super_1.prototype.load.call(this);
            this.$load(egret.HttpResponseType.ARRAY_BUFFER, 0);
        };
        ByteLoader.prototype.reload = function (index) {
            _super_1.prototype.reload.call(this, index);
            this._path.reload(0);
            this.$load(egret.HttpResponseType.ARRAY_BUFFER, 0);
        };
        ByteLoader.prototype.parse = function (data) {
            _super_1.prototype.parse.call(this, data);
            this.bytes = data;
        };
        ByteLoader.prototype.unuse = function () {
            this.bytes = null;
            _super_1.prototype.unuse.call(this);
        };
        return ByteLoader;
    }(devil.BaseLoader));
    devil.ByteLoader = ByteLoader;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 龙骨动画加载器
     * @author  devil
     * @version V20190115
     * @create  2019-01-15
     * @place   guangzhou
     */
    var DragonLoader = /** @class */ (function (_super_1) {
        __extends(DragonLoader, _super_1);
        function DragonLoader() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        DragonLoader.prototype.parse = function (data) {
            if (data instanceof egret.BitmapData) {
                this.texture = devil.Manager.pool.createTexture();
                this.texture.bitmapData = data;
            }
            else if (data instanceof ArrayBuffer)
                this.bytes = data;
            else
                this.json = JSON.parse(data);
            if (this.json != null && this.texture != null && this.bytes != null) {
                _super_1.prototype.parse.call(this, data);
            }
        };
        DragonLoader.prototype.reload = function (index) {
            _super_1.prototype.reload.call(this, index);
            this._path.reload(index);
            if (index == 0) {
                this.$load(egret.HttpResponseType.ARRAY_BUFFER, 0);
            }
            else if (index == 1) {
                this.$load(egret.HttpResponseType.TEXT, 1);
            }
            else if (index == 2) {
                this.$loadImage(this._path.urls[2]);
            }
        };
        /**
         * 加载
         */
        DragonLoader.prototype.load = function () {
            _super_1.prototype.load.call(this);
            this.$load(egret.HttpResponseType.ARRAY_BUFFER, 0);
            this.$load(egret.HttpResponseType.TEXT, 1);
            this.$loadImage(this._path.urls[2]);
        };
        DragonLoader.prototype.unuse = function () {
            this.bytes = null;
            if (this.texture != null) {
                devil.Manager.pool.pushTexture(this.texture);
                this.texture = null;
            }
            this.json = null;
            _super_1.prototype.unuse.call(this);
        };
        return DragonLoader;
    }(devil.BaseLoader));
    devil.DragonLoader = DragonLoader;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 图片加载器
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    var ImageLoader = /** @class */ (function (_super_1) {
        __extends(ImageLoader, _super_1);
        function ImageLoader() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        ImageLoader.prototype.parse = function (data) {
            _super_1.prototype.parse.call(this, data);
            var texture = devil.Manager.pool.createTexture();
            texture.bitmapData = data;
            this.texture = texture;
        };
        /**
         * 加载
         */
        ImageLoader.prototype.load = function () {
            _super_1.prototype.load.call(this);
            this.$loadImage(this._path.urls[0]);
        };
        ImageLoader.prototype.reload = function (index) {
            _super_1.prototype.reload.call(this, index);
            this._path.reload(0);
            this.$loadImage(this._path.urls[0]);
        };
        ImageLoader.prototype.unuse = function () {
            if (this.texture) {
                // this.texture.dispose();
                devil.Manager.pool.pushTexture(this.texture);
                this.texture = null;
            }
            _super_1.prototype.unuse.call(this);
        };
        return ImageLoader;
    }(devil.BaseLoader));
    devil.ImageLoader = ImageLoader;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 加载状态
     * @author devil
     * @version V20180719
     * @create V20180719
     * @place guangzhou
     */
    var LoaderState = /** @class */ (function () {
        function LoaderState() {
        }
        /**
         * 等待状态
         */
        LoaderState.WAITING = 0;
        /**
         * 正在加载
         */
        LoaderState.LOADING = 1;
        /**
         * 加载成功
         */
        LoaderState.SUCESS = 2;
        /**
         * 加载失败
         */
        LoaderState.FAIL = 3;
        return LoaderState;
    }());
    devil.LoaderState = LoaderState;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 加载类型
     * @author devil
     * @version V20190909
     * @create 2018-07-19
     * @update devil 2019-09-09  填加NovieClip动画数据加载
     * @place guangzhou
     */
    var LoaderType = /** @class */ (function () {
        function LoaderType() {
        }
        /**
         * 先加载path.txt（二进制解析加载，然后删除源数据），再加载smallMap.jpg
         */
        LoaderType.MAP_DATA = 0;
        /**
         * 先加载json再加载贴图
         */
        LoaderType.ANI = 1;
        /**
         * 加载文本
         */
        LoaderType.TEXT = 2;
        /**
         * 二进制解析加载，不删除源数据
         */
        LoaderType.BIN = 3;
        /**
         * 加载声音
         */
        LoaderType.SOUND = 4;
        /**
         * 加载图片
         */
        LoaderType.IMAGE = 5;
        /**
         * 帖图加载
         */
        LoaderType.TEXTURE = 6;
        /**
         * 龙骨动画数据加载
         */
        LoaderType.DRAGON = 7;
        /**
         * MovieClip动画数据加载
         */
        LoaderType.MOVIE_CLIP = 8;
        return LoaderType;
    }());
    devil.LoaderType = LoaderType;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 地图加载器
     * @author devil
     * @version V20180811
     * @create 2018-08-11
     * @place guangzhou
     */
    var MapLoader = /** @class */ (function (_super_1) {
        __extends(MapLoader, _super_1);
        function MapLoader() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        MapLoader.prototype.parse = function (data) {
            if (data instanceof egret.BitmapData) {
                this.texture = devil.Manager.pool.createTexture();
                this.texture.bitmapData = data;
            }
            else {
                var bytes = devil.Manager.pool.create(devil.ByteArrayExtend);
                bytes.setArrayBuffer(data);
                // this.mapData = MapData.create(new egret.ByteArray(data));
                this.mapData = MapData.create(bytes);
                bytes.pool();
            }
            if (this.texture != null && this.mapData != null) {
                _super_1.prototype.parse.call(this, data);
            }
        };
        /**
         * 加载
         */
        MapLoader.prototype.load = function () {
            _super_1.prototype.load.call(this);
            this.$load(egret.HttpResponseType.ARRAY_BUFFER, 0);
            this.$loadImage(this._path.urls[1]);
        };
        MapLoader.prototype.reload = function (index) {
            _super_1.prototype.reload.call(this, index);
            this._path.reload(index);
            if (index == 0) {
                this.$load(egret.HttpResponseType.ARRAY_BUFFER, 0);
            }
            else {
                this.$loadImage(this._path.urls[1]);
            }
        };
        MapLoader.prototype.unuse = function () {
            _super_1.prototype.unuse.call(this);
            if (this.mapData != null) {
                this.mapData.pool();
                this.mapData = null;
            }
            if (this.texture != null) {
                // this.texture.dispose();
                devil.Manager.pool.pushTexture(this.texture);
                this.texture = null;
            }
        };
        return MapLoader;
    }(devil.BaseLoader));
    devil.MapLoader = MapLoader;
    /**
     * 地图数据
     */
    var MapData = /** @class */ (function () {
        function MapData() {
            this.source = [];
        }
        // public init(bytes:egret.ByteArray):void
        // {
        //     this.parse(bytes);
        // }
        MapData.prototype.parse = function (data) {
            var version = data.readShort();
            var row = data.readShort();
            var col = data.readShort();
            for (var i = 0; i < row; i++) {
                var values = [];
                this.source.push(values);
                for (var j = 0; j < col; j++) {
                    values.push(data.readByte());
                }
            }
        };
        MapData.prototype.isEmpty = function (row, col) {
            if (row < 0 || row >= this.source.length || col >= this.source[0].length || col < 0)
                return false;
            return this.source[row][col] == MapDataType.UN_WALK;
        };
        MapData.prototype.reuse = function () {
        };
        MapData.prototype.unuse = function () {
            this.source = [];
        };
        MapData.prototype.dispose = function () {
            this.source = null;
        };
        MapData.prototype.pool = function () {
            devil.Manager.pool.push(this);
        };
        MapData.create = function (bytes) {
            var result = devil.Manager.pool.create(MapData);
            result.parse(bytes);
            return result;
        };
        return MapData;
    }());
    devil.MapData = MapData;
    /**
     * 地图数据类型,数据类型为0,1,2,4,8的格式
     */
    var MapDataType = /** @class */ (function () {
        function MapDataType() {
        }
        /** 不可走 */
        MapDataType.UN_WALK = 0;
        /** 可走 */
        MapDataType.WALK = 1;
        /** 透明 */
        MapDataType.ALPHA = 2;
        /** 安全 */
        MapDataType.ABSOLUTR = 4;
        /** 水花 */
        MapDataType.WATER = 8;
        /** 沙漠 */
        MapDataType.DESERT = 16;
        return MapDataType;
    }());
    devil.MapDataType = MapDataType;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * MC帧动画数据加载器
     * @author  devil
     * @version V20190909
     * @create  2019-09-09
     * @place   guangzhou
     */
    var MovieClipLoader = /** @class */ (function (_super_1) {
        __extends(MovieClipLoader, _super_1);
        function MovieClipLoader() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        MovieClipLoader.prototype.parse = function (data) {
            if (data instanceof egret.BitmapData) {
                this.texture = devil.Manager.pool.createTexture();
                this.texture.bitmapData = data;
            }
            // else if(data instanceof ArrayBuffer)this.bytes = data;
            else
                this.json = JSON.parse(data);
            if (this.json != null && this.texture != null) // && this.bytes != null)
             {
                this.data = new egret.MovieClipDataFactory(this.json, this.texture);
                _super_1.prototype.parse.call(this, data);
            }
        };
        MovieClipLoader.prototype.reload = function (index) {
            _super_1.prototype.reload.call(this, index);
            this._path.reload(index);
            if (index == 0) {
                // this.$load(egret.HttpResponseType.ARRAY_BUFFER,0);
                this.$load(egret.HttpResponseType.TEXT, 1);
            }
            else if (index == 1) {
                this.$loadImage(this._path.urls[1]);
            }
            // else if(index == 2)
            // {
            // }
        };
        /**
         * 加载
         */
        MovieClipLoader.prototype.load = function () {
            _super_1.prototype.load.call(this);
            // this.$load(egret.HttpResponseType.ARRAY_BUFFER,0);
            this.$load(egret.HttpResponseType.TEXT, 0);
            this.$loadImage(this._path.urls[1]);
        };
        MovieClipLoader.prototype.unuse = function () {
            // this.bytes = null;
            if (this.texture != null) {
                devil.Manager.pool.pushTexture(this.texture);
                this.texture = null;
            }
            this.json = null;
            this.data.clearCache();
            this.data = null;
            _super_1.prototype.unuse.call(this);
        };
        return MovieClipLoader;
    }(devil.BaseLoader));
    devil.MovieClipLoader = MovieClipLoader;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 路径信息类，相关的参数key是相对路径，并且不带版本号
     * @author devil
     * @version V20180807
     * @create V20180717
     * @place guangzhou
     * @description 整理
     */
    var PathInfo = /** @class */ (function () {
        /**
        * @param key			相对路径地址
        * @param version        版本号
        * @param size           文件大小
        * @param memory         文件内存
        * @param absolute       绝对路径
        */
        function PathInfo(key, version, size, memory, absolute) {
            if (absolute === void 0) { absolute = true; }
            /**
             * 带有版本号的URL地址(绝对路径)
             * 特别说明
             *      加载贴图文件,     参数格式[json_url,texture_url]
             *      加载地图路径配置, 参数格式[path_url,smallMap_url]
             *      加载龙骨动画配置, 参数格式[name_ske.dbbin name_tex.json name_tex.png]
             */
            this.urls = [];
            this.key = key;
            this.urls.push((absolute ? devil.Manager.loader.rootToURL(key) : key) + ((devil.Manager.loader.needVersion == true) ? "?v=" + devil.Version.clientVersion + "_" + version : ""));
            this.size = size;
            this.memory = memory;
            this._version = version;
            PathInfo._dic[key] = this;
        }
        /**
         * 设置加载类型
         * @param loaderType
         */
        PathInfo.prototype.setURL = function (loaderType) {
            var url;
            this.loaderType = loaderType;
            switch (loaderType) {
                case devil.LoaderType.ANI:
                case devil.LoaderType.TEXTURE:
                    url = devil.Manager.loader.rootToURL(this.key.replace(devil.Extension.JSON_, devil.Extension.PNG_)); //.json变为.png
                    if (devil.Manager.loader.needVersion)
                        url = url + "?v=" + devil.Version.clientVersion + "_" + this._version;
                    this.urls[1] = url;
                    break;
                case devil.LoaderType.MAP_DATA:
                    url = devil.Manager.loader.rootToURL(this.key.replace("path.txt", "smallMap.jpg")); //path.txt变为smallMap.jpg
                    if (devil.Manager.loader.needVersion)
                        url = url + "?v=" + devil.Version.clientVersion + "_" + this._version;
                    this.urls[1] = url;
                    break;
                case devil.LoaderType.DRAGON:
                    //Dragon_ske.dbbin Dragon_tex.json Dragon_tex.png
                    url = devil.Manager.loader.rootToURL(this.key.replace("_ske.dbbin", "_tex.json"));
                    if (devil.Manager.loader.needVersion)
                        url = url + "?v=" + devil.Version.clientVersion + "_" + this._version;
                    this.urls[1] = url;
                    url = devil.Manager.loader.rootToURL(this.key.replace("_ske.dbbin", "_tex.png"));
                    if (devil.Manager.loader.needVersion)
                        url = url + "?v=" + devil.Version.clientVersion + "_" + this._version;
                    this.urls[2] = url;
                    break;
                case devil.LoaderType.MOVIE_CLIP:
                    //atk_100101_mc.json,atk_100101_tex.png
                    url = devil.Manager.loader.rootToURL(this.key.replace("_mc.json", "_tex.png"));
                    if (devil.Manager.loader.needVersion)
                        url = url + "?v=" + devil.Version.clientVersion + "_" + this._version;
                    this.urls[1] = url;
                    break;
            }
        };
        /**
         * 如果加载失败，则尝试使用随机数做版本加载
         * @param index urls索引值
         */
        PathInfo.prototype.reload = function (index) {
            if (devil.Manager.loader.needVersion) {
                var url = this.urls[index];
                var temp = url.split("?v=");
                url = temp[0] + "?v=" + Math.random();
            }
        };
        /**
        * @param key        相对路径并且不带版本号的地址
        * @param loaderType 加载类型,对应LoaderType常量
        * @param absolute   绝对路径,默认为true,表示使用绝对路径
        */
        PathInfo.getPath = function (key, loaderType, absolute, version) {
            if (absolute === void 0) { absolute = true; }
            if (version === void 0) { version = "0"; }
            var path = this._dic[key];
            if (path == null)
                path = new PathInfo(key, version, 0, 0, absolute);
            path.setURL(loaderType);
            return path;
        };
        PathInfo._dic = {};
        return PathInfo;
    }());
    devil.PathInfo = PathInfo;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 加载顺序等级，越大越高
     * @author devil
     * @version V20180717
     * @create V20180717
     * @place guangzhou
     */
    var ResPriorityType = /** @class */ (function () {
        function ResPriorityType() {
        }
        ResPriorityType.LOWER = 0;
        ResPriorityType.LOAD_LEVEL1 = 1;
        ResPriorityType.LOAD_LEVEL2 = 2;
        ResPriorityType.LOAD_LEVEL3 = 3;
        ResPriorityType.LOAD_LEVEL4 = 4;
        ResPriorityType.LOAD_LEVEL5 = 5;
        ResPriorityType.LOAD_LEVEL6 = 6;
        ResPriorityType.MAX = 100;
        return ResPriorityType;
    }());
    devil.ResPriorityType = ResPriorityType;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 解析资源配置文件(白鹭默认资源编辑器工具的配置文件default.res.json数据)
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    var ResourceConfig = /** @class */ (function () {
        function ResourceConfig() {
            /**
             * 一级键名字典
             */
            this.keyMap = {};
        }
        /**
         * 解析一个配置文件
         * @method RES.ResourceConfig#parseConfig
         * @param data {any} 配置文件数据,Json格式
         * @param folder {string} 加载项的路径前缀。
         */
        ResourceConfig.prototype.parseConfig = function (data, folder) {
            if (!data)
                return;
            var resources = data["resources"];
            if (resources) {
                var length_1 = resources.length;
                for (var i = 0; i < length_1; i++) {
                    var item = resources[i];
                    var url = item.url;
                    if (url && url.indexOf("://") == -1)
                        item.url = folder + url;
                    this.addItemToKeyMap(item);
                }
            }
        };
        /**
         * 添加一个加载项数据到列表
         */
        ResourceConfig.prototype.addItemToKeyMap = function (item) {
            if (!this.keyMap[item.name])
                this.keyMap[item.name] = item;
            if (item.hasOwnProperty("subkeys")) {
                var subkeys = (item.subkeys).split(",");
                item.subkeys = subkeys;
                var length_2 = subkeys.length;
                for (var i = 0; i < length_2; i++) {
                    var key = subkeys[i];
                    if (this.keyMap[key] != null)
                        continue;
                    this.keyMap[key] = item;
                }
            }
        };
        /**
         * 添加一个二级键名到配置列表。
         * @method RES.ResourceConfig#addSubkey
         * @param subkey {string} 要添加的二级键名
         * @param name {string} 二级键名所属的资源name属性
         */
        ResourceConfig.prototype.addSubkey = function (subkey, name) {
            var item = this.keyMap[name];
            if (item && !this.keyMap[subkey]) {
                this.keyMap[subkey] = item;
            }
        };
        /**
         * 获取加载项的name属性
         * @method RES.ResourceConfig#getType
         * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
         * @returns {string}
         */
        ResourceConfig.prototype.getName = function (key) {
            var data = this.keyMap[key];
            return data ? data.name : "";
        };
        ResourceConfig.prototype.contains = function (url, key) {
            var data = this.keyMap[key];
            return (data.url == url);
        };
        /**
         * 获取加载项类型。
         * @method RES.ResourceConfig#getType
         * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
         * @returns {string}
         */
        ResourceConfig.prototype.getType = function (key) {
            var data = this.keyMap[key];
            return data ? data.type : "";
        };
        ResourceConfig.prototype.getRawResourceItem = function (key) {
            return this.keyMap[key];
        };
        /**
         * 获取加载项信息对象
         * @method RES.ResourceConfig#getResourceItem
         * @param key {string} 对应配置文件里的key属性或sbuKeys属性的一项。
         * @returns {egret.ResourceItem}
         */
        ResourceConfig.prototype.getResourceItem = function (key) {
            var data = this.keyMap[key];
            if (data)
                return this.parseResourceItem(data);
            return null;
        };
        ResourceConfig.prototype.getURL = function (key) {
            var item = this.getResourceItem(key);
            if (!item)
                return key;
            return this.getResourceItem(key).url;
        };
        /**
         * 转换Object数据为ResourceItem对象
         */
        ResourceConfig.prototype.parseResourceItem = function (data) {
            // let resItem:ResourceItem = new ResourceItem(data.name, data.url, data.type);
            var resItem = new devil.ResourceItem(data.name, data.url);
            return resItem;
        };
        return ResourceConfig;
    }());
    devil.ResourceConfig = ResourceConfig;
    // export class ResourceItem
    // {
    //     public name:string;
    //     public type:string;
    //     public url:string;
    //     public constructor(name:string,url:string,type:string)
    //     {
    //         this.name = name;
    //         this.url = url;
    //         this.type = type;
    //     }
    // }
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 解析资源配置文件(自定义配置资源文件编辑器)
     * @author        devil
     * @version       V20190131
     * @create        2019-03-08
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ResourceConfig2 = /** @class */ (function () {
        function ResourceConfig2() {
            /**
             * 一级键名字典
             */
            this.keyMap = {};
        }
        ResourceConfig2.prototype.getURL = function (key) {
            var item = this.getResourceItem(key);
            if (!item)
                return key;
            return item.url;
        };
        ResourceConfig2.prototype.parseConfig = function (data, folder) {
            folder = folder == null ? this.folder : folder;
            var bytes = data;
            var version = bytes.readUTF();
            var textureCount = bytes.readByte();
            var textureName;
            var skinName;
            var skinCount;
            var item;
            for (var i = 0; i < textureCount; i++) {
                textureName = bytes.readUTF();
                skinCount = bytes.readShort();
                for (var j = 0; j < skinCount; j++) {
                    item = new devil.ResourceItem(bytes.readUTF(), folder + textureName + devil.Extension.JSON_);
                    if (bytes.readBoolean())
                        item.scale9Grid = new egret.Rectangle(bytes.readShort(), bytes.readShort(), bytes.readShort(), bytes.readShort());
                    this.keyMap[item.name] = item;
                }
            }
        };
        ResourceConfig2.prototype.getName = function (key) {
            var data = this.keyMap[key];
            return data ? data.name : "";
        };
        ResourceConfig2.prototype.contains = function (url, key) {
            var data = this.keyMap[key];
            return (data.url == url);
        };
        ResourceConfig2.prototype.getResourceItem = function (key) {
            return this.keyMap[key];
        };
        return ResourceConfig2;
    }());
    devil.ResourceConfig2 = ResourceConfig2;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 资源回收类型
     * @author devil
     * @version V20180807
     * @create V20180717
     * @place guangzhou
     * @description 整理
     */
    var ResourceGCType = /** @class */ (function () {
        function ResourceGCType() {
        }
        /**
         * 资源存在于内存的时间，以MS为单位
         * @params type ResourceGCType类型
         */
        ResourceGCType.getGCTime = function (type) {
            if (type == ResourceGCType.NOW)
                return 0;
            else if (type == ResourceGCType.SOUND)
                return 0;
            else if (type == ResourceGCType.MAP)
                return 60000;
            else if (type == ResourceGCType.COMMON)
                return 60000;
            else if (type == ResourceGCType.ANIMATION)
                return 60000 * 2;
            else if (type == ResourceGCType.ERROR) {
                if (DEBUG)
                    return 3000;
                return 0;
            }
            return 60000;
        };
        /**
         * 一直存在于游戏内存中
         */
        ResourceGCType.NEVER = 1;
        /**
         * 加载完后立即从内存中释放
         */
        ResourceGCType.NOW = 2;
        /**
         * 通用类型
         */
        ResourceGCType.COMMON = 3;
        /**
         * 地图块资源类型
         */
        ResourceGCType.MAP = 4;
        /**
         * 动画资源
         */
        ResourceGCType.ANIMATION = 5;
        /**
         * 声音资源
         */
        ResourceGCType.SOUND = 6;
        /**
         * 加载错误的释放,开发版3秒回收内存，发布版立即回收内存
         */
        ResourceGCType.ERROR = 7;
        return ResourceGCType;
    }());
    devil.ResourceGCType = ResourceGCType;
})(devil || (devil = {}));
var devil;
(function (devil) {
    var ResourceItem = /** @class */ (function () {
        function ResourceItem(name, url) {
            this.name = name;
            this.url = url;
        }
        return ResourceItem;
    }());
    devil.ResourceItem = ResourceItem;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 自定义SpriteSheet
     * @author devil
     * @version V20180722
     * @create V20180722
     * @place guangzhou
     */
    var SpriteSheet = /** @class */ (function (_super_1) {
        __extends(SpriteSheet, _super_1);
        function SpriteSheet() {
            var _this = _super_1.call(this) || this;
            _this._bitmapX = 0; //表示这个SpriteSheet的位图区域在bitmapData上的起始位置x
            _this._bitmapY = 0; //表示这个SpriteSheet的位图区域在bitmapData上的起始位置y。
            /**
             * @private
             * 纹理缓存字典
             */
            _this._textureMap = egret.createMap();
            return _this;
        }
        Object.defineProperty(SpriteSheet.prototype, "bitmapData", {
            set: function (value) {
                this._texture = devil.Manager.pool.createTexture();
                this._texture.bitmapData = value;
                this._bitmapX = this._texture.$bitmapX - this._texture.$offsetX;
                this._bitmapY = this._texture.$bitmapY - this._texture.$offsetY;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SpriteSheet.prototype, "json", {
            set: function (value) {
                this._json = value;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 根据指定纹理名称获取一个缓存的 Texture 对象
         * @param name {string} 缓存这个 Texture 对象所使用的名称
         * @returns {egret.Texture} Texture 对象
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        SpriteSheet.prototype.getTexture = function (name) {
            if (this._textureMap[name] == null) {
                var data = this._json[name];
                this.createTexture(name, data.x, data.y, data.w, data.h, data.offX, data.offY, data.sourceW, data.sourceH, data.scale9grid);
            }
            return this._textureMap[name];
        };
        /**
         * 为 SpriteSheet 上的指定区域创建一个新的 Texture 对象并缓存它
         * @param name {string} 缓存这个 Texture 对象所使用的名称，如果名称已存在，将会覆盖之前的 Texture 对象
         * @param bitmapX {number} 纹理区域在 bitmapData 上的起始坐标x
         * @param bitmapY {number} 纹理区域在 bitmapData 上的起始坐标y
         * @param bitmapWidth {number} 纹理区域在 bitmapData 上的宽度
         * @param bitmapHeight {number} 纹理区域在 bitmapData 上的高度
         * @param offsetX {number} 原始位图的非透明区域 x 起始点
         * @param offsetY {number} 原始位图的非透明区域 y 起始点
         * @param textureWidth {number} 原始位图的高度，若不传入，则使用 bitmapWidth 的值。
         * @param textureHeight {number} 原始位图的宽度，若不传入，则使用 bitmapHeight 的值。
         * @returns {egret.Texture} 创建的 Texture 对象
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        SpriteSheet.prototype.createTexture = function (name, bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight, scale9Grid) {
            if (offsetX === void 0) { offsetX = 0; }
            if (offsetY === void 0) { offsetY = 0; }
            if (textureWidth === void 0) {
                textureWidth = offsetX + bitmapWidth;
            }
            if (textureHeight === void 0) {
                textureHeight = offsetY + bitmapHeight;
            }
            var texture = devil.Manager.pool.createTexture();
            texture.disposeBitmapData = false;
            texture.$bitmapData = this._texture.$bitmapData;
            texture.$initData(this._bitmapX + bitmapX, this._bitmapY + bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight, this._texture.$sourceWidth, this._texture.$sourceHeight);
            if (!!scale9Grid) {
                var list = scale9Grid.split(",");
                texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
            }
            this._textureMap[name] = texture;
            return texture;
        };
        SpriteSheet.prototype.reuse = function () {
        };
        SpriteSheet.prototype.unuse = function () {
            this._json = null;
            for (var key in this._textureMap) {
                // this._textureMap[key].dispose();
                devil.Manager.pool.pushTexture(this._textureMap[key]);
                this._textureMap[key] = null;
            }
            // this._texture.dispose();
            devil.Manager.pool.pushTexture(this._texture);
            this._texture = null;
        };
        /**
         * 释放纹理
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        SpriteSheet.prototype.dispose = function () {
            this.unuse();
        };
        SpriteSheet.create = function (bitmapData, json) {
            var result = devil.Manager.pool.create(SpriteSheet);
            result.bitmapData = bitmapData;
            result.json = json;
            return result;
        };
        return SpriteSheet;
    }(egret.HashObject));
    devil.SpriteSheet = SpriteSheet;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 文本加载器
     * @author devil
     * @version V20180811
     * @create 2018-08-11
     * @place guangzhou
     */
    var TextLoader = /** @class */ (function (_super_1) {
        __extends(TextLoader, _super_1);
        function TextLoader() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        /**
         * 使用Post加载方式
         * @param params
         */
        TextLoader.prototype.post = function (params) {
            this._isPost = true;
            this._params = params;
        };
        /**
         * 加载
         */
        TextLoader.prototype.load = function () {
            _super_1.prototype.load.call(this);
            this.$load(egret.HttpResponseType.TEXT, 0);
        };
        TextLoader.prototype.reload = function (index) {
            _super_1.prototype.reload.call(this, index);
            this._path.reload(0);
            this.$load(egret.HttpResponseType.TEXT, 0);
        };
        TextLoader.prototype.$request = function (httpReq, index) {
            if (!this._isPost)
                _super_1.prototype.$request.call(this, httpReq, index);
            else {
                httpReq.open(this._path.urls[index], egret.HttpMethod.POST);
                httpReq.send(this._params);
            }
        };
        TextLoader.prototype.parse = function (data) {
            _super_1.prototype.parse.call(this, data);
            this.text = data;
        };
        TextLoader.prototype.unuse = function () {
            this.text = null;
            this._isPost = false;
            this._params = null;
            _super_1.prototype.unuse.call(this);
        };
        return TextLoader;
    }(devil.BaseLoader));
    devil.TextLoader = TextLoader;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 贴图加载器
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    var TextureLoader = /** @class */ (function (_super_1) {
        __extends(TextureLoader, _super_1);
        function TextureLoader() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        TextureLoader.prototype.getTexture = function (name) {
            if (this._sheet)
                return this._sheet.getTexture(name);
            return null;
        };
        TextureLoader.prototype.parse = function (data) {
            if (data instanceof egret.BitmapData)
                this._bitmapData = data;
            else {
                var json = JSON.parse(data);
                if (json.frames != null)
                    this._json = json.frames;
                else
                    this._json = json;
            }
            if (this._json != null && this._bitmapData != null) {
                _super_1.prototype.parse.call(this, data);
                this._sheet = devil.SpriteSheet.create(this._bitmapData, this._json);
                this._bitmapData = null;
                this._json = null;
            }
        };
        TextureLoader.prototype.reload = function (index) {
            _super_1.prototype.reload.call(this, index);
            this._path.reload(index);
            if (index == 0) {
                this.$load(egret.HttpResponseType.TEXT, 0);
            }
            else {
                this.$loadImage(this._path.urls[1]);
            }
        };
        /**
         * 加载
         */
        TextureLoader.prototype.load = function () {
            _super_1.prototype.load.call(this);
            this.$load(egret.HttpResponseType.TEXT, 0);
            this.$loadImage(this._path.urls[1]);
        };
        TextureLoader.prototype.unuse = function () {
            _super_1.prototype.unuse.call(this);
            if (this._sheet) {
                this._sheet.dispose();
                this._sheet = null;
            }
            this._bitmapData = null;
            this._json = null;
        };
        TextureLoader.prototype.gc = function () {
            if (this._count <= 0) {
                if (egret.getTimer() - this._unUseTimer >= devil.ResourceGCType.getGCTime(this._resourceGCType)) {
                    devil.Manager.log.trace(devil.LogType.DEBUG, "资源释放", this._path.urls[0], this._path.urls[1]);
                    this.pool();
                    return true;
                }
                return false;
            }
            else {
                if (devil.AnimationLoader.abc)
                    devil.Manager.log.trace(devil.LogType.DEBUG, "资源未释放", this._path.urls[0], this._path.urls[1], this._count);
            }
            return false;
        };
        return TextureLoader;
    }(devil.BaseLoader));
    devil.TextureLoader = TextureLoader;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 文件版本
     * @author devil
     * @version V20180717
     * @create V20180717
     * @place guangzhou
     */
    var Version = /** @class */ (function () {
        function Version() {
        }
        /**
         * 客户端总版本号，一改全改
         */
        Version.clientVersion = "20190509";
        return Version;
    }());
    devil.Version = Version;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 摄像机管理器
     * 这里所有的尺寸，x,y值均是以地图的左上角(0,0)点为参考，也就是说都不会小于0，当玩家移动的时候相当于移动的是seeRect。
     * seeRect:当前实际看到的视角尺寸，就是玩家所见到实际尺寸，长宽为游戏屏幕的大小，场景大小不变的情况下不会更改。
     * seeRectRC:地图块大小的视角尺寸seeRectRC，不会小于seeRect，用于判断是否有新的地图块加载
     * mapSeeRect:地图大图片的实际尺寸，每次更新地图时会更新长宽，但x,y始终为0
     * centerRect:中心的矩形区域，在此区域内移动时，地图块不会更新。
     * @author devil
     * @version V20180825
     * @create 2018-08-25
     * @place guangzhou
     */
    var CameraManager = /** @class */ (function () {
        function CameraManager() {
            this._seeRect = new egret.Rectangle(0, 0, devil.Manager.stage.width, devil.Manager.stage.height);
            // this._seeRect = new egret.Rectangle(0,0,Manager.stage.displayWidth,Manager.stage.displayHeight);
            this._seeRectRC = new egret.Rectangle(0, 0, 0, 0);
            this._focus = new egret.Point(0, 0);
            this._mapSeeRect = new egret.Rectangle(0, 0, 0, 0);
            this._centerRect = new egret.Rectangle(0, 0, CameraManager.CENTER_W, CameraManager.CENTER_H);
        }
        /**
         * 不移动区域
         */
        CameraManager.prototype.getCenterRect = function () {
            return this._centerRect;
        };
        Object.defineProperty(CameraManager.prototype, "init", {
            /**
             * 第一次启动的时候地图长宽大小不会马上传入进来，则时需要等待，该属性放在第一次加载完地图数据时设置地图长宽时设置
             */
            get: function () {
                return this._init;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 设置摄像头焦点，也是当前主角的位置
         * @param x
         * @param y
         */
        CameraManager.prototype.setFocus = function (x, y, isReset) {
            if (isReset === void 0) { isReset = false; }
            this._focus.x = x;
            this._focus.y = y;
            if (!isReset && this._centerRect.contains(x, y))
                return;
            var stageWidth = devil.Manager.stage.width;
            var stageHeight = devil.Manager.stage.height;
            var halfStageWidth = (stageWidth >> 1);
            var halfStageHeight = (stageHeight >> 1);
            if (stageWidth >= this._mapSeeRect.width) //游戏场景大于地图宽度
             {
                this._centerRect.x = 0;
                this._centerRect.width = this._mapSeeRect.width;
                this._seeRect.x = 0;
            }
            else {
                if (x <= halfStageWidth - CameraManager.CENTER_W * 0.5) {
                    this._centerRect.x = 0;
                    this._centerRect.width = halfStageWidth + CameraManager.CENTER_W * 0.5;
                    this._seeRect.x = 0;
                }
                else if (x >= this._mapSeeRect.width - halfStageWidth + CameraManager.CENTER_W) {
                    this._centerRect.x = this._mapSeeRect.width - halfStageWidth;
                    this._centerRect.width = halfStageWidth;
                    this._seeRect.x = Math.max(this._mapSeeRect.width - stageWidth, 0);
                }
                else {
                    if (isReset) {
                        this._centerRect.width = CameraManager.CENTER_W;
                        this._centerRect.x = x - (CameraManager.CENTER_W >> 1);
                        if ((this._centerRect.x - halfStageWidth + this._seeRect.width) > this._mapSeeRect.right) {
                            this._centerRect.x = x - CameraManager.CENTER_W;
                        }
                    }
                    if (x < this._centerRect.x) {
                        this._centerRect.x = x;
                        this._centerRect.width = CameraManager.CENTER_W;
                    }
                    else if (x > this._centerRect.right) {
                        this._centerRect.x = x - this._centerRect.width;
                        this._centerRect.width = CameraManager.CENTER_W;
                    }
                    this._seeRect.x = Math.max(this._centerRect.x - halfStageWidth, 0);
                }
            }
            if (stageHeight >= this._mapSeeRect.height) {
                this._centerRect.y = 0;
                this._centerRect.height = this._mapSeeRect.height;
                this._seeRect.y = 0;
            }
            else {
                if (y <= halfStageHeight - CameraManager.CENTER_H * 0.5) {
                    this._centerRect.y = 0;
                    this._centerRect.height = halfStageHeight + CameraManager.CENTER_H * 0.5;
                    this._seeRect.y = 0;
                }
                else if (y >= this._mapSeeRect.height - halfStageHeight + CameraManager.CENTER_H) {
                    this._centerRect.y = this._mapSeeRect.height - halfStageHeight;
                    this._centerRect.height = halfStageHeight;
                    this._seeRect.y = Math.max(this._mapSeeRect.height - stageHeight, 0);
                }
                else {
                    if (isReset) {
                        this._centerRect.height = CameraManager.CENTER_H;
                        this._centerRect.y = y - (CameraManager.CENTER_H >> 1);
                    }
                    if (y < this._centerRect.y) {
                        this._centerRect.y = y;
                        this._centerRect.height = CameraManager.CENTER_H;
                    }
                    else if (y > this._centerRect.bottom) {
                        this._centerRect.y = y - this._centerRect.height;
                        this._centerRect.height = CameraManager.CENTER_H;
                    }
                    this._seeRect.y = Math.max(this._centerRect.y - halfStageHeight, 0);
                }
            }
        };
        /**
         * 场景大小改变
         */
        CameraManager.prototype.updateStageSize = function () {
            if (!this._init)
                return;
            this._seeRect.width = Math.min(devil.Manager.stage.width, this._mapSeeRect.width);
            this._seeRect.height = Math.min(devil.Manager.stage.height, this._mapSeeRect.height);
            // this._seeRect.width = Math.min(Manager.stage.displayWidth,this._mapSeeRect.width);
            // this._seeRect.height = Math.min(Manager.stage.displayHeight,this._mapSeeRect.height);
            this.setFocus(this._focus.x, this._focus.y, true);
        };
        /**
         * 获取地图可视区域
         */
        CameraManager.prototype.getMapSeeRect = function () {
            return this._mapSeeRect;
        };
        /**
         * 当前摄像头可视区域
         */
        CameraManager.prototype.getSeeRect = function () {
            return this._seeRect;
        };
        /**
         * 地图可视区域
         * @param width
         * @param height
         */
        CameraManager.prototype.updateMapSeeRect = function (width, height) {
            this._mapSeeRect.width = width;
            this._mapSeeRect.height = height;
            if (!this._init) {
                this._init = true;
                this.updateStageSize();
            }
        };
        /**
         * 更新游戏视角
         */
        CameraManager.prototype.updateSeeRectRC = function (x, y, width, height) {
            this._seeRectRC.x = x;
            this._seeRectRC.y = y;
            this._seeRectRC.width = width;
            this._seeRectRC.height = height;
        };
        /**
         * 是否更新瓦片地图块
         */
        CameraManager.prototype.needUpdateTiled = function () {
            return !this._seeRectRC.containsRect(this._seeRect);
        };
        /**当前焦点 */
        CameraManager.prototype.getFocus = function () {
            return this._focus;
        };
        CameraManager.CENTER_W = 50;
        CameraManager.CENTER_H = 50;
        return CameraManager;
    }());
    devil.CameraManager = CameraManager;
})(devil || (devil = {}));
var devil;
(function (devil) {
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
    var ComponentManager = /** @class */ (function () {
        function ComponentManager() {
        }
        ComponentManager.prototype.createImage = function (source, x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = -1; }
            if (height === void 0) { height = -1; }
            var component = devil.View.create(devil.Image);
            component.setSize(width, height);
            component.move(x, y);
            component.source = source;
            return component;
        };
        ComponentManager.prototype.createButtonImage = function (upBackSkin, width, height, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var component = devil.View.create(devil.ButtonImage);
            component.setStyle(devil.StyleName.UP_BACK_SKIN, upBackSkin);
            component.setSize(width, height);
            component.move(x, y);
            return component;
        };
        /**
         *
         * @param y
         * @param width
         * @param height
         * @param color
         * @param size  default 24
         * @param align default center egret.HorizontalAlign常量
         */
        ComponentManager.prototype.createText = function (x, y, width, height, color, size, align) {
            if (size === void 0) { size = 24; }
            if (align === void 0) { align = "center"; }
            var component = devil.View.create(devil.Text);
            component.color = color;
            component.size = size;
            component.align = align;
            component.verticalAlign = egret.VerticalAlign.MIDDLE;
            component.setSize(width, height);
            component.move(x, y);
            component.repaint();
            return component;
        };
        ComponentManager.prototype.createButtonIcon = function (upBackSkin, upIconSkin, x, y, width, height) {
            var component = devil.View.create(devil.ButtonIcon);
            component.setStyle(devil.StyleName.UP_BACK_SKIN, upBackSkin);
            component.setStyle(devil.StyleName.UP_ICON_SKIN, upIconSkin);
            component.setSize(width, height);
            component.move(x, y);
            return component;
        };
        ComponentManager.prototype.createImageRemote = function (x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = -1; }
            if (height === void 0) { height = -1; }
            var component = devil.View.create(devil.ImageRemote);
            component.move(x, y);
            component.setSize(width, height);
            return component;
        };
        ComponentManager.prototype.createContainer = function (count) {
            if (count === void 0) { count = 1; }
            var component = devil.View.create(devil.Container);
            component.autoCreateLayer(count);
            return component;
        };
        ComponentManager.prototype.createListContainer = function (cls, itemWidth, itemHeight, datas) {
            if (datas === void 0) { datas = []; }
            var component = devil.View.create(devil.ListContainer);
            component.touchChildren = true;
            component.itemRenderer = cls;
            component.itemWidth = itemWidth;
            component.itemHeight = itemHeight;
            component.datas = datas;
            return component;
        };
        ComponentManager.prototype.createListContainer2 = function (cls, datas) {
            if (datas === void 0) { datas = []; }
            var component = devil.View.create(devil.ListContainer2);
            component.touchChildren = true;
            component.itemRenderer = cls;
            component.datas = datas;
            return component;
        };
        /**
         *
         * @param width
         * @param height
         * @param scrollPolicyV     default ScrollPolicy.AUTO
         * @param scrollPolicyH     default ScrollPolicy.OFF
         * @param layout            default List.VERTICAL
         */
        ComponentManager.prototype.createList = function (width, height, scrollPolicyV, scrollPolicyH, layout) {
            if (scrollPolicyV === void 0) { scrollPolicyV = devil.ScrollPolicy.AUTO; }
            if (scrollPolicyH === void 0) { scrollPolicyH = devil.ScrollPolicy.OFF; }
            if (layout === void 0) { layout = devil.List.VERTICAL; }
            var component = devil.View.create(devil.List);
            component.width = width;
            component.height = height;
            component.touchChildren = true;
            component.scrollPolicyH = scrollPolicyH;
            component.scrollPolicyV = scrollPolicyV;
            component.layout = layout;
            return component;
        };
        /** */
        ComponentManager.prototype.createListSlider = function (width, height, listWidth, listHeight) {
            var component = devil.View.create(devil.ListSlider);
            component.setSize(width, height);
            component.touchChildren = true;
            component.listWidth = listWidth;
            component.listHeight = listHeight;
            return component;
        };
        /**
         *
         * @param x
         * @param y
         * @param width
         * @param height
         * @param align default center egret.HorizontalAlign常量
         */
        ComponentManager.prototype.createTextInput = function (x, y, width, height, color, size, upBackSkin, align) {
            if (size === void 0) { size = 24; }
            if (align === void 0) { align = "center"; }
            var component = devil.View.create(devil.TextInput);
            component.move(x, y);
            component.setSize(width, height);
            component.setStyle(devil.StyleName.UP_BACK_SKIN, upBackSkin);
            component.color = color;
            component.size = size;
            component.align = align;
            return component;
        };
        ComponentManager.prototype.createCheckBox1 = function (upBackSkin, selectIconSkin, color, size) {
            if (color === void 0) { color = devil.Color.WHITE; }
            if (size === void 0) { size = 18; }
            var component = devil.View.create(devil.CheckBox1);
            component.label.color = color;
            component.label.size = size;
            component.setStyle(devil.StyleName.UP_BACK_SKIN, upBackSkin);
            component.setStyle(devil.StyleName.SELECT_ICON_SKIN, selectIconSkin);
            return component;
        };
        ComponentManager.prototype.createBoxContainer = function (row, col, paddingV, paddingH) {
            if (paddingV === void 0) { paddingV = 0; }
            if (paddingH === void 0) { paddingH = 0; }
            var component = devil.BoxContainer.createSelf(row, col, paddingV, paddingH);
            return component;
        };
        ComponentManager.prototype.createTab = function () {
            var component = devil.View.create(devil.Tab);
            return component;
        };
        ComponentManager.prototype.createAnimation = function () {
            var component = devil.Manager.pool.create(devil.Animation);
            return component;
        };
        return ComponentManager;
    }());
    devil.ComponentManager = ComponentManager;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 事件管理器
     * @author        devil
     * @version       V20190910
     * @create        2019-09-10
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var EventManager = /** @class */ (function (_super_1) {
        __extends(EventManager, _super_1);
        function EventManager() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        return EventManager;
    }(egret.EventDispatcher));
    devil.EventManager = EventManager;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 键盘管理器
     * @author        devil
     * @version       V20191104
     * @create        2019-11-04
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var KeyboardManager = /** @class */ (function () {
        function KeyboardManager() {
            this._firstDelay = 500;
            this._keyDowns = [];
            this._pushKeys = [];
            this._functions = {};
            var that = this;
            if (!egret.Capabilities.isMobile) {
                document.onkeydown = ___keyDown;
                document.onkeyup = ___keyUp;
            }
            function ___keyDown(e) {
                // if((e.target as egret.TextField) && (e.target as egret.TextField).type == egret.TextFieldType.INPUT)return;//输入文本的快捷键屏蔽
                if (e.target && e.target.type == "text")
                    return; //输入文本的快捷键屏蔽
                if (that._pushKeys.indexOf(e.keyCode) == -1) {
                    that._pushKeys.push(e.keyCode);
                    devil.Manager.render.add(that.___pushRender, that, that._firstDelay, 1);
                    that.sort(that._pushKeys);
                    that.callBack(that._pushKeys.join("|"), devil.KeyState.KEY_DOWN);
                }
            }
            function ___keyUp(e) {
                var index = that._keyDowns.indexOf(e.keyCode);
                if (index != -1)
                    that._keyDowns.splice(index, 1);
                index = that._pushKeys.indexOf(e.keyCode);
                if (index != -1) {
                    that._pushKeys.splice(index, 1);
                    that.callBack(e.keyCode + "", devil.KeyState.KEY_UP);
                }
                if (that._pushKeys.length == 0) {
                    devil.Manager.render.remove(that.___pushRender, that);
                }
                if (that._keyDowns.length == 0) {
                    devil.Manager.render.remove(that.___render, that);
                }
            }
        }
        Object.defineProperty(KeyboardManager.prototype, "firstDelay", {
            /**
             * 当第一次按下键盘时，会有些延时，默认为500MS
             */
            set: function (value) {
                this._firstDelay = value;
            },
            enumerable: false,
            configurable: true
        });
        /**
     * 判断指定的键是否被按下
     * @param keyCode
     * @return
     */
        KeyboardManager.prototype.hasKey = function (keyCode) {
            return this._pushKeys.indexOf(keyCode) != -1;
        };
        // 	/**
        //  * 判断指定的键集中的任意一个键是否被按下 
        //  * @param keyCode
        //  * @return 
        //  */	
        // public hasKeys(...args):boolean
        // {
        // 	for(let i:number = 0 ; i < args.length; i ++)
        // 	{
        // 		if(this.hasKey(args[i]))return true;
        // 	}
        // 	return false;
        // }
        // /**
        //  * 有多少键被按下
        //  * @param keyCode
        //  * @return 
        //  */	
        // public hasKeyCount():number
        // {
        // 	return this._pushKeys.length;
        // }
        /**
         * 填加侦听函数
         * @param key
         * @param callBack 参数keyCode如果是组合键，类似51|52；
         *                state是KeyState常量，标记是抬起还是按下；
         * @param target
         */
        KeyboardManager.prototype.add = function (key, callBack, target) {
            this.adds([key], callBack, target);
        };
        KeyboardManager.prototype.remove = function (key, callBack, target) {
            this.removes([key], callBack, target);
        };
        KeyboardManager.prototype.adds = function (keys, callBack, target) {
            this.sort(keys);
            var key = keys.join("|");
            var functions = this._functions[key];
            if (!functions) {
                functions = [];
                this._functions[key] = functions;
            }
            if (devil.CallBackInfo.contains(functions, callBack, target) == -1)
                functions.push(devil.CallBackInfo.create(callBack, target));
        };
        KeyboardManager.prototype.removes = function (keys, callBack, target) {
            this.sort(keys);
            var key = keys.join("|");
            var functions = this._functions[key];
            if (!!functions) {
                var index = devil.CallBackInfo.contains(functions, callBack, target);
                if (index != -1)
                    functions.splice(index, 1);
            }
        };
        KeyboardManager.prototype.callBack = function (keyCode, state) {
            var functions = this._functions[keyCode];
            if (!!functions) {
                var len = functions.length;
                for (var i = 0; i < len; i++) {
                    functions[i].runCallBack(keyCode, state);
                }
            }
        };
        KeyboardManager.prototype.sort = function (keys) {
            keys.sort(function (a, b) {
                if (a > b)
                    return 1;
                else if (a < b)
                    return -1;
                return 0;
            });
        };
        KeyboardManager.prototype.___render = function (interval) {
            if (this._keyDowns.length > 0) {
                this.callBack(this._keyDowns.join("|"), devil.KeyState.KEY_DOWN);
            }
        };
        KeyboardManager.prototype.___pushRender = function (interval) {
            var keyCode;
            for (var i = 0; i < this._pushKeys.length; i++) {
                keyCode = this._pushKeys[i];
                if (this._keyDowns.indexOf(keyCode) == -1) {
                    this._keyDowns.push(keyCode);
                }
            }
            this.sort(this._keyDowns);
            if (this._keyDowns.length > 0)
                devil.Manager.render.add(this.___render, this);
        };
        return KeyboardManager;
    }());
    devil.KeyboardManager = KeyboardManager;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 语言包管理器
     * @author        devil
     * @version       V20190221
     * @create        2019-02-21
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var LangManager = /** @class */ (function () {
        function LangManager() {
            this._dic = {};
        }
        /**
         * 解析语言包
         */
        LangManager.prototype.parse = function (bytes) {
            var tableCount = bytes.readByte();
            var tableName;
            var count;
            for (var i = 0; i < tableCount; i++) {
                tableName = bytes.readUTF();
                count = bytes.readShort();
                for (var j = 0; j < count; j++) {
                    this._dic[tableName + bytes.readShort()] = bytes.readUTF();
                }
            }
        };
        /**
        * 语言ID，系统与ID组成的字符串，例如:bag1
        */
        LangManager.prototype.getContent = function (id) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var content = this._dic[id];
            if (content == null)
                return "{-" + id + "-}";
            if (args.length == 0)
                return content;
            return devil.StringUtil.substitute.apply(devil.StringUtil, __spreadArrays([content], args));
        };
        return LangManager;
    }());
    devil.LangManager = LangManager;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 层管理器,一级层只有三层，对应的是LayerIndex常量，常量值对应的是层级关系，可以随时自动扩展Element与UI一级层的二级层，但需要定义二级层常量LayerSubIndex
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    var LayerManager = /** @class */ (function () {
        function LayerManager(root) {
            this._root = root;
            this._elementLayers = [];
            this._uiLayers = [];
            this._moveLayers = [];
            this._elementSub3Layers = [];
            this.mapLayer = this.createLayer(root, 0 /* MAP */, true, false, true);
            this.mapLayer.name = "mapLayer";
            this.elementLayer = this.createLayer(root, 1 /* ELEMENT */, false, true, true);
            this.elementLayer.name = "elementLayer";
            this.uiLayer = this.createLayer(root, 2 /* UI */, false, true, false);
            this.uiLayer.name = "uiLayer";
            this.initLayer();
        }
        LayerManager.prototype.initLayer = function () {
            this.initSubLayer(1 /* ELEMENT */, devil.LayerSubIndex.ELEMENT_EFFECT_BOTTOM, false, false, "ELEMENT_EFFECT_BOTTOM");
            this.initSubLayer(1 /* ELEMENT */, devil.LayerSubIndex.ELEMENT_SHADOW, false, false, "ELEMENT_SHADOW");
            this.initSubLayer(1 /* ELEMENT */, devil.LayerSubIndex.ELEMENT1, false, true, "ELEMENT1");
            this.initSubLayer(1 /* ELEMENT */, devil.LayerSubIndex.ELEMENT2, false, true, "ELEMENT2");
            this.initSubLayer(1 /* ELEMENT */, devil.LayerSubIndex.ELEMENT_HEAD_VIP, false, false, "ELEMENT_HEAD_VIP");
            this.initSubLayer(1 /* ELEMENT */, devil.LayerSubIndex.ELEMENT_HEAD_TXT, false, false, "ELEMENT_HEAD_TXT");
            this.initSubLayer(1 /* ELEMENT */, devil.LayerSubIndex.ELEMENT_HEAD_TITLE, false, false, "ELEMENT_HEAD_TITLE");
            this.initSubLayer(1 /* ELEMENT */, devil.LayerSubIndex.ELEMENT_HEAD_BLOOD, false, false, "ELEMENT_HEAD_BLOOD");
            this.initSubLayer(1 /* ELEMENT */, devil.LayerSubIndex.ELEMENT_EFFECT_TOP, false, false, "ELEMENT_EFFECT_TOP");
            this.initSubLayer(1 /* ELEMENT */, devil.LayerSubIndex.ELEMENT_SCT, false, false, "ELEMENT_SCT");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_HOME_IMAGE, false, true, "UI_HOME_IMAGE");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_HOME, false, true, "UI_HOME");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_HOME_EFFECT, false, true, "UI_HOME_EFFECT");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_PANEL_DARK, false, true, "UI_PANEL_DARK");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_COMMON, false, true, "UI_COMMON");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_IMAGE, false, true, "UI_IMAGE");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_NUM, false, false, "UI_NUM");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_EFFECT, false, true, "UI_EFFECT");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_COMMON1, false, true, "UI_COMMON1");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_ALERT_MODE, false, true, "UI_ALERT_MODE");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_ALERT, false, true, "UI_ALERT");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_ALERT_MODE2, false, true, "UI_ALERT_MODE2");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_ALERT2, false, true, "UI_ALERT2");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_TIP_MODE, false, true, "UI_TIP_MODE");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_TIP, false, true, "UI_TIP");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_LOADING, false, true, "UI_LOADING");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_MASSAGE, false, true, "UI_MASSAGE");
            this.initSubLayer(2 /* UI */, devil.LayerSubIndex.UI_GM, false, true, "UI_GM");
        };
        /**
         * 初始化二级层
         * @param index
         * @param subIndex
         */
        LayerManager.prototype.initSubLayer = function (index, subIndex, touchEnabled, touchChildren, name) {
            if (touchEnabled === void 0) { touchEnabled = false; }
            if (touchChildren === void 0) { touchChildren = false; }
            if (name === void 0) { name = ""; }
            var container;
            var parent;
            var layers;
            if (index == 1 /* ELEMENT */ && this._elementLayers[subIndex] == null) {
                parent = this.elementLayer;
                layers = this._elementLayers;
            }
            else if (index == 2 /* UI */ && this._uiLayers[subIndex] == null) {
                parent = this.uiLayer;
                layers = this._uiLayers;
            }
            if (parent != null) {
                container = devil.Manager.pool.createDisplayObjectContainer();
                container.name = name;
                parent.addChildAt(container, subIndex);
                container.touchChildren = touchChildren;
                container.touchEnabled = touchEnabled;
                layers[subIndex] = container;
            }
        };
        LayerManager.prototype.createLayer = function (root, index, touchEnabled, touchChildren, canMove) {
            if (touchEnabled === void 0) { touchEnabled = false; }
            if (touchChildren === void 0) { touchChildren = false; }
            if (canMove === void 0) { canMove = false; }
            var result = devil.Manager.pool.createDisplayObjectContainer();
            result.touchEnabled = touchEnabled;
            result.touchChildren = touchChildren;
            root.addChildAt(result, index);
            if (canMove)
                this._moveLayers.push(result);
            return result;
        };
        /**
         * 移动层，对于ARPG游戏来说人物移动的时候，元素与地图层需要动态更新位置
         */
        LayerManager.prototype.moveLayers = function (x, y) {
            var that = this;
            var len = that._moveLayers.length;
            for (var i = 0; i < len; i++) {
                that._moveLayers[i].x = x;
                that._moveLayers[i].y = y;
            }
        };
        /**
         * 填加视图到二级层级
         * @param index
         * @param subIndex
         * @param view
         */
        LayerManager.prototype.addSubView = function (index, subIndex, view, index1) {
            var container;
            if (index == 1 /* ELEMENT */)
                container = this._elementLayers[subIndex];
            else if (index == 2 /* UI */)
                container = this._uiLayers[subIndex];
            if (!!index1)
                container.addChildAt(view, index1);
            else
                container.addChild(view);
        };
        /**
         * 填加视图到元素层二级视图中
         * @param subIndex
         * @param view
         * @param index1
         */
        LayerManager.prototype.addElement = function (subIndex, view, index1) {
            this.addSubView(1 /* ELEMENT */, subIndex, view, index1);
        };
        /**
         * 填加视图到UI层二级视图中
         * @param subIndex
         * @param view
         * @param index1   是否指定层级，如果不指定则自动填加
         */
        LayerManager.prototype.addUI = function (subIndex, view, index1) {
            this.addSubView(2 /* UI */, subIndex, view, index1);
        };
        /**
         * 填加视图到三级层级
         * @param index
         * @param subIndex
         * @param view
         */
        LayerManager.prototype.addSub3View = function (index, subIndex, key, view) {
            var sub;
            var sub3;
            var views;
            if (this._elementSub3Layers[index] == null)
                this._elementSub3Layers[index] = [];
            if (index == 1 /* ELEMENT */) {
                sub = this._elementLayers[subIndex];
                views = this._elementSub3Layers[index][subIndex];
                if (views == null) {
                    views = {};
                    this._elementSub3Layers[index][subIndex] = views;
                }
                sub3 = views[key];
                if (sub3 == null) {
                    sub3 = devil.Manager.pool.createDisplayObjectContainer();
                    views[key] = sub3;
                    sub.addChild(sub3);
                }
                sub3.addChild(view);
            }
        };
        /**
         * 获取元素层的二级视图实例引用
         */
        LayerManager.prototype.getElement = function (subIndex) {
            return this.getSubLayer(1 /* ELEMENT */, subIndex);
        };
        /**
         *  获取UI层的二级视图实例引用
         */
        LayerManager.prototype.getUI = function (subIndex) {
            return this.getSubLayer(2 /* UI */, subIndex);
        };
        /**
         * 二级层视图重新填加回一级层内
         * @param subIndex
         * @param force		是否强制填加
         */
        LayerManager.prototype.addChildUI = function (subIndex, force) {
            var container = this._uiLayers[subIndex];
            if (container.parent == null || !!force)
                this.uiLayer.addChildAt(container, subIndex);
        };
        /**
         * 删除指定的二级UI层
         */
        LayerManager.prototype.removeChildUI = function (subIndex) {
            var container = this._uiLayers[subIndex];
            if (container.parent != null)
                this.uiLayer.removeChild(container);
        };
        /**
         * 返回指定的二级层实例
         */
        LayerManager.prototype.getSubLayer = function (index, subIndex) {
            var container;
            if (index == 1 /* ELEMENT */)
                container = this._elementLayers[subIndex];
            else if (index == 2 /* UI */)
                container = this._uiLayers[subIndex];
            return container;
        };
        LayerManager.prototype.showTopLayer = function (index) {
            if (index == 0 /* MAP */)
                this._root.addChildAt(this.mapLayer, 0 /* MAP */);
            else if (index == 1 /* ELEMENT */)
                this._root.addChildAt(this.elementLayer, 1 /* ELEMENT */);
            else if (index == 2 /* UI */)
                this._root.addChildAt(this.elementLayer, 2 /* UI */);
        };
        return LayerManager;
    }());
    devil.LayerManager = LayerManager;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 加载管理器
     * @author devil
     * @version V20201008
     * @create V20180717
     * @place guangzhou
     * @update V20201008 guangzhou 加入Text请求Post方式
     */
    var LoaderManager = /** @class */ (function () {
        function LoaderManager() {
            this._loadersCanGC = {}; //非常驻内存
            this._loadersCannotGC = {}; //长驻内存
            this._loadersFail = {}; //加载失败
            /**
             * 微信小游戏不需要版本号，默认值为true
             */
            this.needVersion = true;
            /**
             * 资源的根路径
             */
            this.resourceUrl = "";
            this._queues = [];
            this._needSort = false;
            this._loadingThread = 0;
            this._maxThread = 4;
            egret.ImageLoader.crossOrigin = "anonymous";
            devil.Manager.render.add(this.render, this, 100);
        }
        LoaderManager.prototype.setup = function (resourceUrl, needVersion) {
            if (resourceUrl === void 0) { resourceUrl = ""; }
            if (needVersion === void 0) { needVersion = true; }
            this.resourceUrl = resourceUrl;
            this.needVersion = needVersion;
        };
        /**
         * 对相对路径进行root+计算,也就是将相对路径转换成绝对路径.
         */
        LoaderManager.prototype.rootToURL = function (url) {
            if (url.indexOf(this.resourceUrl) > -1)
                return url;
            return this.resourceUrl + url;
        };
        /**
          * 加载
          * @param path              路径
          * @param complete          加载完成回调函数
          * @param target            回调函数的主体
          * @param resourceGCType    资源回收类型，对应ResourceGCType常量，默认值为ResourceGCType.NOW
          * @param priority          加载顺序等级，越大越高,对应ResPriorityType常量,默认值为ResPriorityType.LOAD_LEVEL1
          */
        LoaderManager.prototype.load = function (path, complete, target, resourceGCType, priority, error, errorTarget) {
            if (this._loadersFail[path.key])
                return null;
            // console.log("LoaderManager.load",path.key);
            if (resourceGCType == null)
                resourceGCType = devil.ResourceGCType.NOW;
            if (priority == null)
                priority = devil.ResPriorityType.LOAD_LEVEL1;
            var loader = this._loadersCannotGC[path.key];
            if (loader == null)
                loader = this._loadersCanGC[path.key];
            if (loader == null) //开始加载
             {
                loader = this.getLoader(path, priority, resourceGCType);
                loader.add(this.complete, this, this.error2, this);
                if (resourceGCType != devil.ResourceGCType.NEVER)
                    this._loadersCanGC[path.key] = loader;
                else
                    this._loadersCannotGC[path.key] = loader;
                this._queues.push(loader);
                this._needSort = true;
            }
            if (loader.getState() == devil.LoaderState.SUCESS) {
                loader.addCount(); //引用加1;
                if (complete != null)
                    complete.call(target, loader);
            }
            else if (loader.getState() == devil.LoaderState.FAIL) {
            }
            else {
                if (complete != null)
                    loader.add(complete, target, error, errorTarget);
            }
            return loader;
        };
        /**
         * 是否正在加载或加载完成
         * @param path
         */
        LoaderManager.prototype.has = function (path) {
            return (!!this._loadersCanGC[path.key] || !!this._loadersCannotGC[path.key]);
        };
        LoaderManager.prototype.getLoader = function (path, priority, resourceGCType) {
            var cls;
            switch (path.loaderType) {
                case devil.LoaderType.TEXT:
                    cls = devil.TextLoader;
                    break;
                case devil.LoaderType.TEXTURE:
                    cls = devil.TextureLoader;
                    break;
                case devil.LoaderType.BIN:
                    cls = devil.ByteLoader;
                    break;
                case devil.LoaderType.IMAGE:
                    cls = devil.ImageLoader;
                    break;
                case devil.LoaderType.MAP_DATA:
                    cls = devil.MapLoader;
                    break;
                case devil.LoaderType.ANI:
                    cls = devil.AnimationLoader;
                    break;
                case devil.LoaderType.DRAGON:
                    cls = devil.DragonLoader;
                    break;
                case devil.LoaderType.MOVIE_CLIP:
                    cls = devil.MovieClipLoader;
                    break;
            }
            if (cls != null)
                return devil.BaseLoader.create(cls, path, priority, resourceGCType);
            return null;
        };
        LoaderManager.prototype.complete = function (loader) {
            loader.removeCount();
            this._loadingThread--;
            if (this._loadingThread < 0)
                this._loadingThread = 0;
        };
        LoaderManager.prototype.render = function (interval) {
            var that = this;
            if (that._queues.length > 0)
                that.next();
            // console.log("*****************************************************************************");
            for (var key in that._loadersCanGC) {
                var loader = that._loadersCanGC[key];
                if (((loader.getState() == devil.LoaderState.SUCESS) || (loader.getState() == devil.LoaderState.FAIL)) && loader.gc()) {
                    delete that._loadersCanGC[key];
                }
            }
        };
        LoaderManager.prototype.next = function () {
            if (this._needSort) {
                this._needSort = false;
                this._queues.sort(this.sortQueues);
            }
            while (this._loadingThread < this._maxThread) {
                if (this._queues.length > 0) {
                    var loader = this._queues.shift();
                    loader.load();
                    this._loadingThread++;
                }
                else
                    break;
            }
        };
        LoaderManager.prototype.error2 = function (loader) {
            this._loadingThread--;
            if (this._loadingThread < 0)
                this._loadingThread = 0;
        };
        LoaderManager.prototype.sortQueues = function (value1, value2) {
            if (value1.getPriority() > value2.getPriority()) {
                return -1;
            }
            else if (value1.getPriority() < value2.getPriority()) {
                return 1;
            }
            else {
                if (value1.getUseTimer() > value2.getUseTimer())
                    return -1;
                else if (value1.getUseTimer() < value2.getUseTimer())
                    return 1;
            }
            return 0;
        };
        /**
         * 取消加载的回调
         * @param path              路径
         * @param complete          加载完成回调函数
         * @param target            回调函数的主体
         */
        LoaderManager.prototype.remove = function (path, complete, target, error, errorTarget) {
            var loader = this._loadersCanGC[path.key];
            if (loader == null)
                loader = this._loadersCannotGC[path.key];
            if (loader != null) {
                if (loader.getState() == devil.LoaderState.SUCESS)
                    loader.removeCount();
                else if (loader.getState() == devil.LoaderState.FAIL) { }
                else {
                    loader.remove(complete, target, error, errorTarget);
                }
            }
        };
        /**
         * 批处理加载
         * @param paths
         * @param resourceGCType
         * @param priority
         * @param complete
         * @param target
         */
        LoaderManager.prototype.loadBatch = function (paths, resourceGCType, priority, complete, target, oneComplete, oneTarget, oneError, errorTarget) {
            devil.BatchLoader.create(paths, resourceGCType, priority, complete, target, oneComplete, oneTarget, oneError, errorTarget);
        };
        /**添加到加载失败列表 */
        LoaderManager.prototype.addFail = function (key) {
            // if(this._loadersFail[key]) return;
            this._loadersFail[key] = true;
        };
        return LoaderManager;
    }());
    devil.LoaderManager = LoaderManager;
})(devil || (devil = {}));
/**
 * 日志管理器
 * @author devil
 * @version V20180925
 * @create 2018-09-25
 * @place guangzhou
 */
var devil;
(function (devil) {
    var LogManager = /** @class */ (function () {
        function LogManager() {
            /**
             * 过滤日志类型，默认任何一种日志类型都会输出
             */
            this.logType = 1 | 2 | 4;
        }
        LogManager.prototype.trace = function (logType) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            var len = params.length;
            if (DEBUG || true) {
                if (logType == devil.LogType.WARNING && ((this.logType & devil.LogType.WARNING) == devil.LogType.WARNING)) {
                    egret.warn.apply(egret, __spreadArrays(["【警告：】"], params));
                }
                else if (logType == devil.LogType.DEBUG && ((this.logType & devil.LogType.DEBUG) == devil.LogType.DEBUG)) {
                    egret.log.apply(egret, __spreadArrays(["【信息：】"], params));
                }
            }
            if (logType == devil.LogType.ERROR && ((this.logType & devil.LogType.ERROR) == devil.LogType.ERROR)) {
                egret.log.apply(egret, __spreadArrays(["【错误：】"], params));
            }
        };
        return LogManager;
    }());
    devil.LogManager = LogManager;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 基础管理器集，针对基本的管理器
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    var Manager = /** @class */ (function () {
        function Manager() {
        }
        /**
         * 使用管理器集前先要调用此方法启动
         * @root 为入口类，不是stage
         */
        Manager.setup = function (root) {
            this.stage = new devil.StageManager(root.stage);
            this.pool = new devil.ObjectPoolManager();
            this.render = new devil.RenderManager();
            this.loader = new devil.LoaderManager();
            this.layer = new devil.LayerManager(root);
            this.log = new devil.LogManager();
            this.component = new devil.ComponentManager();
            this.lang = new devil.LangManager();
            this.uiRead = new devil.UIReadManager();
            this.camera = new devil.CameraManager();
            this.socket = new devil.SocketManager();
            this.view = new devil.ViewManager();
            this.sound = new devil.SoundManager();
            this.tip = new devil.TipManager();
            this.event = new devil.EventManager();
            this.plat = new devil.PlatManager();
            this.keyboard = new devil.KeyboardManager();
            this.storage = new devil.StorageManager();
            this.wx = new devil.WXManager();
            this.ad = new devil.WXADManger();
        };
        return Manager;
    }());
    devil.Manager = Manager;
})(devil || (devil = {}));
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
var devil;
(function (devil) {
    /**
     * 平台管理器
     * @author        devil
     * @version       V20191122
     * @create        2019-11-22
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var PlatManager = /** @class */ (function () {
        function PlatManager() {
        }
        /**
         * 是否微信小游戏
         */
        PlatManager.prototype.isWX = function () {
            return egret.Capabilities.runtimeType === egret.RuntimeType.WXGAME;
        };
        /**
         * 是否QQ小游戏
         */
        PlatManager.prototype.isQQ = function () {
            return egret.Capabilities.runtimeType === egret.RuntimeType.QQGAME;
        };
        /**
         * 是否移动端
         */
        PlatManager.prototype.isMobile = function () {
            return egret.Capabilities.isMobile;
        };
        /**
         * 是否电脑端（包含Windows、MAC）
         */
        PlatManager.prototype.isPC = function () {
            return !egret.Capabilities.isMobile;
        };
        return PlatManager;
    }());
    devil.PlatManager = PlatManager;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 渲染管理器
     * @author        devil
     * @version       V20190122
     * @create        2019-01-12
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var RenderManager = /** @class */ (function () {
        function RenderManager() {
            this._callBacks = [];
            this._interval = 0;
            this._lastTime = 0;
            this._shape = new egret.DisplayObject();
            this._shape.addEventListener(egret.Event.ENTER_FRAME, this.___enterFrame, this);
        }
        /**
         * 当前帧与上一帧的时间间隔，以毫秒为单位
         */
        RenderManager.prototype.getInterval = function () {
            return this._interval;
        };
        /**
         * 是否包含指定的函数及对象，并且alive为true
         * @params render 回调函数
         * @params target 回调对象
         * @params return 大于-1则表示不包含，否则会返回当前的索引值
         */
        RenderManager.prototype.contains = function (render, target) {
            var length = this._callBacks.length;
            for (var i = 0; i < length; i++) {
                if (this._callBacks[i].render.equals(render, target) && this._callBacks[i].alive)
                    return i;
            }
            return -1;
        };
        /**
        * 添加计时器render:Function, target:any, deley:number = 0, repeat:number = 0, end:Function = null, forceReset:boolean = false,...args:any[]
        * @params render 单次回调函数
        * @params target 包含函数的对象
        * @params deley 执行时间间隔，单位毫秒，0或小于0表示每帧都执行,默认为0
        * @params repeat 执行次数，0或小于0表示无限次
        * @params end 最后一次执行的回调函数
        * @params forceReset 强制重置设置，比如之前已add该render，则重置该render的值
        */
        RenderManager.prototype.add = function (render, target, deley, repeat, end, forceReset) {
            if (deley === void 0) { deley = 0; }
            if (repeat === void 0) { repeat = 0; }
            if (end === void 0) { end = null; }
            if (forceReset === void 0) { forceReset = false; }
            var args = [];
            for (var _i = 6; _i < arguments.length; _i++) {
                args[_i - 6] = arguments[_i];
            }
            var index = this.contains(render, target);
            if (index == -1) {
                this._callBacks.unshift(RenderTimerInfo.create(render, target, deley, repeat, end, args));
                this._addRenderCount++;
            }
            else {
                if (forceReset) {
                    this._callBacks[index].pool();
                    this._callBacks[index] = RenderTimerInfo.create(render, target, deley, repeat, end, args);
                }
            }
        };
        /**
        * 移除计时器
        */
        RenderManager.prototype.remove = function (render, target) {
            var index = this.contains(render, target);
            if (index >= 0)
                this._callBacks[index].alive = false;
        };
        RenderManager.prototype.render = function (info, interval) {
            if (info.args == null || info.args.length == 0)
                info.render.runCallBack(interval);
            else {
                if (info.args.length == 1)
                    info.render.runCallBack(interval, info.args[0]);
                else if (info.args.length == 2)
                    info.render.runCallBack(interval, info.args[0], info.args[1]);
                else if (info.args.length == 3)
                    info.render.runCallBack(interval, info.args[0], info.args[1], info.args[2]);
                else if (info.args.length == 4)
                    info.render.runCallBack(interval, info.args[0], info.args[1], info.args[2], info.args[3]);
                else if (info.args.length == 5)
                    info.render.runCallBack(interval, info.args[0], info.args[1], info.args[2], info.args[3], info.args[4]);
            }
        };
        RenderManager.prototype.removeAll = function (target) {
            var length = this._callBacks.length;
            for (var i = 0; i < length; i++) {
                if (this._callBacks[i].render.target == target && this._callBacks[i].alive)
                    this.remove(this._callBacks[i].render.callBack, this._callBacks[i].render.target);
            }
        };
        RenderManager.prototype.___enterFrame = function (e) {
            var that = this;
            var nowTime = egret.getTimer();
            that._interval = nowTime - that._lastTime;
            that._lastTime = nowTime;
            var len = that._callBacks.length - 1;
            var updateFlag;
            var info;
            for (var i = len; i >= 0; i--) {
                updateFlag = false;
                info = that._callBacks[i];
                if (!info.alive) {
                    info.pool();
                    that._callBacks.splice(i, 1);
                    continue;
                }
                if (info.delay > 0) {
                    info.interval += that._interval;
                    if (info.interval >= info.delay) {
                        updateFlag = true;
                    }
                }
                else {
                    updateFlag = true;
                }
                if (updateFlag) {
                    this._addRenderCount = 0;
                    updateFlag = false;
                    if (info.delay > 0) {
                        if (info.render != null)
                            this.render(info, info.interval);
                        info.interval = 0;
                    }
                    else {
                        if (info.render != null)
                            this.render(info, that._interval);
                    }
                    if (info.repeat > 0) {
                        info.repeat--;
                        if (info.repeat <= 0) {
                            if (info.end != null)
                                info.end.runCallBack();
                            info.alive = false;
                        }
                    }
                    i += this._addRenderCount;
                }
            }
        };
        return RenderManager;
    }());
    devil.RenderManager = RenderManager;
    var RenderTimerInfo = /** @class */ (function () {
        function RenderTimerInfo() {
            this.alive = true;
            this.interval = 0;
        }
        RenderTimerInfo.prototype.reuse = function () {
            this.alive = true;
            this.interval = 0;
        };
        RenderTimerInfo.prototype.unuse = function () {
            if (this.render != null) {
                this.render.pool();
                this.render = null;
            }
            if (this.end != null) {
                this.end.pool();
                this.end = null;
            }
            this.alive = false;
            this.delay = 0;
            this.repeat = 0;
            this.args.length = 0;
            this.args = null;
        };
        RenderTimerInfo.prototype.dispose = function () {
            if (this.render != null) {
                this.render.pool();
                this.render = null;
            }
            if (this.end != null) {
                this.end.pool();
                this.end = null;
            }
            this.args.length = 0;
            this.args = null;
        };
        RenderTimerInfo.prototype.pool = function () {
            devil.Manager.pool.push(this);
        };
        RenderTimerInfo.create = function (render, target, deley, repeat, end, args) {
            var result = devil.Manager.pool.create(RenderTimerInfo);
            if (render != null)
                result.render = devil.CallBackInfo.create(render, target);
            if (end != null)
                result.end = devil.CallBackInfo.create(end, target);
            result.delay = deley;
            result.repeat = repeat;
            result.args = args;
            return result;
        };
        return RenderTimerInfo;
    }());
    devil.RenderTimerInfo = RenderTimerInfo;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * socket管理器
     * @author        devil
     * @version       V20190311
     * @create        2018-07-28
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var SocketManager = /** @class */ (function () {
        function SocketManager() {
            this._isReconnecting = false; //是否正在重连
            this._reConnectCount = 0; //重连次数
            /**
             * 服务器验证字段0~127,0开始
             */
            this.verify = 0;
            /**
             * 是否需要重连
             */
            this.needReconnect = true;
            /**
             * 握手协议字符串
             */
            this.handContent = "game_client------------";
            this._readBuffer = devil.Manager.pool.create(devil.TCPPacketIn);
            this._writeOffset = 0;
            this._readOffset = 0;
            this._totalLen = 0;
            this._cmds = {};
            this.isSocketReConnect = false;
        }
        Object.defineProperty(SocketManager.prototype, "isWss", {
            set: function (value) {
                this._isWss = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SocketManager.prototype, "isConnected", {
            get: function () {
                return this._socket != null && this._isConnected;
            },
            enumerable: false,
            configurable: true
        });
        SocketManager.prototype.receive = function (pkg) {
            var cmd = this._cmds[pkg.protocol];
            if (cmd != null)
                cmd.receive(pkg);
            else {
                devil.Manager.log.trace(devil.LogType.WARNING, "服务器与客户端协议对不上 ", pkg.protocol);
            }
        };
        SocketManager.prototype.initRemoteSocket = function () {
            devil.Manager.log.trace(devil.LogType.DEBUG, "start connecting socket ...");
            if (this._socket == null)
                this.$connect();
        };
        SocketManager.prototype.clear = function () {
            var that = this;
        };
        SocketManager.prototype.closeSocket = function () {
            // Manager.log.trace(LogType.DEBUG, "断开连接");
            if (this._socket) {
                this._socket = null;
                this._isReconnecting = false;
            }
        };
        SocketManager.prototype.addCMD = function (protocol, cls) {
            if (this._cmds[protocol] == undefined)
                this._cmds[protocol] = new cls();
        };
        SocketManager.prototype.removeCMD = function (protocol) {
            delete this._cmds[protocol];
        };
        SocketManager.prototype.getCMD = function (protocol) {
            return this._cmds[protocol];
        };
        SocketManager.prototype.addVerify = function () {
            this.verify++;
            if (this.verify >= 128)
                this.verify = 0;
        };
        /**
         * 连接
         * @param ip
         * @param port
         */
        SocketManager.prototype.connect = function (ip, port) {
            this._ip = ip;
            this._port = port;
            this.initRemoteSocket();
        };
        SocketManager.prototype.reconnect = function () {
            this._reConnectCount += 1;
            devil.Manager.log.trace(devil.LogType.DEBUG, "restart connecting socket ...", this._reConnectCount);
            this.initRemoteSocket();
            return false;
        };
        SocketManager.prototype.send = function (pkgOrProtocol) {
            if (pkgOrProtocol instanceof devil.TCPPacketOut) {
                this.$sendPkg(pkgOrProtocol);
            }
            else {
                this.$sendPkg(devil.TCPPacketOut.create(pkgOrProtocol));
            }
        };
        SocketManager.prototype.$sendPkg = function (pkg) {
            if (pkg.length == 0)
                return;
            if (this.isConnected) {
                pkg.writePacketLenAndVerify();
                pkg.position = 0;
                try {
                    this._socket.send(pkg.buffer);
                }
                catch (e) { }
                pkg.pool();
            }
            else {
                devil.Manager.render.add(this.___renderReconnect, this, 100, 1, null, true, true);
            }
        };
        SocketManager.prototype.checkOnopen = function () {
            if (this._socket.readyState == 1) {
                this.onopenHandler();
            }
            else {
                this._checkStateCount = 0;
                devil.Manager.render.add(this.onopenHandler, this, 100, 0, null, true);
            }
        };
        SocketManager.prototype.onopenHandler = function () {
            this._checkStateCount++;
            if ((this._checkStateCount > 10) || (this._socket.readyState == 1)) {
                devil.Manager.render.remove(this.onopenHandler, this);
                this.verify = 0;
                if (this._socket.readyState != 1) {
                    alert("登录失败，请刷新重新登录。");
                    return;
                }
                this.sendServerNeedCMD();
                if (this._connnectFun != null)
                    this._connnectFun.runCallBack();
            }
        };
        /**
          * 服务端需要该协议，socket连接成功时发送
          */
        SocketManager.prototype.sendServerNeedCMD = function () {
            if (this._socket.readyState != 1) {
                alert("登录失败，请刷新重新登录。");
                return;
            }
            if (!devil.StringUtil.isEmpty(this.handContent)) {
                var pkg = devil.Manager.pool.create(devil.ByteArrayExtend);
                pkg.writeUTFBytes(this.handContent);
                pkg.position = 0;
                try {
                    this._socket.send(pkg.buffer);
                }
                catch (e) { }
                pkg.pool();
            }
        };
        SocketManager.prototype.$connect = function () {
            var that = this;
            try {
                var socketServerUrl = (this._isWss ? "wss://" : "ws://") + that._ip + ":" + that._port;
                if (that.isWindowSocket()) {
                    console.log("SocketManager.$connect", egret.Capabilities.runtimeType == egret.RuntimeType.QQGAME);
                    that._socket = new window["WebSocket"](socketServerUrl);
                    that._socket.binaryType = "arraybuffer";
                    that._socket.onopen = onopen;
                    that._socket.onclose = onclose;
                    that._socket.onerror = onerror;
                    that._socket.onmessage = onmessage;
                }
                else {
                    that._socket = new __global["egret_native"]["WebSocket"](socketServerUrl);
                    that._socket.onOpen = onopen;
                    that._socket.onClose = onclose;
                    that._socket.onError = onerror;
                    that._socket.onMessage = onmessage;
                }
            }
            catch (e) {
            }
            function onopen() {
                devil.Manager.log.trace(devil.LogType.DEBUG, "socket connnect successful ...");
                that._isConnected = true;
                that._isReconnecting = false;
                if (that._reConnectCount > 0) {
                    that.isSocketReConnect = true;
                    that._reConnectCount = 0;
                }
                that.checkOnopen();
            }
            function onclose(e) {
                devil.Manager.log.trace(devil.LogType.ERROR, "socket close ...");
                that.startReconnect();
                if (that._closeFun != null)
                    that._closeFun.runCallBack();
            }
            function onerror(e) {
                devil.Manager.log.trace(devil.LogType.ERROR, "socket error ...");
                that.startReconnect();
                if (that._errorFun != null)
                    that._errorFun.runCallBack();
            }
            function onmessage2(msg) {
                var pkg = devil.Manager.pool.create(devil.TCPPacketIn);
                if (that.isWindowSocket()) {
                    pkg.setArrayBuffer(msg.data);
                }
                else {
                    pkg.setArrayBuffer(msg);
                }
                console.log("onmessage");
                // that._pkgs.push(pkg);
            }
            function onmessage(msg) {
                var pkg = devil.Manager.pool.create(devil.TCPPacketIn);
                if (that.isWindowSocket())
                    pkg.setArrayBuffer(msg.data);
                else
                    pkg.setArrayBuffer(msg);
                if (pkg.bytesAvailable > 0) {
                    var len = pkg.bytesAvailable;
                    pkg.readBytes(that._readBuffer, that._writeOffset, pkg.bytesAvailable);
                    that._writeOffset += len;
                    if (that._writeOffset > 0) {
                        that._readBuffer.position = 0;
                        that.readPackage();
                    }
                }
                pkg.pool();
            }
        };
        SocketManager.prototype.startReconnect = function () {
            this.closeSocket();
            this._isConnected = false;
            this.clear();
            devil.Manager.render.add(this.___renderReconnect, this, 100, 1, null, true);
        };
        SocketManager.prototype.isWindowSocket = function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME || egret.Capabilities.runtimeType == egret.RuntimeType.QQGAME;
        };
        //只要有数据就写入缓存，缓存中够一条协议的长度时才会被读出
        SocketManager.prototype.readPackage = function () {
            var dataLeft = this._writeOffset - this._readOffset;
            while (dataLeft > 2 && this._totalLen == 0 || dataLeft >= this._totalLen && this._totalLen > 0) {
                var pkg = void 0;
                if (this._totalLen == 0) {
                    this._totalLen = this._readBuffer.readUnsignedShort() + 2;
                    this._readOffset += 2;
                    dataLeft -= 2;
                }
                if (dataLeft >= this._totalLen) {
                    pkg = devil.Manager.pool.create(devil.TCPPacketIn);
                    this._readBuffer.readBytes(pkg, 0, this._totalLen);
                    this._readOffset += this._totalLen;
                    // let totalLen:number = pkg.readUnsignedShort() + 2;
                    pkg.protocol = pkg.readShort();
                    // Manager.log.trace(LogType.DEBUG,ByteUtil.toHexDump("收到协议",pkg,0,pkg.length));
                    this.receive(pkg);
                    pkg.pool();
                    this._totalLen = 0;
                }
                dataLeft = this._writeOffset - this._readOffset;
            }
            //剩下不到一条协议，先写入缓存，再有数据进入继续拼接
            this._readBuffer.position = 0;
            if (dataLeft > 0) {
                this._readBuffer.writeBytes(this._readBuffer, this._readOffset, dataLeft);
            }
            this._readOffset = 0;
            this._writeOffset = dataLeft;
        };
        SocketManager.prototype.__connnect = function (callBack, target) {
            this._connnectFun = devil.CallBackInfo.create(callBack, target);
        };
        SocketManager.prototype.__close = function (callBack, target) {
            this._closeFun = devil.CallBackInfo.create(callBack, target);
        };
        SocketManager.prototype.__error = function (callBack, target) {
            this._errorFun = devil.CallBackInfo.create(callBack, target);
        };
        /**
         * 重连socket
         */
        SocketManager.prototype.___renderReconnect = function (internal, isResetCount) {
            if (isResetCount === void 0) { isResetCount = false; }
            var that = this;
            if (that.isConnected)
                return;
            if (!that.needReconnect)
                return;
            if (that._isReconnecting)
                return;
            that._isReconnecting = true;
            if (isResetCount)
                that._reConnectCount = 0;
            that.reconnect();
        };
        return SocketManager;
    }());
    devil.SocketManager = SocketManager;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 声音管理器
     * @author        devil
     * @version       V20190405
     * @create        2019-004-05
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var SoundManager = /** @class */ (function () {
        function SoundManager() {
            this._ismute = false;
            this._sounds = {};
            this._backVolume = 1;
            this._effectVolume = 1;
            devil.Manager.stage.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.___touchTab, this);
        }
        Object.defineProperty(SoundManager.prototype, "ismute", {
            /**
             * 静音，静音打开时是暂停播放、静音关闭时是继续播放
             */
            get: function () {
                return this._ismute;
            },
            set: function (value) {
                if (this._ismute == value)
                    return;
                this._ismute = value;
                if (this._backSound) {
                    if (this._ismute)
                        this._backSound.pause();
                    else {
                        this.playBackSound(null);
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SoundManager.prototype, "backVolume", {
            /**
             * 0-1
             */
            get: function () {
                return this._backVolume;
            },
            set: function (value) {
                if (this._backVolume == value)
                    return;
                this._backVolume = value;
                if (this._backSound)
                    this._backSound.volume = this._backVolume;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SoundManager.prototype, "effectVolume", {
            /**
             * 0-1
             */
            get: function () {
                return this._effectVolume;
            },
            set: function (value) {
                this._effectVolume = value;
            },
            enumerable: false,
            configurable: true
        });
        SoundManager.prototype.playBackSound = function (path) {
            if (this._backPath == path)
                return;
            this._backPath = path ? path : this._backPath;
            this.play();
        };
        SoundManager.prototype.play = function () {
            if (devil.Model.lifecyclePause || this._ismute)
                return; //进入后台或静音不播放
            if (this._backSound) {
                if (this._backSound.path == this._backPath) {
                    if (this._backSound.playFlag == SoundObject.READY)
                        this._backSound.play();
                }
                else {
                    this._backSound.stop();
                    this._backSound = null;
                }
            }
            if (!this._backSound) {
                this._backSound = this._sounds[this._backPath.key];
                if (!this._backSound) {
                    this._backSound = new SoundObject(egret.Sound.MUSIC, this._backPath);
                    this._backSound.load();
                    this._sounds[this._backPath.key] = this._backSound;
                }
                this._backSound.play();
            }
        };
        SoundManager.prototype.playEffectSound = function (path) {
            if (this._ismute || devil.Model.lifecyclePause)
                return;
            var sound = this._sounds[path.key];
            if (!sound) {
                sound = new SoundObject(egret.Sound.EFFECT, path);
                sound.load();
                this._sounds[path.key] = sound;
            }
            sound.play(1);
        };
        SoundManager.prototype.stopBackSound = function () {
            if (this._backSound)
                this._backSound.stop();
        };
        SoundManager.prototype.___touchTab = function (e) {
            if (this._backSound)
                this._backSound.plugs();
        };
        return SoundManager;
    }());
    devil.SoundManager = SoundManager;
    var SoundObject = /** @class */ (function () {
        function SoundObject(type, path) {
            this._type = type;
            this._path = path;
            this._loops = 1;
            this._playFlag = SoundObject.READY;
            this._loadComplete = false;
            this._startTime = 0;
        }
        Object.defineProperty(SoundObject.prototype, "path", {
            get: function () {
                return this._path;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SoundObject.prototype, "playFlag", {
            get: function () {
                return this._playFlag;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SoundObject.prototype, "volume", {
            set: function (value) {
                if (this._soundChannel)
                    this._soundChannel.volume = value;
            },
            enumerable: false,
            configurable: true
        });
        SoundObject.prototype.load = function () {
            if (this._sound == null) {
                try {
                    this._sound = new egret.Sound();
                    this._sound.type = this._type;
                    this._sound.addEventListener(egret.Event.COMPLETE, this.___complete, this);
                    this._sound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.___ioError, this);
                    this._sound.load(this._path.urls[0]);
                }
                catch (e) {
                    devil.Manager.log.trace(devil.LogType.ERROR, "Sound Error:声音音频问题！");
                }
            }
        };
        SoundObject.prototype.startPlay = function () {
            if (this._soundChannel == null) {
                try {
                    this._soundChannel = this._sound.play(this._startTime, this._loops);
                    this._soundChannel.volume = this._type == egret.Sound.MUSIC ? devil.Manager.sound.backVolume : devil.Manager.sound.effectVolume;
                    this._soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.___playComplete, this);
                }
                catch (e) {
                    this.stop();
                }
            }
        };
        SoundObject.prototype.stopChannel = function () {
            if (this._soundChannel != null) {
                this._soundChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.___playComplete, this);
                try {
                    this._soundChannel.stop();
                }
                catch (e) {
                    devil.Manager.log.trace(devil.LogType.ERROR, "声音停止报错：", e);
                }
                this._soundChannel = null;
            }
        };
        SoundObject.prototype.play = function (loops) {
            if (loops === void 0) { loops = 0; }
            if (this._playFlag == SoundObject.PLAYYING)
                return;
            this._playFlag = SoundObject.PLAYYING;
            this._loops = loops;
            if (this._loadComplete)
                this.startPlay();
        };
        SoundObject.prototype.stop = function () {
            this.stopChannel();
            this._playFlag = SoundObject.READY;
            this._startTime = 0;
        };
        SoundObject.prototype.pause = function () {
            this._playFlag = SoundObject.READY;
            this._startTime = (this._soundChannel != null) ? this._soundChannel.position : 0;
            if (this._loadComplete && (this._sound.length - this._startTime) < 10)
                this._startTime = 0;
            this.stopChannel();
        };
        SoundObject.prototype.plugs = function () {
            if (!this._loadComplete)
                return;
            if (this._soundChannel == null)
                return;
            var pos = this._soundChannel.position;
            if (pos == 0) {
                //解决三星G5700不自动播放声音的问题
                this.stop();
                this.startPlay();
            }
        };
        SoundObject.prototype.___complete = function (e) {
            this._loadComplete = true;
            if (this._playFlag == SoundObject.PLAYYING)
                this.startPlay();
        };
        SoundObject.prototype.___ioError = function (e) {
            devil.Manager.log.trace(devil.LogType.ERROR, "Sound Error:", this._path.key);
            this._loadComplete = false;
        };
        SoundObject.prototype.___playComplete = function (e) {
            this.stopChannel();
            this._playFlag = SoundObject.READY;
            this._startTime = 0;
        };
        SoundObject.READY = 0;
        SoundObject.PLAYYING = 1;
        return SoundObject;
    }());
    devil.SoundObject = SoundObject;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 场景管理器
     * @author        devil
     * @version       V20190131
     * @create        2019-01-31
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var StageManager = /** @class */ (function () {
        function StageManager(stage) {
            this.stage = stage;
            this._frameTime = 1000 / this.stage.frameRate;
            this._callBacks = [];
            this.stage.addEventListener(egret.Event.RESIZE, this.___resize, this);
        }
        Object.defineProperty(StageManager.prototype, "width", {
            get: function () {
                return this.stage.stageWidth;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(StageManager.prototype, "height", {
            get: function () {
                return this.stage.stageHeight;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(StageManager.prototype, "frameRate", {
            get: function () {
                return this.stage.frameRate;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(StageManager.prototype, "frameTime", {
            get: function () {
                return this._frameTime;
            },
            enumerable: false,
            configurable: true
        });
        StageManager.prototype.add = function (callBack, target) {
            if (devil.CallBackInfo.contains(this._callBacks, callBack, target) == -1) {
                this._callBacks.push(devil.CallBackInfo.create(callBack, target));
            }
        };
        StageManager.prototype.remove = function (callBack, target) {
            var index = devil.CallBackInfo.contains(this._callBacks, callBack, target);
            if (index >= 0)
                this._callBacks.splice(index, 1);
        };
        StageManager.prototype.___resize = function (e) {
            var len = this._callBacks.length;
            for (var i = len - 1; i >= 0; i--) {
                this._callBacks[i].runCallBack(this.width, this.height);
            }
        };
        return StageManager;
    }());
    devil.StageManager = StageManager;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 基础管理器集，针对基本的管理器
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    var StorageManager = /** @class */ (function () {
        function StorageManager() {
        }
        StorageManager.prototype.getItem = function (key) {
            return egret.localStorage.getItem(key);
        };
        StorageManager.prototype.clear = function () {
            egret.localStorage.clear();
        };
        StorageManager.prototype.setItem = function (key, value) {
            egret.localStorage.setItem(key, value);
        };
        StorageManager.prototype.removeItem = function (key) {
            egret.localStorage.removeItem(key);
        };
        StorageManager.prototype.setBoolean = function (key, value) {
            egret.localStorage.setItem(key, value ? "1" : "0");
        };
        StorageManager.prototype.getBoolean = function (key) {
            return egret.localStorage.getItem(key) == "1";
        };
        StorageManager.prototype.setInt = function (key, value) {
            egret.localStorage.setItem(key, value.toString());
        };
        StorageManager.prototype.getInt = function (key) {
            return Number(egret.localStorage.getItem(key));
        };
        return StorageManager;
    }());
    devil.StorageManager = StorageManager;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * Tip管理器
     * @author devil
     * @version V20190425
     * @create 20190425
     * @place guangzhou
     */
    var TipManager = /** @class */ (function () {
        function TipManager() {
        }
        /**
         *
         * @param cls
         * @param modal   default false
         */
        TipManager.prototype.show = function (cls, modal) {
            if (modal === void 0) { modal = true; }
            if (this._currentTip) {
                if (this._currentTip instanceof cls)
                    return this._currentTip;
                if (this._currentTip != null)
                    this._currentTip.dispose();
            }
            this._currentTip = new cls();
            this._currentTip.show();
            if (modal) {
                if (this._modal == null) {
                    this._modal = devil.Manager.component.createImage(devil.LibConst.MODE_TEXTURE_NAME, 0, 0, devil.Manager.stage.width, devil.Manager.stage.height);
                    this._modal.alpha = 0.8;
                    this._modal.layers[0].addEventListener(egret.TouchEvent.TOUCH_TAP, this.___touchTap, this);
                    this._modal.touchEnabled = true;
                }
                if (this._modal.layers[0].parent == null)
                    devil.Manager.layer.addUI(devil.LayerSubIndex.UI_TIP_MODE, this._modal.layers[0]);
                devil.Manager.stage.add(this.___resize, this);
                this.___resize(devil.Manager.stage.width, devil.Manager.stage.height);
            }
            return this._currentTip;
        };
        TipManager.prototype.hide = function (cls) {
            if (cls === void 0) { cls = null; }
            if (!!cls && !(this._currentTip instanceof cls))
                return;
            if (this._currentTip != null)
                this._currentTip.dispose();
            this._currentTip = null;
            devil.Manager.render.remove(this.___resize, this);
            if (this._modal && this._modal.layers[0].parent != null)
                this._modal.removeFromParent();
        };
        /** 是否打开了 */
        TipManager.prototype.isOpenning = function (cls) {
            return this._currentTip instanceof cls;
        };
        TipManager.prototype.setModalAlpha = function (alpha) {
            if (alpha === void 0) { alpha = 0.8; }
            if (this._modal)
                this._modal.alpha = alpha;
        };
        TipManager.prototype.___touchTap = function (e) {
            this.hide();
        };
        TipManager.prototype.___resize = function (width, height) {
            this._modal.width = width;
            this._modal.height = height;
        };
        return TipManager;
    }());
    devil.TipManager = TipManager;
})(devil || (devil = {}));
var devil;
(function (devil) {
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
    var UIReadManager = /** @class */ (function () {
        function UIReadManager() {
        }
        UIReadManager.prototype.createComponent = function (componentType) {
            // console.log("UIReadManager.",componentType)
            var cls;
            switch (componentType) {
                case devil.ComponentType.CONTAINER:
                    cls = devil.Container;
                    break;
                case devil.ComponentType.IMAGE:
                    cls = devil.Image;
                    break;
                case devil.ComponentType.TEXT:
                    cls = devil.Text;
                    break;
                case devil.ComponentType.BUTTON_IMAGE:
                    cls = devil.ButtonImage;
                    break;
                case devil.ComponentType.BUTTON_TXT:
                    cls = devil.ButtonText;
                    break;
                case devil.ComponentType.BUTTON_IMAGE_SELECTED:
                    cls = devil.ButtonImageSelected;
                    break;
                case devil.ComponentType.BUTTON_ICON:
                    cls = devil.ButtonIcon;
                    break;
                case devil.ComponentType.BUTTON_ICON_SELECTED:
                    cls = devil.ButtonIconSelected;
                    break;
                case devil.ComponentType.BUTTON_TEXT_SELECTED:
                    break;
                case devil.ComponentType.BUTTON_SELECTED:
                    break;
                case devil.ComponentType.MENU_BAR:
                    break;
                case devil.ComponentType.MENU_ITEM:
                    break;
                case devil.ComponentType.TEXT_INPUT:
                    cls = devil.TextInput;
                    break;
                case devil.ComponentType.CHECK_BOX:
                    cls = devil.CheckBox;
                    break;
                case devil.ComponentType.RADIO_BUTTON:
                    cls = devil.RadioButton;
                    break;
                case devil.ComponentType.MENU_SUB_ITEM:
                    break;
                case devil.ComponentType.IMAGE_REMOTE:
                    cls = devil.ImageRemote;
                    break;
                case devil.ComponentType.LIST:
                    break;
                case devil.ComponentType.COMBOBOX:
                    break;
                case devil.ComponentType.PANEL:
                    break;
                case devil.ComponentType.TEXT_AREA:
                    break;
                case devil.ComponentType.TAB:
                    break;
            }
            return devil.View.create(cls);
        };
        UIReadManager.prototype.read = function (parent, bytes, version, __setProperty, target) {
            var componentType = bytes.readShort();
            // console.log("UIReadManger",componentType);
            var component = this.createComponent(componentType);
            this.parse(component, bytes, version, __setProperty, target);
            if (__setProperty != null)
                __setProperty.call(target, component.name, component);
            if (parent)
                parent.addChild2(component);
            return component;
        };
        UIReadManager.prototype.parse = function (component, bytes, version, __setProperty, target) {
            if (__setProperty === void 0) { __setProperty = null; }
            this.readCommon(component, bytes, version);
            switch (component.type) {
                case devil.ComponentType.BUTTON_IMAGE:
                    this.readButtonImage(component, bytes, version);
                    break;
                case devil.ComponentType.CONTAINER:
                    var count = 0;
                    if ((component.layerID & 1) == 1)
                        count++;
                    if ((component.layerID & 2) == 2)
                        count++;
                    if ((component.layerID & 4) == 4)
                        count++;
                    component.autoCreateLayer(count);
                    this.readContainer(component, bytes, version, __setProperty, target);
                    break;
                case devil.ComponentType.IMAGE:
                    this.readImage(component, bytes, version);
                    break;
                case devil.ComponentType.TEXT:
                    this.readText(component, bytes, version);
                    break;
                case devil.ComponentType.BUTTON_TXT:
                    this.readButtonText(component, bytes, version);
                    break;
                case devil.ComponentType.BUTTON_IMAGE_SELECTED:
                    this.readButtonImageSelected(component, bytes, version);
                    break;
                case devil.ComponentType.BUTTON_ICON:
                    this.readButtonIcon(component, bytes, version);
                    break;
                case devil.ComponentType.BUTTON_ICON_SELECTED:
                    this.readButtonIconSelected(component, bytes, version);
                    break;
                case devil.ComponentType.BUTTON_TEXT_SELECTED:
                    break;
                case devil.ComponentType.BUTTON_SELECTED:
                    break;
                case devil.ComponentType.MENU_BAR:
                    break;
                case devil.ComponentType.MENU_ITEM:
                    break;
                case devil.ComponentType.TEXT_INPUT:
                    this.readTextInput(component, bytes, version);
                    break;
                case devil.ComponentType.CHECK_BOX:
                    this.readCheckBox(component, bytes, version);
                    break;
                case devil.ComponentType.RADIO_BUTTON:
                    this.readRadioButton(component, bytes, version);
                    break;
                case devil.ComponentType.MENU_SUB_ITEM:
                    break;
                case devil.ComponentType.IMAGE_REMOTE:
                    this.readImageRemote(component, bytes, version);
                    break;
                // case ComponentType.SCROLL_BAR:
                // break;
                case devil.ComponentType.LIST:
                    break;
                case devil.ComponentType.COMBOBOX:
                    break;
                case devil.ComponentType.PANEL:
                    break;
                case devil.ComponentType.TEXT_AREA:
                    break;
            }
        };
        UIReadManager.prototype.readButtonImage = function (component, bytes, version) {
            this.readStyles(component, bytes, version);
        };
        UIReadManager.prototype.readContainer = function (container, bytes, version, __setProperty, target) {
            var numChildren = bytes.readByte();
            var component;
            for (var i = 0; i < numChildren; i++) {
                component = this.read(container, bytes, version, __setProperty, target);
                container.setProperty(component.name, component);
            }
            container.readDataComplete();
        };
        UIReadManager.prototype.readImage = function (component, bytes, version) {
        };
        UIReadManager.prototype.readText = function (component, bytes, version) {
            component.color = bytes.readInt();
            component.bold = bytes.readBoolean();
            component.size = bytes.readByte();
            component.align = bytes.readUTF();
        };
        UIReadManager.prototype.readButtonText = function (component, bytes, version) {
            this.readStyles(component, bytes, version);
            component.label.color = bytes.readInt();
            component.label.bold = bytes.readBoolean();
            component.label.size = bytes.readByte();
            component.label.align = bytes.readUTF();
            component.setLabelOffset(bytes.readShort(), bytes.readShort());
        };
        UIReadManager.prototype.readButtonImageSelected = function (component, bytes, version) {
            this.readButtonImage(component, bytes, version);
        };
        UIReadManager.prototype.readButtonIcon = function (component, bytes, version) {
            this.readStyles(component, bytes, version);
            component.setIconOffset(bytes.readShort(), bytes.readShort());
        };
        UIReadManager.prototype.readButtonIconSelected = function (component, bytes, version) {
            this.readButtonIcon(component, bytes, version);
        };
        UIReadManager.prototype.readImageRemote = function (component, bytes, version) {
        };
        UIReadManager.prototype.readTextInput = function (component, bytes, version) {
            this.readStyles(component, bytes, version);
            component.color = bytes.readInt();
            component.bold = bytes.readBoolean();
            component.size = bytes.readByte();
            component.align = bytes.readUTF();
        };
        UIReadManager.prototype.readCheckBox = function (component, bytes, version) {
            this.readButtonText(component, bytes, version);
        };
        UIReadManager.prototype.readRadioButton = function (component, bytes, version) {
            this.readButtonText(component, bytes, version);
        };
        UIReadManager.prototype.readStyles = function (component, bytes, version) {
            var count = bytes.readByte();
            for (var i = 0; i < count; i++) {
                component.setStyle(bytes.readUTF(), bytes.readUTF());
            }
        };
        UIReadManager.prototype.readCommon = function (component, bytes, version) {
            component.name = bytes.readUTF();
            component.move(bytes.readShort(), bytes.readShort());
            component.width = bytes.readShort();
            component.height = bytes.readShort();
            component.alpha = bytes.readUnsignedByte() * 0.1;
            component.anchorX = bytes.readUnsignedByte() * 0.1;
            component.anchorY = bytes.readUnsignedByte() * 0.1;
            component.rotation = bytes.readShort();
            component.scaleX = bytes.readByte() * 0.1;
            component.scaleY = bytes.readByte() * 0.1;
            component.layerID = bytes.readByte();
        };
        UIReadManager.prototype.readUIData = function (build, model) {
            var bytes = devil.Manager.pool.create(devil.ByteArrayExtend);
            bytes.setArrayBuffer(build);
            bytes.position = 0;
            var canvasLen = bytes.readShort();
            for (var i = 0; i < canvasLen; i++) {
                this.readTxtData(bytes, model);
            }
            // console.log("UIReadManager.readUIData",canvasLen);
            if (bytes.bytesAvailable)
                devil.Model.resConfig.parseConfig(bytes, null);
            bytes.pool();
        };
        UIReadManager.prototype.readTxtData = function (bytes, model) {
            var version = bytes.readUTF();
            var name = bytes.readUTF();
            var len = bytes.readShort();
            var data = new devil.ByteArrayExtend();
            bytes.readBytes(data, 0, len);
            model.addCanvas(data, name, version);
        };
        return UIReadManager;
    }());
    devil.UIReadManager = UIReadManager;
})(devil || (devil = {}));
var devil;
(function (devil) {
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
    var ViewManager = /** @class */ (function () {
        function ViewManager() {
            this._openningViews = {};
            this._modalViews = {};
            this._singleViews = {};
            this._multeViews = {};
            this._thirdViews = {};
            this._openningModalViews = new devil.Dictionary();
            this._textures = {};
            this._relativeViews = {};
            this._modal = devil.Manager.component.createImage(devil.LibConst.MODE_TEXTURE_NAME, 0, 0, devil.Manager.stage.width, devil.Manager.stage.height);
            this._modal.alpha = 0.8;
            this._modal.layers[0].addEventListener(egret.TouchEvent.TOUCH_TAP, this.___touchTap, this);
            this._modal.touchEnabled = true;
            devil.Manager.stage.add(this.___resize, this);
        }
        /**
         * 注册单开面板
         */
        ViewManager.prototype.registerSingleView = function (viewID, cls, textureName, modal) {
            if (textureName === void 0) { textureName = null; }
            if (modal === void 0) { modal = false; }
            this._modalViews[viewID] = modal;
            this._singleViews[viewID] = cls;
            this._textures[viewID] = textureName;
        };
        /**
         * 注册多开视图
         * @textureName  是否先加载贴图再打开
         */
        ViewManager.prototype.registerMulteView = function (viewID, cls, modal, textureName) {
            if (modal === void 0) { modal = false; }
            if (textureName === void 0) { textureName = null; }
            this._modalViews[viewID] = modal;
            this._multeViews[viewID] = cls;
            this._textures[viewID] = textureName;
        };
        /**
         * 三级视图
         * @textureName  是否先加载贴图再打开
         */
        ViewManager.prototype.registerThirdView = function (viewID, cls, modal, textureName) {
            if (modal === void 0) { modal = false; }
            if (textureName === void 0) { textureName = null; }
            this._modalViews[viewID] = modal;
            this._thirdViews[viewID] = cls;
            this._textures[viewID] = textureName;
        };
        /**
         * 添加关联界面,主要是当主界面关闭时会关闭关联界面
         * @param viewID
         */
        ViewManager.prototype.registerRelativeView = function (mainViewID, subViewID1, subViewID2) {
            var subViewIDs = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                subViewIDs[_i - 3] = arguments[_i];
            }
            var relativeViews = this._relativeViews[mainViewID];
            if (!relativeViews) {
                relativeViews = [];
                this._relativeViews[mainViewID] = relativeViews;
            }
            relativeViews.push(subViewID1);
            relativeViews.push(subViewID2);
            if (subViewIDs) {
                for (var _a = 0, subViewIDs_1 = subViewIDs; _a < subViewIDs_1.length; _a++) {
                    var viewID = subViewIDs_1[_a];
                    relativeViews.push(viewID);
                }
            }
        };
        /**
         * 获取指定ID的视图
         */
        ViewManager.prototype.getView = function (viewID) {
            return this._openningViews[viewID];
        };
        /**
         * 是否正在打开指定的ID的视图
         */
        ViewManager.prototype.isOpenning = function (viewID) {
            return !!this._openningViews[viewID];
        };
        /**
         * 是否有单开视图打开
         */
        ViewManager.prototype.isOpeningSingleView = function () {
            var keys = Object.keys(this._openningViews);
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                if (!!this._singleViews[keys[i]])
                    return true;
            }
            return false;
        };
        /**
         * 打开或关闭切换
         */
        ViewManager.prototype.switch = function (viewID, showLoading) {
            if (showLoading === void 0) { showLoading = false; }
            if (this.isOpenning(viewID)) {
                this.hide(viewID);
                return null;
            }
            else
                return this.show(viewID, showLoading);
        };
        ViewManager.prototype.show = function (viewID, showLoading) {
            if (showLoading === void 0) { showLoading = false; }
            var view;
            var that = this;
            function ___textureLoading(loader) {
                devil.ViewLoading.getInstance().hide();
                devil.Manager.loader.remove(loader.getPath(), ___textureLoading, this);
                if (that._openningViews[viewID] == view)
                    that.showView(viewID, view);
            }
            view = this._openningViews[viewID];
            if (view != null)
                return view;
            if (showLoading && this._textures[viewID] != null) {
                var path = devil.PathInfo.getPath(this._textures[viewID], devil.LoaderType.TEXTURE);
                if (!devil.Manager.loader.has(path)) {
                    devil.ViewLoading.getInstance().show();
                    view = this.createView(viewID);
                    devil.Manager.loader.load(path, ___textureLoading, this, devil.ResourceGCType.COMMON, devil.ResPriorityType.LOAD_LEVEL5);
                    return view;
                }
                else {
                    return this.open(viewID);
                }
            }
            else {
                return this.open(viewID);
            }
        };
        /**
         * 关闭界面
         * @param viewID
         * @param fromModal 当是模态窗口时，点击黑色背景时，则值为true，默认是自动关闭界面，传入此参数可以阻止此默认操作。
         */
        ViewManager.prototype.hide = function (viewID, fromModal) {
            if (fromModal === void 0) { fromModal = false; }
            var view = this._openningViews[viewID];
            if (view != null) {
                if (view.hide(fromModal)) {
                    this._openningViews[viewID] = null;
                    if (this._openningModalViews.containsKey(viewID)) {
                        this._openningModalViews.remove(viewID);
                        if (this._modal) {
                            var hasModal = this._openningModalViews.keys().length > 0;
                            if (!hasModal)
                                this._modal.removeFromParent();
                            else
                                devil.Manager.layer.addUI(devil.LayerSubIndex.UI_ALERT_MODE, this._modal.layers[0]); //恢复到2层界面
                        }
                    }
                }
            }
        };
        /**
         * 检测关闭界面
         * @param hideViewID 要关闭的界面ID
         * @param relativeViewID 当前关联显示的主界面ID
         */
        ViewManager.prototype.checkHide = function (hideViewID, relativeViewID, fromModal) {
            if (fromModal === void 0) { fromModal = false; }
            var relativeViews = this._relativeViews[hideViewID];
            if (relativeViews) {
                for (var _i = 0, relativeViews_1 = relativeViews; _i < relativeViews_1.length; _i++) {
                    var viewID = relativeViews_1[_i];
                    if (viewID == relativeViewID)
                        continue;
                    if (this.isOpenning(viewID))
                        return;
                }
            }
            this.hide(hideViewID, fromModal);
        };
        ViewManager.prototype.setModalAlpha = function (alpha) {
            if (alpha === void 0) { alpha = 0.8; }
            this._modal.alpha = alpha;
        };
        /**
         * 关闭所有已打开界面
         */
        ViewManager.prototype.hideAll = function () {
            var keys = Object.keys(this._openningViews);
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                this.hide(keys[i]);
            }
        };
        ViewManager.prototype.createView = function (viewID) {
            var view;
            var cls = this._singleViews[viewID];
            if (!!cls) {
                for (var key in this._openningViews) {
                    if (!!this._singleViews[key])
                        this.hide(key);
                }
            }
            else
                cls = this._multeViews[viewID];
            if (!cls)
                cls = this._thirdViews[viewID];
            if (!!cls) {
                view = new cls();
                this._openningViews[viewID] = view;
            }
            return view;
        };
        ViewManager.prototype.showView = function (viewID, view) {
            var modal = this._modalViews[viewID];
            if (modal) {
                if (this._multeViews[viewID] != null || this._singleViews[viewID] != null)
                    devil.Manager.layer.addUI(devil.LayerSubIndex.UI_ALERT_MODE, this._modal.layers[0]);
                else if (this._thirdViews[viewID] != null)
                    devil.Manager.layer.addUI(devil.LayerSubIndex.UI_ALERT_MODE2, this._modal.layers[0]);
                this._openningModalViews.add(viewID, true);
            }
            view.show();
        };
        ViewManager.prototype.open = function (viewID) {
            var view = this.createView(viewID);
            this.showView(viewID, view);
            return view;
        };
        ViewManager.prototype.___touchTap = function (e) {
            var viewIDs = this._openningModalViews.keys();
            var length = viewIDs.length;
            for (var i = length - 1; i >= 0; --i) {
                this.hide(viewIDs[i], true);
                break;
            }
        };
        ViewManager.prototype.___resize = function (width, height) {
            this._modal.width = width;
            this._modal.height = height;
        };
        return ViewManager;
    }());
    devil.ViewManager = ViewManager;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 广告管理器
     * @author        devil
     * @version       V20200909
     * @create        2020-09-09
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var WXADManger = /** @class */ (function () {
        function WXADManger() {
        }
        // public get bannerShow()
        // {
        //     return this._bannerShow;
        // }
        WXADManger.prototype.setup = function (bannerID, jiliID, chapingID) {
            this._banner = false;
            this.createBanner(bannerID);
            this.createJiLi(jiliID);
            this.createChaPing(chapingID);
        };
        WXADManger.prototype.createBanner = function (bannerID) {
            var windowWidth = wx.getSystemInfoSync().windowWidth;
            var windowHeight = wx.getSystemInfoSync().windowHeight;
            var width = Math.min(windowWidth, 300);
            // 创建 Banner 广告实例，提前初始化
            var ad = wx.createBannerAd({
                adUnitId: bannerID,
                adIntervals: 30,
                style: {
                    left: 0,
                    top: 0,
                    width: width,
                }
            });
            ad.onResize(function (size) {
                ad.style.left = (windowWidth - size.width) >> 1;
                ad.style.top = windowHeight - size.height;
            });
            ad.onError(function (err) {
                console.log(err);
            });
            this._banner = ad;
        };
        WXADManger.prototype.createJiLi = function (jiliID) {
            var ad = wx.createRewardedVideoAd({
                adUnitId: jiliID
            });
            ad.onError(function (err) {
                console.log(err);
                // callBack.apply(target,true);
            });
            this._jili = ad;
        };
        WXADManger.prototype.createChaPing = function (chapingID) {
            var ad;
            // 定义插屏广告
            // 创建插屏广告实例，提前初始化
            if (wx.createInterstitialAd) {
                ad = wx.createInterstitialAd({
                    adUnitId: chapingID
                });
                ad.onError(function (err) {
                    console.log(err);
                });
            }
            this._chaping = ad;
        };
        /**
         * 打开激励广告
         */
        WXADManger.prototype.openJiLi = function (callBack, target) {
            var ad = this._jili;
            // 用户触发广告后，显示激励视频广告
            ad.show().catch(function () {
                // 失败重试
                ad.load()
                    .then(function () { return ad.show(); })
                    .catch(function (err) {
                    console.log('激励视频 广告显示失败');
                    callBack.apply(target, [true]);
                });
            });
            ad.onClose(function (res) {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    callBack.apply(target, [true]);
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                    callBack.apply(target, [false]);
                }
            });
        };
        /**
         * 打开插屏广告
         */
        WXADManger.prototype.openChaPing = function () {
            var ad = this._chaping;
            // 在适合的场景显示插屏广告
            if (ad) {
                ad.show().catch(function (err) {
                    console.error(err);
                });
            }
        };
        /**
         * 打开或关闭Banner广告
         * @param show
         */
        WXADManger.prototype.switchBanner = function (show) {
            if (this._bannerShow == show)
                return;
            this._bannerShow = show;
            if (this._banner != null) {
                if (!show)
                    this._banner.hide();
                else
                    this._banner.show();
            }
        };
        return WXADManger;
    }());
    devil.WXADManger = WXADManger;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 微信管理器
     * @author        devil
     * @version       V20200906
     * @create        2020-09-06
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var WXManager = /** @class */ (function () {
        function WXManager() {
        }
        /**
         * 发送朋友设置
         * @param titles    分享时设置的标题
         * @param imageURL  分享图片设置，默认值为resource/assets/share/share.png(330*237)
         */
        WXManager.prototype.onShareAppMessage = function (titles, imageURL) {
            imageURL = !!imageURL ? imageURL : "resource/assets/share/share.png";
            wx.showShareMenu({
                withShareTicket: true,
                menus: ['shareAppMessage', 'shareTimeline']
            });
            wx.onShareAppMessage(function () {
                // 用户点击了“转发”按钮
                return {
                    title: devil.ArrayUtil.random(titles),
                    imageUrl: imageURL,
                    success: function (res) {
                        console.log("share succ");
                    }
                };
            });
        };
        /**
         * 初始化本地缓存数据
         * @param nickName 玩家昵称
         * @param gameName 游戏名字
         * @param maxReceiveCount 默认赠送的免费复活次数，默认为0
         */
        WXManager.prototype.readLocation = function (maxReceiveCount) {
            if (maxReceiveCount === void 0) { maxReceiveCount = 0; }
            // let pre:string = Model.wxGame.nickName + "_" + Model.wxGame.gameName + "_";
            var pre = devil.Model.wxGame.userInfo.nickName + "_" + devil.Model.wxGame.gameName + "_";
            var refreshTime = wx.getStorageSync(pre + "refreshTime");
            refreshTime = refreshTime ? refreshTime : 0;
            var date = new Date();
            date.setTime(Number(refreshTime));
            var receiveCount = maxReceiveCount;
            var hasReceiveCount = 0;
            if (devil.DateUtil.disDay(new Date(), date) < 0) {
                receiveCount = wx.getStorageSync(pre + "receiveCount");
                hasReceiveCount = wx.getStorageSync(pre + "hasReceiveCount");
            }
            devil.Model.wxGame.receiveFreeCount = receiveCount ? receiveCount : maxReceiveCount;
            devil.Model.wxGame.hasReceiveFreeCount = hasReceiveCount ? hasReceiveCount : 0;
            this.writeLocation();
        };
        WXManager.prototype.writeLocation = function () {
            this.writeHasReceiveFreeCount();
            this.writeReceiveFreeCount();
        };
        WXManager.prototype.writeReceiveFreeCount = function () {
            var pre = devil.Model.wxGame.userInfo.nickName + "_" + devil.Model.wxGame.gameName + "_";
            // console.log("中华人民共和国",Model.wxGame.receiveFreeCount)
            wx.setStorageSync(pre + "receiveCount", devil.Model.wxGame.receiveFreeCount);
            wx.setStorageSync(pre + "refreshTime", new Date().getTime());
        };
        WXManager.prototype.writeHasReceiveFreeCount = function () {
            var pre = devil.Model.wxGame.userInfo.nickName + "_" + devil.Model.wxGame.gameName + "_";
            wx.setStorageSync(pre + "hasReceiveCount", devil.Model.wxGame.hasReceiveFreeCount);
            wx.setStorageSync(pre + "refreshTime", new Date().getTime());
        };
        /**
         * 打开其它的小游戏
         * @param appID
         */
        WXManager.prototype.navigateToMiniProgram = function (appID) {
            wx.navigateToMiniProgram({
                appId: appID,
                path: "",
                extraData: {}
            });
        };
        WXManager.prototype.loginRank = function (image, x, y, width, height, sucess, target) {
            if (devil.Model.wxGame.userInfo == null) {
                var button_1 = wx.createUserInfoButton({
                    type: 'image',
                    image: image,
                    style: {
                        left: x,
                        top: y,
                        width: width,
                        height: height
                    }
                });
                button_1.onTap(function (res) {
                    if (res.errMsg == "getUserInfo:ok") {
                        button_1.destroy();
                        var userInfo = new devil.UserInfo();
                        userInfo.parse(res.userInfo);
                        devil.Model.wxGame.userInfo = userInfo;
                        if (!!sucess)
                            sucess.call(target);
                    }
                    else {
                        console.log("授权失败");
                    }
                });
            }
            else {
                if (!!sucess)
                    sucess.apply(target);
            }
        };
        /**
         * 创建开始按钮
         * @param x 设计尺寸上的水平坐标
         * @param y 设计尺寸上的垂直坐标
         * @param width 设计尺寸的宽度
         * @param height 设计尺寸的高度
         */
        WXManager.prototype.login = function (image, x, y, width, height, game_id, sucess, target) {
            var that = this;
            var code;
            var button = wx.createUserInfoButton({
                type: 'image',
                image: image,
                style: {
                    left: x / devil.Manager.stage.width * wx.getSystemInfoSync().windowWidth,
                    top: y / devil.Manager.stage.height * wx.getSystemInfoSync().windowHeight,
                    width: width / devil.Manager.stage.width * wx.getSystemInfoSync().windowWidth,
                    height: height / devil.Manager.stage.width * wx.getSystemInfoSync().windowWidth,
                }
            });
            button.onTap(function (res) {
                if (res.errMsg == "getUserInfo:ok") {
                    button.destroy();
                    if (devil.Model.wxGame.userInfo == null) {
                        // let userInfo = new UserInfo();
                        // userInfo.parse(res.userInfo);
                        // Model.wxGame.userInfo = userInfo;
                        that.$login(res, game_id);
                    }
                    if (!!sucess)
                        sucess.call(target, [code]);
                }
                else {
                    console.log("授权失败");
                }
            });
            wx.login({
                success: function (res) {
                    code = res.code;
                    devil.Model.wxGame.code = code;
                    wx.getSetting({
                        success: function (res) {
                            if (res.authSetting["scope.userInfo"]) {
                                wx.getUserInfo({
                                    success: function (res) {
                                        // let userInfo = new UserInfo();
                                        // userInfo.parse(res.userInfo);
                                        // Model.wxGame.userInfo = userInfo;
                                        that.$login(res, game_id);
                                    }
                                });
                            }
                        }
                    });
                }
            });
        };
        /**
         * 游戏列表
         */
        WXManager.prototype.list = function (callBack, target, appid) {
            if (devil.Model.wxGame.list.length > 0) {
                callBack.call(target);
                return;
            }
            var loader = devil.Manager.loader.load(devil.PathInfo.getPath("https://www.devil0629.com/api/game/list", devil.LoaderType.TEXT, true, Math.random().toString()), ___list, this, devil.ResourceGCType.NOW);
            loader.post({ "platform_id": 2 });
            function ___list(loader) {
                devil.Manager.loader.remove(loader.getPath(), ___list, this);
                var json = JSON.parse(loader.text);
                devil.Model.wxGame.list = json.result;
                for (var i = 0; i < devil.Model.wxGame.list.length; i++) {
                    if (appid == devil.Model.wxGame.list[i].appid) {
                        devil.Model.wxGame.list.splice(i, 1);
                        break;
                    }
                }
                devil.ArrayUtil.randomSort(devil.Model.wxGame.list);
                devil.Model.wxGame.list = devil.ArrayUtil.sortOn(devil.Model.wxGame.list, ["rec_degree"], [1]);
                // console.log("中华人民共和国",Model.wxGame.list);
                callBack.call(target);
            }
        };
        /**
         *
         * 初始化开关
         * @param callBack
         * @param target
         * @param id 1.魔法之触
         */
        WXManager.prototype.initCtrl = function (callBack, target, id) {
            if (!!devil.Model.wxGame.gameCtrl) {
                callBack.call(target);
                return;
            }
            var loader = devil.Manager.loader.load(devil.PathInfo.getPath("https://www.devil0629.com/api/game/init", devil.LoaderType.TEXT, true, Math.random().toString()), ___init, this, devil.ResourceGCType.NOW);
            loader.post({ "game_id": id });
            function ___init(loader) {
                devil.Manager.loader.remove(loader.getPath(), ___init, this);
                var json = JSON.parse(loader.text);
                devil.Model.wxGame.masterCtrl = json.result.masterCtrl == "1";
                devil.Model.wxGame.gameCtrl = json.result.gameCtrl;
                callBack.call(target);
            }
        };
        /**
         * 登录后台接口
         */
        WXManager.prototype.$login = function (res, game_id) {
            var userInfo = new devil.UserInfo();
            userInfo.parse(res.userInfo);
            devil.Model.wxGame.userInfo = userInfo;
            var loader = devil.Manager.loader.load(devil.PathInfo.getPath("https://www.devil0629.com/api/get/member", devil.LoaderType.TEXT, true, Math.random().toString()), ___$getMemeber, this, devil.ResourceGCType.NOW);
            loader.post({ "code": devil.Model.wxGame.code, "anonymousCode": "", "app_name": "weixin", "game_id": game_id, "platform_id": 2, "device": "无" });
            function ___$getMemeber(loader) {
                devil.Manager.loader.remove(loader.getPath(), ___$getMemeber, this);
                var json = JSON.parse(loader.text);
                devil.Model.wxGame.openID = json.result.id;
                // console.log("中华人民共和国",json,userInfo);
                loader = devil.Manager.loader.load(devil.PathInfo.getPath("https://www.devil0629.com/api/update/member", devil.LoaderType.TEXT, true, Math.random().toString()), ___$login, this, devil.ResourceGCType.NOW);
                loader.post({ "member_id": devil.Model.wxGame.openID, "userInfo": userInfo });
                function ___$login(loader) {
                    devil.Manager.loader.remove(loader.getPath(), ___$login, this);
                }
            }
        };
        WXManager.prototype.saveScore = function (member_id, score, game_id) {
            devil.Manager.render.add(this.___$saveRender, this, 5000, 1, null, true, member_id, score, game_id);
        };
        WXManager.prototype.___$saveRender = function (interval, member_id, score, game_id) {
            var loader = devil.Manager.loader.load(devil.PathInfo.getPath("https://www.devil0629.com/api/save/score", devil.LoaderType.TEXT, true, Math.random().toString()), ___$save, this, devil.ResourceGCType.NOW);
            loader.post({ "member_id": member_id, "score": score, "game_id": game_id, "app_name": "weixin", "platform_id": 2 });
            function ___$save(loader) {
                // console.log("上传分数",score);
                devil.Manager.loader.remove(loader.getPath(), ___$save, this);
            }
        };
        return WXManager;
    }());
    devil.WXManager = WXManager;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 数据表
     * @author        devil
     * @version       V20190222
     * @create        2019-02-22
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var CVOModel = /** @class */ (function () {
        function CVOModel() {
            this._dic = {};
        }
        CVOModel.prototype.parse = function (source) {
            // let data:egret.ByteArray = source instanceof ArrayBuffer ?  new egret.ByteArray(source, source.byteLength) : source;
            var data;
            if (source instanceof ArrayBuffer) {
                data = devil.Manager.pool.createByteArray();
                data.buffer = source;
            }
            else {
                data = source;
            }
            var name;
            var len;
            var bytes;
            var current = 0;
            var count = data.readByte();
            while (current < count) {
                current++;
                name = data.readUTF();
                len = data.readInt();
                // bytes = new egret.ByteArray();
                bytes = devil.Manager.pool.createByteArray();
                bytes.writeBytes(data, data.position, len);
                data.position += len;
                bytes.position = 0;
                this._dic[name] = bytes;
            }
            // data.clear();
            devil.Manager.pool.pushByteArray(data);
        };
        CVOModel.prototype.getCVOData = function (name) {
            return this._dic[name];
        };
        CVOModel.prototype.clearCVOData = function (name) {
            devil.Manager.pool.pushByteArray(this._dic[name]);
            delete this._dic[name];
        };
        return CVOModel;
    }());
    devil.CVOModel = CVOModel;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 面板数据
     * @author        devil
     * @version       V20190223
     * @create        2019-02-23
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var CanvasModel = /** @class */ (function () {
        function CanvasModel() {
            this._canvases = {};
            this._versions = {};
        }
        Object.defineProperty(CanvasModel.prototype, "canvases", {
            get: function () {
                return this._canvases;
            },
            enumerable: false,
            configurable: true
        });
        CanvasModel.prototype.getBytes = function (name) {
            return this._canvases[name];
        };
        CanvasModel.prototype.getVersion = function (name) {
            return this._versions[name];
        };
        CanvasModel.prototype.addCanvas = function (bytes, name, version) {
            this._canvases[name] = bytes;
            this._versions[name] = version;
        };
        /**
         * 清空数据
         */
        CanvasModel.prototype.clear = function () {
            for (var i in this._canvases) {
                this._canvases[i] = null;
            }
            this._canvases = {};
            for (var j in this._versions) {
                this._versions[j] = null;
            }
            this._versions = {};
        };
        return CanvasModel;
    }());
    devil.CanvasModel = CanvasModel;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 数据
     * @author        devil
     * @version       V20190131
     * @create        2019-01-31
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var Model = /** @class */ (function () {
        function Model() {
        }
        Model.setup = function () {
            this.canvas = new devil.CanvasModel();
            this.cvo = new devil.CVOModel();
            this.lifecyclePause = false;
            this.wxGame = new devil.WXGameModel();
            this.resConfig = new devil.ResourceConfig2();
        };
        return Model;
    }());
    devil.Model = Model;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 小游戏通用数据
     * @author        devil
     * @version       V20200906
     * @create        2020-09-06
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var WXGameModel = /** @class */ (function () {
        function WXGameModel() {
            this.gameName = "game";
            /**
             * 后台总开关
             */
            this.masterCtrl = false;
            this.list = [];
            this._receiveFreeCount = 0;
            this._hasReceiveFreeCount = 0;
        }
        Object.defineProperty(WXGameModel.prototype, "leftReceiveCount", {
            get: function () {
                var result = (this._receiveFreeCount - this._hasReceiveFreeCount);
                return result < 0 ? 0 : result;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 获取游戏开关
         * @param key
         */
        WXGameModel.prototype.getGameCtrl = function (key) {
            return this.gameCtrl ? this.gameCtrl[key] == "1" : false;
        };
        Object.defineProperty(WXGameModel.prototype, "receiveFreeCount", {
            get: function () {
                return this._receiveFreeCount;
            },
            set: function (value) {
                if (this._receiveFreeCount == value)
                    return;
                this._receiveFreeCount = value;
                devil.Manager.wx.writeReceiveFreeCount();
                devil.Manager.event.dispatchEvent(new devil.WXGameEvent(devil.WXGameEvent.UPDATE_RECEIVE_COUNT));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WXGameModel.prototype, "hasReceiveFreeCount", {
            get: function () {
                return this._hasReceiveFreeCount;
            },
            set: function (value) {
                value = devil.MathUtil.clamb(0, this._receiveFreeCount, value);
                if (this._hasReceiveFreeCount == value)
                    return;
                this._hasReceiveFreeCount = value;
                devil.Manager.wx.writeHasReceiveFreeCount();
                devil.Manager.event.dispatchEvent(new devil.WXGameEvent(devil.WXGameEvent.UPDATE_RECEIVE_COUNT));
            },
            enumerable: false,
            configurable: true
        });
        return WXGameModel;
    }());
    devil.WXGameModel = WXGameModel;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 微信用户信息
     * @author        devil
     * @version       V20200906
     * @create        2020-09-24
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var UserInfo = /** @class */ (function () {
        function UserInfo() {
        }
        UserInfo.prototype.parse = function (data) {
            // console.log("userInof",data);
            this.nickName = data.nickName;
            this.avatarUrl = data.avatarUrl;
            this.gender = data.gender;
            this.country = data.country;
            this.province = data.province;
            this.city = data.city;
        };
        return UserInfo;
    }());
    devil.UserInfo = UserInfo;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 协议处理基类
     * @author devil
     * @version V20180728
     * @create V20180728
     * @place guangzhou
     * @QQ    101644277
     */
    var BaseCMD = /** @class */ (function () {
        function BaseCMD() {
        }
        Object.defineProperty(BaseCMD.prototype, "protocol", {
            get: function () {
                return this._protocol;
            },
            enumerable: false,
            configurable: true
        });
        BaseCMD.prototype.receive = function (pkg) { };
        BaseCMD.prototype.processOut = function (pkg) { };
        Object.defineProperty(BaseCMD.prototype, "canSend", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        BaseCMD.prototype.send = function () {
            if (this.canSend) {
                var out = devil.TCPPacketOut.create(this._protocol);
                this.processOut(out);
                devil.Manager.socket.send(out);
            }
        };
        return BaseCMD;
    }());
    devil.BaseCMD = BaseCMD;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 字节数组扩展，为了使用某些版本的ie可以连上
     * ArrayBuffer转成ByteArrayExtend 使用setArrayBuffer不要使用构造函数
     * @author        devil
     * @version       V20190311
     * @create        20180726
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ByteArrayExtend = /** @class */ (function (_super_1) {
        __extends(ByteArrayExtend, _super_1);
        function ByteArrayExtend() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        Object.defineProperty(ByteArrayExtend.prototype, "buffer", {
            get: function () {
                return this.data.buffer;
            },
            /**
             * @private
             */
            set: function (value) {
                var wpos = value.byteLength;
                var uint8 = new Uint8Array(value);
                var bufferExtSize = this.bufferExtSize;
                var bytes;
                if (bufferExtSize == 0) {
                    bytes = new Uint8Array(wpos);
                }
                else {
                    var multi = (wpos / bufferExtSize | 0) + 1;
                    bytes = new Uint8Array(multi * bufferExtSize);
                }
                bytes.set(uint8);
                this.write_position = wpos;
                this._bytes = bytes;
                this.data = new DataView(bytes.buffer);
            },
            enumerable: false,
            configurable: true
        });
        ByteArrayExtend.prototype.setArrayBuffer = function (buffer) {
            this._position = 0;
            this.write_position = buffer.byteLength;
            this.buffer = buffer;
            this._position = 0;
        };
        ByteArrayExtend.prototype.readInt64 = function () {
            return this.readInt() * Math.pow(2, 32) + this.readUnsignedInt();
        };
        ByteArrayExtend.prototype.writeInt64 = function (value) {
            this.writeInt(value / 0xffffffff);
            this.writeUnsignedInt(value);
        };
        ByteArrayExtend.prototype.writeUTF = function (value) {
            if (value != null)
                _super_1.prototype.writeUTF.call(this, value);
            else
                _super_1.prototype.writeUTF.call(this, "");
        };
        ByteArrayExtend.prototype.pool = function () {
            this.endian = egret.Endian.BIG_ENDIAN;
            devil.Manager.pool.push(this);
        };
        ByteArrayExtend.prototype.unuse = function () {
            this.clear();
        };
        ByteArrayExtend.prototype.reuse = function () {
        };
        ByteArrayExtend.prototype.dispose = function () {
            this.clear();
        };
        return ByteArrayExtend;
    }(egret.ByteArray));
    devil.ByteArrayExtend = ByteArrayExtend;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * @author        devil
     * @version       V20190311
     * @create        2019-03-11
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var TCPPacketIn = /** @class */ (function (_super_1) {
        __extends(TCPPacketIn, _super_1);
        function TCPPacketIn() {
            return _super_1.call(this) || this;
        }
        Object.defineProperty(TCPPacketIn.prototype, "protocol", {
            get: function () {
                return this._protocol;
            },
            set: function (value) {
                this._protocol = value;
            },
            enumerable: false,
            configurable: true
        });
        return TCPPacketIn;
    }(devil.ByteArrayExtend));
    devil.TCPPacketIn = TCPPacketIn;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 发送协议包头
     * @author        devil
     * @version       V20190311
     * @create        20180726
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var TCPPacketOut = /** @class */ (function (_super_1) {
        __extends(TCPPacketOut, _super_1);
        function TCPPacketOut() {
            return _super_1.call(this) || this;
        }
        TCPPacketOut.prototype.writePacketLenAndVerify = function () {
            this.position = 0;
            this.writeShort(this.length - TCPPacketOut.COMMON_TOTAL_LEN);
            this.position = TCPPacketOut.LENGTH_LEN + TCPPacketOut.PROTOCOL_LEN;
            this.writeByte(devil.Manager.socket.verify);
            devil.Manager.socket.addVerify();
            this.position = 0;
        };
        TCPPacketOut.create = function (protocol) {
            var result = devil.Manager.pool.create(TCPPacketOut);
            result.position = TCPPacketOut.LENGTH_LEN;
            result.protocol = protocol;
            result.writeShort(protocol);
            result.position = TCPPacketOut.LENGTH_LEN + TCPPacketOut.PROTOCOL_LEN + TCPPacketOut.VERIFY_LEN;
            return result;
        };
        TCPPacketOut.LENGTH_LEN = 2; //协议长度占用字节数
        TCPPacketOut.PROTOCOL_LEN = 2; //协议号占用字节数
        TCPPacketOut.VERIFY_LEN = 1; //验证字段占用字节数
        TCPPacketOut.COMMON_TOTAL_LEN = 5; //需要忽略的公共协议头(2字节长度+2字节协议号+1字节服务器验证)长度
        return TCPPacketOut;
    }(devil.ByteArrayExtend));
    devil.TCPPacketOut = TCPPacketOut;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 画布、界面、面板
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var Canvas = /** @class */ (function (_super_1) {
        __extends(Canvas, _super_1);
        function Canvas() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.CANVAS;
            return _this;
        }
        /**
         * 解析数据
         */
        Canvas.prototype.read = function (bytes, version) {
            bytes.position = 0;
            this.setSize(bytes.readShort(), bytes.readShort());
            this.readChildren(bytes, version);
        };
        /**
         * 编辑器子类重写
         * @param bytes
         * @param version
         */
        Canvas.prototype.readChildren = function (bytes, version) {
            var numChildren = bytes.readByte();
            // console.log("Canvas",numChildren);
            for (var i = 0; i < numChildren; i++) {
                devil.Manager.uiRead.read(this, bytes, version, this.setProperty, this);
            }
            this.readDataComplete();
        };
        return Canvas;
    }(devil.Container));
    devil.Canvas = Canvas;
})(devil || (devil = {}));
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
            enumerable: false,
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
var devil;
(function (devil) {
    /**
     * 图片组件
     * @author        devil
     * @version       V20190131
     * @create        2019-01-31
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var Image = /** @class */ (function (_super_1) {
        __extends(Image, _super_1);
        function Image() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.IMAGE;
            return _this;
        }
        Object.defineProperty(Image.prototype, "bitmap", {
            get: function () {
                return this._bitmap;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "scale9Grid", {
            get: function () {
                return this._bitmap.scale9Grid;
            },
            /**
             * 九宫格
             */
            set: function (value) {
                this._bitmap.scale9Grid = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "source", {
            /**
             * 图片源数据
             */
            get: function () {
                return this._source;
            },
            set: function (value) {
                if (this._source == value)
                    return;
                this._bitmap.texture = null;
                if (this._path) {
                    devil.Manager.loader.remove(this._path, this.___complete, this);
                    this._path = null;
                }
                this._source = value;
                if (this._source != null && this._source != "") {
                    if (this._source instanceof egret.Texture) {
                        if (this._width == -1)
                            this._width = this._source.textureWidth;
                        if (this._height == -1)
                            this._height = this._source.textureHeight;
                        this.invalidate(devil.InvalidationType.SIZE);
                    }
                    this.invalidate(devil.InvalidationType.DATA);
                }
            },
            enumerable: false,
            configurable: true
        });
        Image.prototype.initLayer = function () {
            this._layer = this.createLayer();
        };
        /**
         * @private
         */
        Image.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._width = -1;
            this._height = -1;
            this._bitmap = devil.Manager.pool.createBitmap();
            this._layer.addChild(this._bitmap);
        };
        Image.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(devil.InvalidationType.DATA))
                this.drawData();
            if (this.isInvalid(devil.InvalidationType.SIZE))
                this.drawSize();
        };
        Image.prototype.drawSize = function () {
            if (this._bitmap.texture != null) {
                this._bitmap.width = this._width;
                this._bitmap.height = this._height;
            }
        };
        Image.prototype.drawData = function () {
            if (this._source instanceof egret.Texture) {
                this._bitmap.texture = this._source;
            }
            else {
                if (this._source != null && this._source != "") {
                    this._path = devil.PathInfo.getPath(devil.Model.resConfig.getURL(this._source), devil.LoaderType.TEXTURE);
                    devil.Manager.loader.load(this._path, this.___complete, this, devil.ResourceGCType.COMMON, devil.ResPriorityType.LOAD_LEVEL5);
                }
            }
        };
        Image.prototype.unuse = function () {
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.___touchTap, this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___touchBegin, this);
            this._source = null;
            devil.Manager.pool.pushBitmap(this._bitmap);
            this._bitmap = null;
            this._layer = null;
            if (this._completeFun != null) {
                this._completeFun.pool();
                this._completeFun = null;
            }
            if (this._path) {
                devil.Manager.loader.remove(this._path, this.___complete, this);
                this._path = null;
            }
            if (this._clickFun != null) {
                this._clickFun.pool();
                this._clickFun = null;
            }
            if (!!this._downFun) {
                this._downFun.pool();
                this._downFun = null;
            }
            _super_1.prototype.unuse.call(this);
        };
        Image.prototype.dispose = function () {
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.___touchTap, this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___touchBegin, this);
            this._source = null;
            devil.Manager.pool.pushBitmap(this._bitmap);
            this._bitmap = null;
            this._layer = null;
            if (this._completeFun != null) {
                this._completeFun.pool();
                this._completeFun = null;
            }
            if (this._path) {
                devil.Manager.loader.remove(this._path, this.___complete, this);
                this._path = null;
            }
            if (this._clickFun != null) {
                this._clickFun.pool();
                this._clickFun = null;
            }
            if (!!this._downFun) {
                this._downFun.pool();
                this._downFun = null;
            }
            _super_1.prototype.dispose.call(this);
        };
        /**
         * 加载完成的回调函数，参数为[TextureLoader,Image]
         * @param callBack
         * @param target
         */
        Image.prototype.__complete = function (callBack, target) {
            if (callBack != null && target != null)
                this._completeFun = devil.CallBackInfo.create(callBack, target);
        };
        Image.prototype.___complete = function (loader) {
            var texture = loader.getTexture(this._source);
            if (texture != null) {
                this._bitmap.texture = texture;
                this._width = this._width < 0 ? texture.textureWidth : this._width;
                this._height = this._height < 0 ? texture.textureHeight : this._height;
                this._bitmap.width = this._width;
                this._bitmap.height = this._height;
                this._invalid = this._invalid ^ devil.InvalidationType.SIZE;
                if (this._completeFun != null)
                    this._completeFun.runCallBack(loader, this);
            }
        };
        Image.prototype.__click = function (callBack, target) {
            this.touchEnabled = true;
            this._clickFun = devil.CallBackInfo.create(callBack, target);
            if (!this._layer.hasEventListener(egret.TouchEvent.TOUCH_TAP))
                this._layer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.___touchTap, this);
        };
        Image.prototype.__down = function (callBack, target) {
            this.touchEnabled = true;
            this._downFun = devil.CallBackInfo.create(callBack, target);
            if (!this._layer.hasEventListener(egret.TouchEvent.TOUCH_BEGIN))
                this._layer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___touchBegin, this);
        };
        Image.prototype.___touchTap = function (e) {
            if (this._clickFun)
                this._clickFun.runCallBack(e, this);
        };
        Image.prototype.___touchBegin = function (e) {
            if (!!this._downFun)
                this._downFun.runCallBack(e, this);
        };
        return Image;
    }(devil.Component));
    devil.Image = Image;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 加载外部图片视图组件
     * @author        devil
     * @version       V20190222
     * @create        2019-02-22
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ImageRemote = /** @class */ (function (_super_1) {
        __extends(ImageRemote, _super_1);
        function ImageRemote() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.IMAGE_REMOTE;
            return _this;
        }
        Object.defineProperty(ImageRemote.prototype, "url", {
            get: function () {
                return this._source;
            },
            set: function (value) {
                if (!(value instanceof devil.PathInfo))
                    this.source = value;
                else if (this._path != value) {
                    this.source = value != null ? value.key : null;
                    this._path = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ImageRemote.prototype, "source", {
            set: function (value) {
                if (this._source == value)
                    return;
                if (this._path) {
                    // this._bitmap.texture = null; // 加载过程还是不要清空了，闪一下效果不好看
                    devil.Manager.loader.remove(this._path, this.___complete, this);
                    this._path = null;
                }
                else {
                    this._bitmap.texture = null;
                }
                this._source = value;
                if (this._source != null && this._source != "")
                    this.invalidate(devil.InvalidationType.DATA);
            },
            enumerable: false,
            configurable: true
        });
        ImageRemote.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._width = -1;
            this._height = -1;
        };
        ImageRemote.prototype.drawData = function () {
            if (this._path == null && this._source != null && this._source != "") {
                this._path = devil.PathInfo.getPath(this._source, devil.LoaderType.IMAGE, false);
            }
            if (this._path != null)
                devil.Manager.loader.load(this._path, this.___complete, this, devil.ResourceGCType.COMMON, devil.ResPriorityType.LOAD_LEVEL5);
        };
        ImageRemote.prototype.___complete = function (loader) {
            var texture = loader.texture;
            if (texture != null) {
                this._bitmap.texture = texture;
                this._width = this._width < 0 ? texture.textureWidth : this._width;
                this._height = this._height < 0 ? texture.textureHeight : this._height;
                this._bitmap.width = this._width;
                this._bitmap.height = this._height;
                this._invalid = this._invalid ^ devil.InvalidationType.SIZE;
                if (this._completeFun != null)
                    this._completeFun.runCallBack(loader, this);
            }
        };
        return ImageRemote;
    }(devil.Image));
    devil.ImageRemote = ImageRemote;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 选中图标与背景图片合为一张背景图
     * @author        devil
     * @version       V20200118
     * @create        V2020-01-18
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var RadioButton = /** @class */ (function (_super_1) {
        __extends(RadioButton, _super_1);
        function RadioButton() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.RADIO_BUTTON;
            return _this;
        }
        RadioButton.prototype.setSelected = function (value) {
            this._common.selected = value;
        };
        RadioButton.prototype.getSelected = function () {
            return this._common.selected;
        };
        RadioButton.prototype.setSelector = function (value) {
            this._selector = value;
        };
        RadioButton.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._width = devil.ComponentDefault.RADIO_BUTTON_WIDTH;
            this._height = devil.ComponentDefault.RADIO_BUTTON_HEIGHT;
            this.setLabelOffset(this._width + 5, 0);
            this._label.align = egret.HorizontalAlign.LEFT;
        };
        RadioButton.prototype.drawSize = function () {
            this._currentBack.width = this._width;
            this._currentBack.height = this._height;
        };
        RadioButton.prototype.drawLayout = function () {
            this._labelX = this._width + this._labelOffsetX;
            this._labelY = ((this._height - this._label.height) >> 1) + this._labelOffsetY;
            this._label.move(this._labelX, this._labelY);
        };
        RadioButton.prototype.unuse = function () {
            this._selector = null;
            _super_1.prototype.unuse.call(this);
        };
        RadioButton.prototype.dispose = function () {
            this._selector = null;
            _super_1.prototype.dispose.call(this);
        };
        RadioButton.prototype.___handleEvent = function (e) {
            if (e.type == egret.TouchEvent.TOUCH_TAP) {
                if (this._common.selected)
                    return;
            }
            _super_1.prototype.___handleEvent.call(this, e);
            if (this._common.selected)
                this._selector.selectedView = this;
        };
        return RadioButton;
    }(devil.ButtonTextSelected));
    devil.RadioButton = RadioButton;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 文本框
     * @author        devil
     * @version       V20190213
     * @create        2019-02-13
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var Text = /** @class */ (function (_super_1) {
        __extends(Text, _super_1);
        function Text() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.TEXT;
            return _this;
        }
        Object.defineProperty(Text.prototype, "color", {
            /**
             * 颜色
             */
            get: function () {
                return this._textField.textColor;
            },
            set: function (value) {
                this._textField.textColor = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "bold", {
            /**
             * 是否加粗
             */
            get: function () {
                return this._textField.bold;
            },
            set: function (value) {
                this._textField.bold = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "size", {
            /**
             * 字体大小
             */
            get: function () {
                return this._textField.size;
            },
            set: function (value) {
                this._textField.size = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "text", {
            /**
             * 文本内容
             */
            get: function () {
                return this._textField.text;
            },
            set: function (value) {
                this._textField.text = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "align", {
            /**
             * 设置文本布局
             * @param value   egret.HorizontalAlign常量
             */
            get: function () {
                return this._textField.textAlign;
            },
            set: function (value) {
                this._textField.textAlign = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "editor", {
            /**
             * 是否可编辑
             */
            set: function (value) {
                if (value)
                    this._textField.type = egret.TextFieldType.INPUT;
                else
                    this._textField.type = egret.TextFieldType.DYNAMIC;
                this._textField.touchEnabled = value;
                this.touchChildren = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "textWidth", {
            get: function () {
                return this._textField.textWidth;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "textHeight", {
            get: function () {
                return this._textField.textHeight;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "wordWrap", {
            get: function () {
                return this._textField.wordWrap;
            },
            set: function (value) {
                this._textField.wordWrap = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "multiline", {
            get: function () {
                return this._textField.multiline;
            },
            set: function (value) {
                this._textField.multiline = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "verticalAlign", {
            set: function (value) {
                this._textField.verticalAlign = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "htmlText", {
            set: function (value) {
                this._textField.textFlow = (new egret.HtmlTextParser).parser(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "stroke", {
            set: function (value) {
                this._textField.stroke = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "strokeColor", {
            set: function (value) {
                this._textField.strokeColor = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "lineSpacing", {
            set: function (value) {
                this._textField.lineSpacing = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "border", {
            set: function (value) {
                this._textField.border = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "textType", {
            set: function (value) {
                this._textField.type = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "background", {
            set: function (value) {
                this._textField.background = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "backgroundColor", {
            set: function (value) {
                this._textField.backgroundColor = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "maxChars", {
            get: function () {
                return this._textField.maxChars;
            },
            set: function (value) {
                this._textField.maxChars = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "displayAsPassword", {
            get: function () {
                return this._textField.displayAsPassword;
            },
            set: function (value) {
                this._textField.displayAsPassword = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "restrict", {
            get: function () {
                return this._textField.restrict;
            },
            set: function (value) {
                this._textField.restrict = value;
            },
            enumerable: false,
            configurable: true
        });
        Text.prototype.initLayer = function () {
            this._layer = this.createLayer();
        };
        Text.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._width = devil.ComponentDefault.TEXT_WIDTH;
            this._height = devil.ComponentDefault.TEXT_HEIGHT;
            this._textField = devil.Manager.pool.createTextField();
            this._textField.verticalAlign = egret.VerticalAlign.MIDDLE;
            this._layer.addChild(this._textField);
        };
        Text.prototype.removeEvent = function () {
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.___click, this);
            this._textField.removeEventListener(egret.TextEvent.LINK, this.___link, this);
            this._textField.removeEventListener(egret.FocusEvent.FOCUS_IN, this.___focusIn, this);
            this._textField.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.___focusOut, this);
        };
        /**
         * @private
         */
        Text.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(devil.InvalidationType.SIZE))
                this.drawSize();
            ;
        };
        Text.prototype.drawSize = function () {
            this._textField.width = this._width;
            this._textField.height = this._height;
        };
        Text.prototype.appendText = function (text) {
            this._textField.appendText(text);
        };
        Text.prototype.setFocus = function () {
            this._textField.setFocus();
        };
        /**
         * @private
         */
        Text.prototype.unuse = function () {
            this.removeEvent();
            devil.Manager.pool.pushTextField(this._textField);
            this._textField = null;
            this._layer = null;
            if (this._clickFun)
                this._clickFun.pool();
            this._clickFun = null;
            if (this._linkFun)
                this._linkFun.pool();
            this._linkFun = null;
            if (this._focusInFun)
                this._focusInFun.pool();
            this._focusInFun = null;
            if (this._focusOutFun)
                this._focusOutFun.pool();
            this._focusOutFun = null;
            _super_1.prototype.unuse.call(this);
        };
        /**
         * @private
         */
        Text.prototype.dispose = function () {
            this.removeEvent();
            devil.Manager.pool.pushTextField(this._textField);
            this._textField = null;
            this._layer = null;
            if (this._clickFun)
                this._clickFun.pool();
            this._clickFun = null;
            if (this._linkFun)
                this._linkFun.pool();
            this._linkFun = null;
            if (this._focusInFun)
                this._focusInFun.pool();
            this._focusInFun = null;
            if (this._focusOutFun)
                this._focusOutFun.pool();
            this._focusOutFun = null;
            _super_1.prototype.dispose.call(this);
        };
        Text.prototype.__click = function (callBack, target) {
            this._layer.touchEnabled = true;
            if (!this._layer.hasEventListener(egret.TouchEvent.TOUCH_TAP))
                this._layer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.___click, this);
            this._clickFun = devil.CallBackInfo.create(callBack, target);
        };
        Text.prototype.___click = function (e) {
            if (this._clickFun != null)
                this._clickFun.runCallBack(e, this);
        };
        Text.prototype.__link = function (callBack, target) {
            this._textField.touchEnabled = true;
            if (!this._textField.hasEventListener(egret.TextEvent.LINK)) {
                this._textField.addEventListener(egret.TextEvent.LINK, this.___link, this);
            }
            this._linkFun = devil.CallBackInfo.create(callBack, target);
        };
        Text.prototype.___link = function (e) {
            if (this._linkFun != null)
                this._linkFun.runCallBack(e, this);
        };
        Text.prototype.__focusIn = function (callBack, target) {
            this._textField.touchEnabled = true;
            this._focusInFun = devil.CallBackInfo.create(callBack, target);
            if (!this._textField.hasEventListener(egret.FocusEvent.FOCUS_IN)) {
                this._textField.addEventListener(egret.FocusEvent.FOCUS_IN, this.___focusIn, this);
            }
        };
        Text.prototype.___focusIn = function (e) {
            if (this._focusInFun != null)
                this._focusInFun.runCallBack(e, this);
        };
        Text.prototype.__focusOut = function (callBack, target) {
            this._focusOutFun = devil.CallBackInfo.create(callBack, target);
            if (!this._textField.hasEventListener(egret.FocusEvent.FOCUS_OUT)) {
                this._textField.addEventListener(egret.FocusEvent.FOCUS_OUT, this.___focusOut, this);
            }
        };
        Text.prototype.___focusOut = function (e) {
            if (this._focusOutFun != null)
                this._focusOutFun.runCallBack(e, this);
        };
        return Text;
    }(devil.Component));
    devil.Text = Text;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * @description
     * @author        devil
     * @version       V20190413
     * @create        2019-04-13
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var TextInput = /** @class */ (function (_super_1) {
        __extends(TextInput, _super_1);
        function TextInput() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.TEXT_INPUT;
            return _this;
        }
        Object.defineProperty(TextInput.prototype, "editor", {
            get: function () {
                return this._editor;
            },
            set: function (value) {
                if (this._editor == value)
                    return;
                this._editor = value;
                this._text.editor = this._editor;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "text", {
            get: function () {
                if (this._text.text == this._prompt)
                    return "";
                return this._text.text;
            },
            set: function (value) {
                this._text.text = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "color", {
            get: function () {
                return this._text.color;
            },
            set: function (value) {
                this._text.color = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "bold", {
            get: function () {
                return this._text.bold;
            },
            set: function (value) {
                this._text.bold = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "size", {
            get: function () {
                return this._text.size;
            },
            set: function (value) {
                this._text.size = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "align", {
            get: function () {
                return this._text.align;
            },
            set: function (value) {
                this._text.align = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "enabled", {
            set: function (value) {
                if (this._enabled != value) {
                    this._enabled = value;
                    this.touchEnabled = this._enabled;
                    this.touchChildren = this._enabled;
                    this.invalidate(devil.InvalidationType.ENABLED);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "prompt", {
            get: function () {
                return this._prompt;
            },
            set: function (value) {
                this._prompt = value;
                if (!devil.StringUtil.isEmpty(this._prompt)) {
                    this._text.text = this._prompt;
                    this._text.displayAsPassword = false;
                    this._text.__focusIn(this.___focusIn, this);
                    this._text.__focusOut(this.___focusOut, this);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "maxChars", {
            get: function () {
                return this._text.maxChars;
            },
            set: function (value) {
                this._text.maxChars = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "displayAsPassword", {
            get: function () {
                return this._text.displayAsPassword;
            },
            set: function (value) {
                this._displayAsPassword = value;
                this._text.displayAsPassword = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "restrict", {
            get: function () {
                return this._text.restrict;
            },
            set: function (value) {
                this._text.restrict = value;
            },
            enumerable: false,
            configurable: true
        });
        TextInput.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this.autoCreateLayer(2);
            this.touchEnabled = true;
            this.touchChildren = true;
            this._editor = true;
            this._width = devil.ComponentDefault.TEXT_WIDTH;
            this._height = devil.ComponentDefault.TEXT_HEIGHT;
            this._back = devil.View.create(devil.Image);
            this.addChild(this._back, this._layers[0]);
            this._text = devil.View.create(devil.Text);
            this._text.x = 5;
            this.addChild(this._text, this.layers[1]);
            this._text.editor = true;
            this._layers[1].touchChildren = true;
            this._prompt = "";
            this._displayAsPassword = false;
        };
        TextInput.prototype.setDefaultStyle = function () {
            this._styles[devil.StyleName.UP_BACK_SKIN] = null;
            this._styles[devil.StyleName.DISENABLED_BACK_SKIN] = null;
        };
        TextInput.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(devil.InvalidationType.STYLE) || this.isInvalid(devil.InvalidationType.ENABLED))
                this.drawStyle();
            if (this.isInvalid(devil.InvalidationType.SIZE))
                this.drawSize();
        };
        // private drawStyle():void
        // {
        //     let data:string;
        //     let rect:egret.Rectangle;
        //     if(!this._enabled)
        //     {
        //         data = this.getStyle(StyleName.DISENABLED_BACK_SKIN);
        //         rect = this.getStyle(StyleName.DISENABLED_ICON_RECT);
        //     }
        //     if(data == null)
        //     {
        //         data = this.getStyle(StyleName.UP_BACK_SKIN);
        //         rect = this.getStyle(StyleName.UP_BACK_RECT);
        //     }
        //     this._back.source = data;
        //     this._back.scale9Grid = rect;
        // }
        TextInput.prototype.drawStyle = function () {
            var data;
            if (!this._enabled)
                data = this.getImageData(devil.StyleName.DISENABLED_BACK_SKIN);
            if (data == null)
                data = this.getImageData(devil.StyleName.UP_BACK_SKIN);
            this._back.source = data.name;
            this._back.scale9Grid = data.scale9Grid;
        };
        TextInput.prototype.drawSize = function () {
            this._back.setSize(this._width, this._height);
            this._text.setSize(this._width, this._height);
            this._back.repaint();
            this._text.repaint();
        };
        TextInput.prototype.setFocus = function () {
            this._text.setFocus();
        };
        TextInput.prototype.unuse = function () {
            this._text = null;
            this._back = null;
            _super_1.prototype.unuse.call(this);
        };
        TextInput.prototype.dispose = function () {
            this._text = null;
            this._back = null;
            _super_1.prototype.dispose.call(this);
        };
        TextInput.prototype.___focusIn = function (e, target) {
            if (this._text.text == this._prompt) {
                this._text.text = "";
                this._text.displayAsPassword = this._displayAsPassword;
            }
        };
        TextInput.prototype.___focusOut = function (e, target) {
            if (devil.StringUtil.isEmpty(this._text.text)) {
                this._text.displayAsPassword = false;
                this._text.text = this._prompt;
            }
        };
        return TextInput;
    }(devil.Container));
    devil.TextInput = TextInput;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 动画与特效
     * @author        devil
     * @version       V20190225
     * @create        2019-02-25
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var Animation = /** @class */ (function (_super_1) {
        __extends(Animation, _super_1);
        function Animation() {
            var _this = _super_1.call(this) || this;
            _this._loadCompletes = [];
            return _this;
        }
        Object.defineProperty(Animation.prototype, "currentFrame", {
            get: function () {
                return this._currentFrame;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "totalFrame", {
            get: function () {
                return this._cvo.totalFrame;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "url", {
            get: function () {
                return (this._path ? this._path.urls[0] : "");
            },
            enumerable: false,
            configurable: true
        });
        Animation.prototype.initLayer = function () {
            this._layer = this.createLayer();
        };
        Animation.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this.init();
            this._image = devil.View.create(devil.Image);
            this.addChild(this._image, this._layer);
        };
        Animation.prototype.addToStage = function () {
            if (this._autoPlay)
                this.play();
        };
        Animation.prototype.removeFromStage = function () {
            this.stop();
        };
        Animation.prototype.load = function () {
            devil.Manager.loader.load(this._path, this.___complete, this, this._resourceGCType, this._resPriorityType, this.___fail, this);
        };
        Animation.prototype.goto = function (frame) {
            var that = this;
            frame = devil.MathUtil.clamb(1, that._cvo.totalFrame, frame);
            that._currentFrame = frame;
            var index = that._cvo.frames.indexOf(that._currentFrame);
            if (index != -1) {
                that._nextFrame = ((index + 1) >= that._cvo.frames.length) ? 10000 : that._cvo.frames[index + 1];
                var frameData = that.ids ? that._data.getKeyFrameData(this.ids[index]) : that._data.getKeyFrameData(index + 1);
                that._image.move(-that._cvo.offsetX + frameData.offX, -that._cvo.offsetY + frameData.offY);
                this._image.setSize(-1, -1);
                that._image.source = frameData.texture;
            }
        };
        Animation.prototype.gotoAndStop = function (frame) {
            if (this._data == null) {
                this._loadCompletes.push(devil.CallBackInfo.create(this.gotoAndStop, this, frame));
            }
            else {
                this.stop();
                this._currentTime = frame * devil.Manager.stage.frameTime;
                this.goto(frame);
            }
        };
        Animation.prototype.gotoAndPlay = function (frame) {
            if (this._data == null) {
                this._loadCompletes.push(devil.CallBackInfo.create(this.gotoAndPlay, this, frame));
            }
            else {
                this.play();
                this._currentTime = frame * devil.Manager.stage.frameTime;
                this.goto(frame);
            }
        };
        Animation.prototype.playComplete = function () {
            if (this._playCompleteFun)
                this._playCompleteFun.runCallBack();
            if (this._playCompleteDispose)
                this.pool();
            else {
                this.stop();
                this._repeate = (this._cvo.wrapMode <= 0) ? -1 : this._cvo.wrapMode;
            }
        };
        Animation.prototype.play = function () {
            if (this._data && this._layer.stage) {
                if (this._cvo.totalFrame > 1)
                    devil.Manager.render.add(this.___render, this);
                else if (this._cvo.totalFrame == 1)
                    this.gotoAndStop(1);
            }
        };
        Animation.prototype.stop = function () {
            devil.Manager.render.remove(this.___render, this);
        };
        Animation.prototype.init = function () {
            this._currentCount = 1;
            this._currentFrame = 1;
            this._nextFrame = 10000;
            this._currentTime = 0;
        };
        /**
         * resourceGCType  default ResourceGCType.ANIMATION
         */
        Animation.prototype.update = function (path, cvo, resPriorityType, resourceGCType, autoPlay, playCompleteDispose) {
            if (resourceGCType === void 0) { resourceGCType = 3; }
            if (autoPlay === void 0) { autoPlay = true; }
            if (playCompleteDispose === void 0) { playCompleteDispose = true; }
            if (this._path == path)
                return;
            this.stop();
            this.init();
            this._layer.touchEnabled = this._layer.touchChildren = false;
            this._image.source = null;
            this._data = null;
            if (this._playCompleteFun)
                this._playCompleteFun.pool();
            this._playCompleteFun = null;
            if (this._failFun)
                this._failFun.pool();
            this._failFun = null;
            for (var i = 0; i < this._loadCompletes.length; i++) {
                this._loadCompletes[i].pool();
            }
            this._loadCompletes.length = 0;
            if (this._path != null)
                devil.Manager.loader.remove(this._path, this.___complete, this, this.___fail, this);
            this._path = path;
            this._cvo = cvo;
            this._resourceGCType = resourceGCType;
            this._resPriorityType = resPriorityType;
            this._autoPlay = autoPlay;
            this._playCompleteDispose = playCompleteDispose;
            this._repeate = cvo.wrapMode <= 0 ? -1 : cvo.wrapMode;
            this.scaleX = cvo.scale;
            this.scaleY = cvo.scale;
            this.load();
        };
        Animation.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(devil.InvalidationType.SIZE))
                this.drawSize();
        };
        Animation.prototype.drawSize = function () {
            this._layer.width = this._width;
            this._layer.height = this._height;
        };
        Animation.prototype.unuse = function () {
            this.stop();
            this.ids = null;
            this._image = null;
            this._cvo = null;
            devil.Manager.loader.remove(this._path, this.___complete, this, this.___fail, this);
            this._path = null;
            this._data = null;
            if (this._playCompleteFun)
                this._playCompleteFun.pool();
            this._playCompleteFun = null;
            if (this._failFun)
                this._failFun.pool();
            this._failFun = null;
            this._layer = null;
            for (var i = 0; i < this._loadCompletes.length; i++) {
                this._loadCompletes[i].pool();
            }
            this._loadCompletes.length = 0;
            _super_1.prototype.unuse.call(this);
        };
        Animation.prototype.dispose = function () {
            this.stop();
            this.ids = null;
            this._image = null;
            this._cvo = null;
            devil.Manager.loader.remove(this._path, this.___complete, this, this.___fail, this);
            this._path = null;
            this._data = null;
            if (this._playCompleteFun)
                this._playCompleteFun.pool();
            this._playCompleteFun = null;
            if (this._failFun)
                this._failFun.pool();
            this._failFun = null;
            this._layer = null;
            for (var i = 0; i < this._loadCompletes.length; i++) {
                this._loadCompletes[i].pool();
            }
            this._loadCompletes = null;
            _super_1.prototype.dispose.call(this);
        };
        /**
         * 播放完成
         */
        Animation.prototype.__playComplete = function (callBack, target) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this._playCompleteFun = devil.CallBackInfo.create.apply(devil.CallBackInfo, __spreadArrays([callBack, target], args));
        };
        Animation.prototype.__fail = function (callBack, target) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this._failFun = devil.CallBackInfo.create.apply(devil.CallBackInfo, __spreadArrays([callBack, target], args));
        };
        Animation.prototype.___complete = function (loader) {
            this._data = loader.sheet;
            var len = this._loadCompletes.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    this._loadCompletes[i].runCallBack();
                    this._loadCompletes[i].pool();
                }
                this._loadCompletes.length = 0;
            }
            else {
                if (this._autoPlay)
                    this.play();
            }
        };
        Animation.prototype.___render = function (interval) {
            var that = this;
            that.goto(that._currentFrame);
            that._currentTime += Math.max(interval, devil.Manager.stage.frameTime);
            that._currentFrame = Math.ceil(that._currentTime / Animation.ANIMATION_INTERVAL);
            if (that._currentFrame > that._nextFrame)
                that._currentFrame = that._nextFrame;
            if (that._currentFrame > that._cvo.totalFrame) {
                that._currentTime = devil.Manager.stage.frameTime;
                that._currentFrame = 1;
                if (that._repeate > 0) {
                    that._currentCount++;
                    that._repeate--;
                    if (that._repeate <= 0)
                        that.playComplete();
                }
            }
        };
        Animation.prototype.___fail = function (loader) {
            if (loader.getPath() != this._path)
                return;
            if (this._failFun)
                this._failFun.runCallBack();
        };
        /**
         * 帧动画的时间间隔
         */
        Animation.ANIMATION_INTERVAL = 33;
        return Animation;
    }(devil.Container));
    devil.Animation = Animation;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 图标按钮
     * @author        devil
     * @version       V20190211
     * @create        2019-02-11
     * @update 	      devil        2019-03-07        优化图标按钮布局自动根据长宽设置，不需要手动设置图标长宽
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ButtonIcon = /** @class */ (function (_super_1) {
        __extends(ButtonIcon, _super_1);
        function ButtonIcon() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.BUTTON_ICON;
            return _this;
        }
        ButtonIcon.prototype.initLayer = function () {
            _super_1.prototype.initLayer.call(this);
            this._iconLayer = this.createLayer();
        };
        /**
         * @private
         */
        ButtonIcon.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._iconOffsetX = 0;
            this._iconOffsetY = 0;
            this._iconWidth = -1;
            this._iconWidth = -1;
            this._icon = devil.View.create(devil.Image);
            this._icon.__complete(this.___complete, this);
            this.addChild(this._icon, this._iconLayer);
        };
        /**
         * @private
         */
        ButtonIcon.prototype.setDefaultStyle = function () {
            _super_1.prototype.setDefaultStyle.call(this);
            this._styles[devil.StyleName.UP_ICON_SKIN] = null;
            this._styles[devil.StyleName.DOWN_ICON_SKIN] = null;
            this._styles[devil.StyleName.DISENABLED_ICON_SKIN] = null;
        };
        /**
         * @private
         */
        ButtonIcon.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(devil.InvalidationType.LAYOUT))
                this.drawLayout();
        };
        /**
         * @private
         */
        ButtonIcon.prototype.drawState = function () {
            _super_1.prototype.drawState.call(this);
            var styleName;
            var iconX = this._iconX;
            var iconY = this._iconY;
            if (this._buttonState == devil.ButtonState.UP)
                styleName = devil.StyleName.UP_ICON_SKIN;
            else if (this._buttonState == devil.ButtonState.DOWN) {
                styleName = devil.StyleName.DOWN_ICON_SKIN;
                if (this._downOffset) {
                    iconX += 1;
                    iconY += 1;
                }
            }
            else if (this._buttonState == devil.ButtonState.DISANABLED)
                styleName = devil.StyleName.DISENABLED_ICON_SKIN;
            iconX += this.getStyleXoffset(styleName);
            iconY += this.getStyleYoffset(styleName);
            this._icon.move(iconX, iconY);
            this.drawIconSkin(styleName);
        };
        ButtonIcon.prototype.drawIconSkin = function (styleName) {
            var data = this.getStyle(styleName);
            this._iconStyleName = styleName;
            if (data == null)
                data = this.getStyle(devil.StyleName.UP_ICON_SKIN);
            this._icon.source = data;
        };
        /**
         * 设置图标的偏移量
         * @param x
         * @param y
         */
        ButtonIcon.prototype.setIconOffset = function (x, y) {
            if (this._iconOffsetX == x && this._iconOffsetY == y)
                return;
            this._iconOffsetX = x;
            this._iconOffsetY = y;
            this.invalidate(devil.InvalidationType.LAYOUT);
        };
        ButtonIcon.prototype.drawLayout = function () {
            this._iconX = ((this._width - this._iconWidth) >> 1) + this._iconOffsetX;
            this._iconY = ((this._height - this._iconHeight) >> 1) + this._iconOffsetY;
            var xOffset = this.getStyleXoffset(this._iconStyleName);
            var yOffset = this.getStyleYoffset(this._iconStyleName);
            this._icon.move(this._iconX + xOffset, this._iconY + yOffset);
        };
        /**
         * @private
         */
        ButtonIcon.prototype.unuse = function () {
            this._iconLayer = null;
            this._icon = null;
            _super_1.prototype.unuse.call(this);
        };
        /**
         * @private
         */
        ButtonIcon.prototype.dispose = function () {
            this._iconLayer = null;
            this._icon = null;
            _super_1.prototype.dispose.call(this);
        };
        ButtonIcon.prototype.___complete = function (loader, target) {
            if (this._iconWidth == target.width && this._iconHeight == target.height)
                return;
            this._iconWidth = target.width;
            this._iconHeight = target.height;
            this.invalidate(devil.InvalidationType.LAYOUT);
        };
        return ButtonIcon;
    }(devil.ButtonImage));
    devil.ButtonIcon = ButtonIcon;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 选中按钮图标
     * @author        devil
     * @version       V201190215
     * @create        2019-02-15
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ButtonIconSelected = /** @class */ (function (_super_1) {
        __extends(ButtonIconSelected, _super_1);
        function ButtonIconSelected() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.BUTTON_ICON_SELECTED;
            return _this;
        }
        Object.defineProperty(ButtonIconSelected.prototype, "common", {
            get: function () {
                return this._common;
            },
            enumerable: false,
            configurable: true
        });
        ButtonIconSelected.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._common = devil.Manager.pool.create(devil.ButtonSelectedBase);
            this._common.button = this;
        };
        /**
         * @private
         */
        ButtonIconSelected.prototype.setDefaultStyle = function () {
            _super_1.prototype.setDefaultStyle.call(this);
            this._styles[devil.StyleName.SELECT_BACK_SKIN] = null;
            // this._styles[StyleName.SELECT_BACK_RECT] = null;
            this._styles[devil.StyleName.SELECT_ICON_SKIN] = null;
        };
        ButtonIconSelected.prototype.drawState = function () {
            if (this._buttonState == devil.ButtonState.SELECTED) {
                // this.drawSkin(StyleName.SELECT_BACK_SKIN,StyleName.SELECT_BACK_RECT);
                this.drawSkin(devil.StyleName.SELECT_BACK_SKIN);
                var backX = this.getStyleXoffset(devil.StyleName.SELECT_BACK_SKIN);
                var backY = this.getStyleYoffset(devil.StyleName.SELECT_BACK_SKIN);
                this._currentBack.move(backX, backY);
                this.drawIconSkin(devil.StyleName.SELECT_ICON_SKIN);
                var iconX = this._iconX + this.getStyleXoffset(devil.StyleName.SELECT_ICON_SKIN);
                var iconY = this._iconY + this.getStyleYoffset(devil.StyleName.SELECT_ICON_SKIN);
                this._icon.move(iconX, iconY);
            }
            else
                _super_1.prototype.drawState.call(this);
        };
        ButtonIconSelected.prototype.setEnabled = function (value) {
            if (this._enabled != value) {
                this._enabled = value;
                this.touchEnabled = this._enabled;
            }
        };
        ButtonIconSelected.prototype.___handleEvent = function (e) {
            if (e.type == egret.TouchEvent.TOUCH_TAP) {
                this._common.selected = !this._common.selected;
            }
            else {
                if (this._common.selected)
                    return;
            }
            _super_1.prototype.___handleEvent.call(this, e);
        };
        ButtonIconSelected.prototype.unuse = function () {
            this._common.pool();
            this._common = null;
            _super_1.prototype.unuse.call(this);
        };
        ButtonIconSelected.prototype.dispose = function () {
            this._common.pool();
            this._common = null;
            _super_1.prototype.dispose.call(this);
        };
        return ButtonIconSelected;
    }(devil.ButtonIcon));
    devil.ButtonIconSelected = ButtonIconSelected;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 图片按钮，背景只有一张图片，可有几种不同的状态
     * @author        devil
     * @version       V20190211
     * @create        2019-02-11
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ButtonImage = /** @class */ (function (_super_1) {
        __extends(ButtonImage, _super_1);
        function ButtonImage() {
            var _this = _super_1.call(this) || this;
            _this.addEvent();
            _this._type = devil.ComponentType.BUTTON_IMAGE;
            return _this;
        }
        Object.defineProperty(ButtonImage.prototype, "buttonState", {
            get: function () {
                return this._buttonState;
            },
            set: function (value) {
                if (this._buttonState == value)
                    return;
                this._buttonState = value;
                this.invalidate(ButtonImage.DRAW_STATE);
            },
            enumerable: false,
            configurable: true
        });
        ButtonImage.prototype.setEnabled = function (value) {
            if (this._enabled != value) {
                _super_1.prototype.setEnabled.call(this, value);
                if (this._enabled) {
                    this._layers[0].touchEnabled = true;
                    this.buttonState = devil.ButtonState.UP;
                }
                else {
                    this.buttonState = devil.ButtonState.DISANABLED;
                }
            }
        };
        Object.defineProperty(ButtonImage.prototype, "downOffset", {
            /**
             * 按下按钮时是否偏移1像素
             * @param value
             */
            set: function (value) {
                this._downOffset = value;
            },
            enumerable: false,
            configurable: true
        });
        ButtonImage.prototype.initLayer = function () {
            this._layer = this.createLayer();
        };
        /**
         * @private
         */
        ButtonImage.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._layer.touchEnabled = true;
            this._downOffset = true;
            this._width = devil.ComponentDefault.BUTTON_WIDTH;
            this._height = devil.ComponentDefault.BUTTON_HEIGHT;
            this._invalid = this._invalid | ButtonImage.DRAW_STATE;
            this._buttonState = devil.ButtonState.UP;
            this._currentBack = devil.View.create(devil.Image);
            this.addChild(this._currentBack, this._layer);
        };
        /**
         * @private
         */
        ButtonImage.prototype.addEvent = function () {
            this._layer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___handleEvent, this);
            this._layer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.___handleEvent, this);
            this._layer.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            this._layer.addEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            this._layer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        };
        /**
         * @private
         */
        ButtonImage.prototype.removeEvent = function () {
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___handleEvent, this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.___handleEvent, this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        };
        /**
         * @private
         */
        ButtonImage.prototype.setDefaultStyle = function () {
            this._styles[devil.StyleName.UP_BACK_SKIN] = null;
            this._styles[devil.StyleName.DOWN_BACK_SKIN] = null;
            this._styles[devil.StyleName.DISENABLED_BACK_SKIN] = null;
            // this._styles[StyleName.UP_BACK_RECT] = null;
            // this._styles[StyleName.DOWN_BACK_RECT] = null;
            // this._styles[StyleName.DISENABLED_BACK_RECT] = null;
        };
        /**
         * @private
         */
        ButtonImage.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(ButtonImage.DRAW_STATE, devil.InvalidationType.STYLE))
                this.drawState();
            if (this.isInvalid(devil.InvalidationType.STYLE, ButtonImage.DRAW_STATE, devil.InvalidationType.STYLE))
                this.drawSize();
        };
        /**
         * @private
         */
        ButtonImage.prototype.drawState = function () {
            var styleName;
            // let scale9GridStyleName:string;
            var backX = 0;
            var backY = 0;
            if (this._buttonState == devil.ButtonState.UP) {
                styleName = devil.StyleName.UP_BACK_SKIN;
                // scale9GridStyleName = StyleName.UP_BACK_RECT;
            }
            else if (this._buttonState == devil.ButtonState.DOWN) {
                styleName = devil.StyleName.DOWN_BACK_SKIN;
                // scale9GridStyleName = StyleName.DOWN_BACK_RECT;
                if (this._downOffset) {
                    backX = 1;
                    backY = 1;
                }
            }
            else if (this._buttonState == devil.ButtonState.DISANABLED) {
                styleName = devil.StyleName.DISENABLED_BACK_SKIN;
                // scale9GridStyleName = StyleName.DISENABLED_BACK_RECT;
            }
            backX += this.getStyleXoffset(styleName);
            backY += this.getStyleYoffset(styleName);
            this._currentBack.move(backX, backY);
            // this.drawSkin(styleName,scale9GridStyleName);
            this.drawSkin(styleName);
        };
        // protected drawSkin(styleName:string,scale9GridStyleName:string):void
        // {
        //     let data:string|egret.Texture = this.getStyle(styleName);
        //     let rect:egret.Rectangle = this.getStyle(scale9GridStyleName);
        //     if(data == null)
        //     {
        //         data = this.getStyle(StyleName.UP_BACK_SKIN);
        //         rect = this.getStyle(StyleName.UP_BACK_RECT);
        //     }
        //     this._currentBack.source = data;
        //     this._currentBack.scale9Grid = rect;
        // }
        ButtonImage.prototype.drawSkin = function (styleName) {
            var data = this.getImageData(styleName);
            if (data == null)
                data = this.getImageData(devil.StyleName.UP_BACK_SKIN);
            this._currentBack.source = data.name;
            this._currentBack.scale9Grid = data.scale9Grid;
        };
        ButtonImage.prototype.drawSize = function () {
            this._currentBack.width = this._width;
            this._currentBack.height = this._height;
        };
        /**
         * @private
         */
        ButtonImage.prototype.reuse = function () {
            _super_1.prototype.reuse.call(this);
            this.addEvent();
        };
        /**
         * @private
         */
        ButtonImage.prototype.unuse = function () {
            this.removeEvent();
            this._layer = null;
            if (this._clickFun) {
                this._clickFun.pool();
                this._clickFun = null;
            }
            if (this._mouseDownFun) {
                this._mouseDownFun.pool();
                this._mouseDownFun = null;
            }
            if (this._longClickFun) {
                this._longClickFun.pool();
                this._longClickFun = null;
            }
            this._currentBack = null;
            _super_1.prototype.unuse.call(this);
        };
        /**
         * @private
         */
        ButtonImage.prototype.dispose = function () {
            devil.Manager.render.remove(this.___checkLongClick, this);
            this.removeEvent();
            this._layer = null;
            if (this._clickFun) {
                this._clickFun.pool();
                this._clickFun = null;
            }
            if (this._mouseDownFun) {
                this._mouseDownFun.pool();
                this._mouseDownFun = null;
            }
            if (this._longClickFun) {
                this._longClickFun.pool();
                this._longClickFun = null;
            }
            this._currentBack = null;
        };
        /**
         * 点击事件
         */
        ButtonImage.prototype.__click = function (callBack, target) {
            this._clickFun = devil.CallBackInfo.create(callBack, target);
        };
        /**
         * 鼠标按下事件
         */
        ButtonImage.prototype.__mouseDown = function (callBack, target) {
            this._mouseDownFun = devil.CallBackInfo.create(callBack, target);
        };
        /**
         * 长按事件
         */
        ButtonImage.prototype.__longClick = function (callBack, target) {
            this._longClickFun = devil.CallBackInfo.create(callBack, target);
        };
        /**
         * @private
         */
        ButtonImage.prototype.___handleEvent = function (e) {
            this.___$handleEvent(e);
        };
        ButtonImage.prototype.___$handleEvent = function (e) {
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.buttonState = devil.ButtonState.DOWN;
                    if (this._mouseDownFun != null)
                        this._mouseDownFun.runCallBack(e, this);
                    if (this._longClickFun) {
                        this._longClickCnt = 0;
                        devil.Manager.render.add(this.___checkLongClick, this, 300, 0);
                    }
                    break;
                case egret.TouchEvent.TOUCH_CANCEL:
                case egret.TouchEvent.TOUCH_END:
                case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                    this.buttonState = devil.ButtonState.UP;
                    break;
                case egret.TouchEvent.TOUCH_TAP:
                    if (this._clickFun != null)
                        this._clickFun.runCallBack(e, this);
                    break;
            }
        };
        /** */
        ButtonImage.prototype.___checkLongClick = function () {
            if (this.buttonState != devil.ButtonState.DOWN || !this._longClickFun) {
                if (this._longClickFun)
                    this._longClickFun.runCallBack(this, true);
                devil.Manager.render.remove(this.___checkLongClick, this);
                return;
            }
            if (this._longClickFun != null) {
                this._longClickFun.runCallBack(this, false);
                ++this._longClickCnt;
                if (this._longClickCnt >= 3) {
                    devil.Manager.render.add(this.___checkLongClick, this, 30, 0, null, true);
                }
            }
        };
        ButtonImage.DRAW_STATE = 1;
        return ButtonImage;
    }(devil.Container));
    devil.ButtonImage = ButtonImage;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 图片选择按钮
     * @author        devil
     * @version       V20190227
     * @create        2019-02-27
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ButtonImageSelected = /** @class */ (function (_super_1) {
        __extends(ButtonImageSelected, _super_1);
        function ButtonImageSelected() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.BUTTON_IMAGE_SELECTED;
            return _this;
        }
        Object.defineProperty(ButtonImageSelected.prototype, "common", {
            get: function () {
                return this._common;
            },
            enumerable: false,
            configurable: true
        });
        ButtonImageSelected.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._common = devil.Manager.pool.create(devil.ButtonSelectedBase);
            this._common.button = this;
        };
        ButtonImageSelected.prototype.setDefaultStyle = function () {
            _super_1.prototype.setDefaultStyle.call(this);
            this._styles[devil.StyleName.SELECT_BACK_SKIN] = null;
            // this._styles[StyleName.SELECT_BACK_RECT] = null;
        };
        ButtonImageSelected.prototype.drawState = function () {
            // if(this._buttonState == ButtonState.SELECTED)this.drawSkin(StyleName.SELECT_BACK_SKIN,StyleName.SELECT_BACK_RECT);
            if (this._buttonState == devil.ButtonState.SELECTED)
                this.drawSkin(devil.StyleName.SELECT_BACK_SKIN);
            else
                _super_1.prototype.drawState.call(this);
        };
        ButtonImageSelected.prototype.unuse = function () {
            this._common.pool();
            this._common = null;
            _super_1.prototype.unuse.call(this);
        };
        ButtonImageSelected.prototype.dispose = function () {
            this._common.pool();
            this._common = null;
            _super_1.prototype.dispose.call(this);
        };
        ButtonImageSelected.prototype.___handleEvent = function (e) {
            if (e.type == egret.TouchEvent.TOUCH_TAP) {
                this._common.selected = !this._common.selected;
            }
            else {
                if (this._common.selected)
                    return;
            }
            _super_1.prototype.___handleEvent.call(this, e);
        };
        return ButtonImageSelected;
    }(devil.ButtonImage));
    devil.ButtonImageSelected = ButtonImageSelected;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * @author        devil
     * @version       V201190215
     * @create        2019-02-15
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ButtonSelectedBase = /** @class */ (function () {
        function ButtonSelectedBase() {
        }
        Object.defineProperty(ButtonSelectedBase.prototype, "button", {
            set: function (value) {
                this._button = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ButtonSelectedBase.prototype, "selected", {
            get: function () {
                return this._button.buttonState == devil.ButtonState.SELECTED;
            },
            set: function (value) {
                if (this._button.buttonState != devil.ButtonState.DISANABLED) {
                    if (this._button.buttonState != devil.ButtonState.SELECTED && value)
                        this._button.buttonState = devil.ButtonState.SELECTED;
                    else if (this._button.buttonState == devil.ButtonState.SELECTED && !value)
                        this._button.buttonState = devil.ButtonState.UP;
                }
            },
            enumerable: false,
            configurable: true
        });
        ButtonSelectedBase.prototype.reuse = function () {
        };
        ButtonSelectedBase.prototype.unuse = function () {
            this._button = null;
        };
        ButtonSelectedBase.prototype.dispose = function () {
            this._button = null;
        };
        ButtonSelectedBase.prototype.pool = function () {
            devil.Manager.pool.push(this);
        };
        return ButtonSelectedBase;
    }());
    devil.ButtonSelectedBase = ButtonSelectedBase;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 文本按钮
     * @author        devil
     * @version       V20190418
     * @create        V2019-04-18
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ButtonText = /** @class */ (function (_super_1) {
        __extends(ButtonText, _super_1);
        function ButtonText() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.BUTTON_TXT;
            return _this;
        }
        Object.defineProperty(ButtonText.prototype, "label", {
            /**
             * 文本实例
             */
            get: function () {
                return this._label;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ButtonText.prototype, "text", {
            get: function () {
                return this._label.text;
            },
            /**
             * 设置按钮的文本显示内容
             */
            set: function (value) {
                this._label.text = value;
            },
            enumerable: false,
            configurable: true
        });
        ButtonText.prototype.initLayer = function () {
            _super_1.prototype.initLayer.call(this);
            this._txtLayer = this.createLayer();
        };
        ButtonText.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._labelOffsetX = 0;
            this._labelOffsetY = 0;
            this._label = devil.View.create(devil.Text);
            this.addChild(this._label, this._txtLayer);
        };
        ButtonText.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(devil.InvalidationType.LAYOUT, devil.InvalidationType.SIZE))
                this.drawLayout();
        };
        ButtonText.prototype.drawSize = function () {
            _super_1.prototype.drawSize.call(this);
            this._label.setSize(this._width, this._label.textHeight + 5);
        };
        ButtonText.prototype.drawState = function () {
            _super_1.prototype.drawState.call(this);
            if (this._downOffset && this._buttonState == devil.ButtonState.DOWN) {
                this._label.move(this._labelX + 1, this._labelY + 1);
            }
            else {
                this._label.move(this._labelX, this._labelY);
            }
        };
        /**
         * 设置文本的偏移量
         * @param x
         * @param y
         */
        ButtonText.prototype.setLabelOffset = function (x, y) {
            if (this._labelOffsetX == x && this._labelOffsetY == y)
                return;
            this._labelOffsetX = x;
            this._labelOffsetY = y;
            this.invalidate(devil.InvalidationType.LAYOUT);
        };
        ButtonText.prototype.drawLayout = function () {
            this._labelX = ((this._width - this._label.width) >> 1) + this._labelOffsetX;
            this._labelY = ((this._height - this._label.height) >> 1) + this._labelOffsetY;
            this._label.move(this._labelX, this._labelY);
        };
        ButtonText.prototype.unuse = function () {
            this._label = null;
            _super_1.prototype.unuse.call(this);
            this._txtLayer = null;
        };
        ButtonText.prototype.dispose = function () {
            this._label = null;
            _super_1.prototype.dispose.call(this);
            this._txtLayer = null;
        };
        return ButtonText;
    }(devil.ButtonImage));
    devil.ButtonText = ButtonText;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * @author        devil
     * @version       V20190418
     * @create        V2019-04-18
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ButtonTextSelected = /** @class */ (function (_super_1) {
        __extends(ButtonTextSelected, _super_1);
        function ButtonTextSelected() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.BUTTON_TEXT_SELECTED;
            return _this;
        }
        Object.defineProperty(ButtonTextSelected.prototype, "common", {
            get: function () {
                return this._common;
            },
            enumerable: false,
            configurable: true
        });
        ButtonTextSelected.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._common = devil.Manager.pool.create(devil.ButtonSelectedBase);
            this._common.button = this;
        };
        ButtonTextSelected.prototype.setDefaultStyle = function () {
            _super_1.prototype.setDefaultStyle.call(this);
            this._styles[devil.StyleName.SELECT_BACK_SKIN] = null;
            // this._styles[StyleName.SELECT_BACK_RECT] = null;
        };
        ButtonTextSelected.prototype.drawState = function () {
            // if(this._buttonState == ButtonState.SELECTED)this.drawSkin(StyleName.SELECT_BACK_SKIN,StyleName.SELECT_BACK_RECT);
            if (this._buttonState == devil.ButtonState.SELECTED)
                this.drawSkin(devil.StyleName.SELECT_BACK_SKIN);
            else
                _super_1.prototype.drawState.call(this);
        };
        ButtonTextSelected.prototype.unuse = function () {
            this._common.pool();
            this._common = null;
            _super_1.prototype.unuse.call(this);
        };
        ButtonTextSelected.prototype.dispose = function () {
            this._common.pool();
            this._common = null;
            _super_1.prototype.dispose.call(this);
        };
        ButtonTextSelected.prototype.___handleEvent = function (e) {
            if (e.type == egret.TouchEvent.TOUCH_TAP) {
                this._common.selected = !this._common.selected;
            }
            else {
                if (this._common.selected)
                    return;
            }
            _super_1.prototype.___handleEvent.call(this, e);
        };
        return ButtonTextSelected;
    }(devil.ButtonText));
    devil.ButtonTextSelected = ButtonTextSelected;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 单选图片选择按钮
     * @author        devil
     * @version       V20190227
     * @create        2019-02-27
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var RadioButtonImageSelected = /** @class */ (function (_super_1) {
        __extends(RadioButtonImageSelected, _super_1);
        function RadioButtonImageSelected() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        RadioButtonImageSelected.prototype.setSelected = function (value) {
            this._common.selected = value;
        };
        RadioButtonImageSelected.prototype.getSelected = function () {
            return this._common.selected;
        };
        RadioButtonImageSelected.prototype.setSelector = function (value) {
            this._selector = value;
        };
        RadioButtonImageSelected.prototype.unuse = function () {
            this._selector = null;
            _super_1.prototype.unuse.call(this);
        };
        RadioButtonImageSelected.prototype.dispose = function () {
            this._selector = null;
            _super_1.prototype.dispose.call(this);
        };
        RadioButtonImageSelected.prototype.___handleEvent = function (e) {
            if (e.type == egret.TouchEvent.TOUCH_TAP) {
                if (this._common.selected)
                    return;
                this._selector.selectedView = this;
            }
            _super_1.prototype.___handleEvent.call(this, e);
        };
        return RadioButtonImageSelected;
    }(devil.ButtonImageSelected));
    devil.RadioButtonImageSelected = RadioButtonImageSelected;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 选中图标与背景图片合为一张背景图
     * @author        devil
     * @version       V20190418
     * @create        V2019-04-18
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var CheckBox = /** @class */ (function (_super_1) {
        __extends(CheckBox, _super_1);
        function CheckBox() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.CHECK_BOX;
            return _this;
        }
        CheckBox.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._width = devil.ComponentDefault.CHECK_BOX_WIDTH;
            this._height = devil.ComponentDefault.CHECK_BOX_HEIGHT;
            this.setLabelOffset(this._width + 5, 0);
            this._label.align = egret.HorizontalAlign.LEFT;
        };
        CheckBox.prototype.drawSize = function () {
            this._currentBack.width = this._width;
            this._currentBack.height = this._height;
        };
        CheckBox.prototype.drawLayout = function () {
            this._labelX = this._width + this._labelOffsetX;
            this._labelY = ((this._height - this._label.height) >> 1) + this._labelOffsetY;
            this._label.move(this._labelX, this._labelY);
        };
        return CheckBox;
    }(devil.ButtonTextSelected));
    devil.CheckBox = CheckBox;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 选中图标与背景图是分开的
     * @author        devil
     * @version       V20190418
     * @create        V2019-04-18
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var CheckBox1 = /** @class */ (function (_super_1) {
        __extends(CheckBox1, _super_1);
        function CheckBox1() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.CHECK_BOX1;
            return _this;
        }
        CheckBox1.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._width = devil.ComponentDefault.CHECK_BOX_WIDTH;
            this._height = devil.ComponentDefault.CHECK_BOX_HEIGHT;
            this.setLabelOffset(5, 0);
            this._label.align = egret.HorizontalAlign.LEFT;
            this._icon = devil.View.create(devil.Image);
            this._txtLayer.touchEnabled = true;
        };
        /**
          * @private
          */
        CheckBox1.prototype.addEvent = function () {
            _super_1.prototype.addEvent.call(this);
            this._txtLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___handleEvent, this);
            this._txtLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.___handleEvent, this);
            this._txtLayer.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            this._txtLayer.addEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            this._txtLayer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        };
        /**
         * @private
         */
        CheckBox1.prototype.removeEvent = function () {
            _super_1.prototype.removeEvent.call(this);
            this._txtLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___handleEvent, this);
            this._txtLayer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.___handleEvent, this);
            this._txtLayer.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            this._txtLayer.removeEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            this._txtLayer.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        };
        CheckBox1.prototype.setDefaultStyle = function () {
            _super_1.prototype.setDefaultStyle.call(this);
            this._styles[devil.StyleName.SELECT_ICON_SKIN] = null;
            // this._styles[StyleName.SELECT_ICON_RECT] = null;
        };
        CheckBox1.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(devil.InvalidationType.STYLE))
                this.drawStyle();
        };
        CheckBox1.prototype.drawSize = function () {
            this._currentBack.width = this._width;
            this._currentBack.height = this._height;
        };
        CheckBox1.prototype.drawStyle = function () {
            this._icon.source = this.getStyle(devil.StyleName.SELECT_ICON_SKIN);
            this._icon.__complete(this.___complete, this);
        };
        CheckBox1.prototype.drawLayout = function () {
            this._labelX = this._width + this._labelOffsetX;
            this._labelY = ((this._height - this._label.height) >> 1) + this._labelOffsetY;
            this._label.move(this._labelX, this._labelY);
        };
        // protected drawSkin(styleName:string,scale9GridStyleName:string):void
        // {
        //     super.drawSkin(styleName,scale9GridStyleName);
        //     if(this._buttonState == ButtonState.SELECTED)
        //     {
        //         if(this._icon.parent == null)this.addChild(this._icon,this._layer);
        //     }
        //     else 
        //     {
        //         if(this._icon.parent)this.removeChild(this._icon,false);
        //     } 
        // }
        CheckBox1.prototype.drawSkin = function (styleName) {
            _super_1.prototype.drawSkin.call(this, styleName);
            if (this._buttonState == devil.ButtonState.SELECTED) {
                if (this._icon.parent == null)
                    this.addChild(this._icon, this._layer);
            }
            else {
                if (this._icon.parent)
                    this.removeChild(this._icon, false);
            }
        };
        CheckBox1.prototype.unuse = function () {
            if (this._icon.parent == null)
                this.removeChild(this._icon, true);
            this._icon = null;
            _super_1.prototype.unuse.call(this);
        };
        CheckBox1.prototype.dispose = function () {
            if (this._icon.parent == null)
                this.removeChild(this._icon, true);
            this._icon = null;
            _super_1.prototype.dispose.call(this);
        };
        CheckBox1.prototype.___complete = function (loader, target) {
            this._icon.x = (this._width - this._icon.width) >> 1;
            this._icon.y = (this._height - this._icon.height) >> 1;
        };
        return CheckBox1;
    }(devil.ButtonTextSelected));
    devil.CheckBox1 = CheckBox1;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 组件基类，所有的组件都需要继承此类
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var Component = /** @class */ (function (_super_1) {
        __extends(Component, _super_1);
        function Component() {
            return _super_1.call(this) || this;
        }
        Object.defineProperty(Component.prototype, "type", {
            /**
             * 组件类型，对应的常量ComponentType
             */
            get: function () {
                return this._type;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @private
         */
        Component.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._styles = {};
            this._stylesOffset = {};
            this._layerID = 0;
            this.setDefaultStyle();
        };
        /**
         * 设置缺省样式
         */
        Component.prototype.setDefaultStyle = function () {
        };
        /**
         * 获取指定名字的样式皮肤字符串
         * @param name		StyleName常量或自定义的特殊样式名
         */
        Component.prototype.getStyle = function (name) {
            return this._styles[name];
        };
        Component.prototype.getImageData = function (styleName) {
            return devil.Model.resConfig.getResourceItem(this.getStyle(styleName));
        };
        /**
         * 设置指定名字的样式皮肤字符串
         * @param name		StyleName常量或自定义的特殊样式名
         * @param value		皮肤字符串
         */
        Component.prototype.setStyle = function (name, value) {
            if (this._styles[name] == value)
                return;
            this._styles[name] = value;
            this.invalidate(devil.InvalidationType.STYLE);
        };
        /**
         * 设置指定名字的样式便宜
         * @param name		StyleName常量或自定义的特殊样式名
         */
        Component.prototype.setStyleOffset = function (name, xOffset, yOffset) {
            this._stylesOffset[name] = [xOffset, yOffset];
            this.invalidate(devil.InvalidationType.STYLE);
        };
        /**
         * 设置指定名字的样式便宜
         * @param name		StyleName常量或自定义的特殊样式名
         */
        Component.prototype.getStyleXoffset = function (name) {
            var offset = this._stylesOffset[name];
            return offset ? offset[0] : 0;
        };
        /**
         * 设置指定名字的样式便宜
         * @param name		StyleName常量或自定义的特殊样式名
         */
        Component.prototype.getStyleYoffset = function (name) {
            var offset = this._stylesOffset[name];
            return offset ? offset[1] : 0;
        };
        Component.prototype.unuse = function () {
            for (var key in this._styles) {
                this._styles[key] = null;
            }
            this._styles = null;
            this._stylesOffset = null;
            _super_1.prototype.unuse.call(this);
        };
        Component.prototype.dispose = function () {
            for (var key in this._styles) {
                this._styles[key] = null;
            }
            this._styles = null;
            this._stylesOffset = null;
            _super_1.prototype.dispose.call(this);
        };
        return Component;
    }(devil.View));
    devil.Component = Component;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 盒子容器
     * @author        devil
     * @version       V20190305
     * @create        2019-03-05
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var BoxContainer = /** @class */ (function (_super_1) {
        __extends(BoxContainer, _super_1);
        function BoxContainer() {
            return _super_1.call(this) || this;
        }
        BoxContainer.prototype.getCount = function () {
            return this._numChildren;
        };
        Object.defineProperty(BoxContainer.prototype, "showCount", {
            /**
             * 最多显示数量，要在add与addAt前使用
             */
            get: function () {
                return this._showCount;
            },
            set: function (value) {
                this._showCount = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BoxContainer.prototype, "itemWidth", {
            get: function () {
                return this._itemWidth;
            },
            set: function (value) {
                this._itemWidth = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BoxContainer.prototype, "itemHeight", {
            get: function () {
                return this._itemHeight;
            },
            set: function (value) {
                this._itemHeight = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BoxContainer.prototype, "selectedIndex", {
            get: function () {
                return this._selector.selectedIndex;
            },
            set: function (value) {
                this._selector.selectedIndex = value;
            },
            enumerable: false,
            configurable: true
        });
        BoxContainer.prototype.getCurrent = function () {
            return this._selector.currentSelected;
        };
        BoxContainer.prototype.getScrollH = function () {
            return 0;
        };
        BoxContainer.prototype.getScrollV = function () {
            return 0;
        };
        BoxContainer.prototype.setScrollH = function (value) {
        };
        BoxContainer.prototype.setScrollV = function (value) {
        };
        BoxContainer.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._selector = new devil.RadioSelector();
            this.holdBottom = false;
        };
        BoxContainer.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(devil.InvalidationType.LAYOUT))
                this.drawLayOut();
        };
        BoxContainer.prototype.drawLayOut = function () {
            var xIndex;
            var yIndex;
            for (var i = 0; i < this._numChildren; i++) {
                xIndex = i % this._col;
                yIndex = Math.floor(i / this._col);
                this._children[i].move(xIndex * (this._itemWidth + this._paddingH), yIndex * (this._itemHeight + this._paddingV));
            }
        };
        BoxContainer.prototype.add = function (item) {
            this.addAt(item, this._numChildren);
        };
        BoxContainer.prototype.addAt = function (item, index) {
            var arr = [];
            arr[0] = item;
            arr[1] = index;
            arr = arr.concat(this._layers);
            this.addChildAt.apply(this, arr);
            this._selector.addAt(item, index);
            item.setSelector(this._selector);
            this.updateWH();
        };
        BoxContainer.prototype.getItemAt = function (index) {
            var result = this.getChildAt(index);
            return result;
        };
        BoxContainer.prototype.remove = function (item) {
            if (item instanceof devil.View) {
                var index = this._children.indexOf(item);
                this.removeAt(index);
            }
        };
        BoxContainer.prototype.removeAt = function (index) {
            this.removeChildAt(index, true);
            var child = this._children[index];
            this._selector.remove(child);
            this.updateWH();
        };
        /**
         * 清空
         */
        BoxContainer.prototype.clear = function () {
            this.removeChildren();
        };
        /**
         * 清空列表数据
         */
        BoxContainer.prototype.clearData = function () {
            var child;
            for (var i = 0; i < this._numChildren; i++) {
                child = this._children[i];
                child.clearData();
            }
        };
        BoxContainer.prototype.updateWH = function () {
            if (this._numChildren >= this._col)
                this._width = this._col * (this._itemWidth + this._paddingH) - this._paddingH;
            else
                this._width = this._numChildren * (this._itemWidth + this._paddingH);
            var row = (this._numChildren >= this._col) ? Math.ceil(this._numChildren / this._col) : 1;
            this._height = row * (this._itemHeight + this._paddingH);
        };
        BoxContainer.prototype.unuse = function () {
            this._selector.dispose();
            this._selector = null;
            _super_1.prototype.unuse.call(this);
        };
        BoxContainer.prototype.dispose = function () {
            this._selector.dispose();
            this._selector = null;
            _super_1.prototype.dispose.call(this);
        };
        /**
         * 参数 IRadioSelected
         */
        BoxContainer.prototype.__change = function (callBack, target) {
            this._selector.__change(callBack, target);
        };
        BoxContainer.createSelf = function (row, col, paddingV, paddingH) {
            if (paddingV === void 0) { paddingV = 0; }
            if (paddingH === void 0) { paddingH = 0; }
            var result = devil.View.create(BoxContainer);
            result._row = row;
            result._col = col;
            result._paddingV = paddingV;
            result._paddingH = paddingH;
            return result;
        };
        return BoxContainer;
    }(devil.Container));
    devil.BoxContainer = BoxContainer;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * List组件
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var List = /** @class */ (function (_super_1) {
        __extends(List, _super_1);
        function List() {
            var _this = _super_1.call(this) || this;
            _this._type = devil.ComponentType.LIST;
            return _this;
        }
        Object.defineProperty(List.prototype, "scrollPolicyV", {
            get: function () {
                return this._scrollPolicyV;
            },
            set: function (value) {
                if (this._scrollPolicyV == value)
                    return;
                this._scrollPolicyV = value;
                // this._scroll.checkScrollPolicy();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(List.prototype, "scrollPolicyH", {
            get: function () {
                return this._scrollPolicyH;
            },
            set: function (value) {
                if (this._scrollPolicyH == value)
                    return;
                this._scrollPolicyH = value;
                // this._scroll.checkScrollPolicy();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(List.prototype, "container", {
            get: function () {
                return this._container;
            },
            set: function (value) {
                if (this._container == value)
                    return;
                this._container = value;
                this._container.setSize(this._width, this._height);
                var temp = this._container;
                this.addChild(temp, this._layer);
                this._scroll.list = this;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(List.prototype, "layout", {
            get: function () {
                return this._layout;
            },
            set: function (value) {
                this._layout = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(List.prototype, "bounces", {
            set: function (value) {
                this._scroll.bounces = value;
            },
            enumerable: false,
            configurable: true
        });
        List.prototype.initLayer = function () {
            this._layer = this.createLayer();
        };
        List.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._scroll = devil.Manager.pool.create(devil.ScrollBar);
            this._scrollPolicyH = devil.ScrollPolicy.OFF;
            this._scrollPolicyV = devil.ScrollPolicy.AUTO;
            this._layout = List.VERTICAL;
        };
        List.prototype.unuse = function () {
            this._scroll.pool();
            this._scroll = null;
            this._container = null;
            this._layer = null;
            _super_1.prototype.unuse.call(this);
        };
        List.prototype.dispose = function () {
            this._scroll.pool();
            this._scroll = null;
            this._container = null;
            this._layer = null;
            _super_1.prototype.dispose.call(this);
        };
        /**
         * 方向垂直
         */
        List.VERTICAL = 1;
        /**
         * 水平方向
         */
        List.HORIZONTAL = 2;
        return List;
    }(devil.Container));
    devil.List = List;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 列表组件容器
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ListContainer = /** @class */ (function (_super_1) {
        __extends(ListContainer, _super_1);
        function ListContainer() {
            var _this = _super_1.call(this) || this;
            _this._indexInViewCalculated = false; //视图的第一个和最后一个元素的索引值已经计算好的标志
            return _this;
        }
        Object.defineProperty(ListContainer.prototype, "showCount", {
            get: function () {
                if (!this._datas)
                    return 0;
                return this._datas.length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "itemWidth", {
            get: function () {
                return this._itemWidth;
            },
            set: function (value) {
                this._itemWidth = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "itemHeight", {
            get: function () {
                return this._itemHeight;
            },
            set: function (value) {
                this._itemHeight = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "paddingV", {
            get: function () {
                return this._paddingV;
            },
            set: function (value) {
                this._paddingV = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "paddingH", {
            get: function () {
                return this._paddingH;
            },
            set: function (value) {
                this._paddingH = value;
            },
            enumerable: false,
            configurable: true
        });
        ListContainer.prototype.getCurrent = function () {
            return this._selector.currentSelected;
        };
        Object.defineProperty(ListContainer.prototype, "selectedIndex", {
            get: function () {
                return this._selector.selectedIndex + this._startIndex;
            },
            set: function (value) {
                this._selector.selectedIndex = value - this._startIndex;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "contentWidth", {
            get: function () {
                return this._contentWidth;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "contentHeight", {
            get: function () {
                return this._contentHeight;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "scrollRect", {
            get: function () {
                return this._scrollRect;
            },
            set: function (value) {
                var count = this._layers.length;
                for (var i = 0; i < count; i++) {
                    this._layers[i].scrollRect = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        ListContainer.prototype.getScrollH = function () {
            return this._scrollH;
        };
        ListContainer.prototype.setScrollH = function (value, fromScrollBar) {
            value = +value || 0;
            if (this._scrollH == value)
                return;
            this._fromScrollBar = fromScrollBar;
            this._scrollH = value;
            this.scrollRect = this._scrollRect.setTo(this._scrollH, this._scrollV, this._width, this._height);
            if (this._sliderH)
                this._sliderH.containerUpdPos(value);
            this.scrollPositionChanged();
        };
        ListContainer.prototype.getScrollV = function () {
            return this._scrollV;
        };
        ListContainer.prototype.setScrollV = function (value, fromScrollBar) {
            value = +value || 0;
            if (this._scrollV == value)
                return;
            this._fromScrollBar = fromScrollBar;
            this._scrollV = value;
            this.scrollRect = this._scrollRect.setTo(this._scrollH, this._scrollV, this._width, this._height);
            if (this._sliderV)
                this._sliderV.containerUpdPos(value);
            this.scrollPositionChanged();
        };
        Object.defineProperty(ListContainer.prototype, "sliderH", {
            get: function () {
                return this._sliderH;
            },
            set: function (slider) {
                slider.container = this;
                slider.isVertical = false;
                this._sliderH = slider;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "sliderV", {
            get: function () {
                return this._sliderV;
            },
            set: function (slider) {
                slider.container = this;
                slider.isVertical = true;
                this._sliderV = slider;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "datas", {
            get: function () {
                return this._datas;
            },
            set: function (value) {
                this.clear();
                this._datas = value;
                this._fromScrollBar = false;
                this.setScrollV(0, false);
                this.setScrollH(0, false);
                this.invalidate(ListContainer.DRAW_CONTENT_SIZE);
                this.invalidate(devil.InvalidationType.LAYOUT);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "itemRenderer", {
            set: function (value) {
                this._itemRender = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListContainer.prototype, "col", {
            get: function () {
                return this._col;
            },
            set: function (value) {
                this._col = value;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 创建子项时，需要的回调函数，可以做一些参数的设置或代码初始化等操作
         * @callBack 参数为当前创建的IListItem实例
         */
        ListContainer.prototype.createItemRender = function (callBack, target) {
            this._createItemRender = devil.CallBackInfo.create(callBack, target);
        };
        ListContainer.prototype.initLayer = function () {
            this._layer = this.createLayer();
        };
        ListContainer.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._invalid = this._invalid | ListContainer.DRAW_CONTENT_SIZE;
            this._col = 1;
            this._selector = new devil.RadioSelector();
            this._datas = [];
            this._paddingH = 0;
            this._paddingV = 0;
            this._startIndex = -1;
            this._endIndex = -1;
            this._contentWidth = 0;
            this._contentHeight = 0;
            this._scrollH = 0;
            this._scrollV = 0;
            this._itemWidth = 0;
            this._itemHeight = 0;
            this._scrollRect = new egret.Rectangle();
            this._indexInViewCalculated = false;
            this._fromScrollBar = false;
            this.holdBottom = false;
            this._subLayers = [];
        };
        ListContainer.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(ListContainer.DRAW_CONTENT_SIZE))
                this.drawContentSize();
            if (this.isInvalid(devil.InvalidationType.DATA, devil.InvalidationType.LAYOUT))
                this.drawLayout();
        };
        ListContainer.prototype.setSize = function (width, height) {
            if (this._width != width || this._height != height) {
                _super_1.prototype.setSize.call(this, width, height);
                this.scrollRect = this._scrollRect.setTo(this._scrollH, this._scrollV, this._width, this._height);
            }
        };
        /**
         * 清空
         */
        ListContainer.prototype.clear = function () {
            this.removeChildren();
            this._selector.clear();
        };
        /**
         * 清空列表数据
         */
        ListContainer.prototype.clearData = function () {
            var item;
            for (var i = 0; i < this._numChildren; i++) {
                item = this._children[i];
                (item).clearData();
            }
        };
        ListContainer.prototype.drawLayout = function () {
            if (this._indexInViewCalculated)
                this._indexInViewCalculated = false;
            else
                this.getIndexInView();
            if (this._startIndex == -1 || this._endIndex == -1)
                return;
            var item;
            for (var i = this._numChildren; i > 0; i--) {
                item = this._children[i - 1];
                if (!devil.MathUtil.isBetween(this._startIndex, this._endIndex, item.index)) {
                    this._selector.removeAt(i - 1);
                    this.removeChildAt(i - 1, true);
                }
            }
            if (this.holdBottom && !this._fromScrollBar) {
                if (this.getDirection() == devil.List.VERTICAL) {
                    if (this._contentHeight > this._height) {
                        this.setScrollV(this._contentHeight - this._height, false);
                    }
                }
                else {
                    if (this._contentWidth > this._width) {
                        this.setScrollH(this._contentWidth - this._width, false);
                    }
                }
            }
            this._fromScrollBar = false;
            this.sortPosition();
            if (this._sortFun != null)
                this._sortFun.runCallBack();
        };
        ListContainer.prototype.sortPosition = function () {
            var item;
            var view;
            var w = this._itemWidth + this._paddingH;
            var h = this._itemHeight + this._paddingV;
            for (var i = this._startIndex; i <= this._endIndex; i++) {
                item = this.createItem(i);
                view = item;
                view.width = this._itemWidth;
                view.height = this._itemHeight;
                if (this.getDirection() == devil.List.VERTICAL) {
                    view.move((i % this._col) * w, ((i / this._col) | 0) * h);
                }
                else {
                    view.move(((i / this._col) | 0) * w, (i % this._col) * h);
                }
            }
        };
        ListContainer.prototype.add = function (data) {
            this.addAt(data, this._datas.length);
        };
        ListContainer.prototype.addAt = function (data, index) {
            if (devil.MathUtil.isBetween(0, this._datas.length, index)) {
                var i = this._datas.indexOf(data);
                if (i == -1) {
                    this._datas.splice(index, 0, data);
                    this.datas = this._datas;
                }
            }
        };
        ListContainer.prototype.getItemAt = function (index) {
            var result = this.getChildAt(index);
            return result;
        };
        ListContainer.prototype.removeAt = function (index) {
            if (devil.MathUtil.isBetween(0, this._datas.length, index)) {
                this._datas.splice(index, 1);
                this.datas = this._datas;
            }
        };
        ListContainer.prototype.remove = function (data) {
            var index = this._datas.indexOf(data);
            this.removeAt(index);
        };
        ListContainer.prototype.getStartPosition = function (index) {
            index = Math.ceil(index / this._col) | 0;
            if (this.getDirection() == devil.List.VERTICAL)
                return (this._itemHeight + this._paddingV) * index;
            return (this._itemWidth + this._paddingH) * index;
        };
        /**
         * 折半查找法寻找指定位置的显示对象索引
         */
        ListContainer.prototype.findIndexAt = function (scroll, i0, i1) {
            var index = ((i0 + i1) * 0.5) | 0;
            var position = this.getStartPosition(index * this._col);
            var dis = this._itemWidth + this._paddingH;
            if (this.getDirection() == devil.List.VERTICAL)
                dis = this._itemHeight + this._paddingV;
            if ((scroll >= position) && (scroll < position + dis))
                return index;
            else if (i0 == i1)
                return -1;
            else if (scroll < position)
                return this.findIndexAt(scroll, i0, Math.max(i0, index - 1));
            return this.findIndexAt(scroll, Math.min(index + 1, i1), i1);
        };
        ListContainer.prototype.getIndexInView = function () {
            var count = this.showCount;
            if (count == 0 || this._width == 0 || this._height == 0) {
                this._startIndex = -1;
                this._endIndex = -1;
                return false;
            }
            var itemWH;
            var scroll;
            var wh;
            if (this.getDirection() == devil.List.VERTICAL) {
                itemWH = this._itemHeight;
                scroll = this._scrollV;
                wh = this._height;
            }
            else {
                itemWH = this._itemWidth;
                scroll = this._scrollH;
                wh = this._width;
            }
            var contentWH = this.getStartPosition(count - 1) + itemWH;
            if (scroll > contentWH) {
                this._startIndex = -1;
                this._endIndex = -1;
                return false;
            }
            var maxScroll = scroll + wh;
            if (maxScroll < 0) {
                this._startIndex = -1;
                this._endIndex = -1;
                return false;
            }
            var oldStartIndex = this._startIndex;
            var oldEndIndex = this._endIndex;
            this._startIndex = this.findIndexAt(scroll, 0, Math.ceil((count - 1) / this._col));
            if (this._startIndex == -1)
                this._startIndex = 0;
            else
                this._startIndex = this._startIndex * this._col >= count ? count - 1 : this._startIndex * this._col;
            this._endIndex = this.findIndexAt(maxScroll, 0, Math.ceil((count - 1) / this._col));
            if (this._endIndex == -1)
                this._endIndex = count - 1;
            else
                this._endIndex = (this._endIndex + 1) * this._col - 1 >= count ? count - 1 : (this._endIndex + 1) * this._col - 1;
            return oldStartIndex != this._startIndex || oldEndIndex != this._endIndex;
        };
        ListContainer.prototype.createItem = function (index) {
            var child;
            for (var i = 0; i < this._numChildren; i++) {
                child = this._children[i];
                if (child.index == index)
                    return child;
            }
            child = devil.Manager.pool.create(this._itemRender);
            child.index = index;
            this.addChildAt(child, index);
            var len = child.layers.length;
            for (var i = 0; i < len; i++) {
                // this._layer.addChild(child.layers[i]);
                this.getSubLayer(i).addChild(child.layers[i]);
            }
            this._selector.addAt(child, index);
            // child.selector = this._selector;
            child.setSelector(this._selector);
            child.setData(this._datas[index]);
            if (this._createItemRender != null)
                this._createItemRender.runCallBack(child, index);
            return child;
        };
        ListContainer.prototype.getSubLayer = function (index) {
            var subLayer = this._subLayers[index];
            if (!subLayer) {
                subLayer = devil.Manager.pool.createDisplayObjectContainer();
                this._subLayers[index] = subLayer;
                this._layer.addChild(subLayer);
                subLayer.touchChildren = true;
            }
            return subLayer;
        };
        ListContainer.prototype.drawContentSize = function () {
            if (this.getDirection() == devil.List.VERTICAL) {
                this._contentHeight = this.getStartPosition(this.showCount);
                this._contentWidth = (this._itemWidth + this._paddingH) * this._col - this._paddingH;
            }
            else {
                this._contentHeight = (this._itemHeight + this._paddingV) * this._col - this._paddingV;
                this._contentWidth = this.getStartPosition(this.showCount);
            }
            if (this._sliderH)
                this._sliderH.updateContentSize();
            if (this._sliderV)
                this._sliderV.updateContentSize();
        };
        ListContainer.prototype.scrollPositionChanged = function () {
            var changed = this.getIndexInView();
            if (changed) {
                this._indexInViewCalculated = true;
                this.invalidate(devil.InvalidationType.LAYOUT);
            }
        };
        ListContainer.prototype.getDirection = function () {
            var list = this.parent;
            return list.layout;
        };
        ListContainer.prototype.createSortFun = function (callBack, target) {
            this._sortFun = devil.CallBackInfo.create(callBack, target);
        };
        ListContainer.prototype.unuse = function () {
            this._selector.dispose();
            this._selector = null;
            this._datas = null;
            this._scrollRect = null;
            this._itemRender = null;
            if (this._createItemRender) {
                this._createItemRender.pool();
                this._createItemRender = null;
            }
            this._layer = null;
            var len = this._subLayers.length;
            for (var i = 0; i < len; i++) {
                devil.Manager.pool.pushDisplayObjectContainer(this._subLayers[i]);
            }
            this._subLayers = null;
            this._sortFun = null;
            this._sliderH = null;
            this._sliderV = null;
            _super_1.prototype.unuse.call(this);
        };
        ListContainer.prototype.dispose = function () {
            this._selector.dispose();
            this._selector = null;
            this._datas = null;
            this._scrollRect = null;
            this._itemRender = null;
            if (this._createItemRender) {
                this._createItemRender.pool();
                this._createItemRender = null;
            }
            this._layer = null;
            var len = this._subLayers.length;
            for (var i = 0; i < len; i++) {
                devil.Manager.pool.pushDisplayObjectContainer(this._subLayers[i]);
            }
            this._subLayers = null;
            this._sortFun = null;
            this._sliderH = null;
            this._sliderV = null;
            _super_1.prototype.dispose.call(this);
        };
        ListContainer.prototype.__change = function (callBack, target) {
            this._selector.__change(callBack, target);
        };
        ListContainer.DRAW_CONTENT_SIZE = 1;
        return ListContainer;
    }(devil.Container));
    devil.ListContainer = ListContainer;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 列表组件容器
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ListContainer2 = /** @class */ (function (_super_1) {
        __extends(ListContainer2, _super_1);
        function ListContainer2() {
            var _this = _super_1.call(this) || this;
            /**
             * 特殊处理 玩动2游戏的面板Tab
             */
            _this.contentWidthOffset = 0;
            return _this;
        }
        ListContainer2.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this.contentWidthOffset = 0;
        };
        ListContainer2.prototype.sortPosition = function () {
            var item;
            var view;
            var start = this.getStartPosition(this._startIndex > 0 ? this._startIndex : 0);
            for (var i = this._startIndex; i <= this._endIndex; i++) {
                item = this.createItem(i);
                view = item;
                if (this.getDirection() == devil.List.VERTICAL) {
                    view.y = start;
                    start += view.height + this._paddingV;
                }
                else {
                    view.x = start;
                    start += view.width + this._paddingH;
                }
            }
        };
        ListContainer2.prototype.getStartPosition = function (index) {
            var result = 0;
            var data;
            for (var i = 0; i < this.showCount; i++) {
                data = this._datas[i];
                if (index === i)
                    break;
                if (this.getDirection() == devil.List.VERTICAL)
                    result += data.height + this._paddingV;
                else
                    result += data.width + this._paddingH;
            }
            return result;
        };
        /**
         * 折半查找法寻找指定位置的显示对象索引
         */
        ListContainer2.prototype.findIndexAt = function (scroll, i0, i1) {
            var index = ((i0 + i1) * 0.5) | 0;
            var data = this._datas[index + 1];
            var position = this.getStartPosition(index * this._col);
            var dis = data != null ? data.width + this._paddingH : 0;
            if (this.getDirection() == devil.List.VERTICAL)
                dis = data != null ? data.height + this._paddingV : 0;
            if ((scroll >= position) && (scroll < position + dis))
                return index;
            else if (i0 == i1)
                return -1;
            else if (scroll < position)
                return this.findIndexAt(scroll, i0, Math.max(i0, index - 1));
            return this.findIndexAt(scroll, Math.min(index + 1, i1), i1);
        };
        ListContainer2.prototype.getIndexInView = function () {
            var count = this.showCount;
            if (count == 0 || this._width == 0 || this._height == 0) {
                this._startIndex = -1;
                this._endIndex = -1;
                return false;
            }
            var itemWH;
            var scroll;
            var wh;
            var data = this._datas[count - 1];
            if (this.getDirection() == devil.List.VERTICAL) {
                itemWH = data.height;
                scroll = this._scrollV;
                wh = this._height;
            }
            else {
                itemWH = data.width;
                scroll = this._scrollH;
                wh = this._width;
            }
            var contentWH = this.getStartPosition(count) + itemWH;
            if (scroll > contentWH) {
                this._startIndex = -1;
                this._endIndex = -1;
                return false;
            }
            var maxScroll = scroll + wh;
            if (maxScroll < 0) {
                this._startIndex = -1;
                this._endIndex = -1;
                return false;
            }
            var oldStartIndex = this._startIndex;
            var oldEndIndex = this._endIndex;
            this._startIndex = this.findIndexAt(scroll, 0, Math.ceil((count - 1) / this._col));
            if (this._startIndex == -1)
                this._startIndex = 0;
            else
                this._startIndex = this._startIndex * this._col >= count ? count - 1 : this._startIndex * this._col;
            this._endIndex = this.findIndexAt(maxScroll, 0, Math.ceil((count - 1) / this._col));
            if (this._endIndex == -1)
                this._endIndex = count - 1;
            else
                this._endIndex = (this._endIndex + 1) * this._col - 1 >= count ? count - 1 : (this._endIndex + 1) * this._col - 1;
            return oldStartIndex != this._startIndex || oldEndIndex != this._endIndex;
        };
        ListContainer2.prototype.drawContentSize = function () {
            var data = this._datas[0];
            if (this.getDirection() == devil.List.VERTICAL) {
                this._contentHeight = this.getStartPosition(this.showCount + 1);
                this._contentWidth = this.showCount > 0 ? data.width : 0;
            }
            else {
                this._contentHeight = this.showCount > 0 ? data.height : 0;
                this._contentWidth = this.getStartPosition(this.showCount + 1) + this.contentWidthOffset;
            }
        };
        return ListContainer2;
    }(devil.ListContainer));
    devil.ListContainer2 = ListContainer2;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 滑动组件进度条
     */
    var ListSlider = /** @class */ (function (_super_1) {
        __extends(ListSlider, _super_1);
        function ListSlider() {
            return _super_1.call(this) || this;
        }
        ListSlider.prototype.setTrackAlpha = function (value) {
            this._trackImg.alpha = value;
        };
        ListSlider.prototype.setTrackSource = function (value) {
            this._trackImg.source = value;
        };
        ListSlider.prototype.setThumbSource = function (value) {
            this._thumbImg.source = value;
        };
        Object.defineProperty(ListSlider.prototype, "posOffset", {
            set: function (value) {
                this._posOffset = value;
                this.invalidate(devil.InvalidationType.LAYOUT);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListSlider.prototype, "sizeOffset", {
            set: function (value) {
                this._sizeOffset = value;
                this.invalidate(devil.InvalidationType.LAYOUT);
            },
            enumerable: false,
            configurable: true
        });
        ListSlider.prototype.initLayer = function () {
            this._layer = this.createLayer();
            this._layer.touchEnabled = true;
        };
        ListSlider.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this.addEvent();
            this._posOffset = 0;
            this._sizeOffset = 0;
            this._trackImg = devil.Manager.component.createImage("", 0, 0, this._width, this._height);
            this.addChild(this._trackImg, this._layer);
            this._thumbImg = devil.Manager.component.createImage("", 0, 0, this._width, this._height / 2);
            this.addChild(this._thumbImg, this._layer);
        };
        ListSlider.prototype.addEvent = function () {
            this._layer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.___handleEvent, this);
            this._layer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___handleEvent, this);
            this._layer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.___handleEvent, this);
            // this._layer.addEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            // this._layer.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            // this._layer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        };
        ListSlider.prototype.removeEvent = function () {
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.___handleEvent, this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___handleEvent, this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.___handleEvent, this);
            // this._layer.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            // this._layer.removeEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            // this._layer.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        };
        ListSlider.prototype.updateContentSize = function () {
            this.invalidate(devil.InvalidationType.DATA);
        };
        /** */
        ListSlider.prototype.containerUpdPos = function (scrollValue) {
            var posPer;
            var posVal;
            if (this.isVertical) {
                posPer = scrollValue / (this.container.contentHeight - this.listHeight);
                posVal = Math.ceil((this._height - this._thumbImg.height) * posPer);
            }
            else {
                posPer = scrollValue / (this.container.contentWidth - this.listWidth);
                posVal = Math.ceil((this._width - this._thumbImg.width) * posPer);
            }
            this.updateThumbPos(posVal, true, false);
        };
        /** 更新位置 */
        ListSlider.prototype.updateThumbPos = function (value, fromContainer, calOffset) {
            if (fromContainer === void 0) { fromContainer = false; }
            if (calOffset === void 0) { calOffset = true; }
            if (this.isVertical) {
                var tempValue = calOffset ? value - (this._thumbImg.height >> 1) : value;
                var thumbY = Math.min(Math.max(0, tempValue), this._height - this._thumbImg.height);
                this._thumbImg.y = thumbY;
                if (this.container && !fromContainer) {
                    var posPer = this._thumbImg.y / (this._height - this._thumbImg.height);
                    var scrollVal = Math.ceil(posPer * (this.container.contentHeight - this.listHeight));
                    this.container.setScrollV(scrollVal, false);
                }
            }
            else {
                var tempValue = calOffset ? value - (this._thumbImg.width >> 1) : value;
                var thumbX = Math.min(Math.max(0, tempValue), this._width - this._thumbImg.width);
                this._thumbImg.x = thumbX;
                if (this.container && !fromContainer) {
                    var posPer = this._thumbImg.x / (this._width - this._thumbImg.width);
                    var scrollVal = Math.ceil(posPer * (this.container.contentWidth - this.listWidth));
                    this.container.setScrollV(scrollVal, false);
                }
            }
        };
        ListSlider.prototype.___handleEvent = function (e) {
            switch (e.type) {
                case egret.TouchEvent.TOUCH_TAP:
                case egret.TouchEvent.TOUCH_BEGIN:
                    {
                        this.updateThumbPos(this.isVertical ? e.localY : e.localX);
                        break;
                    }
                case egret.TouchEvent.TOUCH_MOVE:
                    {
                        this.updateThumbPos(this.isVertical ? e.localY : e.localX);
                        break;
                    }
                // case egret.TouchEvent.TOUCH_CANCEL:
                // case egret.TouchEvent.TOUCH_END:
                // case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                // {
                //     break;
                // }
            }
        };
        ListSlider.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(devil.InvalidationType.SIZE))
                this.drawSize();
            if (this.isInvalid(devil.InvalidationType.DATA))
                this.drawData();
            if (this.isInvalid(devil.InvalidationType.LAYOUT))
                this.drawLayout();
        };
        ListSlider.prototype.drawLayout = function () {
            if (this.isVertical) {
                this._thumbImg.x = this._posOffset;
                this._thumbImg.width = this._width - this._sizeOffset;
            }
            else {
                this._thumbImg.y = this._posOffset;
                this._thumbImg.height = this._height - this._sizeOffset;
            }
        };
        ListSlider.prototype.drawData = function () {
            if (!this.container)
                return;
            if (this.isVertical) {
                if (this.container.contentHeight > this.listHeight) {
                    this._thumbImg.height = Math.max(50, Math.floor(this._height * this.listHeight / this.container.contentHeight));
                    this.updateThumbPos(this._thumbImg.y, false, false);
                }
                else {
                    this._thumbImg.height = this._height;
                    this.updateThumbPos(this._thumbImg.y, false, false);
                }
            }
            else {
                if (this.container.contentWidth > this.listWidth) {
                    this._thumbImg.width = Math.max(50, Math.floor(this._width * this.listWidth / this.container.contentWidth));
                    this.updateThumbPos(this._thumbImg.x, false, false);
                }
                else {
                    this._thumbImg.width = this._width;
                    this.updateThumbPos(this._thumbImg.x, false, false);
                }
            }
        };
        ListSlider.prototype.drawSize = function () {
            this._trackImg.width = this._width;
            this._trackImg.height = this._height;
            if (this.isVertical)
                this._thumbImg.width = this._width - this._sizeOffset;
            else
                this._thumbImg.height = this._height - this._sizeOffset;
        };
        ListSlider.prototype.unuse = function () {
            this.removeEvent();
            this._layer = null;
            this._trackImg = null;
            this._thumbImg = null;
            this.container = null;
            _super_1.prototype.unuse.call(this);
        };
        ListSlider.prototype.dispose = function () {
            this.removeEvent();
            this._layer = null;
            this._trackImg = null;
            this._thumbImg = null;
            this.container = null;
            _super_1.prototype.dispose.call(this);
        };
        return ListSlider;
    }(devil.Container));
    devil.ListSlider = ListSlider;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ScrollBar = /** @class */ (function () {
        function ScrollBar() {
            this.start();
        }
        Object.defineProperty(ScrollBar.prototype, "list", {
            set: function (value) {
                this._list = value;
                this._list.container.layers[0].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___touchBegin, this, true);
                this._list.container.layers[0].addEventListener(egret.TouchEvent.TOUCH_END, this.___touchEnd, this, true);
                this._list.container.layers[0].addEventListener(egret.TouchEvent.TOUCH_TAP, this.___touchTap, this, true);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ScrollBar.prototype, "bounces", {
            /**
             * 是否启用回弹
             */
            set: function (value) {
                if (this._touchScrollV)
                    this._touchScrollV.bounces = value;
                if (this._touchScrollH)
                    this._touchScrollH.bounces = value;
            },
            enumerable: false,
            configurable: true
        });
        ScrollBar.prototype.start = function () {
            this._touchStartX = 0;
            this._touchStartY = 0;
            this._touchMoved = false;
            this._touchCancle = false;
            this._touchScrollH = new devil.TouchScroll(this.___update, null, this);
            this._touchScrollV = new devil.TouchScroll(this.___update, null, this);
        };
        ScrollBar.prototype.removeEvent = function () {
            this._list.layers[0].removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.___touchMove, this);
            devil.Manager.stage.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.___touchEnd, this, true);
            devil.Manager.stage.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.___touchMove, this);
        };
        /**
         * 停止滚动的动画
         */
        ScrollBar.prototype.stopAnimation = function () {
            this._touchScrollV.stop();
            this._touchScrollH.stop();
        };
        ScrollBar.prototype.checkScrollPolicy = function () {
            this._verticalCanScroll = this.checkVH(this._list.scrollPolicyV, this._list.container.contentHeight, this._list.height, this._list.container.getScrollV());
            this._horizontalCanScroll = this.checkVH(this._list.scrollPolicyH, this._list.container.contentWidth, this._list.width, this._list.container.getScrollH());
            return this._verticalCanScroll || this._horizontalCanScroll;
        };
        ScrollBar.prototype.checkVH = function (scrollPolicy, contentWH, wh, scrollValue) {
            var result = false;
            switch (scrollPolicy) {
                case devil.ScrollPolicy.AUTO:
                    result = contentWH > wh || scrollValue != 0;
                    break;
                case devil.ScrollPolicy.ON:
                    result = true;
                    break;
                case devil.ScrollPolicy.OFF:
                    result = false;
                    break;
            }
            return result;
        };
        ScrollBar.prototype.dispatchBubbleEvent = function (e) {
            var cancelEvent = egret.Event.create(egret.TouchEvent, event.type, event.bubbles, event.cancelable);
            cancelEvent.$initTo(e.stageX, e.stageY, e.touchPointID);
            var target = this._downTarget;
            cancelEvent.$setTarget(target);
            var list = this._list.layers[0].$getPropagationList(target);
            var length = list.length;
            var targetIndex = list.length * 0.5;
            var startIndex = -1;
            for (var i = 0; i < length; i++) {
                if (list[i] === this._list.container.layers[0]) {
                    startIndex = i;
                    break;
                }
            }
            list.splice(0, list.length - startIndex + 1);
            targetIndex = 0;
            this._list.layers[0].$dispatchPropagationEvent(cancelEvent, list, targetIndex);
            egret.Event.release(cancelEvent);
        };
        ScrollBar.prototype.pool = function () {
            devil.Manager.pool.push(this);
        };
        ScrollBar.prototype.reuse = function () {
            this.start();
        };
        ScrollBar.prototype.unuse = function () {
            this._list.container.layers[0].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___touchBegin, this, true);
            this._list.container.layers[0].removeEventListener(egret.TouchEvent.TOUCH_END, this.___touchEnd, this, true);
            this._list.container.layers[0].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.___touchTap, this, true);
            this.removeEvent();
            this.stopAnimation();
            this._touchScrollV.dispose();
            this._touchScrollV = null;
            this._touchScrollH.dispose();
            this._touchScrollH = null;
        };
        ScrollBar.prototype.dispose = function () {
            this._list.container.layers[0].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___touchBegin, this, true);
            this._list.container.layers[0].removeEventListener(egret.TouchEvent.TOUCH_END, this.___touchEnd, this, true);
            this._list.container.layers[0].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.___touchTap, this, true);
            this.removeEvent();
            this.stopAnimation();
            this._touchScrollV.dispose();
            this._touchScrollV = null;
            this._touchScrollH.dispose();
            this._touchScrollH = null;
        };
        ScrollBar.prototype.___touchBegin = function (e) {
            this._touchCancle = false;
            if (e.isDefaultPrevented())
                return;
            if (!this.checkScrollPolicy())
                return;
            this._downTarget = e.target;
            this.stopAnimation();
            this._touchStartX = e.stageX;
            this._touchStartY = e.stageY;
            if (this._horizontalCanScroll)
                this._touchScrollH.start(e.stageX);
            if (this._verticalCanScroll)
                this._touchScrollV.start(e.stageY);
            this._list.layers[0].addEventListener(egret.TouchEvent.TOUCH_MOVE, this.___touchMove, this);
            devil.Manager.stage.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.___touchEnd, this, true);
        };
        ScrollBar.prototype.___touchEnd = function (e) {
            if (e.currentTarget == this._list.container.layers[0]) {
                if (this._touchCancle) {
                    e.$bubbles = false;
                    this.dispatchBubbleEvent(e);
                    e.$bubbles = true;
                    e.stopPropagation();
                }
            }
            if (this._touchCancle || e.currentTarget == devil.Manager.stage.stage) {
                this._touchMoved = false;
                this.removeEvent();
                if (this._touchScrollH.isStarted())
                    this._touchScrollH.finish(this._list.container.getScrollH(), this._list.container.contentWidth - this._list.width);
                if (this._touchScrollV.isStarted())
                    this._touchScrollV.finish(this._list.container.getScrollV(), this._list.container.contentHeight - this._list.height);
            }
        };
        ScrollBar.prototype.___touchTap = function (e) {
            if (this._touchCancle) {
                e.$bubbles = false;
                this.dispatchBubbleEvent(e);
                e.$bubbles = true;
                e.stopPropagation();
            }
        };
        ScrollBar.prototype.___touchMove = function (e) {
            if (e.isDefaultPrevented())
                return;
            if (!this._touchMoved) {
                var outX = !(Math.abs(this._touchStartX - e.stageX) < ScrollBar.scrollThreshold);
                var outY = !(Math.abs(this._touchStartY - e.stageY) < ScrollBar.scrollThreshold);
                if (!outX && !outY)
                    return;
                if (!outY && outX && this._list.scrollPolicyH == devil.ScrollPolicy.OFF)
                    return;
                if (!outX && outY && this._list.scrollPolicyV == devil.ScrollPolicy.OFF)
                    return;
                this._touchCancle = true;
                this._touchMoved = true;
                devil.Manager.stage.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.___touchMove, this);
            }
            e.preventDefault();
            if (this._horizontalCanScroll)
                this._touchScrollH.update(e.stageX, this._list.container.contentWidth - this._list.width, this._list.container.getScrollH());
            if (this._verticalCanScroll)
                this._touchScrollV.update(e.stageY, this._list.container.contentHeight - this._list.height, this._list.container.getScrollV());
        };
        ScrollBar.prototype.___update = function (scrollPos, target) {
            if (this._touchScrollH == target)
                this._list.container.setScrollH(scrollPos, true);
            if (this._touchScrollV == target)
                this._list.container.setScrollV(scrollPos, true);
        };
        /**
         * 开始触发滚动的阈值（以像素为单位），当触摸点偏离初始触摸点的距离超过这个值时才会触发滚动。
         */
        ScrollBar.scrollThreshold = 5;
        return ScrollBar;
    }());
    devil.ScrollBar = ScrollBar;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * @author        devil
     * @version       V20190315
     * @create        2019-03-15
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var MAX_VELOCITY_COUNT = 4; //需要记录的历史速度的最大次数。
    var CURRENT_VELOCITY_WEIGHT = 2.33; //当前速度所占的权重。
    var VELOCITY_WEIGHTS = [1, 1.33, 1.66, 2]; //记录的历史速度的权重列表。
    var MINIMUM_VELOCITY = 0.02; //最小的改变速度，解决浮点数精度问题
    var FRICTION = 0.998; //当容器自动滚动时要应用的摩擦系数
    var EXTRA_FRICTION = 0.95; //当容器自动滚动时并且滚动位置超出容器范围时要额外应用的摩擦系数
    var FRICTION_LOG = Math.log(FRICTION); //摩擦系数的自然对数
    var TouchScroll = /** @class */ (function () {
        function TouchScroll(updateFunction, endFunction, target) {
            this._bounces = true;
            this._isStarted = true;
            this._isPlaying = false;
            this._currentPosition = 0;
            this._maxScrollPos = 0;
            this._offsetPoint = 0; //触摸按下时的偏移量
            this._currentScrollPos = 0;
            this._velocity = 0;
            this._previousVelocity = [];
            this._previousPosition = 0;
            this._duration = 500; //动画持续时间,单位毫秒，默认值500
            this._from = 0; //起始值
            this._to = 0; //终点值。
            this._currentValue = 0; //动画到当前时间对应的值。
            this._scrollFactor = 1.0;
            this._updateFun = devil.CallBackInfo.create(updateFunction, target);
            this._endFun = endFunction != null ? devil.CallBackInfo.create(endFunction, target) : null;
        }
        Object.defineProperty(TouchScroll.prototype, "isPlaying", {
            /**
             * 是否正在播放动画，不包括延迟等待和暂停的阶段
             */
            get: function () {
                return this._isPlaying;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TouchScroll.prototype, "bounces", {
            set: function (value) {
                this._bounces = value;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * true表示已经调用过start方法。
         */
        TouchScroll.prototype.isStarted = function () {
            return this.isStarted;
        };
        Object.defineProperty(TouchScroll.prototype, "scrollFactor", {
            /**
             * 当前容器滚动外界可调节的系列
             */
            get: function () {
                return this._scrollFactor;
            },
            set: function (value) {
                this._scrollFactor = value;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @private
         * 开始记录位移变化。注意：当使用完毕后，必须调用 finish() 方法结束记录，否则该对象将无法被回收。
         * @param touchPoint 起始触摸位置，以像素为单位，通常是stageX或stageY。
         */
        TouchScroll.prototype.start = function (touchPoint) {
            this._isStarted = true;
            this._velocity = 0;
            this._previousVelocity.length = 0;
            this._previousPosition = this._currentPosition = touchPoint;
            this._offsetPoint = touchPoint;
            this._startTime = egret.getTimer();
            // Manager.render.add(this.___render,this);           
            egret.startTick(this.___render, this);
        };
        /**
         * 如果正在执行缓动滚屏，停止缓动。
         */
        TouchScroll.prototype.stop = function () {
            this._isPlaying = false;
            // Manager.render.remove(this.___render,this);
            egret.stopTick(this.___render, this);
            this._isStarted = false;
        };
        /**
         * 更新当前移动到的位置
         * @param touchPoint 当前触摸位置，以像素为单位，通常是stageX或stageY。
         */
        TouchScroll.prototype.update = function (touchPoint, maxScrollValue, scrollValue) {
            maxScrollValue = Math.max(maxScrollValue, 0);
            this._currentPosition = touchPoint;
            this._maxScrollPos = maxScrollValue;
            var disMove = this._offsetPoint - touchPoint;
            var scrollPos = disMove + scrollValue;
            this._offsetPoint = touchPoint;
            if (scrollPos < 0) {
                if (!this._bounces)
                    scrollPos = 0;
                else
                    scrollPos -= disMove * 0.5;
            }
            if (scrollPos > maxScrollValue) {
                if (!this._bounces)
                    scrollPos = maxScrollValue;
                else
                    scrollPos -= disMove * 0.5;
            }
            this._currentScrollPos = scrollPos;
            this._updateFun.runCallBack(scrollPos, this);
        };
        /**
         * 缓动到水平滚动位置
         */
        TouchScroll.prototype.tweenTo = function (position, duration) {
            if (duration === void 0) { duration = 500; }
            // duration = duration >> 1;
            if (this._currentScrollPos == position) {
                if (this._endFun)
                    this._endFun.runCallBack();
            }
            else {
                this._duration = duration;
                this._from = this._currentScrollPos;
                this._to = position;
                this._isPlaying = true;
                // this._runningTime = 0;
                this._playStartTime = egret.getTimer();
                this._currentValue = 0;
            }
        };
        TouchScroll.prototype.finishScrolling = function () {
            var hsp = this._currentScrollPos;
            var maxHsp = this._maxScrollPos;
            var hspTo = hsp;
            if (hsp < 0)
                hspTo = 0;
            if (hsp > maxHsp)
                hspTo = maxHsp;
            this.tweenTo(hspTo, 300);
        };
        /**
         * 停止记录位移变化，并计算出目标值和继续缓动的时间。
         * @param currentScrollPos 容器当前的滚动值。
         * @param maxScrollPos 容器可以滚动的最大值。当目标值不在 0~maxValue之间时，将会应用更大的摩擦力，从而影响缓动时间的长度。
         */
        TouchScroll.prototype.finish = function (currentScrollPos, maxScrollPos) {
            this._isStarted = false;
            var sum = this._velocity * CURRENT_VELOCITY_WEIGHT;
            var previousVelocityX = this._previousVelocity;
            var length = previousVelocityX.length;
            var totalWeight = CURRENT_VELOCITY_WEIGHT;
            for (var i = 0; i < length; i++) {
                var weight = VELOCITY_WEIGHTS[i];
                sum += previousVelocityX[0] * weight;
                totalWeight += weight;
            }
            var pixelsPerMS = sum / totalWeight;
            var absPixelsPerMS = Math.abs(pixelsPerMS);
            var duration = 0;
            var posTo = 0;
            if (absPixelsPerMS > MINIMUM_VELOCITY) {
                posTo = currentScrollPos + (pixelsPerMS - MINIMUM_VELOCITY) / FRICTION_LOG * 2 * this._scrollFactor;
                if (posTo < 0 || posTo > maxScrollPos) {
                    posTo = currentScrollPos;
                    while (Math.abs(pixelsPerMS) > MINIMUM_VELOCITY) {
                        posTo -= pixelsPerMS;
                        if (posTo < 0 || posTo > maxScrollPos) {
                            pixelsPerMS *= FRICTION * EXTRA_FRICTION;
                        }
                        else {
                            pixelsPerMS *= FRICTION;
                        }
                        duration++;
                    }
                }
                else {
                    duration = Math.log(MINIMUM_VELOCITY / absPixelsPerMS) / FRICTION_LOG;
                }
            }
            else {
                posTo = currentScrollPos;
            }
            if (duration > 0) {
                //如果取消了回弹,保证动画之后不会超出边界
                if (!this._bounces) {
                    if (posTo < 0) {
                        posTo = 0;
                    }
                    else if (posTo > maxScrollPos) {
                        posTo = maxScrollPos;
                    }
                }
                this.tweenTo(posTo, duration);
            }
            else {
                this.finishScrolling();
            }
        };
        TouchScroll.prototype.easeOut = function (ratio) {
            var invRatio = ratio - 1.0;
            return invRatio * invRatio * invRatio + 1;
        };
        TouchScroll.prototype.dispose = function () {
            // Manager.render.remove(this.___render,this);
            egret.stopTick(this.___render, this);
            if (this._updateFun) {
                this._updateFun.pool();
                this._updateFun = null;
            }
            if (this._endFun) {
                this._endFun.pool();
                this._endFun = null;
            }
        };
        TouchScroll.prototype.___render = function (internal) {
            if (this._isStarted) {
                internal = internal - this._startTime;
                if (internal > 10) {
                    if (this._previousVelocity.length >= MAX_VELOCITY_COUNT)
                        this._previousVelocity.shift();
                    this._velocity = (this._currentPosition - this._previousPosition) / internal;
                    this._previousVelocity.push(this._velocity);
                    this._previousPosition = this._currentPosition;
                }
            }
            if (this._isPlaying) {
                // this._runningTime += internal;
                internal = internal - this._playStartTime;
                // let fraction =this._duration == 0 ? 1 : Math.min(this._runningTime, this._duration) / this._duration;
                var fraction = this._duration == 0 ? 1 : Math.min(internal, this._duration) / this._duration;
                fraction = this.easeOut(fraction);
                this._currentValue = this._from + (this._to - this._from) * fraction;
                this._currentScrollPos = this._currentValue;
                this._updateFun.runCallBack(this._currentValue, this);
                // let isEnded = this._runningTime >= this._duration;
                var isEnded = internal >= this._duration;
                if (isEnded) {
                    this._isPlaying = false;
                    this.finishScrolling();
                }
            }
            return true;
        };
        return TouchScroll;
    }());
    devil.TouchScroll = TouchScroll;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * Tab
     * @author        devil
     * @version       V201190813
     * @create        2019-08-13
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var Tab = /** @class */ (function (_super_1) {
        __extends(Tab, _super_1);
        function Tab() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        Object.defineProperty(Tab.prototype, "selectedIndex", {
            get: function () {
                return this._selectedIndex;
            },
            set: function (value) {
                if (this._selectedIndex == value)
                    return;
                var oldIndex = this._selectedIndex;
                this._selectedIndex = value;
                if (this._selector.selectedIndex != value)
                    this._selector.selectedIndex = value;
                if (this._change != null)
                    this._change.runCallBack(oldIndex, this);
            },
            enumerable: false,
            configurable: true
        });
        Tab.prototype.resetSelectedIndex = function () {
            this._selectedIndex = -1;
        };
        Object.defineProperty(Tab.prototype, "paddingH", {
            get: function () {
                return this._paddingH;
            },
            set: function (value) {
                this._paddingH = value;
            },
            enumerable: false,
            configurable: true
        });
        Tab.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._commLayer = this.createLayer();
            this._commLayer.touchChildren = true;
            this._uiLayer = this.createLayer();
            // this._uiLayer.touchChildren = true;
            this._redLayer = this.createLayer();
            this._selectedIndex = -1;
            this._selector = new devil.RadioSelector();
            this._selector.__change(this.onSelected, this);
            this._paddingH = 5;
        };
        Tab.prototype.onSelected = function (button) {
            this.selectedIndex = this._selector.selectedIndex;
        };
        Tab.prototype.switchRed = function (index, isRed) {
            var button = this._selector.selecteds[index];
            if (button)
                button.switchRed(isRed);
        };
        Tab.prototype.add = function (data) {
            return this.addAt(data, this._selector.selecteds.length);
        };
        Tab.prototype.addAt = function (data, index) {
            var button = devil.View.create(devil.TabButtonIconSelected);
            button.setStyle(devil.TabButtonIconSelected.RED_SKIN, "common_red_png");
            button.setStyle(devil.StyleName.UP_BACK_SKIN, data.upBackSkin);
            button.setStyle(devil.StyleName.SELECT_BACK_SKIN, data.selectedBackSkin);
            button.setStyle(devil.StyleName.UP_ICON_SKIN, data.upIconSkin);
            button.setStyle(devil.StyleName.SELECT_ICON_SKIN, data.selectedfIconSkin);
            button.width = data.width;
            button.height = data.height;
            this.addChild(button, this._commLayer, this._uiLayer, this._redLayer);
            this._selector.addAt(button, index);
            button.setSelector(this._selector);
            if (data.selected)
                this.selectedIndex = index;
            if (data.showRed)
                button.switchRed(true);
            return button;
        };
        /**
         *
         * @param index 此处删除可能有问题，flag
         * @param unuse
         */
        Tab.prototype.removeAt = function (index, unuse) {
            this.removeChildAt(index, unuse);
            this._selector.removeAt(index);
        };
        Tab.prototype.draw = function () {
            _super_1.prototype.draw.call(this);
            if (this.isInvalid(devil.InvalidationType.LAYOUT))
                this.drawLayout();
        };
        Tab.prototype.drawLayout = function () {
            var len = this._children.length;
            for (var i = 1; i < len; i++) {
                this._children[i].x = this._children[i - 1].right + this._paddingH;
            }
        };
        Tab.prototype.unuse = function () {
            this._selector.dispose();
            this._selector = null;
            this._change = null;
            this._commLayer = null;
            this._uiLayer = null;
            this._redLayer = null;
            _super_1.prototype.unuse.call(this);
        };
        Tab.prototype.dispose = function () {
            this._selector.dispose();
            this._selector = null;
            this._change = null;
            this._commLayer = null;
            this._uiLayer = null;
            this._redLayer = null;
            _super_1.prototype.dispose.call(this);
        };
        Tab.prototype.__change = function (callBack, target) {
            this._change = devil.CallBackInfo.create(callBack, target);
        };
        return Tab;
    }(devil.Container));
    devil.Tab = Tab;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * Tab选中按钮图标
     * @author        devil
     * @version       V201190215
     * @create        2019-02-15
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var TabButtonIconSelected = /** @class */ (function (_super_1) {
        __extends(TabButtonIconSelected, _super_1);
        function TabButtonIconSelected() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        Object.defineProperty(TabButtonIconSelected.prototype, "index", {
            get: function () {
                return this._index;
            },
            set: function (value) {
                this._index = value;
            },
            enumerable: false,
            configurable: true
        });
        TabButtonIconSelected.prototype.initLayer = function () {
            _super_1.prototype.initLayer.call(this);
            this._commonLayer1 = this.createLayer();
        };
        TabButtonIconSelected.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._index = 0;
            this._downOffset = false;
        };
        TabButtonIconSelected.prototype.setDefaultStyle = function () {
            _super_1.prototype.setDefaultStyle.call(this);
            this._styles[TabButtonIconSelected.RED_SKIN] = null;
        };
        TabButtonIconSelected.prototype.setSelected = function (value) {
            if (this._common)
                this._common.selected = value;
        };
        TabButtonIconSelected.prototype.getSelected = function () {
            return this._common.selected;
        };
        TabButtonIconSelected.prototype.setSelector = function (value) {
            this._selector = value;
        };
        TabButtonIconSelected.prototype.switchRed = function (show) {
            if (show && this._red == null) {
                this._red = devil.View.create(devil.Image);
                this._red.source = this.getStyle(TabButtonIconSelected.RED_SKIN);
                this._red.move(this._width - 33, 4);
            }
            if (this._red) {
                if (show && this._red.parent == null)
                    this.addChild(this._red, this._commonLayer1);
                else if (!show && this._red.parent != null)
                    this.removeChild(this._red, false);
            }
        };
        TabButtonIconSelected.prototype.setData = function (value) {
            this.setSize(value.width, value.height);
            this.setStyle(TabButtonIconSelected.RED_SKIN, "common_red_png");
            this.setStyle(devil.StyleName.UP_BACK_SKIN, value.upBackSkin);
            this.setStyle(devil.StyleName.SELECT_BACK_SKIN, value.selectedBackSkin);
            this.setStyle(devil.StyleName.UP_ICON_SKIN, value.upIconSkin);
            this.setStyle(devil.StyleName.SELECT_ICON_SKIN, value.selectedfIconSkin);
            if (value.index == 0)
                this.setIconOffset(-18, 0);
            else
                this.setIconOffset(0, 0);
            this.switchRed(value.showRed);
            if (value.selected)
                this._selector.selectedView = this;
        };
        TabButtonIconSelected.prototype.clearData = function () {
        };
        TabButtonIconSelected.prototype.unuse = function () {
            this._commonLayer1 = null;
            this._selector = null;
            if (this._red != null && this._red.parent)
                this._red.pool();
            this._red = null;
            _super_1.prototype.unuse.call(this);
        };
        TabButtonIconSelected.prototype.dispose = function () {
            this._commonLayer1 = null;
            this._selector = null;
            if (this._red != null && this._red.parent)
                this._red.pool();
            this._red = null;
            _super_1.prototype.dispose.call(this);
        };
        TabButtonIconSelected.prototype.___handleEvent = function (e) {
            if (e.type == egret.TouchEvent.TOUCH_TAP) {
                if (this._common.selected)
                    return;
                this._selector.selectedView = this;
            }
            else {
                if (this._common.selected)
                    return;
            }
            this.___$handleEvent(e);
        };
        TabButtonIconSelected.RED_SKIN = "redSkin";
        return TabButtonIconSelected;
    }(devil.ButtonIconSelected));
    devil.TabButtonIconSelected = TabButtonIconSelected;
})(devil || (devil = {}));
var devil;
(function (devil) {
    var TabData = /** @class */ (function () {
        function TabData(upBackSkin, selectedBackSkin, upIconSkin, selectedIconSkin) {
            this.upBackSkin = "common2_tab1_png";
            this.selectedBackSkin = "common2_tab2_png";
            this.upBackSkin = upBackSkin;
            this.selectedBackSkin = selectedBackSkin;
            this.upIconSkin = upIconSkin;
            this.selectedfIconSkin = selectedIconSkin;
        }
        return TabData;
    }());
    devil.TabData = TabData;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 数组工具类
     * @author        devil
     * @version       V20190523
     * @create        2019-05-23
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ArrayUtil = /** @class */ (function () {
        function ArrayUtil() {
        }
        /**
         * 将某一格式的字符串转成数字类型数组,可带有{}格式
         * @param str
         * @param splitStr
         */
        ArrayUtil.parseStringToArray = function (str, splitStr) {
            if (splitStr === void 0) { splitStr = ","; }
            var reg = /{|}| /g;
            str = str.replace(reg, "");
            var arr = str.split(splitStr);
            var result = [];
            for (var i = 0; i < arr.length; i++) {
                result.push(parseInt(arr[i]));
            }
            return result;
        };
        /**
         * 数组中删除
         * @param array
         * @param value
         */
        ArrayUtil.deleteObject = function (array, value) {
            var index = array.indexOf(value);
            if (index != -1)
                array.splice(index, 1);
        };
        /**
         * 多属性排序,arrProperty与arrSort对应
         * @param arrProperty 属性列表
         * @param arrSort 排序方式(默认正序) 0正序 1倒序
         * @return 排序后的数组
         */
        ArrayUtil.sortOn = function (arr, arrProperty, arrSort) {
            if (arrSort === void 0) { arrSort = null; }
            if (arr == null || arr.length == 0)
                return arr;
            return arr.sort(function (obj1, obj2) {
                var len = arrProperty.length;
                var property = "";
                var sortLen = arrSort ? arrSort.length : 0;
                if (sortLen > len)
                    sortLen = len;
                var sortType = 0;
                var result = 0;
                for (var i = 0; i < len; i++) {
                    property = arrProperty[i];
                    sortType = 0;
                    if (i < sortLen)
                        sortType = arrSort[i];
                    result = Number(obj1[property]) - Number(obj2[property]);
                    if (result == 0)
                        continue;
                    if (sortType == 0)
                        return result;
                    return -result;
                }
                return 0;
            });
        };
        /**
         * 对数组随机排行
         * @param value
         */
        ArrayUtil.randomSort = function (value) {
            value.sort(function (obj1, obj2) {
                return Math.random() < 0.5 ? 1 : -1;
            });
        };
        /**
         * 获取数组随机值
         * @param arr
         */
        ArrayUtil.random = function (arr) {
            return arr[Math.floor(arr.length * Math.random())];
        };
        return ArrayUtil;
    }());
    devil.ArrayUtil = ArrayUtil;
})(devil || (devil = {}));
var devil;
(function (devil) {
    var AssetAdapter = /** @class */ (function () {
        function AssetAdapter() {
        }
        /**
         * @language zh_CN
         * 解析素材
         * @param source 待解析的新素材标识符
         * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
         * @param thisObject callBack的 this 引用
         */
        AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
            function onGetRes(loader) {
                compFunc.call(thisObject, loader.getTexture(source), source);
            }
            var path = devil.PathInfo.getPath(devil.Model.resConfig.getURL(source), devil.LoaderType.TEXTURE);
            devil.Manager.loader.load(path, onGetRes, this, devil.ResourceGCType.NEVER);
        };
        return AssetAdapter;
    }());
    devil.AssetAdapter = AssetAdapter;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 字节工具类
     * @author        devil
     * @version       V20190425
     * @create        2019-04-29
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ByteUtil = /** @class */ (function () {
        function ByteUtil() {
        }
        ByteUtil.toHexDump = function (desc, dump, start, count) {
            var hexDump = "";
            if (desc != null) {
                hexDump += desc;
                hexDump += "\n";
            }
            var end = start + count;
            for (var i = start; i < end; i += 16) {
                var text = "";
                var hex = "";
                for (var j = 0; j < 16; j++) {
                    if (j + i < end) {
                        var val = dump.bytes[j + i];
                        if (val < 16) {
                            hex += "0" + val.toString(16) + " ";
                        }
                        else {
                            hex += val.toString(16) + " ";
                        }
                        if (val >= 32 && val <= 127) {
                            text += String.fromCharCode(val);
                        }
                        else {
                            text += ".";
                        }
                    }
                    else {
                        hex += "   ";
                        text += " ";
                    }
                }
                hex += "  ";
                hex += text;
                hex += "\n";
                hexDump += hex;
            }
            return hexDump;
        };
        return ByteUtil;
    }());
    devil.ByteUtil = ByteUtil;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 回调函数信息类
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    var CallBackInfo = /** @class */ (function () {
        function CallBackInfo() {
        }
        Object.defineProperty(CallBackInfo.prototype, "target", {
            get: function () {
                return this._target;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CallBackInfo.prototype, "callBack", {
            get: function () {
                return this._callBack;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 执行回调函数
         */
        CallBackInfo.prototype.runCallBack = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (args.length > 0)
                this._args = args;
            if (this._args == null || this._args.length == 0)
                this._callBack.call(this._target);
            else {
                this._callBack.apply(this._target, this._args);
            }
        };
        CallBackInfo.prototype.equals = function (callBack, target) {
            return this._callBack == callBack && this._target == target;
        };
        CallBackInfo.prototype.pool = function () {
            devil.Manager.pool.push(this);
        };
        CallBackInfo.prototype.reuse = function () {
        };
        CallBackInfo.prototype.unuse = function () {
            this._callBack = null;
            this._target = null;
            this._args = null;
        };
        CallBackInfo.prototype.dispose = function () {
            this.unuse();
        };
        CallBackInfo.create = function (callBack, target) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var result = devil.Manager.pool.create(CallBackInfo);
            result._callBack = callBack;
            result._target = target;
            result._args = args;
            return result;
        };
        /**
         * 指定的回调函数数组中是否有指定的回调函数，如果存在，则返回对应的索引值，否则返回-1
         * @param callBacks 回调函数数组
         * @param callBack  回调函数
         * @param target    回调函数对象
         */
        CallBackInfo.contains = function (callBacks, callBack, target) {
            var len = callBacks.length;
            for (var i = 0; i < len; i++) {
                if (callBacks[i]._callBack == callBack && callBacks[i]._target == target)
                    return i;
            }
            return -1;
        };
        return CallBackInfo;
    }());
    devil.CallBackInfo = CallBackInfo;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 颜色工具类
     * @author        devil
     * @version       V20190221
     * @create        2019-02-21
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ColorUtil = /** @class */ (function () {
        function ColorUtil() {
        }
        ColorUtil.getRandomColor = function () {
            return 0xffffff * Math.random();
        };
        ColorUtil.getColor = function (value) {
            return "0x" + value.toString(16);
        };
        ColorUtil.getHtmlColor = function (value) {
            return "#" + value.toString(16);
        };
        return ColorUtil;
    }());
    devil.ColorUtil = ColorUtil;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 日期工具类
     * @author        devil
     * @version       V20190425
     * @create        2019-04-29
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var DateUtil = /** @class */ (function () {
        function DateUtil() {
        }
        /**
         * 格式化日期为指定的格式的字符串
         * @param seconds
         * @param format
         * @param isLeft
         */
        DateUtil.formatStr = function (seconds, format, isLeft) {
            if (isLeft === void 0) { isLeft = false; }
            var date = new Date(seconds * 1000);
            var year;
            var month;
            var day;
            var hour;
            var minute;
            var second;
            if (isLeft) {
                if (seconds > 0) {
                    day = Math.floor(seconds / (3600 * 24));
                    var temp = Math.floor(seconds % (3600 * 24));
                    hour = Math.floor(temp / 3600);
                    minute = Math.floor(temp / 60) % 60;
                    second = temp % 60;
                }
                else {
                    day = 0;
                    hour = 0;
                    minute = 0;
                    second = 0;
                }
            }
            else {
                year = date.getFullYear();
                month = date.getMonth() + 1;
                day = date.getDate();
                hour = date.getHours();
                minute = date.getMinutes();
                second = date.getSeconds();
            }
            var monthStr = month < 10 ? "0" + month : month + "";
            var dayStr = day < 10 ? "0" + day : day + "";
            var hourStr = hour < 10 ? "0" + hour : hour + "";
            var minuteStr = minute < 10 ? "0" + minute : minute + "";
            var secondStr = second < 10 ? "0" + second : second + "";
            if (format == this.YYYY_MM_DD_HH_MM_SS)
                return year + "/" + monthStr + "/" + dayStr + " " + hourStr + ":" + minuteStr + ":" + secondStr;
            else if (format == this.MM_DD_HH_MM)
                return monthStr + "/" + dayStr + " " + hourStr + ":" + minuteStr;
            else if (format == this.HH_MM)
                return hourStr + ":" + minuteStr;
            else if (format == this.MM_SS)
                return minuteStr + ":" + secondStr;
            else if (format == this.LEFT_DD_HH_MM)
                return dayStr + "天" + hourStr + "小时" + minuteStr + "分";
            else if (format == this.LEFT_MM_SS)
                return minuteStr + ":" + secondStr;
            else if (format == this.LEFT_HH_MM_SS)
                return hourStr + ":" + minuteStr + ":" + secondStr;
            else if (format == this.LEFT_M_SS)
                return minute + ":" + secondStr;
            else if (format == this.LEFT_DAY_OR_HH_MM_SS) {
                if (day > 0)
                    return day + "天";
                return hourStr + ":" + minuteStr + ":" + secondStr;
            }
            else
                return "";
        };
        DateUtil.getDateBySecs = function (secs) {
            var result = new Date();
            result.setTime(secs * 1000);
            return result;
        };
        /**
         * 获取日期之间相距的天数
         * @param date1
         * @param date2
         */
        DateUtil.disDay = function (date1, date2) {
            var dt = date2.getTime() - date1.getTime();
            return dt / 1000 / 60 / 60 / 24;
        };
        /**
         *获取经过的总天数。距离 1970 年 1 月 1 日
         * @param date
         * @return
         *
         */
        DateUtil.getTotalDays = function (date) {
            return Number((date.getTime() - date.getTimezoneOffset() * 60 * 1000) / (24 * 60 * 60 * 1000));
        };
        /**
         *返回当年当月有多少天
         * @param year
         * @param month
         * @return
         *
         */
        DateUtil.getDates = function (year, month) {
            var date1 = new Date(year, month, 1);
            var date2 = new Date(year, month + 1, 1);
            return Number(this.disDay(date1, date2));
        };
        DateUtil.YYYY_MM_DD_HH_MM_SS = "YYYY_MM_DD_HH_MM_SS";
        DateUtil.MM_DD_HH_MM = "MM_DD_HH_MM_SS";
        DateUtil.HH_MM = "HH_MM";
        DateUtil.MM_SS = "MM_SS";
        DateUtil.LEFT_DD_HH_MM = "LEFT_DD_HH_MM";
        DateUtil.LEFT_MM_SS = "LEFT_MM_SS";
        DateUtil.LEFT_HH_MM_SS = "LEFT_HH_MM_SS";
        DateUtil.LEFT_M_SS = "LEFT_M_SS";
        DateUtil.LEFT_DAY_OR_HH_MM_SS = "LEFT_DAY_OR_HH_MM_SS";
        return DateUtil;
    }());
    devil.DateUtil = DateUtil;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 字典工具类
     * @author        devil
     * @version       V20190425
     * @create        2019-04-29
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var Dictionary = /** @class */ (function () {
        function Dictionary() {
            this._keys = [];
            this._values = [];
            this._map = {};
        }
        Dictionary.prototype.get = function (key) {
            return this._map[key];
        };
        Dictionary.prototype.add = function (key, value) {
            if (value == undefined || value == null)
                return;
            this.remove(key);
            this._map[key] = value;
            this._keys.push(key);
            this._values.push(value);
        };
        Dictionary.prototype.remove = function (key) {
            var value = this._map[key];
            if (value == undefined)
                return;
            var index = this._keys.indexOf(key, 0);
            if (index > -1) {
                this._keys.splice(index, 1);
                this._values.splice(index, 1);
            }
            delete this._map[key];
            return value;
        };
        Dictionary.prototype.removeAll = function () {
            this._keys = [];
            this._values = [];
            this._map = {};
        };
        Dictionary.prototype.keys = function () {
            return this._keys;
        };
        Dictionary.prototype.values = function () {
            return this._values;
        };
        Dictionary.prototype.containsKey = function (key) {
            return this._map[key] != undefined;
        };
        return Dictionary;
    }());
    devil.Dictionary = Dictionary;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 控制长按，
     * 有些特殊情况，长按超过三次触发会变快长按节奏
     * 当按住结束也会触发长按事件，通过第二个参数来区别
     * @author        xujinhong
     * @version       V20190918
     * @create        2019-09-18
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var DisplayLongClick = /** @class */ (function () {
        function DisplayLongClick() {
            this.start();
        }
        Object.defineProperty(DisplayLongClick.prototype, "display", {
            /** 设置长按对象 */
            set: function (value) {
                this.removeEvent();
                this._display = value;
                this.addEvent();
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 长按事件
         */
        DisplayLongClick.prototype.__longClick = function (callBack, target, clickObj) {
            this._longClickObj = clickObj;
            this._longClickFun = devil.CallBackInfo.create(callBack, target);
        };
        /**
         * 长按事件
         */
        DisplayLongClick.prototype.__click = function (callBack, target, clickObj) {
            this._clickObj = clickObj;
            this._clickFun = devil.CallBackInfo.create(callBack, target);
        };
        DisplayLongClick.prototype.start = function () {
            this._isDown = false;
            this._longClickCnt = 0;
            this._isAddEvt = false;
        };
        DisplayLongClick.prototype.addEvent = function () {
            if (this._isAddEvt || !this._display)
                return;
            this._isAddEvt = true;
            this._display.touchEnabled = true;
            this._display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___handleEvent, this);
            this._display.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            this._display.addEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            this._display.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        };
        DisplayLongClick.prototype.removeEvent = function () {
            if (!this._isAddEvt || !this._display)
                return;
            this._isAddEvt = false;
            this._display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___handleEvent, this);
            this._display.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            this._display.removeEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            this._display.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        };
        /**
         * @private
         */
        DisplayLongClick.prototype.___handleEvent = function (e) {
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this._isDown = true;
                    this._longClickCnt = 0;
                    if (this._longClickFun) {
                        devil.Manager.render.add(this.___checkLongClick, this, 300, 0);
                    }
                    break;
                case egret.TouchEvent.TOUCH_END:
                    if (this._longClickCnt == 0 && this._clickFun)
                        this._clickFun.runCallBack(e, this._clickObj);
                    this._isDown = false;
                    break;
                case egret.TouchEvent.TOUCH_CANCEL:
                case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                    this._isDown = false;
                    break;
            }
        };
        /** */
        DisplayLongClick.prototype.___checkLongClick = function () {
            if (!this._isDown) {
                if (this._longClickFun)
                    this._longClickFun.runCallBack(this._longClickObj, true);
                devil.Manager.render.remove(this.___checkLongClick, this);
                return;
            }
            ++this._longClickCnt;
            if (this._longClickFun != null) {
                this._longClickFun.runCallBack(this._longClickObj, false);
                if (this._longClickCnt >= 3) {
                    devil.Manager.render.add(this.___checkLongClick, this, 30, 0, null, true);
                }
            }
        };
        DisplayLongClick.prototype.reuse = function () {
            this.start();
        };
        DisplayLongClick.prototype.pool = function () {
            devil.Manager.pool.push(this);
        };
        DisplayLongClick.prototype.unuse = function () {
            devil.Manager.render.remove(this.___checkLongClick, this);
            this.removeEvent();
            if (this._longClickFun) {
                this._longClickFun.pool();
                this._longClickFun = null;
            }
            this._longClickObj = null;
            if (this._clickFun) {
                this._clickFun.pool();
                this._clickFun = null;
            }
            this._clickObj = null;
            this._display = null;
        };
        DisplayLongClick.prototype.dispose = function () {
            devil.Manager.render.remove(this.___checkLongClick, this);
            this.removeEvent();
            if (this._longClickFun) {
                this._longClickFun.pool();
                this._longClickFun = null;
            }
            this._longClickObj = null;
            if (this._clickFun) {
                this._clickFun.pool();
                this._clickFun = null;
            }
            this._clickObj = null;
            this._display = null;
        };
        return DisplayLongClick;
    }());
    devil.DisplayLongClick = DisplayLongClick;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 滤镜工具类
     * @author        devil
     * @version       V20190926
     * @create        2019-09-26
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var FilterUtil = /** @class */ (function () {
        function FilterUtil() {
        }
        /**
         * 设置成灰色
         * @param value
         */
        FilterUtil.setGrayFilter = function (value) {
            // return;
            if (egret.Capabilities.renderMode != "webgl")
                return;
            //颜色矩阵数组
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            value.filters = [colorFlilter];
        };
        return FilterUtil;
    }());
    devil.FilterUtil = FilterUtil;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 绘图工具类
     * @author        devil
     * @version       V20190131
     * @create        2019-01-31
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var GraphicsUtil = /** @class */ (function () {
        function GraphicsUtil() {
        }
        GraphicsUtil.createRectSprite = function (x, y, width, height, color, alpha) {
            if (color === void 0) { color = 0; }
            if (alpha === void 0) { alpha = 1; }
            var result = devil.Manager.pool.createSprite();
            this.drawRect(result.graphics, x, y, width, height, color, alpha);
            return result;
        };
        GraphicsUtil.createRectShape = function (x, y, width, height, color, alpha) {
            if (color === void 0) { color = 0; }
            if (alpha === void 0) { alpha = 1; }
            var result = devil.Manager.pool.createShape();
            this.drawRect(result.graphics, x, y, width, height, color, alpha);
            return result;
        };
        GraphicsUtil.drawRect = function (graphics, x, y, width, height, color, alpha) {
            if (color === void 0) { color = 0; }
            if (alpha === void 0) { alpha = 1; }
            graphics.clear();
            graphics.beginFill(color, alpha);
            graphics.drawRect(x, y, width, height);
            graphics.endFill();
        };
        GraphicsUtil.createCircleSprite = function (x, y, radius, color, alpha) {
            if (color === void 0) { color = 0; }
            if (alpha === void 0) { alpha = 1; }
            var result = devil.Manager.pool.createSprite();
            this.drawCircle(result.graphics, x, y, radius, color, alpha);
            return result;
        };
        GraphicsUtil.createCircleShape = function (x, y, radius, color, alpha) {
            if (color === void 0) { color = 0; }
            if (alpha === void 0) { alpha = 1; }
            var result = devil.Manager.pool.createShape();
            this.drawCircle(result.graphics, x, y, radius, color, alpha);
            return result;
        };
        GraphicsUtil.drawCircle = function (graphics, x, y, radius, color, alpha) {
            if (color === void 0) { color = 0; }
            if (alpha === void 0) { alpha = 1; }
            graphics.clear();
            graphics.beginFill(color, alpha);
            graphics.drawCircle(x, y, radius);
            graphics.endFill();
        };
        GraphicsUtil.createRectBoderShape = function (x, y, width, height, color, alpha) {
            if (color === void 0) { color = 0; }
            var result = devil.Manager.pool.createShape();
            result.graphics.lineStyle(.1, color);
            result.graphics.drawRect(x, y, width, height);
            return result;
        };
        /**
         * 绘制弧形
         * @param graphics
         * @param x
         * @param y
         * @param r
         * @param color
         * @param angle			角度，以度为单位
         * @param startFrom
         */
        GraphicsUtil.drawSector = function (graphics, x, y, r, color, angle, startFrom) {
            graphics.clear();
            graphics.beginFill(color, 1);
            graphics.lineStyle(0, color);
            graphics.moveTo(x, y);
            angle = (Math.abs(angle) > 360) ? 360 : angle;
            var n = Math.ceil(Math.abs(angle) / 45);
            var angleA = angle / n;
            angleA = angleA * Math.PI / 180;
            startFrom = startFrom * Math.PI / 180;
            graphics.lineTo(x + r * Math.cos(startFrom), y + r * Math.sin(startFrom));
            for (var i = 1; i <= n; i++) {
                startFrom += angleA;
                var angleMid = startFrom - angleA / 2;
                var bx = x + r / Math.cos(angleA / 2) * Math.cos(angleMid);
                var by = y + r / Math.cos(angleA / 2) * Math.sin(angleMid);
                var cx = x + r * Math.cos(startFrom);
                var cy = y + r * Math.sin(startFrom);
                graphics.curveTo(bx, by, cx, cy);
            }
            if (angle != 360) {
                graphics.lineTo(x, y);
            }
            graphics.endFill();
        };
        /**
         * 画虚线
         * @param graphics
         * @param x
         * @param y
         * @param dashedWidth		虚线线段的长度
         * @param space				虎线线段间距
         * @param width				整个虚线的宽度
         * @param color
         * @param alpha
         */
        GraphicsUtil.drawDashed = function (graphics, x, y, dashedWidth, space, width, color, alpha) {
            if (color === void 0) { color = 0; }
            if (alpha === void 0) { alpha = 1; }
            graphics.clear();
            var count = Math.ceil(width / (dashedWidth + space));
            graphics.lineStyle(1, color, alpha);
            var startX = x;
            for (var i = 0; i < count; i++) {
                startX = i * (dashedWidth + space) + x;
                graphics.moveTo(startX, y);
                graphics.lineTo(startX + dashedWidth, y);
            }
        };
        return GraphicsUtil;
    }());
    devil.GraphicsUtil = GraphicsUtil;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * HTML字符串工具类
     * @author        devil
     * @version       V20190222
     * @create        2019-02-22
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var HtmlUtil = /** @class */ (function () {
        function HtmlUtil() {
        }
        /**
         * tf egret.TextField | eui.Label | TextField
         */
        HtmlUtil.setHtml = function (tf, htmlText) {
            tf.textFlow = new egret.HtmlTextParser().parse(htmlText);
        };
        HtmlUtil.addBTag = function (str) {
            return "<b>" + str + "</b>";
        };
        HtmlUtil.addUTag = function (str) {
            return "<u>" + str + "</u>";
        };
        HtmlUtil.addFontTag = function (str, font) {
            return "<font fontFamily='" + font + "'>" + str + "</font>";
        };
        HtmlUtil.addColorTag = function (str, color) {
            return "<font color='" + color + "'>" + str + "</font>";
        };
        HtmlUtil.addColorSizeTag = function (str, color, size) {
            if (size === void 0) { size = 0; }
            if (size == 0)
                size = egret.TextField.default_size;
            return "<font color='" + color + "' size='" + size + "'>" + str + "</font>";
        };
        HtmlUtil.addATag = function (str, event) {
            if (event === void 0) { event = ""; }
            return "<a href = 'event:" + event + "'>" + str + "</a>";
        };
        HtmlUtil.addColorUATag = function (str, color, event) {
            if (event === void 0) { event = ""; }
            return "<a href = 'event:" + event + "'><u><font color='" + color + "'>" + str + "</font></u></a>";
        };
        return HtmlUtil;
    }());
    devil.HtmlUtil = HtmlUtil;
})(devil || (devil = {}));
var devil;
(function (devil) {
    var MathUtil = /** @class */ (function () {
        function MathUtil() {
        }
        /**
         * 返回介于[min,max]的值，其中max一定大于min
         */
        MathUtil.clamb = function (min, max, value) {
            if (value <= min)
                return min;
            if (value >= max)
                return max;
            return value;
        };
        /**
         *  [min,max]
         * @param min
         * @param max
         * @param value
         */
        MathUtil.isBetween = function (min, max, value) {
            if (min <= value && value <= max)
                return true;
            return false;
        };
        MathUtil.distance = function (x, y, x1, y1) {
            return Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        };
        MathUtil.angle = function (radian) {
            return radian * 180 / Math.PI;
        };
        MathUtil.radian = function (angle) {
            return angle * Math.PI / 180;
        };
        MathUtil.atan2 = function (y, x) {
            return Math.atan2(y, x) * 180 / Math.PI;
        };
        MathUtil.cos = function (angle) {
            return Math.cos(angle / 180 * Math.PI);
        };
        MathUtil.sin = function (angle) {
            return Math.sin(angle / 180 * Math.PI);
        };
        return MathUtil;
    }());
    devil.MathUtil = MathUtil;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 对象工具管理器
     * @author        devil
     * @version       Nov 25, 2018
     * @create        Nov 25, 2018
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ObjectUtil = /** @class */ (function () {
        function ObjectUtil() {
        }
        /**
         * 将指定的显示对象从(指定的)父级中删除，但不释放内存
         * @param child         指定的显示对象
         * @param container     指定的容器。一旦指定了此参数，则指定的显示对象一定要在此容器中才会删除。
         */
        ObjectUtil.removeFromParent = function (child, parent) {
            if (parent === void 0) { parent = null; }
            if (child == null)
                return;
            if (child.parent != null && (parent == child.parent || parent == null))
                child.parent.removeChild(child);
        };
        /**
         * 批量将显示对象从自身的父级中删除，但不释放内存
         * @param childs
         */
        ObjectUtil.removes = function () {
            var childs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                childs[_i] = arguments[_i];
            }
            var i = childs.length - 1;
            while (i >= 0) {
                this.removeFromParent(childs[i]);
                i--;
            }
        };
        ObjectUtil.dispose = function (child) {
            if (!!child)
                child.dispose();
        };
        return ObjectUtil;
    }());
    devil.ObjectUtil = ObjectUtil;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * Point工具类
     * @author        devil
     * @version       V20190425
     * @create        2019-04-29
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var PointUtil = /** @class */ (function () {
        function PointUtil() {
        }
        PointUtil.getAngle = function (x1, y1, x2, y2) {
            return this.getRadian(x1, y1, x2, y2) / Math.PI * 180;
        };
        PointUtil.getRadian = function (x1, y1, x2, y2) {
            return Math.atan2(y2 - y1, x2 - x1);
        };
        /**
         * 以的指定的点为圆心，获取指定角度和长度的点
         * @param p
         * @param angle
         * @param disance
         */
        PointUtil.getNextPoint = function (p, angle, disance) {
            return new egret.Point(p.x + Math.cos(angle) * disance, p.y + Math.sin(angle) * disance);
        };
        /**
         * 判断p是否在p1和p2所组成的矩形中,p1、p2不分先后
         * @param p1
         * @param p2
         * @param p
         */
        PointUtil.inRect = function (p1, p2, p) {
            return this.inRect2(p1, p2, p.x, p.y);
        };
        /**
         * 判断p是否在p1和p2所组成的矩形中,p1、p2不分先后
         * @param p1
         * @param p2
         * @param x
         * @param y
         */
        PointUtil.inRect2 = function (p1, p2, x, y) {
            var disX = Math.abs(p1.x - p2.x);
            var disY = Math.abs(p1.y - p2.y);
            var disX1 = Math.abs(x - p1.x);
            var disX2 = Math.abs(x - p2.x);
            var disY1 = Math.abs(y - p1.y);
            var disY2 = Math.abs(y - p2.y);
            return (disX == disX1 + disX2) && (disY == disY1 + disY2);
        };
        /**
         * 字符串数组转成点坐标
         * @param src
         */
        PointUtil.getPoint = function (src) {
            return new egret.Point(parseInt(src[0]), parseInt(src[1]));
        };
        /**
         * 以指定分隔符分隔的字符串转成点坐标
         * @param src
         */
        PointUtil.getPoint2 = function (src, splitStr) {
            if (splitStr === void 0) { splitStr = ","; }
            var arr = src.split(splitStr);
            return new egret.Point(parseInt(arr[0]), parseInt(arr[1]));
        };
        /**
         * 以指定分隔符分隔的字符串转成点坐标数组
         * @param src
         */
        PointUtil.getPoints = function (src, splitStr1, splitStr2) {
            if (splitStr1 === void 0) { splitStr1 = "|"; }
            if (splitStr2 === void 0) { splitStr2 = ","; }
            var result = [];
            var arr = src.split(splitStr1);
            for (var i = 0; i < arr.length; i++) {
                result.push(this.getPoint2(arr[i]));
            }
            return result;
        };
        return PointUtil;
    }());
    devil.PointUtil = PointUtil;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 选择器
     * @author        devil
     * @version       V201190215
     * @create        2019-02-15
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var RadioSelector = /** @class */ (function () {
        function RadioSelector() {
            this._selecteds = [];
        }
        Object.defineProperty(RadioSelector.prototype, "selecteds", {
            get: function () {
                return this._selecteds;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RadioSelector.prototype, "currentSelected", {
            get: function () {
                return this._currentSelected;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RadioSelector.prototype, "selectedIndex", {
            get: function () {
                return this._selecteds.indexOf(this._currentSelected);
            },
            set: function (value) {
                value = devil.MathUtil.clamb(0, this._selecteds.length < 0 ? 0 : this._selecteds.length - 1, value);
                if (this._currentSelected != this._selecteds[value]) {
                    if (this._currentSelected != null)
                        this._currentSelected.setSelected(false);
                    this._currentSelected = this.selecteds[value];
                    this._currentSelected.setSelected(true);
                    if (this._changFun != null)
                        this._changFun.runCallBack(this._currentSelected);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RadioSelector.prototype, "selectedView", {
            set: function (value) {
                var index = this._selecteds.indexOf(value);
                if (index != -1)
                    this.selectedIndex = index;
            },
            enumerable: false,
            configurable: true
        });
        RadioSelector.prototype.add = function (selected) {
            this.addAt(selected, this._selecteds.length);
        };
        RadioSelector.prototype.addAt = function (selected, index) {
            if (this._selecteds.indexOf(selected) == -1)
                this._selecteds.splice(index, 0, selected);
        };
        RadioSelector.prototype.remove = function (selected) {
            var index = this._selecteds.indexOf(selected);
            if (index != -1)
                this.removeAt(index);
        };
        RadioSelector.prototype.cancel = function () {
            if (this._currentSelected != null)
                this._currentSelected.setSelected(false);
            this._currentSelected = null;
        };
        RadioSelector.prototype.removeAt = function (index) {
            if (this._selecteds[index] == this._currentSelected) {
                this.cancel();
            }
            this._selecteds.splice(index, 1);
        };
        RadioSelector.prototype.clear = function () {
            this.cancel();
            this._selecteds.length = 0;
        };
        RadioSelector.prototype.pool = function () {
            this.dispose();
        };
        RadioSelector.prototype.dispose = function () {
            this._selecteds = null;
            if (this._changFun != null) {
                this._changFun.pool();
                this._changFun = null;
            }
            this._currentSelected = null;
        };
        // public __change(callBack:Function,target:any):void
        RadioSelector.prototype.__change = function (callBack, target) {
            this._changFun = devil.CallBackInfo.create(callBack, target);
        };
        return RadioSelector;
    }());
    devil.RadioSelector = RadioSelector;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 字符串工具类
     * @author        devil
     * @version       V20190213
     * @create        2019-02-13
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var StringUtil = /** @class */ (function () {
        function StringUtil() {
        }
        StringUtil.prototype.startsWith = function (source, str, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = false; }
            if (!source)
                return false;
            else if (source.length < str.length)
                return false;
            else {
                source = source.substring(0, str.length);
                if (!ignoreCase)
                    return source == str;
                else
                    return source.toLowerCase() == str.toLowerCase();
            }
        };
        StringUtil.parseBoolean = function (value) {
            return !(value.toUpperCase() == "FALSE");
        };
        StringUtil.formatString = function (str) {
            return str < 10 ? "0" + str : str + "";
        };
        /**
         * 字符串为空或null
         * @param str
         * @return
         */
        StringUtil.isEmpty = function (str) {
            return str == null || str == "";
        };
        StringUtil.toString = function (obj) {
            if (obj instanceof egret.Rectangle) {
                return obj.x + "," + obj.y + "," + obj.width + "," + obj.height;
            }
            return obj.toString();
        };
        StringUtil.parseRectangle = function (str) {
            if (str == "" || str == null)
                return null;
            var arr = str.split(",");
            return new egret.Rectangle(arr[0], arr[1], arr[2], arr[3]);
        };
        StringUtil.substitute = function (str) {
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
            if (str == null)
                return "";
            // Replace all of the parameters in the msg string.
            var len = rest.length;
            var args;
            if (len == 1 && rest[0] instanceof Array) {
                args = rest[0];
                len = args.length;
            }
            else {
                args = rest;
            }
            for (var i = 0; i < len; i++) {
                str = str.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
            }
            return str;
        };
        StringUtil.format = function (str, args) {
            var len = args.length;
            var reg;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    reg = new RegExp("({[" + i + "]})", "g"); //这个在索引大于9时会有问题，谢谢何以笙箫的指出
                    str = str.replace(reg, args[i]);
                }
            }
            return str;
        };
        StringUtil.getStrlen = function (value) {
            var len = value.length;
            var blen = 0;
            for (var i = 0; i < len; i++) {
                if ((value.charCodeAt(i) & 0xff00) != 0)
                    blen++;
                blen++;
            }
            return blen;
        };
        /**
        * 获取字符串长度：汉字=2  字母数字=1
        */
        StringUtil.getStrlen2 = function (str) {
            var result = 0;
            var length = str.length;
            for (var i = 0; i < length; i++) {
                var temp = str.charCodeAt(i);
                if (temp > 127 || temp == 94) {
                    result += 2;
                }
                else {
                    result++;
                }
            }
            return result;
        };
        return StringUtil;
    }());
    devil.StringUtil = StringUtil;
})(devil || (devil = {}));
var devil;
(function (devil) {
    var ThemeAdapter = /** @class */ (function () {
        function ThemeAdapter() {
        }
        /**
         * 解析主题
         * @param url 待解析的主题url
         * @param compFunc 解析完成回调函数，示例：compFunc(e:egret.Event):void;
         * @param errorFunc 解析失败回调函数，示例：errorFunc():void;
         * @param thisObject 回调的this引用
         */
        ThemeAdapter.prototype.getTheme = function (url, compFunc, errorFunc, thisObject) {
            function onGetRes(loader) {
                devil.Manager.loader.remove(loader.getPath(), onGetRes, this, __loadError, this);
                compFunc.call(thisObject, loader.text);
            }
            function __loadError(loader) {
                if (loader.getPath().urls[0] == url) {
                    errorFunc.call(thisObject);
                }
            }
            devil.Manager.loader.load(devil.PathInfo.getPath(url, devil.LoaderType.TEXT, false), onGetRes, this, devil.ResourceGCType.COMMON, devil.ResPriorityType.LOAD_LEVEL6, __loadError, this);
        };
        return ThemeAdapter;
    }());
    devil.ThemeAdapter = ThemeAdapter;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 2D矢量
     * luzhihong
     * create 2017-11-09
     */
    var Vector2D = /** @class */ (function () {
        /**
         * Constructor.
         */
        function Vector2D(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this._x = x;
            this._y = y;
        }
        /**
         * Generates a copy of this vector.
         * @return Vector2D A copy of this vector.
         */
        Vector2D.prototype.clone = function () {
            return new Vector2D(this._x, this.y);
        };
        /**
        * Sets this vector's x and y values, and thus length, to zero.
        * @return Vector2D A reference to this vector.
        */
        Vector2D.prototype.zero = function () {
            this._x = 0;
            this._y = 0;
            return this;
        };
        /**
         * Whether or not this vector is equal to zero, i.e. its x, y, and length are zero.
         * @return boolean True if vector is zero, otherwise false.
         */
        Vector2D.prototype.isZero = function () {
            return this._x == 0 && this._y == 0;
        };
        Object.defineProperty(Vector2D.prototype, "length", {
            get: function () {
                return Math.sqrt(this.lengthSQ);
            },
            /**
             * Sets / gets the length or magnitude of this vector. Changing the length will change the x and y but not the angle of this vector.
             */
            set: function (value) {
                var a = this.angle;
                this._x = Math.cos(a) * value;
                this._y = Math.sin(a) * value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector2D.prototype, "lengthSQ", {
            /**
             * Gets the length of this vector, squared.
             */
            get: function () {
                return this._x * this._x + this._y * this._y;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector2D.prototype, "angle", {
            get: function () {
                return Math.atan2(this._y, this._x);
            },
            /**
             * Gets / sets the angle of this vector. Changing the angle changes the x and y but retains the same length.
             */
            set: function (value) {
                var len = this.length;
                this._x = Math.cos(value) * len;
                this._y = Math.sin(value) * len;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Normalizes this vector. Equivalent to setting the length to one, but more efficient.
         * @return Vector2D A reference to this vector.
         */
        Vector2D.prototype.normalize = function () {
            var len = this.length;
            if (len == 0) {
                this._x = 1;
                return this;
            }
            this._x /= len;
            this._y /= len;
            return this;
        };
        /**
         * Whether or not this vector is normalized, i.e. its length is equal to one.
         * @return boolean True if length is one, otherwise false.
         */
        Vector2D.prototype.isNormalized = function () {
            return this.length == 1.0;
        };
        /**
         * Reverses the direction of this vector.
         * @return Vector2D A reference to this vector.
         */
        Vector2D.prototype.reverse = function () {
            this._x = -this._x;
            this._y = -this._y;
            return this;
        };
        /**
         * Calculates the distance from this vector to another given vector.
         * @param v2 A Vector2D instance.
         * @return Number The distance from this vector to the vector passed as a parameter.
         */
        Vector2D.prototype.dist = function (v2) {
            return Math.sqrt(this.distSQ(v2));
        };
        /**
         * Calculates the distance squared from this vector to another given vector.
         * @param v2 A Vector2D instance.
         * @return Number The distance squared from this vector to the vector passed as a parameter.
         */
        Vector2D.prototype.distSQ = function (v2) {
            var dx = v2.x - this._x;
            var dy = v2.y - this._y;
            return dx * dx + dy * dy;
        };
        /**
         * Adds a vector to this vector, creating a new Vector2D instance to hold the result.
         * @param v2 A Vector2D instance.
         * @return Vector2D A new vector containing the results of the addition.
         */
        Vector2D.prototype.add = function (v2) {
            return new Vector2D(this._x + v2.x, this._y + v2.y);
        };
        /**
         * Subtacts a vector to this vector, creating a new Vector2D instance to hold the result.
         * @param v2 A Vector2D instance.
         * @return Vector2D A new vector containing the results of the subtraction.
         */
        Vector2D.prototype.subtract = function (v2) {
            return new Vector2D(this._x - v2.x, this._y - v2.y);
        };
        /**
         * Multiplies this vector by a value, creating a new Vector2D instance to hold the result.
         * @param v2 A Vector2D instance.
         * @return Vector2D A new vector containing the results of the multiplication.
         */
        Vector2D.prototype.multiply = function (value) {
            return new Vector2D(this._x * value, this._y * value);
        };
        /**
         * Divides this vector by a value, creating a new Vector2D instance to hold the result.
         * @param v2 A Vector2D instance.
         * @return Vector2D A new vector containing the results of the division.
         */
        Vector2D.prototype.divide = function (value) {
            return new Vector2D(this._x / value, this._y / value);
        };
        /**
         * Indicates whether this vector and another Vector2D instance are equal in value.
         * @param v2 A Vector2D instance.
         * @return boolean True if the other vector is equal to this one, false if not.
         */
        Vector2D.prototype.equals = function (v2) {
            return this._x == v2.x && this._y == v2.y;
        };
        Object.defineProperty(Vector2D.prototype, "x", {
            get: function () {
                return this._x;
            },
            /**
             * Sets / gets the x value of this vector.
             */
            set: function (value) {
                this._x = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector2D.prototype, "y", {
            get: function () {
                return this._y;
            },
            /**
             * Sets / gets the y value of this vector.
             */
            set: function (value) {
                this._y = value;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Generates a string representation of this vector.
         * @return String A description of this vector.
         */
        Vector2D.prototype.toString = function () {
            return "[Vector2D (x:" + this._x + ", y:" + this._y + ")]";
        };
        return Vector2D;
    }());
    devil.Vector2D = Vector2D;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * 延时机制的非视图基类
     * @author        devil
     * @version       V20190826
     * @create        2019-08-26
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var BaseRender = /** @class */ (function () {
        function BaseRender() {
            this.start();
        }
        /*
            * 初始化变量
            */
        BaseRender.prototype.start = function () {
            this._isPool = true;
            this._invalid = devil.InvalidationType.ALL;
        };
        BaseRender.prototype.startCallLater = function () {
            devil.Manager.render.add(this.repaint, this);
        };
        /**
         * 强制重绘
         */
        BaseRender.prototype.repaint = function () {
            this.draw();
            this.validate();
            devil.Manager.render.remove(this.repaint, this);
        };
        BaseRender.prototype.validate = function () {
            this._invalid = devil.InvalidationType.EMPTY;
        };
        /**
         * Included the first property as a proper param to enable *some* type checking, and also because it is a required param.
         * @param property
         * @param properties
         * @return
         */
        BaseRender.prototype.isInvalid = function (property) {
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
        /**
         * 绘制方法,子类重写
         */
        BaseRender.prototype.draw = function () {
        };
        /**
         * 在未另外指定的情况下，将属性标记为无效，并在下一帧上重绘组件。
         * @param property   要使其无效的属性
         */
        BaseRender.prototype.invalidate = function (property) {
            this._invalid = this._invalid | property;
            this.startCallLater();
        };
        BaseRender.prototype.unuse = function () {
            devil.Manager.render.remove(this.repaint, this);
        };
        BaseRender.prototype.reuse = function () {
            this.start();
        };
        /**
         * 回收
         */
        BaseRender.prototype.pool = function () {
            if (this._isPool)
                devil.Manager.pool.push(this);
            else
                this.dispose();
        };
        BaseRender.prototype.dispose = function () {
            devil.Manager.render.remove(this.repaint, this);
        };
        return BaseRender;
    }());
    devil.BaseRender = BaseRender;
})(devil || (devil = {}));
var devil;
(function (devil) {
    /**
     * EUI带有皮肤的基类
     * @author        devil
     * @version       V20190826
     * @create        2019-08-26
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var EUIView = /** @class */ (function (_super_1) {
        __extends(EUIView, _super_1);
        function EUIView() {
            var _this = _super_1.call(this) || this;
            _this.start();
            return _this;
            // this.addEvent();
        }
        EUIView.prototype.start = function () {
            this._isPool = false;
            this._invalid = devil.InvalidationType.INIT;
            this._loadComplete = false;
            this.touchEnabled = false;
            this.touchChildren = false;
            this.addEventListener(eui.UIEvent.COMPLETE, this.___complete, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.___addedToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.___removedFromStage, this);
        };
        EUIView.prototype.___addedToStage = function (e) {
            this.startCallLater();
        };
        EUIView.prototype.startCallLater = function () {
            if (this.stage == null || !this._loadComplete)
                return;
            devil.Manager.render.add(this.repaint, this);
        };
        /**
         * 强制重绘
         */
        EUIView.prototype.repaint = function () {
            this.draw();
            this.validate();
            devil.Manager.render.remove(this.repaint, this);
        };
        EUIView.prototype.validate = function () {
            this._invalid = devil.InvalidationType.EMPTY;
        };
        /**
     * 在未另外指定的情况下，将属性标记为无效，并在下一帧上重绘组件。
     * @param property   要使其无效的属性
     */
        EUIView.prototype.invalidate = function (property) {
            this._invalid = this._invalid | property;
            this.startCallLater();
        };
        /**
         * Included the first property as a proper param to enable *some* type checking, and also because it is a required param.
         * @param property
         * @param properties
         * @return
         */
        EUIView.prototype.isInvalid = function (property) {
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
        EUIView.prototype.move = function (x, y) {
            this.x = x;
            this.y = y;
        };
        EUIView.prototype.draw = function () {
            if (this.isInvalid(devil.InvalidationType.INIT))
                this.drawInit();
        };
        EUIView.prototype.drawInit = function () {
            // this.start();
            this.configUI();
            this.addEvent();
        };
        EUIView.prototype.configUI = function () {
        };
        EUIView.prototype.addEvent = function () {
        };
        EUIView.prototype.removeEvent = function () {
        };
        EUIView.prototype.addViewChild = function (child) {
            var layers = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                layers[_i - 1] = arguments[_i];
            }
            var layer;
            var layerLen = layers ? layers.length : 0;
            for (var i = 0; i < child.layers.length; ++i) {
                layer = layerLen > i ? layers[i] : this;
                layer.addChild(child.layers[i]);
            }
        };
        EUIView.prototype.addViewChildAt = function (child, index) {
            for (var i = 0; i < child.layers.length; ++i) {
                this.addChildAt(child.layers[i], index + i);
            }
        };
        // public reuse():void
        // {
        //     this.start();
        //     this.addEvent();
        // }
        // public unuse():void
        // {
        //     this.x = 0;
        //     this.y = 0;
        //     this.alpha = 1;
        //     this.scaleX = 1;
        //     this.scaleY = 1;
        //     this.rotation = 0;
        //     this.visible = true;
        //     this.anchorOffsetX = 0;
        //     this.anchorOffsetY = 0;
        //     this.touchEnabled = false;
        //     this.touchChildren = false;
        //     this.cacheAsBitmap = false;
        //     Manager.render.remove(this.repaint,this);
        //     this.removeEvent();
        //     this.removeEventListener(eui.UIEvent.COMPLETE, this.___complete, this);
        //     this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.___addedToStage, this);
        //     this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.___removedFromStage, this);
        //     if(this.parent)this.parent.removeChild(this);
        // }
        EUIView.prototype.dispose = function () {
            devil.Manager.render.remove(this.repaint, this);
            this.removeEvent();
            this.removeEventListener(eui.UIEvent.COMPLETE, this.___complete, this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.___addedToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.___removedFromStage, this);
            if (this.parent)
                this.parent.removeChild(this);
        };
        EUIView.prototype.___removedFromStage = function (e) {
            devil.Manager.render.remove(this.repaint, this);
        };
        EUIView.prototype.___complete = function (e) {
            this._loadComplete = true;
            this.invalidate(devil.InvalidationType.INIT);
            this.startCallLater();
        };
        return EUIView;
    }(eui.Component));
    devil.EUIView = EUIView;
})(devil || (devil = {}));
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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(View.prototype, "touchEnabled", {
            get: function () {
                return this._layers[0].touchEnabled;
            },
            set: function (value) {
                this._layers[0].touchEnabled = value;
            },
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(View.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this.move(value, this._y);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(View.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this.move(this._x, value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(View.prototype, "layers", {
            get: function () {
                return this._layers;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(View.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this.setSize(value, this._height);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(View.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this.setSize(this._width, value);
            },
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(View.prototype, "right", {
            get: function () {
                return this._x + this._width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(View.prototype, "bottom", {
            get: function () {
                return this._y + this._height;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(View.prototype, "mask", {
            set: function (value) {
                for (var i = 0; i < this._layers.length; i++) {
                    this._layers[i].mask = value;
                }
            },
            enumerable: false,
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
var devil;
(function (devil) {
    /**
     *author Anydo
     *create 2018-5-17
     *description 界面加载转圈图
     *update devil 2019-05-10
     */
    var ViewLoading = /** @class */ (function (_super_1) {
        __extends(ViewLoading, _super_1);
        function ViewLoading() {
            return _super_1.call(this) || this;
        }
        ViewLoading.prototype.initLayer = function () {
            this._layer = this.createLayer();
        };
        ViewLoading.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._image = devil.View.create(devil.Image);
            this._image.setSize(109, 117);
            this._image.anchorX = this._image.width * 0.5;
            this._image.anchorY = this._image.height * 0.5;
            this._image.source = "common_viewLoading_png";
            this.addChild(this._image, this._layer);
            devil.Manager.stage.add(this.___resize, this);
        };
        ViewLoading.prototype.show = function () {
            this.___resize(devil.Manager.stage.width, devil.Manager.stage.height);
            devil.Manager.layer.addUI(devil.LayerSubIndex.UI_LOADING, this._layer);
            devil.Manager.render.add(this.___render, this);
        };
        ViewLoading.prototype.hide = function () {
            devil.Manager.stage.remove(this.___resize, this);
            devil.Manager.render.remove(this.___render, this);
            this.removeFromParent();
        };
        ViewLoading.prototype.___render = function (internal) {
            this._image.rotation += 400 * internal * 0.001;
        };
        ViewLoading.prototype.___resize = function (width, height) {
            this.x = ((width - this._image.width) * .5) + this._image.anchorX;
            this.y = ((height - this._image.height) * .5) + this._image.anchorY;
        };
        ViewLoading.getInstance = function () {
            if (this._instance == null)
                this._instance = new ViewLoading();
            return this._instance;
        };
        return ViewLoading;
    }(devil.Container));
    devil.ViewLoading = ViewLoading;
})(devil || (devil = {}));
