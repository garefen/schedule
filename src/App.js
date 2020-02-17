import React, { useState, useEffect } from 'react';
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

// const routes = {
//   "/dashboard": () => <Dashboard />,
//   "/add": () => <Add />,
//   "/edit/:id": ({ id }) => <Edit id={id} />,
//   "/login": () => <Login />
// }

function App() {
  // const routerResult = useRoutes(routes);
  const cookies = new Cookies();

  return (  
    <div className="app">
      <Router>
        <Switch>
          <Route path='/login'>
            <Login cookies={cookies} />
          </Route>
          { cookies.get('userId') ? 
            <>
              <Route path='/add'>
                <Add cookies={cookies} />
              </Route>
              <Route path='/edit/:id'>
                <Edit cookies={cookies} />
              </Route>
              <Route path='/'>
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
