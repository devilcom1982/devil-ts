namespace devil
{
    /**
	 * 视图基类
	 * <p>
	 * 	  关于视图的宽高改变，需要子类手动重写drawSize方法
	 * </p>
	 * @author        devil
	 * @version       V20190913
	 * @create        2018-12-25
	 * @update        2019-03-14  devil  填加_isPool字段控制是否使用对象池回收机制，默认对象池回收
	 * @update        2019-09-13  devil  填加localToGlobal方法
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class View implements IPool
    {
		private _x:number = 0;
		private _y:number = 0;	
		private _anchorX:number;
		private _anchorY:number;
		private _parent:Container;
		
		protected _layers:egret.DisplayObjectContainer[];
        protected _invalid:number;
		protected _width:number;
        protected _height:number;
        protected _name:string;
        protected _enabled:boolean;
		protected _layerID:number;
		protected _isPool:boolean;//是否使用对象池回收，默认为true，表示使用对象池回收
        
        public set touchChildren(value:boolean)
        {
			this._layers[0].touchChildren = value;
        }
        public get touchChildren()
        {
			return this._layers[0].touchChildren;
        }

        public set touchEnabled(value:boolean)
        {
			this._layers[0].touchEnabled = value;
        }

        public get touchEnabled()
        {
			return this._layers[0].touchEnabled;
        }

        public set scaleX(value:number)
		{
			let len:number = this._layers.length;
			for(let i:number = 0 ; i < len; i ++)
			{
				this._layers[i].scaleX = value;
			}
		}
		public get scaleX()
		{
			return this._layers[0].scaleX;
		}

		public set scaleY(value:number)
		{
			let len:number = this._layers.length;
			for(let i:number = 0 ; i < len; i ++)
			{
				this._layers[i].scaleY = value;
			}
		}
		public get scaleY()
		{
			return this._layers[0].scaleY;
        }
        
        public set rotation(value:number)
		{
			let len:number = this._layers.length;
			for(let i:number = 0 ; i < len; i ++)
			{
				this._layers[i].rotation = value;
			}
		}
		public get rotation():number
		{
			return this._layers[0].rotation;
		}

		public set visible(value:boolean)
		{
			let len:number = this._layers.length;
			for(let i:number = 0 ; i < len; i ++)
			{
				this._layers[i].visible = value;
			}
		}
		public get visible()
		{
			return this._layers[0].visible;
        }
        
        public set alpha(value:number)
		{
			let len:number = this._layers.length;
			for(let i:number = 0 ; i < len; i ++)
			{
				this._layers[i].alpha = value;
			}
		}
		public get alpha():number
		{
			return this._layers[0].alpha;
		}

		public set x(value:number)
		{
			this.move(value,this._y);
		}
		public get x()
		{
			return this._x;
		}
		
		public set y(value:number)
		{
			this.move(this._x,value);
		}
		public get y()
		{
			return this._y;
        }
        
		public get layers()
		{
			return this._layers;
		}
        
        public set width(value:number)
		{
			this.setSize(value,this._height);
		}
        public get width():number
		{
			return this._width;
		}

		public set height(value:number)
		{
			this.setSize(this._width,value);
		}
		public get height():number
		{
			return this._height;
        }
        

        /**
		 * X方向锚点，默认值为0，宽度值
		 */
		public get anchorX():number
		{
			return this._anchorX;
		}
		public set anchorX(value:number)
		{
			this.setAnchor(value,this._anchorY);
		}

		/**
		 * Y方向锚点，默认值为0，高度值
		 */
		public get anchorY():number
		{
			return this._anchorY;
		}
		public set anchorY(value:number)
		{
			this.setAnchor(this._anchorX,value);
		}

        /**
		 * 设置父类
		 */
		public set parent(value:Container)
		{
			this._parent = value;
		}
		public get parent()
		{
			return this._parent;
        }
        
        /**
		 * 实例名 
		 */
		public set name(value:string)
		{
			this._name = value;
		}
		public get name()
		{
			return this._name;
		}
		
		/**
		 * 层ID，用于生成所在的贴图,一个id生成一个贴图
		 */		
		public set layerID(value:number)
		{
			this._layerID = value;
		}
		public get layerID()
		{
			return this._layerID;
		}
        
		/**
		 * 可交互状态 
		 */		
        public setEnabled(value:boolean):void
		{
			if(this._enabled != value)
			{
                this._enabled =  value;
                if(!this._enabled)
                {
					this.touchChildren = false;
					this.touchEnabled = false;
                }
			}
		}
		
		public getEnabled()
		{
			return this._enabled;
		}
		
		public set filters(value:Array<egret.Filter | egret.CustomFilter>)
		{
			let len:number = this._layers.length;
			for(let i:number = 0 ; i < len; i ++)
			{
				this._layers[i].filters = value;
			}
		}

		public get measuredHeight():number
		{
			let result:number = 0;
			for(let i:number = 0 ; i < this._layers.length ; i ++)
			{
				result = Math.max(result,this._layers[i].measuredHeight);
			}
			return result;
		}

		public get measuredWidth():number
		{
			let result:number = 0;
			for(let i:number = 0 ; i < this._layers.length ; i ++)
			{
				result = Math.max(result,this._layers[i].measuredWidth);
			}
			return result;
		}

		public get right()
		{
			return this._x + this._width;
		}

		public get bottom()
		{
			return this._y + this._height;
		}

		public set mask(value:egret.Rectangle|egret.DisplayObject)
		{
			for(let i:number = 0 ; i < this._layers.length ; i ++)
			{
				this._layers[i].mask = value;
			}
		}

		public constructor()
		{
			this._layers = [];
			this.initLayer();
            this.start();
			this.$addEvent();
		}
		
		/**
		 * 子类一定要重写
		 */
		protected initLayer():void
		{

		}

		protected createLayer():egret.DisplayObjectContainer
		{
			let result:egret.DisplayObjectContainer = Manager.pool.createDisplayObjectContainer();
			result.x = !!this._x ? this._x : 0;
			result.y = !!this._y ? this._y : 0;
			this._layers.push(result);
			return result;
		}

		/**
		 * 初始化变量
		 */
		protected start():void
		{
			this._anchorX = 0;
			this._anchorY = 0;
			this._x = 0;
			this._y = 0;
			this._enabled = true;
			this._name = "";
			this._isPool = true;
			this._invalid = InvalidationType.ALL;
        }
        
		private $addEvent():void
		{
			if(this._layers.length <= 0)return;
			this._layers[0].addEventListener(egret.Event.ADDED_TO_STAGE,this.__addToStage,this,);
			this._layers[0].addEventListener(egret.Event.REMOVED_FROM_STAGE,this.__removedFromStage,this);
			if(this._layers[0].stage)this.__addToStage(null);
		}
		
		private $removeEvent():void
		{
			this._layers[0].removeEventListener(egret.Event.ADDED_TO_STAGE,this.__addToStage,this);
			this._layers[0].removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.__removedFromStage,this);
        }
        
        /**
		 * 移动位置 
		 */		
		public move(x:number,y:number):void
		{
			if(this._x == x && this._y == y)return;
			this._x = x;
			this._y = y;
			this.updatePosition();
		}

		/**
		 * 设置锚点，介于0到1间
		 * @param anchorX
		 * @param anchorY
		 */		
		public setAnchor(anchorX:number,anchorY:number):void
		{
			anchorX = MathUtil.clamb(0,1,anchorX);
			anchorY = MathUtil.clamb(0,1,anchorY);
			if(this._anchorX == anchorX && this._anchorY == anchorY)return;
			this._anchorX = anchorX;
			this._anchorY = anchorY;
			this.updatePosition();
		}
		
		/**
		 * 设置长宽，下一帧重会时更新长宽
		 */		
		public setSize(width:number,height:number):void
		{
			if(this._width == width && this._height == height)return;
			this._width = width;
			this._height = height;
			this.updatePosition();
			this.invalidate(InvalidationType.SIZE);
        }
        
		/**
		 * 在未另外指定的情况下，将属性标记为无效，并在下一帧上重绘组件。
		 * @param property   要使其无效的属性
		 */
		public invalidate(property:number):void 
		{
			this._invalid = this._invalid | property;
			this.startCallLater();
        }
        
		/**
		 * Included the first property as a proper param to enable *some* type checking, and also because it is a required param. 
		 * @param property
		 * @param properties
		 * @return 
		 */		
		protected isInvalid(property:number,...properties:any[]):boolean 
		{
			if ((this._invalid & property) == property) 
			{
				return true; 
			}
			while (properties.length > 0) 
			{
				property = properties.pop();
				if ((this._invalid & property) == property)  
				{
					return true; 
				}
			}
			return false
        }
        
		private validate():void 
		{
			this._invalid = InvalidationType.EMPTY;
        }
        
        /**
         * 强制重绘
         */
		public repaint():void
		{
			this.draw();
			this.validate();
			Manager.render.remove(this.repaint,this);
        }

		/**
		 * 绘制方法,子类重写 
		 */	
		protected draw():void
		{
		}
		
		/**
		 * 更改位置 
		 */		
		private updatePosition():void
		{
			let len:number = this._layers.length;
			let x:number = this._x - this._width * this._anchorX;
			let y:number = this._y - this._height * this._anchorY;
			for(let i:number = 0 ; i < len; i ++)
			{
				this._layers[i].x = x;
				this._layers[i].y = y;
			}
		}
        
        private startCallLater():void
		{
			if(this._layers[0] && this._layers[0].stage)Manager.render.add(this.repaint,this);
		}
		
		public removeFromParent():void
		{
			let len:number = this._layers.length;
			for(let i:number = 0 ; i < len; i ++)
			{
				ObjectUtil.removeFromParent(this._layers[i]);
			}
			this.parent = null;
		}

		public localToGlobal(localX:number,localY:number):egret.Point
		{
			return this._layers[0].localToGlobal(localX,localY);
		}
        
		public unuse():void
		{
			this._x = 0;
			this._y = 0;
			this.$removeEvent();
			Manager.render.remove(this.repaint,this);
			if(this._parent != null)
			{
				this._parent.removeChild(this,false);
				this._parent = null;
			}
			let len:number = this._layers.length;
			for(let i:number = 0 ; i < len; i ++)
			{
				Manager.pool.pushDisplayObjectContainer(this._layers[i]);
			}
			this._layers.length = 0;
		}

		public reuse():void
		{
			this.initLayer();
			this.start();
			this.$addEvent();
        }
        
		/**
		 * 回收 
		 */		
		public pool():void
		{
			if(this._isPool)Manager.pool.push(this);
			else this.dispose();
        }
        
		public dispose():void
		{
			this.$removeEvent();
			Manager.render.remove(this.repaint,this);
			if(this._parent != null)
			{
				this._parent.removeChild(this,false);
				this._parent = null;
			}
			let len:number = this._layers.length;
			for(let i:number = 0 ; i < len; i ++)
			{
				Manager.pool.pushDisplayObjectContainer(this._layers[i]);
			}
			this._layers.length = 0;
			this._layers = null;
		}
		
		protected addToStage():void
		{

		}

		protected removeFromStage():void
		{

		}

		/**
		 * 自动生成层
		 * @param count	数量 
		 */
		public autoCreateLayer(count:number):void
		{
			for(let i:number = 0 ; i < count; i ++)
			{
				this.createLayer();
			}
			this.$addEvent();
		}
        
		private __addToStage(e:egret.Event):void
		{
			this.startCallLater();
			this.addToStage();
		}
		
		private __removedFromStage(e:egret.Event):void
		{
			Manager.render.remove(this.repaint,this);
			this.removeFromStage();
		}
		
		/**
		 * 对象池创建,并且只能使用此方法创建对象比较好
		 * @param cls    View或继承View的子类
		 * @param layer	  层
		 */	
		public static create(cls:{new():any}):any
		{
			return Manager.pool.create(cls);
		}	
    }
}