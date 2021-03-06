import React, { SyntheticEvent, useState, Fragment } from 'react';
import { setAlert } from '../../store/actions/alert';
import { register } from '../../store/actions/auth';
import { useDispatch, connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

function Register({ setAlert, register, isAuthenticated }: any) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    password2: '',
  });

  const { email, name, password, password2 } = formData;

  function onChange(e: SyntheticEvent) {
    setFormData({
      ...formData,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  }

  async function onSubmit(e: any) {
    e.preventDefault();
    console.log(formData);
    if (password !== password2) {
      console.log('password do not match');
      // dispatch(setAlert('password do not match', 'danger'));
      setAlert('password do not match', 'danger');
    } else {
      try {
        register({ name, email, password });
      } catch (err: any) {
        console.log(err.response.data);
      }
    }
  }

  return (
    <Fragment>
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <section className="container">
          <h1 className="large text-primary">Sign Up</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Create Your Account
          </p>
          <form
            className="form"
            action="create-profile.html"
            onSubmit={onSubmit}
          >
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                name="name"
                required
                value={name}
                onChange={onChange}
              />
            </div>
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
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={onChange}
                minLength={6}
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
          </form>
          <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </section>
      )}
    </Fragment>
  );
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
