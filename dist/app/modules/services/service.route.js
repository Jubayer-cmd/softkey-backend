"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../interface/common");
const auth_1 = __importDefault(require("../../middleware/auth"));
const service_controller_1 = require("./service.controller");
const router = express_1.default.Router();
router.post("/services/create-service", (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN), service_controller_1.serviceController.insertIntoDB);
router.get("/services", service_controller_1.serviceController.getservices);
router.get("/services/:id", service_controller_1.serviceController.getUserById);
router.delete("/services/:id", (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN), service_controller_1.serviceController.deleteFromDB);
router.patch("/services/:id", (0, auth_1.default)(common_1.ENUM_USER_ROLE.ADMIN), service_controller_1.serviceController.updateIntoDB);
exports.serviceRoutes = router;
