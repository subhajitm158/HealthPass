import React, { useState, useEffect } from 'react';
import {
	CallDetailsLoginApi,
	CallDetailsQRApi,
	GetName,
} from '../API_Calls/details';
import * as ReactBootStrap from 'react-bootstrap';

const Header = ({ name }) => {
	// const [name, setName] = useState('');
	// const [loading, setLoading] = useState(0);

	// useEffect(() => {
	// 	async function ab() {
	// 		const returnData = await CallDetailsLoginApi();
	// 		const returnqr = await CallDetailsQRApi(returnData);
	// 		const Name = await GetName(returnqr);
	// 		setName(Name);
	// 		setLoading(loading + 50);

	// 		setTimeout(() => {
	// 			if (loading > 100) setLoading(loading + 15);
	// 			else {
	// 				setLoading(loading + (100 - loading));
	// 			}
	// 		}, 50);
	// 	}

	// 	ab();
	// }, [loading]);

	return (
		<div>
			{name ? (
				<div>
					<h2
						className='display-4'
						style={{
							fontSize: '20px',
							fontWeight: '400',
						}}>
						Hi, {name}. Here's your Pass.
					</h2>
					<p className='text-muted' style={{ fontSize: '10px' }}>
						Your pass is now active. Be sure to save your pass before you leave.
					</p>
				</div>
			) : (
				<h2
					className='display-4'
					style={{
						fontSize: '30px',
						fontWeight: '400',
					}}>
					Loading...
				</h2>
				// <div>
				// 	<ReactBootStrap.ProgressBar
				// 		animated
				// 		now={loading}
				// 		style={{ marginRight: '25px' }}
				// 		label={`${loading}% Completed`}
				// 	/>
				// 	<br />
				// </div>
				// <div></div>
			)}
		</div>
	);
};

export default Header;
