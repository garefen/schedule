import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Cookies from 'universal-cookie';

import Dashboard from './pages/Dashboard';
import Add from './pages/Add';
import Edit from './pages/Edit';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';

function App() {
  const cookies = new Cookies();

  return (  
    <div className="app">
      <Router>
        <Switch>
          <Route path='/login'>
            <Login cookies={cookies} />
          </Route>
          <Route path='/createaccount'>
            <CreateAccount cookies={cookies} />
          </Route>
          { cookies.get('userId') ? 
            <>
              <Route path='/add'>
                <Add cookies={cookies} />
              </Route>
              <Route path='/edit/:id'>
                <Edit />
              </Route>
              <Route exact path='/'>
                <Dashboard cookies={cookies} />
              </Route>
            </>
          : 
            <Redirect to='/login' />
          }
        </Switch>
      </Router>

      
    </div>
  );
}

export default App;
