namespace devil
{
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
    export class ByteArrayExtend extends egret.ByteArray implements IPool
    {

        public get buffer():ArrayBuffer 
        {
            return this.data.buffer;
        }

        /**
         * @private
         */
        public set buffer(value: ArrayBuffer) 
        {
            let wpos = value.byteLength;
            let uint8 = new Uint8Array(value);
            let bufferExtSize = this.bufferExtSize;
            let bytes: Uint8Array;
            if (bufferExtSize == 0) {
                bytes = new Uint8Array(wpos);
            }
            else {
                let multi = (wpos / bufferExtSize | 0) + 1;
                bytes = new Uint8Array(multi * bufferExtSize);
            }
            bytes.set(uint8);
            this.write_position = wpos;
            this._bytes = bytes;
            this.data = new DataView(bytes.buffer);
        }
        
        public setArrayBuffer(buffer: ArrayBuffer): void 
        {
            this._position = 0;
            this.write_position = buffer.byteLength;
            this.buffer = buffer;
            this._position = 0;
        }

        public readInt64():number
        {
            return this.readInt() * Math.pow(2, 32) + this.readUnsignedInt();
        }

        public writeInt64(value:number):void
        {
            this.writeInt(value / 0xffffffff);
            this.writeUnsignedInt(value);
        }

        public writeUTF(value:string): void
        {
            if (value != null)
                super.writeUTF(value);
            else
                super.writeUTF("");
        }

        public pool():void
        {
            this.endian = egret.Endian.BIG_ENDIAN;
            Manager.pool.push(this);
        }

        public unuse():void
        {
            this.clear();
        }

        public reuse():void
        {

        }

        public dispose():void
        {
            this.clear();
        }
    }
}