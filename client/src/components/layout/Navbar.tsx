import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/actions/auth';

function Navbar() {
  const auth = useSelector((state: any) => state.auth);
  const { isAuthenticated } = auth;
  const dispatch = useDispatch();

  const AuthLinks = () => (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"> </i>
          <span className="hide-sm"> Dashboard</span>
        </Link>
      </li>
      <li>
        <a href="#!" onClick={() => dispatch(logout())}>
          <i className="fas fa-sign-out-alt"> </i>
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = () => (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? AuthLinks() : guestLinks()}</Fragment>
    </nav>
  );
}

export default Navbar;
