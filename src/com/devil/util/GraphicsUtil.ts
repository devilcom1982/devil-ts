namespace devil
{
	/**
     * 绘图工具类
	 * @author        devil
	 * @version       V20190131
	 * @create        2019-01-31
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class GraphicsUtil
    {
        
        public static createRectSprite(x:number,y:number,width:number,height:number,color:number = 0,alpha:number = 1):egret.Sprite
        {
            let result:egret.Sprite = Manager.pool.createSprite();
            this.drawRect(result.graphics,x,y,width,height,color,alpha);
            return result;
        }
        
        public static createRectShape(x:number,y:number,width:number,height:number,color:number = 0,alpha:number = 1):egret.Shape
        {
            let result:egret.Shape = Manager.pool.createShape();
            this.drawRect(result.graphics,x,y,width,height,color,alpha);
            return result;
        }
        
        public static drawRect(graphics:egret.Graphics,x:number,y:number,width:number,height:number,color:number = 0,alpha:number = 1):void
        {
            graphics.clear();
            graphics.beginFill(color,alpha);
            graphics.drawRect(x,y,width,height);
            graphics.endFill();
        }

        public static createCircleSprite(x:number,y:number,radius:number,color:number = 0,alpha:number = 1):egret.Sprite
        {
            let result:egret.Sprite = Manager.pool.createSprite();
            this.drawCircle(result.graphics,x,y,radius,color,alpha);
            return result;
        }

        public static createCircleShape(x:number,y:number,radius:number,color:number = 0,alpha:number = 1):egret.Shape
        {
            let result:egret.Shape = Manager.pool.createShape();
            this.drawCircle(result.graphics,x,y,radius,color,alpha);
            return result;
        }

        public static drawCircle(graphics:egret.Graphics,x:number,y:number,radius:number,color:number = 0,alpha:number = 1):void
        {
            graphics.clear();
            graphics.beginFill(color,alpha);
            graphics.drawCircle(x,y,radius);
            graphics.endFill();
        }

        public static createRectBoderShape(x:number,y:number,width:number,height:number,color:number = 0,alpha:number):egret.Shape
        {
            let result:egret.Shape = Manager.pool.createShape();
            result.graphics.lineStyle(.1,color);
            result.graphics.drawRect(x,y,width,height);
            return result;
        }

		/**
		 * 绘制弧形
		 * @param graphics
		 * @param x
		 * @param y
		 * @param r
		 * @param color
		 * @param angle			角度，以度为单位
		 * @param startFrom		
		 */
        public static drawSector(graphics:egret.Graphics, x:number, y:number, r:number, color:number, angle:number, startFrom:number):void
        {
            graphics.clear();
            graphics.beginFill(color, 1);
            graphics.lineStyle(0, color);
            graphics.moveTo(x,y);
            angle = (Math.abs(angle)>360)?360:angle;
            let n:number = Math.ceil(Math.abs(angle)/45);
            let angleA:number = angle/n;
            angleA = angleA*Math.PI/180;
            startFrom = startFrom*Math.PI/180;
            graphics.lineTo(x+r*Math.cos(startFrom),y+r*Math.sin(startFrom));
            for (let i=1; i<=n; i++)
            {
                startFrom+=angleA;
                let angleMid=startFrom-angleA/2;
                let bx=x+r/Math.cos(angleA/2)*Math.cos(angleMid);
                let by=y+r/Math.cos(angleA/2)*Math.sin(angleMid);
                let cx=x+r*Math.cos(startFrom);
                let cy=y+r*Math.sin(startFrom);
                graphics.curveTo(bx,by,cx,cy);
            }
            if(angle!=360)
            {
                graphics.lineTo(x,y);
            }
            graphics.endFill();
        }

		/**
		 * 画虚线 
		 * @param graphics
		 * @param x
		 * @param y
		 * @param dashedWidth		虚线线段的长度
		 * @param space				虎线线段间距
		 * @param width				整个虚线的宽度
		 * @param color
		 * @param alpha
		 */		
        public static drawDashed(graphics:egret.Graphics,x:number,y:number,dashedWidth:number,space:number,width:number,color:number = 0,alpha:number = 1):void
		{
			graphics.clear();
            let count:number = Math.ceil(width / (dashedWidth + space));
			graphics.lineStyle(1,color,alpha);
            let startX:number = x;
            for(let i:number = 0 ; i < count; i ++)
			{
				startX = i * (dashedWidth + space) + x;
				graphics.moveTo(startX,y);
				graphics.lineTo(startX + dashedWidth,y);
			}
		}
    }
}