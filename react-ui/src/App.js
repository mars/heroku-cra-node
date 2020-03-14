import React, { useCallback, useEffect, useState } from 'react';
import { RegisterForm } from './components/registerForm'
import logo from './logo.svg';
import './App.css';
import Map from './Map'

function App() {
	return (
		<div className="App">
			<RegisterForm />
			<header className="App-header">
				{process.env.NODE_ENV === 'production' ?
					<p>
						This is a production build from create-react-app.
            </p>
					: <p>
						Edit <code>src/App.js</code> and save to reload.
            </p>
				}
				<p>{'« '}<strong>
					{isFetching
						? 'Fetching message from API'
						: message}
				</strong>{' »'}</p>
				<p><a
					className="App-link"
					href="https://github.com/mars/heroku-cra-node"
				>
					React + Node deployment on Heroku
        </a></p>
				<p><a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
        </a></p>
			</header>
			<Map />
		</div>
	);

}

export default App;
