var devil;
(function (devil) {
    /**
     * 广告管理器
     * @author        devil
     * @version       V20200909
     * @create        2020-09-09
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    var WXADManger = /** @class */ (function () {
        function WXADManger() {
            this._testAD = true;
        }
        WXADManger.prototype.setup = function (bannerID, jiliID, chapingID) {
            this._banner = false;
            this.createBanner(bannerID);
            this.createJiLi(jiliID);
            this.createChaPing(chapingID);
        };
        WXADManger.prototype.createBanner = function (bannerID) {
            if (this._testAD)
                return;
            var windowWidth = wx.getSystemInfoSync().windowWidth;
            var windowHeight = wx.getSystemInfoSync().windowHeight;
            var width = Math.min(windowWidth, 300);
            // 创建 Banner 广告实例，提前初始化
            var ad = wx.createBannerAd({
                adUnitId: bannerID,
                adIntervals: 30,
                style: {
                    left: 0,
                    top: 0,
                    width: width,
                }
            });
            ad.onResize(function (size) {
                ad.style.left = (windowWidth - size.width) >> 1;
                ad.style.top = windowHeight - size.height;
            });
            ad.onError(function (err) {
                console.log(err);
            });
            this._banner = ad;
        };
        WXADManger.prototype.createJiLi = function (jiliID) {
            if (this._testAD)
                return;
            var ad = wx.createRewardedVideoAd({
                adUnitId: jiliID
            });
            ad.onError(function (err) {
                console.log(err);
                // callBack.apply(target,true);
            });
            this._jili = ad;
        };
        WXADManger.prototype.createChaPing = function (chapingID) {
            if (this._testAD)
                return;
            var ad;
            // 定义插屏广告
            // 创建插屏广告实例，提前初始化
            if (wx.createInterstitialAd) {
                ad = wx.createInterstitialAd({
                    adUnitId: chapingID
                });
                ad.onError(function (err) {
                    console.log(err);
                });
            }
            this._chaping = ad;
        };
        /**
         * 打开激励广告
         */
        WXADManger.prototype.openJiLi = function (callBack, target) {
            if (this._testAD)
                return;
            // return;
            var ad = this._jili;
            // 用户触发广告后，显示激励视频广告
            ad.show().catch(function () {
                // 失败重试
                ad.load()
                    .then(function () { return ad.show(); })
                    .catch(function (err) {
                    console.log('激励视频 广告显示失败');
                    callBack.apply(target, [true]);
                });
            });
            ad.onClose(function (res) {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    callBack.apply(target, [true]);
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                    callBack.apply(target, [false]);
                }
            });
        };
        /**
         * 打开插屏广告
         */
        WXADManger.prototype.openChaPing = function () {
            if (this._testAD)
                return;
            // return;
            var ad = this._chaping;
            // 在适合的场景显示插屏广告
            if (ad) {
                ad.show().catch(function (err) {
                    console.error(err);
                });
            }
        };
        /**
         * 打开或关闭Banner广告
         * @param show
         */
        WXADManger.prototype.switchBanner = function (show) {
            if (this._testAD)
                return;
            if (this._bannerShow == show)
                return;
            this._bannerShow = show;
            if (this._banner != null) {
                if (!show)
                    this._banner.hide();
                else
                    this._banner.show();
            }
        };
        return WXADManger;
    }());
    devil.WXADManger = WXADManger;
})(devil || (devil = {}));
