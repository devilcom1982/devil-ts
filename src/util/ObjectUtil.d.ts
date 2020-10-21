declare namespace devil {
    /**
     * 对象工具管理器
     * @author        devil
     * @version       Nov 25, 2018
     * @create        Nov 25, 2018
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ObjectUtil {
        /**
         * 将指定的显示对象从(指定的)父级中删除，但不释放内存
         * @param child         指定的显示对象
         * @param container     指定的容器。一旦指定了此参数，则指定的显示对象一定要在此容器中才会删除。
         */
        static removeFromParent(child: egret.DisplayObject, parent?: egret.DisplayObjectContainer): void;
        /**
         * 批量将显示对象从自身的父级中删除，但不释放内存
         * @param childs
         */
        static removes(...childs: any[]): void;
        static dispose(child: IDispose): void;
    }
}
