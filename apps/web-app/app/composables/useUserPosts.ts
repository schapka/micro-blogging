// Exported so callers can invalidate the cache after creating a post.
export function getPostsQueryKey(username: string) {
  return `posts/${unref(username)}`;
}

export function useUserPosts(username: MaybeRef<string>) {
  return useFetch(() => `/api/users/${unref(username)}/posts`, {
    transform: ({ data }: PostsResponse) => data,
    key: () => getPostsQueryKey(unref(username)),
  });
}
