import React, { useEffect } from 'react';
import Experience from './Experience';
import Education from './Education';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../store/actions/profile';
import { useDispatch, useSelector } from 'react-redux';

function Dashboard() {
  const auth = useSelector((state: any) => state.auth);
  const profile = useSelector((state: any) => state.profile.profile);
  const { user } = auth;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => dispatch(deleteAccount())}
            >
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p> You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </section>
  );
}

export default Dashboard;
