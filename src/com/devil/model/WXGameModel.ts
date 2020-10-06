namespace devil
{
    /**
     * 小游戏通用数据
     * @author        devil
     * @version       V20200906
     * @create        2020-09-06
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    export class WXGameModel
    {
        // public nickName:string = "devil";
        public userInfo:UserInfo;
        public gameName:string = "game";
        public get leftReceiveCount():number
        {
            let result:number = (this._receiveFreeCount - this._hasReceiveFreeCount);
            return  result < 0 ? 0 : result;
        }

        public constructor()
        {
            this._receiveFreeCount = 0;
            this._hasReceiveFreeCount = 0;
        }

        /**
         * 免费复活次数
         */
        private _receiveFreeCount:number;
        public get receiveFreeCount()
        {
            return this._receiveFreeCount;
        }
        public set receiveFreeCount(value:number)
        {
            if(this._receiveFreeCount == value)return;
            this._receiveFreeCount = value;
            Manager.wx.writeReceiveFreeCount();
            Manager.event.dispatchEvent(new WXGameEvent(WXGameEvent.UPDATE_RECEIVE_COUNT));
        }
        /**
         * 已免费复活次数
         */
        private _hasReceiveFreeCount:number;
        public get hasReceiveFreeCount()
        {
            return this._hasReceiveFreeCount;
        }
        public set hasReceiveFreeCount(value:number)
        {
            value = MathUtil.clamb(0,this._receiveFreeCount,value);
            if(this._hasReceiveFreeCount == value)return;
            this._hasReceiveFreeCount = value;
            Manager.wx.writeHasReceiveFreeCount();
            Manager.event.dispatchEvent(new WXGameEvent(WXGameEvent.UPDATE_RECEIVE_COUNT));
        }
    }
}