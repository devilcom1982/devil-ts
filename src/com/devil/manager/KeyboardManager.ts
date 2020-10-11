namespace devil
{
	/**
	 * 键盘管理器
	 * @author        devil
	 * @version       V20191104
	 * @create        2019-11-04
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
	export class KeyboardManager
	{

		private _functions:any;
		private _keyDowns:number[];
		private _pushKeys:number[];//当前要追加到keyDowns数组中的key
		private _firstDelay:number = 500;

		/**
		 * 当第一次按下键盘时，会有些延时，默认为500MS
		 */
		public set firstDelay(value:number)
		{
			this._firstDelay = value;
		}

		public constructor()
		{
			this._keyDowns = [];
			this._pushKeys = [];
			this._functions = {};
			let that = this;
			if(!egret.Capabilities.isMobile)
			{
				document.onkeydown = ___keyDown;
				document.onkeyup = ___keyUp;
			}

			function ___keyDown(e):void
			{
				// if((e.target as egret.TextField) && (e.target as egret.TextField).type == egret.TextFieldType.INPUT)return;//输入文本的快捷键屏蔽
				if((e.target as egret.TextField) && (e.target as egret.TextField).type == "text")return;//输入文本的快捷键屏蔽
				if(that._pushKeys.indexOf(e.keyCode) == -1)
				{
					that._pushKeys.push(e.keyCode);
					Manager.render.add(that.___pushRender,that,that._firstDelay,1);
					that.sort(that._pushKeys);
					that.callBack(that._pushKeys.join("|"),KeyState.KEY_DOWN);
				}
			}

			function ___keyUp(e):void
			{
				let index:number = that._keyDowns.indexOf(e.keyCode);
				if(index != -1)that._keyDowns.splice(index,1);
				index = that._pushKeys.indexOf(e.keyCode);
				if(index != -1)
				{
					that._pushKeys.splice(index,1);
					that.callBack(e.keyCode + "",KeyState.KEY_UP);
				}
				if(that._pushKeys.length == 0)
				{
					Manager.render.remove(that.___pushRender,that);
				}
				if(that._keyDowns.length == 0)
				{
					Manager.render.remove(that.___render,that);
				}
			}
		}

			/**
		 * 判断指定的键是否被按下 
		 * @param keyCode
		 * @return 
		 */		
		public hasKey(keyCode:number):boolean
		{
			return this._pushKeys.indexOf(keyCode) != -1;
		}

		// 	/**
		//  * 判断指定的键集中的任意一个键是否被按下 
		//  * @param keyCode
		//  * @return 
		//  */	
		// public hasKeys(...args):boolean
		// {
		// 	for(let i:number = 0 ; i < args.length; i ++)
		// 	{
		// 		if(this.hasKey(args[i]))return true;
		// 	}
		// 	return false;
		// }

		// /**
		//  * 有多少键被按下
		//  * @param keyCode
		//  * @return 
		//  */	
		// public hasKeyCount():number
		// {
		// 	return this._pushKeys.length;
		// }
		/**
		 * 填加侦听函数
		 * @param key 
		 * @param callBack 参数keyCode如果是组合键，类似51|52；
		 *                state是KeyState常量，标记是抬起还是按下；
		 * @param target 
		 */
		public add(key:number,callBack:(keyCode:string,state:KeyState)=>void,target:any):void
		{
			this.adds([key],callBack,target);
		}

		public remove(key:number,callBack:Function,target:any):void
		{
			this.removes([key],callBack,target);
		}

		public adds(keys:number[],callBack:(keyCode:string,state:KeyState)=>void,target:any):void
		{
			this.sort(keys);
			let key:string = keys.join("|");
			let functions:CallBackInfo[] = this._functions[key];
			if(!functions)
			{
				functions = [];
				this._functions[key] = functions;
			}
			if(CallBackInfo.contains(functions,callBack,target) == -1)functions.push(CallBackInfo.create(callBack,target));
		}

		public removes(keys:number[],callBack:Function,target:any):void
		{
			this.sort(keys);
			let key:string = keys.join("|");
			let functions:CallBackInfo[] = this._functions[key];
			if(!!functions)
			{
				let index:number = CallBackInfo.contains(functions,callBack,target);
				if(index != -1)functions.splice(index,1);
			}
		}

		private callBack(keyCode:string,state:KeyState):void
		{
			let functions:CallBackInfo[] = this._functions[keyCode];
			if(!!functions)
			{
				let len:number = functions.length;
				for(let i:number = 0 ; i < len; i ++)
				{
					functions[i].runCallBack(keyCode,state);
				}
			}
		}

		private sort(keys:number[]):void
		{
			keys.sort(function(a:number,b:number):number
			{
				if(a > b)return 1;
				else if(a < b)return -1;
				return 0;
			});
		}

		private ___render(interval:number):void
		{
			if(this._keyDowns.length > 0)
			{
				this.callBack(this._keyDowns.join("|"),KeyState.KEY_DOWN);
			}
		}

		private ___pushRender(interval:number):void
		{
			let keyCode:number;
			for(let i:number = 0 ; i < this._pushKeys.length; i++)
			{
				keyCode = this._pushKeys[i];
				if(this._keyDowns.indexOf(keyCode) == -1)
				{
					this._keyDowns.push(keyCode);
				}
			}
			this.sort(this._keyDowns);
			if(this._keyDowns.length > 0)Manager.render.add(this.___render,this);
		}
	}
}