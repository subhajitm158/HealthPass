import { useEffect, useState } from 'react';
import Header from './Header';
import Body from './Body';
import QrCode from './QRCode';
import Footer from './Footer';
import './Style/style.css';
import { Redirect } from 'react-router-dom';
import { CallInitApi } from '../API_Calls/init';
import TopicRepository from '../Configuration/topic';
import { getTopic, validateTopic } from '../Configuration/managetopic';
const repository = new TopicRepository();

const InitPage = () => {
	let timer = null;
	const [presentData, setPresentData] = useState('');

	const processResponse = async (result) => {
		if (result !== undefined) {
			if (result.topic !== undefined) {
				clearInterval(timer);
				timer = null;
				console.log('redirecting...');
				console.log(result.topic);
				const topicStored = await getTopic(result.topic);
				console.log(`topic Stored 2 ${topicStored}`);
				console.log(await validateTopic(result.topic));
				// setPresentData(result.data);
			} else {
				console.log('caught else of ok case');
			}
		} else {
			console.log('result is undefined');
		}
	};

	const getItems = async () => {
		const returnData = await CallInitApi();
		processResponse(returnData);
	};

	useEffect(() => {
		// timer = setInterval(() => getItems(), 2000);
		// return () => {
		// 	clearInterval(timer);
		// 	timer = null;
		// };
	}, []);

	return presentData ? (
		<Redirect to='/api/details' />
	) : (
		<div className='renderInit-r'>
			<Header />
			<Body />
			<QrCode />
			<Footer />
		</div>
	);
};

export default InitPage;
