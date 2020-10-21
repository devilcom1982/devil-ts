var devil;
(function (devil) {
    /**
     * 游戏ID
     * @author        devil
     * @version       V20201008
     * @create        2020-10-08
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var GameID = /** @class */ (function () {
        function GameID() {
        }
        //魔法之触
        GameID.MAGIC_TOUCH = 1;
        //指尖冲刺
        GameID.JUMP = 2;
        //星际摩托
        GameID.MOTO = 3;
        //迷路的小球
        GameID.PUZZLE = 4;
        //色感大测试
        GameID.COLOR = 6;
        return GameID;
    }());
    devil.GameID = GameID;
})(devil || (devil = {}));
