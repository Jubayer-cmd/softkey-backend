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
exports.productController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const pick_1 = __importDefault(require("../../../utils/pick"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const product_constants_1 = require("./product.constants");
const product_service_1 = require("./product.service");
const insertIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const price = parseInt(req.body.price, 10); // Assuming base 10 for decimal numbers
    const quantity = parseInt(req.body.quantity, 10); // Assuming base 10 for decimal numbers
    console.log(price, quantity);
    const result = yield product_service_1.productService.insertIntoDB(Object.assign(Object.assign({}, req.body), { price,
        quantity }));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "product created successfully",
        data: result,
    });
}));
const getproducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("woooow", req.query);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const filters = (0, pick_1.default)(req.query, product_constants_1.productFilterableFields);
    const result = yield product_service_1.productService.getAllProducts(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Books fetched successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getproductsbyCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const options = (0, pick_1.default)(req.query, ["limit", "page"]);
    const result = yield product_service_1.productService.getProductsbyCategoryService(categoryId, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "products with associated category data fetched successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getProductById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productService.getProductById(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "product fetched successfully",
        data: result,
    });
}));
const deleteFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productService.deleteFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "product deleted successfully",
        data: result,
    });
}));
const updateIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productService.updateIntoDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "product updated successfully",
        data: result,
    });
}));
exports.productController = {
    insertIntoDB,
    getProductById,
    updateIntoDB,
    deleteFromDB,
    getproducts,
    getproductsbyCategory,
};
