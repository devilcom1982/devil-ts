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
     *author Anydo
     *create 2018-5-17
     *description 界面加载转圈图
     *update devil 2019-05-10
     */
    var ViewLoading = /** @class */ (function (_super_1) {
        __extends(ViewLoading, _super_1);
        function ViewLoading() {
            return _super_1.call(this) || this;
        }
        ViewLoading.prototype.initLayer = function () {
            this._layer = this.createLayer();
        };
        ViewLoading.prototype.start = function () {
            _super_1.prototype.start.call(this);
            this._image = devil.View.create(devil.Image);
            this._image.setSize(109, 117);
            this._image.anchorX = this._image.width * 0.5;
            this._image.anchorY = this._image.height * 0.5;
            this._image.source = "common_viewLoading_png";
            this.addChild(this._image, this._layer);
            devil.Manager.stage.add(this.___resize, this);
        };
        ViewLoading.prototype.show = function () {
            this.___resize(devil.Manager.stage.width, devil.Manager.stage.height);
            devil.Manager.layer.addUI(devil.LayerSubIndex.UI_LOADING, this._layer);
            devil.Manager.render.add(this.___render, this);
        };
        ViewLoading.prototype.hide = function () {
            devil.Manager.stage.remove(this.___resize, this);
            devil.Manager.render.remove(this.___render, this);
            this.removeFromParent();
        };
        ViewLoading.prototype.___render = function (internal) {
            this._image.rotation += 400 * internal * 0.001;
        };
        ViewLoading.prototype.___resize = function (width, height) {
            this.x = ((width - this._image.width) * .5) + this._image.anchorX;
            this.y = ((height - this._image.height) * .5) + this._image.anchorY;
        };
        ViewLoading.getInstance = function () {
            if (this._instance == null)
                this._instance = new ViewLoading();
            return this._instance;
        };
        return ViewLoading;
    }(devil.Container));
    devil.ViewLoading = ViewLoading;
})(devil || (devil = {}));
