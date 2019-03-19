import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute({ isLogged, path, ...props }) {
  if (!isLogged) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { intendedLocation: path },
        }}
      />
    );
  }
  return <Route path={path} {...props} />;
}

PrivateRoute.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    isLogged: !!state.auth.token,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
