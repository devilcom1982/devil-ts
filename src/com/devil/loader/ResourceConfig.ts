namespace devil
{
    /**
     * 解析资源配置文件(白鹭默认资源编辑器工具的配置文件default.res.json数据)
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    export class ResourceConfig implements IResourceConfig
    {
        /**
         * 一级键名字典
         */
        private keyMap:any = {};
        /**
         * 解析一个配置文件
         * @method RES.ResourceConfig#parseConfig
         * @param data {any} 配置文件数据,Json格式
         * @param folder {string} 加载项的路径前缀。
         */
        public parseConfig(data:any,folder:string):void
        {
            if (!data)return;
            let resources:any[] = data["resources"];
            if (resources) 
            {
                let length:number = resources.length;
                for (let i:number = 0; i < length; i++) {
                    let item:any = resources[i];
                    let url:string = item.url;
                    if(url&&url.indexOf("://")==-1)
                        item.url = folder + url;
                    this.addItemToKeyMap(item);
                }
            }
        }

        /**
         * 添加一个加载项数据到列表
         */
        private addItemToKeyMap(item:any):void
        {
            if(!this.keyMap[item.name])
                this.keyMap[item.name] = item;
            if(item.hasOwnProperty("subkeys")){
                let subkeys:any[] = (<string><any> (item.subkeys)).split(",");
                item.subkeys = subkeys;
                let length:number = subkeys.length;
                for(let i:number = 0;i < length;i++){
                    let key:string = subkeys[i];
                    if(this.keyMap[key]!=null)
                        continue;
                    this.keyMap[key] = item;
                }
            }
        }

        /**
         * 添加一个二级键名到配置列表。
         * @method RES.ResourceConfig#addSubkey
         * @param subkey {string} 要添加的二级键名
         * @param name {string} 二级键名所属的资源name属性
         */
        public addSubkey(subkey:string,name:string):void
        {
            let item:any = this.keyMap[name];
            if(item&&!this.keyMap[subkey]){
                this.keyMap[subkey] = item;
            }
        }

        /**
         * 获取加载项的name属性
         * @method RES.ResourceConfig#getType
         * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
         * @returns {string}
         */
        public getName(key:string):string
        {
            let data:any = this.keyMap[key];
            return data?data.name:"";
        }

        public contains(url:string,key:string):boolean
        {
            let data:any = this.keyMap[key];
            return (data.url == url);
        }

        /**
         * 获取加载项类型。
		 * @method RES.ResourceConfig#getType
         * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
		 * @returns {string}
         */
        public getType(key:string):string
        {
            let data:any = this.keyMap[key];
            return data ? data.type : "";
        }

        public getRawResourceItem(key:string):any
        {
            return this.keyMap[key];
        }

        /**
         * 获取加载项信息对象
		 * @method RES.ResourceConfig#getResourceItem
         * @param key {string} 对应配置文件里的key属性或sbuKeys属性的一项。
		 * @returns {egret.ResourceItem}
         */
        public getResourceItem(key:string):ResourceItem
        {
            let data:any = this.keyMap[key];
            if (data)
                return this.parseResourceItem(data);
            return null;
        }

        public getURL(key:string):string
        {
            let item = this.getResourceItem(key);
            if(!item)return key;
            return this.getResourceItem(key).url;
        }

        /**
         * 转换Object数据为ResourceItem对象
         */
        private parseResourceItem(data:any):ResourceItem
        {
            // let resItem:ResourceItem = new ResourceItem(data.name, data.url, data.type);
            let resItem:ResourceItem = new ResourceItem(data.name, data.url);
            return resItem;
        }
    }
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
}