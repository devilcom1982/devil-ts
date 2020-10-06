namespace devil
{
    /**
     * 字节工具类
     * @author        devil
     * @version       V20190425
     * @create        2019-04-29
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    export class ByteUtil
    {
        public static toHexDump(desc:string, dump:egret.ByteArray, start:number, count:number):string
        {
            let hexDump:string = "";
            if(desc != null)
            {
                hexDump += desc;
                hexDump += "\n";
            }
            let end = start + count;
            for(let i = start; i < end; i += 16)
            {
                let text = "";
                let hex = "";

                for(let j = 0; j < 16; j++)
                {
                    if(j + i < end)
                    {
                        let val:number = dump.bytes[j + i];
                        if(val < 16)
                        {
                            hex += "0" + val.toString(16) + " ";
                        }
                        else
                        {
                            hex += val.toString(16) + " ";
                        }

                        if(val >= 32 && val <= 127)
                        {
                            text += String.fromCharCode(val);
                        }
                        else
                        {
                            text += ".";
                        }
                    }
                    else
                    {
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
        }
    }
}