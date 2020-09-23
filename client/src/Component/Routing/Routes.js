import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../Layout/Alert';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Dashboard from '../Dashboard/Dashboard';
import AddEducation from '../Dashboard/ProfileForms/AddEducation';
import AddExperience from '../Dashboard/ProfileForms/AddExperience';
import CreateProfile from '../Dashboard/ProfileForms/CreateProfile';
import EditProfile from '../Dashboard/ProfileForms/EditProfile';
import NotFound from '../Layout/NotFound';
import Post from '../Post/Post';
import Posts from '../Posts/Posts';
import Profile from '../Profile/Profile';
import Profiles from '../Profiles/Profiles';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/createProfile' component={CreateProfile} />
        <PrivateRoute exact path='/editProfile' component={EditProfile} />
        <PrivateRoute exact path='/addExperience' component={AddExperience} />
        <PrivateRoute exact path='/addEducation' component={AddEducation} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
