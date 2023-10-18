"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../interface/common");
const auth_1 = __importDefault(require("../../middleware/auth"));
const reviews_controller_1 = require("./reviews.controller");
const router = express_1.default.Router();
router.post("/reviews/create-reviews", (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN), reviews_controller_1.reviewsController.insertIntoDB);
router.get("/reviews", reviews_controller_1.reviewsController.getreviews);
router.get("/reviews/:id", reviews_controller_1.reviewsController.getreviewsById);
router.delete("/reviews/:id", (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN), reviews_controller_1.reviewsController.deleteFromDB);
router.patch("/reviews/:id", (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN), reviews_controller_1.reviewsController.updateIntoDB);
exports.reviewsRoutes = router;
