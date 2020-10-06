    /**
     * 日志管理器
     * @author devil
     * @version V20180925
     * @create 2018-09-25
     * @place guangzhou
     */
    namespace devil
    {
        export class LogManager
        {
            /**
             * 过滤日志类型，默认任何一种日志类型都会输出
             */
            public logType:number = 1 | 2 | 4;
            public trace(logType:number,...params:any[]):void
            {
                let len:number = params.length;
                if(DEBUG || true)
                {
                    if(logType == LogType.WARNING && ((this.logType & LogType.WARNING) == LogType.WARNING))
                    {
                        egret.warn("【警告：】",...params);
                    }
                    else if(logType == LogType.DEBUG && ((this.logType & LogType.DEBUG) == LogType.DEBUG))
                    {
                        egret.log("【信息：】",...params);
                    }
                }
                if(logType == LogType.ERROR && ((this.logType & LogType.ERROR) == LogType.ERROR))
                {
                    egret.log("【错误：】",...params);
                }
            }
        }
    }

