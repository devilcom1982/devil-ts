namespace devil
{
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
    export class ArrayUtil
    {
        /**
         * 将某一格式的字符串转成数字类型数组,可带有{}格式
         * @param str 
         * @param splitStr 
         */
        public static parseStringToArray(str:string,splitStr:string=","):number[]
        {
            let reg:RegExp = /{|}| /g;
            str = str.replace(reg,"");
            let arr:any[] = str.split(splitStr);
            let result:number[] = [];
            for(let i:number = 0; i < arr.length; i++)
            {
                result.push(parseInt(arr[i]));
            }
            return result;
        }

        /**
         * 数组中删除
         * @param array 
         * @param value 
         */
        public static deleteObject<T>(array:T[], value:T):void
        {
            let index:number = array.indexOf(value);
            if (index != -1) array.splice(index, 1);
        }

        /**
         * 多属性排序,arrProperty与arrSort对应
         * @param arrProperty 属性列表
         * @param arrSort 排序方式(默认正序) 0正序 1倒序
         * @return 排序后的数组
         */
        public static sortOn(arr:any[], arrProperty:string[], arrSort:number[] = null):Array<any>
        {
            if(arr == null || arr.length == 0) return arr;
            return arr.sort(function(obj1, obj2){
                let len:number = arrProperty.length;
                let property:string = "";
                let sortLen:number = arrSort ? arrSort.length : 0;
                if(sortLen > len) sortLen = len;

                let sortType:number = 0;
                let result:number = 0;
                for(let i:number = 0; i < len; i++)
                {
                    property = arrProperty[i];
                    sortType = 0;

                    if(i < sortLen) sortType = arrSort[i];
                    
                    result = Number(obj1[property]) - Number(obj2[property]);
                    if(result == 0) continue;

                    if(sortType == 0) return result;

                    return -result;
                }

                return 0;
            });
        }

        /**
         * 对数组随机排行
         * @param value 
         */
        public static randomSort(value:any[]):void
        {
            value.sort(function(obj1, obj2)
            {
                return Math.random() < 0.5 ? 1 : -1
            })
        }

        /**
         * 获取数组随机值
         * @param arr 
         */
        public static random(arr:any[]):any
        {
            return arr[Math.floor(arr.length * Math.random())];
        }
    }
}