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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const envConfig_1 = __importDefault(require("../../../config/envConfig"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../utils/jwtHelpers");
const prisma_1 = __importDefault(require("../../../utils/prisma"));
// creating user
const createUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(user === null || user === void 0 ? void 0 : user.password, Number(envConfig_1.default.bycrypt_salt_rounds));
    user.password = hashedPassword;
    const result = yield prisma_1.default.user.create({
        data: user,
    });
    if (!result) {
        throw new ApiError_1.default(400, "failed to create User");
    }
    return result;
});
// getByemail
const getByEmailFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    return result;
});
// checkPassword
const checkPassword = (givenPassword, savedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(givenPassword, savedPassword);
});
// login
const loginUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    console.log("loging try");
    const isUserExist = yield getByEmailFromDB(payload === null || payload === void 0 ? void 0 : payload.email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User does not exist");
    }
    if (isUserExist.password &&
        !(yield checkPassword(password, isUserExist.password))) {
        throw new ApiError_1.default(401, "Password is incorrect");
    }
    //create access token & refresh token
    const { id: userId, role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, email }, envConfig_1.default.jwt.secret, envConfig_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, email }, envConfig_1.default.jwt.refresh_secret, envConfig_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
// getrefresh
const getRefreshTokenService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, envConfig_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(403, "Invalid Refresh Token");
    }
    const { email } = verifiedToken;
    // checking deleted user's refresh token
    const isUserExist = yield getByEmailFromDB(email);
    if (!isUserExist) {
        throw new ApiError_1.default(404, "User does not exist");
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        userId: isUserExist.id,
        role: isUserExist.role,
        email: isUserExist.email,
    }, envConfig_1.default.jwt.secret, envConfig_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.authService = {
    createUserService,
    loginUserService,
    getByEmailFromDB,
    getRefreshTokenService,
};
