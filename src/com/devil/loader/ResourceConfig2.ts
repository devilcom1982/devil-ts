namespace devil
{
    /**
     * 解析资源配置文件(自定义配置资源文件编辑器)
     * @author        devil
     * @version       V20190131
     * @create        2019-03-08
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */	
    export class ResourceConfig2 implements IResourceConfig
    {
        public folder:string;
        /**
         * 一级键名字典
         */
        private keyMap:any = {};

        public getURL(key:string):string
        {
            let item:ResourceItem = this.getResourceItem(key);
            if(!item)return key;
            return item.url;
        }

        public parseConfig(data:any,folder:string):void
        {
            folder = folder == null ? this.folder : folder;
            let bytes:ByteArrayExtend = data;
            let version:string = bytes.readUTF();
            let textureCount:number = bytes.readByte();
            let textureName:string;
            let skinName:string;
            let skinCount:number;
            let item:ResourceItem;
            for(let i:number = 0 ; i < textureCount; i ++)
            {
                textureName = bytes.readUTF();
                skinCount = bytes.readShort();
                for(let j:number = 0 ; j < skinCount; j ++)
                {
                    item = new ResourceItem(bytes.readUTF(),folder + textureName + Extension.JSON_);
                    if(bytes.readBoolean())item.scale9Grid = new egret.Rectangle(bytes.readShort(),bytes.readShort(),bytes.readShort(),bytes.readShort());
                    this.keyMap[item.name] = item;
                }
            }
        }

        public getName(key:string):string
        {
            let data:any = this.keyMap[key];
            return data?data.name:"";
        }

        public contains(url:string,key:string):boolean
        {
            let data:ResourceItem = this.keyMap[key];
            return (data.url == url);
        }

        public getResourceItem(key:string):ResourceItem
        {
            return this.keyMap[key];
        }
    }

}