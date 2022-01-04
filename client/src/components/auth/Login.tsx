import React, { SyntheticEvent, useState } from 'react';
import { login } from '../../store/actions/auth';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from '../dashboard/Dashboard';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();

  function onChange(e: SyntheticEvent) {
    setFormData({
      ...formData,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  }

  async function onSubmit(e: any) {
    e.preventDefault();
    dispatch(login(email, password));
  }

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Login </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Login
      </p>
      <form className="form" action="create-profile.html" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength={6}
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Do not have an account? <Link to="/register">Register</Link>
      </p>
    </section>
  );
}

export default Login;
