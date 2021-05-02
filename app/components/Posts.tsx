import React from "react";
import { fetchMainPosts, PostType } from "../utils/api";
import Loading from "./Loading";
import PostsList from "./PostsList";
import fetchReducer from '../utils/fetchReducer';


export default function Posts({ type }: {type: PostType}){
  const [state, dispatch] = React.useReducer(fetchReducer, {
    user: null,
    error: null,
    loadingUser: false,
    loadingPosts: true,
    posts: null,
  });

  React.useEffect(() => {
    dispatch({ type: "loading" });

    fetchMainPosts(type)
      .then((posts) => dispatch({ type: "posts", posts }))
      .catch((error) => dispatch({ type: "error", error: error }));
  }, [type]);

  if (state.loadingPosts === true || !state.posts) {
    return <Loading />;
  }

  if (state.error) {
    return <p>{state.error}</p>;
  }

  return <PostsList posts={state.posts} />;
}
