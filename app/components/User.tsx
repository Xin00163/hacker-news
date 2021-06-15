import React from "react";
import queryString from "query-string";
import { fetchPosts, fetchUser, User, Post } from "../utils/api";
import Loading from "./Loading";
import PostsList from "./PostsList";
import formatDate from "../utils/formatDate";
import fetchReducer from '../utils/fetchReducer';
import { useFetchUser } from "../utils/useFetchData";

export default function UserComponent({ location }: {location: {search: string}}) {

  const { user, posts, loadingUser, loadingPosts, error } = useFetchUser(location);

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
