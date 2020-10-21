/**
 * 日志管理器
 * @author devil
 * @version V20180925
 * @create 2018-09-25
 * @place guangzhou
 */
declare namespace devil {
    class LogManager {
        /**
         * 过滤日志类型，默认任何一种日志类型都会输出
         */
        logType: number;
        trace(logType: number, ...params: any[]): void;
    }
}
