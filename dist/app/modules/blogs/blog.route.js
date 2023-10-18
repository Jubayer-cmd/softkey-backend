"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../interface/common");
const auth_1 = __importDefault(require("../../middleware/auth"));
const blog_controller_1 = require("./blog.controller");
const router = express_1.default.Router();
router.post("/blogs/create-blogs", (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN), blog_controller_1.blogsController.insertIntoDB);
router.get("/blogs", blog_controller_1.blogsController.getblogs);
router.get("/blogs/:id", blog_controller_1.blogsController.getblogsById);
router.delete("/blogs/:id", (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN), blog_controller_1.blogsController.deleteFromDB);
router.patch("/blogs/:id", (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN), blog_controller_1.blogsController.updateIntoDB);
exports.blogsRoutes = router;
