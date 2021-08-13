import React, { Component } from 'react';
import mainLogo from '../InitPage/Assets/main-logo.png';

class Body extends Component {
	render() {
		return (
			<div>
				<div style={{ textAlign: 'center', height: 'auto' }}>
					<img
						src={mainLogo}
						alt='mainLogo'
						className='img-fluid'
						style={{
							height: '90px',
						}}
					/>
				</div>
				<div style={{ marginLeft: '200px', marginRight: '200px' }}>
					<h2 className='display-4' style={{ fontSize: '30px' }}>
						Connect to your Wallet
					</h2>
					<p className='text-justify text-muted' style={{ fontSize: '15px' }}>
						From your Vodafone Wallet, scan the QR code below to connect your wallet to the website and complete the identity validation process
					</p>
				</div>
			</div>
		);
	}
}

export default Body;
