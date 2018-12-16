import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          { process.env.NODE_ENV === 'production' ?

              <p>
                This is a production build from create-react-app
                <br/>
                <br/>
                <a
                  className="App-link"
                  href="https://github.com/mars/heroku-cra-node"
                >
                  React + Node deployment on Heroku
                </a>
              </p>

            : <p>
                Edit <code>src/App.js</code> and save to reload.
                <br/>
                <br/>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </p>
          }
        </header>
      </div>
    );
  }
}

export default App;
