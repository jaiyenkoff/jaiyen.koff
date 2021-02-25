import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './default.scss';

// Layout
import MainLayout from './layouts/MainLayout'; 
import HomepageLayout from './layouts/HomepageLayout';

// Pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
    <Switch>
          <Route exact path="/" render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )} />
          <Route path="/jointheparty" render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
           )} />
          <Route path="/login" render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
           )} />
    </Switch>
    </div>
  );
}

export default App;
