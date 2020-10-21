declare namespace devil {
    /**
     * 文本加载器
     * @author devil
     * @version V20180811
     * @create 2018-08-11
     * @place guangzhou
     */
    class TextLoader extends BaseLoader {
        text: string;
        private _isPost;
        private _params;
        /**
         * 使用Post加载方式
         * @param params
         */
        post(params: any): void;
        /**
         * 加载
         */
        load(): void;
        protected reload(index: number): void;
        protected $request(httpReq: egret.HttpRequest, index: number): void;
        protected parse(data: any): void;
        unuse(): void;
    }
}
