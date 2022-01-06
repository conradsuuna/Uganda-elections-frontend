import express from "express";
import { findByLocationName, pollingStations, districts } from "../controllers/electionsController.js";
const router = express.Router();


router.get('/get_polling_stations', pollingStations)
router.get('/get_districts', districts)
router.post('/get_polls_by_location', findByLocationName)

export default router;