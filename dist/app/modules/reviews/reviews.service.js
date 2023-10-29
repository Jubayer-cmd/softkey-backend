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
exports.reviewservice = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userReview.create({
        data,
    });
    return result;
});
const getAllFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    // Use Prisma to fetch UserReview records and include the related user information
    const result = yield prisma_1.default.userReview.findMany({
        include: {
            user: true, // This includes the related user information
        },
    });
    return result;
});
const getreviewsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userReview.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userReview.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userReview.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.reviewservice = {
    insertIntoDB,
    getreviewsById,
    updateIntoDB,
    deleteFromDB,
    getAllFromDb,
};
