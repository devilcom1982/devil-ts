declare namespace devil {
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
    class LangManager {
        private _dic;
        /**
         * 解析语言包
         */
        parse(bytes: egret.ByteArray): void;
        /**
        * 语言ID，系统与ID组成的字符串，例如:bag1
        */
        getContent(id: string, ...args: any[]): string;
    }
}
