namespace devil
{
    /**
     * 基础管理器集，针对基本的管理器
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    export class StorageManager
    {
        public getItem(key:string):string
        {
            return egret.localStorage.getItem(key);
        }

        public clear():void
        {
            egret.localStorage.clear();
        }

        public setItem(key:string,value:string):void
        {
            egret.localStorage.setItem(key,value);
        }

        public removeItem(key:string):void
        {
            egret.localStorage.removeItem(key)
        }

        public setBoolean(key:string,value:boolean):void
        {
            egret.localStorage.setItem(key,value?"1":"0");
        }

        public getBoolean(key:string):boolean
        {
            return egret.localStorage.getItem(key) == "1";
        }

        public setInt(key:string,value:number):void
        {
            egret.localStorage.setItem(key,value.toString());
        }

        public getInt(key:string):number
        {
            return Number(egret.localStorage.getItem(key));
        }
    }
}