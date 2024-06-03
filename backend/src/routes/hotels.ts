import { Router } from "express";
import {
  ConfirmBooking,
  createPaymentIntent,
  searchHotelById,
  searchHotels,
} from "../controllers/hotels.controllers";
import { param } from "express-validator";
import verifyToken from "../middleware/auth";

const router = Router();

router.get("/search", searchHotels);

// /url/:1234 view details of a particular hotel
router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel Id is required")],
  searchHotelById
);

router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  createPaymentIntent
);

router.post("/:hotelId/bookings",verifyToken,ConfirmBooking);

export default router;
