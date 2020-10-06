namespace devil
{
	/**
	 * 滤镜工具类
	 * @author        devil
	 * @version       V20190926
	 * @create        2019-09-26
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class FilterUtil
    {
        /**
         * 设置成灰色
         * @param value 
         */
        public static setGrayFilter(value:egret.DisplayObject):void
        {
            // return;
            if(egret.Capabilities.renderMode != "webgl")return;
            //颜色矩阵数组
            var colorMatrix = [
                0.3,0.6,0,0,0,
                0.3,0.6,0,0,0,
                0.3,0.6,0,0,0,
                0,0,0,1,0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            value.filters= [colorFlilter];
        }
    }
}