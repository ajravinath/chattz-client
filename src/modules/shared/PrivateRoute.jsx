import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authHelper from './helper/authHelper';

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authHelper.isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
