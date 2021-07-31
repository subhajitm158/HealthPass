import React, { useState, useEffect } from 'react';
import dot from './Assets/dot.png';
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
			console.log(returnqr);
			// const imageData = await generateQR(returnData.data);
			// setImageUrl(imageData);
			// const Name = await GetName(returnData.data);
			// setName(Name);
			// const DOB = await GetDateofBirth(returnData.data);
			// setDOB(DOB);
			// const exp = await GetPassExpirationDate(returnData.data);
			// setPassExp(exp);
		}

		fetchData();
	}, []);

	return (
		<div>
			<div className='leftBckImg-l'>
				<div className='lefttag-l'>
					<p className='lefttagText-l'>Covid-19 Vaccination</p>
				</div>
				{sessionStorage.getItem('session') ? (
					<div>
						<p className='leftName-l'>{name}</p>
						<div className='leftQr-l'>
							<img src={imageUrl} alt='qrCode' className='leftQRImg-l' />
						</div>
					</div>
				) : null}
				<div className='leftText-l'>
					<p className='leftTexttxt-l'>
						Please have Photo ID available when presenting your Pass for
						Verification.
					</p>
				</div>
				{sessionStorage.getItem('session') ? (
					<div>
						<div className='leftDOB-l'>
							<p className='leftDOBLabel-l'>D.O.B.</p>
							<p className='leftDOBText-l'>{dob}</p>
						</div>
						<div className='leftExp-l'>
							<p className='leftExpLabel-l'>PASS EXPIRES</p>
							<p className='leftExpText-l'>
								{passExp.substring(0, 10) + space}
								<img src={dot} alt='dot' className='leftExpDot-l' />
								{space + passExp.substring(11, passExp.length - 1)}
							</p>
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

export default LeftPanel;
