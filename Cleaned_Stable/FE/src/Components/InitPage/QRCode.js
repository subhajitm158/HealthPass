import React, { Component } from 'react';
import vodafoneLogo from '../InitPage/Assets/vodafone-logo.png';
import { generateQR } from '../API_Calls/details';
import { CompleteCall } from './DataStore/init';

class QRCodeClass extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageUrl: '',
		};
		this.props = props;
	}

	async componentDidMount() {
		const returnData = await CompleteCall(this.props.reqid);
		// document.getElementById('qr').innerHTML = `<p>${JSON.stringify(
		// 	returnData,
		// )}</p>`;
		// const encodedData = await encodeJWT(returnData);
		// console.log(encodedData);
		const imageData = await generateQR(returnData);
		this.setState({ imageUrl: imageData });
		console.log('props', this.props);
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
					// "QR Code expired. <a href='" + window.location.origin + process.env.REACT_APP_DETAILS_ROUTE + "'>Refresh</a>";
					"<a href='" +
					window.location.origin +
					process.env.REACT_APP_DETAILS_ROUTE +
					"'>Continue</a>";
			}
		}, 1000);
	}

	render() {
		return (
			<div>
				{/* <div id='qr'></div> */}
				<div className='row row-cols-1 row-cols-md-2 g-4'>
					<div className='col'>
						<div
							className='card'
							style={{
								border: 'none',
								float: 'right',
								paddingTop: '110px',
								paddingRight: '50px',
							}}>
							<img
								src={vodafoneLogo}
								className='card-img-top'
								alt='vf-logo'
								style={{ height: '80px', width: '280px' }}
							/>
						</div>
					</div>
					<div className='col'>
						<div
							className='card'
							style={{
								border: 'none',
								maxWidth: '450px',
								paddingLeft: '50px',
							}}>
							{this.state.imageUrl ? (
								<img
									src={this.state.imageUrl}
									alt='qrCode'
									style={{
										height: '280px',
										width: '280px',
									}}
								/>
							) : null}
							<div
								className='card-body'
								style={{
									marginLeft: '-30%',
								}}>
								<p
									className='card-title'
									id='exp-timer'
									style={{
										fontSize: '13px',
										marginTop: '-2%',
										textAlign: 'center',
									}}>
									{this.state.imageUrl ? this.timer() : null}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default QRCodeClass;
