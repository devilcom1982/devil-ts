var devil;
(function (devil) {
    /**
     * 控制器基类
     * @author        devil
     * @version       V20190419
     * @create        2019-04-19
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var BaseControl = /** @class */ (function () {
        function BaseControl() {
            this.initCMD();
        }
        BaseControl.prototype.initCMD = function () {
        };
        BaseControl.prototype.addCMD = function (protocol, cls) {
            devil.Manager.socket.addCMD(protocol, cls);
        };
        BaseControl.prototype.send = function (protocol) {
            devil.Manager.socket.getCMD(protocol).send();
        };
        BaseControl.prototype.getCMD = function (protocol) {
            return devil.Manager.socket.getCMD(protocol);
        };
        return BaseControl;
    }());
    devil.BaseControl = BaseControl;
})(devil || (devil = {}));
