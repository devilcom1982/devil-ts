namespace devil
{
 	/**
	 * 角色常用动作常量
	 * @author        devil
	 * @version       V20200817
	 * @create        2020-08-17
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
	export class FigureAction
	{
		public static STAND:string = "stand";
		public static WALK:string = "walk";
		public static JUMP:string = "jump";
		public static DEAD:string = "dead";
		public static HITED:string = "hited";
		public static ATTACK1:string = "attack1";
		public static ATTACK2:string = "attack2";
		public static ATTACK3:string = "attack3";
		public static SIT:string = "sit";

		public static getWrapMode(name:string):number
		{
			switch(name)
			{
				case FigureAction.STAND:
				case FigureAction.WALK:
				case FigureAction.SIT:
					return WrapMode.LOOP;
				case FigureAction.ATTACK1:
				case FigureAction.ATTACK2:
				case FigureAction.ATTACK3:
				case FigureAction.DEAD:
				case FigureAction.JUMP:
				case FigureAction.HITED:
					return WrapMode.ONCE;
			}
			return WrapMode.ONCE;
		}

		public static isAttackAction(name:string):boolean
		{
			return name.indexOf("attack") != -1;
		}
	}
}