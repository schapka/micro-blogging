export function useUserPosts(username: MaybeRef<string>) {
  const url = computed(() => `/api/users/${unref(username)}/posts`);
  return useFetch(url, {
    transform: ({ data }: PostsResponse) => data,
  });
}
