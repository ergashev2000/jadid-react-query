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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMutation = void 0;
const react_1 = require("react");
const useMutation = (mutationFn, options = {}) => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const mutate = (data) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        setIsLoading(true);
        (_a = options.onMutate) === null || _a === void 0 ? void 0 : _a.call(options, data); // Optimistik yangilanishlar uchun
        try {
            const result = yield mutationFn(data);
            (_b = options.onSuccess) === null || _b === void 0 ? void 0 : _b.call(options, result);
        }
        catch (err) {
            setError(err);
            (_c = options.onError) === null || _c === void 0 ? void 0 : _c.call(options, err);
        }
        finally {
            setIsLoading(false);
        }
    });
    return { mutate, isLoading, error };
};
exports.useMutation = useMutation;
