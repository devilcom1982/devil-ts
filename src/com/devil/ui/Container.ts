namespace devil
{
	/**
	 * 容器
	 * @author        devil
	 * @version       V20181225
	 * @create        2018-12-25
	 * @update        devil 2019-03-15  创建层时会重新设置层的坐标
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
	 */	
    export class Container extends Component
    {
		protected _numChildren:number;
        protected _children:View[];
        
		/**
		 * 容器孩子的数量
		 */
		public get numChildren()
		{
			return this._numChildren;
        }
        
		public constructor()
		{
            super();
            this._type = ComponentType.CONTAINER;
        }
        
		/**
		 * @private
		 */		
		protected start():void
		{
			this._children = [];
			super.start();
            this._numChildren = 0;
			this._width = ComponentDefault.CONTAINER_WIDTH;
			this._height = ComponentDefault.CONTAINER_HEIGHT;
        }
        
		/**
		 * 删除指定的子对象 ,同时会触发布局无效标识，如果需要在子类需写drawLayout方法
		 * @param child	子对象
		 * @param unuse 删除的同时是否回收子对象
		 */		
		public removeChild(child:View,unuse:Boolean):void
		{
            if(child != null && child.parent != null)
            {
                let index:number = this._children.indexOf(child);
                this.removeChildAt(index,unuse);
            }
        }
        
	    /**
		 * 删除指定索引值位置的元素,同时会触发布局无效标识，如果需要在子类需写drawLayout方法
		 */
		public removeChildAt(index:number,unuse:Boolean):void
		{
			if(MathUtil.isBetween(0,this._numChildren - 1,index))
			{
				let child:View = this._children[index];
				if(child.parent == this)
				{
					if(unuse)child.pool();
					else 
					{
						child.removeFromParent();
					}
					child.parent = null;
					let index:number = this._children.indexOf(child);
					if(index != -1)
					{
						this._numChildren --;
						this._children.splice(index,1);
						this.invalidate(InvalidationType.LAYOUT);
					}
				}
				else if(child.parent == null)
				{
					
				}
				else
				{
					throw new Error("要删除的孩子不在当前容器中");
				}
			}
			else
			{
				throw new Error("要删除的孩子不在当前容器中");
			}
        }
        
		/**
		 * 删除子对象并回收
		 */		
		public removeChildren():void
		{
			while(this._numChildren > 0)
			{
				this.removeChildAt(0,true);
			}
        }
        
		/**
		 * 填加子元素,同时会触发布局无效标识，如果需要在子类需写drawLayout方法
		 * @param child
		 * @待废弃
		 */		
		public addChild(child:View,...layers:egret.DisplayObjectContainer[]):void
		{
			this.addChildAt(child,this._numChildren + 1,...layers);
        }
        
		/**
		 * 填加视图到容器内指定的索引位置 ，同时会触发布局无效标识，如果需要在子类需写drawLayout方法
		 * @param child
		 * @param index
		 * @param layers  
		 * @待废弃
		 */		
		public addChildAt(child:View,index:number,...layers:egret.DisplayObjectContainer[]):void
		{
			let that = this;
			if(child.parent == that)
			{
				index = MathUtil.clamb(0,that._numChildren <= 0 ? 0 : that._numChildren - 1,index);
				let tIndex:number = that._children.indexOf(child);
				if(tIndex != index)
				{
					that._children.splice(tIndex,1);
					that._children.splice(index,0,child);
					let len:number = layers.length;
					for(let i:number = 0 ; i < len; i ++)
					{
						if(child.layers[i])layers[i].addChildAt(child.layers[i],index);
					}
					that.invalidate(InvalidationType.LAYOUT);
				}
			}
			else if(child.parent != that)
			{
				index = MathUtil.clamb(0,that._numChildren,index);
				if(child.parent != null)child.parent.removeChild(child,false);
				child.parent = that;
				if(index == that._numChildren)
				{
					that._children[index] = child;
					let len:number = layers.length;
					for(let i:number = 0 ; i < len; i ++)
					{
						if(child.layers[i])layers[i].addChild(child.layers[i]);
					}
				}
				else 
				{
					that._children.splice(index,0,child);
					let len:number = layers.length;
					for(let i:number = 0 ; i < len; i ++)
					{
						if(child.layers[i])layers[i].addChildAt(child.layers[i],index);
					}
				}
				that._numChildren ++;
				that.invalidate(InvalidationType.LAYOUT);
			}
        }
        
		/**
		 * 查找指定索引位置位的子元素 
		 * @param index
		 */		
		public getChildAt(index:number):View
		{
			if(index < 0 || index > this._numChildren)return null;
			return this._children[index] as View;
        }
        
		/**
		 * 查找指定实例名的子元素，相同条件下效率低于getChildAt 
		 * @param name	实例名
		 */		
		public getChildByName(name:string):View
		{
			let child:View = this.treeChildByName(name,this);
			return child;
        }
        
		private treeChildByName(name:string,container:Container):View
		{
			let child:View;
			for(let i:number = 0 ; i < this._numChildren; i ++)
			{
				child = this.getChildAt(i);
				if(child.name == name)return child;
				if(child instanceof Container)return this.treeChildByName(name,child as Container);
			}
			return null;
        }
        
		/**
		 * 判断指定的元素是否存在于此容器中 
		 */		
		public contains(view:View):Boolean
		{
			let v:View = view;
			while(v)
			{
				if(v == this)return true;
				else v = v.parent;
			}
			return false;
        }
        
		/**
		 * 解析数据完成时触发，子类需重写 
		 */		
		public readDataComplete():void
		{
        }
        
		/**
		 * 设置容器子类实例引用
		 * @param name	实例名
		 * @param view	实例
		 */		
		public setProperty(name:string,view:View):void
		{
			this[name] = view;
		}
		
		/**
		 * 填加视图到指定的层级
		 * @param view 
		 * @param index 
		 * @待废弃
		 */
		public addChildAtLayerIndex(view:View,index:number):void
		{
			this.addChild(view,this._layers[index]);
		}

		/**
		 * 填加子元素,同时会触发布局无效标识，如果需要在子类需写drawLayout方法
		 * @param child
		 */		
		public addChild2(child:View):void
		{
			this.addChildAt2(child,this._numChildren + 1);
		}

		/**
		 * 填加视图到容器内指定的索引位置 ，同时会触发布局无效标识，如果需要在子类需写drawLayout方法
		 * @param child
		 * @param index
		 */		
		public addChildAt2(child:View,index:number):void
		{
			let that = this;
			if(child.parent == that)
			{
				index = MathUtil.clamb(0,that._numChildren <= 0 ? 0 : that._numChildren - 1,index);
				let tIndex:number = that._children.indexOf(child);
				if(tIndex != index)
				{
					that._children.splice(tIndex,1);
					that._children.splice(index,0,child);
					this.$addChildAt(child,index);
					that.invalidate(InvalidationType.LAYOUT);
				}
			}
			else if(child.parent != that)
			{
				index = MathUtil.clamb(0,that._numChildren,index);
				if(child.parent != null)child.parent.removeChild(child,false);
				child.parent = that;
				if(index == that._numChildren)
				{
					that._children[index] = child;
					this.$addChildAt(child,index);
				}
				else 
				{
					that._children.splice(index,0,child);
					this.$addChildAt(child,index);
				}
				that._numChildren ++;
				that.invalidate(InvalidationType.LAYOUT);
			}
		}
		
		private $addChildAt(child:View,index:number):void
		{
			if(this._layerID == LayerID.EMPTY)
			{
				throw new Error(egret.getQualifiedClassName(this) + "未设置layerID值");
			}
			if(child.layerID == LayerID.EMPTY)
			{
				throw new Error(child.name + "未设置layerID值");
			}
			let len:number = child.layers.length;
			if(len > this._layers.length)
			{
				throw new Error(egret.getQualifiedClassName(this) + "与" + child.name + "层不匹配");
			}
			// let layers:number[] = LayerID.getLayers();
			// let layerID:number;
			// for(let i:number = 0,m:number = 0,n:number = 0; i < layers.length; i ++)
			// {
			// 	layerID = layers[i];
			// 	if((this._layerID & layerID) == layerID)
			// 	{
			// 		if((child.layerID & layerID) == layerID)this._layers[m].addChildAt(child.layers[n++],index);
			// 		m++;
			// 	}
			// }
			this.treeLayerID(child,index,0);
		}

		/**
		 * 此处有个漏洞，this._layers[m].addChildAt(child.layers[n++],index)中的index可能不准
		 * @param child 
		 * @param index 
		 * @param n 
		 */
		private treeLayerID(child:View,index:number,n:number):void
		{
			let layers:number[] = LayerID.getLayers();
			let layerID:number;
			for(let i:number = 0,m:number = 0; i < layers.length; i ++)
			{
				layerID = layers[i];
				if((this._layerID & layerID) == layerID)
				{
					if((child.layerID & layerID) == layerID)this._layers[m].addChildAt(child.layers[n++],index);
					m++;
				}
			}
			if(n < child.layers.length)this.treeLayerID(child,index,n);
		}
        
		/**
		 * @inheritDoc 
		 */		
		public unuse():void
		{
			this.removeChildren();
			this._children.length = 0;
			super.unuse();
        }
        
		/**
		 * @inheritDoc 
		 */		
		public dispose():void
		{
			this.removeChildren();
			this._children.length = 0;
			this._children = null;
			super.dispose();
		}

    }
}