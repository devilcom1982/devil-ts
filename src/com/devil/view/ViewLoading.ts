namespace devil
{
    /**
     *author Anydo
     *create 2018-5-17
     *description 界面加载转圈图
     *update devil 2019-05-10
     */
    export class ViewLoading extends Container
    {
        private static _instance:ViewLoading;
        
        private _path:PathInfo;
        private _image:Image;
        private _layer:egret.DisplayObjectContainer;

        public constructor()
        {
            super();
        }

        protected initLayer():void
        {
            this._layer = this.createLayer();
        }

        protected start():void
        {
            super.start();
            this._image = View.create(Image);
            this._image.setSize(109,117);
            this._image.anchorX = this._image.width * 0.5;
            this._image.anchorY = this._image.height * 0.5;
            this._image.source = "common_viewLoading_png";
            this.addChild(this._image,this._layer);
            Manager.stage.add(this.___resize,this);
        }

        public show():void
        {
            this.___resize(Manager.stage.width,Manager.stage.height);
            Manager.layer.addUI(LayerSubIndex.UI_LOADING,this._layer);
            Manager.render.add(this.___render,this);
        }

        public hide():void
        {
            Manager.stage.remove(this.___resize,this);
            Manager.render.remove(this.___render,this);
            this.removeFromParent();
        }

        private ___render(internal:number):void
        {
            this._image.rotation += 400 * internal * 0.001;
        }

        private ___resize(width:number,height:number):void
        {
            this.x = ((width - this._image.width) *.5) + this._image.anchorX
            this.y = ((height - this._image.height) *.5) + this._image.anchorY;
        }
        
        public static getInstance():ViewLoading
        {
            if(this._instance == null)this._instance = new ViewLoading();
            return this._instance;
        }
    }
}
