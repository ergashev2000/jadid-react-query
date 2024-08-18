interface UseInfiniteQueryOptions {
    queryKey: string;
    fetchFunction: (page: number) => Promise<any>;
    initialPage?: number;
    pageSize?: number;
    ttl?: number;
}
export declare const useInfiniteQuery: ({ queryKey, fetchFunction, initialPage, pageSize, ttl, }: UseInfiniteQueryOptions) => {
    data: any[];
    loading: boolean;
    error: any;
    loadMore: () => void;
    hasNextPage: boolean;
};
export {};
