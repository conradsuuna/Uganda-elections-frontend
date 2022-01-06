import express from "express";
import { findPollingStationWinners, pollingStationsByDistrictName, districts, getAny, pollingStationsWinnersByDistrict } from "../controllers/electionsController.js";
const router = express.Router();


router.post('/get_polling_stations', pollingStationsByDistrictName)
router.get('/get_districts', districts)
router.post('/get_polls_winners', findPollingStationWinners)
router.post('/get_polling_stations_by_district', pollingStationsWinnersByDistrict)

router.get('/get_any', getAny)

export default router;