"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
var Cache = /** @class */ (function () {
    function Cache() {
        this.cache = new Map();
    }
    Cache.prototype.set = function (key, data, ttl) {
        var expiry = Date.now() + ttl;
        this.cache.set(key, { data: data, expiry: expiry });
    };
    Cache.prototype.get = function (key) {
        var cached = this.cache.get(key);
        if (!cached)
            return null;
        if (Date.now() > cached.expiry) {
            this.cache.delete(key);
            return null;
        }
        return cached.data;
    };
    Cache.prototype.delete = function (key) {
        this.cache.delete(key);
    };
    Cache.prototype.clear = function () {
        this.cache.clear();
    };
    return Cache;
}());
exports.cache = new Cache();
