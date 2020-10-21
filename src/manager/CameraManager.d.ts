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
