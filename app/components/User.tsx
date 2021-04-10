import React from "react";
import queryString from "query-string";
import { fetchPosts, fetchUser, User, Post } from "../utils/api";
import Loading from "./Loading";
import PostsList from "./PostsList";
import formatDate from "../utils/formatDate";

interface UserState {
  user: User | null,
  error: string | null,
  loadingUser: boolean,
  loadingPosts: boolean,
  posts: Post[] | null,
}

type UserAction = 
| { type: "loading" }
| { type: "user", user: User }
| { type: "posts", posts: Post[]}
| { type: "error", error: string }

function fetchReducer(state: UserState, action: UserAction) {
  if (action.type === "loading") {
    return {
      ...state,
      loadingUser: true,
      loadingPosts: true,
    };
  } else if (action.type === "user") {
    return {
      ...state,
      user: action.user,
      loadingUser: false,
    };
  } else if (action.type === "posts") {
    return {
      ...state,
      posts: action.posts,
      loadingPosts: false,
      error: null,
    };
  } else if (action.type === "error") {
    return {
      ...state,
      error: action.error,
      loadingUser: false,
      loadingPosts: false,
    };
  } else {
    throw new Error("That action type is not supported.");
  }
}

export default function UserComponent({ location }: {location: {search: string}}) {
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

  const { user, posts, loadingUser, loadingPosts, error } = state;

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {loadingUser === true && (
        <Loading text="Loading user" />
      )}
      {user && (
        <React.Fragment>
          <h1 className="header">{user.id}</h1>
          <div className="meta-info-light">
            <span>
              joined <b>{formatDate(user.created)}</b>
            </span>
            <span>
              has <b>{user.karma.toLocaleString()}</b> karma
            </span>
          </div>
        </React.Fragment>
      )}
      {loadingPosts === true && (
        loadingUser === false && <Loading text="Loading posts" />
      )} 
      {posts  && (
        <React.Fragment>
          <h2>Posts</h2>
          <PostsList posts={posts} />
        </React.Fragment>
      )}
    </>
  );
}