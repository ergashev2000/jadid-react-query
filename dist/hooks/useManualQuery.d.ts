import { UseQueryOptions } from './useQuery';
export interface FetchOptions extends RequestInit {
    retry?: number;
    retryDelay?: number;
}
export declare const useManualQuery: (key: string, url: string, options?: UseQueryOptions) => {
    data: any;
    error: any;
    loading: boolean;
    refetch: () => Promise<void>;
};
