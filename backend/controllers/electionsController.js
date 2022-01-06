import PollingPresidential from "../models/PollingStations.js";
import DistrictPresidential from "../models/DistrictPresidential.js";
import VoterTurnOut from "../models/VoterTurnOut.js";

export const pollingStations = async (req, res) => {
	try {
		const polling_stations = await PollingPresidential.find({}, 'LocationName')
        res.status(200).json({ data: polling_stations });
	} catch (error) {
		res.status(404).json({ message: error });
		console.log(error);
	}
};

export const findByLocationName = async (req, res) => {
	try {
        const {
            LocationName,
        } = req.body;

		const data = await PollingPresidential.find({LocationName:LocationName},
            "MuseveniPercentage MaoPercentage KyagulanyiPercentage MuntuPercentage\
             MwesigyePercentage MayambalaPercentage TumukundePercentage AmuriatPercentage\
             NancyPercentage KatumbaPercentage KabuletaPercentage -_id")

        res.status(200).json(data[0]);
	} catch (error) {
		res.status(404).json({ message: error });
		console.log(error);
	}
};

export const districts = async (req, res) => {
	try {
		const districts = await DistrictPresidential.find({}, 'location_name location_id')
        res.status(200).json({ data: districts });
	} catch (error) {
		res.status(404).json({ message: error });
		console.log(error);
	}
};

export const pollingStationsByDistrict = async (req, res) => {
	try {
        const {
            LocationName,
        } = req.body;

		const data = await PollingPresidential.find({LocationName:LocationName},
            "MuseveniPercentage MaoPercentage KyagulanyiPercentage MuntuPercentage\
             MwesigyePercentage MayambalaPercentage TumukundePercentage AmuriatPercentage\
             NancyPercentage KatumbaPercentage KabuletaPercentage -_id")

        res.status(200).json(data[0]);
	} catch (error) {
		res.status(404).json({ message: error });
		console.log(error);
	}
};



