"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryClient = exports.QueryClientClass = void 0;
var QueryClientClass = /** @class */ (function () {
    function QueryClientClass() {
        this.cache = {};
    }
    QueryClientClass.prototype.getQueryData = function (key) {
        var cached = this.cache[key];
        if (!cached || Date.now() > cached.expiry) {
            return null;
        }
        return cached.data;
    };
    QueryClientClass.prototype.setQueryData = function (key, data, ttl) {
        var _this = this;
        var expiry = Date.now() + ttl;
        this.cache[key] = { data: data, expiry: expiry };
        setTimeout(function () {
            delete _this.cache[key];
        }, ttl);
    };
    QueryClientClass.prototype.clear = function () {
        this.cache = {};
    };
    return QueryClientClass;
}());
exports.QueryClientClass = QueryClientClass;
exports.queryClient = new QueryClientClass();
