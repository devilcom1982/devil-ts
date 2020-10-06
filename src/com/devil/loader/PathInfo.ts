namespace devil
{
    /**
     * 路径信息类，相关的参数key是相对路径，并且不带版本号
     * @author devil
     * @version V20180807
     * @create V20180717
     * @place guangzhou
     * @description 整理
     */
    export class PathInfo
    {
        private static _dic = {};
        private _version:string;

        /**
         * 相对路径，此值作为集合的关键值
         */
        public key:string;

        /**
         * 带有版本号的URL地址(绝对路径)
         * 特别说明
         *      加载贴图文件,     参数格式[json_url,texture_url]
         *      加载地图路径配置, 参数格式[path_url,smallMap_url]
         *      加载龙骨动画配置, 参数格式[name_ske.dbbin name_tex.json name_tex.png]
         */
        public urls:string[] = [];
        /**
         * 文件大小 
         */
        public size:number;
        /**
         * 内存大小 
         */
        public memory:number;
        /**
         * 加载类型,对应LoaderType常量
         */
        public loaderType:number;

        /**
        * @param key			相对路径地址
        * @param version        版本号
        * @param size           文件大小
        * @param memory         文件内存
        * @param absolute       绝对路径
        */		
       public constructor(key:string,version:string,size:number,memory:number,absolute:boolean = true)
       {
           this.key = key;
           this.urls.push((absolute ? Manager.loader.rootToURL(key) : key) + ((Manager.loader.needVersion == true) ? "?v=" + Version.clientVersion + "_" + version : ""));
           this.size = size;
           this.memory = memory;
           this._version = version;
           PathInfo._dic[key] = this;
       }

        /**
         * 设置加载类型
         * @param loaderType
         */
        private setURL(loaderType:number):void
        {
            let url:string;
            this.loaderType = loaderType;
            switch(loaderType)
            {
                case LoaderType.ANI:
                case LoaderType.TEXTURE:
                    url = Manager.loader.rootToURL(this.key.replace(Extension.JSON_,Extension.PNG_));//.json变为.png
                    if(Manager.loader.needVersion)url = url + "?v=" + Version.clientVersion + "_" + this._version;
                    this.urls[1] = url;
                    break;
                case LoaderType.MAP_DATA:
                    url = Manager.loader.rootToURL(this.key.replace("path.txt","smallMap.jpg"));//path.txt变为smallMap.jpg
                    if(Manager.loader.needVersion)url = url + "?v=" + Version.clientVersion + "_" + this._version;
                    this.urls[1] = url;
                    break;
                case LoaderType.DRAGON:
                //Dragon_ske.dbbin Dragon_tex.json Dragon_tex.png
                    url = Manager.loader.rootToURL(this.key.replace("_ske.dbbin","_tex.json"));
                    if(Manager.loader.needVersion)url = url + "?v=" + Version.clientVersion + "_" + this._version;
                    this.urls[1] = url;
                    url = Manager.loader.rootToURL(this.key.replace("_ske.dbbin","_tex.png"));
                    if(Manager.loader.needVersion)url = url + "?v=" + Version.clientVersion + "_" + this._version;
                    this.urls[2] = url;
                    break;
                case LoaderType.MOVIE_CLIP:
                    //atk_100101_mc.json,atk_100101_tex.png
                    url = Manager.loader.rootToURL(this.key.replace("_mc.json","_tex.png"));
                    if(Manager.loader.needVersion)url = url + "?v=" + Version.clientVersion + "_" + this._version;
                    this.urls[1] = url;
                    break;
            }
        }

        /**
         * 如果加载失败，则尝试使用随机数做版本加载
         * @param index urls索引值
         */
        public reload(index:number):void
        {
            if(Manager.loader.needVersion)
            {
                let url:string = this.urls[index]; 
                let temp:string[] = url.split("?v=");
                url = temp[0] + "?v=" + Math.random();
            }
        }

        /**
        * @param key        相对路径并且不带版本号的地址 
        * @param loaderType 加载类型,对应LoaderType常量
        * @param absolute   绝对路径,默认为true,表示使用绝对路径
        */	
       public static getPath(key:string,loaderType:number,absolute:boolean = true,version:string = "0"):PathInfo
       {
           let path:PathInfo = this._dic[key];
           if(path == null) path = new PathInfo(key,version,0,0,absolute);
           path.setURL(loaderType);
           return path;
       }
    }
}