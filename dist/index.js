"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQueryClient = exports.QueryClientProvider = exports.queryClient = exports.useInfiniteQuery = exports.useManualQuery = exports.useMutation = exports.useQuery = void 0;
var useQuery_1 = require("./hooks/useQuery");
Object.defineProperty(exports, "useQuery", { enumerable: true, get: function () { return useQuery_1.useQuery; } });
var useMutation_1 = require("./hooks/useMutation");
Object.defineProperty(exports, "useMutation", { enumerable: true, get: function () { return useMutation_1.useMutation; } });
var useManualQuery_1 = require("./hooks/useManualQuery");
Object.defineProperty(exports, "useManualQuery", { enumerable: true, get: function () { return useManualQuery_1.useManualQuery; } });
var useInfiniteQuery_1 = require("./hooks/useInfiniteQuery");
Object.defineProperty(exports, "useInfiniteQuery", { enumerable: true, get: function () { return useInfiniteQuery_1.useInfiniteQuery; } });
var queryClient_1 = require("./core/queryClient");
Object.defineProperty(exports, "queryClient", { enumerable: true, get: function () { return queryClient_1.queryClient; } });
var QueryClientProvider_1 = require("./core/QueryClientProvider");
Object.defineProperty(exports, "QueryClientProvider", { enumerable: true, get: function () { return QueryClientProvider_1.QueryClientProvider; } });
Object.defineProperty(exports, "useQueryClient", { enumerable: true, get: function () { return QueryClientProvider_1.useQueryClient; } });
