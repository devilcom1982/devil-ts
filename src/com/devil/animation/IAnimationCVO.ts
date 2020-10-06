namespace devil
{
    /**
     * 动画与特效模板数据接口
     * @author        devil
     * @version       V20190226
     * @create        2019-02-26
     * @update 	      author:更新者        time:更新日期        description:更新描述    
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    export interface IAnimationCVO
    {
        /**
         * 唯一ID
         */
        id:string;
        /**
         * 关键帧数组
         */
        frames:number[];
        /**
         * 总帧数
         */
        totalFrame:number;
        /**
         * 循环次数,0表示无数次
         */
        wrapMode:number;
        /**
         * 特效X偏移量
         */
        offsetX:number;
        /**
         * 特效Y偏移量
         */
        offsetY:number;
        /**
         * 等比缩放
         */
        scale:number;
        /**
         * 是否在人物脚底播放 (如果在脚底则填加到AliveInfo.footContainer层)		
         */
        isInFeet:boolean;
        /**
         * 是否长驻内存
         * 0不长驻
         * 1男长驻
         * 2女长驻
         * 3男女长驻
         */
        stayMemory:number;
    }
}