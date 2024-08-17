"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
class Cache {
    constructor() {
        this.cache = new Map();
    }
    set(key, data, ttl) {
        const expiry = Date.now() + ttl;
        this.cache.set(key, { data, expiry });
    }
    get(key) {
        const cached = this.cache.get(key);
        if (!cached)
            return null;
        if (Date.now() > cached.expiry) {
            this.cache.delete(key);
            return null;
        }
        return cached.data;
    }
    delete(key) {
        this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
}
exports.cache = new Cache();
