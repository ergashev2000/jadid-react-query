import { useState, useEffect, useCallback } from "react";
import { fetcher } from "../core/fetcher";
import { useQueryClient } from "../core/QueryClientProvider";

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

export const useQuery = (
  key: string,
  url: string,
  options: UseQueryOptions = {}
) => {
  const {
    enabled = true,
    refetchOnWindowFocus = true,
    refetchOnReconnect = true,
    staleTime = 5000,
    cacheTime = 10000,
    refetchInterval = 0,
    backgroundSync = true,
    retry = 3,
    retryDelay = 1000,
    ...fetchOptions
  } = options;

  const queryClient = useQueryClient();

  const [data, setData] = useState<any>(queryClient.getQueryData(key));
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(!data);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    try {
      const result = await fetcher(key, url, fetchOptions);
      queryClient.setQueryData(key, result, cacheTime);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [enabled, key, url, fetchOptions, cacheTime]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled]);

  useEffect(() => {
    if (refetchOnWindowFocus) {
      const handleFocus = () => fetchData();
      window.addEventListener("focus", handleFocus);
      return () => window.removeEventListener("focus", handleFocus);
    }
  }, [refetchOnWindowFocus]);

  useEffect(() => {
    if (refetchOnReconnect) {
      const handleOnline = () => fetchData();
      window.addEventListener("online", handleOnline);
      return () => window.removeEventListener("online", handleOnline);
    }
  }, [refetchOnReconnect]);

  useEffect(() => {
    if (refetchInterval > 0) {
      const interval = setInterval(fetchData, refetchInterval);
      return () => clearInterval(interval);
    }
  }, [refetchInterval]);

  useEffect(() => {
    if (backgroundSync) {
      const handleOnline = () => fetchData();
      window.addEventListener("online", handleOnline);
      return () => window.removeEventListener("online", handleOnline);
    }
  }, [backgroundSync]);

  return { data, error, loading, refetch: fetchData };
};
