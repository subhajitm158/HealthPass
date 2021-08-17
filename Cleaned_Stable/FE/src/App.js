import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import InitPage from './Components/InitPage/render';
import FinalRender from './Components/FinalPage/render';
import { CookiesProvider } from 'react-cookie';
import './App.css';

const App = () => {
	return (
		<div>
			<CookiesProvider>
				<Router>
					<Switch>
						<Route path='/' exact>
							<InitPage />
						</Route>
						<Route path='/details' exact>
							<FinalRender />
						</Route>
					</Switch>
				</Router>
			</CookiesProvider>
		</div>
	);
};

export default App;
