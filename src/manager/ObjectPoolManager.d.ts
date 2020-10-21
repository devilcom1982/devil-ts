declare namespace devil {
    /**
     * 对象池管理器,类似cc.pool的方法，需要使用对象池管理的对象，需要实现reuse与unuse两个函数，reuse函数是从池中获得对象时使用，而unuse是对象放入池中时调用。
     * @author        devil
     * @version       V20181227
     * @create        2018-12-27
     * @update 	      author:更新者        time:更新日期        description:更新描述
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class ObjectPoolManager {
        private _objects;
        /**对象池单个类型数组最大数 */
        private MAX_NUM;
        /**
          * 通过对象池创建对象
          * @param cls   对象类型
          */
        create(cls: {
            new (): IPool;
        }): any;
        /**
         * 创建不可以交互的sprite实例
         */
        createSprite(): egret.Sprite;
        /**
         * 回收Sprite实例进对象池
         * @param instance
         */
        pushSprite(instance: egret.Sprite): void;
        createShape(): egret.Shape;
        pushShape(instance: egret.Shape): void;
        createDisplayObjectContainer(): egret.DisplayObjectContainer;
        pushDisplayObjectContainer(instance: egret.DisplayObjectContainer): void;
        private pushDisplayObject;
        /**
         * 回收对象
         * @param cls			对应的类
         * @param instance		回收的类实例
         */
        push(instance: IPool): void;
        /**
         * 计算管理器内部的对象实例数，测试用
         */
        testCount(): void;
        /**
         * 创建位图
         */
        createBitmap(): egret.Bitmap;
        pushBitmap(instance: egret.Bitmap): void;
        /**
         * 创建文本
         */
        createTextField(): egret.TextField;
        /**
         * 回收TextField实例进对象池
         * @param instance
         */
        pushTextField(instance: egret.TextField): void;
        /**
         * 创建贴图
         */
        createTexture(): egret.Texture;
        /**
         * 回收贴图
         */
        pushTexture(instance: egret.Texture): void;
        createHttpRequest(): egret.HttpRequest;
        pushHttpRequest(instance: egret.HttpRequest): void;
        createImageLoader(): egret.ImageLoader;
        pushImageLoader(instance: egret.ImageLoader): void;
        createByteArray(): egret.ByteArray;
        pushByteArray(instance: egret.ByteArray): void;
    }
}
