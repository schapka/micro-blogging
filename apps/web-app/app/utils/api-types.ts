type ApiResponse<T> = { data: T };

export type User = {
  id: number;
  username: string;
  avatarUrl: string | null;
  createdAt: string;
};

export type UserResponse = ApiResponse<User>;

export type Post = { id: number; content: string; createdAt: string };

export type PostsResponse = ApiResponse<Post[]>;
