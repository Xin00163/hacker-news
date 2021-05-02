import {User, Post } from "../utils/api";

interface State {
  user?: User | null,
  loadingUser?: boolean,
  loadingPosts?: boolean,
  posts: Post[] | null,
  error: string | null,
}

type Action = 
| { type: "loading" }
| { type: "user", user: User }
| { type: "posts", posts: Post[]}
| { type: "error", error: string }


export default function fetchReducer(state: State, action: Action) {
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