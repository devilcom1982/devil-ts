namespace devil
{
    export class  TabData implements IListItemData2
    {
        public upBackSkin:string = "common2_tab1_png";
        public selectedBackSkin:string = "common2_tab2_png";
        public upIconSkin:string;
        public selectedfIconSkin:string;
        public width:number;
        public height:number;
        public index:number;
        public showRed:boolean;
        public selected:boolean;

        public constructor(upBackSkin:string,selectedBackSkin:string,upIconSkin:string,selectedIconSkin:string)
        {
            this.upBackSkin = upBackSkin;
            this.selectedBackSkin = selectedBackSkin;
            this.upIconSkin = upIconSkin;
            this.selectedfIconSkin = selectedIconSkin;
        }
    }
}