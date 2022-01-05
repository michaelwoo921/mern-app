import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../store/actions/post';
import PostItem from './PostItem';
import PostForm from './PostForm';

function Posts() {
  const posts = useSelector((state: any) => state.post.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <section className="container">
      <h1 className="large text-primary">Posts </h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <PostForm />
      <div>
        {posts.map((post: any) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}

export default Posts;
