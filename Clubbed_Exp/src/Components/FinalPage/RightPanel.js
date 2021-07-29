import React, { Component } from 'react';
import save from './Assets/save.png';
import print from './Assets/print.png';
import googleplay from './Assets/googleplay.png';
import applewallet from './Assets/applewallet.png';
import applestore from './Assets/applestore.png';

class RightPanel extends Component {
	render() {
		return (
			<div>
				<div className='rightHeading-r'>
					<p className='rightHeadingText-r'>
						Multiple ways to save and start using your Pass.
					</p>
				</div>
				<div className='rightExcelsior-r'>
					<div className='rightExcelsiorIcon-r'>
						<img src={save} alt='save' className='rightExcelsiorIconSave-r' />
						<p className='rightExcelsiorIconText-r'>
							Add it to your Excelsior Pass Wallet
						</p>
					</div>
					<div className='rightExcelsiorText-r'>
						<p className='rightExcelsiorTextTxt-r'>
							First download the Excelsior Pass Wallet from the Apple App Store
							or Google Play Store. Then, add your Pass for easy access later.
						</p>
					</div>
					<div className='rightExcelsiorButtons-r'>
						<img
							src={googleplay}
							alt='googlePlay'
							className='rightExcelsiorButtonsGoogle-r'
						/>
						<img
							src={applestore}
							alt='appleStore'
							className='rightExcelsiorButtonsApple-r'
						/>
					</div>
					<div className='rightExcelsiorPhone-r'></div>
				</div>
				<div className='rightAppleDiv-r'>
					<div className='rightAppleIcon-r'>
						<img src={save} alt='save' className='rightExcelsiorIconSave-r' />
						<p className='rightExcelsiorIconText-r'>
							Add it to your iPhone Apple Wallet
						</p>
					</div>
					<div className='rightExcelsiorText-r'>
						<p className='rightAppleTextTxt-r'>
							Add to your phone's native Wallet app for easy access at anytime.
						</p>
					</div>
					<div className='rightExcelsiorButtons-r'>
						<img
							src={applewallet}
							alt='applewallet'
							className='rightExcelsiorButtonsGoogle-r'
						/>
					</div>
				</div>
				<div>
					<div className='rightAppleIcon-r'>
						<img src={print} alt='save' className='rightExcelsiorIconSave-r' />
						<p className='rightExcelsiorIconText-r'>Print your Pass</p>
					</div>
					<div className='rightExcelsiorText-r'>
						<p className='rightExcelsiorPrintText-r'>
							A printed copy of your Pass can be scanned at participating
							businesses.
						</p>
					</div>
					<div className='rightExcelsiorHand-r'></div>
				</div>
			</div>
		);
	}
}

export default RightPanel;
