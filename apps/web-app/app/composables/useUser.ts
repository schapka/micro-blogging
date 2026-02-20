export function useUser(username: MaybeRef<string>) {
  const url = computed(() => `/api/users/${unref(username)}`);
  return useFetch(url, {
    transform: ({ data }: UserResponse) => data,
  });
}
