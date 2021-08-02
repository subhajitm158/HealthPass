import React, { useEffect } from 'react';
import axios from 'axios';
import config from '../Configuration/config.json';

function Validity() {
	useEffect(() => {
		axios
			.post(config['auth-route'], {
				'data': sessionStorage.getItem('session'),
			})
			.then((response) => {
				console.log(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	});

	return <h1>Auth Route</h1>;
}

export default Validity;
