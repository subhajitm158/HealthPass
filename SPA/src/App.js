import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import InitPage from './Components/InitPage/render';
import FinalRender from './Components/FinalPage/render';
import './App.css';

const App = () => {
	return (
		<div>
			<Router>
				<Switch>
					<Route path='/api' exact>
						<InitPage />
					</Route>
					<Route path='/api/details'>
						<FinalRender />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
