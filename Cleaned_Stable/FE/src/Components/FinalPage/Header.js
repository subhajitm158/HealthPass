import React, { Component } from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import { CallDetailsDemoApi, GetName } from '../API_Calls/details';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
		};
		this.props = props;
	}

	async componentDidMount() {
		if (this.props.data === undefined) {
			const requestId = '2ca20a12-a5cf-4072-9498-d3a4f6912df9';

			await CallDetailsDemoApi();

			const returnData = JSON.parse(sessionStorage.getItem(requestId));

			const Name = await GetName(returnData);
			this.setState({ name: Name });
		} else {
			const Name = await GetName(this.props.data);
			this.setState({ name: Name });
		}
	}

	render() {
		const requestId = '2ca20a12-a5cf-4072-9498-d3a4f6912df9';

		return (
			<div>
				{this.state.name ? (
					<div>
						<h2
							className='display-4'
							style={{
								fontSize: '20px',
								fontWeight: '400',
							}}>
							Hi, {this.state.name}. Here's your Pass.
						</h2>
						<p className='text-muted' style={{ fontSize: '10px' }}>
							Your pass is now active. Be sure to save your pass before you
							leave.
						</p>
						<div className='overflow-hidden'>
							<div className='row row-cols-1 row-cols-md-2 g-4'>
								<div className='col'>
									<LeftPanel
										data={
											this.props.data === undefined
												? JSON.parse(sessionStorage.getItem(requestId))
												: this.props.data
										}
									/>
								</div>
								<div className='col'>
									<RightPanel />
								</div>
							</div>
						</div>
					</div>
				) : (
					<h2
						className='display-4'
						style={{
							fontSize: '30px',
							fontWeight: '400',
						}}>
						Your Vaccination Credentials are loading...
					</h2>
				)}
			</div>
		);
	}
}

export default Header;
