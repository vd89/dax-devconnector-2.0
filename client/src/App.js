import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './Component/Layout/Landing';
import Navbar from './Component/Layout/Navbar';
import Routes from './Component/Routing/Routes';

import Store from './ReduxStore';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './Actions/authAction';
import { LOGOUT } from './Actions/types';

const App = () => {
  useEffect(() => {
    if (localStorage.token) setAuthToken(localStorage.token);
    Store.dispatch(loadUser());

    window.addEventListener('storage', () => {
      if (!localStorage.token) Store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={Store}>
      <BrowserRouter>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
