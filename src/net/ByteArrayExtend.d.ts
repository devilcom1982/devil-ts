declare namespace devil {
    /**
     * 字节数组扩展，为了使用某些版本的ie可以连上
     * ArrayBuffer转成ByteArrayExtend 使用setArrayBuffer不要使用构造函数
     * @author        devil
     * @version       V20190311
     * @create        20180726
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ByteArrayExtend extends egret.ByteArray implements IPool {
        get buffer(): ArrayBuffer;
        /**
         * @private
         */
        set buffer(value: ArrayBuffer);
        setArrayBuffer(buffer: ArrayBuffer): void;
        readInt64(): number;
        writeInt64(value: number): void;
        writeUTF(value: string): void;
        pool(): void;
        unuse(): void;
        reuse(): void;
        dispose(): void;
    }
}
