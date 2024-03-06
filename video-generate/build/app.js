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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var os_1 = __importDefault(require("os"));
var replicate_1 = __importDefault(require("replicate"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var environment_1 = __importDefault(require("./config/environment"));
var apiRateLimit_1 = __importDefault(require("./utils/apiRateLimit"));
var Prompt_1 = __importDefault(require("./models/Prompt"));
dotenv_1.default.config();
var replicate = new replicate_1.default({
    auth: environment_1.default.replicateApiToken,
});
var app = (0, express_1.default)();
var allowedOrigins = ["http://localhost:3000", "http://fdev-test.info"];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = "The CORS policy for this site does not " +
                "allow access from the specified Origin.";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
}));
app.use((0, morgan_1.default)("tiny"));
// Body parser, reading data from body into req.body
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    var message = "API is working as expected - video generate: ".concat(os_1.default.hostname());
    console.log(message);
    res.send(message);
});
app.post("/video", apiRateLimit_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var prompt, ip, userAgent, response, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                prompt = req.body.prompt;
                ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
                userAgent = req.headers["user-agent"];
                console.log("Started to generate a video", prompt);
                return [4 /*yield*/, replicate.run("anotherjesse/zeroscope-v2-xl:71996d331e8ede8ef7bd76eba9fae076d31792e4ddf4ad057779b443d6aea62f", {
                        input: {
                            prompt: prompt,
                        },
                    })];
            case 1:
                response = _b.sent();
                // Save prompt to DB
                return [4 /*yield*/, Prompt_1.default.create({
                        userPrompt: prompt,
                        ip: ip,
                        device: userAgent,
                        type: "video",
                    })];
            case 2:
                // Save prompt to DB
                _b.sent();
                console.log(response);
                res.status(200).send({
                    result: response,
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error("[VIDEO_ERROR]", error_1);
                res.status(500).send(((_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.error) === null || _a === void 0 ? void 0 : _a.message) || "Something went wrong");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// If API doesn't exsist
app.use(function (req, res, next) {
    var error = new Error("Endpoint Not found...");
    res.status(404);
    next(error);
});
app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});
exports.default = app;
