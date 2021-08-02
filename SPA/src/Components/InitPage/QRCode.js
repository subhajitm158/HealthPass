import React, { Component } from 'react';
import vodafoneLogo from '../InitPage/Assets/vodafone-logo.png';
import './Style/style.css';
import config from '../Configuration/config.json';
import { generateQR } from '../API_Calls/init';
// import { CallInitApi } from '../API_Calls/init';
import { CompleteCall } from './DataStore/init';

class QRCodeClass extends Component {
	constructor() {
		super();
		this.state = {
			imageUrl: '',
		};
	}

	async componentDidMount() {
		const returnData = await CompleteCall();
		// const returnData = await CallInitApi();
		const imageData = await generateQR(returnData);
		this.setState({ imageUrl: imageData });
	}

	timer = () => {
		var deadline = new Date().getTime() + config['timer-refresh'] * 60000;
		var x = setInterval(function () {
			var now = new Date().getTime();
			var t = deadline - now;
			var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((t % (1000 * 60)) / 1000);
			document.getElementById('exp-timer').innerHTML =
				'QR code expires in: ' + minutes + 'm ' + seconds + 's ';
			if (t < 0) {
				clearInterval(x);
				document.getElementById('exp-timer').innerHTML =
					"QR Code expired. <a href='" +
					window.location.origin +
					config['details-fe-route'] +
					"'>Refresh</a>";
			}
		}, 1000);
	};

	render() {
		return (
			<div className='qrDivMain-q'>
				<img src={vodafoneLogo} alt='vodafoneLogo' className='qrLogo-q' />
				<div id='qrCode' className='qrDiv-q'>
					{this.state.imageUrl ? (
						<img
							src={this.state.imageUrl}
							alt='qrCode'
							className='qrDivImg-q'
						/>
					) : null}
				</div>
				<div id='exp-timer' className='qrTimerDiv-q'>
					{this.state.imageUrl ? this.timer() : null}
				</div>
			</div>
		);
	}
}

export default QRCodeClass;
