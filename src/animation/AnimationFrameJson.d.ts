declare namespace devil {
    /**
     * 自定义动画数据
     * @author anydo
     * @version V20180811
     * @create 2018-03-01
     * @place guangzhou
     * @update devil 整理 2018-08-11
     */
    class AnimationFrameJson implements IPool {
        frameName: string;
        offX: number;
        offY: number;
        rectObj: any;
        reuse(): void;
        unuse(): void;
        pool(): void;
        dispose(): void;
        static create(frameName: string, offX: number, offY: number, rectObj: any): AnimationFrameJson;
    }
}
