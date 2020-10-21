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
