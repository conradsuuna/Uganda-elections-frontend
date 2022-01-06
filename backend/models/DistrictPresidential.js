import mongoose from "mongoose";

const DistrictPresidential = mongoose.model(
    "presidential_district",
    new mongoose.Schema({
        location_name: String,
        location_id: String,
        registered_voters: Number,
        voter_turnout: Number,
        winner_percentage: Number,
        year: Number,
    }),
    "presidential_district",
);

export default DistrictPresidential;
