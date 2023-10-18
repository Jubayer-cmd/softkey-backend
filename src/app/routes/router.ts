import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { blogsRoutes } from "../modules/blogs/blog.route";
import { categoryRoutes } from "../modules/category/category.route";
import { serviceRoutes } from "../modules/services/service.route";
import { userRoutes } from "../modules/user/user.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: authRoutes,
  },
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/",
    route: categoryRoutes,
  },
  {
    path: "/",
    route: blogsRoutes,
  },
  {
    path: "/",
    route: serviceRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route?.route));
export default router;
