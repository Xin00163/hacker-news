import React, { useReducer } from "react";
import { fetchMainPosts, Post, PostType } from "../utils/api";
import Loading from "./Loading";
import PostsList from "./PostsList"

interface PostsState {
  posts: null | Post[],
  error: null | string,
  loading: boolean
}

type PostsAction = 
  | { type: "loading"}
  | { type: "success"; posts: Post[] }
  | { type: "error"; error: string }

function fetchReducer(state: PostsState, action: PostsAction) {
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

export default function Posts({ type }: {type: PostType}){
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  React.useEffect(() => {
    dispatch({ type: "loading" });

    fetchMainPosts(type)
      .then((posts) => dispatch({ type: "success", posts }))
      .catch((error) => dispatch({ type: "error", error: error }));
  }, [type]);

  if (state.loading === true || !state.posts) {
    return <Loading />;
  }

  if (state.error) {
    return <p>{state.error}</p>;
  }

  return <PostsList posts={state.posts} />;
}
