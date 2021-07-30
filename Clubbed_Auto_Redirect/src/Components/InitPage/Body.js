import React, { Component } from 'react';
import mainLogo from '../InitPage/Assets/main-logo.png';
import './Style/style.css';

class Body extends Component {
	render() {
		return (
			<div>
				<div className='bodyMain-b'>
					<img src={mainLogo} alt='mainLogo' className='mLogo-b' />
				</div>
				<br />
				<br />
				<div className='textDiv-b'>
					<h2 className='textH2-b'>Connect to your Wallet</h2>
					<p className='textP-b'>
						From your Vodafone Wallet, scan the QR code below to connect your
						wallet to the website and complete the identity validation process
					</p>
				</div>
				<br />
				<br />
			</div>
		);
	}
}

export default Body;
