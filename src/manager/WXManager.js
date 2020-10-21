var devil;
(function (devil) {
    /**
     * 微信管理器
     * @author        devil
     * @version       V20200906
     * @create        2020-09-06
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var WXManager = /** @class */ (function () {
        function WXManager() {
        }
        WXManager.prototype.onShareAppMessage = function (titles, imageURL) {
            imageURL = !!imageURL ? imageURL : "resource/assets/share/share.png";
            wx.showShareMenu({
                withShareTicket: true,
                menus: ['shareAppMessage', 'shareTimeline']
            });
            wx.onShareAppMessage(function () {
                // 用户点击了“转发”按钮
                return {
                    title: devil.ArrayUtil.random(titles),
                    imageUrl: imageURL,
                    success: function (res) {
                        console.log("share succ");
                    }
                };
            });
        };
        /**
         * 初始化本地缓存数据
         * @param nickName 玩家昵称
         * @param gameName 游戏名字
         * @param maxReceiveCount 默认赠送的免费复活次数，默认为0
         */
        WXManager.prototype.readLocation = function (maxReceiveCount) {
            if (maxReceiveCount === void 0) { maxReceiveCount = 0; }
            var pre = devil.Model.wxGame.userInfo.nickName + "_" + devil.Model.wxGame.gameName + "_";
            var refreshTime = wx.getStorageSync(pre + "refreshTime");
            refreshTime = refreshTime ? refreshTime : 0;
            var date = new Date();
            date.setTime(Number(refreshTime));
            var receiveCount = maxReceiveCount;
            var hasReceiveCount = 0;
            if (devil.DateUtil.disDay(new Date(), date) < 0) {
                receiveCount = wx.getStorageSync(pre + "receiveCount");
                hasReceiveCount = wx.getStorageSync(pre + "hasReceiveCount");
            }
            devil.Model.wxGame.receiveFreeCount = receiveCount ? receiveCount : maxReceiveCount;
            devil.Model.wxGame.hasReceiveFreeCount = hasReceiveCount ? hasReceiveCount : 0;
            this.writeLocation();
        };
        WXManager.prototype.writeLocation = function () {
            this.writeHasReceiveFreeCount();
            this.writeReceiveFreeCount();
        };
        WXManager.prototype.writeReceiveFreeCount = function () {
            var pre = devil.Model.wxGame.userInfo.nickName + "_" + devil.Model.wxGame.gameName + "_";
            wx.setStorageSync(pre + "receiveCount", devil.Model.wxGame.receiveFreeCount);
            wx.setStorageSync(pre + "refreshTime", new Date().getTime());
        };
        WXManager.prototype.writeHasReceiveFreeCount = function () {
            var pre = devil.Model.wxGame.userInfo.nickName + "_" + devil.Model.wxGame.gameName + "_";
            wx.setStorageSync(pre + "hasReceiveCount", devil.Model.wxGame.hasReceiveFreeCount);
            wx.setStorageSync(pre + "refreshTime", new Date().getTime());
        };
        /**
         * 打开其它的小游戏
         * @param appID
         */
        WXManager.prototype.navigateToMiniProgram = function (appID) {
            wx.navigateToMiniProgram({
                appId: appID,
                path: "",
                extraData: {}
            });
        };
        // public loginRank(image:string,x:number,y:number,width:number,height:number,sucess?:()=>void,target?:any):void
        WXManager.prototype.loginRank = function (image, x, y, width, height, game_id, sucess, target) {
            if (this._rank != null)
                return;
            this._rank = this.____login(image, x, y, width, height, game_id, sucess, target);
            //     {
            //         if(Model.wxGame.userInfo == null)
            //         {
            //             let button = wx.createUserInfoButton(
            //                                 {
            //                                     type: 'image',
            //                                     image:image,
            //                                     style: 
            //                                     {
            //                                         left:x,
            //                                         top:y,
            //                                         width: width,
            //                                         height: height
            //                                     }
            //                                 })
            //                 button.onTap((res) => 
            //                 {
            //                     if(res.errMsg=="getUserInfo:ok")
            //                     {
            //                         button.destroy();
            //                         let userInfo = new WXUserInfo();
            //                         userInfo.parse(res.userInfo);
            //                         Model.wxGame.userInfo = userInfo;
            //                         if(!!sucess)sucess.call(target);
            //                     }
            //                     else
            //                     {
            //                         console.log("授权失败")
            //                     }
            //                 })
            //         }
            //         else
            //         {
            //             if(!!sucess)sucess.apply(target);
            //         }
        };
        WXManager.prototype.hideLogin = function () {
            if (this._login != null) {
                this._login.destroy();
                this._login = null;
            }
        };
        WXManager.prototype.hideRank = function () {
            if (this._rank != null) {
                this._rank.destroy();
                this._rank = null;
            }
        };
        WXManager.prototype.showLogin = function () {
            this.login(this._image, this._x, this._y, this._width, this._height, this._game_id, this._success, this._target);
        };
        /**
         * 创建开始按钮
         * @param x 设计尺寸上的水平坐标
         * @param y 设计尺寸上的垂直坐标
         * @param width 设计尺寸的宽度
         * @param height 设计尺寸的高度
         */
        WXManager.prototype.login = function (image, x, y, width, height, game_id, sucess, target) {
            if (this._login != null)
                return;
            this._image = image;
            this._x = x;
            this._y = y;
            this._width = width;
            this._height = height;
            this._game_id = game_id;
            this._success = sucess;
            this._target = target;
            this._login = this.____login(image, x, y, width, height, game_id, sucess, target);
            //             this._image = image;
            //             this._x = x;
            //             this._y = y;
            //             this._width = width;
            //             this._height = height;
            //             this._game_id = game_id;
            //             this._success = sucess;
            //             this._target = target;
            //             let that = this;
            //             let code:any;
            //             let button = wx.createUserInfoButton(
            //                 {
            //                     type: 'image',
            //                     image:image,
            //                     style: 
            //                     {
            //                         left:x/Manager.stage.width * wx.getSystemInfoSync().windowWidth,
            //                         top:y/Manager.stage.height * wx.getSystemInfoSync().windowHeight,
            //                         width:width/Manager.stage.width * wx.getSystemInfoSync().windowWidth,
            //                         height:height/Manager.stage.width * wx.getSystemInfoSync().windowWidth,
            //                     }
            //                 })
            //                 button.onTap((res) => 
            //                 {
            //                     if(res.errMsg=="getUserInfo:ok")
            //                     {
            //                         button.destroy();
            //                         if(Model.wxGame.userInfo == null)
            //                         {
            //                             that.$login(res,game_id);
            //                         }
            //                         if(!!sucess)sucess.call(target,[code]);
            //                     }
            //                     else
            //                     {
            //                         console.log("授权失败")
            //                     }
            //                 })
            //             this._login = button;
            //             wx.login(
            //                 {
            //                     success:(res)=>
            //                     {
            //                         code = res.code;
            //                         Model.wxGame.code = code;
            //                         wx.getSetting(
            //                             {
            //                                 success:(res) =>
            //                                 {
            //                                     if(res.authSetting["scope.userInfo"])
            //                                     {
            //                                         wx.getUserInfo(
            //                                             {
            //                                                 success:(res) =>
            //                                                 {
            //                                                     that.$login(res,game_id);
            //                                                 }
            //                                             }
            //                                         );
            //                                     }
            //                                 }
            //                             });
            //                     }
            //                 }
            //             );
        };
        WXManager.prototype.____login = function (image, x, y, width, height, game_id, sucess, target) {
            var that = this;
            var code;
            console.log("开始按钮");
            var button = wx.createUserInfoButton({
                type: 'image',
                image: image,
                style: {
                    left: x / devil.Manager.stage.width * wx.getSystemInfoSync().windowWidth,
                    top: y / devil.Manager.stage.height * wx.getSystemInfoSync().windowHeight,
                    width: width / devil.Manager.stage.width * wx.getSystemInfoSync().windowWidth,
                    height: height / devil.Manager.stage.width * wx.getSystemInfoSync().windowWidth,
                }
            });
            button.onTap(function (res) {
                if (res.errMsg == "getUserInfo:ok") {
                    //                         button.destroy();
                    that.hideLogin();
                    if (devil.Model.wxGame.userInfo == null) {
                        that.$login(res, game_id, sucess, target, code);
                    }
                    else {
                        if (!!sucess)
                            sucess.call(target, [code]);
                    }
                    console.log("授权成功");
                }
                else {
                    console.log("授权失败");
                }
            });
            wx.login({
                success: function (res) {
                    code = res.code;
                    devil.Model.wxGame.code = code;
                    wx.getSetting({
                        success: function (res) {
                            if (res.authSetting["scope.userInfo"]) {
                                wx.getUserInfo({
                                    success: function (res) {
                                        if (devil.Model.wxGame.userInfo == null)
                                            that.$login(res, game_id, null, null, null);
                                    }
                                });
                            }
                        }
                    });
                }
            });
            return button;
        };
        /**
         * 游戏列表
         */
        WXManager.prototype.gameList = function (callBack, target, appid) {
            if (devil.Model.wxGame.gameList.length > 0) {
                callBack.call(target);
                return;
            }
            var loader = devil.Manager.loader.load(devil.PathInfo.getPath("", devil.LoaderType.TEXT, true, Math.random().toString()), ___list, this, devil.ResourceGCType.NOW);
            loader.post({ "platform_id": 2 });
            function ___list(loader) {
                devil.Manager.loader.remove(loader.getPath(), ___list, this);
                var json = JSON.parse(loader.text);
                devil.Model.wxGame.gameList = json.result;
                for (var i = 0; i < devil.Model.wxGame.gameList.length; i++) {
                    if (appid == devil.Model.wxGame.gameList[i].appid) {
                        devil.Model.wxGame.gameList.splice(i, 1);
                        break;
                    }
                }
                devil.ArrayUtil.randomSort(devil.Model.wxGame.gameList);
                devil.Model.wxGame.gameList = devil.ArrayUtil.sortOn(devil.Model.wxGame.gameList, ["rec_degree"], [1]);
                callBack.call(target);
            }
        };
        /**
         * 会员列表
         */
        WXManager.prototype.playerList = function (gameID, page, limit, callBack, target) {
            var loader = devil.Manager.loader.load(devil.PathInfo.getPath("", devil.LoaderType.TEXT, true, Math.random().toString()), ___list, this, devil.ResourceGCType.NOW);
            loader.post({ "member_id": devil.Model.wxGame.openID, "game_id": gameID, "app_name": "weixin", "platform_id": 2, "page": page, "limit": limit, "order": "desc" });
            function ___list(loader) {
                devil.Manager.loader.remove(loader.getPath(), ___list, this);
                var json = JSON.parse(loader.text);
                devil.Model.wxGame.playerList = json.result.list;
                // Model.wxGame.totalPage = Math.ceil(Number(json.result.total) / Model.wxGame.showCount)
                for (var i = 0; i < devil.Model.wxGame.playerList.length; i++) {
                    console.log("model.wxgame.playerlist", i, devil.Model.wxGame.playerList[i]);
                }
                callBack.call(target);
            }
        };
        /**
         *
         * 初始化开关
         * @param callBack
         * @param target
         * @param id 1.魔法之触
         */
        WXManager.prototype.initCtrl = function (callBack, target, id) {
            if (!!devil.Model.wxGame.gameCtrl) {
                callBack.call(target);
                return;
            }
            var loader = devil.Manager.loader.load(devil.PathInfo.getPath("", devil.LoaderType.TEXT, true, Math.random().toString()), ___init, this, devil.ResourceGCType.NOW);
            loader.post({ "game_id": id });
            function ___init(loader) {
                devil.Manager.loader.remove(loader.getPath(), ___init, this);
                var json = JSON.parse(loader.text);
                devil.Model.wxGame.masterCtrl = json.result.masterCtrl == "1";
                devil.Model.wxGame.gameCtrl = json.result.gameCtrl;
                callBack.call(target);
            }
        };
        /**
         * 登录后台接口
         */
        WXManager.prototype.$login = function (res, game_id, success, target, code) {
            var userInfo = new devil.WXUserInfo();
            userInfo.parse(res.userInfo);
            devil.Model.wxGame.userInfo = userInfo;
            var loader = devil.Manager.loader.load(devil.PathInfo.getPath("", devil.LoaderType.TEXT, true, Math.random().toString()), ___$getMemeber, this, devil.ResourceGCType.NOW);
            loader.post({ "code": devil.Model.wxGame.code, "anonymousCode": "", "app_name": "weixin", "game_id": game_id, "platform_id": 2, "device": "无" });
            function ___$getMemeber(loader) {
                devil.Manager.loader.remove(loader.getPath(), ___$getMemeber, this);
                var json = JSON.parse(loader.text);
                devil.Model.wxGame.openID = json.result.id;
                devil.Model.wxGame.userInfo.maxScore = json.result.score;
                devil.Manager.openContext.saveScore(devil.Model.wxGame.userInfo.maxScore);
                loader = devil.Manager.loader.load(devil.PathInfo.getPath("", devil.LoaderType.TEXT, true, Math.random().toString()), ___$login, this, devil.ResourceGCType.NOW);
                loader.post({ "member_id": devil.Model.wxGame.openID, "userInfo": userInfo });
                devil.Manager.openContext.initFriend(userInfo.nickName, devil.Model.wxGame.userInfo.maxScore, userInfo.avatarUrl);
                if (!!success)
                    success.call(target, [code]);
                function ___$login(loader) {
                    devil.Manager.loader.remove(loader.getPath(), ___$login, this);
                }
            }
        };
        WXManager.prototype.saveScore = function (member_id, score, game_id) {
            devil.Manager.render.add(this.___$saveRender, this, 5000, 1, null, true, member_id, score, game_id);
        };
        WXManager.prototype.___$saveRender = function (interval, member_id, score, game_id) {
            var loader = devil.Manager.loader.load(devil.PathInfo.getPath("", devil.LoaderType.TEXT, true, Math.random().toString()), ___$save, this, devil.ResourceGCType.NOW);
            loader.post({ "member_id": member_id, "score": score, "game_id": game_id, "app_name": "weixin", "platform_id": 2 });
            function ___$save(loader) {
                devil.Model.wxGame.userInfo.maxScore = JSON.parse(loader.text).result.score;
                devil.Manager.openContext.saveScore(devil.Model.wxGame.userInfo.maxScore);
                console.log("用户最高分数", devil.Model.wxGame.userInfo.maxScore);
                devil.Manager.loader.remove(loader.getPath(), ___$save, this);
            }
        };
        return WXManager;
    }());
    devil.WXManager = WXManager;
})(devil || (devil = {}));
