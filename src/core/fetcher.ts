import { queryClient } from "./queryClient";

export const fetcher = async (key: string, url: string, options: any) => {
  const cachedData = queryClient.getQueryData(key);
  if (cachedData) {
    return cachedData;
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();

  const cacheTTL = options.cacheTime || 10000;
  queryClient.setQueryData(key, data, cacheTTL);

  return data;
};
