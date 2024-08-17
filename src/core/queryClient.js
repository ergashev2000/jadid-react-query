"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryClient = void 0;
const cache_1 = require("./cache");
class QueryClient {
    setQueryData(key, data, ttl = 5000) {
        cache_1.cache.set(key, data, ttl);
    }
    getQueryData(key) {
        return cache_1.cache.get(key);
    }
    invalidateQueries(key) {
        cache_1.cache.delete(key);
    }
    clear() {
        cache_1.cache.clear();
    }
}
exports.queryClient = new QueryClient();
