"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Dashboard_Layout } from "@/components/Dashboard_Layout";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { Loader } from "@/components/Loader";
import { PostFilters } from "@/components/posts/PostFilters";
import { PostList } from "@/components/posts/PostList";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/hook/usePosts";

export default function DashboardPage() {
  const { posts, status, error, fetchPosts, removePost } = usePosts();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesSearch =
        !normalizedSearch ||
        post.title.toLowerCase().includes(normalizedSearch) ||
        post.body.toLowerCase().includes(normalizedSearch);
      const matchesCategory =
        category === "all" || post.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, category]);

  const handleDelete = async (id: number) => {
    await removePost(id);
  };

  const loading = status === "loading" && posts.length === 0;

  return (
    <Dashboard_Layout
      title="Editorial dashboard"
      description="Manage blog posts, keep drafts organized, and publish new stories."
      actions={
        <Button asChild>
          <Link href="/posts/new">New post</Link>
        </Button>
      }
    >
      <PostFilters
        searchTerm={searchTerm}
        category={category}
        onSearchChange={setSearchTerm}
        onCategoryChange={setCategory}
      />

      {loading && <Loader fullScreen message="Loading posts..." />}

      {status === "error" && error && (
        <ErrorState message={error} onRetry={fetchPosts} />
      )}

      {!loading && filteredPosts.length === 0 && status !== "error" && (
        <EmptyState
          title="No posts match your filters"
          description="Try adjusting your search or create a new post to get started."
          actionHref="/posts/new"
        />
      )}

      {filteredPosts.length > 0 && (
        <PostList posts={filteredPosts} onDelete={handleDelete} />
      )}
    </Dashboard_Layout>
  );
}
