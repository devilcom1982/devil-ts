namespace devil
{
	/**
	 * 数据表
	 * @author        devil
	 * @version       V20190222
	 * @create        2019-02-22
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
	export class CVOModel
	{
        private _dic = {};
		
        public parse(source:egret.ByteArray | ArrayBuffer):void
		{
			// let data:egret.ByteArray = source instanceof ArrayBuffer ?  new egret.ByteArray(source, source.byteLength) : source;
			let data:egret.ByteArray;
			if(source instanceof ArrayBuffer)
			{
				data = Manager.pool.createByteArray();
				data.buffer = source;
			}
			else
			{
				data = source;
			}
			let name:string;
			let len:number;
			let bytes:egret.ByteArray;
			let current:number = 0;
			
			let count:number = data.readByte();
			while(current < count)
			{
				current ++;
				name = data.readUTF();
				len = data.readInt();
				// bytes = new egret.ByteArray();
				bytes = Manager.pool.createByteArray();
				bytes.writeBytes(data,data.position,len);
				data.position += len;
				bytes.position = 0;
				this._dic[name] = bytes;
			}
			// data.clear();
			Manager.pool.pushByteArray(data);
		}
		
		public getCVOData(name:string):egret.ByteArray
		{
			return this._dic[name];
		}

		public clearCVOData(name:string):void
		{
			Manager.pool.pushByteArray(this._dic[name])
			delete this._dic[name];
		}
	}
}