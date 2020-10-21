declare namespace devil {
    /**
     * 数据表
     * @author        devil
     * @version       V20190222
     * @create        2019-02-22
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class CVOModel {
        private _dic;
        parse(source: egret.ByteArray | ArrayBuffer): void;
        getCVOData(name: string): egret.ByteArray;
        clearCVOData(name: string): void;
    }
}
