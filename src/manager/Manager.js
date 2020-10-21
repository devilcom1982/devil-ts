var devil;
(function (devil) {
    /**
     * 基础管理器集，针对基本的管理器
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    var Manager = /** @class */ (function () {
        function Manager() {
        }
        /**
         * 使用管理器集前先要调用此方法启动
         * @root 为入口类，不是stage
         */
        Manager.setup = function (root) {
            this.plat = new devil.PlatManager();
            this.stage = new devil.StageManager(root.stage);
            this.pool = new devil.ObjectPoolManager();
            this.render = new devil.RenderManager();
            this.loader = new devil.LoaderManager();
            this.layer = new devil.LayerManager(root);
            this.log = new devil.LogManager();
            this.component = new devil.ComponentManager();
            this.lang = new devil.LangManager();
            this.uiRead = new devil.UIReadManager();
            this.camera = new devil.CameraManager();
            this.socket = new devil.SocketManager();
            this.view = new devil.ViewManager();
            this.sound = new devil.SoundManager();
            this.tip = new devil.TipManager();
            this.event = new devil.EventManager();
            this.keyboard = new devil.KeyboardManager();
            this.storage = new devil.StorageManager();
            this.wx = new devil.WXManager();
            this.ad = new devil.WXADManger();
            this.openContext = new devil.WXOpenDataContextManager();
        };
        return Manager;
    }());
    devil.Manager = Manager;
})(devil || (devil = {}));
