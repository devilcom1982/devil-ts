declare namespace devil {
    /**
     * 微信用户信息
     * @author        devil
     * @version       V20200906
     * @create        2020-09-24
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class WXUserInfo {
        nickName: string;
        avatarUrl: string;
        gender: number;
        province: string;
        city: string;
        country: string;
        /**
         * 最高分数
         */
        maxScore: number;
        parse(data: any): void;
    }
}
