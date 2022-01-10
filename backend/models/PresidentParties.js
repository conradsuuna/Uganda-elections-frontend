import mongoose from "mongoose";

const PresidentParties = mongoose.model(
    "presidents",
    new mongoose.Schema({
        district: String,
        nrm_votes: Number,
        nrm_percentage: Number,
        nup_votes: Number,
        nup_percentage: Number,
        fdc_votes: Number,
        fdc_percentage: Number,
        ant_votes: Number,
        ant_percentage: Number,
        dp_votes: Number,
        dp_percentage: Number,
        independent_votes: Number,
        independent_percentage: Number,
    }),
    "presidents",
);

export default PresidentParties;
