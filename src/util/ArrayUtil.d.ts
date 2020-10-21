declare namespace devil {
    /**
     * 数组工具类
     * @author        devil
     * @version       V20190523
     * @create        2019-05-23
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ArrayUtil {
        /**
         * 将某一格式的字符串转成数字类型数组,可带有{}格式
         * @param str
         * @param splitStr
         */
        static parseStringToArray(str: string, splitStr?: string): number[];
        /**
         * 数组中删除
         * @param array
         * @param value
         */
        static deleteObject<T>(array: T[], value: T): void;
        /**
         * 多属性排序,arrProperty与arrSort对应
         * @param arrProperty 属性列表
         * @param arrSort 排序方式(默认正序) 0正序 1倒序
         * @return 排序后的数组
         */
        static sortOn(arr: any[], arrProperty: string[], arrSort?: number[]): Array<any>;
        /**
         * 对数组随机排行
         * @param value
         */
        static randomSort(value: any[]): void;
        /**
         * 获取数组随机值
         * @param arr
         */
        static random(arr: any[]): any;
    }
}
