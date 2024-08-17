"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryClient = exports.QueryClient = void 0;
var QueryClient = /** @class */ (function () {
    function QueryClient() {
        this.cache = {};
    }
    QueryClient.prototype.getQueryData = function (key) {
        var cached = this.cache[key];
        if (!cached || Date.now() > cached.expiry) {
            return null;
        }
        return cached.data;
    };
    QueryClient.prototype.setQueryData = function (key, data, ttl) {
        var _this = this;
        var expiry = Date.now() + ttl;
        this.cache[key] = { data: data, expiry: expiry };
        setTimeout(function () {
            delete _this.cache[key];
        }, ttl);
    };
    QueryClient.prototype.clear = function () {
        this.cache = {};
    };
    return QueryClient;
}());
exports.QueryClient = QueryClient;
exports.queryClient = new QueryClient();
