namespace devil 
{
    /**
     * 微信用户信息
     * @author        devil
     * @version       V20200906
     * @create        2020-09-24
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    export class UserInfo
    {
        public nickName:string;
        public avatarUrl:string;
        public sex:boolean;

        public parse(data:any):void
        {
            this.nickName = data.nickName;
            this.avatarUrl = data.avatarUrl;
            this.sex = data.sex == 1;
        }
    }
}