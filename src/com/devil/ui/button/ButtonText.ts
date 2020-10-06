namespace devil
{
	/**
	 * 文本按钮
	 * @author        devil
	 * @version       V20190418
	 * @create        V2019-04-18
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class ButtonText extends ButtonImage
    {
        
        protected _txtLayer:egret.DisplayObjectContainer;
        protected _label:Text;
        protected _labelOffsetX:number;
        protected _labelOffsetY:number;
        protected _labelX:number;
        protected _labelY:number;
		/**
		 * 文本实例
		 */	
        public get label():Text
        {
            return this._label;
        }
		/**
		 * 设置按钮的文本显示内容 
		 */		
        public set text(value:string)
        {
            this._label.text = value;
        }
        public get text()
        {
            return this._label.text;
        }

        public constructor()
        {
            super();
            this._type = ComponentType.BUTTON_TXT;
        }

        protected initLayer():void
        {
            super.initLayer();
            this._txtLayer = this.createLayer();
        }

        protected start():void
        {
            super.start();
            this._labelOffsetX = 0 ;
            this._labelOffsetY = 0;
            this._label = View.create(Text);
            this.addChild(this._label,this._txtLayer);
        }

        protected draw():void
        {
            super.draw();
            if(this.isInvalid(InvalidationType.LAYOUT,InvalidationType.SIZE))this.drawLayout();
        }

        protected drawSize():void
        {
            super.drawSize();
            this._label.setSize(this._width,this._label.textHeight + 5);
        }

        protected drawState():void
        {
            super.drawState();
            if(this._downOffset && this._buttonState == ButtonState.DOWN)
            {
                this._label.move(this._labelX + 1,this._labelY + 1);
            }
            else 
            {
                this._label.move(this._labelX,this._labelY);
            }
        }
		/**
		 * 设置文本的偏移量 
		 * @param x
		 * @param y
		 */	
        public setLabelOffset(x:number,y:number):void
        {
            if(this._labelOffsetX == x && this._labelOffsetY == y)return;
            this._labelOffsetX = x;
            this._labelOffsetY = y;
            this.invalidate(InvalidationType.LAYOUT);
        }

        protected drawLayout():void
        {
            this._labelX = ((this._width - this._label.width) >> 1) + this._labelOffsetX;
            this._labelY = ((this._height - this._label.height) >> 1) + this._labelOffsetY;
            this._label.move(this._labelX,this._labelY);
        }

        public unuse():void
        {
            this._label = null;
            super.unuse();
            this._txtLayer = null;
        }

        public dispose():void
        {
            this._label = null;
            super.dispose();
            this._txtLayer = null;
        }
    }
}