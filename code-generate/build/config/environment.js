"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var environment = {
    port: process.env.PORT,
    database: {
        port: parseInt(process.env.DB_PORT || '3306', 10),
        name: process.env.DB_NAME || '',
        host: process.env.DB_HOST || '',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
    },
    mongoDB: {
        url: process.env.DATABASE_URL || '',
    },
    accessToken: process.env.ACCESS_TOKEN_PRIVATE_KEY || '',
    refreshToken: process.env.REFRESH_TOKEN_PRIVATE_KEY || '',
    parentEmail: process.env.PARENT_EMAIL || '',
    parentPassword: process.env.PARENT_PASSWORD || '',
    clientURL: process.env.CLIENT_URL || '',
    openAIToken: process.env.OPENAI_API_TOKEN || '',
    apiRateLimit: parseInt(process.env.API_RATE_LIMIT || '5'),
};
exports.default = environment;
