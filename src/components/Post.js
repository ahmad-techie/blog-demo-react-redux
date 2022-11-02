import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../redux/store";

function Post({ post }) {
  const dispatch = useDispatch();

  const deleteP = (postId) => {
    dispatch(deletePost(postId));
  };
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button onClick={() => deleteP(post.id)}>Delete Post</button>
    </div>
  );
}

export default Post;
