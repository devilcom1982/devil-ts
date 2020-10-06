namespace devil
{
	/**
	 * @description   
	 * @author        devil
	 * @version       V20190305
	 * @create        2019-03-05
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
	export interface IListContainer extends IDispose
	{
        // getCount():number;
		/**
		 * 最多显示数量，要在add与addAt前使用
		 */	
		readonly showCount:number;
        add(item:IListItemData):void;
        addAt(item:IListItemData,index:number):void;
        getItemAt(index:number):IListItem;
        remove(item:IListItemData):void;
        removeAt(index:number):void;
        move(x:number,y:number):void;
        clear():void;
        clearData():void;
        itemWidth:number;
        itemHeight:number;
        selectedIndex:number;
		/**
		 * 参数 IRadioSelected 
		 */	
        __change(value:Function,target:any):void;
		getCurrent():IRadioSelected;
		readonly layers:egret.DisplayObjectContainer[];
		contentHeight:number;
		contentWidth:number;
		// scrollV:number;
		// scrollH:number;
		getScrollV():number;
		/**
		 * 
		 * @param value 
		 * @param fromScrollBar  是否来自于滚动条
		 */
		setScrollV(value:number,fromScrollBar:boolean):void
		getScrollH():number;
		/**
		 * 
		 * @param value 
		 * @param fromScrollBar  是否来自于滚动条
		 */
		setScrollH(value:number,fromScrollBar:boolean):void
		datas:IListItemData[];
		setSize(width:number,height:number):void;
		/**
		 * 是否显示最后一行，默认为false
		 */
		holdBottom:boolean;
	}
}