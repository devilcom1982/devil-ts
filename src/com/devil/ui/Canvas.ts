namespace devil
{
	/**
	 * 画布、界面、面板
	 * @author        devil
	 * @version       V20181225
	 * @create        2018-12-25
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class Canvas extends Container
    {
		public constructor()
		{
			super();
			this._type = ComponentType.CANVAS;
        }
        
		/**
		 * 解析数据 
		 */		
		public read(bytes:ByteArrayExtend,version:string):void
		{
			bytes.position = 0;
			this.setSize(bytes.readShort(),bytes.readShort());
			this.readChildren(bytes,version);
    }
        
		/**
		 * 编辑器子类重写 
		 * @param bytes
		 * @param version
		 */		
		private readChildren(bytes:ByteArrayExtend,version:string):void
		{
			let numChildren:number = bytes.readByte();
			for(let i:number = 0 ; i < numChildren; i ++)
			{
				Manager.uiRead.read(this,bytes,version,this.setProperty,this);
			}
			this.readDataComplete();
		}
    }
}