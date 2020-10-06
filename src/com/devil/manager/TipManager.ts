namespace devil
{
    /**
     * Tip管理器
     * @author devil
     * @version V20190425
     * @create 20190425
     * @place guangzhou
     */
    export class TipManager
    {
        private _currentTip:any;
        private _modal:Image;

        /**
         * 
         * @param cls 
         * @param modal   default false
         */
        public show<T extends ITip>(cls:{new():T},modal:boolean = true):T
        {
            if(this._currentTip)
            {
                if(this._currentTip instanceof cls)return this._currentTip;
                if(this._currentTip != null)this._currentTip.dispose(); 
            }
            this._currentTip = new cls();
            <ITip>this._currentTip.show();
            if(modal)
            {
                if(this._modal == null)
                {
                    this._modal = Manager.component.createImage(LibConst.MODE_TEXTURE_NAME,0,0,Manager.stage.width,Manager.stage.height);
                    this._modal.alpha = 0.8;
                    this._modal.layers[0].addEventListener(egret.TouchEvent.TOUCH_TAP,this.___touchTap,this);
                    this._modal.touchEnabled = true;
                }
                if(this._modal.layers[0].parent == null)Manager.layer.addUI(LayerSubIndex.UI_TIP_MODE,this._modal.layers[0]);
                Manager.stage.add(this.___resize,this);
                this.___resize(Manager.stage.width,Manager.stage.height);
            }
            return this._currentTip;
        }

        public hide<T extends ITip>(cls:{new():T} = null):void
        {
            if(!!cls && !(this._currentTip instanceof cls))return;
            if(this._currentTip != null)this._currentTip.dispose();
            this._currentTip = null;
            Manager.render.remove(this.___resize,this);
            if(this._modal && this._modal.layers[0].parent != null)this._modal.removeFromParent();
        }

        /** 是否打开了 */
        public isOpenning<T extends ITip>(cls:{new():T}):boolean
        {
            return this._currentTip instanceof cls;
        }

        public setModalAlpha(alpha:number=0.8):void
        {
            if(this._modal)this._modal.alpha = alpha;
        }

        private ___touchTap(e:egret.TouchEvent):void
        {
            this.hide();
        }

        private ___resize(width:number,height:number):void
        {
            this._modal.width = width;
            this._modal.height = height;
        }
    }
}