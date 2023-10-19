import express from "express";
import { ENUM_USER_ROLE } from "../../../interface/common";
import auth from "../../middleware/auth";
import { BookingsController } from "./booking.controller";

const router = express.Router();

router.post("/Booking/create-Booking", BookingsController.insertIntoDB);
router.get("/Booking", BookingsController.getBookings);
router.get("/Booking/:id", BookingsController.getBookingsById);

router.delete("/Booking/:id", BookingsController.deleteFromDB);

router.patch(
  "/Booking/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  BookingsController.updateIntoDB
);

export const BookingRoutes = router;
