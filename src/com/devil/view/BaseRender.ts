namespace devil
{
	/**
	 * 延时机制的非视图基类
	 * @author        devil
	 * @version       V20190826
	 * @create        2019-08-26
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
	export class BaseRender implements IPool
	{
		protected _invalid:number;
		protected _isPool:boolean;//是否使用对象池回收，默认为true，表示使用对象池回收

		public constructor()
		{
			this.start();
		}
		
		/*
			* 初始化变量
			*/
		protected start():void
		{
			this._isPool = true;
			this._invalid = InvalidationType.ALL;
		}
		
		protected startCallLater():void
		{
			Manager.render.add(this.repaint,this);
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

		private validate():void 
		{
			this._invalid = InvalidationType.EMPTY;
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

		/**
		 * 绘制方法,子类重写 
		 */	
		protected draw():void
		{
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

		public unuse():void
		{
			Manager.render.remove(this.repaint,this);
		}

		public reuse():void
		{
			this.start();
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
			Manager.render.remove(this.repaint,this);
		}
	}
}