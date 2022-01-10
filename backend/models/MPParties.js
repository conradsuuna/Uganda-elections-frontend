import mongoose from "mongoose";

const MPParties = mongoose.model(
    "mps_party",
    new mongoose.Schema({
        District:String,
        Constituency:String,
        Name:String,
        PoliticalParty:String,
        Votes:String,
    }),
    "mps_party",
);

export default MPParties;
