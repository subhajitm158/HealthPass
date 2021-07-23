import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import InitPage from './Components/InitPage/render';
import FinalRender from './Components/FinalPage/render';
// import EncryptData from './Components/Encryption/Encryption';
// import DecryptData from './Components/Encryption/Decryption';
import './App.css';

export const MContext = React.createContext();

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
					{/* <Route path='/' exact>
						<EncryptData />
						<DecryptData />
					</Route> */}
				</Switch>
			</Router>
		</div>
	);
};

export default App;
