const api = `https://hacker-news.firebaseio.com/v0`;
const json = ".json?print=pretty";

export type PostType = "new" | "top";
export type PostCategory = "story" | "comment"

export interface Post {
  id: string,
  deleted: boolean,
  type: PostCategory,
  dead: boolean,
  kids: string[],
  title: string,
  url: string,
  by: string,
  time: number,
  descendants?: string,
  text: string

}

export interface User {
  id: string,
  created: number,
  karma: number,
  submitted: string[]
}

function removeDead(posts: Post[]) {
  return posts.filter(Boolean).filter(({ dead }) => dead !== true);
}

function removeDeleted(posts: Post[]) {
  return posts.filter(({ deleted }) => deleted !== true);
}

function onlyPosts(posts: Post[]) {
  return posts.filter(({ type }) => type === "story");
}

function onlyComments(posts: Post[]) {
  return posts.filter(({ type }) => type === "comment");
}

export function fetchItem(id: string): Promise<Post> {
  return fetch(`${api}/item/${id}${json}`).then((res) => res.json());
}

export function fetchMainPosts(type: PostType) {
  return fetch(`${api}/${type}stories${json}`)
    .then((res) => res.json())
    .then((ids: string[]) => {
      if (!ids) {
        throw new Error(`There was an error fetching the ${type} posts.`);
      }

      return ids.slice(0, 50);
    })
    .then((ids) => Promise.all(ids.map(fetchItem)))
    .then((posts) => removeDeleted(onlyPosts(removeDead(posts))));
}

export function fetchUser(id: string) {
  return fetch(`${api}/user/${id}${json}`).then((res) => res.json());
}

export function fetchPosts(ids: string[]): Promise<Post[]> {
  return Promise.all(ids.map(fetchItem)).then((posts) =>
    removeDeleted(onlyPosts(removeDead(posts)))
  );
}

export function fetchComments(ids: string[]): Promise<Post[]> {
  return Promise.all(ids.map(fetchItem)).then((comments) =>
    removeDeleted(onlyComments(removeDead(comments)))
  );
}
