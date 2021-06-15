import React from "react";
import {PostType } from "../utils/api";
import Loading from "./Loading";
import PostsList from "./PostsList";
import { useFetchPosts } from "../utils/useFetchData";


export default function Posts({ type }: {type: PostType}){
  const{ loadingPosts, posts, error} = useFetchPosts(type)

  if (loadingPosts === true || !posts) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <PostsList posts={posts} />;
}
