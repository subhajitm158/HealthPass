import React, { Component } from 'react';
import Header from './Header';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import './Style/style.css';

class FRender extends Component {
	constructor() {
		super();
		this.state = {
			counter: 0,
		};
	}
	render() {
		return (
			<div className='renderFinal-r'>
				<Header />
				<div className='renderBody-r'>
					<LeftPanel />
					<RightPanel />
				</div>
			</div>
		);
	}
}

export default FRender;
