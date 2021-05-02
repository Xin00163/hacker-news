import {User, Post } from "./api";

interface State {
  user?: User | null,
  loadingUser?: boolean,
  loadingPost?: boolean,
  loadingPosts?: boolean,
  loadingComments?: boolean,
  posts?: Post[] | null,
  post?: Post | null,
  comments?: null | Post[],
  error: string | null,
}

type Action = 
| { type: "loading" }
| { type: "fetchingPost" }
| { type: "user", user: User }
| { type: "post"; post: Post }
| { type: "posts", posts: Post[]}
| { type: "comments"; comments: Post[] }
| { type: "error", error: string }


export default function fetchReducer(state: State, action: Action) {
  if (action.type === "fetchingPost") {
    return {
      ...state,
      loadingPost: true,
      loadingComments: true,
    };
  } else if (action.type === "loading") {
    return {
      ...state,
      loadingUser: true,
      loadingPosts: true,
    }
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
      loadingPost: false,
      loadingComments: false
    };
  } else {
    throw new Error("That action type is not supported.");
  }
}