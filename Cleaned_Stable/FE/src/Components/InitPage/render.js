import { useEffect, useState } from 'react';
import Body from './Body';
import QrCode from './QRCode';
import io from 'socket.io-client';
import FinalRender from '../FinalPage/render';
import { v4 as uuidv4 } from 'uuid';

const socket = io(process.env.REACT_APP_SOCKET_URL, {
	transports: ['websocket', 'polling'],
});

const InitPage = () => {
	const requestId = uuidv4();
	const [presentData, setPresentData] = useState('');

	console.log('requestId:- ', requestId);

	useEffect(() => {
		socket.on('open', () => {
			console.log('socket io connected');
		});

		socket.emit('hello', 'server');

		socket.on(requestId, (data) => {
			console.log('data received from server for request id: ', requestId);
			console.log('render', data.payload);
			setPresentData(data.payload);
		});
	}, [socket]);

	return presentData ? (
		<FinalRender data={presentData} />
	) : (
		<div className='overflow-hidden'>
			<Body />
			<QrCode />
		</div>
	);
};

export default InitPage;
