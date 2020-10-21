declare namespace devil {
    /**
     * 画布、界面、面板
     * @author        devil
     * @version       V20181225
     * @create        2018-12-25
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class Canvas extends Container {
        constructor();
        /**
         * 解析数据
         */
        read(bytes: ByteArrayExtend, version: string): void;
        /**
         * 编辑器子类重写
         * @param bytes
         * @param version
         */
        private readChildren;
    }
}
