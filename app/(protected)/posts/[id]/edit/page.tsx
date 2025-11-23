"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { use, useState } from "react";
import { Dashboard_Layout } from "@/components/Dashboard_Layout";
import { Loader } from "@/components/Loader";
import { PostForm } from "@/components/posts/PostForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hook/useAuth";
import { usePosts } from "@/hook/usePosts";
import { EditPostPageProps } from "@/types/editPost";
export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const postId = Number(resolvedParams.id);
  const { user } = useAuth();
  const { posts, status, editPost } = usePosts();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const post = posts.find((item) => item.id === postId);

  if (!post && status === "loading") {
    return (
      <Dashboard_Layout title="Edit post">
        <Loader fullScreen message="Loading post..." />
      </Dashboard_Layout>
    );
  }

  if (!post) {
    notFound();
    return null;
  }

  const handleSubmit = async (values: {
    title: string;
    body: string;
    category: string;
  }) => {
    try {
      setErrorMessage(null);
      await editPost(postId, {
        ...values,
        userId: user?.id ?? post.userId ?? 0,
      });
      router.push("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to update the post.";
      setErrorMessage(message);
    }
  };

  return (
    <Dashboard_Layout
      title="Edit post"
      description="Polish your article before publishing."
      actions={
        <Button variant="ghost" asChild>
          <Link href="/dashboard">Back to dashboard</Link>
        </Button>
      }
    >
      {post && (
        <PostForm
          initialValues={post}
          onSubmit={handleSubmit}
          submitLabel="Update post"
          errorMessage={errorMessage}
        />
      )}
    </Dashboard_Layout>
  );
}
