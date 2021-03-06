import React from "react";
import PostMetaInfo from "./PostMetaInfo";
import Title from "./Title";
import {Post} from "../utils/api";

export default function PostsList({ posts } : {posts: Post[]}) {
  return (
    <ul>
      {posts.map((post) => {
        return (
          <li key={post.id} className="post">
            <Title url={post.url} id={post.id} title={post.title} />
            <PostMetaInfo
              by={post.by}
              time={post.time}
              id={post.id}
              descendants={post.descendants}
            />
          </li>
        );
      })}
    </ul>
  );
}
