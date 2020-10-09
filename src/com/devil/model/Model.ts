namespace devil
{
	/**
	 * 数据
	 * @author        devil
	 * @version       V20190131
	 * @create        2019-01-31
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class Model
    {
        /**
         * default.res.json配置文件的数据
         */
        public static resConfig:IResourceConfig;

        public static canvas:CanvasModel;
        public static cvo:CVOModel;
        public static wxGame:WXGameModel;

        //进入后台
        public static lifecyclePause:boolean;

        public static setup():void
        {
            this.canvas = new CanvasModel();
            this.cvo = new CVOModel();
            this.lifecyclePause = false;
            this.wxGame = new WXGameModel();
            this.resConfig = new ResourceConfig2();
        }
    }
}