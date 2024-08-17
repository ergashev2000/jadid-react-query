declare class Cache {
    private cache;
    set(key: string, data: any, ttl: number): void;
    get(key: string): any;
    delete(key: string): void;
    clear(): void;
}
export declare const cache: Cache;
export {};
