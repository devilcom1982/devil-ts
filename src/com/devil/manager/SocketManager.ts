namespace devil
{
    /**
     * socket管理器
     * @author        devil
     * @version       V20190311
     * @create        2018-07-28
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */	
    export class SocketManager
    {
        private _ip:string;
        private _port:number;
        private _isWss:boolean;
        private _socket;
        private _isReconnecting:boolean = false;//是否正在重连
        private _isConnected:boolean;
        private _reConnectCount:number = 0;//重连次数
        private _connnectFun:CallBackInfo;
        private _closeFun:CallBackInfo;
        private _errorFun:CallBackInfo;
        private _cmds;
        private _checkStateCount:number;

        /**
         * 服务器验证字段0~127,0开始
         */
        public verify:number = 0;
        /**
         * 本次登录是否断线重连
         */
        public isSocketReConnect:boolean;
        /**
         * 是否需要重连
         */
        public needReconnect:boolean = true;
        /**
         * 握手协议字符串
         */
        public handContent:string = "game_client------------";

        private _readBuffer:TCPPacketIn = Manager.pool.create(TCPPacketIn);
        private _writeOffset:number = 0;
        private _readOffset:number = 0;
        private _totalLen:number = 0;

        public set isWss(value:boolean)
        {
            this._isWss = value;
        }

        public get isConnected():boolean
        {
            return this._socket != null && this._isConnected;
        }

        public constructor()
        {
            this._cmds = {};
            this.isSocketReConnect = false;
        }

        private receive(pkg:TCPPacketIn):void
        {
            let cmd:BaseCMD = this._cmds[pkg.protocol];
            if(cmd != null) cmd.receive(pkg);
            else 
            {
                Manager.log.trace(LogType.WARNING,"服务器与客户端协议对不上 ",pkg.protocol)
            }
        }

        private initRemoteSocket():void
        {
            Manager.log.trace(LogType.DEBUG, "start connecting socket ...");
            if(this._socket == null) this.$connect();
        }

        private clear():void
        {
            let that = this;
        }

        private closeSocket():void
        {
            // Manager.log.trace(LogType.DEBUG, "断开连接");
            if(this._socket)
            {
                this._socket = null;
                this._isReconnecting = false;
            }
        }

        public addCMD(protocol:number,cls:any):void
        {
            if(this._cmds[protocol] == undefined) this._cmds[protocol] = new cls();
        }

        public removeCMD(protocol:number):void
        {
            delete this._cmds[protocol];
        }
        public getCMD<T>(protocol:number):T
        {
            return this._cmds[protocol] as T;
        }

        public addVerify():void
        {
            this.verify ++;
            if(this.verify >= 128) this.verify = 0;
        }

        /**
         * 连接
         * @param ip 
         * @param port 
         */
        public connect(ip:string,port:number):void
        {
            this._ip = ip;
            this._port = port;
            this.initRemoteSocket();
        }

        private reconnect():boolean
        {
            this._reConnectCount += 1;
            Manager.log.trace(LogType.DEBUG, "restart connecting socket ..." ,this._reConnectCount);
            this.initRemoteSocket();
            return false;
        }

        public send(pkgOrProtocol:TCPPacketOut | number):void
        {
            if(pkgOrProtocol instanceof TCPPacketOut)
            {
                this.$sendPkg(pkgOrProtocol);
            }
            else
            {
                this.$sendPkg(TCPPacketOut.create(pkgOrProtocol));
            }
        }

        private $sendPkg(pkg:TCPPacketOut):void
        {
            if(pkg.length == 0)return;
            if(this.isConnected)
            {
                pkg.writePacketLenAndVerify();
                pkg.position = 0;
                try
                {
                    this._socket.send(pkg.buffer);
                }
                catch(e)
                {}
                pkg.pool();
            }
            else
            {
                Manager.render.add(this.___renderReconnect, this, 100, 1, null, true, true);
            }
        }

        private checkOnopen():void
        {
            if(this._socket.readyState == 1) 
            {
                this.onopenHandler();
            }
            else
            {
                this._checkStateCount = 0;
                Manager.render.add(this.onopenHandler, this, 100, 0, null, true);
            }
        }
    
        private onopenHandler():void
        {
            this._checkStateCount++;
            if((this._checkStateCount > 10) || (this._socket.readyState == 1))
            {
                Manager.render.remove(this.onopenHandler, this);
                this.verify = 0;
                if(this._socket.readyState != 1) 
                {
                    alert("登录失败，请刷新重新登录。");
                    return;
                }
                this.sendServerNeedCMD();
                if(this._connnectFun != null)this._connnectFun.runCallBack();
            }
        }

       /**
         * 服务端需要该协议，socket连接成功时发送
         */
        private sendServerNeedCMD():void
        {
            if(this._socket.readyState != 1) 
            {
                alert("登录失败，请刷新重新登录。");
                return;
            }
            if(!StringUtil.isEmpty(this.handContent))
            {
                let pkg:ByteArrayExtend = Manager.pool.create(ByteArrayExtend);
                pkg.writeUTFBytes(this.handContent);
                pkg.position = 0;
                try{
                    this._socket.send(pkg.buffer);
                }
                catch(e)
                {}
                pkg.pool();
            }
        }

        private $connect():void
        {
            let that = this;
            try
            {
                let socketServerUrl:string = (this._isWss ? "wss://" : "ws://") + that._ip + ":" + that._port;
                if(that.isWindowSocket())
                {
                    console.log("SocketManager.$connect",egret.Capabilities.runtimeType == egret.RuntimeType.QQGAME)
                    that._socket = new window["WebSocket"](socketServerUrl);
                    that._socket.binaryType = "arraybuffer";
                    that._socket.onopen = onopen;
                    that._socket.onclose = onclose;
                    that._socket.onerror = onerror;
                    that._socket.onmessage = onmessage
                }
                else
                {
                    that._socket = new __global["egret_native"]["WebSocket"](socketServerUrl);
                    that._socket.onOpen = onopen;
                    that._socket.onClose = onclose;
                    that._socket.onError = onerror;
                    that._socket.onMessage = onmessage
                }
            }
            catch(e)
            {
            }
    
            function onopen():void
            {
                Manager.log.trace(LogType.DEBUG,"socket connnect successful ...");
                that._isConnected = true;
                that._isReconnecting = false;
                if(that._reConnectCount > 0)
                {
                    that.isSocketReConnect = true;
                    that._reConnectCount = 0;
                }
                that.checkOnopen();
            }
            function onclose(e):void
            {
                Manager.log.trace(LogType.ERROR,"socket close ...");
                that.startReconnect();
                if(that._closeFun != null)that._closeFun.runCallBack();
            }
            function onerror(e):void
            {
                Manager.log.trace(LogType.ERROR,"socket error ...");
                that.startReconnect();
                if(that._errorFun != null)that._errorFun.runCallBack();
            }
            function onmessage2(msg):void
            {
                let pkg:TCPPacketIn = Manager.pool.create(TCPPacketIn);
                if(that.isWindowSocket())
                {
                    pkg.setArrayBuffer(msg.data);          
                }
                else
                {
                    pkg.setArrayBuffer(msg);     
                }
                console.log("onmessage")
                // that._pkgs.push(pkg);
            }
            function onmessage(msg):void
            {
                let pkg:TCPPacketIn = Manager.pool.create(TCPPacketIn);
                if(that.isWindowSocket())pkg.setArrayBuffer(msg.data);
                else pkg.setArrayBuffer(msg);
                if(pkg.bytesAvailable > 0)
                {
                    let len:number = pkg.bytesAvailable;
                    pkg.readBytes(that._readBuffer,that._writeOffset,pkg.bytesAvailable);
                    that._writeOffset += len;
                    if(that._writeOffset > 0)
                    {
                        that._readBuffer.position = 0;
                        that.readPackage();
                    }
                }
                pkg.pool();
            }
        }


        private startReconnect():void
        {
            this.closeSocket();
            this._isConnected = false;
            this.clear();
            Manager.render.add(this.___renderReconnect, this, 100, 1, null, true);
        }

        private isWindowSocket():boolean
        {
            return egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME || egret.Capabilities.runtimeType == egret.RuntimeType.QQGAME;
        }

        //只要有数据就写入缓存，缓存中够一条协议的长度时才会被读出
        private readPackage():void
        {
            let dataLeft:number = this._writeOffset - this._readOffset;
            while(dataLeft > 2 && this._totalLen == 0 || dataLeft >= this._totalLen && this._totalLen > 0)
            {
                let pkg:TCPPacketIn;
                if(this._totalLen == 0)
                {
                    this._totalLen = this._readBuffer.readUnsignedShort() + 2;
                    this._readOffset += 2;
                    dataLeft -= 2;
                }
                if(dataLeft >= this._totalLen)
                {
                    pkg = Manager.pool.create(TCPPacketIn);
                    this._readBuffer.readBytes(pkg,0,this._totalLen);
                    this._readOffset += this._totalLen;
                    // let totalLen:number = pkg.readUnsignedShort() + 2;
                    pkg.protocol = pkg.readShort();
                    // Manager.log.trace(LogType.DEBUG,ByteUtil.toHexDump("收到协议",pkg,0,pkg.length));
                    this.receive(pkg);
                    pkg.pool();
                    this._totalLen = 0;
                }
                dataLeft = this._writeOffset - this._readOffset;
            }
            //剩下不到一条协议，先写入缓存，再有数据进入继续拼接
            this._readBuffer.position = 0;
            if(dataLeft > 0)
            {
                this._readBuffer.writeBytes(this._readBuffer,this._readOffset,dataLeft);
            }
            this._readOffset = 0;
            this._writeOffset = dataLeft;
        }

        public __connnect(callBack:()=>void,target:any):void
        {
            this._connnectFun = CallBackInfo.create(callBack,target);
        }
        public __close(callBack:()=>void,target:any):void
        {
            this._closeFun = CallBackInfo.create(callBack,target);
        }
        public __error(callBack:()=>void,target:any):void
        {
            this._errorFun = CallBackInfo.create(callBack,target);
        }

        /**
         * 重连socket
         */
        private ___renderReconnect(internal:number,isResetCount:boolean = false)
        {
            let that = this;
            if(that.isConnected) return;
            if(!that.needReconnect) return;
            if(that._isReconnecting) return;
            that._isReconnecting = true;
            if(isResetCount) that._reConnectCount = 0;
            that.reconnect();
        }
    }
}