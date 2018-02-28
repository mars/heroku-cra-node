import React from 'react';
import { Switch, Route } from 'react-router-dom'
import ApiTest from './ApiTest'
import BearTest from './BearTest'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={ApiTest}/>
      <Route exact path='/bears' component={BearTest}/>
    </Switch>
  </main>
)

export default Main;
