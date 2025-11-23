"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dashboard_Layout } from "@/components/Dashboard_Layout";
import { PostForm } from "@/components/posts/PostForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hook/useAuth";
import { usePosts } from "@/hook/usePosts";

export default function NewPostPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { createPost } = usePosts();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (values: {
    title: string;
    body: string;
    category: string;
  }) => {
    try {
      setErrorMessage(null);
      await createPost({
        ...values,
        userId: user?.id ?? Date.now(),
      });
      router.push("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to create the post.";
      setErrorMessage(message);
    }
  };

  return (
    <Dashboard_Layout
      title="Create a new post"
      description="Craft a compelling story your readers will love."
      actions={
        <Button variant="ghost" asChild>
          <Link href="/dashboard">Back to dashboard</Link>
        </Button>
      }
    >
      <PostForm
        onSubmit={handleSubmit}
        submitLabel="Publish post"
        errorMessage={errorMessage}
      />
    </Dashboard_Layout>
  );
}
