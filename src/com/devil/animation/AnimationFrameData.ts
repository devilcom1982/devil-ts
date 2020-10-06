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
    export class AnimationFrameData implements IPool
    {
        public offX:number;
        public offY:number;
        public texture:egret.Texture;

        public pool():void
        {
            Manager.pool.push(this);
        }

        public reuse():void
        {
        }

        public unuse():void
        {
            this.offX = 0;
            this.offY = 0;
            Manager.pool.pushTexture(this.texture);
            this.texture = null;
        }

        public dispose():void
        {
            this.unuse();
        }

        public static create(offX:number, offY:number, texture:egret.Texture):AnimationFrameData
        {
            let result:AnimationFrameData = Manager.pool.create(AnimationFrameData);
            result.offX = offX;
            result.offY = offY;
            result.texture = texture;
            return result;
        }
    }
}