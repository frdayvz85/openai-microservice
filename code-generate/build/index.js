"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var db_1 = __importDefault(require("./config/db"));
var port = process.env.PORT || 5000;
(0, db_1.default)().then(function () {
    app_1.default.listen(port, function () {
        console.log("[server]: Server is running at http://localhost:".concat(port));
    });
});
