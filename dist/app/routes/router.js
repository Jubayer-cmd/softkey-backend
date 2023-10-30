"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const blog_route_1 = require("../modules/blogs/blog.route");
const booking_route_1 = require("../modules/booking/booking.route");
const category_route_1 = require("../modules/category/category.route");
const product_route_1 = require("../modules/product/product.route");
const reviews_route_1 = require("../modules/reviews/reviews.route");
const service_route_1 = require("../modules/services/service.route");
const user_routes_1 = require("../modules/user/user.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/",
        route: auth_route_1.authRoutes,
    },
    {
        path: "/",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/",
        route: category_route_1.categoryRoutes,
    },
    {
        path: "/",
        route: blog_route_1.blogsRoutes,
    },
    {
        path: "/",
        route: service_route_1.serviceRoutes,
    },
    {
        path: "/",
        route: product_route_1.productRoutes,
    },
    {
        path: "/",
        route: reviews_route_1.reviewsRoutes,
    },
    {
        path: "/",
        route: booking_route_1.BookingRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route === null || route === void 0 ? void 0 : route.route));
exports.default = router;
