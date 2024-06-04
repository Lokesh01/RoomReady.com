import { Router } from "express";
import verifyToken from "../middleware/auth";
import { fetchCurrentUserBookings } from "../controllers/my-hotel-bookings.controllers";

const router = Router();

router.get("/", verifyToken, fetchCurrentUserBookings);

export default router;
