namespace devil
{
	/**
	 * 组件基类，所有的组件都需要继承此类
	 * @author        devil
	 * @version       V20181225
	 * @create        2018-12-25
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class Component extends View
    {
		protected _type:number;
		protected _styles;
		protected _stylesOffset;

		/**
		 * 组件类型，对应的常量ComponentType
		 */		
		public get type()
		{
			return this._type;
		}

		public constructor()
		{
			super();
		}

		/**
		 * @private 
		 */		
		protected start():void
		{
			super.start();
			this._styles = {};
			this._stylesOffset = {};
			this._layerID = 0;
			this.setDefaultStyle();
		}

		/**
		 * 设置缺省样式 
		 */		
		protected setDefaultStyle():void
		{
			
		}

		/**
		 * 获取指定名字的样式皮肤字符串 
		 * @param name		StyleName常量或自定义的特殊样式名
		 */		
		public getStyle(name:string):any
		{
			return this._styles[name];
		}
		
		protected getImageData(styleName:string):ResourceItem
		{
			return Model.resConfig.getResourceItem(this.getStyle(styleName));
		}

		/**
		 * 设置指定名字的样式皮肤字符串 
		 * @param name		StyleName常量或自定义的特殊样式名
		 * @param value		皮肤字符串
		 */		
		public setStyle(name:string,value:any):void
		{
			if(this._styles[name] == value)return;
			this._styles[name] = value;
			this.invalidate(InvalidationType.STYLE);
		}
		/**
		 * 设置指定名字的样式便宜
		 * @param name		StyleName常量或自定义的特殊样式名
		 */
		public setStyleOffset(name:string,xOffset:number, yOffset:number):void
		{
			this._stylesOffset[name] = [xOffset, yOffset];
			this.invalidate(InvalidationType.STYLE);
		}
		/**
		 * 设置指定名字的样式便宜
		 * @param name		StyleName常量或自定义的特殊样式名
		 */
		public getStyleXoffset(name:string):number
		{
			let offset:number[] = this._stylesOffset[name];
			return offset ? offset[0] : 0;
		}
		/**
		 * 设置指定名字的样式便宜
		 * @param name		StyleName常量或自定义的特殊样式名
		 */
		public getStyleYoffset(name:string):number
		{
			let offset:number[] = this._stylesOffset[name];
			return offset ? offset[1] : 0;
		}

		public unuse():void
		{
			for(let key in this._styles)
			{
                this._styles[key] = null;
			}
			this._styles = null;
			this._stylesOffset = null;
			super.unuse();
		}

		public dispose():void
		{
			for(let key in this._styles)
			{
                this._styles[key] = null;
			}
			this._styles = null;
			this._stylesOffset = null;
			super.dispose();
		}
    }
}