import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profiles from './components/profiles/Profiles';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import ProfileForm from './components/profile-forms/ProfileForm';
import AddEducation from './components/profile-forms/AddEducation';
import AddExperience from './components/profile-forms/AddExperience';
import NotFound from './components/layout/NotFound';
import Post from './components/post/Post';
import Posts from './components/posts/Posts';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/profile/:id" element={<Profile />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/create-profile" element={<ProfileForm />} />
        <Route path="/edit-profile" element={<ProfileForm />} />
        <Route path="/add-experience" element={<AddExperience />} />
        <Route path="/add-education" element={<AddEducation />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
