import React, { Component } from 'react';
import {
	CallDetailsLoginApi,
	CallDetailsQRApi,
	GetName,
} from '../API_Calls/details';

class Header extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
		};
	}

	async componentDidMount() {
		const returnData = await CallDetailsLoginApi();
		const returnqr = await CallDetailsQRApi(returnData);
		const Name = await GetName(returnqr);
		this.setState({ name: Name });
		// const returnData = await CallDetailsApi();
		// const Name = await GetName(returnData.data);
		// this.setState({ name: Name });
	}

	render() {
		return (
			<div>
				<h1>Hi, {this.state.name}. Here's your Pass.</h1>
				<p>
					Your pass is now active. Be sure to save your pass before you leave.
				</p>
			</div>
		);
	}
}

export default Header;
