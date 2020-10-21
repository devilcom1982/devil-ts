var devil;
(function (devil) {
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
    var FigureAction = /** @class */ (function () {
        function FigureAction() {
        }
        FigureAction.getWrapMode = function (name) {
            switch (name) {
                case FigureAction.STAND:
                case FigureAction.WALK:
                case FigureAction.SIT:
                    return devil.WrapMode.LOOP;
                case FigureAction.ATTACK1:
                case FigureAction.ATTACK2:
                case FigureAction.ATTACK3:
                case FigureAction.DEAD:
                case FigureAction.JUMP:
                case FigureAction.HITED:
                    return devil.WrapMode.ONCE;
            }
            return devil.WrapMode.ONCE;
        };
        FigureAction.isAttackAction = function (name) {
            return name.indexOf("attack") != -1;
        };
        FigureAction.STAND = "stand";
        FigureAction.WALK = "walk";
        FigureAction.JUMP = "jump";
        FigureAction.DEAD = "dead";
        FigureAction.HITED = "hited";
        FigureAction.ATTACK1 = "attack1";
        FigureAction.ATTACK2 = "attack2";
        FigureAction.ATTACK3 = "attack3";
        FigureAction.SIT = "sit";
        return FigureAction;
    }());
    devil.FigureAction = FigureAction;
})(devil || (devil = {}));
