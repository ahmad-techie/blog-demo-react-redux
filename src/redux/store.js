import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

const FETCH_POST = "FETCH_POST";
const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";

const initialPostState = [];

const postReducer = (state = initialPostState, action) => {
  switch (action.type) {
    case FETCH_POST:
      return action.paylaod;
    case ADD_POST:
      return [...state, action.paylaod];
    case DELETE_POST:
      return state.filter((post) => post.id != action.paylaod);
    default:
      return state;
  }
};

export const deletePost = (postId) => {
  return {
    type: DELETE_POST,
    paylaod: postId,
  };
};

const addPost = (post) => {
  return {
    type: ADD_POST,
    paylaod: post,
  };
};

export const asyncAddPostCall = (post) => {
  return function (dispatch) {
    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((data) => dispatch(addPost(data)));
  };
};

const getPosts = (posts) => {
  return {
    type: FETCH_POST,
    paylaod: posts,
  };
};

export const fetchPosts = () => {
  return function (dispatch) {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        dispatch(getPosts(data.posts));
      })
      .catch((err) => console.log(err));
  };
};

export const asyncFetchPosts = () => {
  return function (dispatch) {
    fetch("https://dummyjson.com/posts/1")
      .then((res) => res.json())
      .then((data) => dispatch(fetchPosts(data.posts)));
  };
};

const rootReducer = combineReducers({
  posts: postReducer,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
