"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
router.post("/categories/create-category", (0, validateRequest_1.default)(category_validation_1.CategoryValidation.createCategory), category_controller_1.categoryController.insertIntoDB);
router.get("/categories", category_controller_1.categoryController.getAllFromDb);
router.get("/categories/:id", category_controller_1.categoryController.getUserById);
router.delete("/categories/:id", category_controller_1.categoryController.deleteFromDB);
router.patch("/categories/:id", (0, validateRequest_1.default)(category_validation_1.CategoryValidation.updateCategory), category_controller_1.categoryController.updateIntoDB);
exports.categoryRoutes = router;
