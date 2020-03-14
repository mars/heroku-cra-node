import React, { useCallback, useEffect, useState } from 'react';
import { RegisterForm } from './components/registerForm'
import logo from './logo.svg';
import './App.css';
import Map from './Map'

function App() {
	return (
		<div className="App">
			<RegisterForm />
			<Map />
		</div>
	);

}

export default App;
