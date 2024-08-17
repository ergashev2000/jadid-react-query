export interface UseMutationOptions {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    onSettled?: () => void;
    [key: string]: any;
}
export declare const useMutation: (key: string, url: string, options?: UseMutationOptions) => {
    data: any;
    error: any;
    loading: boolean;
    mutate: (payload: any) => Promise<void>;
};
