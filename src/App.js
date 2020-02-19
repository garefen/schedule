import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Cookies from 'universal-cookie';

import Dashboard from './pages/Dashboard';
import Add from './pages/Add';
import Edit from './pages/Edit';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import NotFound from './pages/NotFound';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  const cookies = new Cookies();

  return (  
    <div className="app">
      <Router>
        <Switch>
          <Route path='/login'>
              <PublicRoute component={Login} cookies={cookies} />
          </Route>
          <Route path='/createaccount'>
            <PublicRoute component={CreateAccount} cookies={cookies} />
          </Route>
          <Route path='/add'>
            <PrivateRoute component={Add} cookies={cookies}/>
          </Route>
          <Route path='/edit/:id'>
            <PrivateRoute component={Edit} cookies={cookies} />
          </Route>
          <Route exact path='/'>
            <PrivateRoute component={Dashboard} cookies={cookies} />
          </Route>
          <Route>
            <NotFound/>
          </Route>
        </Switch>
      </Router>

      
    </div>
  );
}

export default App;
