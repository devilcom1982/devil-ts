declare namespace devil {
    /**
     * socket管理器
     * @author        devil
     * @version       V20190311
     * @create        2018-07-28
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class SocketManager {
        private _ip;
        private _port;
        private _isWss;
        private _socket;
        private _isReconnecting;
        private _isConnected;
        private _reConnectCount;
        private _connnectFun;
        private _closeFun;
        private _errorFun;
        private _cmds;
        private _checkStateCount;
        /**
         * 服务器验证字段0~127,0开始
         */
        verify: number;
        /**
         * 本次登录是否断线重连
         */
        isSocketReConnect: boolean;
        /**
         * 是否需要重连
         */
        needReconnect: boolean;
        /**
         * 握手协议字符串
         */
        handContent: string;
        private _readBuffer;
        private _writeOffset;
        private _readOffset;
        private _totalLen;
        set isWss(value: boolean);
        get isConnected(): boolean;
        constructor();
        private receive;
        private initRemoteSocket;
        private clear;
        private closeSocket;
        addCMD(protocol: number, cls: any): void;
        removeCMD(protocol: number): void;
        getCMD<T>(protocol: number): T;
        addVerify(): void;
        /**
         * 连接
         * @param ip
         * @param port
         */
        connect(ip: string, port: number): void;
        private reconnect;
        send(pkgOrProtocol: TCPPacketOut | number): void;
        private $sendPkg;
        private checkOnopen;
        private onopenHandler;
        /**
          * 服务端需要该协议，socket连接成功时发送
          */
        private sendServerNeedCMD;
        private $connect;
        private startReconnect;
        private isWindowSocket;
        private readPackage;
        __connnect(callBack: () => void, target: any): void;
        __close(callBack: () => void, target: any): void;
        __error(callBack: () => void, target: any): void;
        /**
         * 重连socket
         */
        private ___renderReconnect;
    }
}
