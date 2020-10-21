declare namespace devil {
    /**
     * 字符串工具类
     * @author        devil
     * @version       V20190213
     * @create        2019-02-13
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class StringUtil {
        startsWith(source: string, str: string, ignoreCase?: boolean): boolean;
        static parseBoolean(value: string): boolean;
        static formatString(str: number): string;
        /**
         * 字符串为空或null
         * @param str
         * @return
         */
        static isEmpty(str: string): boolean;
        static toString(obj: Object): string;
        static parseRectangle(str: string): egret.Rectangle;
        static substitute(str: string, ...rest: any[]): string;
        static format(str: string, args: any[]): string;
        static getStrlen(value: string): number;
        /**
        * 获取字符串长度：汉字=2  字母数字=1
        */
        static getStrlen2(str: string): number;
    }
}
