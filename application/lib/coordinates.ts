import { fetchPosts } from "./actions/thread.actions";

export async function getData() {
  const posts = await fetchPosts(1, 30);

  return JSON.stringify(posts);
}
