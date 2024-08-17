export interface UseQueryOptions {
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
    refetchOnReconnect?: boolean;
    staleTime?: number;
    cacheTime?: number;
    refetchInterval?: number;
    backgroundSync?: boolean;
    retry?: number;
    retryDelay?: number;
    [key: string]: any;
}
export declare const useQuery: (key: string, url: string, options?: UseQueryOptions) => {
    data: any;
    error: any;
    loading: boolean;
    refetch: () => Promise<void>;
};
