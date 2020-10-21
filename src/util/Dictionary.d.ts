declare namespace devil {
    /**
     * 字典工具类
     * @author        devil
     * @version       V20190425
     * @create        2019-04-29
     * @qq            346443480
     * @email         346443480 @ qq.com
     * @place         guangzhou
     */
    class Dictionary<K, V> {
        private _keys;
        private _values;
        private _map;
        constructor();
        get(key: K): V;
        add(key: K, value: V): void;
        remove(key: K): V;
        removeAll(): void;
        keys(): K[];
        values(): V[];
        containsKey(key: K): boolean;
    }
}
