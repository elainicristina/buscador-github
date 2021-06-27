import React from 'react';

import Usuario from './components /Usuario'
import Repositorios from './components /Repositorios';
import Starred from './components /Starred';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {

  render() {
    return(
      <BrowserRouter>
        <Switch>

          <Route exact path="/">
            <Redirect to="/busca"/>
          </Route>

          <Route path='/busca/:username?' component={Usuario}/>
          <Route path='/repos/:username' component={Repositorios}/>
          <Route path='/starred/:username' component={Starred}/>

        </Switch>
      </BrowserRouter>
    )
  }
}