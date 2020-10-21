declare namespace devil {
    class TabData implements IListItemData2 {
        upBackSkin: string;
        selectedBackSkin: string;
        upIconSkin: string;
        selectedfIconSkin: string;
        width: number;
        height: number;
        index: number;
        showRed: boolean;
        selected: boolean;
        constructor(upBackSkin: string, selectedBackSkin: string, upIconSkin: string, selectedIconSkin: string);
    }
}
