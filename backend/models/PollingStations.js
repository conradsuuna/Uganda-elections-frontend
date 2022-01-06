import mongoose from "mongoose";

const PollingPresidential = mongoose.model(
    "presidential_polling_station",
    new mongoose.Schema({
        LocationName: String,
        MuseveniNo: String,
        MuseveniPercentage: String,
        MaoNo: String,
        MaoPercentage: String,
        KyagulanyiNo: String,
        KyagulanyiPercentage: String,
        MuntuNo: String,
        MuntuPercentage: String,
        MwesigyeNo: String,
        MwesigyePercentage: String,
        MayambalaNo: String,
        MayambalaPercentage: String,
        TumukundeNo: String,
        TumukundePercentage: String,
        AmuriatNo: String,
        AmuriatPercentage: String,
        NancyNo: String,
        NancyPercentage: String,
        KatumbaNo: String,
        KatumbaPercentage: String,
        KabuletaNo: String,
        KabuletaPercentage: String,
	}),
    "presidential_polling_station",
);

export default PollingPresidential;
