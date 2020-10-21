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
