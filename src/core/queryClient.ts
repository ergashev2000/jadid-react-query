interface QueryCache {
  [key: string]: { data: any; expiry: number };
}

export class QueryClient {
  private cache: QueryCache = {};

  getQueryData(key: string) {
    const cached = this.cache[key];
    if (!cached || Date.now() > cached.expiry) {
      return null;
    }
    return cached.data;
  }

  setQueryData(key: string, data: any, ttl: number) {
    const expiry = Date.now() + ttl;
    this.cache[key] = { data, expiry };
    setTimeout(() => {
      delete this.cache[key];
    }, ttl);
  }

  clear() {
    this.cache = {};
  }
}

export const queryClient = new QueryClient();
