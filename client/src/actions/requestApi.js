import axios from 'axios';
import FecthRequest as mod from "./FecthRequest";
import FecthSuccess as mod from "./FecthSuccess";
import FecthFailure as mod from "./FecthFailure";


const RequestApi() {
	return (dispatch) => {
		// API request
		axios.get('http://localhost:3003/todos')
			.then((res) => {
				console.log(res);
				//dispatch FetchSuccess, order 2;
				// dispatch (FetchSuccess(todos));
			})
			.catch((err) => {
				// dispatch FetchFailure, order 3;
				// dispatch(FetchFailure(err));
			});

		// dispatch FecthRequest, order 1
			dispatch(FecthRequest())

	}
}