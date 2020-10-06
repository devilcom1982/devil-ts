namespace devil
{
    /**
     * 自定义动画数据
     * @author anydo
     * @version V20180811
     * @create 2018-03-01
     * @place guangzhou
     * @update devil 整理 2018-08-11
     */
    export class AnimationFrameJson implements IPool
    {
        public frameName:string;
        public offX:number;
        public offY:number;
        public rectObj:any;
    
        public reuse():void
        {
        }
    
        public unuse():void
        {
            this.offX = 0;
            this.offY = 0;
            this.frameName = "";
            this.rectObj = null;
        }

        public pool():void
        {
            return Manager.pool.push(this);
        }
    
        public dispose():void
        {
            this.unuse();
        }

        public static create(frameName:string, offX:number, offY:number, rectObj:any):AnimationFrameJson
        {
            let result:AnimationFrameJson = Manager.pool.create(AnimationFrameJson);
            result.frameName = frameName;
            result.offX = offX;
            result.offY = offY;
            result.rectObj = rectObj;
            return result;
        }
    }
}
