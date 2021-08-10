import React, { Component } from 'react';
import Header from './Header';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

class FRender extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
		};
		this.props = props;
	}

	componentDidMount() {
		this.setState({
			name:
				this.props.data.payload.credentialSubject.recipient.givenName +
				' ' +
				this.props.data.payload.credentialSubject.recipient.middleName +
				' ' +
				this.props.data.payload.credentialSubject.recipient.familyName,
		});
	}

	render() {
		return (
			<div
				className='overflow-hidden'
				style={{
					padding: '20px 0px 0px 30px',
				}}>
				<Header name={this.state.name} />
				<div className='row row-cols-1 row-cols-md-2 g-4'>
					<div className='col'>
						<LeftPanel data={this.props.data} />
					</div>
					<div className='col'>
						<RightPanel />
					</div>
				</div>
			</div>
		);
	}
}

export default FRender;
