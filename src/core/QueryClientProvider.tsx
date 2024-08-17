import React, { createContext, useContext, ReactNode } from 'react';
import { QueryClient, queryClient } from './queryClient';

const QueryClientContext = createContext<QueryClient | undefined>(undefined);

interface QueryClientProviderProps {
  children: ReactNode;
}

export const QueryClientProvider: React.FC<QueryClientProviderProps> = ({ children }) => {
  return (
    <QueryClientContext.Provider value={queryClient}>
      {children}
    </QueryClientContext.Provider>
  );
};

export const useQueryClient = () => {
  const context = useContext(QueryClientContext);
  if (context === undefined) {
    throw new Error('useQueryClient must be used within a QueryClientProvider');
  }
  return context;
};