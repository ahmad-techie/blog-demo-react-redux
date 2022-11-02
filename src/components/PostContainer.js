import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddPost from "./AddPost";
import Post from "./Post";
import { asyncFetchPosts } from "../redux/store";

function PostContainer() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncFetchPosts());
  }, []);

  return (
    <div>
      <AddPost />
      <hr />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostContainer;
