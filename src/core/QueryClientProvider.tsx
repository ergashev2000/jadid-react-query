import React, { createContext, ReactNode, useContext } from 'react';
import { QueryClientClass } from './queryClient';

const QueryClientContext = createContext<QueryClientClass | undefined>(undefined);

export const useQueryClient = (): QueryClientClass => {
  const context = useContext(QueryClientContext);
  if (!context) {
    throw new Error('useQueryClient must be used within a QueryClientProvider');
  }
  return context;
};

interface QueryClientProviderProps {
  client: QueryClientClass;
  children: ReactNode;
}

export const QueryClientProvider: React.FC<QueryClientProviderProps> = ({ client, children }) => {
  return (
    <QueryClientContext.Provider value={client}>
      {children}
    </QueryClientContext.Provider>
  );
};