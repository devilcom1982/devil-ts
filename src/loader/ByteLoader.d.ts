declare namespace devil {
    /**
     * 字节加载器
     * @author devil
     * @version V20180808
     * @create V20180808
     * @place guangzhou
     */
    class ByteLoader extends BaseLoader {
        bytes: ArrayBuffer;
        load(): void;
        protected reload(index: number): void;
        protected parse(data: any): void;
        unuse(): void;
    }
}
