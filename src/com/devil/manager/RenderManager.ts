namespace devil
{
	/**
	 * 渲染管理器
	 * @author        devil
	 * @version       V20190122
	 * @create        2019-01-12
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class RenderManager
    {
		private _callBacks:RenderTimerInfo[];
		private _shape:egret.DisplayObject;
		private _interval:number;
		private _lastTime:number;
		private _addRenderCount:number;//记录在循环过程中填加新的回调函数，处理漏掉循环回调的问题

		/**
		 * 当前帧与上一帧的时间间隔，以毫秒为单位
		 */
		public getInterval():number
		{
			return this._interval;
		}

		public constructor()
		{
			this._callBacks = [];
			this._interval = 0;
			this._lastTime = 0;
			this._shape = new egret.DisplayObject();
			this._shape.addEventListener(egret.Event.ENTER_FRAME,this.___enterFrame,this);
		}

		/**
		 * 是否包含指定的函数及对象，并且alive为true
		 * @params render 回调函数
		 * @params target 回调对象
		 * @params return 大于-1则表示不包含，否则会返回当前的索引值
		 */
		public contains(render:Function, target:any):number
		{
			let length:number = this._callBacks.length;
			for(let i:number = 0 ; i < length; i ++)
			{
				if(this._callBacks[i].render.equals(render,target) && this._callBacks[i].alive) return i;
			}
			return -1;
		}

		/**
		* 添加计时器render:Function, target:any, deley:number = 0, repeat:number = 0, end:Function = null, forceReset:boolean = false,...args:any[]
		* @params render 单次回调函数
		* @params target 包含函数的对象
		* @params deley 执行时间间隔，单位毫秒，0或小于0表示每帧都执行,默认为0
		* @params repeat 执行次数，0或小于0表示无限次
		* @params end 最后一次执行的回调函数
		* @params forceReset 强制重置设置，比如之前已add该render，则重置该render的值
		*/
		public add(render:Function, target:any, deley:number = 0, repeat:number = 0, end:Function = null, forceReset:boolean = false,...args:any[])
		{
			let index:number = this.contains(render, target);
			if(index == -1)
			{
				this._callBacks.unshift(RenderTimerInfo.create(render,target,deley,repeat,end,args));
				this._addRenderCount ++;
			}
			else
			{
				if(forceReset)
				{
					this._callBacks[index].pool();
					this._callBacks[index] = RenderTimerInfo.create(render,target,deley,repeat,end,args);
				}
			}
		}

		/**
		* 移除计时器
		*/
		public remove(render:Function, target:any)
		{
			let index:number = this.contains(render, target);
			if(index >= 0)this._callBacks[index].alive = false;
		}

		private render(info:RenderTimerInfo,interval:number):void
		{
			if(info.args == null || info.args.length == 0)info.render.runCallBack(interval);
			else 
			{
				if(info.args.length == 1)info.render.runCallBack(interval,info.args[0]);
				else if(info.args.length == 2)info.render.runCallBack(interval,info.args[0],info.args[1]);
				else if(info.args.length == 3)info.render.runCallBack(interval,info.args[0],info.args[1],info.args[2]);
				else if(info.args.length == 4)info.render.runCallBack(interval,info.args[0],info.args[1],info.args[2],info.args[3]);
				else if(info.args.length == 5)info.render.runCallBack(interval,info.args[0],info.args[1],info.args[2],info.args[3],info.args[4]);
			}
		}

		public removeAll(target:any):void
		{
			let length:number = this._callBacks.length;
			for(let i:number = 0 ; i < length; i ++)
			{
				if(this._callBacks[i].render.target == target && this._callBacks[i].alive)this.remove(this._callBacks[i].render.callBack,this._callBacks[i].render.target);
			}
		}

		private ___enterFrame(e:egret.Event):void
		{
			let that = this;
			let nowTime = egret.getTimer();
			that._interval = nowTime - that._lastTime;
			that._lastTime = nowTime;
			let len = that._callBacks.length - 1;
			let updateFlag:boolean;
			let info:RenderTimerInfo;
			for(let i:number = len; i >= 0; i --)
			{
				updateFlag = false;
				info = that._callBacks[i];
				if(!info.alive)
				{
					info.pool();
					that._callBacks.splice(i,1);
					continue;
				}
	
				if(info.delay > 0)
				{
					info.interval += that._interval;
					if(info.interval >= info.delay)
					{
						updateFlag = true;
					}
				}
				else
				{
					updateFlag = true;
				}
	
				if(updateFlag)
				{
					this._addRenderCount = 0;
					updateFlag = false;
					if(info.delay > 0)
					{
						if(info.render != null)this.render(info,info.interval);
						info.interval = 0;
					}
					else
					{
						if(info.render != null)this.render(info,that._interval);
					}
					if(info.repeat > 0)
					{
						info.repeat--;
						if(info.repeat <= 0)
						{
							if(info.end != null) info.end.runCallBack();
							info.alive = false;
						}
					}
					i += this._addRenderCount;
				}
			}
		}
    }

    export class RenderTimerInfo implements IPool
    {
		public alive:boolean;//false失效true生效
		public interval:number;//中间变量值，用于记录用
		public delay:number;//延时值
		public repeat:number;//重复次数，如果小于等于0则为无限次循环
		public args:any[];//回调函数参数
		public render:CallBackInfo;
		public end:CallBackInfo;

		public constructor()
		{
			this.alive = true;
			this.interval = 0;
		}

		public reuse():void
		{
			this.alive = true;
			this.interval = 0;
		}

		public unuse():void
		{
			if(this.render != null)
			{
				this.render.pool();
				this.render = null;
			}
			if(this.end != null)
			{
				this.end.pool();
				this.end = null;
			}
			this.alive = false;
			this.delay = 0;
			this.repeat = 0;
			this.args.length = 0;
			this.args = null;
		}

		public dispose():void
		{
			if(this.render != null)
			{
				this.render.pool();
				this.render = null;
			}
			if(this.end != null)
			{
				this.end.pool();
				this.end = null;
			}
			this.args.length = 0;
			this.args = null;
		}

		public pool():void
		{
			Manager.pool.push(this);
		}

		public static create(render:Function,target:any,deley:number,repeat:number,end:Function,args:any[]):RenderTimerInfo
		{
			let result:RenderTimerInfo = Manager.pool.create(RenderTimerInfo);
			if(render != null)result.render = CallBackInfo.create(render,target);
			if(end != null)result.end = CallBackInfo.create(end,target);
			result.delay = deley;
			result.repeat = repeat;
			result.args = args;
			return result;
		}
    }
}