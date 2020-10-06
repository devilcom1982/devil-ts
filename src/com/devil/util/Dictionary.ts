namespace devil
{
    /**
     * 字典工具类
     * @author        devil
     * @version       V20190425
     * @create        2019-04-29
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    export class Dictionary<K, V>
    {
        private _keys:K[];
        private _values:V[];
        private _map:any;
    
        public constructor() 
        {
            this._keys = [];
            this._values = [];
            this._map = {};
        }
    
        public get(key: K):V 
        {
            return this._map[key];
        }
    
        public add(key:K, value: V):void
        {
            if (value == undefined || value == null) return;
            this.remove(key);
            this._map[key] = value;
            this._keys.push(key);
            this._values.push(value);
        }
    
        public remove(key:K):V 
        {
            let value:V = this._map[key];
            if (value == undefined) return;

            let index = this._keys.indexOf(key, 0);
            if(index > -1)
            {
                this._keys.splice(index, 1);
                this._values.splice(index, 1);
            }
            delete this._map[key];
            return value;
        }

        public removeAll():void
        {
            this._keys = [];
            this._values = [];
            this._map = {};
        }
    
        public keys(): K[]
        {
            return this._keys;
        }
    
        public values():V[] 
        {
            return this._values;
        }
    
        public containsKey(key:K):boolean 
        {
            return this._map[key] != undefined;
        }

    }
}