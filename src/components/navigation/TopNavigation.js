import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";
import { logOut } from "../../actions/auth";

const TopNavigation = ({ isAuthenticated, logout, user }) => (
    <Menu pointing secondary>
      {isAuthenticated && <Menu.Item onClick={() => logout()}
        name='Log out'
      />}
      {!isAuthenticated && <Menu.Item as={Link} to="/signup"
        name='Sign up'
      />}
      {!isAuthenticated && <Menu.Item as={Link} to="/login"
        name='Sign in'
      />}
      {isAuthenticated && <Menu.Item as={Link} to="/todos"
        name='Todos'
      />}
      {isAuthenticated && <Menu.Item as={Link} to="/calendar"
        name='Calendar'
      />}
      {isAuthenticated && <Menu.Item as={Link} to="/qlearning"
        name='Qlearning'
      />}
      {isAuthenticated && <Menu.Item as={Link} to="/tictactoe"
        name='Tictactoe'
      />}
      {isAuthenticated && <Menu.Item as={Link} to="/catalog"
        name='Catalog'
      />}
      {isAuthenticated && <Menu.Item position="right">
        {user}
      </Menu.Item>}

    </Menu>
);

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.data.email,
    user: state.auth.data.email
  };
}

export default connect(mapStateToProps, { logout: logOut })(TopNavigation);
