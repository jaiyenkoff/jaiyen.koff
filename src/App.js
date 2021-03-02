import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import './default.scss';
import { setCurrentUser } from "./redux/User/user.actions";
import { useDispatch, useSelector } from 'react-redux'

// HOC
import WithAuth from './hoc/withAuth';

// Layouts
import MainLayout from './layouts/MainLayout'; 
import HomepageLayout from './layouts/HomepageLayout';

// Pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';



const App = props => {  
  const dispatch = useDispatch();

  useEffect(() => {
 
      const authListener = auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
          const userRef = await handleUserProfile(userAuth);
          userRef.onSnapshot(snapshot => {
            dispatch(setCurrentUser({
                id: snapshot.id,
                ...snapshot.data()
            }));
          })
        }

       dispatch(setCurrentUser(userAuth));
     });
    return() => {
      authListener();
    }
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
    </Switch>
    </div>
  );
}

export default App;
