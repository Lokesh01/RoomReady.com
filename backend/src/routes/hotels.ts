import { Router } from "express";
import { searchHotels } from "../controllers/hotels.controllers";

const router = Router();

router.get("/search",searchHotels);

export default router;