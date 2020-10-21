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
     * 文本加载器
     * @author devil
     * @version V20180811
     * @create 2018-08-11
     * @place guangzhou
     */
    var TextLoader = /** @class */ (function (_super_1) {
        __extends(TextLoader, _super_1);
        function TextLoader() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        /**
         * 使用Post加载方式
         * @param params
         */
        TextLoader.prototype.post = function (params) {
            this._isPost = true;
            this._params = params;
        };
        /**
         * 加载
         */
        TextLoader.prototype.load = function () {
            _super_1.prototype.load.call(this);
            this.$load(egret.HttpResponseType.TEXT, 0);
        };
        TextLoader.prototype.reload = function (index) {
            _super_1.prototype.reload.call(this, index);
            this._path.reload(0);
            this.$load(egret.HttpResponseType.TEXT, 0);
        };
        TextLoader.prototype.$request = function (httpReq, index) {
            if (!this._isPost)
                _super_1.prototype.$request.call(this, httpReq, index);
            else {
                httpReq.open(this._path.urls[index], egret.HttpMethod.POST);
                httpReq.send(this._params);
            }
        };
        TextLoader.prototype.parse = function (data) {
            _super_1.prototype.parse.call(this, data);
            this.text = data;
        };
        TextLoader.prototype.unuse = function () {
            this.text = null;
            this._isPost = false;
            this._params = null;
            _super_1.prototype.unuse.call(this);
        };
        return TextLoader;
    }(devil.BaseLoader));
    devil.TextLoader = TextLoader;
})(devil || (devil = {}));
