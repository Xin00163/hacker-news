import React from "react";
import PostMetaInfo from "./PostMetaInfo";
import Title from "./Title";
import Loading from "./Loading";
import Comment from "./Comment";
import { useFetchPost } from "../utils/useFetchData";

export default function PostComponent({ location }: {location: {search: string}}) {
  
  const { post, loadingPost, loadingComments, comments, error } = useFetchPost(location);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <React.Fragment>
      {loadingPost === true && (
        <Loading text="Loading post" />
      )}
      {post && (
        <React.Fragment>
          <h2 className="header">
            <Title url={post.url} id={post.id} title={post.title} />
          </h2>
          <PostMetaInfo
            by={post.by}
            time={post.time}
            id={post.id}
            descendants={post.descendants}
          />
        </React.Fragment>
      )}
      {loadingComments === true && (
        loadingPost === false && <Loading text="Loading post comments" />
      )}
      {comments && (
        <React.Fragment>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
