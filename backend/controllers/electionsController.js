import PollingPresidential from "../models/PollingStations.js";
import DistrictPresidential from "../models/DistrictPresidential.js";
import VoterTurnOut from "../models/VoterTurnOut.js";
import PollingStationWinner from "../models/PollingStationWinner.js";

export const districts = async (req, res) => {
	try {
		const districts = await DistrictPresidential.find({year:2021}, 'location_name location_id').sort({ location_name: 'asc'});
        res.status(200).json(districts );
	} catch (error) {
		res.status(404).json({ message: error });
		console.log(error);
	}
};

export const pollingStationsByDistrictName = async (req, res) => {
	try {
        const {
            location_id,
        } = req.body;

		const polling_stations = await PollingStationWinner.find({location_id:{$regex : "^" + location_id}, year:2021},
			 "location_name").sort({ location_name: 'asc'});

        res.status(200).json(polling_stations);
	} catch (error) {
		res.status(404).json({ message: error });
		console.log(error);
	}
};

export const findPollingStationWinners = async (req, res) => {
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

export const pollingStationsWinnersByDistrict = async (req, res) => {
	try {
        const {
            location_id,
        } = req.body;

		const polling_stations = await PollingStationWinner.find({location_id:{$regex : "^" + location_id}, year:2021},
			 "winner_percentage voter_turnout -_id")

        res.status(200).json(polling_stations);
	} catch (error) {
		res.status(404).json({ message: error });
		console.log(error);
	}
};

export const getAny = async (req, res) => {
	try {
		const districts = await DistrictPresidential.find({year:2021, location_name:"Kalungu"}, 'location_name')
        res.status(200).json(districts[0] );
	} catch (error) {
		res.status(404).json({ message: error });
		console.log(error);
	}
};

