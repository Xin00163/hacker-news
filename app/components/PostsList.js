import React from "react";
import PostMetaInfo from "./PostMetaInfo";

export default function PostsList ({posts}) {
  return (
    <ul>
      {posts.map((post) => {
        return (
          <li key={post.id} className='post'>
            <a className='link' href={post.url}>{post.title}</a>
            <PostMetaInfo
              by={post.by}
              time={post.time}
              id={post.id}
              descendants={post.descendants}
            />
          </li>
        )
      })}
    </ul> 
  )
}