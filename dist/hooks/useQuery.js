"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuery = void 0;
var react_1 = require("react");
var fetcher_1 = require("../core/fetcher");
var QueryClientProvider_1 = require("../core/QueryClientProvider");
var useQuery = function (key, url, options) {
    if (options === void 0) { options = {}; }
    var _a = options.enabled, enabled = _a === void 0 ? true : _a, _b = options.refetchOnWindowFocus, refetchOnWindowFocus = _b === void 0 ? true : _b, _c = options.refetchOnReconnect, refetchOnReconnect = _c === void 0 ? true : _c, _d = options.staleTime, staleTime = _d === void 0 ? 5000 : _d, _e = options.cacheTime, cacheTime = _e === void 0 ? 10000 : _e, _f = options.refetchInterval, refetchInterval = _f === void 0 ? 0 : _f, _g = options.backgroundSync, backgroundSync = _g === void 0 ? true : _g, _h = options.retry, retry = _h === void 0 ? 3 : _h, _j = options.retryDelay, retryDelay = _j === void 0 ? 1000 : _j, fetchOptions = __rest(options, ["enabled", "refetchOnWindowFocus", "refetchOnReconnect", "staleTime", "cacheTime", "refetchInterval", "backgroundSync", "retry", "retryDelay"]);
    var queryClient = (0, QueryClientProvider_1.useQueryClient)();
    var _k = (0, react_1.useState)(queryClient.getQueryData(key)), data = _k[0], setData = _k[1];
    var _l = (0, react_1.useState)(null), error = _l[0], setError = _l[1];
    var _m = (0, react_1.useState)(!data), loading = _m[0], setLoading = _m[1];
    var fetchData = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!enabled)
                        return [2 /*return*/];
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, (0, fetcher_1.fetcher)(key, url, fetchOptions)];
                case 2:
                    result = _a.sent();
                    queryClient.setQueryData(key, result, cacheTime);
                    setData(result);
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    setError(err_1);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [enabled, key, url, fetchOptions, cacheTime]);
    (0, react_1.useEffect)(function () {
        if (enabled) {
            fetchData();
        }
    }, [enabled]);
    (0, react_1.useEffect)(function () {
        if (refetchOnWindowFocus) {
            var handleFocus_1 = function () { return fetchData(); };
            window.addEventListener("focus", handleFocus_1);
            return function () { return window.removeEventListener("focus", handleFocus_1); };
        }
    }, [refetchOnWindowFocus]);
    (0, react_1.useEffect)(function () {
        if (refetchOnReconnect) {
            var handleOnline_1 = function () { return fetchData(); };
            window.addEventListener("online", handleOnline_1);
            return function () { return window.removeEventListener("online", handleOnline_1); };
        }
    }, [refetchOnReconnect]);
    (0, react_1.useEffect)(function () {
        if (refetchInterval > 0) {
            var interval_1 = setInterval(fetchData, refetchInterval);
            return function () { return clearInterval(interval_1); };
        }
    }, [refetchInterval]);
    (0, react_1.useEffect)(function () {
        if (backgroundSync) {
            var handleOnline_2 = function () { return fetchData(); };
            window.addEventListener("online", handleOnline_2);
            return function () { return window.removeEventListener("online", handleOnline_2); };
        }
    }, [backgroundSync]);
    return { data: data, error: error, loading: loading, refetch: fetchData };
};
exports.useQuery = useQuery;
