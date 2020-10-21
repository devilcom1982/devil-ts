declare namespace devil {
    /**
     * 自定义动画数据
     * @author anydo
     * @version V20180811
     * @create 2018-03-01
     * @place guangzhou
     * @update devil 整理 2018-08-11
     */
    class AnimationFrameData implements IPool {
        offX: number;
        offY: number;
        texture: egret.Texture;
        pool(): void;
        reuse(): void;
        unuse(): void;
        dispose(): void;
        static create(offX: number, offY: number, texture: egret.Texture): AnimationFrameData;
    }
}
