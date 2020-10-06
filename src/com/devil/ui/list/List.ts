namespace devil
{
	/**
     * List组件
	 * @author        devil
	 * @version       V20181225
	 * @create        2018-12-25
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class List extends Container
    {
			/**
			 * 方向垂直 
			 */		
			public static VERTICAL:number = 1;
			/**
			 * 水平方向 
			 */		
			public static HORIZONTAL:number = 2;

			private _scrollPolicyV:ScrollPolicy;
			private _scrollPolicyH:ScrollPolicy;
			private _container:IListContainer;
			private _scroll:ScrollBar;
			private _layout:number;
			private _layer:egret.DisplayObjectContainer;

			public get scrollPolicyV()
			{
				return this._scrollPolicyV;
			}
			public set scrollPolicyV(value:ScrollPolicy)
			{
				if(this._scrollPolicyV == value)return;
				this._scrollPolicyV = value;
				// this._scroll.checkScrollPolicy();
			}

			public get scrollPolicyH()
			{
				return this._scrollPolicyH;
			}

			public set scrollPolicyH(value:ScrollPolicy)
			{
				if(this._scrollPolicyH == value)return;
				this._scrollPolicyH = value;
				// this._scroll.checkScrollPolicy();
			}

			public get container()
			{
				return this._container;
			}

			public set container(value:IListContainer)
			{
				if(this._container == value)return;
				this._container = value;
				this._container.setSize(this._width,this._height);
				let temp:any = this._container;
				this.addChild(<Container>temp,this._layer);
				this._scroll.list = this;
			}

			public get layout()
			{
				return this._layout;
			}
			public set layout(value:number)
			{
				this._layout = value;
			}

			public set bounces(value:boolean)
			{
				this._scroll.bounces = value;
			}

			public constructor()
			{
				super();
				this._type = ComponentType.LIST;
			}

			protected initLayer():void
			{
				this._layer = this.createLayer();
			}

			protected start():void
			{
				super.start();
				this._scroll = Manager.pool.create(ScrollBar);
				this._scrollPolicyH = ScrollPolicy.OFF;
				this._scrollPolicyV = ScrollPolicy.AUTO;
				this._layout = List.VERTICAL;
			}

			public unuse():void
			{
				this._scroll.pool();
				this._scroll = null;
				this._container = null;
				this._layer = null;
				super.unuse();
			}

			public dispose():void
			{
				this._scroll.pool();
				this._scroll = null;
				this._container = null;
				this._layer = null;
				super.dispose();
			}
    }
}