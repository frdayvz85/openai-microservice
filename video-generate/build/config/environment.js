"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var environment = {
    port: process.env.PORT,
    mongoDB: {
        url: process.env.DATABASE_URL || '',
    },
    parentEmail: process.env.PARENT_EMAIL || '',
    parentPassword: process.env.PARENT_PASSWORD || '',
    clientURL: process.env.CLIENT_URL || '',
    replicateApiToken: process.env.REPLICATE_API_TOKEN || '',
    apiRateLimit: parseInt(process.env.API_RATE_LIMIT || '5'),
};
exports.default = environment;
