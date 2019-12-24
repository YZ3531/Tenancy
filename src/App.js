import React from 'react';
import './App.css';
import { BrowserRouter, Route , Switch , Redirect } from 'react-router-dom'
import Login from './views/Login'
import Home from './views/Home'
import NotFound from './views/NotFound'


function App () {
  return (
      <BrowserRouter>
        <Switch>
          <Redirect exact from='/' to='/login'></Redirect>
          <Route path='/login' component={Login}></Route>
          <Route path='/home' component={Home}></Route>
          <Route  component={NotFound}></Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
