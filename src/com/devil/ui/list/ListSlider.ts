namespace devil
{
    /**
     * 滑动组件进度条
     */
    export class ListSlider extends Container implements IDispose {

        private _layer:egret.DisplayObjectContainer;
    
        private _trackImg:Image;
        private _thumbImg:Image;

        public container:IListContainer;
        public isVertical:boolean;

        public listHeight:number;
        public listWidth:number;

        private _posOffset:number;
        private _sizeOffset:number;
    
        public constructor() {
            super();
        }

        public setTrackAlpha(value:number):void
        {
            this._trackImg.alpha = value;
        }
    
        public setTrackSource(value:string)
        {
            this._trackImg.source = value;
        }
        public setThumbSource(value:string)
        {
            this._thumbImg.source = value;
        }

        public set posOffset(value:number)
        {
            this._posOffset = value;
            this.invalidate(InvalidationType.LAYOUT);
        }

        public set sizeOffset(value:number)
        {
            this._sizeOffset = value;
            this.invalidate(InvalidationType.LAYOUT);
        }
        
        protected initLayer():void
        {
            this._layer = this.createLayer();
            this._layer.touchEnabled = true;
        }
    
        protected start():void
        {
            super.start();
            this.addEvent();

            this._posOffset = 0;
            this._sizeOffset = 0;
    
            this._trackImg = Manager.component.createImage("", 0, 0, this._width, this._height);
            this.addChild(this._trackImg, this._layer);
    
            this._thumbImg = Manager.component.createImage("", 0, 0, this._width, this._height / 2);
            this.addChild(this._thumbImg, this._layer);
    
        }
    
        public addEvent():void
        {
            this._layer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.___handleEvent, this);
            this._layer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___handleEvent,this);
            this._layer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.___handleEvent, this);
            // this._layer.addEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            // this._layer.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            // this._layer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
        }
    
        public removeEvent():void
        {
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.___handleEvent, this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___handleEvent,this);
            this._layer.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.___handleEvent, this);
            // this._layer.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.___handleEvent, this);
            // this._layer.removeEventListener(egret.TouchEvent.TOUCH_END, this.___handleEvent, this);
            // this._layer.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.___handleEvent, this);
    
        }

        public updateContentSize()
        {
            this.invalidate(InvalidationType.DATA);
        }

        /** */
        public containerUpdPos(scrollValue:number):void
        {
            let posPer:number;
            let posVal:number;
            if (this.isVertical) 
            {
                posPer = scrollValue / (this.container.contentHeight - this.listHeight);
                posVal = Math.ceil((this._height - this._thumbImg.height) * posPer);
            }
            else 
            {
                posPer = scrollValue / (this.container.contentWidth - this.listWidth);
                posVal = Math.ceil((this._width - this._thumbImg.width) * posPer);
            }

            this.updateThumbPos(posVal, true, false);
        }
        
        /** 更新位置 */
        protected updateThumbPos(value:number, fromContainer:boolean=false, calOffset:boolean = true):void
        {
            if (this.isVertical)
            {
                let tempValue:number = calOffset ? value - (this._thumbImg.height >> 1) : value;
                let thumbY:number = Math.min(Math.max(0, tempValue), this._height - this._thumbImg.height);
                this._thumbImg.y = thumbY;
                if (this.container && !fromContainer) 
                {
                    let posPer:number = this._thumbImg.y / (this._height - this._thumbImg.height);
                    let scrollVal:number = Math.ceil(posPer * (this.container.contentHeight - this.listHeight));
                    this.container.setScrollV(scrollVal, false);
                }
            }
            else
            {
                let tempValue:number = calOffset ? value - (this._thumbImg.width >> 1) : value;
                let thumbX:number = Math.min(Math.max(0, tempValue), this._width - this._thumbImg.width);
                this._thumbImg.x = thumbX;
                if (this.container && !fromContainer) 
                {
                    let posPer:number = this._thumbImg.x / (this._width - this._thumbImg.width);
                    let scrollVal:number = Math.ceil(posPer * (this.container.contentWidth - this.listWidth));
                    this.container.setScrollV(scrollVal, false);
                }
            }
        }
    
        protected ___handleEvent(e:egret.TouchEvent):void
        {
            switch(e.type)
            {
                case egret.TouchEvent.TOUCH_TAP:
                case egret.TouchEvent.TOUCH_BEGIN:
                {
                    this.updateThumbPos(this.isVertical ? e.localY : e.localX);
                    break;
                }
                case egret.TouchEvent.TOUCH_MOVE:
                {
                    this.updateThumbPos(this.isVertical ? e.localY : e.localX);
                    break;
                }
                // case egret.TouchEvent.TOUCH_CANCEL:
                // case egret.TouchEvent.TOUCH_END:
                // case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                // {
                //     break;
                // }
            }
        }
    
        protected draw():void
        {
            super.draw();
            if(this.isInvalid(InvalidationType.SIZE)) this.drawSize();
            if(this.isInvalid(InvalidationType.DATA)) this.drawData();
            if(this.isInvalid(InvalidationType.LAYOUT)) this.drawLayout();
        }

        protected drawLayout():void
        {
            if (this.isVertical) 
            {
                this._thumbImg.x = this._posOffset;
                this._thumbImg.width = this._width - this._sizeOffset;
            }
            else 
            {
                this._thumbImg.y = this._posOffset;
                this._thumbImg.height = this._height - this._sizeOffset;
            }
        }

        protected drawData():void
        {
            if (!this.container) return;
            if (this.isVertical)
            {
                if (this.container.contentHeight > this.listHeight)
                {
                    this._thumbImg.height = Math.max(50, Math.floor(this._height * this.listHeight / this.container.contentHeight));
                    this.updateThumbPos(this._thumbImg.y, false, false);
                }
                else
                {
                    this._thumbImg.height = this._height;
                    this.updateThumbPos(this._thumbImg.y, false, false);
                }
            }
            else
            {
                if (this.container.contentWidth > this.listWidth)
                {
                    this._thumbImg.width = Math.max(50, Math.floor(this._width * this.listWidth / this.container.contentWidth));
                    this.updateThumbPos(this._thumbImg.x, false, false);
                }
                else
                {
                    this._thumbImg.width = this._width;
                    this.updateThumbPos(this._thumbImg.x, false, false);
                }
            }
        }
    
        protected drawSize():void
        {
            this._trackImg.width = this._width;
            this._trackImg.height = this._height;

            if (this.isVertical) this._thumbImg.width = this._width - this._sizeOffset;
            else this._thumbImg.height = this._height - this._sizeOffset;
        }

        public unuse():void
        {
            this.removeEvent();
            this._layer = null;
            this._trackImg = null;
            this._thumbImg = null;

            this.container = null;
            super.unuse();
        }
    
        public dispose()
        {
            this.removeEvent();
            this._layer = null;
            this._trackImg = null;
            this._thumbImg = null;

            this.container = null;
            super.dispose();
        }
    
    }
    
}