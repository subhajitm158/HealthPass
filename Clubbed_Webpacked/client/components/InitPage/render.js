import { useEffect, useState } from 'react';
import Header from './Header';
import Body from './Body';
import QrCode from './QRCode';
import Footer from './Footer';
import './Style/style.css';
import { Redirect } from 'react-router-dom';
import { CallInitApi } from '../API_Calls/init';
import TopicRepository from '../Configuration/topic';
import { v4 as uuidv4 } from 'uuid';
import {
	deleteTopic,
	getTopic,
	validateTopic,
} from '../Configuration/managetopic';
const repository = new TopicRepository();

const InitPage = () => {
	let timer = null;
	const requestId = uuidv4();
	const ws = new WebSocket('ws://localhost:3000');
	ws.requestId = requestId;
	const [presentData, setPresentData] = useState('');

	const processResponse = async (result) => {
		if (result !== undefined) {
			if (result.topic !== undefined) {
				clearInterval(timer);
				timer = null;
				// console.log('redirecting...');
				// console.log(result.topic);
				// const isValid = await validateTopic(result.topic);
				// if (isValid) {
				// 	await deleteTopic();
				// 	setPresentData(result.data);
				// }
			} else {
				console.log('caught else of ok case');
			}
		} else {
			console.log('result is undefined');
		}
	};

	const getItems = async () => {
		const returnData = await CallInitApi();
		console.log(returnData);
		processResponse(returnData);
	};

	useEffect(() => {
		// timer = setInterval(() => getItems(), 2000);

		ws.onopen = () => {
			// on connecting, do nothing but log it to the console
			console.log('connected');
		};
		ws.onclose(requestId, (wq) => {});
		ws.onmessage = (evt) => {
			// listen to data sent from the websocket server
			const message = JSON.parse(evt.data);
			// this.setState({ dataFromServer: message });
			console.log(message);
		};
		ws.onclose(requestId, (data) => {
			console.log(
				'------------------------- DATA FROM WS SERVER =======================',
			);
			console.log(data);
		});
		ws.onclose = () => {
			console.log('disconnected');
			// automatically try to reconnect on connection loss
		};

		return () => {
			clearInterval(timer);
			timer = null;
		};
	}, []);

	return presentData ? (
		<Redirect to='/api/details' />
	) : (
		<div className='renderInit-r'>
			<Header />
			<Body />
			<QrCode ws={ws} />
			<Footer />
		</div>
	);
};

export default InitPage;
