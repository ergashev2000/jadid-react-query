import React, { ReactNode } from 'react';
import { QueryClient } from './queryClient';
interface QueryClientProviderProps {
    children: ReactNode;
}
export declare const QueryClientProvider: React.FC<QueryClientProviderProps>;
export declare const useQueryClient: () => QueryClient;
export {};
