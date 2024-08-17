import { useState, useCallback } from 'react';
import { fetcher } from '../core/fetcher';
import { queryClient } from '../core/queryClient';
import { UseQueryOptions } from './useQuery';

export interface FetchOptions extends RequestInit {
  retry?: number;
  retryDelay?: number;
}

export const useManualQuery = (
  key: string,
  url: string,
  options: UseQueryOptions = {}
) => {
  const {
    enabled = true,
    refetchOnWindowFocus = false,
    refetchOnReconnect = false,
    staleTime = 5000,
    cacheTime = 10000,
    refetchInterval = 0,
    backgroundSync = false,
    ...fetchOptions
  } = options;

  const [data, setData] = useState<any>(queryClient.getQueryData(key));
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(!data);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    try {
      const result = await fetcher(key, url, fetchOptions as RequestInit);
      queryClient.setQueryData(key, result, cacheTime);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [enabled, key, url, fetchOptions, cacheTime]);

  return { data, error, loading, refetch: fetchData };
};
