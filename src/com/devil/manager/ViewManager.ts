namespace devil
{
    /**
     * 视图管理器,只有注册了的视图才可以通过管理器打开
     * @author        devil
     * @version       V20190405
     * @create        2019-04-05
     * @update 	      devil        2019-05-13        新增加载时出现ViewLoading视图功能 
     * @update 	      devil        2019-05-27        新增三级视图概念
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    export class ViewManager
    {
        private _openningViews:any;//当前打开的视图
        private _modalViews:any;//模态视图
        private _singleViews:any;//单开视图，一般是系统面板
        private _multeViews:any;//多开视图,二级视图
        private _thirdViews:any;//三级视图
        private _openningModalViews:Dictionary<any, boolean>;
        private _modal:Image;
        private _textures:any;
        private _relativeViews:any;

        public constructor()
        {
            this._openningViews = {};
            this._modalViews = {};
            this._singleViews = {};
            this._multeViews = {};
            this._thirdViews = {};
            this._openningModalViews = new Dictionary<any, boolean>();
            this._textures = {};
            this._relativeViews = {};
            this._modal = Manager.component.createImage(LibConst.MODE_TEXTURE_NAME,0,0,Manager.stage.width,Manager.stage.height);
            this._modal.alpha = 0.8;
            this._modal.layers[0].addEventListener(egret.TouchEvent.TOUCH_TAP,this.___touchTap,this);
            this._modal.touchEnabled = true;
            Manager.stage.add(this.___resize,this);
        }

        /**
         * 注册单开面板
         */
        public registerSingleView(viewID:any,cls:any,textureName:string = null,modal:boolean = false):void
        {
            this._modalViews[viewID] = modal;
            this._singleViews[viewID] = cls;
            this._textures[viewID] = textureName;
        }

        /**
         * 注册多开视图
         * @textureName  是否先加载贴图再打开
         */
        public registerMulteView(viewID:any,cls:any,modal:boolean = false,textureName:string = null):void
        {
            this._modalViews[viewID] = modal;
            this._multeViews[viewID] = cls;
            this._textures[viewID] = textureName;
        }

        /**
         * 三级视图
         * @textureName  是否先加载贴图再打开
         */
        public registerThirdView(viewID:any,cls:any,modal:boolean = false,textureName:string = null):void
        {
            this._modalViews[viewID] = modal;
            this._thirdViews[viewID] = cls;
            this._textures[viewID] = textureName;
        }

        /**
         * 添加关联界面,主要是当主界面关闭时会关闭关联界面
         * @param viewID 
         */
        public registerRelativeView(mainViewID:any, subViewID1:any, subViewID2:any, ...subViewIDs:any[])
        {
            let relativeViews:any[] = this._relativeViews[mainViewID];
            if (!relativeViews)
            {
                relativeViews = [];
                this._relativeViews[mainViewID] = relativeViews;
            }
            relativeViews.push(subViewID1);
            relativeViews.push(subViewID2);
            if (subViewIDs)
            {
                for (let viewID of subViewIDs)
                {
                    relativeViews.push(viewID);
                }
            }
        }

        /**
         * 获取指定ID的视图
         */
        public getView<T>(viewID:any):T
        {
            return this._openningViews[viewID] as T;
        }

        /**
         * 是否正在打开指定的ID的视图
         */
        public isOpenning(viewID:any):boolean
        {
            return !!this._openningViews[viewID];
        }

        /**
         * 是否有单开视图打开
         */
        public isOpeningSingleView():boolean
        {
            let keys = Object.keys(this._openningViews);
            let length:number = keys.length;
            for(let i:number = 0 ; i < length; i ++)
            {
                if(!!this._singleViews[keys[i]])return true;
            }
            return false;
        }

        /**
         * 打开或关闭切换
         */
        public switch<T extends IView>(viewID:any,showLoading = false):T
        {
            if(this.isOpenning(viewID))
            {
                this.hide(viewID);
                return null;
            }
            else return this.show<T>(viewID,showLoading);
        }

        public show<T extends IView>(viewID:number,showLoading = false):T
        {
            let view:T;
            let that = this;
            function ___textureLoading(loader:TextureLoader) 
            {
                ViewLoading.getInstance().hide();
                Manager.loader.remove(loader.getPath(),___textureLoading,this);
                if(that._openningViews[viewID] == view)that.showView(viewID,view);
            }
            view = <T>this._openningViews[viewID];
            if(view != null)return view;
            if(showLoading && this._textures[viewID] != null)
            {
                let path:PathInfo = PathInfo.getPath(this._textures[viewID],LoaderType.TEXTURE);
                if(!Manager.loader.has(path))
                {
                    ViewLoading.getInstance().show();
                    view = this.createView(viewID) as T;
                    Manager.loader.load(path,___textureLoading,this,ResourceGCType.COMMON,ResPriorityType.LOAD_LEVEL5);
                    return view;
                }
                else 
                {
                    return <T>this.open(viewID);
                }
            }
            else 
            {
                return <T>this.open(viewID);
            }
        }

        /**
         * 关闭界面
         * @param viewID 
         * @param fromModal 当是模态窗口时，点击黑色背景时，则值为true，默认是自动关闭界面，传入此参数可以阻止此默认操作。
         */
        public hide(viewID:any,fromModal:boolean = false):void
        {
            let view:IView = this._openningViews[viewID];
            if(view != null)
            {
                if(view.hide(fromModal))
                {
                    this._openningViews[viewID] = null;
                    if(this._openningModalViews.containsKey(viewID))
                    {
                        this._openningModalViews.remove(viewID);
                        if(this._modal)
                        {
                            let hasModal:boolean = this._openningModalViews.keys().length > 0;
                            if(!hasModal)this._modal.removeFromParent();
                            else Manager.layer.addUI(LayerSubIndex.UI_ALERT_MODE,this._modal.layers[0]);//恢复到2层界面
                        }
                    }
                }
            }
        }

        /**
         * 检测关闭界面
         * @param hideViewID 要关闭的界面ID 
         * @param relativeViewID 当前关联显示的主界面ID 
         */
        public checkHide(hideViewID:any, relativeViewID:any, fromModal:boolean = false):void
        {
            let relativeViews:any[] = this._relativeViews[hideViewID];
            if (relativeViews)
            {
                for (let viewID of relativeViews)
                {
                    if (viewID == relativeViewID) continue;
                    if (this.isOpenning(viewID)) return;
                }
            }
            this.hide(hideViewID, fromModal);
        }

        public setModalAlpha(alpha:number=0.8):void
        {
            this._modal.alpha = alpha;
        }

        /**
         * 关闭所有已打开界面
         */
        public hideAll():void
        {
            let keys = Object.keys(this._openningViews);
            let length:number = keys.length;
            for(let i:number = 0 ; i < length; i ++)
            {
                this.hide(keys[i]);
            }
        }

        private createView(viewID:number):IView
        {
            let view:IView;
            let cls = this._singleViews[viewID];
            if(!!cls)
            {
                for(let key in this._openningViews)
                {
                    if(!!this._singleViews[key])this.hide(key);
                }
            }
            else cls = this._multeViews[viewID];
            if(!cls)cls = this._thirdViews[viewID];
            if(!!cls)
            {
                view = <IView>new cls();
                this._openningViews[viewID] = view;
            }
            return view;
        }

        private showView(viewID:number,view:IView):void
        {
            let modal:boolean = this._modalViews[viewID];
            if(modal)
            {
                if(this._multeViews[viewID] != null || this._singleViews[viewID] != null)Manager.layer.addUI(LayerSubIndex.UI_ALERT_MODE,this._modal.layers[0]);
                else if(this._thirdViews[viewID] != null)Manager.layer.addUI(LayerSubIndex.UI_ALERT_MODE2,this._modal.layers[0]);
                this._openningModalViews.add(viewID, true);
            }
            view.show();
        }

        private open(viewID:number):IView
        {
            let view = this.createView(viewID);
            this.showView(viewID,view);
            return view;
        }

        private ___touchTap(e:egret.TouchEvent):void
        {
            let viewIDs:any[] = this._openningModalViews.keys();
            let length = viewIDs.length;
            for(let i:number = length - 1 ; i >= 0 ; --i)
            {
                this.hide(viewIDs[i],true);
                break;
            }
        }

        private ___resize(width:number,height:number):void
        {
            this._modal.width = width;
            this._modal.height = height;
        }
    }
}