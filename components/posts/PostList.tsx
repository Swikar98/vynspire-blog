"use client";

import { Post } from "@/types/post";
import { PostCard } from "@/components/posts/PostCard";

type PostListProps = {
  posts: Post[];
  onDelete: (id: number) => void;
};

export const PostList = ({ posts, onDelete }: PostListProps) => (
  <div className="grid gap-5 md:grid-cols-2">
    {posts.map((post) => (
      <PostCard key={post.id} post={post} onDelete={onDelete} />
    ))}
  </div>
);
