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
exports.useManualQuery = void 0;
const react_1 = require("react");
const fetcher_1 = require("../core/fetcher");
const queryClient_1 = require("../core/queryClient");
const useManualQuery = (key, url, options = {}) => {
    const { ttl = 5000 } = options, fetchOptions = __rest(options, ["ttl"]);
    const [data, setData] = (0, react_1.useState)(queryClient_1.queryClient.getQueryData(key));
    const [error, setError] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        try {
            const result = yield (0, fetcher_1.fetcher)(key, url, fetchOptions, ttl);
            queryClient_1.queryClient.setQueryData(key, result, ttl);
            setData(result);
        }
        catch (err) {
            setError(err);
        }
        finally {
            setLoading(false);
        }
    });
    return { data, error, loading, fetchData };
};
exports.useManualQuery = useManualQuery;
