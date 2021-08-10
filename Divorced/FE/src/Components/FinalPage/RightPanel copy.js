import React, { Component } from 'react';
import save from './Assets/save.png';
import print from './Assets/print.png';
import googleplay from './Assets/googleplay.png';
import applewallet from './Assets/applewallet.png';
import applestore from './Assets/applestore.png';
import hand from './Assets/hand.png';

class RightPanel extends Component {
	render() {
		return (
			<div>
				<div className='card' style={{ border: 'none' }}>
					<h2
						className='display-4'
						style={{
							fontSize: '20px',
							fontWeight: '400',
						}}>
						Multiple ways to save and start using your Pass.
					</h2>
					<div class='card-deck' style={{ display: 'flex' }}>
						<div class='card' style={{ width: '50%', border: 'none' }}>
							<nav class='navbar navbar-light'>
								<div class='container-fluid'>
									<a class='navbar-brand' href='#'>
										<img
											src={save}
											alt=''
											width='30'
											height='24'
											class='d-inline-block align-text-top'
										/>
										<span style={{ fontSize: '15px' }}>
											&nbsp;Add it to your Vodafone DDI Wallet
										</span>
									</a>
								</div>
							</nav>
							<p
								className='text-muted'
								style={{
									fontSize: '13px',
								}}>
								First download the Vodafone DDI Wallet from the Apple App Store
								or Google Play Store. Then, add your Pass for easy access later.
							</p>
						</div>
						<div class='card' style={{ width: '50%', border: 'none' }}>
							<img
								src={googleplay}
								alt='googlePlay'
								style={{
									height: '50%',
									width: '50%',
									padding: '1% 1% 1% 1%',
									borderRadius: '20px',
									marginLeft: '10%',
								}}
							/>
							<img
								src={applestore}
								alt='appleStore'
								style={{
									height: '49%',
									width: '50%',
									padding: '1% 1% 1% 1%',
									borderRadius: '20px',
									marginLeft: '10%',
								}}
							/>
						</div>
					</div>
					<div class='card-deck' style={{ display: 'flex' }}>
						<div class='card' style={{ width: '50%', border: 'none' }}>
							<nav class='navbar navbar-light'>
								<div class='container-fluid'>
									<a class='navbar-brand' href='#'>
										<img
											src={save}
											alt=''
											width='30'
											height='24'
											class='d-inline-block align-text-top'
										/>
										<span style={{ fontSize: '15px' }}>
											&nbsp;Add it to your iPhone Apple Wallet
										</span>
									</a>
								</div>
							</nav>
							<p
								className='text-muted'
								style={{
									fontSize: '13px',
								}}>
								Add to your phone's native Wallet app for easy access at
								anytime.
							</p>
						</div>
						<div class='card' style={{ width: '50%', border: 'none' }}>
							<img
								src={applewallet}
								alt='applewallet'
								style={{
									height: '49%',
									width: '50%',
									padding: '1% 1% 1% 1%',
									borderRadius: '15px',
									marginLeft: '10%',
									marginTop: '10%',
								}}
							/>
						</div>
					</div>
					<div class='card-deck' style={{ display: 'flex' }}>
						<div class='card' style={{ width: '50%', border: 'none' }}>
							<nav class='navbar navbar-light'>
								<div class='container-fluid'>
									<a class='navbar-brand' href='#'>
										<img
											src={print}
											alt=''
											width='30'
											height='24'
											class='d-inline-block align-text-top'
										/>
										<span style={{ fontSize: '15px' }}>
											&nbsp;Print your Pass
										</span>
									</a>
								</div>
							</nav>
							<p
								className='text-muted'
								style={{
									fontSize: '13px',
								}}>
								A printed copy of your Pass can be scanned at participating
								businesses.
							</p>
						</div>
						<div
							class='card'
							style={{
								width: '50%',
								border: 'none',
							}}>
							<img
								src={hand}
								alt='hand'
								style={{
									width: '50%',
									padding: '1% 1% 1% 1%',
									marginLeft: '10%',
									marginTop: '5%',
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RightPanel;
