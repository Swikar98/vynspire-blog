export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
  category: string;
  updatedAt: string;
};

export type PostPayload = {
  title: string;
  body: string;
  category: string;
  userId?: number;
};
export type PostsState = {
  items: Post[];
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
};

