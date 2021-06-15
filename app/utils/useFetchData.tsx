import React from 'react';
import { fetchComments, fetchItem, fetchMainPosts, fetchPosts, fetchUser, PostType } from './api';
import fetchReducer from './fetchReducer';
import queryString from "query-string";

export function useFetchPosts (type: PostType) {
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
      .then((posts) => dispatch({ type: "posts", posts: posts }))
      .catch((error) => dispatch({ type: "error", error: error }));
  }, [type]);

  return state
}

export function useFetchPost (location: {search: string}) {
  const { id } = queryString.parse(location.search) as {id: string}
  const [state, dispatch] = React.useReducer(fetchReducer, {
    post: null,
    loadingPost: true,
    comments: null,
    loadingComments: true,
    error: null,
  });

  React.useEffect(() => {
    dispatch({ type: "fetchingPost" });

    fetchItem(id)
      .then((post) => {
        dispatch({ type: "post", post });
        return fetchComments(post.kids || []);
      })
      .then((comments) => dispatch({ type: "comments", comments }))
      .catch(({ error }) => dispatch({ type: "error", error }));
  }, [id]);

  return state;
}

export function useFetchUser(location: {search: string}) {
  const { id } = queryString.parse(location.search) as {id: string};
  const [state, dispatch] = React.useReducer(fetchReducer, {
    user: null,
    error: null,
    loadingUser: true,
    loadingPosts: true,
    posts: null,
  });

  React.useEffect(() => {
    dispatch({ type: "loading" });

    fetchUser(id)
      .then((user) => {
        dispatch({ type: "user", user });
        return fetchPosts(user.submitted.slice(0, 30));
      })
      .then((posts) => dispatch({ type: "posts", posts }))
      .catch(({ error }) => dispatch({ type: "error", error }));
  }, [id]);

  return state;
}