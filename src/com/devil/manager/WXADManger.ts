namespace devil 
{
    /**
     * 广告管理器
     * @author        devil
     * @version       V20200909
     * @create        2020-09-09
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    export class WXADManger
    {
        private _jili:any;
        private _banner:any;
        private _chaping:any;
        private _bannerShow:boolean;

        // public get bannerShow()
        // {
        //     return this._bannerShow;
        // }

        public setup(bannerID:string,jiliID:string,chapingID:string):void
        {
            this._banner = false;
            this.createBanner(bannerID);
            this.createJiLi(jiliID);
            this.createChaPing(chapingID);
        }

        private createBanner(bannerID:string):void
        {
            let windowWidth = wx.getSystemInfoSync().windowWidth;
            let windowHeight = wx.getSystemInfoSync().windowHeight;
            let width = Math.min(windowWidth, 300);
            // 创建 Banner 广告实例，提前初始化
            let ad = wx.createBannerAd(
                {
                    adUnitId: bannerID,
                    adIntervals:30,
                    style: 
                    {
                        left:0,
                        top:0,
                        width:width,
                    }
                })
                ad.onResize(size =>
                {
                    ad.style.left = (windowWidth - size.width) >> 1;
                    ad.style.top = windowHeight - size.height;
                });
                ad.onError(err => {
                console.log(err)
                })
            this._banner = ad;
        }

        private createJiLi(jiliID:string):void
        {
            let ad = wx.createRewardedVideoAd(
                {
                    adUnitId: jiliID
                });
                ad.onError(err => 
                {
                    console.log(err);
                    // callBack.apply(target,true);
                })
            this._jili = ad;
        }

        private createChaPing(chapingID:string):void
        {
            let ad;
            // 定义插屏广告
            // 创建插屏广告实例，提前初始化
            if (wx.createInterstitialAd)
            {
                ad = wx.createInterstitialAd
                (
                    {
                        adUnitId:chapingID
                    }
                )
                ad.onError(err => 
                {
                    console.log(err)
                })
            }
            this._chaping = ad;
        }

        /**
         * 打开激励广告
         */
        public openJiLi(callBack:(isEnd:boolean)=>void,target:any):void
        {
            let ad = this._jili;
            // 用户触发广告后，显示激励视频广告
            ad.show().catch(() => {
            // 失败重试
            ad.load()
                .then(() => ad.show())
                .catch(err => 
                {
                    console.log('激励视频 广告显示失败');
                    callBack.apply(target,[true]);
                })
            })

            ad.onClose(res => {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined)
                {
                // 正常播放结束，可以下发游戏奖励
                    callBack.apply(target,[true]);
                }
                else 
                {
                    // 播放中途退出，不下发游戏奖励
                    callBack.apply(target,[false]);
                }
            })
        }

        /**
         * 打开插屏广告
         */
        public openChaPing():void
        {
            let ad = this._chaping;
            // 在适合的场景显示插屏广告
            if (ad) 
            {
                ad.show().catch((err) => 
                {
                    console.error(err)
                })
            }
        }

        /**
         * 打开或关闭Banner广告
         * @param show 
         */
        public switchBanner(show:boolean):void
        {
            if(this._bannerShow == show)return;
            this._bannerShow = show;
            if(this._banner != null)
            {
                if(!show)this._banner.hide();
                else this._banner.show();
            }
        }
    }
}