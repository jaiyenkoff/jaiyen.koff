import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './default.scss';

// Layout
import MainLayout from './layouts/MainLayout'; 
import HomepageLayout from './layouts/HomepageLayout';

// Pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration'

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
    </Switch>
    </div>
  );
}

export default App;
