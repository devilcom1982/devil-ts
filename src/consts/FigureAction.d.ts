declare namespace devil {
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
    class FigureAction {
        static STAND: string;
        static WALK: string;
        static JUMP: string;
        static DEAD: string;
        static HITED: string;
        static ATTACK1: string;
        static ATTACK2: string;
        static ATTACK3: string;
        static SIT: string;
        static getWrapMode(name: string): number;
        static isAttackAction(name: string): boolean;
    }
}
