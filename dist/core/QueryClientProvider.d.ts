import React, { ReactNode } from 'react';
import { QueryClientClass } from './queryClient';
export declare const useQueryClient: () => QueryClientClass;
interface QueryClientProviderProps {
    client: QueryClientClass;
    children: ReactNode;
}
export declare const QueryClientProvider: React.FC<QueryClientProviderProps>;
export {};
