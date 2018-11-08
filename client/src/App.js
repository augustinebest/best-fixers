import React from 'react';
import Home from './Home/Home';
import SignUpUser from './Home/SignUpUser';
import SignInUser from './Home/signInUser';
import SignInArtisan from './Home/signInArtisan';
import SignUpArtisan from './Home/SignUpArtisan';
import './App.css';
import UserLayout from './UserLayout'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ServiceReq from './Home/ServiceReq';
import CheckUser from './Home/checkUser';


const AppRoute = ({ Component, Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )}
  />
)

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AppRoute path='/' exact Layout={UserLayout} Component={Home} />
        <AppRoute path='/signupUser' exact Layout={UserLayout} Component={SignUpUser} />
        <AppRoute path='/signinuser' exact Layout={UserLayout} Component={SignInUser} />
        <AppRoute path='/signinartisan' exact Layout={UserLayout} Component={SignInArtisan} />
        <AppRoute path='/signupArtisan' exact Layout={UserLayout} Component={SignUpArtisan} />
        <AppRoute path='/requestService' exact Layout={UserLayout} Component={ServiceReq} />
        <AppRoute path='/checkuserdetail' exact Layout={UserLayout} Component={CheckUser} />
      </Switch>
    </BrowserRouter>
  )
}


export default App;
