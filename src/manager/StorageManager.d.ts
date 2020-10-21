declare namespace devil {
    /**
     * 基础管理器集，针对基本的管理器
     * @author devil
     * @version V20180704
     * @create 20180704
     * @place guangzhou
     */
    class StorageManager {
        getItem(key: string): string;
        clear(): void;
        setItem(key: string, value: string): void;
        removeItem(key: string): void;
        setBoolean(key: string, value: boolean): void;
        getBoolean(key: string): boolean;
        setInt(key: string, value: number): void;
        getInt(key: string): number;
    }
}
