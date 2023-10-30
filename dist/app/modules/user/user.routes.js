"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get("/users", user_controller_1.userController.getAllUser);
router.get("/profile", user_controller_1.userController.getProfile);
router.get("/users/:id", user_controller_1.userController.getUserById);
router.delete("/users/:id", user_controller_1.userController.deleteFromDB);
router.patch("/users/:id", user_controller_1.userController.updateIntoDB);
exports.userRoutes = router;
