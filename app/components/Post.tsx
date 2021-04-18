import React from "react";
import PostMetaInfo from "./PostMetaInfo";
import queryString from "query-string";
import Title from "./Title";
import Loading from "./Loading";
import { fetchItem, fetchComments, Post} from "../utils/api";
import Comment from "./Comment";

interface PostState {
  post: null | Post,
  error: null | string,
  comments: null | Post[],
  loadingPost: boolean,
  loadingComments: boolean,
}

type PostAction = 
  | { type: "loading"}
  | { type: "post"; post: Post }
  | { type: "comments"; comments: Post[] }
  | { type: "error"; error: string }

function fetchReducer(state: PostState, action: PostAction) {
  if (action.type === "loading") {
    return {
      ...state,
      loadingPost: true,
      loadingComments: true,
    };
  } else if (action.type === "post") {
    return {
      ...state,
      post: action.post,
      loadingPost: false,
      error: null,
    };
  } else if (action.type === "comments") {
    return {
      ...state,
      comments: action.comments,
      loadingComments: false,
      error: null,
    };
  } else if (action.type === "error") {
    return {
      ...state,
      error: action.error,
      loadingPost: false,
      loadingComments: false,
    };
  } else {
    throw new Error("That action type is not supported");
  }
}

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
    dispatch({ type: "loading" });

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
