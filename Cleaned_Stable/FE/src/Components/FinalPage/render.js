import React, { Component } from 'react';
import Header from './Header';

class FRender extends Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		return (
			<div
				className='overflow-hidden'
				style={{
					padding: '20px 0px 0px 30px',
				}}>
				<Header data={this.props.data} />
			</div>
		);
	}
}

export default FRender;
