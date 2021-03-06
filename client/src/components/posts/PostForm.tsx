import React, { useState } from 'react';
import { addPost } from '../../store/actions/post';
import { useDispatch } from 'react-redux';

function PostForm() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3> Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addPost({ text }));
          setText('');
        }}
      >
        <textarea
          name="text"
          cols={30}
          rows={10}
          placeholder="create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" value="submit" className="btn btn-dark my-1" />
      </form>
    </div>
  );
}

export default PostForm;
