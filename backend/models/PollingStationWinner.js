import mongoose from "mongoose";

const PollingStationWinner = mongoose.model(
    "polling_station_winners",
    new mongoose.Schema({
        location_name: String,
        location_id: String,
        winner_percentage: Number,
        registered_voters: Number,
        voter_turnout: Number,
        year: Number,
	}),
    "polling_station_winners",
);

export default PollingStationWinner;
