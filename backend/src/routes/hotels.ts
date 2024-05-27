import { Router } from "express";
import {
  searchHotelById,
  searchHotels,
} from "../controllers/hotels.controllers";
import { param } from "express-validator";

const router = Router();

router.get("/search", searchHotels);

// /url/:1234 view details of a particular hotel
router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel Id is required")],
  searchHotelById
);

export default router;
