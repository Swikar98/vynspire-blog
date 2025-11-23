// hooks/usePosts.ts
"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePostsStore } from "@/store/posts-store";
import { PostsService } from "@/services/post.service";
import { PostPayload } from "@/types/post";

export const usePosts = () => {
  const {
    items,
    status,
    error,
    setStatus,
    setError,
    setPosts,
    addPost,
    updatePost,
    deletePost,
  } = usePostsStore();
  const initializedRef = useRef(false);

  const fetchPosts = useCallback(async () => {
    setStatus("loading");
    try {
      const posts = await PostsService.fetchPosts(15);
      setPosts(posts);
      setStatus("success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to fetch posts.";
      setError(message);
      setStatus("error");
    }
  }, [setPosts, setStatus, setError]);

  useEffect(() => {
    if (!initializedRef.current && items.length === 0) {
      initializedRef.current = true;
      fetchPosts();
    }
  }, [items.length, fetchPosts]);

  const createPost = useCallback(
    async (payload: PostPayload) => {
      setStatus("loading");
      try {
        const newPost = await PostsService.createPost(payload);
        addPost(newPost);
        setStatus("success");
        return newPost;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unable to create post.";
        setError(message);
        setStatus("error");
        throw err;
      }
    },
    [addPost, setError, setStatus]
  );

  const editPost = useCallback(
    async (id: number, payload: PostPayload) => {
      setStatus("loading");
      try {
        const updated = await PostsService.updatePost(id, payload);
        updatePost(updated);
        setStatus("success");
        return updated;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unable to update post.";
        setError(message);
        setStatus("error");
        throw err;
      }
    },
    [updatePost, setError, setStatus]
  );

  const removePost = useCallback(
    async (id: number) => {
      setStatus("loading");
      try {
        await PostsService.deletePost(id);
        deletePost(id);
        setStatus("success");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unable to delete the post.";
        setError(message);
        setStatus("error");
        throw err;
      }
    },
    [deletePost, setError, setStatus]
  );

  return {
    posts: items,
    status,
    error,
    fetchPosts,
    createPost,
    editPost,
    removePost,
  };
};
