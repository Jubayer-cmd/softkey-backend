import express from "express";
import { ENUM_USER_ROLE } from "../../../interface/common";
import auth from "../../middleware/auth";
import { productController } from "./Product.controller";

const router = express.Router();

router.post(
  "/products/create-product",
  auth(ENUM_USER_ROLE.ADMIN),
  productController.insertIntoDB
);
router.get("/products", productController.getproducts);
router.get("/products/:id", productController.getProductById);
router.get(
  "/products/:categoryId/category",
  productController.getproductsbyCategory
);

router.delete(
  "/products/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  productController.deleteFromDB
);

router.patch(
  "/products/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  productController.updateIntoDB
);

export const productRoutes = router;
