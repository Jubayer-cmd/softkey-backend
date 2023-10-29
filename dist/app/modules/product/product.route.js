"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../interface/common");
const auth_1 = __importDefault(require("../../middleware/auth"));
const Product_controller_1 = require("./Product.controller");
const router = express_1.default.Router();
router.post("/products/create-product", Product_controller_1.productController.insertIntoDB);
router.get("/products", Product_controller_1.productController.getproducts);
router.get("/products/:id", Product_controller_1.productController.getProductById);
router.get("/products/:categoryId/category", Product_controller_1.productController.getproductsbyCategory);
router.delete("/products/:id", Product_controller_1.productController.deleteFromDB);
router.patch("/products/:id", (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN), Product_controller_1.productController.updateIntoDB);
exports.productRoutes = router;
