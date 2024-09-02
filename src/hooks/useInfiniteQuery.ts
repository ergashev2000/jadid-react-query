import { useState, useEffect, useCallback } from "react";
import { queryClient } from "../core/queryClient";

interface UseInfiniteQueryOptions {
  queryKey: string;
  fetchFunction: (page: number) => Promise<any>;
  initialPage?: number;
  pageSize?: number;
  ttl?: number;
}

export const useInfiniteQuery = ({
  queryKey,
  fetchFunction,
  initialPage = 1,
  pageSize = 10,
  ttl = 30000,
}: UseInfiniteQueryOptions) => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(initialPage);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchPage = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const response = await fetchFunction(page);
        setData((prevData) => [...prevData, ...response.data]);
        queryClient.setQueryData(queryKey, response, ttl);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [pageSize, queryKey, ttl]
  );

  useEffect(() => {
    fetchPage(initialPage);
  }, []);

  const loadMore = () => {
    if (hasNextPage && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page > initialPage) {
      fetchPage(page);
    }
  }, [page]);

  return { data, loading, error, loadMore, hasNextPage };
};
