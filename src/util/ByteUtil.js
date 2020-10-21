var devil;
(function (devil) {
    /**
     * 字节工具类
     * @author        devil
     * @version       V20190425
     * @create        2019-04-29
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var ByteUtil = /** @class */ (function () {
        function ByteUtil() {
        }
        ByteUtil.toHexDump = function (desc, dump, start, count) {
            var hexDump = "";
            if (desc != null) {
                hexDump += desc;
                hexDump += "\n";
            }
            var end = start + count;
            for (var i = start; i < end; i += 16) {
                var text = "";
                var hex = "";
                for (var j = 0; j < 16; j++) {
                    if (j + i < end) {
                        var val = dump.bytes[j + i];
                        if (val < 16) {
                            hex += "0" + val.toString(16) + " ";
                        }
                        else {
                            hex += val.toString(16) + " ";
                        }
                        if (val >= 32 && val <= 127) {
                            text += String.fromCharCode(val);
                        }
                        else {
                            text += ".";
                        }
                    }
                    else {
                        hex += "   ";
                        text += " ";
                    }
                }
                hex += "  ";
                hex += text;
                hex += "\n";
                hexDump += hex;
            }
            return hexDump;
        };
        return ByteUtil;
    }());
    devil.ByteUtil = ByteUtil;
})(devil || (devil = {}));
