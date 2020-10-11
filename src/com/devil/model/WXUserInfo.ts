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
        // public sex:boolean;

        public gender:number;//1男，2女，0未知
        public province:string;
        public city:string;
        public country:string;

        public parse(data:any):void
        {
            // console.log("userInof",data);
            this.nickName = data.nickName;
            this.avatarUrl = data.avatarUrl;
            this.gender = data.gender;
            this.country = data.country;
            this.province = data.province;
            this.city = data.city;

        }
    }
}