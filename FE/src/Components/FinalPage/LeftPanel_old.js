import React, { Component } from 'react';
import QRCode from 'qrcode';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import config from '../Configuration/config.json';

class LeftPanel extends Component {
	constructor() {
		super();
		this.state = {
			tokenInfo: '',
			encodedData: '',
			data: [],
			imageUrl: '',
		};
	}

	componentDidMount() {
		axios
			.get(config['details-route'], {
				headers: {
					'x-token-auth': sessionStorage.getItem('session'),
				},
			})
			.then((response) => {
				this.setState({ encodedData: response.data }, () => {
					this.generateQR();
					this.decodeJWT();
					console.log(response.data);
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	generateQR = async () => {
		try {
			const imageUrl = await QRCode.toDataURL(this.state.encodedData);
			this.setState({ imageUrl });
		} catch (error) {
			console.error(error);
		}
	};

	decodeJWT = () => {
		try {
			let dataDec = jwt.verify(this.state.encodedData, config['jwtKey'], {
				algorithm: 'HS256',
			});
			this.setState({ data: dataDec }, console.log(dataDec));
		} catch (err) {
			console.error(err);
		}
	};

	render() {
		const space = '  ';
		return (
			<div>
				<div className='leftBckImg-l'>
					<div className='lefttag-l'>
						<p className='lefttagText-l'>Covid-19 Vaccination</p>
					</div>
					{this.state.encodedData ? (
						<div>
							<p className='leftName-l'>
								{this.state.data.map((item) => item.Name)}
							</p>
							<div className='leftQr-l'>
								<img
									src={this.state.imageUrl}
									alt='qrCode'
									className='leftQRImg-l'
								/>
							</div>
						</div>
					) : null}
					<div className='leftText-l'>
						<p className='leftTexttxt-l'>
							Please have Photo ID available when presenting your Pass for
							Verification.
						</p>
					</div>
					{this.state.encodedData ? (
						<div>
							<div className='leftDOB-l'>
								<p className='leftDOBLabel-l'>D.O.B.</p>
								{/* <p className='leftDOBText-l'>
									{this.state.data.map(
										(item) => item.payload.credentialSubject.subject.birthDate,
									)}
								</p>
							</div>
							<div className='leftExp-l'>
								<p className='leftExpLabel-l'>PASS EXPIRES</p>
								<p className='leftExpText-l'>
									{this.state.data.map(
										(item) => item.payload.credentialSubject.occurrenceDateTime,
									)}
								</p> */}
							</div>
						</div>
					) : null}
					<div className='leftPrintButton-l'>
						<button id='Print' className='leftPrintButtonBtn-l'>
							Print your Pass
						</button>
					</div>
					<div className='leftFAQ-l'>
						For more information about Excelsior Pass, please visit our{space}
						<a href='/api/details' className='leftFAQLink-l'>
							FAQ's
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default LeftPanel;
