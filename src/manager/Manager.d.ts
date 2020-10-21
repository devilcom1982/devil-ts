declare namespace devil {
    /**
     * 基础管理器集，针对基本的管理器
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    class Manager {
        /**
         * 场景管理器
         */
        static stage: StageManager;
        /**
         * 对象池管理器
         */
        static pool: ObjectPoolManager;
        /**
         * 渲染管理器
         */
        static render: RenderManager;
        /**
         * 层管理器
         */
        static layer: LayerManager;
        /**
         * 加载管理器
         */
        static loader: LoaderManager;
        /**
         * 日志管理器
         */
        static log: LogManager;
        static component: ComponentManager;
        static lang: LangManager;
        /**
         * UI数据解析管理器
         */
        static uiRead: UIReadManager;
        /**
         * 摄像机管理器
         */
        static camera: CameraManager;
        /**
         * socket管理器
         */
        static socket: SocketManager;
        /**
         * 视图管理器
         */
        static view: ViewManager;
        /**
         * 声音管理器
         */
        static sound: SoundManager;
        /**
         * Tip管理器
         */
        static tip: TipManager;
        /**
         * 事件管理器
         */
        static event: EventManager;
        /**
         * 平台管理器
         */
        static plat: PlatManager;
        /**
         * 键盘管理器
         */
        static keyboard: KeyboardManager;
        static storage: StorageManager;
        static wx: WXManager;
        static ad: WXADManger;
        static openContext: WXOpenDataContextManager;
        /**
         * 使用管理器集前先要调用此方法启动
         * @root 为入口类，不是stage
         */
        static setup(root: egret.DisplayObjectContainer): void;
    }
}
