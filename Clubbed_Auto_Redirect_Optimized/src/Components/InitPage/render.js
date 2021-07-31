import { useEffect, useState } from 'react';
import Header from './Header';
import Body from './Body';
import QrCode from './QRCode';
import Footer from './Footer';
import './Style/style.css';
import { Redirect } from 'react-router-dom';

const InitPage = () => {
	let timer = null;
	const [presentData, setPresentData] = useState('');

	const processResponse = (result) => {
		if (result !== 'undefined') {
			if (result.data === 'true') {
				console.log('redirecting...');
				setPresentData(result.data);
			} else {
				console.log('caught else of ok case');
			}
		} else {
			console.log('result is undefined');
		}
	};

	const getItems = () => {
		fetch('/be/api/auth', {
			method: 'get',
			headers: { 'Content-Type': 'application/json' },
		})
			.then((resp) => resp.json())
			.then((result) => processResponse(result));
	};

	useEffect(() => {
		// Call Listener
		// eslint-disable-next-line
		timer = setInterval(() => getItems(), 2000);
		return () => {
			// Remove Listener
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
			<QrCode />
			<Footer />
		</div>
	);
};

export default InitPage;
