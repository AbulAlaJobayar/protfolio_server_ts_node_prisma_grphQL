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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const bcrypt = __importStar(require("bcrypt"));
const jwtHelper_1 = require("../../helper/jwtHelper");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../shared/AppError"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //find valid user
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        },
    });
    //check password
    const checkPassword = yield bcrypt.compare(payload.password, userData.password);
    if (!checkPassword) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Password is incorrect");
    }
    // Token Data
    const tokenData = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
    };
    const accessToken = jwtHelper_1.jwtHelper.generateToken(tokenData, config_1.default.jwt.jwt_access_secret, config_1.default.jwt.jwt_access_expire_in);
    const refreshToken = jwtHelper_1.jwtHelper.generateToken(tokenData, config_1.default.jwt.jwt_refresh_secret, config_1.default.jwt.jwt_refresh_expire_in);
    return {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        token: accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedUser = jwtHelper_1.jwtHelper.verifyToken(token, config_1.default.jwt.jwt_refresh_secret);
    if (!verifiedUser) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "user Unauthorized");
    }
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: verifiedUser.id,
        },
    });
    // Token Data
    const tokenData = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
    };
    const accessToken = jwtHelper_1.jwtHelper.generateToken(tokenData, config_1.default.jwt.jwt_access_secret, config_1.default.jwt.jwt_access_expire_in);
    return accessToken;
});
const changedPassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: user.id,
        },
    });
    const isValidPassword = yield bcrypt.compare(payload.oldPassword, userData.password);
    if (!isValidPassword) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "password do not match");
    }
    const hashedPassword = yield bcrypt.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_round));
    yield prisma_1.default.user.update({
        where: {
            id: userData.id,
        },
        data: {
            password: hashedPassword,
        },
    });
    return null;
});
exports.authService = {
    loginUser,
    refreshToken,
    changedPassword,
};
