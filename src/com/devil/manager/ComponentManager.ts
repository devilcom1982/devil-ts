namespace devil
{
    /**
     * 组件管理器
     * @author        devil
     * @version       V20190213
     * @create        2019-02-13
     * @update 	      author:更新者        time:更新日期        description:更新描述    
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */	
    export class ComponentManager
    {
        public createImage(source?:egret.Texture | string,x:number = 0,y:number = 0,width:number = -1,height:number = -1):Image
        {
            let component:Image = View.create(Image);
            component.setSize(width,height);
            component.move(x,y);
            component.source = source;
            return component;
        }

        public createButtonImage(upBackSkin:string,width:number,height:number,x:number = 0,y:number = 0):ButtonImage
        {
            let component:ButtonImage = View.create(ButtonImage);
            component.setStyle(StyleName.UP_BACK_SKIN,upBackSkin);
            component.setSize(width,height);
            component.move(x,y);
            return component;
        }

        /**
         * 
         * @param y 
         * @param width 
         * @param height 
         * @param color 
         * @param size  default 24
         * @param align default center egret.HorizontalAlign常量
         */
        public createText(x:number,y:number,width:number,height:number,color:number,size:number = 24,align:string = "center"):Text
        {
            let component:Text = View.create(Text);
            component.color = color;
            component.size = size;
            component.align = align;
            component.verticalAlign = egret.VerticalAlign.MIDDLE;
            component.setSize(width,height);
            component.move(x,y);
            component.repaint();
            return component;
        }

        public createButtonIcon(upBackSkin:string,upIconSkin:string,x:number,y:number,width:number,height:number):ButtonIcon
        {
            let component:ButtonIcon = View.create(ButtonIcon);
            component.setStyle(StyleName.UP_BACK_SKIN,upBackSkin);
            component.setStyle(StyleName.UP_ICON_SKIN,upIconSkin);
            component.setSize(width,height);
            component.move(x,y);
            return component;
        }

        public createImageRemote(x:number = 0,y:number = 0,width:number = -1,height:number = -1):ImageRemote
        {
            let component:ImageRemote = View.create(ImageRemote);
            component.move(x,y);
            component.setSize(width,height);
            return component;
        }

        public createContainer(count:number = 1):Container
        {
            let component:Container = View.create(Container);
            component.autoCreateLayer(count);
            return component;
        }

        public createListContainer(cls:any,itemWidth:number,itemHeight:number,datas:IListItemData[] = []):ListContainer
        {
            let component:ListContainer = View.create(ListContainer);
            component.touchChildren = true;
            component.itemRenderer = cls;
            component.itemWidth = itemWidth;
            component.itemHeight = itemHeight;
            component.datas = datas;
            return component;
        }

        public createListContainer2(cls:any,datas:IListItemData2[] = []):ListContainer2
        {
            let component:ListContainer2 = View.create(ListContainer2);
            component.touchChildren = true;
            component.itemRenderer = cls;
            component.datas = datas;
            return component;
        }

        /**
         * 
         * @param width 
         * @param height 
         * @param scrollPolicyV     default ScrollPolicy.AUTO
         * @param scrollPolicyH     default ScrollPolicy.OFF
         * @param layout            default List.VERTICAL
         */
        public createList(width:number,height:number,scrollPolicyV:ScrollPolicy = ScrollPolicy.AUTO,scrollPolicyH:ScrollPolicy = ScrollPolicy.OFF,layout:number = List.VERTICAL):List
        {
            let component:List = View.create(List);
            component.width = width;
            component.height = height;
            component.touchChildren = true;
            component.scrollPolicyH = scrollPolicyH;
            component.scrollPolicyV = scrollPolicyV;
            component.layout = layout;
            return component;
        }

        /** */
        public createListSlider(width:number, height:number, listWidth:number,listHeight:number):ListSlider
        {
            let component:ListSlider = View.create(ListSlider);
            component.setSize(width, height);
            component.touchChildren = true;
            component.listWidth = listWidth;
            component.listHeight = listHeight;
            return component;
        }

        /**
         * 
         * @param x 
         * @param y 
         * @param width 
         * @param height 
         * @param align default center egret.HorizontalAlign常量
         */
        public createTextInput(x:number,y:number,width:number,height:number,color:number,size:number = 24,upBackSkin:string,align:string = "center"):TextInput
        {
            let component:TextInput = View.create(TextInput);
            component.move(x,y);
            component.setSize(width,height);
            component.setStyle(StyleName.UP_BACK_SKIN,upBackSkin);
            component.color = color;
            component.size = size;
            component.align = align;
            return component;
        }

        public createCheckBox1(upBackSkin:string,selectIconSkin:string,color:number = Color.WHITE,size:number = 18):CheckBox1
        {
            let component:CheckBox1 = View.create(CheckBox1);
            component.label.color = color;
            component.label.size = size;
            component.setStyle(StyleName.UP_BACK_SKIN,upBackSkin);
            component.setStyle(StyleName.SELECT_ICON_SKIN,selectIconSkin);
            return component;
        }

        public createBoxContainer(row:number,col:number,paddingV:number = 0,paddingH:number = 0):BoxContainer
        {
            let component:BoxContainer = BoxContainer.createSelf(row,col,paddingV,paddingH);
            return component;
        }

        public createTab():Tab
        {
            let component:Tab = View.create(Tab);
            return component;
        }

        public createAnimation():Animation
        {
            let component:Animation = Manager.pool.create(Animation);
            return component;
        }

    }
}