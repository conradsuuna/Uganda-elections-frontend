import axios from 'axios';

const token = 0
export default axios.create({
	baseURL: `http://127.0.0.1:5000/`,
	headers: {
		Authorization: `Bearer ` +token
	}
});