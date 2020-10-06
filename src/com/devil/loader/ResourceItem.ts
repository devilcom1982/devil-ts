namespace devil
{
    export class ResourceItem
    {
        public name:string;
        public url:string;

        public scale9Grid:egret.Rectangle;
        public constructor(name:string,url:string)
        {
            this.name = name;
            this.url = url;
        }
    }
}