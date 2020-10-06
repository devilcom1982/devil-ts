namespace devil
{
    /**
     * 文本框
     * @author        devil
     * @version       V20190213
     * @create        2019-02-13
     * @update 	      author:更新者        time:更新日期        description:更新描述    
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */	
    export class Text extends Component
    {
        private _textField:egret.TextField;
        private _layer:egret.DisplayObjectContainer;
        private _clickFun:CallBackInfo;
        private _linkFun:CallBackInfo;
        private _focusInFun:CallBackInfo;
        private _focusOutFun:CallBackInfo;

        /**
         * 颜色 
         */		
        public get color()
        {
            return this._textField.textColor;
        }
        public set color(value:number)
        {
            this._textField.textColor = value;
        }

        /**
         * 是否加粗 
         */	
        public get bold()
        {
            return this._textField.bold;
        }
        public set bold(value:boolean)
        {
            this._textField.bold = value;
        }

        /**
         * 字体大小 
         */	
        public get size()
        {
            return this._textField.size;
        }
        public set size(value:number)
        {
            this._textField.size = value;
        }
        /**
         * 文本内容 
         */		
        public get text()
        {
            return this._textField.text;
        }
        public set text(value:string)
        {
            this._textField.text = value;
        }

        /**
         * 设置文本布局 
         * @param value   egret.HorizontalAlign常量
         */	
        public get align():string
        {
            return this._textField.textAlign;
        }
        public set align(value:string)
        {
            this._textField.textAlign = value;
        }
        /**
         * 是否可编辑 
         */	
        public set editor(value:boolean)
        {
            if(value)this._textField.type = egret.TextFieldType.INPUT;
            else this._textField.type = egret.TextFieldType.DYNAMIC;
            this._textField.touchEnabled = value;
            this.touchChildren = value;
        }

        public get textWidth()
        {
            return this._textField.textWidth;
        }
        public get textHeight()
        {
            return this._textField.textHeight;
        }

        public get wordWrap()
        {
            return this._textField.wordWrap;
        }
        public set wordWrap(value:boolean)
        {
            this._textField.wordWrap = value;
        }

        public get multiline()
        {
            return this._textField.multiline;
        }
        public set multiline(value:boolean)
        {
            this._textField.multiline = value;
        }

        public set verticalAlign(value:string)
        {
            this._textField.verticalAlign = value;
        }

        public set htmlText(value:string)
        {
            this._textField.textFlow = (new egret.HtmlTextParser).parser(value);
        }

        public set stroke(value:number)
        {
            this._textField.stroke = value;
        }

        public set strokeColor(value:number)
        {
            this._textField.strokeColor = value;
        }

        public set lineSpacing(value:number)
        {
            this._textField.lineSpacing = value;
        }

        public set border(value:boolean)
        {
            this._textField.border = value;
        }

        public set textType(value:string)
        {   
            this._textField.type = value;
        }

        public set background(value:boolean)
        {
            this._textField.background = value;
        }

        public set backgroundColor(value:number)
        {
            this._textField.backgroundColor = value;
        }

        public get maxChars()
        {
            return this._textField.maxChars;
        }
        public set maxChars(value:number)
        {
            this._textField.maxChars = value;
        }

        public set displayAsPassword(value:boolean)
        {
            this._textField.displayAsPassword = value;
        }

        public get displayAsPassword()
        {
            return this._textField.displayAsPassword;
        }

        public set restrict(value:string)
        {
            this._textField.restrict = value;
        }

        public get restrict()
        {
            return this._textField.restrict;
        }

        public constructor()
        {
            super();
            this._type = ComponentType.TEXT;
        }

        protected initLayer():void
        {
            this._layer = this.createLayer();
        }

        protected start():void
        {
            super.start();
            this._width = ComponentDefault.TEXT_WIDTH;
            this._height = ComponentDefault.TEXT_HEIGHT;
            this._textField = Manager.pool.createTextField();
            this._textField.verticalAlign = egret.VerticalAlign.MIDDLE;
            this._layer.addChild(this._textField);
        }

        private removeEvent():void
        {
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.___click,this);
            this._textField.removeEventListener(egret.TextEvent.LINK,this.___link,this);
            this._textField.removeEventListener(egret.FocusEvent.FOCUS_IN,this.___focusIn,this);
            this._textField.removeEventListener(egret.FocusEvent.FOCUS_OUT,this.___focusOut,this);
        }
        /**
         * @private 
         */	
        protected draw():void
        {
            super.draw();
            if(this.isInvalid(InvalidationType.SIZE))this.drawSize();;
        }

        private drawSize():void
        {
            this._textField.width = this._width;
            this._textField.height = this._height;
        }

        public appendText(text:string):void
        {
            this._textField.appendText(text);
        }

    
        public setFocus():void
        {
            this._textField.setFocus();
        }

        /**
         * @private 
         */	
        public unuse():void
        {
            this.removeEvent();
            Manager.pool.pushTextField(this._textField);
            this._textField = null;
            this._layer = null;
            if(this._clickFun)this._clickFun.pool();
            this._clickFun = null;
            if(this._linkFun)this._linkFun.pool();
            this._linkFun = null;
            if(this._focusInFun)this._focusInFun.pool();
            this._focusInFun = null;
            if(this._focusOutFun)this._focusOutFun.pool();
            this._focusOutFun = null;
            super.unuse();
        }

        /**
         * @private 
         */	
        public dispose():void
        {
            this.removeEvent();
            Manager.pool.pushTextField(this._textField);
            this._textField = null;
            this._layer = null;
            if(this._clickFun)this._clickFun.pool();
            this._clickFun = null;
            if(this._linkFun)this._linkFun.pool();
            this._linkFun = null;
            if(this._focusInFun)this._focusInFun.pool();
            this._focusInFun = null;
            if(this._focusOutFun)this._focusOutFun.pool();
            this._focusOutFun = null;
            super.dispose();
        }

        public __click(callBack:Function,target:any):void
        {
            this._layer.touchEnabled = true;
            if(!this._layer.hasEventListener(egret.TouchEvent.TOUCH_TAP))this._layer.addEventListener(egret.TouchEvent.TOUCH_TAP,this.___click,this);
            this._clickFun = CallBackInfo.create(callBack,target);
        }

        private ___click(e:egret.TouchEvent):void
        {
            if(this._clickFun != null)this._clickFun.runCallBack(e,this);
        }

        public __link(callBack:Function,target:any):void
        {
            this._textField.touchEnabled = true;
            if(!this._textField.hasEventListener(egret.TextEvent.LINK))
            {
                this._textField.addEventListener(egret.TextEvent.LINK,this.___link,this);
            }
            this._linkFun = CallBackInfo.create(callBack,target);
        }

        private ___link(e:egret.TouchEvent):void
        {
            if(this._linkFun != null)this._linkFun.runCallBack(e,this);
        }

        public __focusIn(callBack:Function,target:any):void
        {
            this._textField.touchEnabled = true;
            this._focusInFun = CallBackInfo.create(callBack,target);
            if(!this._textField.hasEventListener(egret.FocusEvent.FOCUS_IN))
            {
                this._textField.addEventListener(egret.FocusEvent.FOCUS_IN,this.___focusIn,this);
            }
        }

        private ___focusIn(e:egret.FocusEvent):void
        {
            if(this._focusInFun != null)this._focusInFun.runCallBack(e,this);
        }

        public __focusOut(callBack:Function,target:any):void
        {
            this._focusOutFun = CallBackInfo.create(callBack,target);
            if(!this._textField.hasEventListener(egret.FocusEvent.FOCUS_OUT))
            {
                this._textField.addEventListener(egret.FocusEvent.FOCUS_OUT,this.___focusOut,this);
            }
        }

        private ___focusOut(e:egret.FocusEvent):void
        {
            if(this._focusOutFun != null)this._focusOutFun.runCallBack(e,this);
        }

    }
}
