namespace devil
{
	/**
     * 加载外部图片视图组件
	 * @author        devil
	 * @version       V20190222
	 * @create        2019-02-22
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class ImageRemote extends Image
    {
        public get url()
        {
            return this._source as string;
        }

        public set url(value:string | PathInfo)
        {
            if(!(value instanceof PathInfo))this.source = value;
            else if(this._path != value)
            {
                this.source = value != null ? value.key : null;
                this._path = value;
            }
        }

        public set source(value:egret.Texture|string)
        {
            if(this._source == value)return;
            if(this._path)
            {
                // this._bitmap.texture = null; // 加载过程还是不要清空了，闪一下效果不好看
                Manager.loader.remove(this._path,this.___complete,this);
                this._path = null;
            }
            else
            {
                this._bitmap.texture = null;
            }
            this._source = value;
            if(this._source != null && this._source != "")this.invalidate(InvalidationType.DATA);
        }

        public constructor()
        {
            super();
            this._type = ComponentType.IMAGE_REMOTE;
        }

        protected start():void
        {
            super.start();
            this._width = -1;
            this._height = -1;
        }

        protected drawData():void
        {
            if(this._path == null && this._source != null && this._source != "")
            {   
                this._path = PathInfo.getPath(this._source as string,LoaderType.IMAGE,false);
            }
            if(this._path != null)Manager.loader.load(this._path,this.___complete,this,ResourceGCType.COMMON,ResPriorityType.LOAD_LEVEL5);
        }

        protected ___complete(loader:BaseLoader):void
        {
            let texture = (loader as ImageLoader).texture;
            if(texture != null)
            {
                this._bitmap.texture = texture;
                this._width = this._width < 0 ? texture.textureWidth : this._width;
                this._height = this._height < 0 ? texture.textureHeight : this._height;
                this._bitmap.width = this._width;
                this._bitmap.height = this._height;
                this._invalid = this._invalid ^ InvalidationType.SIZE;
                if(this._completeFun != null)this._completeFun.runCallBack(loader,this);
            }
        }
    }
}