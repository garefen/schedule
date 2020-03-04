import React, { useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Add from './pages/Add';
import Edit from './pages/Edit';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import NotFound from './pages/NotFound';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Delete from './components/Delete';

import { AuthContext } from './context/auth';

function App() {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }


  return (  
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <div className="app">
        <Router>
          <Switch>
            <Route path='/login'>
                <PublicRoute component={Login} />
            </Route>
            <Route path='/createaccount'>
              <PublicRoute component={CreateAccount} />
            </Route>
            <Route path='/add'>
              <PrivateRoute component={Add}/>
            </Route>
            <Route path='/edit/:id'>
              <PrivateRoute component={Edit} />
            </Route>
            <Route exact path='/'>
              <PrivateRoute component={Dashboard} />
            </Route>
            <Route exact path='/delete'>
              <PrivateRoute component={Delete} />
            </Route>
            <Route>
              <NotFound/>
            </Route>
          </Switch>
        </Router>
        <div id="loader-wrapper">
          <div className="loader"></div>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
