namespace devil
{
	/**
	 * 面板数据
	 * @author        devil
	 * @version       V20190223
	 * @create        2019-02-23
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class CanvasModel
    {
			private _versions;
			private _canvases;

			public get canvases()
			{
				return this._canvases;
			}

			public constructor()
			{
				this._canvases = {};
				this._versions = {};
			}

			public getBytes(name:string):ByteArrayExtend
			{
				return this._canvases[name];
			}

			public getVersion(name:string):string
			{
				return this._versions[name];
			}

			public addCanvas(bytes:ByteArrayExtend,name:string,version:string):void
			{
				this._canvases[name] = bytes;
				this._versions[name] = version;
			}

			/**
			 * 清空数据 
			 */	
			public clear():void
			{
				for(let i in this._canvases)
				{
						this._canvases[i] = null;
				}
				this._canvases = {};
				for(let j in this._versions)
				{
						this._versions[j] = null;
				}
				this._versions = {};
			}
		}
}