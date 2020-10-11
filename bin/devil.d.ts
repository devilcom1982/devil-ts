declare namespace devil {
    /**
     * 自定义动画数据
     * @author anydo
     * @version V20180811
     * @create 2018-03-01
     * @place guangzhou
     * @update devil 整理 2018-08-11
     */
    class AnimationData implements IPool {
        private _texture;
        private _frameJsons;
        private _frames;
        /**
         * 动画总帧数
         */
        totalFrames: number;
        constructor();
        private start;
        private parseJson;
        getKeyFrameData(frame: number): AnimationFrameData;
        private createFrameData;
        reuse(): void;
        unuse(): void;
        pool(): void;
        dispose(): void;
        static create(bitmapData: egret.BitmapData, json: any): AnimationData;
    }
}
declare namespace devil {
    /**
     * 自定义动画数据
     * @author anydo
     * @version V20180811
     * @create 2018-03-01
     * @place guangzhou
     * @update devil 整理 2018-08-11
     */
    class AnimationFrameData implements IPool {
        offX: number;
        offY: number;
        texture: egret.Texture;
        pool(): void;
        reuse(): void;
        unuse(): void;
        dispose(): void;
        static create(offX: number, offY: number, texture: egret.Texture): AnimationFrameData;
    }
}
declare namespace devil {
    /**
     * 自定义动画数据
     * @author anydo
     * @version V20180811
     * @create 2018-03-01
     * @place guangzhou
     * @update devil 整理 2018-08-11
     */
    class AnimationFrameJson implements IPool {
        frameName: string;
        offX: number;
        offY: number;
        rectObj: any;
        reuse(): void;
        unuse(): void;
        pool(): void;
        dispose(): void;
        static create(frameName: string, offX: number, offY: number, rectObj: any): AnimationFrameJson;
    }
}
declare namespace devil {
    /**
     * 动画与特效模板数据接口
     * @author        devil
     * @version       V20190226
     * @create        2019-02-26
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    interface IAnimationCVO {
        /**
         * 唯一ID
         */
        id: string;
        /**
         * 关键帧数组
         */
        frames: number[];
        /**
         * 总帧数
         */
        totalFrame: number;
        /**
         * 循环次数,0表示无数次
         */
        wrapMode: number;
        /**
         * 特效X偏移量
         */
        offsetX: number;
        /**
         * 特效Y偏移量
         */
        offsetY: number;
        /**
         * 等比缩放
         */
        scale: number;
        /**
         * 是否在人物脚底播放 (如果在脚底则填加到AliveInfo.footContainer层)
         */
        isInFeet: boolean;
        /**
         * 是否长驻内存
         * 0不长驻
         * 1男长驻
         * 2女长驻
         * 3男女长驻
         */
        stayMemory: number;
    }
}
declare namespace devil {
    /**
     * MC帧动画
     * @author  devil
     * @version V20190909
     * @create  2019-09-09
     * @place   guangzhou
     */
    class MovieClipAnimation extends View {
        private _layer;
        private _display;
        private _source;
        private _path;
        private _action;
        private _playComplete;
        private _data;
        private _playTimes;
        set path(value: PathInfo);
        constructor();
        protected initLayer(): void;
        protected start(): void;
        private loadData;
        private clear;
        protected addToStage(): void;
        protected removeFromStage(): void;
        /**
         * - 播放指定动画。
         * @param playTimes - 循环播放次数。默认值为0 [0: 无限循环播放, [1~N]: 循环播放 N 次]
        */
        play(playTimes?: number): void;
        /**
         * 停止动画播放
         * @see dragonBones.AnimationState
         * @version DragonBones 3.0
         * @language zh_CN
         */
        stop(): void;
        unuse(): void;
        dispose(): void;
        private ___complete;
        __playComplete(callBack: () => void, target: any): void;
        private ___playComplete;
    }
}
declare namespace devil {
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
    enum ButtonState {
        UP = 0,
        DOWN = 1,
        SELECTED = 2,
        DISANABLED = 3
    }
}
declare namespace devil {
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
    class Color {
        /**
         * 黑色
         */
        static BLACK: number;
        /**
         * 白色
         */
        static WHITE: number;
        /**
         * 红色
         */
        static RED: number;
        /**
         * 绿色
         */
        static GREEN: number;
        /**
         * 蓝色
         */
        static BLUE: number;
    }
}
declare namespace devil {
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
    class ComponentDefault {
        /**
         * 容器的默认宽度
         */
        static CONTAINER_WIDTH: number;
        /**
         * 容器的默认高度
         */
        static CONTAINER_HEIGHT: number;
        /**
         * 画布的默认宽度
         */
        static CANVAS_WIDTH: number;
        /**
         * 画布的默认高度
         */
        static CANVAS_HEIGHT: number;
        /**
         * 文本的默认宽度
         */
        static TEXT_WIDTH: number;
        /**
         * 文本的默认高度
         */
        static TEXT_HEIGHT: number;
        /**
         * 按钮的默认宽度
         */
        static BUTTON_WIDTH: number;
        /**
         * 按钮的默认高度
         */
        static BUTTON_HEIGHT: number;
        /**
         * 菜单栏默认宽度
         */
        static MENU_WIDTH: number;
        /**
         * 菜单栏默认高度
         */
        static MENU_HEIGHT: number;
        /**
         * 复选框按钮默认宽度
         */
        static CHECK_BOX_WIDTH: number;
        /**
         * 复选框按钮默认高度
         */
        static CHECK_BOX_HEIGHT: number;
        /**
         * 单选框按钮默认宽度
         */
        static RADIO_BUTTON_WIDTH: number;
        /**
         * 单选框按钮默认高度
         */
        static RADIO_BUTTON_HEIGHT: number;
        /**
         * 远程图片默认宽度
         */
        static IMAGE_REMOTE_WIDTH: number;
        /**
         * 远程图片默认高度
         */
        static IMAGE_REMOTE_HEIGHT: number;
        /**
         * 滚动条宽度
         */
        static SCROLL_BAR_WIDTH: number;
        /**
         * 滚动条高度
         */
        static SCROLL_BAR_HEIGHT: number;
    }
}
declare namespace devil {
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
    class ComponentType {
        /**
         * 画布
         */
        static CANVAS: number;
        /**
         * 容器
         */
        static CONTAINER: number;
        /**
         * 面板容器
         */
        static PANEL_CONTAINER: number;
        /**
         * 文本
         */
        static TEXT: number;
        /**
         * 图片
         */
        static IMAGE: number;
        /**
         * 图片按钮
         */
        static BUTTON_IMAGE: number;
        /**
         * 图标按钮
         */
        static BUTTON_ICON: number;
        /**
         * 文本按钮
         */
        static BUTTON_TXT: number;
        /**
         * 图片选择按钮
         */
        static BUTTON_IMAGE_SELECTED: number;
        /**
         * 图标选择按钮
         */
        static BUTTON_ICON_SELECTED: number;
        /**
         * 文本选择按钮
         */
        static BUTTON_TEXT_SELECTED: number;
        /**
         * 文本图标选择按钮
         */
        static BUTTON_SELECTED: number;
        /**
         * 复选框按钮
         */
        static CHECK_BOX: number;
        /**
         * 单选框按钮
         */
        static RADIO_BUTTON: number;
        /**
         * 滚动条
         */
        static SCROLL_BAR: number;
        /**
         * 下拉列表
         */
        static COMBOBOX: number;
        /**
         * 输入框
         */
        static TEXT_INPUT: number;
        /**
         * 文本框
         */
        static TEXT_AREA: number;
        /**
         * 远程加载图片
         */
        static IMAGE_REMOTE: number;
        /**
         * TAB组件
         */
        static TAB: number;
        /**
         * 列表
         */
        static LIST: number;
        /**
         * 面板
         */
        static PANEL: number;
        /**
         * 菜单栏
         */
        static MENU_BAR: number;
        /**
         * 菜单子项
         */
        static MENU_ITEM: number;
        /**
         *  菜单孙子项
         */
        static MENU_SUB_ITEM: number;
        /**
         * 菜单主按钮
         */
        static MENU_ITEM_BUTTON_TEXT: number;
        /**
         * 菜单栏孙项按钮组件
         */
        static MENU_SUB_ITEM_BUTTON_TEXT: number;
        /**
         * tree
         */
        static TREE: number;
        /**
         * TabButton
         */
        static TAB_BUTTON: number;
        static SLIDER: number;
        /**
         * 复选框按钮2
         */
        static CHECK_BOX1: number;
    }
}
declare namespace devil {
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
    class Direction {
        static UP: number;
        static DOWM: number;
        static LEFT: number;
        static RIGHT: number;
        static LEFT_UP: number;
        static LEFT_DOWN: number;
        static RIGHT_UP: number;
        static RIGHT_DOWN: number;
        /**
         * params:分为0，1，2,默认值为0
         * 0返回(up,down,left,right)
         * 1返回(left_up,left_down,right_up,right_down)
         * 2返回八个方向
         */
        static getDirections(param?: number): number[];
        static getRotation(direction: number): number;
    }
}
declare namespace devil {
    /**
     * 文件后缀名常量,带有下划线的带有后缀“.”。例如MP3_表示.mp3
     * @author devil
     * @version V20180807
     * @create 20180807
     * @place guangzhou
     */
    class Extension {
        static PNG: string;
        static JPG: string;
        static MP3: string;
        static TXT: string;
        static JSON: string;
        static PNG_: string;
        static JPG_: string;
        static MP3_: string;
        static TXT_: string;
        static JSON_: string;
    }
}
declare namespace devil {
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
    class FigureAction {
        static STAND: string;
        static WALK: string;
        static JUMP: string;
        static DEAD: string;
        static HITED: string;
        static ATTACK1: string;
        static ATTACK2: string;
        static ATTACK3: string;
        static SIT: string;
        static getWrapMode(name: string): number;
        static isAttackAction(name: string): boolean;
    }
}
declare namespace devil {
    /**
     * 字体名常量
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    class FontName {
        /**
         * 微软雅黑
         */
        static MICROSOFT_YA_HEI: string;
    }
}
declare namespace devil {
    /**
     * 游戏开关
     * @author        devil
     * @version       V20201008
     * @create        2020-10-08
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class GameCtrl {
        static NEI_LIAN: string;
    }
}
declare namespace devil {
    /**
     * 游戏ID
     * @author        devil
     * @version       V20201008
     * @create        2020-10-08
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class GameID {
        static MAGIC_TOUCH: number;
        static JUMP: number;
        static MOTO: number;
        static PUZZLE: number;
        static COLOR: number;
    }
}
declare namespace devil {
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
    class InvalidationType {
        /**
         * 标记为空
         */
        static EMPTY: number;
        /**
         * 内部布局标记
         */
        static LAYOUT: number;
        /**
         * 长宽标记
         */
        static SIZE: number;
        /**
         * 数据标记
         */
        static DATA: number;
        /**
         * 样式标记
         */
        static STYLE: number;
        /**
         * 是否可交互
         */
        static ENABLED: number;
        /**
         * 初始化
         */
        static INIT: number;
        /**
         * 初始化标记
         */
        static ALL: number;
    }
}
declare namespace devil {
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
    enum KeyState {
        KEY_DOWN = 0,
        KEY_UP = 1
    }
}
declare namespace devil {
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
    class Keyboard {
        static A: number;
        static B: number;
        static C: number;
        static D: number;
        static E: number;
        static F: number;
        static G: number;
        static H: number;
        static I: number;
        static J: number;
        static K: number;
        static L: number;
        static M: number;
        static N: number;
        static O: number;
        static P: number;
        static Q: number;
        static R: number;
        static S: number;
        static T: number;
        static U: number;
        static V: number;
        static W: number;
        static X: number;
        static Y: number;
        static Z: number;
        static NUM_0: number;
        static NUM_1: number;
        static NUM_2: number;
        static NUM_3: number;
        static NUM_4: number;
        static NUM_5: number;
        static NUM_6: number;
        static NUM_7: number;
        static NUM_8: number;
        static NUM_9: number;
        static ESC: number;
        static ADD: number;
        static SUB: number;
        static SPACE: number;
        static ENTER: number;
    }
}
declare namespace devil {
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
    class LayerID {
        /**
         * 空
         */
        static EMPTY: number;
        /**
         * 贴图层1，一般对应的common贴图
         */
        static COMMON_LAYER: number;
        /**
         * 贴图层2,一般对应的对应系统贴图
         */
        static UI_LAYER: number;
        /**
         * 文本、特效层
         */
        static EFFECT_LAYER: number;
        /**
         * 贴图层，超越文本特效的贴图层，例如红点图片等。一般对应的common贴图
         */
        static COMMON_TOP_LAYER: number;
        static getLayers(): number[];
    }
}
declare namespace devil {
    /**
    *author devil
    *create 2010-01-25
    *description 注意！！！游戏层级，必须按照对应的层级关系按顺序添加，不能随便添加到末尾
    */
    const enum LayerIndex {
        MAP = 0,
        ELEMENT = 1,
        UI = 2
    }
}
declare namespace devil {
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
    class LayerSubIndex {
        static ELEMENT_EFFECT_BOTTOM: number;
        static ELEMENT_SHADOW: number;
        static ELEMENT1: number;
        static ELEMENT2: number;
        static ELEMENT_HEAD_VIP: number;
        static ELEMENT_HEAD_TXT: number;
        static ELEMENT_HEAD_TITLE: number;
        static ELEMENT_HEAD_BLOOD: number;
        static ELEMENT_EFFECT_TOP: number;
        static ELEMENT_SCT: number;
        static UI_HOME_IMAGE: number;
        static UI_HOME: number;
        static UI_HOME_EFFECT: number;
        static UI_PANEL_DARK: number;
        static UI_COMMON: number;
        static UI_IMAGE: number;
        static UI_NUM: number;
        static UI_EFFECT: number;
        static UI_COMMON1: number;
        static UI_ALERT_MODE: number;
        static UI_ALERT: number;
        static UI_ALERT_MODE2: number;
        static UI_ALERT2: number;
        static UI_TIP_MODE: number;
        static UI_TIP: number;
        static UI_LOADING: number;
        static UI_MASSAGE: number;
        static UI_GM: number;
    }
}
declare namespace devil {
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
    class LibConst {
        /**
         * 层的模态贴图
         */
        static MODE_TEXTURE_NAME: string;
    }
}
/**
 * 日志类型
 * @author devil
 * @version V20180925
 * @create 2018-09-25
 * @place guangzhou
 */
declare namespace devil {
    class LogType {
        static WARNING: number;
        static ERROR: number;
        static DEBUG: number;
    }
}
declare module devil {
    /**
     * 开放域的常用
     * @author        devil
     * @version       V20200921
     * @create        2020-09-21
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class OpenDataMessageType {
        /**
         * 初始化好友排行榜
         */
        static INIT_FRIEND_RANK: string;
        /**
         * 切换排行榜
         */
        static SWITCH_RANK: string;
        /**
         * 翻页
         */
        static UPDATE_PAGE: string;
        /**
         * 初始化
         */
        static INIT: string;
        /**
         * 超越下一个好友
         */
        static NEXT_FRIEND: string;
        /**
         * 保存数据
         */
        static SAVE_DATA: string;
    }
}
declare namespace devil {
    /**
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    enum ScrollPolicy {
        ON = 0,
        AUTO = 1,
        OFF = 2
    }
}
declare namespace devil {
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
    class StyleName {
        static UP_BACK_SKIN: string;
        static OVER_BACK_SKIN: string;
        static DOWN_BACK_SKIN: string;
        static SELECT_BACK_SKIN: string;
        static DISENABLED_BACK_SKIN: string;
        static UP_ICON_SKIN: string;
        static OVER_ICON_SKIN: string;
        static DOWN_ICON_SKIN: string;
        static SELECT_ICON_SKIN: string;
        static DISENABLED_ICON_SKIN: string;
        static UP_SCROLL_ARROW_SKIN: string;
        static OVER_SCROLL_ARROW_SKIN: string;
        static DOWN_SCROLL_ARROW_SKIN: string;
    }
}
declare namespace devil {
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
    class UIVersion {
        static VERSION: string;
    }
}
declare namespace devil {
    /**
     * 微信APPID
     * @author        devil
     * @version       V20201008
     * @create        2020-10-08
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class WXAPPID {
        static MAGIC_TOUCH: string;
        static JUMP: string;
        static MOTO: string;
        static PUZZLE: string;
        static COLOR: string;
    }
}
declare namespace devil {
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
    class WrapMode {
        static LOOP: number;
        static ONCE: number;
    }
}
declare namespace devil {
    /**
     * 控制器基类
     * @author        devil
     * @version       V20190419
     * @create        2019-04-19
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class BaseControl {
        constructor();
        protected initCMD(): void;
        protected addCMD(protocol: number, cls: any): void;
        protected send(protocol: number): void;
        protected getCMD<T>(protocol: number): T;
    }
}
declare namespace devil {
    /**
     * 事件基类
     * @author devil
     * @version V20180702
     * @create 20180702
     * @place guangzhou
     */
    class BaseEvent extends egret.Event {
        params: any;
        constructor(type: string, params?: any, bubbles?: boolean, cancelable?: boolean);
    }
}
declare namespace devil {
    /**
     * 小游戏专用事件
     * @author        devil
     * @version       V20200906
     * @create        2020-09-06
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class WXGameEvent extends BaseEvent {
        /**
         * 更新复活次数
         */
        static UPDATE_RECEIVE_COUNT: string;
    }
}
declare namespace devil {
    /**
     * 释放接口
     * @author        devil
     * @version       V20190111
     * @create        Jan 10, 2018
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    interface IDispose {
        /**
         * 内存释放，如果是视图类需要在此方法内实现从父级中删除
         */
        dispose(): void;
    }
}
declare namespace devil {
    /**
     * 对象池回收接口，在应用程序运行的过程中频繁创建的对象，建议使用对象池。使用此接口的对象的构建函数不要传入参数，都统一使用unuse方法来初始化数据。
     * @author        devil
     * @version       V20190107
     * @create        2018-12-25
     * @update 	      devil        2019-01-07        reuse更新不带参数
     * @place         guangzhou
     */
    interface IPool extends IDispose {
        /**
         * 对象重新使用或创建时会初始话一些数据，此方法自动调用，无需手动调用。
         */
        reuse(): void;
        /**
         * 对象放入对象池中，重置一些必要的数据。此方法自动调用，无需手动调用。
         */
        unuse(): void;
    }
}
declare namespace devil {
    /**
     * @author        devil
     * @version       V201190215
     * @create        2019-02-15
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    interface IRadioSelected extends IDispose {
        setSelected(value: boolean): void;
        getSelected(): boolean;
        setSelector(value: RadioSelector): void;
    }
}
/**
 * 资源配置的接口
 * @author        devil
 * @version       V20190131
 * @create        2019-03-08
 * @qq            346443480
 * @email         346443480 @ qq.com
 * @place         guangzhou
 */
declare namespace devil {
    interface IResourceConfig {
        getURL(key: string): string;
        /**
         * 解析一个配置文件
         * @param data
         * @param folder
         */
        parseConfig(data: any, folder: string): void;
        contains(url: string, name: string): boolean;
        getResourceItem(key: string): ResourceItem;
    }
}
declare namespace devil {
    /**
     * tip接口
     * @author        devil
     * @version       V20190425
     * @create        2019-04-25
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    interface ITip extends IDispose {
        setData(...args: any[]): void;
        /**
         * 显示
         */
        show(): void;
    }
}
declare namespace devil {
    /**
     * 需要视图管理器打开的统一接口
     * @author        devil
     * @version       V20190405
     * @create        2019-04-05
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    interface IView {
        show(): void;
        /**
         *
         * @param fromModal 是否点击modal背景关掉
         * @default false
         */
        hide(fromModal?: boolean): boolean;
    }
}
declare namespace devil {
    /**
     * 动画加载器
     * @author devil
     * @version V20180811
     * @create V20180811
     * @place guangzhou
     */
    class AnimationLoader extends BaseLoader {
        sheet: AnimationData;
        private _bitmapData;
        private _json;
        protected parse(data: any): void;
        unuse(): void;
        /**
         * 加载
         */
        load(): void;
        protected reload(index: number): void;
        static abc: boolean;
    }
}
declare namespace devil {
    /**
     * 加载器基类
     * @author  devil
     * @version V20190115
     * @create  2019-01-15
     * @place   guangzhou
     */
    class BaseLoader implements ILoader {
        private _priority;
        private _callBacks;
        private _errorCallBacks;
        private _imgLoader;
        private _httpReqs;
        private _dispatchLoadErrorEvent;
        private _errorCount;
        private _useTimer;
        private _state;
        protected _unUseTimer: number;
        protected _resourceGCType: number;
        protected _count: number;
        protected _path: PathInfo;
        private static MAX_ERROR;
        /**
         * 加载优化级
         */
        getPriority(): number;
        /**
         * 路径信息
         */
        getPath(): PathInfo;
        getUseTimer(): number;
        /**
         * 加载状态，对应的LoaderState常量值
         */
        getState(): number;
        constructor();
        private start;
        /**
         * 填加加载成功回调函数
         * @param complete
         * @param target
         */
        add(complete: Function, target: any, error?: Function, errorTarget?: any): void;
        /**
         * 删除加载成功回调函数
         * @param complete
         * @param target
         */
        remove(complete: Function, target: any, error?: Function, errorTarget?: any): void;
        private unuseHttpReqs;
        private unuseHttpReq;
        private unuseImgLoader;
        protected parse(data: any): void;
        private callBack;
        private errorCallBack;
        /**
         * 解析并缓存加载成功的数据
         */
        private $analyzeData;
        protected reload(index: number): void;
        private error;
        /**
         * 引用计数加1
         */
        addCount(): void;
        /**
         * 引用计数减1，如果计数小于0，则会重置使用时间，等待垃圾回收
         */
        removeCount(): void;
        protected $load(responseType: string, index: number): void;
        protected $request(httpReq: egret.HttpRequest, index: number): void;
        protected $loadImage(url: string): void;
        /**
         * 加载
         */
        load(): void;
        pool(): void;
        /**
         * 垃圾回收
         */
        gc(): boolean;
        reuse(): void;
        unuse(): void;
        /**
         * 释放内存
         */
        dispose(): void;
        private ___httpReqComplete;
        private ___httpReqErrorComplete;
        private ___imageLoaderComplete;
        private ___imageLoaderErrorComplete;
        static create(cls: {
            new (): ILoader;
        }, path: PathInfo, priority: number, resourceGCType: number): ILoader;
    }
}
declare namespace devil {
    /**
     * 批处理加载器
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    class BatchLoader implements IPool {
        private _callBack;
        private _oneComplete;
        private _oneTarget;
        private _oneError;
        private _errorTarget;
        private _current;
        private _total;
        private _paths;
        constructor();
        reuse(): void;
        private oneComplete;
        unuse(): void;
        /**
         * 释放内存
         */
        dispose(): void;
        private __error;
        private __oneComplete;
        static create(paths: PathInfo[], resourceGCType?: number, priority?: number, complete?: Function, target?: any, oneComplete?: Function, oneTarget?: any, oneError?: Function, errorTarget?: any): BatchLoader;
    }
}
declare namespace devil {
    /**
     * 字节加载器
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    class ByteLoader extends BaseLoader {
        bytes: ArrayBuffer;
        load(): void;
        protected reload(index: number): void;
        protected parse(data: any): void;
        unuse(): void;
    }
}
declare namespace devil {
    /**
     * 龙骨动画加载器
     * @author  devil
     * @version V20190115
     * @create  2019-01-15
     * @place   guangzhou
     */
    class DragonLoader extends BaseLoader implements IPool {
        bytes: any;
        texture: egret.Texture;
        json: any;
        protected parse(data: any): void;
        protected reload(index: number): void;
        /**
         * 加载
         */
        load(): void;
        unuse(): void;
    }
}
declare namespace devil {
    /**
     * 加载器接口
     * @author devil
     * @version V20180813
     * @create V20180813
     * @place guangzhou
     */
    interface ILoader extends IPool {
        /**
         * 加载优化级
         */
        getPriority(): number;
        /**
         * 路径信息
         */
        getPath(): PathInfo;
        /**
         * 使用时间
         */
        getUseTimer(): number;
        /**
         * 加载状态，对应的LoaderState常量值
         */
        getState(): number;
        /**
         * 填加加载成功回调函数
         * @param complete
         * @param target
         */
        add(complete: Function, target: any, error?: Function, errorTarget?: any): void;
        /**
         * 删除加载成功回调函数
         * @param complete
         * @param target
         */
        remove(complete: Function, target: any, error?: Function, errorTarget?: any): void;
        /**
         * 加载
         */
        load(): void;
        /**
         * 引用计数加1
         */
        addCount(): void;
        /**
         * 引用计数减1，如果计数小于0，则会重置使用时间，等待垃圾回收
         */
        removeCount(): void;
        /**
         * 回收内存
         */
        gc(): boolean;
    }
}
declare namespace devil {
    /**
     * 图片加载器
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    class ImageLoader extends BaseLoader {
        texture: egret.Texture;
        protected parse(data: any): void;
        /**
         * 加载
         */
        load(): void;
        protected reload(index: number): void;
        unuse(): void;
    }
}
declare namespace devil {
    /**
     * 加载状态
     * @author devil
     * @version V20180719
     * @create V20180719
     * @place guangzhou
     */
    class LoaderState {
        /**
         * 等待状态
         */
        static WAITING: number;
        /**
         * 正在加载
         */
        static LOADING: number;
        /**
         * 加载成功
         */
        static SUCESS: number;
        /**
         * 加载失败
         */
        static FAIL: number;
    }
}
declare namespace devil {
    /**
     * 加载类型
     * @author devil
     * @version V20190909
     * @create 2018-07-19
     * @update devil 2019-09-09  填加NovieClip动画数据加载
     * @place guangzhou
     */
    class LoaderType {
        /**
         * 先加载path.txt（二进制解析加载，然后删除源数据），再加载smallMap.jpg
         */
        static MAP_DATA: number;
        /**
         * 先加载json再加载贴图
         */
        static ANI: number;
        /**
         * 加载文本
         */
        static TEXT: number;
        /**
         * 二进制解析加载，不删除源数据
         */
        static BIN: number;
        /**
         * 加载声音
         */
        static SOUND: number;
        /**
         * 加载图片
         */
        static IMAGE: number;
        /**
         * 帖图加载
         */
        static TEXTURE: number;
        /**
         * 龙骨动画数据加载
         */
        static DRAGON: number;
        /**
         * MovieClip动画数据加载
         */
        static MOVIE_CLIP: number;
    }
}
declare namespace devil {
    /**
     * 地图加载器
     * @author devil
     * @version V20180811
     * @create 2018-08-11
     * @place guangzhou
     */
    class MapLoader extends BaseLoader {
        mapData: MapData;
        texture: egret.Texture;
        protected parse(data: any): void;
        /**
         * 加载
         */
        load(): void;
        protected reload(index: number): void;
        unuse(): void;
    }
    /**
     * 地图数据
     */
    class MapData implements IPool {
        source: Array<Array<number>>;
        constructor();
        private parse;
        isEmpty(row: number, col: number): boolean;
        reuse(): void;
        unuse(): void;
        dispose(): void;
        pool(): void;
        static create(bytes: egret.ByteArray): MapData;
    }
    /**
     * 地图数据类型,数据类型为0,1,2,4,8的格式
     */
    class MapDataType {
        /** 不可走 */
        static UN_WALK: number;
        /** 可走 */
        static WALK: number;
        /** 透明 */
        static ALPHA: number;
        /** 安全 */
        static ABSOLUTR: number;
        /** 水花 */
        static WATER: number;
        /** 沙漠 */
        static DESERT: number;
    }
}
declare namespace devil {
    /**
     * MC帧动画数据加载器
     * @author  devil
     * @version V20190909
     * @create  2019-09-09
     * @place   guangzhou
     */
    class MovieClipLoader extends BaseLoader implements IPool {
        texture: egret.Texture;
        json: any;
        data: egret.MovieClipDataFactory;
        protected parse(data: any): void;
        protected reload(index: number): void;
        /**
         * 加载
         */
        load(): void;
        unuse(): void;
    }
}
declare namespace devil {
    /**
     * 路径信息类，相关的参数key是相对路径，并且不带版本号
     * @author devil
     * @version V20180807
     * @create V20180717
     * @place guangzhou
     * @description 整理
     */
    class PathInfo {
        private static _dic;
        private _version;
        /**
         * 相对路径，此值作为集合的关键值
         */
        key: string;
        /**
         * 带有版本号的URL地址(绝对路径)
         * 特别说明
         *      加载贴图文件,     参数格式[json_url,texture_url]
         *      加载地图路径配置, 参数格式[path_url,smallMap_url]
         *      加载龙骨动画配置, 参数格式[name_ske.dbbin name_tex.json name_tex.png]
         */
        urls: string[];
        /**
         * 文件大小
         */
        size: number;
        /**
         * 内存大小
         */
        memory: number;
        /**
         * 加载类型,对应LoaderType常量
         */
        loaderType: number;
        /**
        * @param key			相对路径地址
        * @param version        版本号
        * @param size           文件大小
        * @param memory         文件内存
        * @param absolute       绝对路径
        */
        constructor(key: string, version: string, size: number, memory: number, absolute?: boolean);
        /**
         * 设置加载类型
         * @param loaderType
         */
        private setURL;
        /**
         * 如果加载失败，则尝试使用随机数做版本加载
         * @param index urls索引值
         */
        reload(index: number): void;
        /**
        * @param key        相对路径并且不带版本号的地址
        * @param loaderType 加载类型,对应LoaderType常量
        * @param absolute   绝对路径,默认为true,表示使用绝对路径
        */
        static getPath(key: string, loaderType: number, absolute?: boolean, version?: string): PathInfo;
    }
}
declare namespace devil {
    /**
     * 加载顺序等级，越大越高
     * @author devil
     * @version V20180717
     * @create V20180717
     * @place guangzhou
     */
    class ResPriorityType {
        static LOWER: number;
        static LOAD_LEVEL1: number;
        static LOAD_LEVEL2: number;
        static LOAD_LEVEL3: number;
        static LOAD_LEVEL4: number;
        static LOAD_LEVEL5: number;
        static LOAD_LEVEL6: number;
        static MAX: number;
    }
}
declare namespace devil {
    /**
     * 解析资源配置文件(白鹭默认资源编辑器工具的配置文件default.res.json数据)
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    class ResourceConfig implements IResourceConfig {
        /**
         * 一级键名字典
         */
        private keyMap;
        /**
         * 解析一个配置文件
         * @method RES.ResourceConfig#parseConfig
         * @param data {any} 配置文件数据,Json格式
         * @param folder {string} 加载项的路径前缀。
         */
        parseConfig(data: any, folder: string): void;
        /**
         * 添加一个加载项数据到列表
         */
        private addItemToKeyMap;
        /**
         * 添加一个二级键名到配置列表。
         * @method RES.ResourceConfig#addSubkey
         * @param subkey {string} 要添加的二级键名
         * @param name {string} 二级键名所属的资源name属性
         */
        addSubkey(subkey: string, name: string): void;
        /**
         * 获取加载项的name属性
         * @method RES.ResourceConfig#getType
         * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
         * @returns {string}
         */
        getName(key: string): string;
        contains(url: string, key: string): boolean;
        /**
         * 获取加载项类型。
         * @method RES.ResourceConfig#getType
         * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
         * @returns {string}
         */
        getType(key: string): string;
        getRawResourceItem(key: string): any;
        /**
         * 获取加载项信息对象
         * @method RES.ResourceConfig#getResourceItem
         * @param key {string} 对应配置文件里的key属性或sbuKeys属性的一项。
         * @returns {egret.ResourceItem}
         */
        getResourceItem(key: string): ResourceItem;
        getURL(key: string): string;
        /**
         * 转换Object数据为ResourceItem对象
         */
        private parseResourceItem;
    }
}
declare namespace devil {
    /**
     * 解析资源配置文件(自定义配置资源文件编辑器)
     * @author        devil
     * @version       V20190131
     * @create        2019-03-08
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ResourceConfig2 implements IResourceConfig {
        folder: string;
        /**
         * 一级键名字典
         */
        private keyMap;
        getURL(key: string): string;
        parseConfig(data: any, folder: string): void;
        getName(key: string): string;
        contains(url: string, key: string): boolean;
        getResourceItem(key: string): ResourceItem;
    }
}
declare namespace devil {
    /**
     * 资源回收类型
     * @author devil
     * @version V20180807
     * @create V20180717
     * @place guangzhou
     * @description 整理
     */
    class ResourceGCType {
        /**
         * 一直存在于游戏内存中
         */
        static NEVER: number;
        /**
         * 加载完后立即从内存中释放
         */
        static NOW: number;
        /**
         * 通用类型
         */
        static COMMON: number;
        /**
         * 地图块资源类型
         */
        static MAP: number;
        /**
         * 动画资源
         */
        static ANIMATION: number;
        /**
         * 声音资源
         */
        static SOUND: number;
        /**
         * 加载错误的释放,开发版3秒回收内存，发布版立即回收内存
         */
        static ERROR: number;
        /**
         * 资源存在于内存的时间，以MS为单位
         * @params type ResourceGCType类型
         */
        static getGCTime(type: number): number;
    }
}
declare namespace devil {
    class ResourceItem {
        name: string;
        url: string;
        scale9Grid: egret.Rectangle;
        constructor(name: string, url: string);
    }
}
declare namespace devil {
    /**
     * 自定义SpriteSheet
     * @author devil
     * @version V20180722
     * @create V20180722
     * @place guangzhou
     */
    class SpriteSheet extends egret.HashObject implements IPool {
        private _texture;
        private _json;
        private _bitmapX;
        private _bitmapY;
        /**
         * @private
         * 纹理缓存字典
         */
        private _textureMap;
        set bitmapData(value: egret.BitmapData);
        set json(value: any);
        constructor();
        /**
         * 根据指定纹理名称获取一个缓存的 Texture 对象
         * @param name {string} 缓存这个 Texture 对象所使用的名称
         * @returns {egret.Texture} Texture 对象
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        getTexture(name: string): egret.Texture;
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
        private createTexture;
        reuse(): void;
        unuse(): void;
        /**
         * 释放纹理
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        dispose(): void;
        static create(bitmapData: egret.BitmapData, json: any): SpriteSheet;
    }
}
declare namespace devil {
    /**
     * 文本加载器
     * @author devil
     * @version V20180811
     * @create 2018-08-11
     * @place guangzhou
     */
    class TextLoader extends BaseLoader {
        text: string;
        private _isPost;
        private _params;
        /**
         * 使用Post加载方式
         * @param params
         */
        post(params: any): void;
        /**
         * 加载
         */
        load(): void;
        protected reload(index: number): void;
        protected $request(httpReq: egret.HttpRequest, index: number): void;
        protected parse(data: any): void;
        unuse(): void;
    }
}
declare namespace devil {
    /**
     * 贴图加载器
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    class TextureLoader extends BaseLoader {
        private _sheet;
        private _bitmapData;
        private _json;
        getTexture(name: string): egret.Texture;
        protected parse(data: any): void;
        protected reload(index: number): void;
        /**
         * 加载
         */
        load(): void;
        unuse(): void;
        gc(): boolean;
    }
}
declare namespace devil {
    /**
     * 文件版本
     * @author devil
     * @version V20180717
     * @create V20180717
     * @place guangzhou
     */
    class Version {
        /**
         * 客户端总版本号，一改全改
         */
        static clientVersion: string;
    }
}
declare namespace devil {
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
    class CameraManager {
        private _centerRect;
        private _seeRect;
        private _mapSeeRect;
        private _seeRectRC;
        private _focus;
        private _init;
        static CENTER_W: number;
        static CENTER_H: number;
        /**
         * 不移动区域
         */
        getCenterRect(): egret.Rectangle;
        /**
         * 第一次启动的时候地图长宽大小不会马上传入进来，则时需要等待，该属性放在第一次加载完地图数据时设置地图长宽时设置
         */
        get init(): boolean;
        constructor();
        /**
         * 设置摄像头焦点，也是当前主角的位置
         * @param x
         * @param y
         */
        setFocus(x: number, y: number, isReset?: boolean): void;
        /**
         * 场景大小改变
         */
        updateStageSize(): void;
        /**
         * 获取地图可视区域
         */
        getMapSeeRect(): egret.Rectangle;
        /**
         * 当前摄像头可视区域
         */
        getSeeRect(): egret.Rectangle;
        /**
         * 地图可视区域
         * @param width
         * @param height
         */
        updateMapSeeRect(width: number, height: number): void;
        /**
         * 更新游戏视角
         */
        updateSeeRectRC(x: number, y: number, width: number, height: number): void;
        /**
         * 是否更新瓦片地图块
         */
        needUpdateTiled(): boolean;
        /**当前焦点 */
        getFocus(): egret.Point;
    }
}
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
declare namespace devil {
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
    class EventManager extends egret.EventDispatcher {
    }
}
declare namespace devil {
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
    class KeyboardManager {
        private _functions;
        private _keyDowns;
        private _pushKeys;
        private _firstDelay;
        /**
         * 当第一次按下键盘时，会有些延时，默认为500MS
         */
        set firstDelay(value: number);
        constructor();
        /**
     * 判断指定的键是否被按下
     * @param keyCode
     * @return
     */
        hasKey(keyCode: number): boolean;
        /**
         * 填加侦听函数
         * @param key
         * @param callBack 参数keyCode如果是组合键，类似51|52；
         *                state是KeyState常量，标记是抬起还是按下；
         * @param target
         */
        add(key: number, callBack: (keyCode: string, state: KeyState) => void, target: any): void;
        remove(key: number, callBack: Function, target: any): void;
        adds(keys: number[], callBack: (keyCode: string, state: KeyState) => void, target: any): void;
        removes(keys: number[], callBack: Function, target: any): void;
        private callBack;
        private sort;
        private ___render;
        private ___pushRender;
    }
}
declare namespace devil {
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
    class LangManager {
        private _dic;
        /**
         * 解析语言包
         */
        parse(bytes: egret.ByteArray): void;
        /**
        * 语言ID，系统与ID组成的字符串，例如:bag1
        */
        getContent(id: string, ...args: any[]): string;
    }
}
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
declare namespace devil {
    /**
     * 加载管理器
     * @author devil
     * @version V20201008
     * @create V20180717
     * @place guangzhou
     * @update V20201008 guangzhou 加入Text请求Post方式
     */
    class LoaderManager {
        private _queues;
        private _needSort;
        private _loadingThread;
        private _maxThread;
        private _loadersCanGC;
        private _loadersCannotGC;
        private _loadersFail;
        /**
         * 微信小游戏不需要版本号，默认值为true
         */
        needVersion: boolean;
        /**
         * 资源的根路径
         */
        resourceUrl: string;
        constructor();
        setup(resourceUrl?: string, needVersion?: boolean): void;
        /**
         * 对相对路径进行root+计算,也就是将相对路径转换成绝对路径.
         */
        rootToURL(url: string): string;
        /**
          * 加载
          * @param path              路径
          * @param complete          加载完成回调函数
          * @param target            回调函数的主体
          * @param resourceGCType    资源回收类型，对应ResourceGCType常量，默认值为ResourceGCType.NOW
          * @param priority          加载顺序等级，越大越高,对应ResPriorityType常量,默认值为ResPriorityType.LOAD_LEVEL1
          */
        load(path: PathInfo, complete: Function, target: any, resourceGCType?: number, priority?: number, error?: Function, errorTarget?: any): ILoader;
        /**
         * 是否正在加载或加载完成
         * @param path
         */
        has(path: PathInfo): boolean;
        private getLoader;
        private complete;
        private render;
        private next;
        private error2;
        private sortQueues;
        /**
         * 取消加载的回调
         * @param path              路径
         * @param complete          加载完成回调函数
         * @param target            回调函数的主体
         */
        remove(path: PathInfo, complete: Function, target: any, error?: Function, errorTarget?: any): void;
        /**
         * 批处理加载
         * @param paths
         * @param resourceGCType
         * @param priority
         * @param complete
         * @param target
         */
        loadBatch(paths: PathInfo[], resourceGCType?: number, priority?: number, complete?: Function, target?: any, oneComplete?: Function, oneTarget?: any, oneError?: Function, errorTarget?: any): void;
        /**添加到加载失败列表 */
        addFail(key: string): void;
    }
}
/**
 * 日志管理器
 * @author devil
 * @version V20180925
 * @create 2018-09-25
 * @place guangzhou
 */
declare namespace devil {
    class LogManager {
        /**
         * 过滤日志类型，默认任何一种日志类型都会输出
         */
        logType: number;
        trace(logType: number, ...params: any[]): void;
    }
}
declare namespace devil {
    /**
     * 基础管理器集，针对基本的管理器
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    class Manager {
        /**
         * 场景管理器
         */
        static stage: StageManager;
        /**
         * 对象池管理器
         */
        static pool: ObjectPoolManager;
        /**
         * 渲染管理器
         */
        static render: RenderManager;
        /**
         * 层管理器
         */
        static layer: LayerManager;
        /**
         * 加载管理器
         */
        static loader: LoaderManager;
        /**
         * 日志管理器
         */
        static log: LogManager;
        static component: ComponentManager;
        static lang: LangManager;
        /**
         * UI数据解析管理器
         */
        static uiRead: UIReadManager;
        /**
         * 摄像机管理器
         */
        static camera: CameraManager;
        /**
         * socket管理器
         */
        static socket: SocketManager;
        /**
         * 视图管理器
         */
        static view: ViewManager;
        /**
         * 声音管理器
         */
        static sound: SoundManager;
        /**
         * Tip管理器
         */
        static tip: TipManager;
        /**
         * 事件管理器
         */
        static event: EventManager;
        /**
         * 平台管理器
         */
        static plat: PlatManager;
        /**
         * 键盘管理器
         */
        static keyboard: KeyboardManager;
        static storage: StorageManager;
        static wx: WXManager;
        static ad: WXADManger;
        /**
         * 使用管理器集前先要调用此方法启动
         * @root 为入口类，不是stage
         */
        static setup(root: egret.DisplayObjectContainer): void;
    }
}
declare namespace devil {
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
    class ObjectPoolManager {
        private _objects;
        /**对象池单个类型数组最大数 */
        private MAX_NUM;
        /**
          * 通过对象池创建对象
          * @param cls   对象类型
          */
        create(cls: {
            new (): IPool;
        }): any;
        /**
         * 创建不可以交互的sprite实例
         */
        createSprite(): egret.Sprite;
        /**
         * 回收Sprite实例进对象池
         * @param instance
         */
        pushSprite(instance: egret.Sprite): void;
        createShape(): egret.Shape;
        pushShape(instance: egret.Shape): void;
        createDisplayObjectContainer(): egret.DisplayObjectContainer;
        pushDisplayObjectContainer(instance: egret.DisplayObjectContainer): void;
        private pushDisplayObject;
        /**
         * 回收对象
         * @param cls			对应的类
         * @param instance		回收的类实例
         */
        push(instance: IPool): void;
        /**
         * 计算管理器内部的对象实例数，测试用
         */
        testCount(): void;
        /**
         * 创建位图
         */
        createBitmap(): egret.Bitmap;
        pushBitmap(instance: egret.Bitmap): void;
        /**
         * 创建文本
         */
        createTextField(): egret.TextField;
        /**
         * 回收TextField实例进对象池
         * @param instance
         */
        pushTextField(instance: egret.TextField): void;
        /**
         * 创建贴图
         */
        createTexture(): egret.Texture;
        /**
         * 回收贴图
         */
        pushTexture(instance: egret.Texture): void;
        createHttpRequest(): egret.HttpRequest;
        pushHttpRequest(instance: egret.HttpRequest): void;
        createImageLoader(): egret.ImageLoader;
        pushImageLoader(instance: egret.ImageLoader): void;
        createByteArray(): egret.ByteArray;
        pushByteArray(instance: egret.ByteArray): void;
    }
}
declare namespace devil {
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
    class PlatManager {
        /**
         * 是否微信小游戏
         */
        isWX(): boolean;
        /**
         * 是否QQ小游戏
         */
        isQQ(): boolean;
        /**
         * 是否移动端
         */
        isMobile(): boolean;
        /**
         * 是否电脑端（包含Windows、MAC）
         */
        isPC(): boolean;
    }
}
declare namespace devil {
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
    class RenderManager {
        private _callBacks;
        private _shape;
        private _interval;
        private _lastTime;
        private _addRenderCount;
        /**
         * 当前帧与上一帧的时间间隔，以毫秒为单位
         */
        getInterval(): number;
        constructor();
        /**
         * 是否包含指定的函数及对象，并且alive为true
         * @params render 回调函数
         * @params target 回调对象
         * @params return 大于-1则表示不包含，否则会返回当前的索引值
         */
        contains(render: Function, target: any): number;
        /**
        * 添加计时器render:Function, target:any, deley:number = 0, repeat:number = 0, end:Function = null, forceReset:boolean = false,...args:any[]
        * @params render 单次回调函数
        * @params target 包含函数的对象
        * @params deley 执行时间间隔，单位毫秒，0或小于0表示每帧都执行,默认为0
        * @params repeat 执行次数，0或小于0表示无限次
        * @params end 最后一次执行的回调函数
        * @params forceReset 强制重置设置，比如之前已add该render，则重置该render的值
        */
        add(render: Function, target: any, deley?: number, repeat?: number, end?: Function, forceReset?: boolean, ...args: any[]): void;
        /**
        * 移除计时器
        */
        remove(render: Function, target: any): void;
        private render;
        removeAll(target: any): void;
        private ___enterFrame;
    }
    class RenderTimerInfo implements IPool {
        alive: boolean;
        interval: number;
        delay: number;
        repeat: number;
        args: any[];
        render: CallBackInfo;
        end: CallBackInfo;
        constructor();
        reuse(): void;
        unuse(): void;
        dispose(): void;
        pool(): void;
        static create(render: Function, target: any, deley: number, repeat: number, end: Function, args: any[]): RenderTimerInfo;
    }
}
declare namespace devil {
    /**
     * socket管理器
     * @author        devil
     * @version       V20190311
     * @create        2018-07-28
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class SocketManager {
        private _ip;
        private _port;
        private _isWss;
        private _socket;
        private _isReconnecting;
        private _isConnected;
        private _reConnectCount;
        private _connnectFun;
        private _closeFun;
        private _errorFun;
        private _cmds;
        private _checkStateCount;
        /**
         * 服务器验证字段0~127,0开始
         */
        verify: number;
        /**
         * 本次登录是否断线重连
         */
        isSocketReConnect: boolean;
        /**
         * 是否需要重连
         */
        needReconnect: boolean;
        /**
         * 握手协议字符串
         */
        handContent: string;
        private _readBuffer;
        private _writeOffset;
        private _readOffset;
        private _totalLen;
        set isWss(value: boolean);
        get isConnected(): boolean;
        constructor();
        private receive;
        private initRemoteSocket;
        private clear;
        private closeSocket;
        addCMD(protocol: number, cls: any): void;
        removeCMD(protocol: number): void;
        getCMD<T>(protocol: number): T;
        addVerify(): void;
        /**
         * 连接
         * @param ip
         * @param port
         */
        connect(ip: string, port: number): void;
        private reconnect;
        send(pkgOrProtocol: TCPPacketOut | number): void;
        private $sendPkg;
        private checkOnopen;
        private onopenHandler;
        /**
          * 服务端需要该协议，socket连接成功时发送
          */
        private sendServerNeedCMD;
        private $connect;
        private startReconnect;
        private isWindowSocket;
        private readPackage;
        __connnect(callBack: () => void, target: any): void;
        __close(callBack: () => void, target: any): void;
        __error(callBack: () => void, target: any): void;
        /**
         * 重连socket
         */
        private ___renderReconnect;
    }
}
declare namespace devil {
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
    class SoundManager {
        private _ismute;
        private _sounds;
        private _backSound;
        private _backPath;
        private _backVolume;
        private _effectVolume;
        /**
         * 静音，静音打开时是暂停播放、静音关闭时是继续播放
         */
        get ismute(): boolean;
        set ismute(value: boolean);
        /**
         * 0-1
         */
        get backVolume(): number;
        set backVolume(value: number);
        /**
         * 0-1
         */
        get effectVolume(): number;
        set effectVolume(value: number);
        constructor();
        playBackSound(path?: PathInfo): void;
        private play;
        playEffectSound(path: PathInfo): void;
        stopBackSound(): void;
        private ___touchTab;
    }
    class SoundObject {
        static READY: number;
        static PLAYYING: number;
        private _loops;
        private _playFlag;
        private _path;
        private _loadComplete;
        private _type;
        private _sound;
        private _soundChannel;
        private _startTime;
        get path(): PathInfo;
        get playFlag(): number;
        set volume(value: number);
        constructor(type: string, path: PathInfo);
        load(): void;
        private startPlay;
        private stopChannel;
        play(loops?: number): void;
        stop(): void;
        pause(): void;
        plugs(): void;
        private ___complete;
        private ___ioError;
        private ___playComplete;
    }
}
declare namespace devil {
    /**
     * 场景管理器
     * @author        devil
     * @version       V20190131
     * @create        2019-01-31
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class StageManager {
        private _frameTime;
        private _callBacks;
        stage: egret.Stage;
        /**
         * 当前视图窗口的宽度，以实际像素为主
         */
        displayWidth: number;
        /**
         * 当前视图窗口的高度，以实际像素为主
         */
        displayHeight: number;
        get width(): number;
        get height(): number;
        get frameRate(): number;
        get frameTime(): number;
        constructor(stage: egret.Stage);
        add(callBack: (width: number, height: number) => void, target: any): void;
        remove(callBack: (width: number, height: number) => void, target: any): void;
        private ___resize;
    }
}
declare namespace devil {
    /**
     * 基础管理器集，针对基本的管理器
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    class StorageManager {
        getItem(key: string): string;
        clear(): void;
        setItem(key: string, value: string): void;
        removeItem(key: string): void;
        setBoolean(key: string, value: boolean): void;
        getBoolean(key: string): boolean;
        setInt(key: string, value: number): void;
        getInt(key: string): number;
    }
}
declare namespace devil {
    /**
     * Tip管理器
     * @author devil
     * @version V20190425
     * @create 20190425
     * @place guangzhou
     */
    class TipManager {
        private _currentTip;
        private _modal;
        /**
         *
         * @param cls
         * @param modal   default false
         */
        show<T extends ITip>(cls: {
            new (): T;
        }, modal?: boolean): T;
        hide<T extends ITip>(cls?: {
            new (): T;
        }): void;
        /** 是否打开了 */
        isOpenning<T extends ITip>(cls: {
            new (): T;
        }): boolean;
        setModalAlpha(alpha?: number): void;
        private ___touchTap;
        private ___resize;
    }
}
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
declare namespace devil {
    /**
     * 广告管理器
     * @author        devil
     * @version       V20200909
     * @create        2020-09-09
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class WXADManger {
        private _jili;
        private _banner;
        private _chaping;
        private _bannerShow;
        setup(bannerID: string, jiliID: string, chapingID: string): void;
        private createBanner;
        private createJiLi;
        private createChaPing;
        /**
         * 打开激励广告
         */
        openJiLi(callBack: (isEnd: boolean) => void, target: any): void;
        /**
         * 打开插屏广告
         */
        openChaPing(): void;
        /**
         * 打开或关闭Banner广告
         * @param show
         */
        switchBanner(show: boolean): void;
    }
}
declare let wx: any;
declare namespace devil {
    /**
     * 微信管理器
     * @author        devil
     * @version       V20200906
     * @create        2020-09-06
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class WXManager {
        /**
         * 发送朋友设置
         * @param titles    分享时设置的标题
         * @param imageURL  分享图片设置，默认值为resource/assets/share/share.png(330*237)
         */
        onShareAppMessage(titles: string[], imageURL?: string): void;
        /**
         * 初始化本地缓存数据
         * @param nickName 玩家昵称
         * @param gameName 游戏名字
         * @param maxReceiveCount 默认赠送的免费复活次数，默认为0
         */
        readLocation(maxReceiveCount?: number): void;
        writeLocation(): void;
        writeReceiveFreeCount(): void;
        writeHasReceiveFreeCount(): void;
        /**
         * 打开其它的小游戏
         * @param appID
         */
        navigateToMiniProgram(appID: string): void;
        loginRank(image: string, x: number, y: number, width: number, height: number, sucess?: () => void, target?: any): void;
        /**
         * 创建开始按钮
         * @param x 设计尺寸上的水平坐标
         * @param y 设计尺寸上的垂直坐标
         * @param width 设计尺寸的宽度
         * @param height 设计尺寸的高度
         */
        login(image: string, x: number, y: number, width: number, height: number, game_id: number, sucess?: (code: any) => void, target?: any): void;
        /**
         * 游戏列表
         */
        list(callBack: () => void, target: any, appid: string): void;
        /**
         *
         * 初始化开关
         * @param callBack
         * @param target
         * @param id 1.魔法之触
         */
        initCtrl(callBack: () => void, target: any, id: number): void;
        /**
         * 登录后台接口
         */
        private $login;
        saveScore(member_id: string, score: number, game_id: number): void;
        private ___$saveRender;
    }
}
declare namespace devil {
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
    class CVOModel {
        private _dic;
        parse(source: egret.ByteArray | ArrayBuffer): void;
        getCVOData(name: string): egret.ByteArray;
        clearCVOData(name: string): void;
    }
}
declare namespace devil {
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
    class CanvasModel {
        private _versions;
        private _canvases;
        get canvases(): any;
        constructor();
        getBytes(name: string): ByteArrayExtend;
        getVersion(name: string): string;
        addCanvas(bytes: ByteArrayExtend, name: string, version: string): void;
        /**
         * 清空数据
         */
        clear(): void;
    }
}
declare namespace devil {
    /**
     * 数据
     * @author        devil
     * @version       V20190131
     * @create        2019-01-31
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class Model {
        /**
         * default.res.json配置文件的数据
         */
        static resConfig: IResourceConfig;
        static canvas: CanvasModel;
        static cvo: CVOModel;
        static wxGame: WXGameModel;
        static lifecyclePause: boolean;
        static setup(): void;
    }
}
declare namespace devil {
    /**
     * 小游戏通用数据
     * @author        devil
     * @version       V20200906
     * @create        2020-09-06
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class WXGameModel {
        userInfo: UserInfo;
        gameName: string;
        /**
         * 后台总开关
         */
        masterCtrl: boolean;
        gameCtrl: any;
        code: string;
        openID: string;
        list: any[];
        get leftReceiveCount(): number;
        constructor();
        /**
         * 获取游戏开关
         * @param key
         */
        getGameCtrl(key: string): boolean;
        /**
         * 免费复活次数
         */
        private _receiveFreeCount;
        get receiveFreeCount(): number;
        set receiveFreeCount(value: number);
        /**
         * 已免费复活次数
         */
        private _hasReceiveFreeCount;
        get hasReceiveFreeCount(): number;
        set hasReceiveFreeCount(value: number);
    }
}
declare namespace devil {
    /**
     * 微信用户信息
     * @author        devil
     * @version       V20200906
     * @create        2020-09-24
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class UserInfo {
        nickName: string;
        avatarUrl: string;
        gender: number;
        province: string;
        city: string;
        country: string;
        parse(data: any): void;
    }
}
declare namespace devil {
    /**
     * 协议处理基类
     * @author devil
     * @version V20180728
     * @create V20180728
     * @place guangzhou
     * @QQ    101644277
     */
    class BaseCMD {
        protected _protocol: number;
        get protocol(): number;
        receive(pkg: TCPPacketIn): void;
        protected processOut(pkg: TCPPacketOut): void;
        protected get canSend(): boolean;
        send(): void;
    }
}
declare namespace devil {
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
    class ByteArrayExtend extends egret.ByteArray implements IPool {
        get buffer(): ArrayBuffer;
        /**
         * @private
         */
        set buffer(value: ArrayBuffer);
        setArrayBuffer(buffer: ArrayBuffer): void;
        readInt64(): number;
        writeInt64(value: number): void;
        writeUTF(value: string): void;
        pool(): void;
        unuse(): void;
        reuse(): void;
        dispose(): void;
    }
}
declare namespace devil {
    /**
     * @author        devil
     * @version       V20190311
     * @create        2019-03-11
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class TCPPacketIn extends ByteArrayExtend {
        private _protocol;
        get protocol(): number;
        set protocol(value: number);
        constructor();
    }
}
declare namespace devil {
    /**
     * 发送协议包头
     * @author        devil
     * @version       V20190311
     * @create        20180726
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class TCPPacketOut extends ByteArrayExtend {
        private static LENGTH_LEN;
        private static PROTOCOL_LEN;
        private static VERIFY_LEN;
        private static COMMON_TOTAL_LEN;
        protocol: number;
        constructor();
        writePacketLenAndVerify(): void;
        static create(protocol: number): TCPPacketOut;
    }
}
declare namespace devil {
    /**
     * 画布、界面、面板
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class Canvas extends Container {
        constructor();
        /**
         * 解析数据
         */
        read(bytes: ByteArrayExtend, version: string): void;
        /**
         * 编辑器子类重写
         * @param bytes
         * @param version
         */
        private readChildren;
    }
}
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
declare namespace devil {
    /**
     * 图片组件
     * @author        devil
     * @version       V20190131
     * @create        2019-01-31
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class Image extends Component {
        private _layer;
        private _clickFun;
        private _downFun;
        protected _bitmap: egret.Bitmap;
        protected _source: egret.Texture | string;
        protected _path: PathInfo;
        protected _completeFun: CallBackInfo;
        get bitmap(): egret.Bitmap;
        /**
         * 九宫格
         */
        set scale9Grid(value: egret.Rectangle);
        get scale9Grid(): egret.Rectangle;
        /**
         * 图片源数据
         */
        get source(): egret.Texture | string;
        set source(value: egret.Texture | string);
        constructor();
        protected initLayer(): void;
        /**
         * @private
         */
        protected start(): void;
        protected draw(): void;
        private drawSize;
        protected drawData(): void;
        unuse(): void;
        dispose(): void;
        /**
         * 加载完成的回调函数，参数为[TextureLoader,Image]
         * @param callBack
         * @param target
         */
        __complete(callBack: (loader: TextureLoader, target: Image) => void, target: any): void;
        protected ___complete(loader: BaseLoader): void;
        __click(callBack: (e: egret.TouchEvent, target: Image | ImageRemote) => void, target: any): void;
        __down(callBack: Function, target: any): void;
        private ___touchTap;
        private ___touchBegin;
    }
}
declare namespace devil {
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
    class ImageRemote extends Image {
        get url(): string | PathInfo;
        set url(value: string | PathInfo);
        set source(value: egret.Texture | string);
        constructor();
        protected start(): void;
        protected drawData(): void;
        protected ___complete(loader: BaseLoader): void;
    }
}
declare namespace devil {
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
    class RadioButton extends ButtonTextSelected implements IRadioSelected {
        private _selector;
        setSelected(value: boolean): void;
        getSelected(): boolean;
        setSelector(value: RadioSelector): void;
        constructor();
        protected start(): void;
        protected drawSize(): void;
        protected drawLayout(): void;
        unuse(): void;
        dispose(): void;
        protected ___handleEvent(e: egret.TouchEvent): void;
    }
}
declare namespace devil {
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
    class Text extends Component {
        private _textField;
        private _layer;
        private _clickFun;
        private _linkFun;
        private _focusInFun;
        private _focusOutFun;
        /**
         * 颜色
         */
        get color(): number;
        set color(value: number);
        /**
         * 是否加粗
         */
        get bold(): boolean;
        set bold(value: boolean);
        /**
         * 字体大小
         */
        get size(): number;
        set size(value: number);
        /**
         * 文本内容
         */
        get text(): string;
        set text(value: string);
        /**
         * 设置文本布局
         * @param value   egret.HorizontalAlign常量
         */
        get align(): string;
        set align(value: string);
        /**
         * 是否可编辑
         */
        set editor(value: boolean);
        get textWidth(): number;
        get textHeight(): number;
        get wordWrap(): boolean;
        set wordWrap(value: boolean);
        get multiline(): boolean;
        set multiline(value: boolean);
        set verticalAlign(value: string);
        set htmlText(value: string);
        set stroke(value: number);
        set strokeColor(value: number);
        set lineSpacing(value: number);
        set border(value: boolean);
        set textType(value: string);
        set background(value: boolean);
        set backgroundColor(value: number);
        get maxChars(): number;
        set maxChars(value: number);
        set displayAsPassword(value: boolean);
        get displayAsPassword(): boolean;
        set restrict(value: string);
        get restrict(): string;
        constructor();
        protected initLayer(): void;
        protected start(): void;
        private removeEvent;
        /**
         * @private
         */
        protected draw(): void;
        private drawSize;
        appendText(text: string): void;
        setFocus(): void;
        /**
         * @private
         */
        unuse(): void;
        /**
         * @private
         */
        dispose(): void;
        __click(callBack: Function, target: any): void;
        private ___click;
        __link(callBack: Function, target: any): void;
        private ___link;
        __focusIn(callBack: Function, target: any): void;
        private ___focusIn;
        __focusOut(callBack: Function, target: any): void;
        private ___focusOut;
    }
}
declare namespace devil {
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
    class TextInput extends Container {
        private _editor;
        private _text;
        private _back;
        private _prompt;
        private _displayAsPassword;
        set editor(value: boolean);
        get editor(): boolean;
        get text(): string;
        set text(value: string);
        get color(): number;
        set color(value: number);
        get bold(): boolean;
        set bold(value: boolean);
        get size(): number;
        set size(value: number);
        get align(): string;
        set align(value: string);
        set enabled(value: boolean);
        get prompt(): string;
        set prompt(value: string);
        get maxChars(): number;
        set maxChars(value: number);
        set displayAsPassword(value: boolean);
        get displayAsPassword(): boolean;
        set restrict(value: string);
        get restrict(): string;
        constructor();
        protected start(): void;
        protected setDefaultStyle(): void;
        protected draw(): void;
        private drawStyle;
        private drawSize;
        setFocus(): void;
        unuse(): void;
        dispose(): void;
        private ___focusIn;
        private ___focusOut;
    }
}
declare namespace devil {
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
    class Animation extends Container {
        /**
         * 帧动画的时间间隔
         */
        static ANIMATION_INTERVAL: number;
        private _image;
        private _cvo;
        private _currentFrame;
        private _currentCount;
        private _path;
        private _autoPlay;
        private _playCompleteDispose;
        private _repeate;
        private _loadCompletes;
        private _data;
        private _nextFrame;
        private _currentTime;
        private _resPriorityType;
        private _playCompleteFun;
        private _failFun;
        private _resourceGCType;
        private _layer;
        ids: number[];
        get currentFrame(): number;
        get totalFrame(): number;
        get url(): string;
        constructor();
        protected initLayer(): void;
        protected start(): void;
        protected addToStage(): void;
        protected removeFromStage(): void;
        private load;
        private goto;
        gotoAndStop(frame: number): void;
        gotoAndPlay(frame: number): void;
        private playComplete;
        play(): void;
        stop(): void;
        private init;
        /**
         * resourceGCType  default ResourceGCType.ANIMATION
         */
        update(path: PathInfo, cvo: IAnimationCVO, resPriorityType: number, resourceGCType?: number, autoPlay?: boolean, playCompleteDispose?: boolean): void;
        protected draw(): void;
        private drawSize;
        unuse(): void;
        dispose(): void;
        /**
         * 播放完成
         */
        __playComplete(callBack: () => void, target: any, ...args: any[]): void;
        __fail(callBack: Function, target: any, ...args: any[]): void;
        private ___complete;
        private ___render;
        private ___fail;
    }
}
declare namespace devil {
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
    class ButtonIcon extends ButtonImage {
        private _iconOffsetX;
        private _iconOffsetY;
        private _iconLayer;
        protected _iconX: number;
        protected _iconY: number;
        protected _icon: Image;
        protected _iconStyleName: string;
        protected _iconWidth: number;
        protected _iconHeight: number;
        constructor();
        protected initLayer(): void;
        /**
         * @private
         */
        protected start(): void;
        /**
         * @private
         */
        protected setDefaultStyle(): void;
        /**
         * @private
         */
        protected draw(): void;
        /**
         * @private
         */
        protected drawState(): void;
        protected drawIconSkin(styleName: string): void;
        /**
         * 设置图标的偏移量
         * @param x
         * @param y
         */
        setIconOffset(x: number, y: number): void;
        private drawLayout;
        /**
         * @private
         */
        unuse(): void;
        /**
         * @private
         */
        dispose(): void;
        private ___complete;
    }
}
declare namespace devil {
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
    class ButtonIconSelected extends ButtonIcon {
        protected _common: ButtonSelectedBase;
        get common(): ButtonSelectedBase;
        constructor();
        protected start(): void;
        /**
         * @private
         */
        protected setDefaultStyle(): void;
        protected drawState(): void;
        setEnabled(value: boolean): void;
        protected ___handleEvent(e: egret.Event): void;
        unuse(): void;
        dispose(): void;
    }
}
declare namespace devil {
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
    class ButtonImage extends Container {
        private static DRAW_STATE;
        private _mouseDownFun;
        private _clickFun;
        private _longClickFun;
        private _longClickCnt;
        protected _layer: egret.DisplayObjectContainer;
        protected _buttonState: ButtonState;
        protected _currentBack: Image;
        protected _downOffset: Boolean;
        get buttonState(): ButtonState;
        set buttonState(value: ButtonState);
        setEnabled(value: boolean): void;
        /**
         * 按下按钮时是否偏移1像素
         * @param value
         */
        set downOffset(value: Boolean);
        constructor();
        protected initLayer(): void;
        /**
         * @private
         */
        protected start(): void;
        /**
         * @private
         */
        protected addEvent(): void;
        /**
         * @private
         */
        protected removeEvent(): void;
        /**
         * @private
         */
        protected setDefaultStyle(): void;
        /**
         * @private
         */
        protected draw(): void;
        /**
         * @private
         */
        protected drawState(): void;
        protected drawSkin(styleName: string): void;
        protected drawSize(): void;
        /**
         * @private
         */
        reuse(): void;
        /**
         * @private
         */
        unuse(): void;
        /**
         * @private
         */
        dispose(): void;
        /**
         * 点击事件
         */
        __click(callBack: Function, target: any): void;
        /**
         * 鼠标按下事件
         */
        __mouseDown(callBack: Function, target: any): void;
        /**
         * 长按事件
         */
        __longClick(callBack: Function, target: any): void;
        /**
         * @private
         */
        protected ___handleEvent(e: egret.Event): void;
        protected ___$handleEvent(e: egret.Event): void;
        /** */
        private ___checkLongClick;
    }
}
declare namespace devil {
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
    class ButtonImageSelected extends ButtonImage {
        protected _common: ButtonSelectedBase;
        get common(): ButtonSelectedBase;
        constructor();
        protected start(): void;
        protected setDefaultStyle(): void;
        protected drawState(): void;
        unuse(): void;
        dispose(): void;
        protected ___handleEvent(e: egret.Event): void;
    }
}
declare namespace devil {
    /**
     * @author        devil
     * @version       V201190215
     * @create        2019-02-15
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ButtonSelectedBase implements IPool {
        private _button;
        set button(value: ButtonImage);
        set selected(value: boolean);
        get selected(): boolean;
        reuse(): void;
        unuse(): void;
        dispose(): void;
        pool(): void;
    }
}
declare namespace devil {
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
    class ButtonText extends ButtonImage {
        protected _txtLayer: egret.DisplayObjectContainer;
        protected _label: Text;
        protected _labelOffsetX: number;
        protected _labelOffsetY: number;
        protected _labelX: number;
        protected _labelY: number;
        /**
         * 文本实例
         */
        get label(): Text;
        /**
         * 设置按钮的文本显示内容
         */
        set text(value: string);
        get text(): string;
        constructor();
        protected initLayer(): void;
        protected start(): void;
        protected draw(): void;
        protected drawSize(): void;
        protected drawState(): void;
        /**
         * 设置文本的偏移量
         * @param x
         * @param y
         */
        setLabelOffset(x: number, y: number): void;
        protected drawLayout(): void;
        unuse(): void;
        dispose(): void;
    }
}
declare namespace devil {
    /**
     * @author        devil
     * @version       V20190418
     * @create        V2019-04-18
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ButtonTextSelected extends ButtonText {
        protected _common: ButtonSelectedBase;
        get common(): ButtonSelectedBase;
        constructor();
        protected start(): void;
        protected setDefaultStyle(): void;
        protected drawState(): void;
        unuse(): void;
        dispose(): void;
        protected ___handleEvent(e: egret.TouchEvent): void;
    }
}
declare namespace devil {
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
    class RadioButtonImageSelected extends ButtonImageSelected implements IRadioSelected {
        private _selector;
        setSelected(value: boolean): void;
        getSelected(): boolean;
        setSelector(value: RadioSelector): void;
        unuse(): void;
        dispose(): void;
        protected ___handleEvent(e: egret.TouchEvent): void;
    }
}
declare namespace devil {
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
    class CheckBox extends ButtonTextSelected {
        constructor();
        protected start(): void;
        protected drawSize(): void;
        protected drawLayout(): void;
    }
}
declare namespace devil {
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
    class CheckBox1 extends ButtonTextSelected {
        private _icon;
        constructor();
        protected start(): void;
        /**
          * @private
          */
        protected addEvent(): void;
        /**
         * @private
         */
        protected removeEvent(): void;
        protected setDefaultStyle(): void;
        protected draw(): void;
        protected drawSize(): void;
        private drawStyle;
        protected drawLayout(): void;
        protected drawSkin(styleName: string): void;
        unuse(): void;
        dispose(): void;
        private ___complete;
    }
}
declare namespace devil {
    /**
     * 组件基类，所有的组件都需要继承此类
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class Component extends View {
        protected _type: number;
        protected _styles: any;
        protected _stylesOffset: any;
        /**
         * 组件类型，对应的常量ComponentType
         */
        get type(): number;
        constructor();
        /**
         * @private
         */
        protected start(): void;
        /**
         * 设置缺省样式
         */
        protected setDefaultStyle(): void;
        /**
         * 获取指定名字的样式皮肤字符串
         * @param name		StyleName常量或自定义的特殊样式名
         */
        getStyle(name: string): any;
        protected getImageData(styleName: string): ResourceItem;
        /**
         * 设置指定名字的样式皮肤字符串
         * @param name		StyleName常量或自定义的特殊样式名
         * @param value		皮肤字符串
         */
        setStyle(name: string, value: any): void;
        /**
         * 设置指定名字的样式便宜
         * @param name		StyleName常量或自定义的特殊样式名
         */
        setStyleOffset(name: string, xOffset: number, yOffset: number): void;
        /**
         * 设置指定名字的样式便宜
         * @param name		StyleName常量或自定义的特殊样式名
         */
        getStyleXoffset(name: string): number;
        /**
         * 设置指定名字的样式便宜
         * @param name		StyleName常量或自定义的特殊样式名
         */
        getStyleYoffset(name: string): number;
        unuse(): void;
        dispose(): void;
    }
}
declare namespace devil {
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
    class BoxContainer extends Container implements IListContainer {
        datas: IListItemData[];
        contentHeight: number;
        contentWidth: number;
        private _showCount;
        private _itemWidth;
        private _itemHeight;
        private _selector;
        private _row;
        private _col;
        private _paddingV;
        private _paddingH;
        holdBottom: boolean;
        getCount(): number;
        /**
         * 最多显示数量，要在add与addAt前使用
         */
        get showCount(): number;
        set showCount(value: number);
        get itemWidth(): number;
        set itemWidth(value: number);
        get itemHeight(): number;
        set itemHeight(value: number);
        get selectedIndex(): number;
        set selectedIndex(value: number);
        getCurrent(): IRadioSelected;
        getScrollH(): number;
        getScrollV(): number;
        setScrollH(value: number): void;
        setScrollV(value: number): void;
        constructor();
        protected start(): void;
        protected draw(): void;
        private drawLayOut;
        add(item: IListItem): void;
        addAt(item: IListItem, index: number): void;
        getItemAt(index: number): IListItem;
        remove(item: IListItem): void;
        removeAt(index: number): void;
        /**
         * 清空
         */
        clear(): void;
        /**
         * 清空列表数据
         */
        clearData(): void;
        private updateWH;
        unuse(): void;
        dispose(): void;
        /**
         * 参数 IRadioSelected
         */
        __change(callBack: (selected: IRadioSelected) => void, target: any): void;
        static createSelf(row: number, col: number, paddingV?: number, paddingH?: number): BoxContainer;
    }
}
declare namespace devil {
    /**
     * @description
     * @author        devil
     * @version       V20190305
     * @create        2019-03-05
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    interface IListContainer extends IDispose {
        /**
         * 最多显示数量，要在add与addAt前使用
         */
        readonly showCount: number;
        add(item: IListItemData): void;
        addAt(item: IListItemData, index: number): void;
        getItemAt(index: number): IListItem;
        remove(item: IListItemData): void;
        removeAt(index: number): void;
        move(x: number, y: number): void;
        clear(): void;
        clearData(): void;
        itemWidth: number;
        itemHeight: number;
        selectedIndex: number;
        /**
         * 参数 IRadioSelected
         */
        __change(value: Function, target: any): void;
        getCurrent(): IRadioSelected;
        readonly layers: egret.DisplayObjectContainer[];
        contentHeight: number;
        contentWidth: number;
        getScrollV(): number;
        /**
         *
         * @param value
         * @param fromScrollBar  是否来自于滚动条
         */
        setScrollV(value: number, fromScrollBar: boolean): void;
        getScrollH(): number;
        /**
         *
         * @param value
         * @param fromScrollBar  是否来自于滚动条
         */
        setScrollH(value: number, fromScrollBar: boolean): void;
        datas: IListItemData[];
        setSize(width: number, height: number): void;
        /**
         * 是否显示最后一行，默认为false
         */
        holdBottom: boolean;
    }
}
declare namespace devil {
    /**
     * @description
     * @author        devil
     * @version       V20190305
     * @create        2019-03-05
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    interface IListItem extends IRadioSelected {
        setData(value: any): void;
        /**
         * 清空数据
         */
        clearData(): void;
        index: number;
    }
}
declare namespace devil {
    interface IListItemData {
    }
}
declare namespace devil {
    interface IListItemData2 extends IListItemData {
        readonly width: number;
        readonly height: number;
    }
}
declare namespace devil {
    /**
     * List组件
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class List extends Container {
        /**
         * 方向垂直
         */
        static VERTICAL: number;
        /**
         * 水平方向
         */
        static HORIZONTAL: number;
        private _scrollPolicyV;
        private _scrollPolicyH;
        private _container;
        private _scroll;
        private _layout;
        private _layer;
        get scrollPolicyV(): ScrollPolicy;
        set scrollPolicyV(value: ScrollPolicy);
        get scrollPolicyH(): ScrollPolicy;
        set scrollPolicyH(value: ScrollPolicy);
        get container(): IListContainer;
        set container(value: IListContainer);
        get layout(): number;
        set layout(value: number);
        set bounces(value: boolean);
        constructor();
        protected initLayer(): void;
        protected start(): void;
        unuse(): void;
        dispose(): void;
    }
}
declare namespace devil {
    /**
     * 列表组件容器
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ListContainer extends Container implements IListContainer {
        static DRAW_CONTENT_SIZE: number;
        protected _col: number;
        protected _paddingV: number;
        protected _paddingH: number;
        private _itemWidth;
        private _itemHeight;
        private _selector;
        protected _datas: IListItemData[];
        protected _startIndex: number;
        protected _endIndex: number;
        protected _contentWidth: number;
        protected _contentHeight: number;
        protected _scrollV: number;
        protected _scrollH: number;
        private _scrollRect;
        private _indexInViewCalculated;
        private _itemRender;
        private _createItemRender;
        private _fromScrollBar;
        private _layer;
        private _subLayers;
        private _sortFun;
        private _sliderH;
        private _sliderV;
        holdBottom: boolean;
        get showCount(): number;
        get itemWidth(): number;
        set itemWidth(value: number);
        get itemHeight(): number;
        set itemHeight(value: number);
        get paddingV(): number;
        set paddingV(value: number);
        get paddingH(): number;
        set paddingH(value: number);
        getCurrent(): IRadioSelected;
        get selectedIndex(): number;
        set selectedIndex(value: number);
        get contentWidth(): number;
        get contentHeight(): number;
        get scrollRect(): egret.Rectangle;
        set scrollRect(value: egret.Rectangle);
        getScrollH(): number;
        setScrollH(value: number, fromScrollBar: boolean): void;
        getScrollV(): number;
        setScrollV(value: number, fromScrollBar: boolean): void;
        set sliderH(slider: ListSlider);
        get sliderH(): ListSlider;
        set sliderV(slider: ListSlider);
        get sliderV(): ListSlider;
        get datas(): IListItemData[];
        set datas(value: IListItemData[]);
        set itemRenderer(value: any);
        get col(): number;
        set col(value: number);
        /**
         * 创建子项时，需要的回调函数，可以做一些参数的设置或代码初始化等操作
         * @callBack 参数为当前创建的IListItem实例
         */
        createItemRender(callBack: (child: IListItem, index: number) => void, target: any): void;
        constructor();
        protected initLayer(): void;
        protected start(): void;
        protected draw(): void;
        setSize(width: number, height: number): void;
        /**
         * 清空
         */
        clear(): void;
        /**
         * 清空列表数据
         */
        clearData(): void;
        private drawLayout;
        protected sortPosition(): void;
        add(data: IListItemData): void;
        addAt(data: IListItemData, index: number): void;
        getItemAt(index: number): IListItem;
        removeAt(index: number): void;
        remove(data: IListItemData): void;
        protected getStartPosition(index: number): number;
        /**
         * 折半查找法寻找指定位置的显示对象索引
         */
        protected findIndexAt(scroll: number, i0: number, i1: number): number;
        protected getIndexInView(): boolean;
        protected createItem(index: number): IListItem;
        getSubLayer(index: number): egret.DisplayObjectContainer;
        protected drawContentSize(): void;
        private scrollPositionChanged;
        protected getDirection(): number;
        createSortFun(callBack: () => void, target: any): void;
        unuse(): void;
        dispose(): void;
        __change(callBack: (current: IRadioSelected) => void, target: any): void;
    }
}
declare namespace devil {
    /**
     * 列表组件容器
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ListContainer2 extends ListContainer {
        /**
         * 特殊处理 玩动2游戏的面板Tab
         */
        contentWidthOffset: number;
        constructor();
        protected start(): void;
        protected sortPosition(): void;
        protected getStartPosition(index: number): number;
        /**
         * 折半查找法寻找指定位置的显示对象索引
         */
        protected findIndexAt(scroll: number, i0: number, i1: number): number;
        protected getIndexInView(): boolean;
        protected drawContentSize(): void;
    }
}
declare namespace devil {
    /**
     * 滑动组件进度条
     */
    class ListSlider extends Container implements IDispose {
        private _layer;
        private _trackImg;
        private _thumbImg;
        container: IListContainer;
        isVertical: boolean;
        listHeight: number;
        listWidth: number;
        private _posOffset;
        private _sizeOffset;
        constructor();
        setTrackAlpha(value: number): void;
        setTrackSource(value: string): void;
        setThumbSource(value: string): void;
        set posOffset(value: number);
        set sizeOffset(value: number);
        protected initLayer(): void;
        protected start(): void;
        addEvent(): void;
        removeEvent(): void;
        updateContentSize(): void;
        /** */
        containerUpdPos(scrollValue: number): void;
        /** 更新位置 */
        protected updateThumbPos(value: number, fromContainer?: boolean, calOffset?: boolean): void;
        protected ___handleEvent(e: egret.TouchEvent): void;
        protected draw(): void;
        protected drawLayout(): void;
        protected drawData(): void;
        protected drawSize(): void;
        unuse(): void;
        dispose(): void;
    }
}
declare namespace devil {
    /**
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ScrollBar implements IPool {
        /**
         * 开始触发滚动的阈值（以像素为单位），当触摸点偏离初始触摸点的距离超过这个值时才会触发滚动。
         */
        static scrollThreshold: number;
        private _touchScrollH;
        private _touchScrollV;
        private _list;
        private _touchStartX;
        private _touchStartY;
        private _touchMoved;
        private _touchCancle;
        private _downTarget;
        private _horizontalCanScroll;
        private _verticalCanScroll;
        set list(value: List);
        /**
         * 是否启用回弹
         */
        set bounces(value: boolean);
        constructor();
        private start;
        private removeEvent;
        /**
         * 停止滚动的动画
         */
        private stopAnimation;
        checkScrollPolicy(): boolean;
        private checkVH;
        private dispatchBubbleEvent;
        pool(): void;
        reuse(): void;
        unuse(): void;
        dispose(): void;
        private ___touchBegin;
        private ___touchEnd;
        private ___touchTap;
        private ___touchMove;
        private ___update;
    }
}
declare namespace devil {
    class TouchScroll implements IDispose {
        private _updateFun;
        private _endFun;
        private _bounces;
        private _isStarted;
        private _isPlaying;
        private _currentPosition;
        private _maxScrollPos;
        private _offsetPoint;
        private _currentScrollPos;
        private _velocity;
        private _previousVelocity;
        private _previousPosition;
        private _duration;
        private _from;
        private _to;
        private _currentValue;
        private _scrollFactor;
        private _playStartTime;
        private _startTime;
        /**
         * 是否正在播放动画，不包括延迟等待和暂停的阶段
         */
        get isPlaying(): boolean;
        set bounces(value: boolean);
        /**
         * true表示已经调用过start方法。
         */
        isStarted(): () => any;
        /**
         * 当前容器滚动外界可调节的系列
         */
        get scrollFactor(): number;
        set scrollFactor(value: number);
        constructor(updateFunction: (scrollPos: number, target: TouchScroll) => void, endFunction: (target: TouchScroll) => void, target: any);
        /**
         * @private
         * 开始记录位移变化。注意：当使用完毕后，必须调用 finish() 方法结束记录，否则该对象将无法被回收。
         * @param touchPoint 起始触摸位置，以像素为单位，通常是stageX或stageY。
         */
        start(touchPoint: number): void;
        /**
         * 如果正在执行缓动滚屏，停止缓动。
         */
        stop(): void;
        /**
         * 更新当前移动到的位置
         * @param touchPoint 当前触摸位置，以像素为单位，通常是stageX或stageY。
         */
        update(touchPoint: number, maxScrollValue: number, scrollValue: number): void;
        /**
         * 缓动到水平滚动位置
         */
        private tweenTo;
        private finishScrolling;
        /**
         * 停止记录位移变化，并计算出目标值和继续缓动的时间。
         * @param currentScrollPos 容器当前的滚动值。
         * @param maxScrollPos 容器可以滚动的最大值。当目标值不在 0~maxValue之间时，将会应用更大的摩擦力，从而影响缓动时间的长度。
         */
        finish(currentScrollPos: number, maxScrollPos: number): void;
        private easeOut;
        dispose(): void;
        private ___render;
    }
}
declare namespace devil {
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
    class Tab extends Container {
        private _selector;
        private _selectedIndex;
        private _change;
        private _commLayer;
        private _uiLayer;
        private _redLayer;
        private _paddingH;
        get selectedIndex(): number;
        set selectedIndex(value: number);
        resetSelectedIndex(): void;
        set paddingH(value: number);
        get paddingH(): number;
        start(): void;
        private onSelected;
        switchRed(index: number, isRed: boolean): void;
        add(data: TabData): TabButtonIconSelected;
        addAt(data: TabData, index: number): TabButtonIconSelected;
        /**
         *
         * @param index 此处删除可能有问题，flag
         * @param unuse
         */
        removeAt(index: number, unuse: boolean): void;
        protected draw(): void;
        private drawLayout;
        unuse(): void;
        dispose(): void;
        __change(callBack: (oldIndex: number, target: Tab) => void, target: any): void;
    }
}
declare namespace devil {
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
    class TabButtonIconSelected extends ButtonIconSelected implements IListItem {
        static RED_SKIN: string;
        private _selector;
        private _red;
        private _commonLayer1;
        private _index;
        get index(): number;
        set index(value: number);
        protected initLayer(): void;
        protected start(): void;
        protected setDefaultStyle(): void;
        setSelected(value: boolean): void;
        getSelected(): boolean;
        setSelector(value: RadioSelector): void;
        switchRed(show: boolean): void;
        setData(value: TabData): void;
        clearData(): void;
        unuse(): void;
        dispose(): void;
        protected ___handleEvent(e: egret.TouchEvent): void;
    }
}
declare namespace devil {
    class TabData implements IListItemData2 {
        upBackSkin: string;
        selectedBackSkin: string;
        upIconSkin: string;
        selectedfIconSkin: string;
        width: number;
        height: number;
        index: number;
        showRed: boolean;
        selected: boolean;
        constructor(upBackSkin: string, selectedBackSkin: string, upIconSkin: string, selectedIconSkin: string);
    }
}
declare namespace devil {
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
    class ArrayUtil {
        /**
         * 将某一格式的字符串转成数字类型数组,可带有{}格式
         * @param str
         * @param splitStr
         */
        static parseStringToArray(str: string, splitStr?: string): number[];
        /**
         * 数组中删除
         * @param array
         * @param value
         */
        static deleteObject<T>(array: T[], value: T): void;
        /**
         * 多属性排序,arrProperty与arrSort对应
         * @param arrProperty 属性列表
         * @param arrSort 排序方式(默认正序) 0正序 1倒序
         * @return 排序后的数组
         */
        static sortOn(arr: any[], arrProperty: string[], arrSort?: number[]): Array<any>;
        /**
         * 对数组随机排行
         * @param value
         */
        static randomSort(value: any[]): void;
        /**
         * 获取数组随机值
         * @param arr
         */
        static random(arr: any[]): any;
    }
}
declare namespace devil {
    class AssetAdapter implements eui.IAssetAdapter {
        /**
         * @language zh_CN
         * 解析素材
         * @param source 待解析的新素材标识符
         * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
         * @param thisObject callBack的 this 引用
         */
        getAsset(source: string, compFunc: Function, thisObject: any): void;
    }
}
declare namespace devil {
    /**
     * 字节工具类
     * @author        devil
     * @version       V20190425
     * @create        2019-04-29
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ByteUtil {
        static toHexDump(desc: string, dump: egret.ByteArray, start: number, count: number): string;
    }
}
declare namespace devil {
    /**
     * 回调函数信息类
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    class CallBackInfo implements IPool {
        private _callBack;
        private _target;
        private _args;
        get target(): any;
        get callBack(): Function;
        /**
         * 执行回调函数
         */
        runCallBack(...args: any[]): void;
        equals(callBack: Function, target: any): boolean;
        pool(): void;
        reuse(): void;
        unuse(): void;
        dispose(): void;
        static create(callBack: Function, target: any, ...args: any[]): CallBackInfo;
        /**
         * 指定的回调函数数组中是否有指定的回调函数，如果存在，则返回对应的索引值，否则返回-1
         * @param callBacks 回调函数数组
         * @param callBack  回调函数
         * @param target    回调函数对象
         */
        static contains(callBacks: CallBackInfo[], callBack: Function, target: any): number;
    }
}
declare namespace devil {
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
    class ColorUtil {
        static getRandomColor(): number;
        static getColor(value: number): string;
        static getHtmlColor(value: number): string;
    }
}
declare namespace devil {
    /**
     * 日期工具类
     * @author        devil
     * @version       V20190425
     * @create        2019-04-29
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class DateUtil {
        static YYYY_MM_DD_HH_MM_SS: string;
        static MM_DD_HH_MM: string;
        static HH_MM: string;
        static MM_SS: string;
        static LEFT_DD_HH_MM: string;
        static LEFT_MM_SS: string;
        static LEFT_HH_MM_SS: string;
        static LEFT_M_SS: string;
        static LEFT_DAY_OR_HH_MM_SS: string;
        /**
         * 格式化日期为指定的格式的字符串
         * @param seconds
         * @param format
         * @param isLeft
         */
        static formatStr(seconds: number, format: string, isLeft?: boolean): string;
        static getDateBySecs(secs: number): Date;
        /**
         * 获取日期之间相距的天数
         * @param date1
         * @param date2
         */
        static disDay(date1: Date, date2: Date): number;
        /**
         *获取经过的总天数。距离 1970 年 1 月 1 日
         * @param date
         * @return
         *
         */
        static getTotalDays(date: Date): number;
        /**
         *返回当年当月有多少天
         * @param year
         * @param month
         * @return
         *
         */
        static getDates(year: number, month: number): number;
    }
}
declare namespace devil {
    /**
     * 字典工具类
     * @author        devil
     * @version       V20190425
     * @create        2019-04-29
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class Dictionary<K, V> {
        private _keys;
        private _values;
        private _map;
        constructor();
        get(key: K): V;
        add(key: K, value: V): void;
        remove(key: K): V;
        removeAll(): void;
        keys(): K[];
        values(): V[];
        containsKey(key: K): boolean;
    }
}
declare namespace devil {
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
    class DisplayLongClick implements IPool, IDispose {
        private _display;
        private _isAddEvt;
        private _longClickFun;
        private _longClickObj;
        private _clickFun;
        private _clickObj;
        private _isDown;
        private _longClickCnt;
        constructor();
        /** 设置长按对象 */
        set display(value: egret.DisplayObject);
        /**
         * 长按事件
         */
        __longClick(callBack: (target: any, isEndLongClick: boolean) => void, target: any, clickObj: any): void;
        /**
         * 长按事件
         */
        __click(callBack: Function, target: any, clickObj: any): void;
        protected start(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        /**
         * @private
         */
        protected ___handleEvent(e: egret.Event): void;
        /** */
        private ___checkLongClick;
        reuse(): void;
        pool(): void;
        unuse(): void;
        dispose(): void;
    }
}
declare namespace devil {
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
    class FilterUtil {
        /**
         * 设置成灰色
         * @param value
         */
        static setGrayFilter(value: egret.DisplayObject): void;
    }
}
declare namespace devil {
    /**
     * 绘图工具类
     * @author        devil
     * @version       V20190131
     * @create        2019-01-31
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class GraphicsUtil {
        static createRectSprite(x: number, y: number, width: number, height: number, color?: number, alpha?: number): egret.Sprite;
        static createRectShape(x: number, y: number, width: number, height: number, color?: number, alpha?: number): egret.Shape;
        static drawRect(graphics: egret.Graphics, x: number, y: number, width: number, height: number, color?: number, alpha?: number): void;
        static createCircleSprite(x: number, y: number, radius: number, color?: number, alpha?: number): egret.Sprite;
        static createCircleShape(x: number, y: number, radius: number, color?: number, alpha?: number): egret.Shape;
        static drawCircle(graphics: egret.Graphics, x: number, y: number, radius: number, color?: number, alpha?: number): void;
        static createRectBoderShape(x: number, y: number, width: number, height: number, color: number, alpha: number): egret.Shape;
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
        static drawSector(graphics: egret.Graphics, x: number, y: number, r: number, color: number, angle: number, startFrom: number): void;
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
        static drawDashed(graphics: egret.Graphics, x: number, y: number, dashedWidth: number, space: number, width: number, color?: number, alpha?: number): void;
    }
}
declare namespace devil {
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
    class HtmlUtil {
        /**
         * tf egret.TextField | eui.Label | TextField
         */
        static setHtml(tf: any, htmlText: string): void;
        static addBTag(str: string): string;
        static addUTag(str: string): string;
        static addFontTag(str: string, font: string): string;
        static addColorTag(str: string, color: string): string;
        static addColorSizeTag(str: string, color: string, size?: number): string;
        static addATag(str: string, event?: string): string;
        static addColorUATag(str: string, color: string, event?: string): string;
    }
}
declare namespace devil {
    class MathUtil {
        /**
         * 返回介于[min,max]的值，其中max一定大于min
         */
        static clamb(min: number, max: number, value: number): number;
        /**
         *  [min,max]
         * @param min
         * @param max
         * @param value
         */
        static isBetween(min: number, max: number, value: number): boolean;
        static distance(x: number, y: number, x1: number, y1: number): number;
        static angle(radian: number): number;
        static radian(angle: number): number;
        static atan2(y: number, x: number): number;
        static cos(angle: number): number;
        static sin(angle: number): number;
    }
}
declare namespace devil {
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
    class ObjectUtil {
        /**
         * 将指定的显示对象从(指定的)父级中删除，但不释放内存
         * @param child         指定的显示对象
         * @param container     指定的容器。一旦指定了此参数，则指定的显示对象一定要在此容器中才会删除。
         */
        static removeFromParent(child: egret.DisplayObject, parent?: egret.DisplayObjectContainer): void;
        /**
         * 批量将显示对象从自身的父级中删除，但不释放内存
         * @param childs
         */
        static removes(...childs: any[]): void;
        static dispose(child: IDispose): void;
    }
}
declare namespace devil {
    /**
     * Point工具类
     * @author        devil
     * @version       V20190425
     * @create        2019-04-29
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class PointUtil {
        static getAngle(x1: number, y1: number, x2: number, y2: number): number;
        static getRadian(x1: number, y1: number, x2: number, y2: number): number;
        /**
         * 以的指定的点为圆心，获取指定角度和长度的点
         * @param p
         * @param angle
         * @param disance
         */
        static getNextPoint(p: egret.Point, angle: number, disance: number): egret.Point;
        /**
         * 判断p是否在p1和p2所组成的矩形中,p1、p2不分先后
         * @param p1
         * @param p2
         * @param p
         */
        static inRect(p1: egret.Point, p2: egret.Point, p: egret.Point): boolean;
        /**
         * 判断p是否在p1和p2所组成的矩形中,p1、p2不分先后
         * @param p1
         * @param p2
         * @param x
         * @param y
         */
        static inRect2(p1: egret.Point, p2: egret.Point, x: number, y: number): boolean;
        /**
         * 字符串数组转成点坐标
         * @param src
         */
        static getPoint(src: string[]): egret.Point;
        /**
         * 以指定分隔符分隔的字符串转成点坐标
         * @param src
         */
        static getPoint2(src: string, splitStr?: string): egret.Point;
        /**
         * 以指定分隔符分隔的字符串转成点坐标数组
         * @param src
         */
        static getPoints(src: string, splitStr1?: string, splitStr2?: string): egret.Point[];
    }
}
declare namespace devil {
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
    class RadioSelector implements IDispose {
        private _selecteds;
        private _currentSelected;
        private _changFun;
        get selecteds(): IRadioSelected[];
        get currentSelected(): IRadioSelected;
        get selectedIndex(): number;
        set selectedIndex(value: number);
        set selectedView(value: IRadioSelected);
        constructor();
        add(selected: IRadioSelected): void;
        addAt(selected: IRadioSelected, index: number): void;
        remove(selected: IRadioSelected): void;
        cancel(): void;
        removeAt(index: number): void;
        clear(): void;
        pool(): void;
        dispose(): void;
        __change(callBack: (selected: IRadioSelected) => void, target: any): void;
    }
}
declare namespace devil {
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
    class StringUtil {
        startsWith(source: string, str: string, ignoreCase?: boolean): boolean;
        static parseBoolean(value: string): boolean;
        static formatString(str: number): string;
        /**
         * 字符串为空或null
         * @param str
         * @return
         */
        static isEmpty(str: string): boolean;
        static toString(obj: Object): string;
        static parseRectangle(str: string): egret.Rectangle;
        static substitute(str: string, ...rest: any[]): string;
        static format(str: string, args: any[]): string;
        static getStrlen(value: string): number;
        /**
        * 获取字符串长度：汉字=2  字母数字=1
        */
        static getStrlen2(str: string): number;
    }
}
declare namespace devil {
    class ThemeAdapter implements eui.IThemeAdapter {
        /**
         * 解析主题
         * @param url 待解析的主题url
         * @param compFunc 解析完成回调函数，示例：compFunc(e:egret.Event):void;
         * @param errorFunc 解析失败回调函数，示例：errorFunc():void;
         * @param thisObject 回调的this引用
         */
        getTheme(url: string, compFunc: Function, errorFunc: Function, thisObject: any): void;
    }
}
declare namespace devil {
    /**
     * 2D矢量
     * luzhihong
     * create 2017-11-09
     */
    class Vector2D {
        private _x;
        private _y;
        /**
         * Constructor.
         */
        constructor(x?: number, y?: number);
        /**
         * Generates a copy of this vector.
         * @return Vector2D A copy of this vector.
         */
        clone(): Vector2D;
        /**
        * Sets this vector's x and y values, and thus length, to zero.
        * @return Vector2D A reference to this vector.
        */
        zero(): Vector2D;
        /**
         * Whether or not this vector is equal to zero, i.e. its x, y, and length are zero.
         * @return boolean True if vector is zero, otherwise false.
         */
        isZero(): boolean;
        /**
         * Sets / gets the length or magnitude of this vector. Changing the length will change the x and y but not the angle of this vector.
         */
        set length(value: number);
        get length(): number;
        /**
         * Gets the length of this vector, squared.
         */
        get lengthSQ(): number;
        /**
         * Gets / sets the angle of this vector. Changing the angle changes the x and y but retains the same length.
         */
        set angle(value: number);
        get angle(): number;
        /**
         * Normalizes this vector. Equivalent to setting the length to one, but more efficient.
         * @return Vector2D A reference to this vector.
         */
        normalize(): Vector2D;
        /**
         * Whether or not this vector is normalized, i.e. its length is equal to one.
         * @return boolean True if length is one, otherwise false.
         */
        isNormalized(): boolean;
        /**
         * Reverses the direction of this vector.
         * @return Vector2D A reference to this vector.
         */
        reverse(): Vector2D;
        /**
         * Calculates the distance from this vector to another given vector.
         * @param v2 A Vector2D instance.
         * @return Number The distance from this vector to the vector passed as a parameter.
         */
        dist(v2: Vector2D): number;
        /**
         * Calculates the distance squared from this vector to another given vector.
         * @param v2 A Vector2D instance.
         * @return Number The distance squared from this vector to the vector passed as a parameter.
         */
        distSQ(v2: Vector2D): number;
        /**
         * Adds a vector to this vector, creating a new Vector2D instance to hold the result.
         * @param v2 A Vector2D instance.
         * @return Vector2D A new vector containing the results of the addition.
         */
        add(v2: Vector2D): Vector2D;
        /**
         * Subtacts a vector to this vector, creating a new Vector2D instance to hold the result.
         * @param v2 A Vector2D instance.
         * @return Vector2D A new vector containing the results of the subtraction.
         */
        subtract(v2: Vector2D): Vector2D;
        /**
         * Multiplies this vector by a value, creating a new Vector2D instance to hold the result.
         * @param v2 A Vector2D instance.
         * @return Vector2D A new vector containing the results of the multiplication.
         */
        multiply(value: number): Vector2D;
        /**
         * Divides this vector by a value, creating a new Vector2D instance to hold the result.
         * @param v2 A Vector2D instance.
         * @return Vector2D A new vector containing the results of the division.
         */
        divide(value: number): Vector2D;
        /**
         * Indicates whether this vector and another Vector2D instance are equal in value.
         * @param v2 A Vector2D instance.
         * @return boolean True if the other vector is equal to this one, false if not.
         */
        equals(v2: Vector2D): boolean;
        /**
         * Sets / gets the x value of this vector.
         */
        set x(value: number);
        get x(): number;
        /**
         * Sets / gets the y value of this vector.
         */
        set y(value: number);
        get y(): number;
        /**
         * Generates a string representation of this vector.
         * @return String A description of this vector.
         */
        toString(): String;
    }
}
declare namespace devil {
    /**
     * 延时机制的非视图基类
     * @author        devil
     * @version       V20190826
     * @create        2019-08-26
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class BaseRender implements IPool {
        protected _invalid: number;
        protected _isPool: boolean;
        constructor();
        protected start(): void;
        protected startCallLater(): void;
        /**
         * 强制重绘
         */
        repaint(): void;
        private validate;
        /**
         * Included the first property as a proper param to enable *some* type checking, and also because it is a required param.
         * @param property
         * @param properties
         * @return
         */
        protected isInvalid(property: number, ...properties: any[]): boolean;
        /**
         * 绘制方法,子类重写
         */
        protected draw(): void;
        /**
         * 在未另外指定的情况下，将属性标记为无效，并在下一帧上重绘组件。
         * @param property   要使其无效的属性
         */
        invalidate(property: number): void;
        unuse(): void;
        reuse(): void;
        /**
         * 回收
         */
        pool(): void;
        dispose(): void;
    }
}
declare namespace devil {
    /**
     * EUI带有皮肤的基类
     * @author        devil
     * @version       V20190826
     * @create        2019-08-26
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class EUIView extends eui.Component implements eui.UIComponent {
        protected _invalid: number;
        protected _loadComplete: boolean;
        protected _isPool: boolean;
        constructor();
        protected start(): void;
        private ___addedToStage;
        private startCallLater;
        /**
         * 强制重绘
         */
        repaint(): void;
        private validate;
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
        move(x: number, y: number): void;
        protected draw(): void;
        private drawInit;
        protected configUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        addViewChild(child: View, ...layers: egret.DisplayObjectContainer[]): void;
        addViewChildAt(child: View, index: number): void;
        dispose(): void;
        private ___removedFromStage;
        private ___complete;
    }
}
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
declare namespace devil {
    /**
     *author Anydo
     *create 2018-5-17
     *description 界面加载转圈图
     *update devil 2019-05-10
     */
    class ViewLoading extends Container {
        private static _instance;
        private _path;
        private _image;
        private _layer;
        constructor();
        protected initLayer(): void;
        protected start(): void;
        show(): void;
        hide(): void;
        private ___render;
        private ___resize;
        static getInstance(): ViewLoading;
    }
}
