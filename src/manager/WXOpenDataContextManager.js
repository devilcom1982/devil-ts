var devil;
(function (devil) {
    /**
     * 微信开放域管理器
     * @author        devil
     * @version       V20201015
     * @create        2020-10-15
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var WXOpenDataContextManager = /** @class */ (function () {
        function WXOpenDataContextManager() {
            this._closeRects = [];
            this._nextRects = [];
            this._preRects = [];
            this._rankRects = [];
            this._shareCanvas = devil.Manager.component.createImage();
            this._shareCanvas.width = devil.Manager.stage.width;
            this._shareCanvas.height = devil.Manager.stage.height;
        }
        WXOpenDataContextManager.prototype.addCloseRect = function (value) {
            this._closeRects.push(value);
        };
        WXOpenDataContextManager.prototype.addRankRect = function (value) {
            this._rankRects.push(value);
        };
        WXOpenDataContextManager.prototype.addNextRect = function (value) {
            this._nextRects.push(value);
        };
        WXOpenDataContextManager.prototype.addPreRect = function (value) {
            this._preRects.push(value);
        };
        WXOpenDataContextManager.prototype.initFriend = function (nickName, score, avatarUrl) {
            var openDataContext = wx.getOpenDataContext();
            //发送消息
            openDataContext.postMessage({
                type: devil.OpenDataMessageType.INIT_FRIEND_RANK,
                nickname: nickName,
                score: score,
                avatarUrl: avatarUrl
            });
        };
        /**
         * 保存最高分数
         * @param type
         */
        WXOpenDataContextManager.prototype.saveScore = function (score) {
            var openDataContext = wx.getOpenDataContext();
            //发送消息
            openDataContext.postMessage({
                type: devil.OpenDataMessageType.SAVE_DATA,
                value: score
            });
        };
        /**
          * 打开排行榜
          * id  1为好友排行榜 2为世界排行榜 0为未授权
          */
        WXOpenDataContextManager.prototype.showRank = function (id) {
            devil.Model.wxGame.rankShow = true;
            this._shareCanvas.touchEnabled = true;
            console.log("showTank");
            devil.Manager.wx.hideLogin();
            // egret.setTimeout(this.___drawRank, this, 20);
            devil.Manager.render.add(this.___drawRank, this, 20, 1);
            devil.Manager.stage.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___touchBegan, this);
            var openDataContext = wx.getOpenDataContext();
            //发送消息
            openDataContext.postMessage({
                type: devil.OpenDataMessageType.SWITCH_RANK,
                value: devil.Model.wxGame.rankShow,
                id: id,
                players: devil.Model.wxGame.playerList,
                showCount: devil.Model.wxGame.showCount
            });
        };
        WXOpenDataContextManager.prototype.hideRank = function () {
            devil.Model.wxGame.rankShow = false;
            console.log("hideRank");
            devil.Manager.render.remove(this.___drawRank2, this);
            devil.Manager.render.remove(this.___drawRank, this);
            devil.Manager.stage.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.___touchBegan, this);
            devil.Manager.wx.showLogin();
            devil.Manager.wx.hideRank();
            this.clearCanvas();
            var openDataContext = wx.getOpenDataContext();
            //发送消息
            openDataContext.postMessage({
                type: devil.OpenDataMessageType.SWITCH_RANK,
                value: devil.Model.wxGame.rankShow
            });
        };
        WXOpenDataContextManager.prototype.___drawRank = function () {
            this.drawRank();
            devil.Manager.render.add(this.___drawRank2, this, 500, 2);
        };
        WXOpenDataContextManager.prototype.___drawRank2 = function () {
            this.drawRank();
        };
        WXOpenDataContextManager.prototype.drawRank = function () {
            this.clearCanvas();
            var texture = devil.Manager.pool.createTexture();
            texture._setBitmapData(new egret.BitmapData(window["sharedCanvas"]));
            this._shareCanvas.source = texture;
            if (this._shareCanvas.layers[0].parent == null)
                devil.Manager.stage.stage.addChild(this._shareCanvas.layers[0]);
        };
        WXOpenDataContextManager.prototype.clearCanvas = function () {
            console.log("clearCanvas");
            if (!!this._shareCanvas.layers[0].parent) {
                console.log("clearCanvas2");
                this._shareCanvas.removeFromParent();
            }
            console.log("clearCanvas3", this._shareCanvas.layers[0].parent);
        };
        /**
         * 获取世界排行数据
         * @param gameID
         */
        WXOpenDataContextManager.prototype.loadWorldRank = function (gameID) {
            if (devil.Model.wxGame.playerList.length == 0) {
                devil.Manager.wx.playerList(gameID, 1, 100, this.___list, this);
            }
            else {
                this.___list();
            }
        };
        WXOpenDataContextManager.prototype.updatePage = function (next) {
            // Model.wxGame.page = MathUtil.clamb(1,Model.wxGame.totalPage,value);
            devil.Manager.render.add(this.___drawRank, this, 20, 1);
            var openDataContext = wx.getOpenDataContext();
            //发送消息
            openDataContext.postMessage({
                type: devil.OpenDataMessageType.UPDATE_PAGE,
                value: next
            });
        };
        WXOpenDataContextManager.prototype.___list = function () {
            devil.Manager.openContext.showRank(2);
        };
        WXOpenDataContextManager.prototype.___touchBegan = function (e) {
            console.log("____touchBegan", e.stageX, e.stageY);
            var flag = false;
            for (var j = 0; j < this._rankRects.length; j++) {
                if (this._rankRects[j].contains(e.stageX, e.stageY)) {
                    flag = true;
                    break;
                }
            }
            for (var i = 0; i < this._closeRects.length; i++) {
                if (this._closeRects[i].contains(e.stageX, e.stageY)) {
                    this.hideRank();
                    return;
                }
            }
            for (var i = 0; i < this._nextRects.length; i++) {
                console.log("next1", this._nextRects.toString(), e.stageX, e.stageY);
                if (this._nextRects[i].contains(e.stageX, e.stageY)) {
                    console.log("next");
                    this.updatePage(true);
                    return;
                }
            }
            for (var i = 0; i < this._preRects.length; i++) {
                if (this._preRects[i].contains(e.stageX, e.stageY)) {
                    console.log("pre");
                    this.updatePage(false);
                    return;
                }
            }
            if (!flag)
                this.hideRank();
        };
        WXOpenDataContextManager.prototype.switchBest = function (show, x, y, score) {
            if (show) {
                this._shareCanvas.touchEnabled = false;
                devil.Manager.render.add(this.___drawBest, this, 20, 1);
            }
            else {
                this.clearCanvas();
                devil.Manager.render.remove(this.__drawBest, this);
                devil.Manager.render.remove(this.___drawBest, this);
            }
            var openDataContext = wx.getOpenDataContext();
            //发送消息
            openDataContext.postMessage({
                type: devil.OpenDataMessageType.NEXT_FRIEND,
                x: x,
                y: y,
                show: show,
                score: score
            });
        };
        WXOpenDataContextManager.prototype.___drawBest = function () {
            this.drawBest();
            devil.Manager.render.add(this.__drawBest, this, 500, 2);
        };
        WXOpenDataContextManager.prototype.drawBest = function () {
            console.log("显示超越好友视图");
            this.clearCanvas();
            var texture = devil.Manager.pool.createTexture();
            texture._setBitmapData(new egret.BitmapData(window["sharedCanvas"]));
            this._shareCanvas.source = texture;
            if (this._shareCanvas.layers[0].parent == null)
                devil.Manager.stage.stage.addChild(this._shareCanvas.layers[0]);
        };
        WXOpenDataContextManager.prototype.__drawBest = function () {
            this.drawBest();
        };
        return WXOpenDataContextManager;
    }());
    devil.WXOpenDataContextManager = WXOpenDataContextManager;
})(devil || (devil = {}));
