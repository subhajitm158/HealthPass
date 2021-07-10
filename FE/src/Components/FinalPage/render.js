import React, { Component } from 'react';
import Header from './Header';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import Footer from './Footer';
import './Style/style.css';

class FRender extends Component {
	render() {
		return (
			<div className='renderFinal-r'>
				<Header />
				<div className='renderBody-r'>
					<LeftPanel />
					<RightPanel />
				</div>
				<Footer />
			</div>
		);
	}
}

export default FRender;
