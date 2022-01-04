import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from './layout/Spinner';
import Login from './auth/Login';

const PrivateRoute = ({ component: Component }: any) => {
  const auth = useSelector((state: any) => state.auth);
  const { isAuthenticated, loading } = auth;
  if (loading) return <Spinner />;
  if (isAuthenticated) {
    return <Component />;
  }
  return <Login />;
};

export default PrivateRoute;
