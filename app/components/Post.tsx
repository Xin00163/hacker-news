import React from "react";
import PostMetaInfo from "./PostMetaInfo";
import queryString from "query-string";
import Title from "./Title";
import Loading from "./Loading";
import { fetchItem, fetchComments} from "../utils/api";
import Comment from "./Comment";
import fetchReducer from '../utils/fetchReducer';

export default function PostComponent({ location }: {location: {search: string}}) {
  const { id } = queryString.parse(location.search) as {id: string}
  const [state, dispatch] = React.useReducer(fetchReducer, {
    post: null,
    loadingPost: true,
    comments: null,
    loadingComments: true,
    error: null,
  });

  const { post, loadingPost, loadingComments, comments, error } = state;

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
