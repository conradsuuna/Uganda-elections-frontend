import axios from 'axios';

const token = 0
export default axios.create({
	baseURL: `https://uganda-elections-analysis.herokuapp.com/`,
	headers: {
		Authorization: `Bearer ` +token
	}
});