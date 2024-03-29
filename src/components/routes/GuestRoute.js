import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/todos" />
      )}
  />
);

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.data.email
  };
}

export default connect(mapStateToProps)(GuestRoute);
