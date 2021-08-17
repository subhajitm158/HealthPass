import React, { useState, useEffect } from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import { CallDetailsDemoApi, GetName } from '../API_Calls/details';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import FRender from '../InitPage/render';

function Header({ data }) {
	const [name, setName] = useState('');
	const [cookies, setCookie, removeCookie] = useCookies('reqid');

	useEffect(() => {
		async function ab() {
			if (data === undefined) {
				const requestId =
					cookies.reqid === undefined
						? '2ca20a12-a5cf-4072-9498-d3a4f6912df9'
						: cookies.reqid;

				if (Cookies.get(requestId) === undefined) {
					const returnData = await CallDetailsDemoApi();

					setCookie(requestId, JSON.stringify(returnData), {
						maxAge: 900,
					});

					const Name = await GetName(returnData);
					setName(Name);
				} else {
					const Name = await GetName(JSON.parse(Cookies.get(requestId)));
					setName(Name);
				}
			} else {
				const Name = await GetName(JSON.parse(data));
				setName(Name);
			}
		}

		ab();
	}, []);

	const logout = () => {
		removeCookie(cookies.reqid);
		removeCookie('reqid');
		setName('logout');
	};

	return (
		<div>
			{name ? (
				name === 'logout' ? (
					<FRender />
				) : (
					<div>
						<h2
							className='display-4'
							style={{
								fontSize: '20px',
								fontWeight: '400',
							}}>
							Hi, {name}. Here's your Pass.
						</h2>
						<p className='text-muted' style={{ fontSize: '10px' }}>
							Your pass is now active. Be sure to save your pass before you
							leave.
						</p>
						<button
							id='Print'
							className='btn btn-danger'
							style={{
								float: 'right',
								textAlign: 'center',
								marginRight: '20px',
								marginTop: '-63px',
							}}
							onClick={logout}>
							Logout
						</button>
						<div className='overflow-hidden'>
							<div className='row row-cols-1 row-cols-md-2 g-4'>
								<div className='col'>
									<LeftPanel
										data={
											data === undefined ? Cookies.get(cookies.reqid) : data
										}
									/>
								</div>
								<div className='col'>
									<RightPanel />
								</div>
							</div>
						</div>
					</div>
				)
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

export default Header;
