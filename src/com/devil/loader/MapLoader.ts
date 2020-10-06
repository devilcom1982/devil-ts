namespace devil
{
    /**
     * 地图加载器
     * @author devil
     * @version V20180811
     * @create 2018-08-11
     * @place guangzhou
     */
    export class MapLoader extends BaseLoader
    {
        public mapData:MapData;
        public texture:egret.Texture;

        protected parse(data:any):void
        {
            if(data instanceof egret.BitmapData)
            {
                this.texture = Manager.pool.createTexture();
                this.texture.bitmapData = data;
            }
            else
            {
                let bytes:ByteArrayExtend = Manager.pool.create(ByteArrayExtend);
                bytes.setArrayBuffer(data);
                // this.mapData = MapData.create(new egret.ByteArray(data));
                this.mapData = MapData.create(bytes);
                bytes.pool();
            }
            if(this.texture != null && this.mapData != null)
            {
                super.parse(data);
            }
        }

        /**
         * 加载
         */
        public load():void
        {
            super.load();
            this.$load(egret.HttpResponseType.ARRAY_BUFFER,0);
            this.$loadImage(this._path.urls[1]);
        }

        protected reload(index:number):void
        {
            super.reload(index);
            this._path.reload(index);
            if(index == 0)
            {
                this.$load(egret.HttpResponseType.ARRAY_BUFFER,0);
            }
            else 
            {
                this.$loadImage(this._path.urls[1]);
            }
        }

        public unuse():void
        {
            super.unuse();
            if(this.mapData != null)
            {
                this.mapData.pool();
                this.mapData = null;
            }
            if(this.texture != null)
            {
                // this.texture.dispose();
                Manager.pool.pushTexture(this.texture);
                this.texture = null;
            }
        }

    
        // public gc():boolean
        // {
        //     if(this._count <= 0)
        //     {
        //         if(egret.getTimer() - this._unUseTimer >= ResourceGCType.getGCTime(this._resourceGCType))
        //         {
        //             Manager.log.trace(devil.LogType.DEBUG,"资源释放",this._path.urls[0]);
        //             this.pool();
        //             return true;
        //         }
        //         return false;
        //     }
        //     else 
        //     {
        //        if(AnimationLoader.abc)Manager.log.trace(devil.LogType.DEBUG,"未资源释放",this._path.urls,this._count);
        //     }
        //     return false;
        // }
    }

    /**
     * 地图数据
     */
    export class MapData implements IPool
    {
        public source:Array<Array<number>>;

        public constructor()
        {
            this.source = [];
        }

        // public init(bytes:egret.ByteArray):void
        // {
        //     this.parse(bytes);
        // }

        private parse(data:egret.ByteArray)
        {
            var version:number = data.readShort();
            var row = data.readShort();
            var col = data.readShort();
            for (var i = 0; i < row; i++)
            {
                var values = [];
                this.source.push(values);
                for (var j = 0; j < col; j++)
                {
                    values.push(data.readByte());
                }
            }
        }

        public isEmpty(row:number, col:number):boolean
        {
            if (row < 0 || row >= this.source.length || col >= this.source[0].length || col < 0) return false;
            return this.source[row][col] == MapDataType.UN_WALK;
        }

        public reuse():void
        {
        }

        public unuse():void
        {
            this.source = [];
        }

        public dispose()
        {
            this.source = null;
        }
        
        public pool():void
        {
            Manager.pool.push(this);
        }

        public static create(bytes:egret.ByteArray):MapData
        {
            let result:MapData = Manager.pool.create(MapData);
            result.parse(bytes);
            return result;
        }

    }
    /**
     * 地图数据类型,数据类型为0,1,2,4,8的格式
     */
    export class MapDataType
    {
        /** 不可走 */		
        public static UN_WALK:number = 0;
        /** 可走 */		
        public static WALK:number = 1;
        /** 透明 */		
        public static ALPHA:number = 2;
        /** 安全 */		
        public static ABSOLUTR:number = 4;
        /** 水花 */		
        public static WATER:number = 8;
        /** 沙漠 */		
        public static DESERT:number = 16;
    }
}