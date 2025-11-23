"use client";

import { Post } from "@/types/post";
import { create } from "zustand";

type PostsState = {
  items: Post[];
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
};

type PostsActions = {
  setStatus: (status: PostsState["status"]) => void;
  setError: (error: string | null) => void;
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (post: Post) => void;
  deletePost: (id: number) => void;
  reset: () => void;
};

export const usePostsStore = create<PostsState & PostsActions>((set) => ({
  items: [],
  status: "idle",
  error: null,
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),
  setPosts: (posts) => set({ items: posts, status: "success", error: null }),
  addPost: (post) =>
    set((state) => ({ items: [post, ...state.items], status: "success" })),
  updatePost: (post) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === post.id ? post : item)),
      status: "success",
    })),
  deletePost: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
      status: "success",
    })),
  reset: () => set({ items: [], status: "idle", error: null }),
}));
