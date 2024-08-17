import { useState, useCallback } from "react";
import { fetcher } from "../core/fetcher";

export interface UseMutationOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onSettled?: () => void;
  [key: string]: any;
}

export const useMutation = (key: string, url: string, options: UseMutationOptions = {}) => {
  const { onSuccess, onError, onSettled, ...fetchOptions } = options;

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const mutate = useCallback(
    async (payload: any) => {
      setLoading(true);
      try {
        const result = await fetcher(key, url, {
          method: "POST",
          body: JSON.stringify(payload),
          ...fetchOptions,
        });
        setData(result);
        if (onSuccess) onSuccess(result);
      } catch (err) {
        setError(err);
        if (onError) onError(err);
      } finally {
        setLoading(false);
        if (onSettled) onSettled();
      }
    },
    [url, fetchOptions, onSuccess, onError, onSettled]
  );

  return { data, error, loading, mutate };
};
