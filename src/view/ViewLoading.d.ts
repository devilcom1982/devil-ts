declare namespace devil {
    /**
     *author Anydo
     *create 2018-5-17
     *description 界面加载转圈图
     *update devil 2019-05-10
     */
    class ViewLoading extends Container {
        private static _instance;
        private _path;
        private _image;
        private _layer;
        constructor();
        protected initLayer(): void;
        protected start(): void;
        show(): void;
        hide(): void;
        private ___render;
        private ___resize;
        static getInstance(): ViewLoading;
    }
}
