import mongoose from "mongoose";

const VoterTurnOut = mongoose.model(
    "voter_turnout",
    new mongoose.Schema({
        LocationName: String,
        LocationID: String,
        RegisteredVoters: String,
        VoterTurnout: String,
        InvalidBallots: String,
        ValidBallots: String,
        TotalBallots: String,
        PercentageOfInvalidBallots: String,
	}),
    "voter_turnout",
);

export default VoterTurnOut;
