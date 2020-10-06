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
    export class AnimationData implements IPool
    {
        private _texture:egret.Texture;
        private _frameJsons:AnimationFrameJson[];
        private _frames:any;

        /**
         * 动画总帧数
         */
        public totalFrames:number;

        public constructor()
        {
            this.start();
        }

        private start():void
        {
            this._frameJsons = [];
            this._frames = {};
        }

        private parseJson(json:any):void
        {
            if(json == null) return;
            let key:string;
            for(key in json.mc) break;
            let offsetArr:any[] = json.mc[key].frames;
            this.totalFrames = offsetArr.length;
            let frameName:string;
            let offX:number;
            let offY:number;
            let rectObj:any;
            let oneJson:AnimationFrameJson;
            for(let i:number = 0; i < this.totalFrames; i++)
            {
                frameName = offsetArr[i].res;
                offX = offsetArr[i].x;
                offY = offsetArr[i].y;
                rectObj = json.res[frameName];
                oneJson = AnimationFrameJson.create(frameName, offX, offY, rectObj);
                this._frameJsons.push(oneJson);
            }
        }

        public getKeyFrameData(frame:number):AnimationFrameData
        {
            if(this._frames[frame] == null)
            {
                this.createFrameData(frame);
            }
            return this._frames[frame];
        }


        private createFrameData(frame:number):void
        {
            let frameJson:AnimationFrameJson = this._frameJsons[frame - 1];
            let rectObj:any = frameJson ? frameJson.rectObj : {x:0, y:0, w:1, h:1};
            let texture:egret.Texture = Manager.pool.createTexture();
            texture.bitmapData = this._texture.bitmapData;
            texture.disposeBitmapData = false;
            texture.$initData(rectObj.x, rectObj.y, rectObj.w, rectObj.h, 0, 0, rectObj.w, rectObj.h, this._texture.bitmapData.width, this._texture.bitmapData.height);
            this._frames[frame] = AnimationFrameData.create(frameJson ? frameJson.offX : 0,frameJson ? frameJson.offY : 0, texture);
        }

        public reuse():void
        {
            this.start();
        }

        public unuse():void
        {
            let len:number = this._frameJsons.length;
            for(let i:number = 0; i < len; i++)
            {
                this._frameJsons[i].pool();
            }
            this._frameJsons = null;
            for(let frame in this._frames)
            {
                this._frames[frame].pool();
                delete this._frames[frame];
            }
            this._frames = null;
            this.totalFrames = 0;
            if(this._texture) 
            {
                // this._texture.dispose();
                Manager.pool.pushTexture(this._texture);
                this._texture = null;
            }
        }

        public pool():void
        {
            Manager.pool.push(this);
        }

        public dispose():void
        {
            this.unuse();
        }

        public static create(bitmapData:egret.BitmapData,json:any):AnimationData
        {
            let texture:egret.Texture = Manager.pool.createTexture();
            texture.bitmapData = bitmapData;
            let result:AnimationData = Manager.pool.create(AnimationData);
            result._texture = texture;
            result.parseJson(json);
            return result;

        }
    }
}
