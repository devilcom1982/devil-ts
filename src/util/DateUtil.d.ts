declare namespace devil {
    /**
     * 日期工具类
     * @author        devil
     * @version       V20190425
     * @create        2019-04-29
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class DateUtil {
        static YYYY_MM_DD_HH_MM_SS: string;
        static MM_DD_HH_MM: string;
        static HH_MM: string;
        static MM_SS: string;
        static LEFT_DD_HH_MM: string;
        static LEFT_MM_SS: string;
        static LEFT_HH_MM_SS: string;
        static LEFT_M_SS: string;
        static LEFT_DAY_OR_HH_MM_SS: string;
        /**
         * 格式化日期为指定的格式的字符串
         * @param seconds
         * @param format
         * @param isLeft
         */
        static formatStr(seconds: number, format: string, isLeft?: boolean): string;
        static getDateBySecs(secs: number): Date;
        /**
         * 获取日期之间相距的天数
         * @param date1
         * @param date2
         */
        static disDay(date1: Date, date2: Date): number;
        /**
         *获取经过的总天数。距离 1970 年 1 月 1 日
         * @param date
         * @return
         *
         */
        static getTotalDays(date: Date): number;
        /**
         *返回当年当月有多少天
         * @param year
         * @param month
         * @return
         *
         */
        static getDates(year: number, month: number): number;
    }
}
