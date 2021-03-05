import React, { useEffect } from 'react';
import { Route, Switch} from 'react-router-dom';
import './default.scss';
import { checkUserSession } from "./redux/User/user.actions";
import { useDispatch } from 'react-redux'

// HOC
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

// Layouts
import MainLayout from './layouts/MainLayout'; 
import HomepageLayout from './layouts/HomepageLayout';

// Pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';



const App = props => {  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession())
  }, [])


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
          <Route path="/login" 
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
           )} />
          <Route path="/recovery" 
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
           )} />
          <Route path="/dashboard" 
          render={() => (
            <WithAuth>
            <MainLayout>
              <Dashboard />
            </MainLayout>
            </WithAuth>
           )} />
          <Route path="/adminportal" 
          render={() => (
            <WithAdminAuth>
            <MainLayout>
              <Admin />
            </MainLayout>
            </WithAdminAuth>
           )} />
    </Switch>
    </div>
  );
}

export default App;
