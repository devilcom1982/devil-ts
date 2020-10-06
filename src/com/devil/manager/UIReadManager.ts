namespace devil
{
	/**
	 * UI解析数据管理器
	 * @author        devil
	 * @version       V20190223
	 * @create        2019-02-23
	 * @update 	      author:更新者        time:更新日期        description:更新描述    
	 * @qq            346443480
	 * @email         346443480 @ qq.com
	 * @place         guangzhou
     */
    export class UIReadManager
    {
        public createComponent(componentType:number):Component
        {
            let cls:any;
            switch(componentType)
            {
                case ComponentType.CONTAINER:
                    cls = Container;
                    break;
                case ComponentType.IMAGE:
                    cls = Image;
                    break;
                case ComponentType.TEXT:
                    cls = Text;
                    break;
                case ComponentType.BUTTON_IMAGE:
                    cls = ButtonImage;
                    break;
                case ComponentType.BUTTON_TXT:
                    cls = ButtonText;
                    break;
                case ComponentType.BUTTON_IMAGE_SELECTED:
                    cls = ButtonImageSelected;
                    break;
                case ComponentType.BUTTON_ICON:
                    cls = ButtonIcon;
                    break;
                case ComponentType.BUTTON_ICON_SELECTED:
                    cls = ButtonIconSelected;
                    break;
                case ComponentType.BUTTON_TEXT_SELECTED:
                    break;
                case ComponentType.BUTTON_SELECTED:
                    break;
                case ComponentType.MENU_BAR:
                    break;
                case ComponentType.MENU_ITEM:
                    break;
                case ComponentType.TEXT_INPUT:
                    cls = TextInput;
                    break;
                case ComponentType.CHECK_BOX:
                    cls = CheckBox;
                    break;
                case ComponentType.RADIO_BUTTON:
                    cls = RadioButton;
                    break;
                case ComponentType.MENU_SUB_ITEM:
                    break;
                case ComponentType.IMAGE_REMOTE:
                    cls = ImageRemote;
                    break;
                case ComponentType.LIST:
                    break;
                case ComponentType.COMBOBOX:
                    break;
                case ComponentType.PANEL:
                    break;
                case ComponentType.TEXT_AREA:
                    break;
                case ComponentType.TAB:
                    break;
            }
            return View.create(cls);
        }

        public read(parent:Container,bytes:ByteArrayExtend,version:string,__setProperty:Function,target:any):Component
        {
            let componentType:number = bytes.readShort();
            let component:Component = this.createComponent(componentType);
            this.parse(component,bytes,version,__setProperty,target);
            if(__setProperty != null)__setProperty.call(target,component.name,component);
            if(parent)parent.addChild2(component);
            return component;
        }

        private parse(component:Component,bytes:ByteArrayExtend,version:string,__setProperty:Function = null,target:any):void
        {
            this.readCommon(component,bytes,version);
            switch(component.type)
            {
                case ComponentType.BUTTON_IMAGE:
                this.readButtonImage(component as ButtonImage,bytes,version);
                break;
            case ComponentType.CONTAINER:
                let count:number = 0;
                if((component.layerID & 1) == 1)count ++;
                if((component.layerID & 2) == 2)count ++;
                if((component.layerID & 4) == 4)count ++;
                component.autoCreateLayer(count);
                this.readContainer(component as Container,bytes,version,__setProperty,target);
                break;
            case ComponentType.IMAGE:
                this.readImage(component as Image,bytes,version);
                break;
            case ComponentType.TEXT:
                this.readText(component as Text,bytes,version);
                break;
            case ComponentType.BUTTON_TXT:
                this.readButtonText(component as ButtonText,bytes,version);
                break;
            case ComponentType.BUTTON_IMAGE_SELECTED:
                this.readButtonImageSelected(component as ButtonImageSelected,bytes,version);
                break;
            case ComponentType.BUTTON_ICON:
                this.readButtonIcon(component as ButtonIcon,bytes,version);
                break;
            case ComponentType.BUTTON_ICON_SELECTED:
                this.readButtonIconSelected(component as ButtonIconSelected,bytes,version);
                break;
            case ComponentType.BUTTON_TEXT_SELECTED:
                break;
            case ComponentType.BUTTON_SELECTED:
                break;
            case ComponentType.MENU_BAR:
                break;
            case ComponentType.MENU_ITEM:
                break;
            case ComponentType.TEXT_INPUT:
                this.readTextInput(component as TextInput,bytes,version);
                break;
            case ComponentType.CHECK_BOX:
                this.readCheckBox(component as CheckBox,bytes,version);
                break;
                case ComponentType.RADIO_BUTTON:
                    this.readRadioButton(component as RadioButton,bytes,version);
                    break;
            case ComponentType.MENU_SUB_ITEM:
                break;
            case ComponentType.IMAGE_REMOTE:
                this.readImageRemote(component as ImageRemote,bytes,version);
                break;
            // case ComponentType.SCROLL_BAR:
                // break;
            case ComponentType.LIST:
                break;
            case ComponentType.COMBOBOX:
                break;
            case ComponentType.PANEL:
                break;
            case ComponentType.TEXT_AREA:
                break;
            }
        }

        private readButtonImage(component:ButtonImage,bytes:ByteArrayExtend,version:string):void
        {
            this.readStyles(component,bytes,version);
        }

        private readContainer(container:Container,bytes:ByteArrayExtend,version:string,__setProperty:Function,target:any):void
        {
            let numChildren:number = bytes.readByte();
            let component:Component;
            for(let i:number = 0 ; i < numChildren; i ++)
            {
                component = this.read(container,bytes,version,__setProperty,target);
                container.setProperty(component.name,component);
            }
            container.readDataComplete();
        }

        private readImage(component:Image,bytes:ByteArrayExtend,version:string):void
        {
            // let has9Scale:boolean = bytes.readBoolean();
            // if(has9Scale)component.scale9Grid = new egret.Rectangle(bytes.readShort(),bytes.readShort(),bytes.readShort(),bytes.readShort());
            // else component.scale9Grid = null;
            // if(version <= UIVersion.VERSION9)
            // {
            //     let has9Scale:boolean = bytes.readBoolean();
			// 	if(has9Scale)component.scale9Grid = new egret.Rectangle(bytes.readShort(),bytes.readShort(),bytes.readShort(),bytes.readShort());
			// 	else component.scale9Grid = null;
            // }
        }

        private readText(component:Text,bytes:ByteArrayExtend,version:string):void
        {
            component.color = bytes.readInt();
            component.bold = bytes.readBoolean();
            component.size = bytes.readByte();
            component.align = bytes.readUTF();
        }

        private readButtonText(component:ButtonText,bytes:ByteArrayExtend,version:string):void
		{
			this.readStyles(component,bytes,version);
			component.label.color = bytes.readInt();
			component.label.bold = bytes.readBoolean();
			component.label.size = bytes.readByte();
			component.label.align = bytes.readUTF();
			component.setLabelOffset(bytes.readShort(),bytes.readShort());
        }
        
        private readButtonImageSelected(component:ButtonImageSelected,bytes:ByteArrayExtend,version:string):void
		{
			this.readButtonImage(component,bytes,version);
		}

        private readButtonIcon(component:ButtonIcon,bytes:ByteArrayExtend,version:string):void
        {
            this.readStyles(component,bytes,version);
            // if(version > UIVersion.VERSION3)component.setIconOffset(bytes.readShort(),bytes.readShort());
            component.setIconOffset(bytes.readShort(),bytes.readShort());
        }

        private readButtonIconSelected(component:ButtonIconSelected,bytes:ByteArrayExtend,version:string):void
        {
            this.readButtonIcon(component,bytes,version);
        }

        private readImageRemote(component:ImageRemote,bytes:ByteArrayExtend,version:string):void
        {

        }

        private readTextInput(component:TextInput,bytes:ByteArrayExtend,version:string):void
		{
			this.readStyles(component,bytes,version);
			component.color = bytes.readInt();
			component.bold = bytes.readBoolean();
			component.size = bytes.readByte();
			component.align = bytes.readUTF();
        }
        
		private readCheckBox(component:CheckBox,bytes:ByteArrayExtend,version:string):void
		{
			this.readButtonText(component,bytes,version);
        }
        
		private readRadioButton(component:RadioButton,bytes:ByteArrayExtend,version:string):void
		{
			this.readButtonText(component,bytes,version);
		}

        private readStyles(component:Component,bytes:ByteArrayExtend,version:string):void
        {
            let count:number = bytes.readByte();
            for(let i:number = 0 ; i < count ; i ++)
            {
                // if(version > UIVersion.VERSION6)
                // {
                    component.setStyle(bytes.readUTF(),bytes.readUTF());
                    // if(version > UIVersion.VERSION7)component.setStyle(bytes.readUTF(),bytes.readUTF());
                    // else 
                    // {
                    //     component.setStyle(bytes.readUTF(),bytes.readUTF());
                    // }
                // }
                // else
                // {
                //     component.setStyle(bytes.readUTF(),bytes.readUTF());
                // }
                // if(version <= UIVersion.VERSION9)
				// {
				// 	if(bytes.readBoolean())(bytes.readUTF(),bytes.readShort(),bytes.readShort(),bytes.readShort(),bytes.readShort());
				// }
            }
        }

        private readCommon(component:Component,bytes:ByteArrayExtend,version:string):void
        {
            component.name = bytes.readUTF();
			component.move(bytes.readShort(),bytes.readShort());
			component.width = bytes.readShort();
			component.height = bytes.readShort();
			component.alpha = bytes.readUnsignedByte() * 0.1;
			component.anchorX = bytes.readUnsignedByte() * 0.1;
            component.anchorY = bytes.readUnsignedByte() * 0.1;	
            component.rotation = bytes.readShort();
            component.scaleX = bytes.readByte() * 0.1;
            component.scaleY = bytes.readByte() * 0.1;
			component.layerID = bytes.readByte();
        }

        public readUIData(build:ArrayBuffer,model:CanvasModel):void
        {
            let bytes:ByteArrayExtend = Manager.pool.create(ByteArrayExtend);
            bytes.setArrayBuffer(build);
            bytes.position = 0;
            let canvasLen:number = bytes.readShort();
            for(let i:number = 0 ; i < canvasLen; i ++)
            {
                this.readTxtData(bytes,model);
            }
            // if(bytes.bytesAvailable)this.readTextureData(bytes);
            if(bytes.bytesAvailable)Model.resConfig.parseConfig(bytes,null);
            bytes.pool();
        }

        private readTxtData(bytes:ByteArrayExtend,model:CanvasModel):void
		{
			let version:string = bytes.readUTF();
			let name:string = bytes.readUTF();
			let len:number = bytes.readShort();
			let data:ByteArrayExtend = new ByteArrayExtend();
			bytes.readBytes(data,0,len);
			model.addCanvas(data,name,version);
        }
        
        // private readTextureData(bytes:ByteArrayExtend):void
		// {
		// 	// let version:string = bytes.readUTF();
		// 	// this.readEgretTexture(bytes,version);
        // }
        
        // private readEgretTexture(bytes:ByteArrayExtend,version:string):void
		// {
        //     Model.resConfig.parseConfig();
		// 	let textureLen:number = bytes.readByte();
		// 	let textureName:string;
		// 	let skinName:string;
		// 	let skinCount:number;
		// 	var data:ImageData;
		// 	var datas:HashMap = getResourceManager().getData();
		// 	for(var j:int = 0 ; j < textureLen; j ++)
		// 	{
		// 		textureName = bytes.readUTF();
		// 		skinCount = bytes.readShort();
		// 		for(var m:Number = 0 ; m < skinCount; m ++)
		// 		{
		// 			skinName = bytes.readUTF();
		// 			data = datas.get(skinName);
		// 			if(data == null)
		// 			{
		// 				data = new ImageData(skinName,"",null,textureName);
		// 				datas.add(skinName,data);
		// 			}
		// 			else
		// 			{
		// 				if(data.has9Scale)data.update(data.path,data.bitmapData,textureName,data.scale9Grid.x,data.scale9Grid.y,data.scale9Grid.width,data.scale9Grid.height);
		// 				else data.update(data.path,data.bitmapData,textureName,0,0,0,0);
		// 			}
		// 			if(bytes.readBoolean())data.updateScale9(bytes.readShort(),bytes.readShort(),bytes.readShort(),bytes.readShort());
		// 		}
		// 	}
        // }
    }
}