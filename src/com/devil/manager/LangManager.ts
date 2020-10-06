namespace devil
{
	/**
     * 语言包管理器
	 * @author        devil
	 * @version       V20190221
	 * @create        2019-02-21
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class LangManager
    {
        private _dic = {};

        /**
         * 解析语言包
         */
        public parse(bytes:egret.ByteArray):void
        {
            let tableCount:number = bytes.readByte();
            let tableName:string;
            let count:number;
            for(let i:number = 0; i < tableCount; i ++)
            {
                tableName = bytes.readUTF();
                count = bytes.readShort();
                for(let j:number = 0 ; j < count; j ++)
                {
                    this._dic[tableName + bytes.readShort()] = bytes.readUTF();
                }
            }
        }

        /**
        * 语言ID，系统与ID组成的字符串，例如:bag1
        */
        public getContent(id:string,...args:any[]):string
        {
            let content:string = this._dic[id];
            if(content == null)return "{-" + id +"-}";
            if(args.length == 0)return content;
            return StringUtil.substitute(content,...args);
        }
    }
}