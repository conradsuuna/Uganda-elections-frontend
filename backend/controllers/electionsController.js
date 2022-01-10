import PollingPresidential from "../models/PollingStations.js";
import DistrictPresidential from "../models/DistrictPresidential.js";
import VoterTurnOut from "../models/VoterTurnOut.js";
import PollingStationWinner from "../models/PollingStationWinner.js";
import PresidentParties from "../models/PresidentParties.js";
import MPParties from "../models/MPParties.js";

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

export const getParliamentaryPresidentialPercentagesByParty = async (req, res) => {
	try {
		const {
            district_name,
        } = req.body;

		let nrm_percentage = 0
		let nup_percentage = 0
		let fdc_percentage = 0
		let ant_percentage = 0
		let dp_percentage = 0
		let independent_percentage = 0

		let total_votes = 0

		const mp_parties = await MPParties.find({District:district_name}, '-_id -Name')
		mp_parties.forEach(d => {
			total_votes += parseFloat(Number(d.Votes.replace(',','')))
		});
		
		mp_parties.forEach(d => {
			if(d.PoliticalParty.includes('NUP')){
				nup_percentage += (parseFloat(Number(d.Votes.replace(',',''))) / total_votes) * 100
			}
			else if(d.PoliticalParty.includes('NRM')){
				nrm_percentage += (parseFloat(Number(d.Votes.replace(',',''))) / total_votes) * 100
			}
			else if(d.PoliticalParty.includes('INDEPENDENT')){
				independent_percentage += (parseFloat(Number(d.Votes.replace(',',''))) / total_votes) * 100
			}
			else if(d.PoliticalParty.includes('DP')){
				dp_percentage += (parseFloat(Number(d.Votes.replace(',',''))) / total_votes) * 100
			}
			else if(d.PoliticalParty.includes('FDC')){
				fdc_percentage += (parseFloat(Number(d.Votes.replace(',',''))) / total_votes) * 100
			}
			else{
				ant_percentage += (parseFloat(Number(d.Votes.replace(',',''))) / total_votes) * 100
			}
		});

		const mp_data = {
			nrm_percentage: nrm_percentage,
			nup_percentage: nup_percentage,
			fdc_percentage: fdc_percentage,
			ant_percentage: ant_percentage,
			dp_percentage: dp_percentage,
			independent_percentage: independent_percentage
		}
	
		const president_parties = await PresidentParties.find({district:district_name},
			 'nrm_percentage nup_percentage fdc_percentage ant_percentage dp_percentage independent_percentage -_id')
		
        res.status(200).json([president_parties[0],mp_data]);
	} catch (error) {
		res.status(404).json({ message: error });
		console.log(error);
	}
};


export const getPresidentialVoterTurnoutTrend = async (req, res) => {
	try {

		const {
            district_name,
        } = req.body;

		const turnout_trend = await DistrictPresidential.find({location_name:district_name}, 'year voter_turnout -_id').sort('year') 
        res.status(200).json(turnout_trend );
	} catch (error) {
		res.status(404).json({ message: error });
		console.log(error);
	}
};


