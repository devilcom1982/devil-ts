declare let wx:any;
namespace devil
{
    /**
     * 微信管理器
     * @author        devil
     * @version       V20200906
     * @create        2020-09-06
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    export class WXManager
    {
        public constructor()
        {
        }

        /**
         * 发送朋友设置
         * @param titles    分享时设置的标题
         * @param imageURL  分享图片设置，默认值为resource/assets/share/share.png(330*237)
         */
        public onShareAppMessage(titles:string[],imageURL?:string):void
        {
            imageURL = !!imageURL ? imageURL: "resource/assets/share/share.png"
            wx.showShareMenu
            (
                {
                    withShareTicket: true,
                    menus: ['shareAppMessage', 'shareTimeline']
                }
            )


            wx.onShareAppMessage(() => 
            {
                // 用户点击了“转发”按钮
                return {
                  title: ArrayUtil.random(titles),
                  imageUrl: imageURL,
                  success: function (res) 
                  {
                    console.log("share succ")
                  }
                }
              })
        }

        /**
         * 初始化本地缓存数据
         * @param nickName 玩家昵称
         * @param gameName 游戏名字
         * @param maxReceiveCount 默认赠送的免费复活次数，默认为0
         */
        public readLocation(maxReceiveCount:number = 0):void
        {
            // let pre:string = Model.wxGame.nickName + "_" + Model.wxGame.gameName + "_";
            let pre:string = Model.wxGame.userInfo.nickName + "_" + Model.wxGame.gameName + "_";
            let refreshTime = wx.getStorageSync(pre + "refreshTime");
            refreshTime = refreshTime?refreshTime:0;
            let date = new Date();
            date.setTime(Number(refreshTime));
            let receiveCount = maxReceiveCount;
            let hasReceiveCount = 0;
            if(DateUtil.disDay(new Date(),date) < 0)
            {
                receiveCount = wx.getStorageSync(pre + "receiveCount");
                hasReceiveCount = wx.getStorageSync(pre + "hasReceiveCount");
            }
            Model.wxGame.receiveFreeCount = receiveCount ? receiveCount : maxReceiveCount;
            Model.wxGame.hasReceiveFreeCount = hasReceiveCount ? hasReceiveCount : 0;
            this.writeLocation();
        }

        public writeLocation():void
        {
            this.writeHasReceiveFreeCount();
            this.writeReceiveFreeCount();
        }

        public writeReceiveFreeCount():void
        {
            // let pre:string = Model.wxGame.nickName + "_" + Model.wxGame.gameName + "_";
            let pre:string = Model.wxGame.userInfo.nickName + "_" + Model.wxGame.gameName + "_";
            console.log("中华人民共和国",Model.wxGame.receiveFreeCount)
            wx.setStorageSync(pre + "receiveCount",Model.wxGame.receiveFreeCount);
            wx.setStorageSync(pre + "refreshTime",new Date().getTime());
        }

        public writeHasReceiveFreeCount():void
        {
            // let pre:string = Model.wxGame.nickName + "_" + Model.wxGame.gameName + "_";
            let pre:string = Model.wxGame.userInfo.nickName + "_" + Model.wxGame.gameName + "_";
            wx.setStorageSync(pre + "hasReceiveCount",Model.wxGame.hasReceiveFreeCount);
            wx.setStorageSync(pre + "refreshTime",new Date().getTime());
        }
        
        /**
         * 打开其它的小游戏
         * @param appID 
         */
        public navigateToMiniProgram(appID:string):void
        {
            wx.navigateToMiniProgram({
                appId: appID,
                path: "",
                extraData: {}
            })
        }

        public loginRank(image:string,x:number,y:number,width:number,height:number,sucess?:()=>void,target?:any):void
        {
            if(Model.wxGame.userInfo == null)
            {
                let button = wx.createUserInfoButton(
                                    {
                                        type: 'image',
                                        image:image,
                                        style: 
                                        {
                                            left:x,
                                            top:y,
                                            width: width,
                                            height: height
                                        }
                                    })
                    button.onTap((res) => 
                    {
                        if(res.errMsg=="getUserInfo:ok")
                        {
                            button.destroy();
                            let userInfo = new UserInfo();
                            userInfo.parse(res.userInfo);
                            Model.wxGame.userInfo = userInfo;
                            if(!!sucess)sucess.call(target);
    
                        }
                        else
                        {
                            console.log("授权失败")
                        }
                    })
            }
            else
            {
                if(!!sucess)sucess.apply(target);
            }
        }

        /**
         * 创建开始按钮
         * @param x 设计尺寸上的水平坐标
         * @param y 设计尺寸上的垂直坐标
         * @param width 设计尺寸的宽度
         * @param height 设计尺寸的高度
         */
        public login(image:string,x:number,y:number,width:number,height:number,sucess?:(code:any)=>void,target?:any):void
        {
            let code:any;
            let button = wx.createUserInfoButton(
                {
                    type: 'image',
                    image:image,
                    style: 
                    {
                        left:x/Manager.stage.width * wx.getSystemInfoSync().windowWidth,
                        top:y/Manager.stage.height * wx.getSystemInfoSync().windowHeight,
                        width:width/Manager.stage.width * wx.getSystemInfoSync().windowWidth,
                        height:height/Manager.stage.width * wx.getSystemInfoSync().windowWidth,
                    }
                })
                button.onTap((res) => 
                {
                    if(res.errMsg=="getUserInfo:ok")
                    {
                        button.destroy();
                        if(Model.wxGame.userInfo == null)
                        {
                            let userInfo = new UserInfo();
                            userInfo.parse(res.userInfo);
                            Model.wxGame.userInfo = userInfo;
                        }
                        if(!!sucess)sucess.call(target,[code]);

                    }
                    else
                    {
                        console.log("授权失败")
                    }
                })

            wx.login(
                {
                    success:(res)=>
                    {
                        code = res.code;
                        wx.getSetting(
                            {
                                success:(res) =>
                                {
                                    if(res.authSetting["scope.userInfo"])
                                    {
                                        wx.getUserInfo(
                                            {
                                                success:(res) =>
                                                {
                                                    let userInfo = new UserInfo();
                                                    userInfo.parse(res.userInfo);
                                                    Model.wxGame.userInfo = userInfo;
                                                }
                                            }
                                        );
                                    }
                                }
                            });
                    }
                }
            );


        }

    //     public login(image:string,x:number,y:number,width:number,height:number,sucess?:()=>void,target?:any):void
    //     {
    //         let that = this;
    //         let code:any;
    //         // wx.login(
    //         //     {
    //         //         success:(res) => 
    //         //         {
    //         //             code = res.code;
    //         //         }
    //         //     }
    //         // );
    //         // let button = wx.createUserInfoButton(
    //             //                 {
    //             //                     type: 'image',
    //             //                     image:image,
    //             //                     style: 
    //             //                     {
    //             // //                         left: wx.getSystemInfoSync().windowWidth/2-70,
    //             // //                         top: wx.getSystemInfoSync().windowHeight/2,
    //             //                         left:x,
    //             //                         top:y,
    //             //                         width: width,
    //             //                         height: height
    //             // //                         lineHeight: 40,
    //             // //                         backgroundColor: '#ff0000',
    //             // //                         color: '#ffffff',
    //             // //                         textAlign: 'center',
    //             // //                         fontSize: 16,
    //             // //                         borderRadius: 4
    //             //                     }
    //             //                 })
    //         //                 button.onTap((res) => 
    //         //                 {
    //         //                         if(res.errMsg=="getUserInfo:ok")
    //         //                         {
    //         //                             button.destroy();
    //         //                             wx.login(
    //         //                             {
    //         //                                 success:(res2) => 
    //         //                                 {
    //         //                                     let code = res2.code;
    //         //                                     let userInfo = new UserInfo();
    //         //                                     userInfo.parse(res.userInfo);
    //         //                                     Model.wxGame.userInfo = userInfo;
    //         //                                     if(!!sucess)sucess.call(target);
    //         //                                 }
    //         //                             });

    //         //                         }
    //         //                         else
    //         //                         {
    //         //                             console.log("授权失败")
    //         //                         }
    //         //                     })
    //         wx.login(
    //             {
    //                 success:(res) => 
    //                 {
    //                     let code = res.code;
    //                     wx.getSetting(
    //                         {
    //                             success:(res) =>
    //                             {
    //                                 if(res.authSetting["scope.userInfo"])
    //                                 {
    //                                     wx.getUserInfo(
    //                                         {
    //                                             success:(res) =>
    //                                             {
    //                                                 let userInfo = new UserInfo();
    //                                                 userInfo.parse(res.userInfo);
    //                                                 if(!!sucess)sucess.call(target);
    //                                             }
    //                                         }
    //                                     );
    //                                 }
    //                                 else
    //                                 {
    //                                     // button = wx.createUserInfoButton(
    //                                     //                     {
    //                                     //                         type: 'image',
    //                                     //     //                     image: !!image ? image : '点击授权游戏',
    //                                     //                         image:image,
    //                                     //                         style: 
    //                                     //                         {
    //                                     //                             left: wx.getSystemInfoSync().windowWidth/2-70,
    //                                     //                             top: wx.getSystemInfoSync().windowHeight/2,
    //                                     //                             width: 140,
    //                                     //                             height: 40,
    //                                     //                             lineHeight: 40,
    //                                     //     //                         backgroundColor: '#ff0000',
    //                                     //                             color: '#ffffff',
    //                                     //                             textAlign: 'center',
    //                                     //                             fontSize: 16,
    //                                     //                             borderRadius: 4
    //                                     //                         }
    //                                     //                     })

    //                                 //   button.onTap((res) => 
    //                                 //                 {
    //                                 //                         if(res.errMsg=="getUserInfo:ok")
    //                                 //                         {
    //                                 //                             button.destroy();
    //                                 //                             let userInfo = new UserInfo();
    //                                 //                             userInfo.parse(res.userInfo);
    //                                 //                             if(!!sucess)sucess.call(target);

    //                                 //                         }
    //                                 //                         else
    //                                 //                         {
    //                                 //                             console.log("授权失败")
    //                                 //                         }
    //                                 //                     })
    //                                 }
    //                             }
    //                         }
    //                     );
    //                 }
    //             }
    //         )
    //         let button = wx.createUserInfoButton(
    //             {
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
    //             button.onTap((res) => 
    //                             {
    //                                     if(res.errMsg=="getUserInfo:ok")
    //                                     {
    //                                         button.destroy();
    //                                         if(Model.wxGame.userInfo == null)
    //                                         {
    //                                             let userInfo = new UserInfo();
    //                                             userInfo.parse(res.userInfo);
    //                                         }
    //                                         if(!!sucess)sucess.call(target);
    //                                         // wx.login(
    //                                         // {
    //                                         //     success:(res2) => 
    //                                         //     {
    //                                         //         let code = res2.code;
    //                                         //         let userInfo = new UserInfo();
    //                                         //         userInfo.parse(res.userInfo);
    //                                         //         Model.wxGame.userInfo = userInfo;
    //                                         //         if(!!sucess)sucess.call(target);
    //                                         //     }
    //                                         // });
    
    //                                     }
    //                                     else
    //                                     {
    //                                         console.log("授权失败")
    //                                     }
    //                                 })
    } 
}