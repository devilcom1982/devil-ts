namespace devil
{
    /**
     * 基础管理器集，针对基本的管理器
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    export class Manager
    {
        /**
         * 场景管理器
         */
        public static stage:StageManager;

        /**
         * 对象池管理器
         */
        public static pool:ObjectPoolManager;

        /**
         * 渲染管理器
         */
        public static render:RenderManager;

        /**
         * 层管理器
         */
        public static layer:LayerManager;

        /**
         * 加载管理器
         */
        public static loader:LoaderManager;

        /**
         * 日志管理器
         */
        public static log:LogManager;

        public static component:ComponentManager;

        public static lang:LangManager;
        /**
         * UI数据解析管理器
         */
        public static uiRead:UIReadManager;

        /**
         * 摄像机管理器
         */
        public static camera:CameraManager;

        /**
         * socket管理器
         */
        public static socket:SocketManager;
        /**
         * 视图管理器
         */
        public static view:ViewManager;
        /**
         * 声音管理器
         */
        public static sound:SoundManager;
        /**
         * Tip管理器
         */
        public static tip:TipManager;
        /**
         * 事件管理器
         */
        public static event:EventManager;
        /**
         * 平台管理器
         */
        public static plat:PlatManager;

        /**
         * 键盘管理器
         */
        public static keyboard:KeyboardManager;

        public static storage:StorageManager;

        public static wx:WXManager;

        public static ad:WXADManger;

        /**
         * 使用管理器集前先要调用此方法启动
         * @root 为入口类，不是stage
         */
        public static setup(root:egret.DisplayObjectContainer):void
        {
            this.stage = new StageManager(root.stage);
            this.pool = new ObjectPoolManager();
            this.render = new RenderManager();
            this.loader = new LoaderManager();
            this.layer = new LayerManager(root);
            this.log = new LogManager();
            this.component = new ComponentManager();
            this.lang = new LangManager();
            this.uiRead = new UIReadManager();
            this.camera = new CameraManager();
            this.socket = new SocketManager();
            this.view = new ViewManager();
            this.sound = new SoundManager();
            this.tip = new TipManager();
            this.event = new EventManager();
            this.plat = new PlatManager();
            this.keyboard = new KeyboardManager();
            this.storage = new StorageManager();
            this.wx = new WXManager();
            this.ad = new WXADManger();
        }
    }
}