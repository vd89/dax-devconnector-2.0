/** @format */

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import Landing from './Component/Layout/Landing';
import Navbar from './Component/Layout/Navbar';
import Alert from './Component/Layout/Alert';
import Store from './ReduxStore';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './Actions/authAction';
import Dashboard from './Component/Dashboard/Dashboard';
import PrivateRoute from './Component/Routing/PrivateRoute';
import EditProfile from './Component/Dashboard/ProfileForms/EditProfile';
import CreateProfile from './Component/Dashboard/ProfileForms/CreateProfile';
import AddExperience from './Component/Dashboard/ProfileForms/AddExperience';
import AddEducation from './Component/Dashboard/ProfileForms/AddEducation';

const App = () => {
  useEffect(() => {
    if (localStorage.token) setAuthToken(localStorage.token);
    Store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={Store}>
      <BrowserRouter>
        <>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/createProfile' component={CreateProfile} />
              <PrivateRoute exact path='/editProfile' component={EditProfile} />
              <PrivateRoute exact path='/addExperience' component={AddExperience} />
              <PrivateRoute exact path='/addEducation' component={AddEducation} />
            </Switch>
          </section>
        </>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
