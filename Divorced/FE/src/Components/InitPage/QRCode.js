import React, { Component } from 'react';
import vodafoneLogo from '../InitPage/Assets/vodafone-logo.png';
import './Style/style.css';
import { generateQR } from '../API_Calls/init';
// import { CallInitApi } from '../API_Calls/init';
import { CompleteCall } from './DataStore/init';

class QRCodeClass extends Component {
	// constructor(props) {
	constructor() {
		// super(props);
		super();
		this.state = {
			imageUrl: '',
		};
		// this.props = props;
	}

	async componentDidMount() {
		// const returnData = await CompleteCall(this.props.ws.requestId);
		const returnData = await CompleteCall();
		// const returnData = await CallInitApi();
		// console.log('returnData passed for QR generation:', returnData);
		const imageData = await generateQR(returnData);
		this.setState({ imageUrl: imageData });
		// console.log('props', this.props);
	}

	timer() {
		var deadline =
			new Date().getTime() + process.env.REACT_APP_TIMER_REFRESH * 60000;
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
					process.env.REACT_APP_DETAILS_ROUTE +
					"'>Refresh</a>";
			}
		}, 1000);
	}

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
