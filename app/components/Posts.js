import React, { useReducer } from "react";
import { fetchMainPosts } from "../utils/api";
import Loading from "./Loading";
import PostsList from "./PostsList";

function fetchReducer(state, action) {
  if (action.type === "loading") {
    return {
      posts: null,
      loading: true,
      error: null,
    };
  } else if (action.type === "success") {
    return {
      posts: action.posts,
      loading: false,
      error: null,
    };
  } else if (action.type === "error") {
    return {
      posts: state.posts,
      loading: false,
      error: action.error,
    };
  } else {
    throw new Error("This action type is not supported.");
  }
}
const initialState = {
  posts: null,
  error: null,
  loading: true,
};

export default function Posts({ type }) {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  React.useEffect(() => {
    dispatch({ type: "loading" });

    fetchMainPosts(type)
      .then((posts) => dispatch({ type: "success", posts }))
      .catch((error) => dispatch({ type: "error", error: error }));
  }, [type]);

  if (state.loading === true) {
    return <Loading />;
  }

  if (state.error === true) {
    return <p>{state.error}</p>;
  }

  return <PostsList posts={state.posts} />;
}
