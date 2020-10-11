namespace devil
{
    export class ThemeAdapter implements eui.IThemeAdapter
    {
    
        /**
         * 解析主题
         * @param url 待解析的主题url
         * @param compFunc 解析完成回调函数，示例：compFunc(e:egret.Event):void;
         * @param errorFunc 解析失败回调函数，示例：errorFunc():void;
         * @param thisObject 回调的this引用
         */
        public getTheme(url:string,compFunc:Function,errorFunc:Function,thisObject:any):void {
            function onGetRes(loader:TextLoader):void {
                Manager.loader.remove(loader.getPath(),onGetRes,this,__loadError,this);
                compFunc.call(thisObject, loader.text);
            }
            function __loadError(loader:TextLoader):void
            {
                if(loader.getPath().urls[0] == url) {
                    errorFunc.call(thisObject);
                }
            }
            Manager.loader.load(PathInfo.getPath(url,LoaderType.TEXT,false),onGetRes,this,ResourceGCType.COMMON,ResPriorityType.LOAD_LEVEL6,__loadError,this);
        }
    
    }
}