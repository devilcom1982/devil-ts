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
            enumerable: true,
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
