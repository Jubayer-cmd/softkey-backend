import express from "express";
import { ENUM_USER_ROLE } from "../../../interface/common";
import auth from "../../middleware/auth";
import { reviewsController } from "./reviews.controller";

const router = express.Router();

router.post("/reviews/create-reviews", reviewsController.insertIntoDB);
router.get("/reviews", reviewsController.getreviews);
router.get("/reviews/:id", reviewsController.getreviewsById);

router.delete(
  "/reviews/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  reviewsController.deleteFromDB
);

router.patch(
  "/reviews/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  reviewsController.updateIntoDB
);

export const reviewsRoutes = router;
