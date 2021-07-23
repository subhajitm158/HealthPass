import React, { Component } from 'react';
import QRCode from 'qrcode';
import jwt from 'jsonwebtoken';
import vodafoneLogo from '../InitPage/Assets/vodafone-logo.png';
import './Style/style.css';
import config from '../Configuration/config.json';
import EncryptData from '../Encryption/Encryption';

class QRCodeClass extends Component {
	constructor() {
		super();
		this.state = {
			data: '',
			imageUrl: '',
		};
	}

	componentDidMount() {
		fetch(config['init-route'])
			.then((res) => res.json())
			.then((data) =>
				this.setState({ data }, () => {
					this.generateQR();
				})
			);
	}

	generateQR = async () => {
		try {
			const imageUrl = await QRCode.toDataURL(this.state.data);
			this.setState({ imageUrl });
			sessionStorage.setItem('session', EncryptData(this.state.data));
		} catch (error) {
			console.error(error);
		}
	};

	decodeJWT = () => {
		try {
			let dataDec = jwt.verify(this.state.encodedData, config['jwtKey'], {
				algorithm: 'HS256',
			});
			console.log(dataDec);
		} catch (err) {
			console.error(err);
		}
	};

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
				document.getElementById('qrCode').innerHTML = '';
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
