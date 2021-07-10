import React, { Component } from 'react';
import headerLogo from '../InitPage/Assets/header-logo.png';
import './Style/style.css';

class Header extends Component {
	render() {
		return (
			<div>
				<div className='header-h'>
					<img src={headerLogo} alt='headerLogo' className='hLogo-h' />
				</div>
				<div className='navbar-h'>
					<h3 className='navbarText-h'>Liberty HealthPass</h3>
				</div>
			</div>
		);
	}
}

export default Header;
