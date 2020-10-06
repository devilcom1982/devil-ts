namespace devil
{
	/**
	 * @description   
	 * @author        devil
	 * @version       V20190413
	 * @create        2019-04-13
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class TextInput extends Container
    {
        private _editor:boolean;
        private _text:Text;
        private _back:Image;
        private _prompt:string;
        private _displayAsPassword:boolean;

        public set editor(value:boolean)
        {
            if(this._editor == value)return;
            this._editor = value;
            this._text.editor = this._editor;
        }
        public get editor()
        {
            return this._editor;
        }

        public get text()
        {
            if(this._text.text == this._prompt)return "";
            return this._text.text;
        }
        public set text(value:string)
        {
            this._text.text = value;
        }

        public get color()
        {
            return this._text.color;
        }
        public set color(value:number)
        {
            this._text.color = value;
        }

        public get bold()
        {
            return this._text.bold;
        }

        public set bold(value:boolean)
        {
            this._text.bold = value;
        }

        public get size()
        {
            return this._text.size;
        }
        public set size(value:number)
        {
            this._text.size = value;
        }

        public get align()
        {
            return this._text.align;
        }
        public set align(value:string)
        {
            this._text.align = value;
        }

        public set enabled(value:boolean)
        {
            if(this._enabled != value)
            {
                this._enabled = value;
                this.touchEnabled = this._enabled;
                this.touchChildren = this._enabled;
                this.invalidate(InvalidationType.ENABLED);
            }
        }

        public get prompt():string
        {
            return this._prompt;
        }
        public set prompt(value:string)
        {
            this._prompt = value;
            if(!StringUtil.isEmpty(this._prompt))
            {
                this._text.text = this._prompt;
                this._text.displayAsPassword = false;
                this._text.__focusIn(this.___focusIn,this);
                this._text.__focusOut(this.___focusOut,this);
            }
        }

        public get maxChars()
        {
            return this._text.maxChars;
        }

        public set maxChars(value:number)
        {
            this._text.maxChars = value;
        }

        public set displayAsPassword(value:boolean)
        {
            this._displayAsPassword = value;
            this._text.displayAsPassword = value;
        }

        public get displayAsPassword()
        {
            return this._text.displayAsPassword;
        }

        public set restrict(value:string)
        {
            this._text.restrict = value;
        }

        public get restrict()
        {
            return this._text.restrict;
        }

        public constructor()
        {
            super();
            this._type = ComponentType.TEXT_INPUT;
        }

        protected start():void
        {
            super.start();
            this.autoCreateLayer(2);
            this.touchEnabled = true;
            this.touchChildren = true;
            this._editor = true;
            this._width = ComponentDefault.TEXT_WIDTH;
            this._height = ComponentDefault.TEXT_HEIGHT;
            this._back = View.create(Image);
            this.addChild(this._back,this._layers[0]);
            this._text = View.create(Text);
            this._text.x = 5;
            this.addChild(this._text,this.layers[1]);
            this._text.editor = true;
            this._layers[1].touchChildren = true;
            this._prompt = "";
            this._displayAsPassword = false;
        }

        protected setDefaultStyle():void
        {
            this._styles[StyleName.UP_BACK_SKIN] = null;
            this._styles[StyleName.DISENABLED_BACK_SKIN] = null;
        }

        protected draw():void
        {
            super.draw();
            if(this.isInvalid(InvalidationType.STYLE) || this.isInvalid(InvalidationType.ENABLED))this.drawStyle();
            if(this.isInvalid(InvalidationType.SIZE))this.drawSize();
        }

        // private drawStyle():void
        // {
        //     let data:string;
        //     let rect:egret.Rectangle;
        //     if(!this._enabled)
        //     {
        //         data = this.getStyle(StyleName.DISENABLED_BACK_SKIN);
        //         rect = this.getStyle(StyleName.DISENABLED_ICON_RECT);
        //     }
        //     if(data == null)
        //     {
        //         data = this.getStyle(StyleName.UP_BACK_SKIN);
        //         rect = this.getStyle(StyleName.UP_BACK_RECT);
        //     }
        //     this._back.source = data;
        //     this._back.scale9Grid = rect;
        // }

        private drawStyle():void
        {
            let data:ResourceItem;
            if(!this._enabled)data = this.getImageData(StyleName.DISENABLED_BACK_SKIN);
            if(data == null)data = this.getImageData(StyleName.UP_BACK_SKIN);
            this._back.source = data.name;
            this._back.scale9Grid = data.scale9Grid;
        }

        private drawSize():void
        {
            this._back.setSize(this._width,this._height);
            this._text.setSize(this._width,this._height);
            this._back.repaint();
            this._text.repaint();
        }

        public setFocus():void
        {
            this._text.setFocus();
        }

		public unuse():void
		{
			this._text = null;
			this._back = null;
			super.unuse();
		}
		
		public dispose():void
		{
			this._text = null;
			this._back = null;
			super.dispose();
		}

        private ___focusIn(e:egret.TextEvent,target:Text):void
        {
            if(this._text.text == this._prompt)
            {
                this._text.text = "";
                this._text.displayAsPassword = this._displayAsPassword;
            }
        }

        private ___focusOut(e:egret.TextEvent,target:Text):void
        {
            if(StringUtil.isEmpty(this._text.text))
            {
                this._text.displayAsPassword = false;
                this._text.text = this._prompt;
            }
        }

    }
}