import React from 'react';
import './App.css';
import { BrowserRouter, Route , Switch , Redirect } from 'react-router-dom'
import Login from './views/Login'
import Home from './views/Home'
import NotFound from './views/NotFound'
import CityList from './views/CityList/index'
import TestMap from './views/Map/index'
import TestHOC from './views/Test/HOC'


function App () {
  return (
      <BrowserRouter>
        <Switch>
          <Redirect exact from='/' to='/login'></Redirect>
          <Route path='/login' component={Login}></Route>
          <Route path='/home' component={Home}></Route>
          <Route path='/cityList' component={CityList}></Route>
          {/* 测试地图 */}
          <Route path='/map' component={TestMap}></Route>
          {/* 测试高阶组件 */}
          <Route path='/hoc' component={TestHOC}></Route>
          <Route  component={NotFound}></Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
