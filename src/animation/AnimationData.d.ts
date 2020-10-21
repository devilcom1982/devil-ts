declare namespace devil {
    /**
     * 自定义动画数据
     * @author anydo
     * @version V20180811
     * @create 2018-03-01
     * @place guangzhou
     * @update devil 整理 2018-08-11
     */
    class AnimationData implements IPool {
        private _texture;
        private _frameJsons;
        private _frames;
        /**
         * 动画总帧数
         */
        totalFrames: number;
        constructor();
        private start;
        private parseJson;
        getKeyFrameData(frame: number): AnimationFrameData;
        private createFrameData;
        reuse(): void;
        unuse(): void;
        pool(): void;
        dispose(): void;
        static create(bitmapData: egret.BitmapData, json: any): AnimationData;
    }
}
