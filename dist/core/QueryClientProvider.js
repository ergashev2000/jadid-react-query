"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClientProvider = exports.useQueryClient = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var QueryClientContext = (0, react_1.createContext)(undefined);
var useQueryClient = function () {
    var context = (0, react_1.useContext)(QueryClientContext);
    if (!context) {
        throw new Error('useQueryClient must be used within a QueryClientProvider');
    }
    return context;
};
exports.useQueryClient = useQueryClient;
var QueryClientProvider = function (_a) {
    var client = _a.client, children = _a.children;
    return ((0, jsx_runtime_1.jsx)(QueryClientContext.Provider, { value: client, children: children }));
};
exports.QueryClientProvider = QueryClientProvider;
