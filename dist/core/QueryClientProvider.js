"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQueryClient = exports.QueryClientProvider = void 0;
var react_1 = __importStar(require("react"));
var queryClient_1 = require("./queryClient");
var QueryClientContext = (0, react_1.createContext)(undefined);
var QueryClientProvider = function (_a) {
    var children = _a.children;
    return (react_1.default.createElement(QueryClientContext.Provider, { value: queryClient_1.queryClient }, children));
};
exports.QueryClientProvider = QueryClientProvider;
var useQueryClient = function () {
    var context = (0, react_1.useContext)(QueryClientContext);
    if (context === undefined) {
        throw new Error('useQueryClient must be used within a QueryClientProvider');
    }
    return context;
};
exports.useQueryClient = useQueryClient;
