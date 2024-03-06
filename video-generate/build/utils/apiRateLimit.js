"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_rate_limit_1 = require("express-rate-limit");
var environment_1 = __importDefault(require("../config/environment"));
var limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 30 * 60 * 1000, // 30 minutes
    limit: environment_1.default.apiRateLimit, // Limit each IP to 5 requests per `window` (here, per 30 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: 'Too many requests video generate from this IP, please try again later'
});
exports.default = limiter;
