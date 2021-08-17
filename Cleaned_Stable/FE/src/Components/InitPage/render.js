import { useEffect, useState } from 'react';
import Body from './Body';
import QrCode from './QRCode';
import io from 'socket.io-client';
import FinalRender from '../FinalPage/render';
import { v4 as uuidv4 } from 'uuid';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';

const socket = io(process.env.REACT_APP_SOCKET_URL, {
	transports: ['websocket', 'polling'],
});

const InitPage = () => {
	let requestId = '';
	const [presentData, setPresentData] = useState('');
	const [cookies, setCookie] = useCookies('reqid');

	if (cookies.reqid === undefined) {
		console.log('if');
		requestId = uuidv4();
		setCookie('reqid', requestId, { maxAge: 1000, path: '/' });
	} else {
		console.log('else');
		requestId = cookies.reqid;
	}

	console.log('requestId:- ', requestId);

	useEffect(() => {
		function socketCall() {
			console.log('func');
			socket.on('open', () => {
				console.log('socket io connected');
			});

			socket.emit('hello', 'server');

			socket.on(requestId, (data) => {
				console.log('data received from server for request id: ', requestId);
				console.log('render', data.payload);
				setCookie(requestId, JSON.stringify(data.payload), { maxAge: 900 });
				setPresentData(data.payload);
			});
		}

		if (presentData === '') {
			socketCall();
		}
		//eslint-disable-next-line
	}, [socket]);

	return Cookies.get(requestId) ? (
		<FinalRender data={Cookies.get(requestId)} />
	) : (
		<div className='overflow-hidden'>
			<Body />
			<QrCode reqid={requestId} />
		</div>
	);
};

export default InitPage;
