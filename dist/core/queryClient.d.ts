export declare class QueryClient {
    private cache;
    getQueryData(key: string): any;
    setQueryData(key: string, data: any, ttl: number): void;
    clear(): void;
}
export declare const queryClient: QueryClient;
