var devil;
(function (devil) {
    /**
     * socket管理器
     * @author        devil
     * @version       V20190311
     * @create        2018-07-28
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var SocketManager = /** @class */ (function () {
        function SocketManager() {
            this._isReconnecting = false; //是否正在重连
            this._reConnectCount = 0; //重连次数
            /**
             * 服务器验证字段0~127,0开始
             */
            this.verify = 0;
            /**
             * 是否需要重连
             */
            this.needReconnect = true;
            /**
             * 握手协议字符串
             */
            this.handContent = "game_client------------";
            this._readBuffer = devil.Manager.pool.create(devil.TCPPacketIn);
            this._writeOffset = 0;
            this._readOffset = 0;
            this._totalLen = 0;
            this._cmds = {};
            this.isSocketReConnect = false;
        }
        Object.defineProperty(SocketManager.prototype, "isWss", {
            set: function (value) {
                this._isWss = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SocketManager.prototype, "isConnected", {
            get: function () {
                return this._socket != null && this._isConnected;
            },
            enumerable: true,
            configurable: true
        });
        SocketManager.prototype.receive = function (pkg) {
            var cmd = this._cmds[pkg.protocol];
            if (cmd != null)
                cmd.receive(pkg);
            else {
                devil.Manager.log.trace(devil.LogType.WARNING, "服务器与客户端协议对不上 ", pkg.protocol);
            }
        };
        SocketManager.prototype.initRemoteSocket = function () {
            devil.Manager.log.trace(devil.LogType.DEBUG, "start connecting socket ...");
            if (this._socket == null)
                this.$connect();
        };
        SocketManager.prototype.clear = function () {
            var that = this;
        };
        SocketManager.prototype.closeSocket = function () {
            // Manager.log.trace(LogType.DEBUG, "断开连接");
            if (this._socket) {
                this._socket = null;
                this._isReconnecting = false;
            }
        };
        SocketManager.prototype.addCMD = function (protocol, cls) {
            if (this._cmds[protocol] == undefined)
                this._cmds[protocol] = new cls();
        };
        SocketManager.prototype.removeCMD = function (protocol) {
            delete this._cmds[protocol];
        };
        SocketManager.prototype.getCMD = function (protocol) {
            return this._cmds[protocol];
        };
        SocketManager.prototype.addVerify = function () {
            this.verify++;
            if (this.verify >= 128)
                this.verify = 0;
        };
        /**
         * 连接
         * @param ip
         * @param port
         */
        SocketManager.prototype.connect = function (ip, port) {
            this._ip = ip;
            this._port = port;
            this.initRemoteSocket();
        };
        SocketManager.prototype.reconnect = function () {
            this._reConnectCount += 1;
            devil.Manager.log.trace(devil.LogType.DEBUG, "restart connecting socket ...", this._reConnectCount);
            this.initRemoteSocket();
            return false;
        };
        SocketManager.prototype.send = function (pkgOrProtocol) {
            if (pkgOrProtocol instanceof devil.TCPPacketOut) {
                this.$sendPkg(pkgOrProtocol);
            }
            else {
                this.$sendPkg(devil.TCPPacketOut.create(pkgOrProtocol));
            }
        };
        SocketManager.prototype.$sendPkg = function (pkg) {
            if (pkg.length == 0)
                return;
            if (this.isConnected) {
                pkg.writePacketLenAndVerify();
                pkg.position = 0;
                try {
                    this._socket.send(pkg.buffer);
                }
                catch (e) { }
                pkg.pool();
            }
            else {
                devil.Manager.render.add(this.___renderReconnect, this, 100, 1, null, true, true);
            }
        };
        SocketManager.prototype.checkOnopen = function () {
            if (this._socket.readyState == 1) {
                this.onopenHandler();
            }
            else {
                this._checkStateCount = 0;
                devil.Manager.render.add(this.onopenHandler, this, 100, 0, null, true);
            }
        };
        SocketManager.prototype.onopenHandler = function () {
            this._checkStateCount++;
            if ((this._checkStateCount > 10) || (this._socket.readyState == 1)) {
                devil.Manager.render.remove(this.onopenHandler, this);
                this.verify = 0;
                if (this._socket.readyState != 1) {
                    alert("登录失败，请刷新重新登录。");
                    return;
                }
                this.sendServerNeedCMD();
                if (this._connnectFun != null)
                    this._connnectFun.runCallBack();
            }
        };
        /**
          * 服务端需要该协议，socket连接成功时发送
          */
        SocketManager.prototype.sendServerNeedCMD = function () {
            if (this._socket.readyState != 1) {
                alert("登录失败，请刷新重新登录。");
                return;
            }
            if (!devil.StringUtil.isEmpty(this.handContent)) {
                var pkg = devil.Manager.pool.create(devil.ByteArrayExtend);
                pkg.writeUTFBytes(this.handContent);
                pkg.position = 0;
                try {
                    this._socket.send(pkg.buffer);
                }
                catch (e) { }
                pkg.pool();
            }
        };
        SocketManager.prototype.$connect = function () {
            var that = this;
            try {
                var socketServerUrl = (this._isWss ? "wss://" : "ws://") + that._ip + ":" + that._port;
                if (that.isWindowSocket()) {
                    console.log("SocketManager.$connect", devil.Manager.plat.runtimeType);
                    that._socket = new window["WebSocket"](socketServerUrl);
                    that._socket.binaryType = "arraybuffer";
                    that._socket.onopen = onopen;
                    that._socket.onclose = onclose;
                    that._socket.onerror = onerror;
                    that._socket.onmessage = onmessage;
                }
                else {
                    that._socket = new __global["egret_native"]["WebSocket"](socketServerUrl);
                    that._socket.onOpen = onopen;
                    that._socket.onClose = onclose;
                    that._socket.onError = onerror;
                    that._socket.onMessage = onmessage;
                }
            }
            catch (e) {
            }
            function onopen() {
                devil.Manager.log.trace(devil.LogType.DEBUG, "socket connnect successful ...");
                that._isConnected = true;
                that._isReconnecting = false;
                if (that._reConnectCount > 0) {
                    that.isSocketReConnect = true;
                    that._reConnectCount = 0;
                }
                that.checkOnopen();
            }
            function onclose(e) {
                devil.Manager.log.trace(devil.LogType.ERROR, "socket close ...");
                that.startReconnect();
                if (that._closeFun != null)
                    that._closeFun.runCallBack();
            }
            function onerror(e) {
                devil.Manager.log.trace(devil.LogType.ERROR, "socket error ...");
                that.startReconnect();
                if (that._errorFun != null)
                    that._errorFun.runCallBack();
            }
            function onmessage2(msg) {
                var pkg = devil.Manager.pool.create(devil.TCPPacketIn);
                if (that.isWindowSocket()) {
                    pkg.setArrayBuffer(msg.data);
                }
                else {
                    pkg.setArrayBuffer(msg);
                }
                console.log("onmessage");
                // that._pkgs.push(pkg);
            }
            function onmessage(msg) {
                var pkg = devil.Manager.pool.create(devil.TCPPacketIn);
                if (that.isWindowSocket())
                    pkg.setArrayBuffer(msg.data);
                else
                    pkg.setArrayBuffer(msg);
                if (pkg.bytesAvailable > 0) {
                    var len = pkg.bytesAvailable;
                    pkg.readBytes(that._readBuffer, that._writeOffset, pkg.bytesAvailable);
                    that._writeOffset += len;
                    if (that._writeOffset > 0) {
                        that._readBuffer.position = 0;
                        that.readPackage();
                    }
                }
                pkg.pool();
            }
        };
        SocketManager.prototype.startReconnect = function () {
            this.closeSocket();
            this._isConnected = false;
            this.clear();
            devil.Manager.render.add(this.___renderReconnect, this, 100, 1, null, true);
        };
        SocketManager.prototype.isWindowSocket = function () {
            return devil.Manager.plat.runtimeType == egret.RuntimeType.WEB ||
                devil.Manager.plat.runtimeType == egret.RuntimeType.WXGAME ||
                devil.Manager.plat.runtimeType == egret.RuntimeType.QQGAME ||
                devil.Manager.plat.runtimeType == "dygame";
            // return egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME || egret.Capabilities.runtimeType == egret.RuntimeType.QQGAME;
        };
        //只要有数据就写入缓存，缓存中够一条协议的长度时才会被读出
        SocketManager.prototype.readPackage = function () {
            var dataLeft = this._writeOffset - this._readOffset;
            while (dataLeft > 2 && this._totalLen == 0 || dataLeft >= this._totalLen && this._totalLen > 0) {
                var pkg = void 0;
                if (this._totalLen == 0) {
                    this._totalLen = this._readBuffer.readUnsignedShort() + 2;
                    this._readOffset += 2;
                    dataLeft -= 2;
                }
                if (dataLeft >= this._totalLen) {
                    pkg = devil.Manager.pool.create(devil.TCPPacketIn);
                    this._readBuffer.readBytes(pkg, 0, this._totalLen);
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
            if (dataLeft > 0) {
                this._readBuffer.writeBytes(this._readBuffer, this._readOffset, dataLeft);
            }
            this._readOffset = 0;
            this._writeOffset = dataLeft;
        };
        SocketManager.prototype.__connnect = function (callBack, target) {
            this._connnectFun = devil.CallBackInfo.create(callBack, target);
        };
        SocketManager.prototype.__close = function (callBack, target) {
            this._closeFun = devil.CallBackInfo.create(callBack, target);
        };
        SocketManager.prototype.__error = function (callBack, target) {
            this._errorFun = devil.CallBackInfo.create(callBack, target);
        };
        /**
         * 重连socket
         */
        SocketManager.prototype.___renderReconnect = function (internal, isResetCount) {
            if (isResetCount === void 0) { isResetCount = false; }
            var that = this;
            if (that.isConnected)
                return;
            if (!that.needReconnect)
                return;
            if (that._isReconnecting)
                return;
            that._isReconnecting = true;
            if (isResetCount)
                that._reConnectCount = 0;
            that.reconnect();
        };
        return SocketManager;
    }());
    devil.SocketManager = SocketManager;
})(devil || (devil = {}));
