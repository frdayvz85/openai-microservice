"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = __importDefault(require("os"));
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var http_proxy_middleware_1 = require("http-proxy-middleware");
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT || 8000;
var nodeCGApiUrl = process.env.CODE_GENERATE_API_URL || "";
var nodeVGApiUrl = process.env.VIDEO_GENERATE_API_URL || "";
process.on('uncaughtException', function (err) {
    console.log(err);
});
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('tiny'));
// Proxy routes
var proxyMiddlewareCode = (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: nodeCGApiUrl ? nodeCGApiUrl : 'http://www.example.org',
    changeOrigin: true,
    pathRewrite: {
        '^/code-generate': '',
    },
});
var proxyMiddlewareVideo = (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: nodeVGApiUrl ? nodeVGApiUrl : 'http://www.example.org',
    changeOrigin: true,
    pathRewrite: {
        '^/video-generate': '',
    },
});
app.use('/code-generate', proxyMiddlewareCode);
app.use('/video-generate', proxyMiddlewareVideo);
app.get("/", function (req, res) {
    var message = "API is working as expected - API gateway: ".concat(os_1.default.hostname());
    console.log(message);
    res.send(message);
});
app.listen(port, function () {
    console.log("[server]: Server is running at http://localhost:".concat(port));
});
