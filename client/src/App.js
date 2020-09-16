/** @format */

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import Landing from './Component/Layout/Landing';
import Navbar from './Component/Layout/Navbar';

const App = () => (
  <BrowserRouter>
    <>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <section className='container'>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </section>
    </>
  </BrowserRouter>
);

export default App;
