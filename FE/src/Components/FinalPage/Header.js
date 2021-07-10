import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import config from '../Configuration/config.json';

class Header extends Component {
	constructor() {
		super();
		this.state = {
			encodedData: '',
			data: [],
		};
	}

	componentDidMount() {
		fetch('/api/details')
			.then((res) => res.json())
			.then((encodedData) =>
				this.setState({ encodedData }, () => {
					this.decodeJWT();
					console.log('encodeddata', encodedData);
				})
			);
	}

	decodeJWT = () => {
		try {
			let dataDec = jwt.verify(this.state.encodedData, config['jwtKey'], {
				algorithm: 'HS256',
			});
			this.setState({ data: dataDec }, console.log('data', dataDec));
		} catch (err) {
			console.error(err);
		}
	};

	render() {
		return (
			<div>
				<h1>
					Hi, {this.state.data.map((item) => item.Name)}. Here's your Pass.
				</h1>
				<p>
					Your pass is now active. Be sure to save your pass before you leave.
				</p>
			</div>
		);
	}
}

export default Header;
