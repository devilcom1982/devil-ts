var devil;
(function (devil) {
    /**
     * 加载顺序等级，越大越高
     * @author devil
     * @version V20180717
     * @create V20180717
     * @place guangzhou
     */
    var ResPriorityType = /** @class */ (function () {
        function ResPriorityType() {
        }
        ResPriorityType.LOWER = 0;
        ResPriorityType.LOAD_LEVEL1 = 1;
        ResPriorityType.LOAD_LEVEL2 = 2;
        ResPriorityType.LOAD_LEVEL3 = 3;
        ResPriorityType.LOAD_LEVEL4 = 4;
        ResPriorityType.LOAD_LEVEL5 = 5;
        ResPriorityType.LOAD_LEVEL6 = 6;
        ResPriorityType.MAX = 100;
        return ResPriorityType;
    }());
    devil.ResPriorityType = ResPriorityType;
})(devil || (devil = {}));
