declare namespace devil {
    /**
     * HTML字符串工具类
     * @author        devil
     * @version       V20190222
     * @create        2019-02-22
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class HtmlUtil {
        /**
         * tf egret.TextField | eui.Label | TextField
         */
        static setHtml(tf: any, htmlText: string): void;
        static addBTag(str: string): string;
        static addUTag(str: string): string;
        static addFontTag(str: string, font: string): string;
        static addColorTag(str: string, color: string): string;
        static addColorSizeTag(str: string, color: string, size?: number): string;
        static addATag(str: string, event?: string): string;
        static addColorUATag(str: string, color: string, event?: string): string;
    }
}
