var devil;
(function (devil) {
    var AssetAdapter = /** @class */ (function () {
        function AssetAdapter() {
        }
        /**
         * @language zh_CN
         * 解析素材
         * @param source 待解析的新素材标识符
         * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
         * @param thisObject callBack的 this 引用
         */
        AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
            function onGetRes(loader) {
                compFunc.call(thisObject, loader.getTexture(source), source);
            }
            var path = devil.PathInfo.getPath(devil.Model.resConfig.getURL(source), devil.LoaderType.TEXTURE);
            devil.Manager.loader.load(path, onGetRes, this, devil.ResourceGCType.NEVER);
        };
        return AssetAdapter;
    }());
    devil.AssetAdapter = AssetAdapter;
})(devil || (devil = {}));
