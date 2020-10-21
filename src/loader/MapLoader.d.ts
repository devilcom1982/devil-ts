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
