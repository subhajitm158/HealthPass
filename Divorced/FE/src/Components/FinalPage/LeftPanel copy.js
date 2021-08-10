import React, { useState, useEffect } from 'react';
import dot from './Assets/dot.png';
import main from './Assets/main.jpg';
import {
	CallDetailsLoginApi,
	CallDetailsQRApi,
	generateQR,
	GetDateofBirth,
	GetName,
	GetPassExpirationDate,
} from '../API_Calls/details';

function LeftPanel() {
	const [name, setName] = useState('');
	const [dob, setDOB] = useState('');
	const [passExp, setPassExp] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const space = '  ';

	useEffect(() => {
		async function fetchData() {
			const returnData = await CallDetailsLoginApi();
			const returnqr = await CallDetailsQRApi(returnData);
			const imgurl = await generateQR(JSON.stringify(returnqr));
			setImageUrl(imgurl);
			const Name = await GetName(returnqr);
			setName(Name);
			const DOB = await GetDateofBirth(returnqr);
			setDOB(DOB);
			const exp = await GetPassExpirationDate(returnqr);
			setPassExp(exp);
		}

		fetchData();
	}, []);

	return (
		<div>
			<div className='card text-white' style={{ border: 'none' }}>
				<img
					className='card-img'
					src={main}
					style={{ height: '370px', borderRadius: '5%' }}
					alt='Card image'
				/>
				<div
					className='card-img-overlay'
					style={{
						width: '40%',
						marginLeft: '65%',
						height: '10%',
						marginTop: '13%',
					}}>
					<div
						style={{
							backgroundColor: '#fff',
							textAlign: 'center',
							borderRadius: '5px',
						}}>
						<h6 className='card-title' style={{ color: '#543a29' }}>
							Covid-19 Vaccination
						</h6>
					</div>
				</div>
				<div
					className='card-img-overlay'
					style={{
						marginTop: '-1%',
					}}>
					{name && dob && passExp ? (
						<div>
							<h2
								className='display-4'
								style={{
									fontSize: '20px',
									fontWeight: '500',
									marginTop: '12%',
									marginLeft: '5%',
								}}>
								{name}
							</h2>
							<img
								src={imageUrl}
								alt='qrCode'
								style={{ height: '38%', width: '38%', marginLeft: '5%' }}
							/>
						</div>
					) : null}
				</div>
				<div className='card-img-overlay'>
					<div style={{ marginTop: '56%', marginLeft: '5%' }}>
						<p className='text-light'>
							Please have Photo ID available when presenting your Pass for
							Verification.
						</p>
					</div>
				</div>
				<div className='card-img-overlay'>
					{name && dob && passExp ? (
						<div style={{ margin: '20% 0% 0% 60%', fontWeight: '500' }}>
							<div>
								<h2
									className='display-4'
									style={{
										fontSize: '20px',
										fontWeight: '400',
									}}>
									D.O.B.
								</h2>
								<p className='text-light' style={{ fontSize: '15px' }}>
									{dob}
								</p>
							</div>
							<div style={{ marginTop: '10%' }}>
								<h2
									className='display-4'
									style={{
										fontSize: '20px',
										fontWeight: '400',
									}}>
									PASS EXPIRES
								</h2>
								<p className='text-light' style={{ fontSize: '15px' }}>
									{passExp.substring(0, 10) + space}
									{passExp ? (
										<img
											src={dot}
											alt='dot'
											style={{ height: '15px', marginTop: '-2px' }}
										/>
									) : null}
									{space + passExp.substring(11, passExp.length - 1)}
								</p>
							</div>
						</div>
					) : null}
				</div>
				<div style={{ paddingTop: '1%' }}>
					<div>
						<button
							id='Print'
							className='btn btn-warning'
							style={{
								backgroundColor: '#543a29',
								color: '#fff',
								borderRadius: '10px',
								width: '45%',
							}}>
							Print your Pass
						</button>
					</div>
					<p
						className='text-muted'
						style={{ fontSize: '10px', marginTop: '0.3%' }}>
						For more information about Excelsior Pass, please visit our{space}
						<a href='/api/details' className='leftFAQLink-l'>
							FAQ's
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}

export default LeftPanel;
