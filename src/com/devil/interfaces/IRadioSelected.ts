namespace devil
{
    /**
	 * @author        devil
	 * @version       V201190215
	 * @create        2019-02-15
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
     */
    export interface IRadioSelected extends IDispose
    {
        setSelected(value:boolean):void;
        getSelected():boolean;
        setSelector(value:RadioSelector):void;

    }
}