import React, { Component } from 'react';
import footerLogo from '../InitPage/Assets/footer-logo.png';
import './Style/style.css';

class Footer extends Component {
	render() {
		return (
			<div className='footerMain-f'>
				<img src={footerLogo} alt='footerLogo' className='fLogo-f' />
			</div>
		);
	}
}

export default Footer;
