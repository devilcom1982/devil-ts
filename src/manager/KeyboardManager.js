var devil;
(function (devil) {
    /**
     * 键盘管理器
     * @author        devil
     * @version       V20191104
     * @create        2019-11-04
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var KeyboardManager = /** @class */ (function () {
        function KeyboardManager() {
            this._firstDelay = 500;
            this._keyDowns = [];
            this._pushKeys = [];
            this._functions = {};
            var that = this;
            if (!egret.Capabilities.isMobile) {
                document.onkeydown = ___keyDown;
                document.onkeyup = ___keyUp;
            }
            function ___keyDown(e) {
                // if((e.target as egret.TextField) && (e.target as egret.TextField).type == egret.TextFieldType.INPUT)return;//输入文本的快捷键屏蔽
                if (e.target && e.target.type == "text")
                    return; //输入文本的快捷键屏蔽
                if (that._pushKeys.indexOf(e.keyCode) == -1) {
                    that._pushKeys.push(e.keyCode);
                    devil.Manager.render.add(that.___pushRender, that, that._firstDelay, 1);
                    that.sort(that._pushKeys);
                    that.callBack(that._pushKeys.join("|"), devil.KeyState.KEY_DOWN);
                }
            }
            function ___keyUp(e) {
                var index = that._keyDowns.indexOf(e.keyCode);
                if (index != -1)
                    that._keyDowns.splice(index, 1);
                index = that._pushKeys.indexOf(e.keyCode);
                if (index != -1) {
                    that._pushKeys.splice(index, 1);
                    that.callBack(e.keyCode + "", devil.KeyState.KEY_UP);
                }
                if (that._pushKeys.length == 0) {
                    devil.Manager.render.remove(that.___pushRender, that);
                }
                if (that._keyDowns.length == 0) {
                    devil.Manager.render.remove(that.___render, that);
                }
            }
        }
        Object.defineProperty(KeyboardManager.prototype, "firstDelay", {
            /**
             * 当第一次按下键盘时，会有些延时，默认为500MS
             */
            set: function (value) {
                this._firstDelay = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
     * 判断指定的键是否被按下
     * @param keyCode
     * @return
     */
        KeyboardManager.prototype.hasKey = function (keyCode) {
            return this._pushKeys.indexOf(keyCode) != -1;
        };
        // 	/**
        //  * 判断指定的键集中的任意一个键是否被按下 
        //  * @param keyCode
        //  * @return 
        //  */	
        // public hasKeys(...args):boolean
        // {
        // 	for(let i:number = 0 ; i < args.length; i ++)
        // 	{
        // 		if(this.hasKey(args[i]))return true;
        // 	}
        // 	return false;
        // }
        // /**
        //  * 有多少键被按下
        //  * @param keyCode
        //  * @return 
        //  */	
        // public hasKeyCount():number
        // {
        // 	return this._pushKeys.length;
        // }
        /**
         * 填加侦听函数
         * @param key
         * @param callBack 参数keyCode如果是组合键，类似51|52；
         *                state是KeyState常量，标记是抬起还是按下；
         * @param target
         */
        KeyboardManager.prototype.add = function (key, callBack, target) {
            this.adds([key], callBack, target);
        };
        KeyboardManager.prototype.remove = function (key, callBack, target) {
            this.removes([key], callBack, target);
        };
        KeyboardManager.prototype.adds = function (keys, callBack, target) {
            this.sort(keys);
            var key = keys.join("|");
            var functions = this._functions[key];
            if (!functions) {
                functions = [];
                this._functions[key] = functions;
            }
            if (devil.CallBackInfo.contains(functions, callBack, target) == -1)
                functions.push(devil.CallBackInfo.create(callBack, target));
        };
        KeyboardManager.prototype.removes = function (keys, callBack, target) {
            this.sort(keys);
            var key = keys.join("|");
            var functions = this._functions[key];
            if (!!functions) {
                var index = devil.CallBackInfo.contains(functions, callBack, target);
                if (index != -1)
                    functions.splice(index, 1);
            }
        };
        KeyboardManager.prototype.callBack = function (keyCode, state) {
            var functions = this._functions[keyCode];
            if (!!functions) {
                var len = functions.length;
                for (var i = 0; i < len; i++) {
                    functions[i].runCallBack(keyCode, state);
                }
            }
        };
        KeyboardManager.prototype.sort = function (keys) {
            keys.sort(function (a, b) {
                if (a > b)
                    return 1;
                else if (a < b)
                    return -1;
                return 0;
            });
        };
        KeyboardManager.prototype.___render = function (interval) {
            if (this._keyDowns.length > 0) {
                this.callBack(this._keyDowns.join("|"), devil.KeyState.KEY_DOWN);
            }
        };
        KeyboardManager.prototype.___pushRender = function (interval) {
            var keyCode;
            for (var i = 0; i < this._pushKeys.length; i++) {
                keyCode = this._pushKeys[i];
                if (this._keyDowns.indexOf(keyCode) == -1) {
                    this._keyDowns.push(keyCode);
                }
            }
            this.sort(this._keyDowns);
            if (this._keyDowns.length > 0)
                devil.Manager.render.add(this.___render, this);
        };
        return KeyboardManager;
    }());
    devil.KeyboardManager = KeyboardManager;
})(devil || (devil = {}));
