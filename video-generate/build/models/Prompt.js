"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.PromptSchema = new mongoose_1.default.Schema({
    userPrompt: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: false,
    },
    device: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        enum: ['code', 'video', 'music', 'image'],
        default: 'code',
        required: true,
    },
}, {
    timestamps: true,
});
var Prompt = mongoose_1.default.model('Prompt', exports.PromptSchema);
exports.default = Prompt;
