var devil;
(function (devil) {
    /**
     * 文件后缀名常量,带有下划线的带有后缀“.”。例如MP3_表示.mp3
     * @author devil
     * @version V20180807
     * @create 20180807
     * @place guangzhou
     */
    var Extension = /** @class */ (function () {
        function Extension() {
        }
        Extension.PNG = "png";
        Extension.JPG = "jpg";
        Extension.MP3 = "mp3";
        Extension.TXT = "txt";
        Extension.JSON = "json";
        Extension.PNG_ = ".png";
        Extension.JPG_ = ".jpg";
        Extension.MP3_ = ".mp3";
        Extension.TXT_ = ".txt";
        Extension.JSON_ = ".json";
        return Extension;
    }());
    devil.Extension = Extension;
})(devil || (devil = {}));
