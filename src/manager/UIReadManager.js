var devil;
(function (devil) {
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
    var UIReadManager = /** @class */ (function () {
        function UIReadManager() {
        }
        UIReadManager.prototype.createComponent = function (componentType) {
            // console.log("UIReadManager.",componentType)
            var cls;
            switch (componentType) {
                case devil.ComponentType.CONTAINER:
                    cls = devil.Container;
                    break;
                case devil.ComponentType.IMAGE:
                    cls = devil.Image;
                    break;
                case devil.ComponentType.TEXT:
                    cls = devil.Text;
                    break;
                case devil.ComponentType.BUTTON_IMAGE:
                    cls = devil.ButtonImage;
                    break;
                case devil.ComponentType.BUTTON_TXT:
                    cls = devil.ButtonText;
                    break;
                case devil.ComponentType.BUTTON_IMAGE_SELECTED:
                    cls = devil.ButtonImageSelected;
                    break;
                case devil.ComponentType.BUTTON_ICON:
                    cls = devil.ButtonIcon;
                    break;
                case devil.ComponentType.BUTTON_ICON_SELECTED:
                    cls = devil.ButtonIconSelected;
                    break;
                case devil.ComponentType.BUTTON_TEXT_SELECTED:
                    break;
                case devil.ComponentType.BUTTON_SELECTED:
                    break;
                case devil.ComponentType.MENU_BAR:
                    break;
                case devil.ComponentType.MENU_ITEM:
                    break;
                case devil.ComponentType.TEXT_INPUT:
                    cls = devil.TextInput;
                    break;
                case devil.ComponentType.CHECK_BOX:
                    cls = devil.CheckBox;
                    break;
                case devil.ComponentType.RADIO_BUTTON:
                    cls = devil.RadioButton;
                    break;
                case devil.ComponentType.MENU_SUB_ITEM:
                    break;
                case devil.ComponentType.IMAGE_REMOTE:
                    cls = devil.ImageRemote;
                    break;
                case devil.ComponentType.LIST:
                    break;
                case devil.ComponentType.COMBOBOX:
                    break;
                case devil.ComponentType.PANEL:
                    break;
                case devil.ComponentType.TEXT_AREA:
                    break;
                case devil.ComponentType.TAB:
                    break;
            }
            return devil.View.create(cls);
        };
        UIReadManager.prototype.read = function (parent, bytes, version, __setProperty, target) {
            var componentType = bytes.readShort();
            // console.log("UIReadManger",componentType);
            var component = this.createComponent(componentType);
            this.parse(component, bytes, version, __setProperty, target);
            if (__setProperty != null)
                __setProperty.call(target, component.name, component);
            if (parent)
                parent.addChild2(component);
            return component;
        };
        UIReadManager.prototype.parse = function (component, bytes, version, __setProperty, target) {
            if (__setProperty === void 0) { __setProperty = null; }
            this.readCommon(component, bytes, version);
            switch (component.type) {
                case devil.ComponentType.BUTTON_IMAGE:
                    this.readButtonImage(component, bytes, version);
                    break;
                case devil.ComponentType.CONTAINER:
                    var count = 0;
                    if ((component.layerID & 1) == 1)
                        count++;
                    if ((component.layerID & 2) == 2)
                        count++;
                    if ((component.layerID & 4) == 4)
                        count++;
                    component.autoCreateLayer(count);
                    this.readContainer(component, bytes, version, __setProperty, target);
                    break;
                case devil.ComponentType.IMAGE:
                    this.readImage(component, bytes, version);
                    break;
                case devil.ComponentType.TEXT:
                    this.readText(component, bytes, version);
                    break;
                case devil.ComponentType.BUTTON_TXT:
                    this.readButtonText(component, bytes, version);
                    break;
                case devil.ComponentType.BUTTON_IMAGE_SELECTED:
                    this.readButtonImageSelected(component, bytes, version);
                    break;
                case devil.ComponentType.BUTTON_ICON:
                    this.readButtonIcon(component, bytes, version);
                    break;
                case devil.ComponentType.BUTTON_ICON_SELECTED:
                    this.readButtonIconSelected(component, bytes, version);
                    break;
                case devil.ComponentType.BUTTON_TEXT_SELECTED:
                    break;
                case devil.ComponentType.BUTTON_SELECTED:
                    break;
                case devil.ComponentType.MENU_BAR:
                    break;
                case devil.ComponentType.MENU_ITEM:
                    break;
                case devil.ComponentType.TEXT_INPUT:
                    this.readTextInput(component, bytes, version);
                    break;
                case devil.ComponentType.CHECK_BOX:
                    this.readCheckBox(component, bytes, version);
                    break;
                case devil.ComponentType.RADIO_BUTTON:
                    this.readRadioButton(component, bytes, version);
                    break;
                case devil.ComponentType.MENU_SUB_ITEM:
                    break;
                case devil.ComponentType.IMAGE_REMOTE:
                    this.readImageRemote(component, bytes, version);
                    break;
                // case ComponentType.SCROLL_BAR:
                // break;
                case devil.ComponentType.LIST:
                    break;
                case devil.ComponentType.COMBOBOX:
                    break;
                case devil.ComponentType.PANEL:
                    break;
                case devil.ComponentType.TEXT_AREA:
                    break;
            }
        };
        UIReadManager.prototype.readButtonImage = function (component, bytes, version) {
            this.readStyles(component, bytes, version);
        };
        UIReadManager.prototype.readContainer = function (container, bytes, version, __setProperty, target) {
            var numChildren = bytes.readByte();
            var component;
            for (var i = 0; i < numChildren; i++) {
                component = this.read(container, bytes, version, __setProperty, target);
                container.setProperty(component.name, component);
            }
            container.readDataComplete();
        };
        UIReadManager.prototype.readImage = function (component, bytes, version) {
        };
        UIReadManager.prototype.readText = function (component, bytes, version) {
            component.color = bytes.readInt();
            component.bold = bytes.readBoolean();
            component.size = bytes.readByte();
            component.align = bytes.readUTF();
        };
        UIReadManager.prototype.readButtonText = function (component, bytes, version) {
            this.readStyles(component, bytes, version);
            component.label.color = bytes.readInt();
            component.label.bold = bytes.readBoolean();
            component.label.size = bytes.readByte();
            component.label.align = bytes.readUTF();
            component.setLabelOffset(bytes.readShort(), bytes.readShort());
        };
        UIReadManager.prototype.readButtonImageSelected = function (component, bytes, version) {
            this.readButtonImage(component, bytes, version);
        };
        UIReadManager.prototype.readButtonIcon = function (component, bytes, version) {
            this.readStyles(component, bytes, version);
            component.setIconOffset(bytes.readShort(), bytes.readShort());
        };
        UIReadManager.prototype.readButtonIconSelected = function (component, bytes, version) {
            this.readButtonIcon(component, bytes, version);
        };
        UIReadManager.prototype.readImageRemote = function (component, bytes, version) {
        };
        UIReadManager.prototype.readTextInput = function (component, bytes, version) {
            this.readStyles(component, bytes, version);
            component.color = bytes.readInt();
            component.bold = bytes.readBoolean();
            component.size = bytes.readByte();
            component.align = bytes.readUTF();
        };
        UIReadManager.prototype.readCheckBox = function (component, bytes, version) {
            this.readButtonText(component, bytes, version);
        };
        UIReadManager.prototype.readRadioButton = function (component, bytes, version) {
            this.readButtonText(component, bytes, version);
        };
        UIReadManager.prototype.readStyles = function (component, bytes, version) {
            var count = bytes.readByte();
            for (var i = 0; i < count; i++) {
                component.setStyle(bytes.readUTF(), bytes.readUTF());
            }
        };
        UIReadManager.prototype.readCommon = function (component, bytes, version) {
            component.name = bytes.readUTF();
            component.move(bytes.readShort(), bytes.readShort());
            component.width = bytes.readShort();
            component.height = bytes.readShort();
            component.alpha = bytes.readUnsignedByte() * 0.1;
            component.anchorX = bytes.readUnsignedByte() * 0.1;
            component.anchorY = bytes.readUnsignedByte() * 0.1;
            component.rotation = bytes.readShort();
            component.scaleX = bytes.readByte() * 0.1;
            component.scaleY = bytes.readByte() * 0.1;
            component.layerID = bytes.readByte();
        };
        UIReadManager.prototype.readUIData = function (build, model) {
            var bytes = devil.Manager.pool.create(devil.ByteArrayExtend);
            bytes.setArrayBuffer(build);
            bytes.position = 0;
            var canvasLen = bytes.readShort();
            for (var i = 0; i < canvasLen; i++) {
                this.readTxtData(bytes, model);
            }
            // console.log("UIReadManager.readUIData",canvasLen);
            if (bytes.bytesAvailable)
                devil.Model.resConfig.parseConfig(bytes, null);
            bytes.pool();
        };
        UIReadManager.prototype.readTxtData = function (bytes, model) {
            var version = bytes.readUTF();
            var name = bytes.readUTF();
            var len = bytes.readShort();
            var data = new devil.ByteArrayExtend();
            bytes.readBytes(data, 0, len);
            model.addCanvas(data, name, version);
        };
        return UIReadManager;
    }());
    devil.UIReadManager = UIReadManager;
})(devil || (devil = {}));
