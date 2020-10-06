namespace devil
{
    /**
     * 回调函数信息类
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    export class CallBackInfo implements IPool
    {
        private _callBack:Function;
        private _target:any;
        private _args:any[];

        public get target()
        {
            return this._target;
        }

        public get callBack()
        {
            return this._callBack;
        }

        /**
         * 执行回调函数
         */
        public runCallBack(...args:any[]):void
        {
            if(args.length > 0)this._args = args;
            if(this._args == null || this._args.length == 0)this._callBack.call(this._target);
            else 
            {
                this._callBack.apply(this._target,this._args);
            }
        }

        public equals(callBack:Function,target:any):boolean
        {
            return this._callBack == callBack && this._target == target;
        }

        public pool():void
        {
            Manager.pool.push(this);
        }

        public reuse():void
        {
        }

        public unuse():void
        {
            this._callBack = null;
            this._target = null;
            this._args = null;
        }

        public dispose():void
        {
            this.unuse();
        }

        public static create(callBack:Function,target:any,...args:any[])
        {
            let result:CallBackInfo = Manager.pool.create(CallBackInfo);
            result._callBack = callBack;
            result._target = target;
            result._args = args;
            return result;
        }

        /**
         * 指定的回调函数数组中是否有指定的回调函数，如果存在，则返回对应的索引值，否则返回-1
         * @param callBacks 回调函数数组
         * @param callBack  回调函数
         * @param target    回调函数对象
         */
        public static contains(callBacks:CallBackInfo[],callBack:Function,target:any):number
        {
            let len = callBacks.length;
            for(let i = 0 ; i < len; i ++)
            {
                if(callBacks[i]._callBack == callBack && callBacks[i]._target == target)return i;
            }
            return -1;
        }
    }
}