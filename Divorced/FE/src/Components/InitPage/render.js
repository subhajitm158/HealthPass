import { useEffect, useState } from 'react';
import Body from './Body';
import QrCode from './QRCode';
import FinalRender from '../FinalPage/render';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const InitPage = () => {
	const requestId = uuidv4();
	const [presentData, setPresentData] = useState('');

	console.log('requestId', requestId);
	// let r = io.connect(
	// 	process.env.REACT_APP_BE_URL,
	// );

	useEffect(() => {
		const socket = io(process.env.REACT_APP_BE_URL, {
			transports: ['websocket', 'polling'],
		});
		// const socket = io(
		// 	process.env.REACT_APP_BE_URL,
		// 	{
		// 		transports: ['websocket', 'polling'],
		// 	},
		// );
		socket.on('open', () => {
			console.log('socket io connected');
		});

		socket.emit('hello', 'server');

		socket.on(requestId, (data) => {
			console.log('data received from server for request id: ', requestId);
			console.log(data);
			sessionStorage.setItem(requestId, JSON.stringify(data));
			setPresentData(data);
		});

		// return () => {
		// 	socket.off(requestId, () => {
		// 		console.log(requestId, 'was unmounted');
		// 	});
		// };
		//eslint-disable-next-line
	}, []);

	return presentData ? (
		<FinalRender data={presentData} />
	) : (
		<div className='overflow-hidden'>
			<Body />
			<QrCode requestId={requestId} />
		</div>
	);
};

export default InitPage;
