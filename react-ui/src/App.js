import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import {Container, Snackbar} from '@material-ui/core'
import Header from "./components/Header"
import BotonRedondo from "./components/BotonRedondo"


import './App.css';


function App() {
  const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState('/api');

  const fetchData = useCallback(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        setMessage(json.message);
        setIsFetching(false);
      }).catch(e => {
        setMessage(`API call failed: ${e}`);
        setIsFetching(false);
      })
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData(); 
  }, [fetchData]);

  return (
    <Container className="App" maxWidth={false}>
    
      <Header >      </Header> 
      <BotonRedondo/>
      <div className="App-body">
        { process.env.NODE_ENV === 'production' ?
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
       
      </div>
   
    </Container>
  );

}

export default App;
