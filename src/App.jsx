import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { Container } from 'reactstrap';
import Login from './modules/auth/login/Login';
import Main from './modules/main/Main';
import socketIOClient from 'socket.io-client';
import SignUp from './modules/auth/sign-up/SignUp';
import PrivateRoute from './modules/shared/PrivateRoute';
import AppContextProvider from './modules/shared/app-context/AppContextProvider';
import AppContext from './modules/shared/app-context/AppContext';
import RestoreCurrentUser from './modules/shared/refresh-user/RestoreCurrentUser';

export let socket = socketIOClient(
  process.env.REACT_APP_SOCKET_IO_SERVER || 'http://localhost:3000/chattz'
);

function App() {
  return (
    <Container id="app" className="full-height">
      <AppContextProvider>
        <RestoreCurrentUser />
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <AppContext.Consumer>
                {appContext => <Login appContext={appContext} />}
              </AppContext.Consumer>
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <PrivateRoute path="/chattz">
              <AppContext.Consumer>
                {appContext => <Main appContext={appContext} />}
              </AppContext.Consumer>
            </PrivateRoute>
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </BrowserRouter>
      </AppContextProvider>
    </Container>
  );
}

export default App;
