export function useUser(username: MaybeRef<string>) {
  return useFetch(() => `/api/users/${unref(username)}`, {
    transform: ({ data }: UserResponse) => data,
  });
}
