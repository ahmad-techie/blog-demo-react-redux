import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncAddPostCall } from "../redux/store";

function AddPost() {
  const [post, setPost] = useState({ title: "", userId: "" });

  const dispatch = useDispatch();

  const addPostReact = (e) => {
    e.preventDefault();
    dispatch(asyncAddPostCall(post));
  };

  return (
    <div>
      <form onSubmit={addPostReact}>
        <input
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          type="text"
          placeholder="Post Title"
        />
        <input
          onChange={(e) => setPost({ ...post, userId: e.target.value })}
          type="text"
          placeholder="Post Body"
        />
        <input type="submit" value="Add post" />
      </form>
    </div>
  );
}

export default AddPost;
